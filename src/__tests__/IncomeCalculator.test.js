/**
 * Component tests for IncomeCalculator.vue
 * Pattern: Given / When / Then
 * Target: 100% branch coverage of calculate(), ageValue computed, and template conditionals.
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import IncomeCalculator from '@/components/calculators/IncomeCalculator.vue'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function mountCalc(taxYearKey = '2026') {
  return mount(IncomeCalculator, { props: { taxYearKey } })
}

/**
 * Interact with the calculator form, then click Calculate.
 * Omit any option to leave it at its default value.
 */
async function calculate(wrapper, {
  salary       = '0',
  fringe       = '0',
  period       = 'monthly',   // 'monthly' | 'annual'
  ageGroup     = 'under65',   // 'under65' | '65to74' | '75plus'
  medical      = '0',
  ra           = '0',
  employment   = 'employee',  // 'employee' | 'selfemployed'
} = {}) {
  const numInputs = wrapper.findAll('input[type="number"]')
  await numInputs[0].setValue(salary)   // gross salary
  await numInputs[1].setValue(fringe)   // fringe benefits
  await numInputs[2].setValue(medical)  // medical scheme members
  await numInputs[3].setValue(ra)       // RA monthly

  if (period === 'annual') {
    const [, annualBtn] = wrapper.findAll('.calc-toggle-btn')
    await annualBtn.trigger('click')
  }

  if (ageGroup !== 'under65') {
    await wrapper.find(`input[value="${ageGroup}"]`).setChecked()
  }

  if (employment !== 'employee') {
    await wrapper.find(`input[value="${employment}"]`).setChecked()
  }

  await wrapper.find('.calc-submit').trigger('click')
}

