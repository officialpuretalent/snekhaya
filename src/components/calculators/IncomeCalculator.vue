<template>
  <div class="calc-panel">
    <div class="calc-intro">
      <p class="t-body">
        Estimate your PAYE income tax liability and monthly take-home pay.
        All figures are based on official SARS tables and are indicative only.
        Taxable fringe benefits can be included for employee calculations.
      </p>
    </div>

    <div class="calc-form-card">
    <div class="calc-form">
      <!-- Employment Type -->
      <div class="calc-field-group">
        <label class="calc-label">Employment Type</label>
        <div class="calc-segment-group">
          <label :class="['calc-segment', { active: employmentType === 'employee' }]">
            <input type="radio" v-model="employmentType" value="employee" class="calc-segment-radio" />
            <span>Employee (PAYE + UIF)</span>
          </label>
          <label :class="['calc-segment', { active: employmentType === 'selfemployed' }]">
            <input type="radio" v-model="employmentType" value="selfemployed" class="calc-segment-radio" />
            <span>Self-employed / Provisional</span>
          </label>
        </div>
      </div>

      <!-- Income -->
      <div class="calc-field-group">
        <label class="calc-label">Gross Salary</label>
        <div class="calc-input-row">
          <div class="calc-input-wrap">
            <span class="calc-prefix">R</span>
            <input
              v-model.number="salaryInput"
              type="number"
              min="0"
              step="500"
              class="calc-input"
              placeholder="0"
            />
          </div>
          <div class="calc-toggle-group">
            <button
              :class="['calc-toggle-btn', { active: period === 'monthly' }]"
              @click="period = 'monthly'"
              type="button"
            >Monthly</button>
            <button
              :class="['calc-toggle-btn', { active: period === 'annual' }]"
              @click="period = 'annual'"
              type="button"
            >Annual</button>
          </div>
        </div>
      </div>

      <!-- Fringe Benefits -->
      <div class="calc-field-group" v-if="employmentType === 'employee'">
        <label class="calc-label">Total Fringe Benefits <span class="calc-optional">(optional)</span></label>
        <div class="calc-hint">Taxable cash-equivalent value (same period as salary)</div>
        <div class="calc-input-wrap calc-input-medium">
          <span class="calc-prefix">R</span>
          <input
            v-model.number="fringeBenefitsInput"
            type="number"
            min="0"
            step="100"
            class="calc-input"
            placeholder="0"
          />
        </div>
      </div>

      <!-- Age -->
      <div class="calc-field-group">
        <label class="calc-label">Age Group</label>
        <div class="calc-segment-group">
          <label :class="['calc-segment', { active: ageGroup === 'under65' }]">
            <input type="radio" v-model="ageGroup" value="under65" class="calc-segment-radio" />
            <span>Under 65</span>
          </label>
          <label :class="['calc-segment', { active: ageGroup === '65to74' }]">
            <input type="radio" v-model="ageGroup" value="65to74" class="calc-segment-radio" />
            <span>65–74</span>
          </label>
          <label :class="['calc-segment', { active: ageGroup === '75plus' }]">
            <input type="radio" v-model="ageGroup" value="75plus" class="calc-segment-radio" />
            <span>75 and older</span>
          </label>
        </div>
      </div>

      <!-- Medical -->
      <div class="calc-field-group">
        <label class="calc-label">Medical Scheme Members</label>
        <div class="calc-hint">Total members on your scheme, including yourself</div>
        <div class="calc-input-wrap calc-input-narrow">
          <input
            v-model.number="medicalMembers"
            type="number"
            min="0"
            max="20"
            step="1"
            class="calc-input"
            placeholder="0"
          />
        </div>
      </div>

      <!-- RA -->
      <div class="calc-field-group">
        <label class="calc-label">Retirement Annuity Contribution <span class="calc-optional">(optional)</span></label>
        <div class="calc-hint">Monthly RA contribution to a registered fund</div>
        <div class="calc-input-wrap calc-input-medium">
          <span class="calc-prefix">R</span>
          <input
            v-model.number="raMonthly"
            type="number"
            min="0"
            step="100"
            class="calc-input"
            placeholder="0"
          />
        </div>
      </div>

      <button class="btn btn-primary btn-arrow calc-submit" @click="calculate" type="button">
        Calculate
      </button>
    </div>
    </div>

    <!-- Results -->
    <transition name="calc-fade">
      <div v-if="result" class="calc-results">
        <div class="calc-results-header">
          <span class="calc-results-label">Tax Breakdown</span>
          <span class="calc-results-year">{{ yearData.label }} Tax Year</span>
        </div>

        <div class="calc-breakdown">
          <div class="calc-row">
            <span>Gross Annual Cash Income</span>
            <span>{{ fmt(result.grossAnnual) }}</span>
          </div>
          <template v-if="result.isEmployee">
            <div class="calc-row">
              <span>Plus: Taxable Fringe Benefits</span>
              <span>{{ fmt(result.annualFringeBenefits) }}</span>
            </div>
            <div class="calc-row total">
              <span>Total Remuneration (before RA)</span>
              <span>{{ fmt(result.taxableRemuneration) }}</span>
            </div>
          </template>
          <div class="calc-row deduction" v-if="result.raDeduction > 0">
            <span>Less: RA Deduction</span>
            <span>({{ fmt(result.raDeduction) }})</span>
          </div>
          <div class="calc-row total">
            <span>Taxable Income</span>
            <span>{{ fmt(result.taxableIncome) }}</span>
          </div>

          <div class="calc-divider"></div>

          <div class="calc-row">
            <span>Income Tax (before rebates)</span>
            <span>{{ fmt(result.taxBeforeRebates) }}</span>
          </div>
          <div class="calc-row deduction">
            <span>Less: Primary Rebate</span>
            <span>({{ fmt(result.primaryRebate) }})</span>
          </div>
          <div class="calc-row deduction" v-if="result.secondaryRebate > 0">
            <span>Less: Secondary Rebate (65+)</span>
            <span>({{ fmt(result.secondaryRebate) }})</span>
          </div>
          <div class="calc-row deduction" v-if="result.tertiaryRebate > 0">
            <span>Less: Tertiary Rebate (75+)</span>
            <span>({{ fmt(result.tertiaryRebate) }})</span>
          </div>
          <div class="calc-row deduction" v-if="result.medicalCredits > 0">
            <span>Less: Medical Tax Credits</span>
            <span>({{ fmt(result.medicalCredits) }})</span>
          </div>

          <div class="calc-row total">
            <span>Annual PAYE</span>
            <span>{{ fmt(result.annualTax) }}</span>
          </div>

          <template v-if="result.isEmployee">
            <div class="calc-divider"></div>
            <div class="calc-row deduction">
              <span>UIF (employee 1%, capped at R17 712/month remuneration)</span>
              <span>{{ fmtUIF(result.annualUIF) }}</span>
            </div>
          </template>

          <template v-if="result.isEmployee">
            <div class="calc-divider"></div>
            <div class="calc-row">
              <span>Total Fringe Benefits (Annual)</span>
              <span>{{ fmt(result.annualFringeBenefits) }}</span>
            </div>
            <div class="calc-row">
              <span>Total Fringe Benefits (Monthly)</span>
              <span>{{ fmt(result.monthlyFringeBenefits) }}</span>
            </div>
          </template>

          <div class="calc-divider"></div>

          <div class="calc-row total">
            <span>Total Annual Deductions</span>
            <span>{{ fmt(result.annualTax + result.annualUIF) }}</span>
          </div>
        </div>

        <div class="calc-summary">
          <div class="calc-stat">
            <div class="calc-stat-value">{{ result.effectiveRate }}%</div>
            <div class="calc-stat-label">Effective Tax Rate</div>
          </div>
          <div class="calc-stat">
            <div class="calc-stat-value">{{ fmt(result.monthlyTax) }}</div>
            <div class="calc-stat-label">Monthly PAYE</div>
          </div>
          <div class="calc-stat" v-if="result.isEmployee">
            <div class="calc-stat-value">{{ fmtUIF(result.monthlyUIF) }}</div>
            <div class="calc-stat-label">Monthly UIF</div>
          </div>
          <div class="calc-stat" v-if="result.isEmployee">
            <div class="calc-stat-value">{{ fmt(result.monthlyFringeBenefits) }}</div>
            <div class="calc-stat-label">Monthly Fringe Benefits</div>
          </div>
          <div class="calc-stat highlight">
            <div class="calc-stat-value">{{ fmt(result.monthlyTakeHome) }}</div>
            <div class="calc-stat-label">Monthly Take-Home</div>
          </div>
        </div>

        <p class="calc-disclaimer">
          This estimate is for guidance only and does not constitute tax advice.
          <span v-if="result.isEmployee">
            Taxable fringe benefits are included in remuneration.
            UIF (employee portion) is included. SDL is an employer cost and is not deducted from your salary.
          </span>
          <span v-else>
            UIF does not apply to self-employed / provisional taxpayers.
          </span>
          Consult a tax professional for a comprehensive assessment.
        </p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  TAX_YEARS,
  calcIncomeTax,
  calcRebates,
  calcMedicalCredits,
  calcRADeduction,
  calcUIF,
} from '@/data/taxData.js'

