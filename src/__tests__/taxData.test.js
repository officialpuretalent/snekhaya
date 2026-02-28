/**
 * Unit tests for src/data/taxData.js
 * Pattern: Given / When / Then
 * Target: 100% line + branch coverage of all exported functions.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  TAX_YEARS,
  getCurrentTaxYearKey,
  calcIncomeTax,
  calcRebates,
  calcMedicalCredits,
  calcRADeduction,
  getMarginalRate,
  calcUIF,
  UIF_RATE,
  UIF_CEILING_MONTHLY,
  UIF_MAX_MONTHLY,
} from '@/data/taxData.js'

// ─── Shared fixtures ──────────────────────────────────────────────────────────

const brackets2026 = TAX_YEARS['2026'].brackets
const brackets2027 = TAX_YEARS['2027'].brackets
const rebates2026  = TAX_YEARS['2026'].rebates
const credits2026  = TAX_YEARS['2026'].medicalCredits // { main: 364, additional: 246 }
const yd2026       = TAX_YEARS['2026']
const yd2027       = TAX_YEARS['2027']

// ─── TAX_YEARS data integrity ────────────────────────────────────────────────

describe('TAX_YEARS', () => {
  it('GIVEN the tax data, WHEN accessed, THEN both 2026 and 2027 years exist', () => {
    expect(TAX_YEARS['2026']).toBeDefined()
    expect(TAX_YEARS['2027']).toBeDefined()
  })

  it('GIVEN a tax year, WHEN inspected, THEN it has all required keys', () => {
    for (const yd of Object.values(TAX_YEARS)) {
      expect(yd).toHaveProperty('brackets')
      expect(yd).toHaveProperty('rebates')
      expect(yd).toHaveProperty('medicalCredits')
      expect(yd).toHaveProperty('raMaxAmount')
      expect(yd).toHaveProperty('raMaxPercent')
      expect(yd).toHaveProperty('vatRate')
      expect(yd).toHaveProperty('cgtExclusion')
      expect(yd).toHaveProperty('cgtInclusionRate')
    }
  })

  it('GIVEN the 2025/2026 tax year, WHEN reading rebates, THEN primary rebate is R 17,235', () => {
    expect(TAX_YEARS['2026'].rebates.primary).toBe(17235)
  })

  it('GIVEN the 2026/2027 tax year, WHEN reading rebates, THEN primary rebate is R 17,820', () => {
    expect(TAX_YEARS['2027'].rebates.primary).toBe(17820)
  })

  it('GIVEN the 2026/2027 tax year, WHEN reading the RA cap, THEN it is R 430,000', () => {
    expect(TAX_YEARS['2027'].raMaxAmount).toBe(430000)
  })
})

// ─── getCurrentTaxYearKey ────────────────────────────────────────────────────

describe('getCurrentTaxYearKey', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('GIVEN today is in March, WHEN the key is computed, THEN it returns the next calendar year', () => {
    vi.setSystemTime(new Date(2026, 2, 1)) // 1 March 2026
    expect(getCurrentTaxYearKey()).toBe('2027')
  })

  it('GIVEN today is in December, WHEN the key is computed, THEN it returns the next calendar year', () => {
    vi.setSystemTime(new Date(2025, 11, 31)) // 31 Dec 2025
    expect(getCurrentTaxYearKey()).toBe('2026')
  })

  it('GIVEN today is in January, WHEN the key is computed, THEN it returns the current calendar year', () => {
    vi.setSystemTime(new Date(2026, 0, 15)) // 15 Jan 2026
    expect(getCurrentTaxYearKey()).toBe('2026')
  })

  it('GIVEN today is in February, WHEN the key is computed, THEN it returns the current calendar year', () => {
    vi.setSystemTime(new Date(2026, 1, 28)) // 28 Feb 2026
    expect(getCurrentTaxYearKey()).toBe('2026')
  })
})

// ─── calcIncomeTax ───────────────────────────────────────────────────────────

describe('calcIncomeTax', () => {
  describe('GIVEN zero or negative taxable income', () => {
    it('WHEN income is exactly R 0, THEN tax is R 0', () => {
      expect(calcIncomeTax(0, brackets2026)).toBe(0)
    })

    it('WHEN income is negative, THEN tax is R 0', () => {
      expect(calcIncomeTax(-10000, brackets2026)).toBe(0)
    })
  })

  describe('GIVEN income in bracket 1 (R 0 – R 237,100 @ 18%)', () => {
    it('WHEN income is R 100,000, THEN tax is R 18,000', () => {
      expect(calcIncomeTax(100_000, brackets2026)).toBeCloseTo(18_000, 2)
    })

    it('WHEN income is at the top of bracket 1 (R 237,100), THEN tax is R 42,678', () => {
      expect(calcIncomeTax(237_100, brackets2026)).toBeCloseTo(42_678, 2)
    })
  })

  describe('GIVEN income in bracket 2 (R 237,101 – R 370,500 @ 26%)', () => {
    it('WHEN income is at the floor of bracket 2 (R 237,101), THEN tax includes 26% of R1 above threshold', () => {
      expect(calcIncomeTax(237_101, brackets2026)).toBeCloseTo(42_678.26, 2)
    })

    it('WHEN income is R 300,000, THEN tax is correctly computed from base + marginal', () => {
      // 42,678 + (300,000 - 237,100) × 0.26 = 42,678 + 16,354 = 59,032
      expect(calcIncomeTax(300_000, brackets2026)).toBeCloseTo(59_032, 2)
    })
  })

  describe('GIVEN income in bracket 3 (R 370,501 – R 512,800 @ 31%)', () => {
    it('WHEN income is at the floor of bracket 3 (R 370,501), THEN tax includes 31% of R1 above threshold', () => {
      expect(calcIncomeTax(370_501, brackets2026)).toBeCloseTo(77_362.31, 2)
    })

    it('WHEN income is R 450,000, THEN tax is correctly computed', () => {
      // 77,362 + (450,000 - 370,500) × 0.31 = 77,362 + 24,645 = 102,007
      expect(calcIncomeTax(450_000, brackets2026)).toBeCloseTo(102_007, 2)
    })
  })

  describe('GIVEN income in bracket 4 (R 512,801 – R 673,000 @ 36%)', () => {
    it('WHEN income is at the floor of bracket 4 (R 512,801), THEN tax includes 36% of R1 above threshold', () => {
      expect(calcIncomeTax(512_801, brackets2026)).toBeCloseTo(121_475.36, 2)
    })
  })

  describe('GIVEN income in bracket 5 (R 673,001 – R 857,900 @ 39%)', () => {
    it('WHEN income is at the floor of bracket 5 (R 673,001), THEN tax includes 39% of R1 above threshold', () => {
      expect(calcIncomeTax(673_001, brackets2026)).toBeCloseTo(179_147.39, 2)
    })
  })

  describe('GIVEN income in bracket 6 (R 857,901 – R 1,817,000 @ 41%)', () => {
    it('WHEN income is at the floor of bracket 6 (R 857,901), THEN tax includes 41% of R1 above threshold', () => {
      expect(calcIncomeTax(857_901, brackets2026)).toBeCloseTo(251_258.41, 2)
    })
  })

  describe('GIVEN income in bracket 7 (R 1,817,001+ @ 45%)', () => {
    it('WHEN income is at the floor (R 1,817,001), THEN tax includes 45% of R1 above threshold', () => {
      expect(calcIncomeTax(1_817_001, brackets2026)).toBeCloseTo(644_489.45, 2)
    })

    it('WHEN income is R 2,000,000, THEN marginal 45% applies to the excess', () => {
      // 644,489 + (2,000,000 - 1,817,000) × 0.45 = 644,489 + 82,350 = 726,839
      expect(calcIncomeTax(2_000_000, brackets2026)).toBeCloseTo(726_839, 2)
    })
  })

  describe('GIVEN an empty brackets array', () => {
    it('WHEN no band matches, THEN falls back to returning R 0', () => {
      expect(calcIncomeTax(100_000, [])).toBe(0)
    })
  })

  describe('GIVEN 2026/2027 brackets', () => {
    it('WHEN income is R 100,000 (bracket 1 at 18%), THEN tax is R 18,000', () => {
      expect(calcIncomeTax(100_000, brackets2027)).toBeCloseTo(18_000, 2)
    })

    it('WHEN income is R 2,000,000 (bracket 7), THEN tax uses the 2027 base correctly', () => {
      // 2027 band 7: base 666,339, min 1,878,601
      // 666,339 + (2,000,000 - 1,878,600) × 0.45 = 666,339 + 54,630 = 720,969
      expect(calcIncomeTax(2_000_000, brackets2027)).toBeCloseTo(720_969, 2)
    })
  })
})

// ─── calcRebates ─────────────────────────────────────────────────────────────

describe('calcRebates', () => {
  describe('GIVEN a taxpayer under 65', () => {
    it('WHEN age is 30, THEN only the primary rebate (R 17,235) is applied', () => {
      expect(calcRebates(30, rebates2026)).toBe(17_235)
    })

    it('WHEN age is 64, THEN only the primary rebate is applied', () => {
      expect(calcRebates(64, rebates2026)).toBe(17_235)
    })
  })

  describe('GIVEN a taxpayer aged 65–74', () => {
    it('WHEN age is 65, THEN primary + secondary rebate (R 26,679) is applied', () => {
      // 17,235 + 9,444 = 26,679
      expect(calcRebates(65, rebates2026)).toBe(26_679)
    })

    it('WHEN age is 74, THEN primary + secondary rebate is applied', () => {
      expect(calcRebates(74, rebates2026)).toBe(26_679)
    })
  })

  describe('GIVEN a taxpayer aged 75 or older', () => {
    it('WHEN age is 75, THEN primary + secondary + tertiary rebate (R 29,824) is applied', () => {
      // 17,235 + 9,444 + 3,145 = 29,824
      expect(calcRebates(75, rebates2026)).toBe(29_824)
    })

    it('WHEN age is 90, THEN all three rebates are applied', () => {
      expect(calcRebates(90, rebates2026)).toBe(29_824)
    })
  })
})

// ─── calcMedicalCredits ──────────────────────────────────────────────────────

describe('calcMedicalCredits', () => {
  describe('GIVEN zero medical scheme members', () => {
    it('WHEN members is 0, THEN credits are R 0', () => {
      expect(calcMedicalCredits(0, credits2026)).toBe(0)
    })

    it('WHEN members is null, THEN credits are R 0', () => {
      expect(calcMedicalCredits(null, credits2026)).toBe(0)
    })

    it('WHEN members is negative, THEN credits are R 0 (clamped)', () => {
      expect(calcMedicalCredits(-5, credits2026)).toBe(0)
    })
  })

  describe('GIVEN one member (taxpayer only)', () => {
    it('WHEN 1 member, THEN annual credit is main rate × 12 = R 4,368', () => {
      // 364 × 1 × 12 = 4,368
      expect(calcMedicalCredits(1, credits2026)).toBe(4_368)
    })
  })

  describe('GIVEN two members (taxpayer + one dependent)', () => {
    it('WHEN 2 members, THEN annual credit is main rate × 2 × 12 = R 8,736', () => {
      // 364 × 2 × 12 = 8,736
      expect(calcMedicalCredits(2, credits2026)).toBe(8_736)
    })
  })

  describe('GIVEN three or more members', () => {
    it('WHEN 3 members, THEN additional rate applies to the third member', () => {
      // (364×2 + 246×1) × 12 = (728 + 246) × 12 = 974 × 12 = 11,688
      expect(calcMedicalCredits(3, credits2026)).toBe(11_688)
    })

    it('WHEN 20 members (max), THEN calculation uses 2 main + 18 additional', () => {
      // (364×2 + 246×18) × 12 = (728 + 4,428) × 12 = 5,156 × 12 = 61,872
      expect(calcMedicalCredits(20, credits2026)).toBe(61_872)
    })
  })

  describe('GIVEN more than 20 members (input beyond allowed maximum)', () => {
    it('WHEN 25 members are entered, THEN clamped to 20 — result equals the 20-member amount', () => {
      expect(calcMedicalCredits(25, credits2026)).toBe(61_872)
    })
  })
})

// ─── calcRADeduction ─────────────────────────────────────────────────────────

describe('calcRADeduction', () => {
  describe('GIVEN contribution is within the 27.5% limit', () => {
    it('WHEN R 10,000 contributed on R 100,000 income, THEN full contribution is deductible', () => {
      // 27.5% limit = 27,500; cap = 350,000; deductible = min(10,000, 27,500) = 10,000
      expect(calcRADeduction(100_000, 10_000, yd2026)).toBe(10_000)
    })
  })

  describe('GIVEN contribution exceeds the 27.5% of income limit', () => {
    it('WHEN R 30,000 contributed on R 100,000 income, THEN deduction is capped at 27.5%', () => {
      // 27.5% limit = 100,000 × 0.275 = 27,500 (floating point: 27500.000000000004)
      expect(calcRADeduction(100_000, 30_000, yd2026)).toBeCloseTo(27_500, 5)
    })
  })

  describe('GIVEN high income where the annual cap is binding', () => {
    it('WHEN R 400,000 contributed on R 2,000,000 income, THEN deduction is capped at R 350,000', () => {
      // 27.5% limit = 550,000; cap = 350,000; maxDeduction = 350,000;
      // deductible = min(400,000, 350,000) = 350,000
      expect(calcRADeduction(2_000_000, 400_000, yd2026)).toBe(350_000)
    })

    it('WHEN using 2026/2027 tax year, THEN cap is R 430,000', () => {
      // 27.5% of 2M = 550,000; cap = 430,000; maxDeduction = 430,000;
      // deductible = min(450,000, 430,000) = 430,000
      expect(calcRADeduction(2_000_000, 450_000, yd2027)).toBe(430_000)
    })
  })

  describe('GIVEN zero income or zero contribution', () => {
    it('WHEN income is R 0, THEN deduction is R 0', () => {
      expect(calcRADeduction(0, 0, yd2026)).toBe(0)
    })

    it('WHEN contribution is R 0, THEN deduction is R 0', () => {
      expect(calcRADeduction(500_000, 0, yd2026)).toBe(0)
    })
  })
})

// ─── getMarginalRate ─────────────────────────────────────────────────────────

describe('getMarginalRate', () => {
  describe('GIVEN income falls into each bracket', () => {
    it('WHEN income is R 0, THEN marginal rate is 18%', () => {
      expect(getMarginalRate(0, brackets2026)).toBe(0.18)
    })

    it('WHEN income is R 100,000 (bracket 1), THEN marginal rate is 18%', () => {
      expect(getMarginalRate(100_000, brackets2026)).toBe(0.18)
    })

    it('WHEN income is R 300,000 (bracket 2), THEN marginal rate is 26%', () => {
      expect(getMarginalRate(300_000, brackets2026)).toBe(0.26)
    })

    it('WHEN income is R 450,000 (bracket 3), THEN marginal rate is 31%', () => {
      expect(getMarginalRate(450_000, brackets2026)).toBe(0.31)
    })

    it('WHEN income is R 600,000 (bracket 4), THEN marginal rate is 36%', () => {
      expect(getMarginalRate(600_000, brackets2026)).toBe(0.36)
    })

    it('WHEN income is R 750,000 (bracket 5), THEN marginal rate is 39%', () => {
      expect(getMarginalRate(750_000, brackets2026)).toBe(0.39)
    })

    it('WHEN income is R 1,000,000 (bracket 6), THEN marginal rate is 41%', () => {
      expect(getMarginalRate(1_000_000, brackets2026)).toBe(0.41)
    })

    it('WHEN income is R 2,000,000 (bracket 7), THEN marginal rate is 45%', () => {
      expect(getMarginalRate(2_000_000, brackets2026)).toBe(0.45)
    })
  })

  describe('GIVEN income is below zero (edge case)', () => {
    it('WHEN income is negative, THEN falls back to the first bracket rate (18%)', () => {
      expect(getMarginalRate(-1, brackets2026)).toBe(0.18)
    })
  })
})

// ─── calcUIF ─────────────────────────────────────────────────────────────────

describe('calcUIF', () => {
  it('GIVEN UIF constants, WHEN checked, THEN rate is 1%, ceiling is R 17,712/month, and max contribution is R 177.12', () => {
    expect(UIF_RATE).toBe(0.01)
    expect(UIF_CEILING_MONTHLY).toBe(17_712)
    expect(UIF_MAX_MONTHLY).toBe(177.12)
  })

  describe('GIVEN a zero gross monthly salary', () => {
    it('WHEN grossMonthly is R 0, THEN UIF contribution is R 0', () => {
      expect(calcUIF(0)).toBe(0)
    })
  })

  describe('GIVEN invalid gross monthly salary', () => {
    it('WHEN grossMonthly is negative, THEN UIF is clamped to R 0', () => {
      expect(calcUIF(-5_000)).toBe(0)
    })

    it('WHEN grossMonthly is NaN, THEN UIF is R 0', () => {
      expect(calcUIF(NaN)).toBe(0)
    })

    it('WHEN grossMonthly is undefined, THEN UIF is R 0', () => {
      expect(calcUIF(undefined)).toBe(0)
    })

    it('WHEN grossMonthly is null, THEN UIF is R 0', () => {
      expect(calcUIF(null)).toBe(0)
    })

    it('WHEN grossMonthly is a non-numeric string, THEN UIF is R 0', () => {
      expect(calcUIF('abc')).toBe(0)
    })
  })

  describe('GIVEN gross monthly salary below the UIF ceiling (R 17,712)', () => {
    it('WHEN grossMonthly is R 10,000, THEN UIF is exactly 1% = R 100.00', () => {
      expect(calcUIF(10_000)).toBe(100.00)
    })

    it('WHEN grossMonthly is R 5,000, THEN UIF is R 50.00', () => {
      expect(calcUIF(5_000)).toBe(50.00)
    })
  })

  describe('GIVEN gross monthly salary exactly at the UIF ceiling', () => {
    it('WHEN grossMonthly is R 17,712, THEN UIF is exactly R 177.12', () => {
      expect(calcUIF(17_712)).toBe(177.12)
    })
  })

  describe('GIVEN gross monthly salary above the UIF ceiling', () => {
    it('WHEN grossMonthly is R 30,000, THEN UIF is capped at R 177.12', () => {
      expect(calcUIF(30_000)).toBe(177.12)
    })

    it('WHEN grossMonthly is R 100,000 (very high salary), THEN UIF is still capped at R 177.12', () => {
      expect(calcUIF(100_000)).toBe(177.12)
    })
  })
})