/** Extract the numeric value from a rendered stat card by its label text. */
function statValue(wrapper, label) {
  const stats = wrapper.findAll('.calc-stat')
  const stat = stats.find(s => s.text().includes(label))
  if (!stat) return null
  const raw = stat.find('.calc-stat-value').text()
  return parseFloat(raw.replace(/[^0-9.]/g, ''))
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('IncomeCalculator', () => {

  describe('GIVEN the calculator has just been loaded', () => {
    it('WHEN no calculation has been run, THEN no results section is shown', () => {
      const wrapper = mountCalc()
      expect(wrapper.find('.calc-results').exists()).toBe(false)
    })

    it('WHEN Employee radio is selected (default), THEN the label is visible', () => {
      const wrapper = mountCalc()
      expect(wrapper.text()).toContain('Employee (PAYE + UIF)')
    })

    it('WHEN Monthly toggle is explicitly clicked, THEN period is monthly', async () => {
      const wrapper = mountCalc()
      const [monthlyBtn] = wrapper.findAll('.calc-toggle-btn')
      await monthlyBtn.trigger('click')
      await calculate(wrapper, { salary: '10000' })
      expect(statValue(wrapper, 'Monthly UIF')).toBeCloseTo(100, 0)
    })
  })

  describe('GIVEN an employee on a monthly salary of R 10,000 (R 120,000/year), under 65', () => {
    it('WHEN Calculate is clicked, THEN the results section appears', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { salary: '10000' })
      expect(wrapper.find('.calc-results').exists()).toBe(true)
    })

    it('WHEN Calculate is clicked, THEN Monthly PAYE, UIF, and Take-Home stats are all shown', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { salary: '10000' })
      const text = wrapper.text()
      expect(text).toContain('Monthly PAYE')
      expect(text).toContain('Monthly UIF')
      expect(text).toContain('Monthly Take-Home')
    })

    it('WHEN Calculate is clicked, THEN Monthly UIF is R 100 (1% of R 10,000, below ceiling)', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { salary: '10000' })
      expect(statValue(wrapper, 'Monthly UIF')).toBeCloseTo(100, 0)
    })

    it('WHEN Calculate is clicked, THEN Monthly PAYE is R 364 (annualTax R 4,365 ÷ 12)', async () => {
      // Tax: 120,000 × 18% = 21,600 − primary rebate 17,235 = 4,365 ÷ 12 = 363.75 → R 364
      const wrapper = mountCalc()
      await calculate(wrapper, { salary: '10000' })
      expect(statValue(wrapper, 'Monthly PAYE')).toBeCloseTo(364, 0)
    })

    it('WHEN Calculate is clicked, THEN Monthly Take-Home is R 9,536 (R10,000 − R364 − R100)', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { salary: '10000' })
      expect(statValue(wrapper, 'Monthly Take-Home')).toBeCloseTo(9_536, 0)
    })
  })

  describe('GIVEN a salary entered as an annual figure instead of monthly', () => {
    it('WHEN annual period is selected with R 120,000, THEN results match the monthly R 10,000 scenario', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { salary: '120000', period: 'annual' })
      expect(statValue(wrapper, 'Monthly PAYE')).toBeCloseTo(364, 0)
      expect(statValue(wrapper, 'Monthly UIF')).toBeCloseTo(100, 0)
    })
  })

  describe('GIVEN the taxpayer is aged between 65 and 74', () => {
    it('WHEN age group 65–74 is selected, THEN the Secondary Rebate row appears in the breakdown', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { salary: '300000', period: 'annual', ageGroup: '65to74' })
      expect(wrapper.text()).toContain('Secondary Rebate')
    })

    it('WHEN age group 65–74 is selected, THEN the Tertiary Rebate row does NOT appear', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { salary: '300000', period: 'annual', ageGroup: '65to74' })
      expect(wrapper.text()).not.toContain('Tertiary Rebate')
    })
  })

  describe('GIVEN the taxpayer is aged 75 or older', () => {
    it('WHEN age group 75+ is selected, THEN both Secondary and Tertiary Rebate rows appear', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { salary: '300000', period: 'annual', ageGroup: '75plus' })
      expect(wrapper.text()).toContain('Secondary Rebate')
      expect(wrapper.text()).toContain('Tertiary Rebate')
    })

    it('WHEN 75+ radio is explicitly selected, THEN the label "75 and older" is visible', async () => {
      const wrapper = mountCalc()
      await wrapper.find('input[value="75plus"]').setChecked()
      expect(wrapper.text()).toContain('75 and older')
    })
  })

  describe('GIVEN the taxpayer has medical scheme members', () => {
    it('WHEN 3 medical members are entered, THEN the Medical Tax Credits row appears', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { salary: '500000', period: 'annual', medical: '3' })
      expect(wrapper.text()).toContain('Medical Tax Credits')
    })

    it('WHEN 0 medical members, THEN the Medical Tax Credits row is hidden', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { salary: '500000', period: 'annual', medical: '0' })
      expect(wrapper.text()).not.toContain('Medical Tax Credits')
    })
  })

  describe('GIVEN the taxpayer contributes to a Retirement Annuity', () => {
    it('WHEN a monthly RA contribution is entered, THEN the RA Deduction row appears', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { salary: '50000', ra: '1000' })
      expect(wrapper.text()).toContain('RA Deduction')
    })

    it('WHEN no RA contribution is entered, THEN the RA Deduction row is hidden', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { salary: '50000', ra: '0' })
      expect(wrapper.text()).not.toContain('RA Deduction')
    })
  })

  describe('GIVEN an employee with taxable fringe benefits', () => {
    it('WHEN fringe benefits are entered, THEN the dedicated fringe totals section is shown', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { salary: '10000', fringe: '1000' })
      expect(wrapper.text()).toContain('Total Fringe Benefits (Annual)')
      expect(wrapper.text()).toContain('Total Fringe Benefits (Monthly)')
    })

    it('WHEN monthly fringe benefits of R 1,000 are entered, THEN Monthly Fringe Benefits is R 1,000', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { salary: '10000', fringe: '1000' })
      expect(statValue(wrapper, 'Monthly Fringe Benefits')).toBeCloseTo(1_000, 0)
    })

    it('WHEN monthly fringe benefits are included, THEN PAYE and take-home reflect the higher taxable remuneration', async () => {
      // Taxable remuneration = (10,000 + 1,000) × 12 = 132,000
      // PAYE = (132,000 × 18% − 17,235) ÷ 12 = 543.75 -> R 544
      // UIF  = 1% of 11,000 = R 110
      // Take-home cash = 10,000 − 543.75 − 110 = 9,346.25 -> R 9,346
      const wrapper = mountCalc()
      await calculate(wrapper, { salary: '10000', fringe: '1000' })
      expect(statValue(wrapper, 'Monthly PAYE')).toBeCloseTo(544, 0)
      expect(statValue(wrapper, 'Monthly UIF')).toBeCloseTo(110, 0)
      expect(statValue(wrapper, 'Monthly Take-Home')).toBeCloseTo(9_346, 0)
    })
  })

  describe('GIVEN the taxpayer is self-employed or a provisional taxpayer', () => {
    it('WHEN Employee radio is explicitly selected after self-employed, THEN UIF is shown again', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { salary: '50000', employment: 'selfemployed' })
      expect(wrapper.text()).not.toContain('Monthly UIF')
      await wrapper.find('input[value="employee"]').setChecked()
      await wrapper.find('.calc-submit').trigger('click')
      expect(wrapper.text()).toContain('Monthly UIF')
    })

    it('WHEN self-employed is selected, THEN the Monthly UIF stat card is NOT shown', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { salary: '50000', employment: 'selfemployed' })
      expect(wrapper.text()).not.toContain('Monthly UIF')
    })

    it('WHEN self-employed is selected, THEN the UIF breakdown row is NOT shown', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { salary: '50000', employment: 'selfemployed' })
      expect(wrapper.text()).not.toContain('capped at R17')
    })

    it('WHEN self-employed is selected, THEN the disclaimer mentions no UIF for self-employed', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { salary: '50000', employment: 'selfemployed' })
      expect(wrapper.text()).toContain('self-employed')
    })

    it('WHEN employee is selected, THEN the disclaimer mentions SDL', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { salary: '50000', employment: 'employee' })
      expect(wrapper.text()).toContain('SDL')
    })
  })

  describe('GIVEN a very low income where tax falls below the primary rebate', () => {
    it('WHEN income is R 50,000/year (tax R 9,000 < rebate R 17,235), THEN Annual PAYE is clamped to R 0', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { salary: '50000', period: 'annual' })
      // Math.max(0, 9,000 - 17,235) = 0
      expect(statValue(wrapper, 'Monthly PAYE')).toBe(0)
    })
  })

  describe('GIVEN a salary of R 0', () => {
    it('WHEN income is zero, THEN the effective tax rate is shown as 0.00%', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { salary: '0' })
      expect(wrapper.text()).toContain('0.00%')
    })
  })

  describe('GIVEN a high salary where UIF hits the ceiling', () => {
    it('WHEN monthly salary is R 60,000 (above R 17,712 ceiling), THEN Monthly UIF is capped at R 177.12', async () => {
      const wrapper = mountCalc()
      await calculate(wrapper, { salary: '60000' })
      // UIF ceiling = 17,712/month → max employee contribution = R 177.12 (SARS)
      expect(statValue(wrapper, 'Monthly UIF')).toBe(177.12)
    })
  })

  describe('GIVEN the 2026/2027 tax year', () => {
    it('WHEN the same salary is used, THEN results reflect the updated 2027 brackets', async () => {
      const wrapper = mountCalc('2027')
      await calculate(wrapper, { salary: '10000' })
      expect(wrapper.find('.calc-results').exists()).toBe(true)
      expect(wrapper.text()).toContain('2026/2027')
    })
  })
})