const props = defineProps({
  taxYearKey: { type: String, required: true },
})

const yearData = computed(() => TAX_YEARS[props.taxYearKey])

const salaryInput = ref(null)
const fringeBenefitsInput = ref(0)
const period = ref('monthly')
const ageGroup = ref('under65')
const medicalMembers = ref(0)
const raMonthly = ref(0)
const employmentType = ref('employee')
const result = ref(null)

const ageValue = computed(() => {
  if (ageGroup.value === '75plus') return 75
  if (ageGroup.value === '65to74') return 65
  return 0
})

function fmt(amount) {
  /* v8 ignore next */
  if (amount == null || isNaN(amount)) return 'R 0'
  return 'R\u00A0' + Math.round(amount).toLocaleString('en-ZA')
}

/** Format UIF amounts with 2 decimals (max R 177.12). */
function fmtUIF(amount) {
  if (amount == null || isNaN(amount)) return 'R 0.00'
  return 'R\u00A0' + Number(amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

function calculate() {
  const salary = Number(salaryInput.value) || 0
  const fringeInput = Number(fringeBenefitsInput.value) || 0
  const grossAnnual = period.value === 'monthly' ? salary * 12 : salary
  const grossMonthly = grossAnnual / 12
  const annualFringeBenefits = period.value === 'monthly' ? fringeInput * 12 : fringeInput
  const monthlyFringeBenefits = annualFringeBenefits / 12
  const yd = yearData.value
  const isEmployee = employmentType.value === 'employee'

  const taxableRemuneration = grossAnnual + (isEmployee ? annualFringeBenefits : 0)
  const raAnnual = (Number(raMonthly.value) || 0) * 12
  const raDeduction = calcRADeduction(taxableRemuneration, raAnnual, yd)
  const taxableIncome = Math.max(0, taxableRemuneration - raDeduction)

  const taxBeforeRebates = calcIncomeTax(taxableIncome, yd.brackets)
  const age = ageValue.value

  const primaryRebate = yd.rebates.primary
  const secondaryRebate = age >= 65 ? yd.rebates.secondary : 0
  const tertiaryRebate = age >= 75 ? yd.rebates.tertiary : 0
  const totalRebates = primaryRebate + secondaryRebate + tertiaryRebate

  const members = Math.min(20, Math.max(0, Math.round(Number(medicalMembers.value) || 0)))
  const medicalCredits = calcMedicalCredits(members, yd.medicalCredits)

  const annualTax = Math.max(0, taxBeforeRebates - totalRebates - medicalCredits)
  const monthlyTax = annualTax / 12

  const monthlyUIF = isEmployee ? calcUIF(grossMonthly + monthlyFringeBenefits) : 0
  const annualUIF = monthlyUIF * 12

  const monthlyTakeHome = grossMonthly - monthlyTax - monthlyUIF
  const effectiveRate = taxableRemuneration > 0 ? ((annualTax / taxableRemuneration) * 100).toFixed(2) : '0.00'

  result.value = {
    grossAnnual,
    annualFringeBenefits: isEmployee ? annualFringeBenefits : 0,
    monthlyFringeBenefits: isEmployee ? monthlyFringeBenefits : 0,
    taxableRemuneration,
    raDeduction,
    taxableIncome,
    taxBeforeRebates,
    primaryRebate,
    secondaryRebate,
    tertiaryRebate,
    medicalCredits,
    annualTax,
    annualUIF,
    monthlyTax,
    monthlyUIF,
    effectiveRate,
    monthlyTakeHome,
    isEmployee,
  }
}
</script>
