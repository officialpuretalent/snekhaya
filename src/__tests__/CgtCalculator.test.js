/**
 * Component tests for CgtCalculator.vue
 * Pattern: Given / When / Then
 * Target: 100% branch coverage of calculate() — gain/loss, exclusion applied/skipped,
 *         effectiveCgtRate branches, and the capital-loss info note.
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CgtCalculator from '@/components/calculators/CgtCalculator.vue'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function mountCalc(taxYearKey = '2026') {
  return mount(CgtCalculator, { props: { taxYearKey } })
}

async function calculate(wrapper, {
  proceeds       = '0',
  baseCost       = '0',
  applyExclusion = true,   // true | false
  marginalRate   = '0.36',
} = {}) {
  const [proceedsInput, baseCostInput] = wrapper.findAll('input[type="number"]')
  await proceedsInput.setValue(String(proceeds))
  await baseCostInput.setValue(String(baseCost))

  if (!applyExclusion) {
    // Select "No — already applied against another gain"
    const radios = wrapper.findAll('input[type="radio"]')
    await radios[1].setChecked() // false radio
  }

  await wrapper.find('select').setValue(marginalRate)
  await wrapper.find('.calc-submit').trigger('click')
}

function parseRand(text) {
  return parseFloat(text.replace(/[^0-9.]/g, ''))
}

function resultRow(wrapper, label) {
  return wrapper.findAll('.calc-row').find(r => r.text().includes(label))
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('CgtCalculator', () => {

  describe('GIVEN the calculator has just been loaded', () => {
    it('WHEN no calculation has been run, THEN no results section is shown', () => {
      const wrapper = mountCalc()
      expect(wrapper.find('.calc-results').exists()).toBe(false)
    })
  })

  describe('GIVEN a capital gain with the annual exclusion applied', () => {
    // Proceeds: R 500,000  |  Base: R 200,000  |  Gain: R 300,000
    // Exclusion (2026): R 40,000  |  Net gain: R 260,000
    // Inclusion (40%): R 104,000  |  CGT @ 36%: R 37,440
    // Effective rate on gain: 37,440 / 300,000 × 100 = 12.48%

    it('WHEN proceeds exceed base cost and exclusion is applied, THEN results are shown', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { proceeds: '500000', baseCost: '200000', applyExclusion: true })
      expect(wrapper.find('.calc-results').exists()).toBe(true)
    })

    it('WHEN proceeds R 500,000 and base R 200,000, THEN capital gain is R 300,000', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { proceeds: '500000', baseCost: '200000', applyExclusion: true })
      expect(parseRand(resultRow(wrapper, 'Capital Gain').text())).toBeCloseTo(300_000, 0)
    })

    it('WHEN exclusion is applied, THEN the Annual Exclusion row (R 40,000) appears in the breakdown', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { proceeds: '500000', baseCost: '200000', applyExclusion: true })
      // Check the results breakdown (not the form, which always contains the label text)
      expect(wrapper.find('.calc-breakdown').text()).toContain('Annual Exclusion')
      expect(parseRand(resultRow(wrapper, 'Annual Exclusion').text())).toBeCloseTo(40_000, 0)
    })

    it('WHEN exclusion is applied, THEN net gain is R 260,000 (R 300,000 − R 40,000)', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { proceeds: '500000', baseCost: '200000', applyExclusion: true })
      expect(parseRand(resultRow(wrapper, 'Net Capital Gain').text())).toBeCloseTo(260_000, 0)
    })

    it('WHEN 40% inclusion and 36% marginal rate, THEN estimated CGT is R 37,440', async () => {
      // 260,000 × 0.40 × 0.36 = 104,000 × 0.36 = 37,440
      const wrapper = mountCalc()
      await calculate(wrapper, { proceeds: '500000', baseCost: '200000', applyExclusion: true, marginalRate: '0.36' })
      expect(parseRand(resultRow(wrapper, 'Estimated CGT').text())).toBeCloseTo(37_440, 0)
    })

    it('WHEN there is a capital gain, THEN the effective CGT rate is shown (not 0.00%)', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { proceeds: '500000', baseCost: '200000', applyExclusion: true })
      const rateStat = wrapper.findAll('.calc-stat').find(s => s.text().includes('Effective CGT Rate'))
      expect(rateStat).toBeDefined()
      // effectiveCgtRate = (37,440 / 300,000 × 100).toFixed(2) = '12.48'
      expect(rateStat.text()).toContain('12.48')
    })

    it('WHEN there is a capital gain, THEN the capital-loss info note is NOT shown', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { proceeds: '500000', baseCost: '200000', applyExclusion: true })
      expect(wrapper.text()).not.toContain('No capital gain')
    })
  })

  describe('GIVEN a capital gain with the annual exclusion NOT applied', () => {
    it('WHEN exclusion is skipped, THEN the Annual Exclusion row does NOT appear in the breakdown', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { proceeds: '500000', baseCost: '200000', applyExclusion: false })
      // The form label always contains the text; check only the results breakdown
      expect(wrapper.find('.calc-breakdown').text()).not.toContain('Annual Exclusion')
    })

    it('WHEN exclusion is skipped, THEN net gain equals the full capital gain (R 300,000)', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { proceeds: '500000', baseCost: '200000', applyExclusion: false })
      expect(parseRand(resultRow(wrapper, 'Net Capital Gain').text())).toBeCloseTo(300_000, 0)
    })

    it('WHEN exclusion is skipped, THEN estimated CGT is higher (R 43,200 vs R 37,440)', async () => {
      // 300,000 × 0.40 × 0.36 = 43,200
      const wrapper = mountCalc()
      await calculate(wrapper, { proceeds: '500000', baseCost: '200000', applyExclusion: false, marginalRate: '0.36' })
      expect(parseRand(resultRow(wrapper, 'Estimated CGT').text())).toBeCloseTo(43_200, 0)
    })
  })

  describe('GIVEN a capital gain exactly equal to the annual exclusion', () => {
    it('WHEN gain equals R 40,000 and exclusion is applied, THEN net gain is R 0 and CGT is R 0', async () => {
      // capitalGain = 40,000; exclusionApplied = min(40,000, 40,000) = 40,000; netGain = 0; cgt = 0
      // effectiveCgtRate = (0/40,000 * 100).toFixed(2) = '0.00'  (capitalGain > 0 branch)
      const wrapper = mountCalc()
      await calculate(wrapper, { proceeds: '240000', baseCost: '200000', applyExclusion: true })
      expect(parseRand(resultRow(wrapper, 'Net Capital Gain').text())).toBe(0)
      expect(parseRand(resultRow(wrapper, 'Estimated CGT').text())).toBe(0)
    })
  })

  describe('GIVEN a capital loss (proceeds less than base cost)', () => {
    it('WHEN proceeds are R 150,000 and base cost is R 200,000, THEN the capital-loss note appears', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { proceeds: '150000', baseCost: '200000' })
      expect(wrapper.text()).toContain('No capital gain')
    })

    it('WHEN there is a capital loss, THEN CGT is R 0', async () => {
      // capitalGain = −50,000; netGain = max(0, ...) = 0; cgt = 0
      const wrapper = mountCalc()
      await calculate(wrapper, { proceeds: '150000', baseCost: '200000' })
      expect(parseRand(resultRow(wrapper, 'Estimated CGT').text())).toBe(0)
    })

    it('WHEN there is a capital loss, THEN effective CGT rate is 0.00% (capitalGain <= 0 branch)', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { proceeds: '150000', baseCost: '200000' })
      const rateStat = wrapper.findAll('.calc-stat').find(s => s.text().includes('Effective CGT Rate'))
      expect(rateStat.text()).toContain('0.00')
    })
  })

  describe('GIVEN the 2026/2027 tax year', () => {
    it('WHEN the same scenario is run, THEN results still display correctly', async () => {
      const wrapper = mountCalc('2027')
      await calculate(wrapper, { proceeds: '500000', baseCost: '200000' })
      expect(wrapper.find('.calc-results').exists()).toBe(true)
      expect(wrapper.text()).toContain('2026/2027')
    })

    it('WHEN mounted with 2027, THEN the exclusion label shows the annual exclusion amount', () => {
      const wrapper = mountCalc('2027')
      expect(wrapper.text()).toContain('Apply Annual Exclusion')
      expect(wrapper.text()).toContain('40') // cgtExclusion is R40,000
    })

    it('WHEN Yes exclusion radio is explicitly selected, THEN exclusion is applied', async () => {
      const wrapper = mountCalc()
      const radios = wrapper.findAll('input[type="radio"]')
      await radios[0].setChecked() // Yes
      await calculate(wrapper, { proceeds: '500000', baseCost: '200000' })
      expect(wrapper.find('.calc-breakdown').text()).toContain('Annual Exclusion')
    })
  })
})
