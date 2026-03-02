<template>
  <div class="calc-panel">
    <div class="calc-intro">
      <p class="t-body">
        Discover how much tax you save by contributing to a retirement annuity (RA).
        SARS allows a deduction of up to 27.5% of gross income, capped at
        R{{ fmt2(yearData.raMaxAmount) }} per year in {{ yearData.label }}.
      </p>
    </div>

    <div class="calc-form-card">
    <div class="calc-form">
      <div class="calc-field-group">
        <label class="calc-label">Gross Annual Income</label>
        <div class="calc-input-wrap">
          <span class="calc-prefix">R</span>
          <input
            v-model.number="grossIncome"
            type="number"
            min="0"
            step="1000"
            class="calc-input"
            placeholder="0"
          />
        </div>
      </div>

      <div class="calc-field-group">
        <label class="calc-label">Monthly RA Contribution</label>
        <div class="calc-hint">What you pay into your RA each month</div>
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

      <div class="calc-field-group">
        <label class="calc-label">Your Marginal Income Tax Rate</label>
        <div class="calc-select-wrap">
          <select v-model="marginalRate" class="calc-select">
            <option :value="0.18">18%</option>
            <option :value="0.26">26%</option>
            <option :value="0.31">31%</option>
            <option :value="0.36">36%</option>
            <option :value="0.39">39%</option>
            <option :value="0.41">41%</option>
            <option :value="0.45">45%</option>
          </select>
        </div>
      </div>

      <button class="btn btn-primary btn-arrow calc-submit" @click="calculate" type="button">
        Calculate
      </button>
    </div>
    </div>

    <transition name="calc-fade">
      <div v-if="result" class="calc-results">
        <div class="calc-results-header">
          <span class="calc-results-label">RA Deduction Breakdown</span>
          <span class="calc-results-year">{{ yearData.label }} Tax Year</span>
        </div>

        <div class="calc-breakdown">
          <div class="calc-row">
            <span>Gross Annual Income</span>
            <span>{{ fmt(result.grossIncome) }}</span>
          </div>
          <div class="calc-row">
            <span>Annual RA Contribution</span>
            <span>{{ fmt(result.annualContribution) }}</span>
          </div>
          <div class="calc-divider"></div>
          <div class="calc-row">
            <span>27.5% of Gross Income</span>
            <span>{{ fmt(result.twentySevenFiveLimit) }}</span>
          </div>
          <div class="calc-row">
            <span>Annual Cap ({{ yearData.label }})</span>
            <span>{{ fmt(yearData.raMaxAmount) }}</span>
          </div>
          <div class="calc-row total">
            <span>Allowable RA Deduction</span>
            <span>{{ fmt(result.allowableDeduction) }}</span>
          </div>
          <div class="calc-divider"></div>
          <div class="calc-row">
            <span>Taxable Income Without RA</span>
            <span>{{ fmt(result.grossIncome) }}</span>
          </div>
          <div class="calc-row total">
            <span>Taxable Income With RA</span>
            <span>{{ fmt(result.taxableAfterRA) }}</span>
          </div>
          <div class="calc-divider"></div>
          <div class="calc-row highlight-row">
            <span>Annual Tax Saving</span>
            <span>{{ fmt(result.taxSaving) }}</span>
          </div>
          <div class="calc-row">
            <span>Monthly Tax Saving</span>
            <span>{{ fmt(result.taxSaving / 12) }}</span>
          </div>
        </div>

        <div class="calc-summary">
          <div class="calc-stat">
            <div class="calc-stat-value">{{ fmt(result.annualContribution) }}</div>
            <div class="calc-stat-label">Annual Contribution</div>
          </div>
          <div class="calc-stat highlight">
            <div class="calc-stat-value">{{ fmt(result.taxSaving) }}</div>
            <div class="calc-stat-label">Annual Tax Saving</div>
          </div>
          <div class="calc-stat">
            <div class="calc-stat-value">{{ fmt(result.netCostOfRA) }}</div>
            <div class="calc-stat-label">Net Cost After Tax Relief</div>
          </div>
        </div>

        <p v-if="result.annualContribution > result.allowableDeduction" class="calc-info-note">
          Your contribution exceeds the deductible limit. The excess of
          {{ fmt(result.annualContribution - result.allowableDeduction) }}
          may be deductible in future years once carried forward by your fund.
        </p>

        <p class="calc-disclaimer">
          RA deductions are subject to SARS rules and may vary based on other retirement fund contributions.
          Figures are estimates. Speak to a financial adviser for a holistic retirement plan.
        </p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { TAX_YEARS, calcRADeduction } from '@/data/taxData.js'

const props = defineProps({
  taxYearKey: { type: String, required: true },
})

const yearData = computed(() => TAX_YEARS[props.taxYearKey])

const grossIncome = ref(null)
const raMonthly = ref(null)
const marginalRate = ref(0.36)
const result = ref(null)

function fmt(val) {
  /* v8 ignore next */
  if (val == null || isNaN(val)) return 'R 0'
  return 'R\u00A0' + Math.round(val).toLocaleString('en-ZA')
}
function fmt2(val) {
  return Math.round(val).toLocaleString('en-ZA')
}

function calculate() {
  const yd = yearData.value
  const income = Number(grossIncome.value) || 0
  const annualContribution = (Number(raMonthly.value) || 0) * 12

  const twentySevenFiveLimit = income * yd.raMaxPercent
  const allowableDeduction = calcRADeduction(income, annualContribution, yd)
  const taxableAfterRA = Math.max(0, income - allowableDeduction)
  const taxSaving = allowableDeduction * marginalRate.value
  const netCostOfRA = annualContribution - taxSaving

  result.value = {
    grossIncome: income,
    annualContribution,
    twentySevenFiveLimit,
    allowableDeduction,
    taxableAfterRA,
    taxSaving,
    netCostOfRA,
  }
}
</script>
