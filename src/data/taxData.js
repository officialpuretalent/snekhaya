/**
 * South African SARS Tax Data
 * Tax year runs 1 March – 28/29 February.
 * "2026" key = 2025/2026 tax year (March 2025 – Feb 2026)
 * "2027" key = 2026/2027 tax year (March 2026 – Feb 2027)
 * Source: SARS / National Treasury Budget 2026 Tax Guide
 */

export const TAX_YEARS = {
  '2026': {
    label: '2025/2026',
    period: '1 March 2025 – 28 February 2026',
    brackets: [
      { min: 0,       max: 237100,   base: 0,      rate: 0.18 },
      { min: 237101,  max: 370500,   base: 42678,  rate: 0.26 },
      { min: 370501,  max: 512800,   base: 77362,  rate: 0.31 },
      { min: 512801,  max: 673000,   base: 121475, rate: 0.36 },
      { min: 673001,  max: 857900,   base: 179147, rate: 0.39 },
      { min: 857901,  max: 1817000,  base: 251258, rate: 0.41 },
      { min: 1817001, max: Infinity, base: 644489, rate: 0.45 },
    ],
    rebates: { primary: 17235, secondary: 9444, tertiary: 3145 },
    thresholds: { under65: 95750, over65: 148217, over75: 165689 },
    medicalCredits: { main: 364, additional: 246 }, // per month
    raMaxAmount: 350000,
    raMaxPercent: 0.275,
    vatRate: 0.15,
    cgtExclusion: 40000,
    cgtInclusionRate: 0.40,
  },
  '2027': {
    label: '2026/2027',
    period: '1 March 2026 – 28 February 2027',
    brackets: [
      { min: 0,       max: 245100,   base: 0,      rate: 0.18 },
      { min: 245101,  max: 383100,   base: 44118,  rate: 0.26 },
      { min: 383101,  max: 530200,   base: 79998,  rate: 0.31 },
      { min: 530201,  max: 695800,   base: 125599, rate: 0.36 },
      { min: 695801,  max: 887000,   base: 185215, rate: 0.39 },
      { min: 887001,  max: 1878600,  base: 259783, rate: 0.41 },
      { min: 1878601, max: Infinity, base: 666339, rate: 0.45 },
    ],
    rebates: { primary: 17820, secondary: 9765, tertiary: 3249 },
    thresholds: { under65: 99000, over65: 153250, over75: 171300 },
    medicalCredits: { main: 376, additional: 254 }, // per month
    raMaxAmount: 430000,
    raMaxPercent: 0.275,
    vatRate: 0.15,
    cgtExclusion: 40000,
    cgtInclusionRate: 0.40,
  },
}

/**
 * Returns the current SA tax year key ('2026' or '2027').
 * SA tax year starts 1 March, so March 2026 → key '2027', Jan 2026 → key '2026'.
 */
export function getCurrentTaxYearKey() {
  const now = new Date()
  const month = now.getMonth() + 1 // 1–12
  const year = now.getFullYear()
  return month >= 3 ? String(year + 1) : String(year)
}

/**
 * Calculate gross income tax before rebates.
 * SARS tables use "X% of taxable income above threshold", so for bands after
 * the first we subtract (min - 1) as the threshold baseline.
 */
export function calcIncomeTax(taxableIncome, brackets) {
  if (taxableIncome <= 0) return 0
  for (const band of brackets) {
    if (taxableIncome <= band.max) {
      const threshold = band.min === 0 ? 0 : band.min - 1
      return band.base + (taxableIncome - threshold) * band.rate
    }
  }
  return 0
}

/** Total rebates based on age. */
export function calcRebates(age, rebates) {
  let total = rebates.primary
  if (age >= 65) total += rebates.secondary
  if (age >= 75) total += rebates.tertiary
  return total
}

/** Annual medical tax credits. */
export function calcMedicalCredits(members, credits) {
  const m = Math.min(20, Math.max(0, Math.round(members || 0)))
  if (m <= 0) return 0
  const mainMembers = Math.min(m, 2)
  const additional = Math.max(0, m - 2)
  return (mainMembers * credits.main + additional * credits.additional) * 12
}

/** Allowable RA deduction (lesser of 27.5% of income or annual cap). */
export function calcRADeduction(grossIncome, raContribution, yearData) {
  const maxDeduction = Math.min(
    grossIncome * yearData.raMaxPercent,
    yearData.raMaxAmount,
  )
  return Math.min(raContribution, maxDeduction)
}

/** Marginal rate for a given taxable income. */
export function getMarginalRate(taxableIncome, brackets) {
  for (const band of [...brackets].reverse()) {
    if (taxableIncome >= band.min) return band.rate
  }
  return brackets[0].rate
}

/**
 * UIF (Unemployment Insurance Fund) — employee's share only.
 * Rate: 1% of gross remuneration, capped at the monthly earnings ceiling.
 * Ceiling: R17,712/month (in effect since 1 June 2021).
 * Max employee contribution: R177.12/month.
 * Source: SARS https://www.sars.gov.za/types-of-tax/unemployment-insurance-fund/
 */
export const UIF_RATE = 0.01
export const UIF_CEILING_MONTHLY = 17712
export const UIF_MAX_MONTHLY = 177.12 // 1% of UIF_CEILING_MONTHLY

/** Monthly employee UIF contribution (gross monthly salary → R amount). */
export function calcUIF(grossMonthly) {
  const num = Number(grossMonthly)
  if (!Number.isFinite(num) || num < 0) return 0
  const capped = Math.min(num, UIF_CEILING_MONTHLY)
  return parseFloat((capped * UIF_RATE).toFixed(2))
}
