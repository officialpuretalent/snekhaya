/**
 * Component tests for VatCalculator.vue
 * Pattern: Given / When / Then
 * Target: 100% branch coverage of calculate() — both VAT modes.
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import VatCalculator from '@/components/calculators/VatCalculator.vue'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function mountCalc() {
  return mount(VatCalculator)
}

async function calculate(wrapper, { amount, mode = 'excl' } = {}) {
  if (amount !== undefined) {
    await wrapper.find('input[type="number"]').setValue(String(amount))
  }
  if (mode === 'incl') {
    const [, inclBtn] = wrapper.findAll('.calc-toggle-btn')
    await inclBtn.trigger('click')
  } else {
    const [exclBtn] = wrapper.findAll('.calc-toggle-btn')
    await exclBtn.trigger('click')
  }
  await wrapper.find('.calc-submit').trigger('click')
}

/**
 * Read the VALUE span (last <span>) from a .calc-row whose text contains `label`.
 * This intentionally ignores the label span to avoid false digit matches
 * (e.g. "VAT (15%)" contains "15" which corrupts a naive full-text parse).
 * Handles both en-ZA comma-decimal ("1 000,00") and en-US dot-decimal ("1,000.00").
 */
function rowValue(wrapper, label) {
  const row = wrapper.findAll('.calc-row').find(r => r.text().includes(label))
  if (!row) return null
  const spans = row.findAll('span')
  const raw = spans[spans.length - 1].text()
  return parseLocaleNumber(raw)
}

function parseLocaleNumber(raw) {
  // Strip currency symbol, non-breaking space, parentheses
  let s = raw.replace(/[R()\u00A0]/g, '').trim()
  // en-ZA: comma as decimal separator ("150,00" / "1 000,00")
  if (/,\d{2}$/.test(s)) {
    s = s.replace(/[\s.]/g, '').replace(',', '.')
  } else {
    // en-US or integer: remove commas and spaces used as thousands separators
    s = s.replace(/[\s,]/g, '')
  }
  return parseFloat(s) || 0
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('VatCalculator', () => {

  describe('GIVEN the calculator has just been loaded', () => {
    it('WHEN no calculation has been run, THEN no results section is shown', () => {
      const wrapper = mountCalc()
      expect(wrapper.find('.calc-results').exists()).toBe(false)
    })
  })

  describe('GIVEN the mode hint text', () => {
    it('WHEN mode is excl (default), THEN the "before VAT" hint is shown', () => {
      const wrapper = mountCalc()
      expect(wrapper.text()).toContain('Enter the amount before VAT is added')
    })

    it('WHEN mode is switched to incl, THEN the "already including VAT" hint is shown', async () => {
      const wrapper = mountCalc()
      const [, inclBtn] = wrapper.findAll('.calc-toggle-btn')
      await inclBtn.trigger('click')
      expect(wrapper.text()).toContain('Enter the amount already including VAT')
    })
  })

  describe('GIVEN an amount EXCLUDING VAT (excl. mode)', () => {
    it('WHEN R 1,000 excl. VAT is entered, THEN the results section appears', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { amount: 1_000, mode: 'excl' })
      expect(wrapper.find('.calc-results').exists()).toBe(true)
    })

    it('WHEN R 1,000 excl. VAT is entered, THEN amount excluding VAT row shows R 1,000', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { amount: 1_000, mode: 'excl' })
      expect(rowValue(wrapper, 'Amount Excluding VAT')).toBeCloseTo(1_000, 0)
    })

    it('WHEN R 1,000 excl. VAT is entered, THEN VAT amount is R 150 (15% of R 1,000)', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { amount: 1_000, mode: 'excl' })
      expect(rowValue(wrapper, 'VAT (15%)')).toBeCloseTo(150, 0)
    })

    it('WHEN R 1,000 excl. VAT is entered, THEN amount including VAT is R 1,150', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { amount: 1_000, mode: 'excl' })
      expect(rowValue(wrapper, 'Amount Including VAT')).toBeCloseTo(1_150, 0)
    })
  })

  describe('GIVEN an amount INCLUDING VAT (incl. mode)', () => {
    it('WHEN R 1,150 incl. VAT is entered, THEN the results section appears', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { amount: 1_150, mode: 'incl' })
      expect(wrapper.find('.calc-results').exists()).toBe(true)
    })

    it('WHEN R 1,150 incl. VAT is entered, THEN amount excluding VAT is R 1,000 (1,150 ÷ 1.15)', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { amount: 1_150, mode: 'incl' })
      expect(rowValue(wrapper, 'Amount Excluding VAT')).toBeCloseTo(1_000, 0)
    })

    it('WHEN R 1,150 incl. VAT is entered, THEN VAT amount is R 150 (1,150 − 1,000)', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { amount: 1_150, mode: 'incl' })
      expect(rowValue(wrapper, 'VAT (15%)')).toBeCloseTo(150, 0)
    })

    it('WHEN R 1,150 incl. VAT is entered, THEN amount including VAT row shows R 1,150', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { amount: 1_150, mode: 'incl' })
      expect(rowValue(wrapper, 'Amount Including VAT')).toBeCloseTo(1_150, 0)
    })
  })

  describe('GIVEN no amount is entered', () => {
    it('WHEN Calculate is clicked with no input, THEN all VAT amounts are R 0', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { mode: 'excl' })
      expect(rowValue(wrapper, 'VAT (15%)')).toBe(0)
    })
  })
})
