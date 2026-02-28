/**
 * Component tests for RaCalculator.vue
 * Pattern: Given / When / Then
 * Target: 100% branch coverage of calculate() — contribution within limit,
 *         exceeding 27.5%, hitting the annual cap, and the excess-contribution note.
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import RaCalculator from '@/components/calculators/RaCalculator.vue'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function mountCalc(taxYearKey = '2026') {
  return mount(RaCalculator, { props: { taxYearKey } })
}

async function calculate(wrapper, {
  grossIncome  = '0',
  raMonthly    = '0',
  marginalRate = '0.36',
} = {}) {
  const [incomeInput, raInput] = wrapper.findAll('input[type="number"]')
  await incomeInput.setValue(String(grossIncome))
  await raInput.setValue(String(raMonthly))
  await wrapper.find('select').setValue(String(marginalRate))
  await wrapper.find('.calc-submit').trigger('click')
}

function parseRand(text) {
  return parseFloat(text.replace(/[^0-9.]/g, ''))
}

function resultRow(wrapper, label) {
  return wrapper.findAll('.calc-row').find(r => r.text().includes(label))
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('RaCalculator', () => {

  describe('GIVEN the calculator has just been loaded', () => {
    it('WHEN no calculation has been run, THEN no results section is shown', () => {
      const wrapper = mountCalc()
      expect(wrapper.find('.calc-results').exists()).toBe(false)
    })
  })

  describe('GIVEN a contribution that is WITHIN the 27.5% deduction limit', () => {
    // Gross: R 100,000  |  Monthly RA: R 500 → annual R 6,000
    // 27.5% limit: R 27,500  |  Annual cap (2026): R 350,000
    // Allowable deduction: min(R 6,000, R 27,500) = R 6,000

    it('WHEN Calculate is clicked, THEN the results section appears', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { grossIncome: '100000', raMonthly: '500' })
      expect(wrapper.find('.calc-results').exists()).toBe(true)
    })

    it('WHEN R 6,000 annual contribution on R 100,000 income, THEN allowable deduction is R 6,000', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { grossIncome: '100000', raMonthly: '500' })
      expect(parseRand(resultRow(wrapper, 'Allowable RA Deduction').text())).toBeCloseTo(6_000, 0)
    })

    it('WHEN allowable deduction is R 6,000 at 36% marginal rate, THEN tax saving is R 2,160', async () => {
      // 6,000 × 0.36 = 2,160
      const wrapper = mountCalc()
      await calculate(wrapper, { grossIncome: '100000', raMonthly: '500', marginalRate: '0.36' })
      const savingRow = resultRow(wrapper, 'Annual Tax Saving')
      expect(parseRand(savingRow.text())).toBeCloseTo(2_160, 0)
    })

    it('WHEN tax saving is R 2,160 on R 6,000 contribution, THEN net cost is R 3,840', async () => {
      // netCostOfRA = 6,000 − 2,160 = 3,840
      const wrapper = mountCalc()
      await calculate(wrapper, { grossIncome: '100000', raMonthly: '500', marginalRate: '0.36' })
      const netCostStat = wrapper.findAll('.calc-stat').find(s => s.text().includes('Net Cost After Tax Relief'))
      expect(parseRand(netCostStat.text())).toBeCloseTo(3_840, 0)
    })

    it('WHEN contribution is within the limit, THEN the excess-contribution note is NOT shown', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { grossIncome: '100000', raMonthly: '500' })
      expect(wrapper.text()).not.toContain('exceeds the deductible limit')
    })
  })

  describe('GIVEN a contribution that EXCEEDS the 27.5% of income limit', () => {
    // Gross: R 100,000  |  Monthly RA: R 3,000 → annual R 36,000
    // 27.5% limit: R 27,500  |  Allowable: min(R 36,000, R 27,500) = R 27,500
    // Excess: R 36,000 − R 27,500 = R 8,500

    it('WHEN R 36,000 annual contribution exceeds 27.5% limit, THEN deduction is capped at R 27,500', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { grossIncome: '100000', raMonthly: '3000' })
      expect(parseRand(resultRow(wrapper, 'Allowable RA Deduction').text())).toBeCloseTo(27_500, 0)
    })

    it('WHEN contribution exceeds the limit, THEN the excess-contribution note IS shown', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { grossIncome: '100000', raMonthly: '3000' })
      expect(wrapper.text()).toContain('exceeds the deductible limit')
    })

    it('WHEN contribution exceeds limit, THEN taxable income after RA is reduced by the allowable amount', async () => {
      // taxableAfterRA = max(0, 100,000 − 27,500) = 72,500
      const wrapper = mountCalc()
      await calculate(wrapper, { grossIncome: '100000', raMonthly: '3000' })
      expect(parseRand(resultRow(wrapper, 'Taxable Income With RA').text())).toBeCloseTo(72_500, 0)
    })
  })

  describe('GIVEN a high income where the annual cap is the binding constraint', () => {
    // Gross: R 2,000,000  |  Monthly RA: R 40,000 → annual R 480,000
    // 27.5%: R 550,000  |  Cap (2026): R 350,000
    // maxDeduction: min(550,000, 350,000) = 350,000
    // Allowable: min(480,000, 350,000) = 350,000

    it('WHEN contribution of R 480,000 hits the annual cap, THEN allowable deduction is R 350,000', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { grossIncome: '2000000', raMonthly: '40000' })
      expect(parseRand(resultRow(wrapper, 'Allowable RA Deduction').text())).toBeCloseTo(350_000, 0)
    })

    it('WHEN contribution exceeds annual cap, THEN the excess-contribution note is shown', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { grossIncome: '2000000', raMonthly: '40000' })
      expect(wrapper.text()).toContain('exceeds the deductible limit')
    })

    it('WHEN using 2026/2027 year, THEN annual cap is R 430,000', async () => {
      // Gross 2M, RA 40k/month (480k/yr)
      // 27.5% of 2M = 550,000; cap = 430,000; allowable = min(480k, 430k) = 430,000
      const wrapper = mountCalc('2027')
      await calculate(wrapper, { grossIncome: '2000000', raMonthly: '40000' })
      expect(parseRand(resultRow(wrapper, 'Allowable RA Deduction').text())).toBeCloseTo(430_000, 0)
    })
  })

  describe('GIVEN zero inputs', () => {
    it('WHEN income and contribution are both R 0, THEN allowable deduction is R 0', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { grossIncome: '0', raMonthly: '0' })
      expect(parseRand(resultRow(wrapper, 'Allowable RA Deduction').text())).toBe(0)
    })
  })
})
