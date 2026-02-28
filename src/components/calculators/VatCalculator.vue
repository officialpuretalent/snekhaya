<template>
  <div class="calc-panel">
    <div class="calc-intro">
      <p class="t-body">
        Calculate VAT at the current South African rate of 15%.
        Switch between including and excluding VAT.
      </p>
    </div>

    <div class="calc-form">
      <div class="calc-field-group">
        <label class="calc-label">Amount</label>
        <div class="calc-input-row">
          <div class="calc-input-wrap">
            <span class="calc-prefix">R</span>
            <input
              v-model.number="amount"
              type="number"
              min="0"
              step="1"
              class="calc-input"
              placeholder="0.00"
            />
          </div>
          <div class="calc-toggle-group">
            <button
              :class="['calc-toggle-btn', { active: mode === 'excl' }]"
              @click="mode = 'excl'"
              type="button"
            >Excl. VAT</button>
            <button
              :class="['calc-toggle-btn', { active: mode === 'incl' }]"
              @click="mode = 'incl'"
              type="button"
            >Incl. VAT</button>
          </div>
        </div>
        <div class="calc-hint" v-if="mode === 'excl'">Enter the amount before VAT is added</div>
        <div class="calc-hint" v-else>Enter the amount already including VAT</div>
      </div>

      <button class="btn btn-primary btn-arrow calc-submit" @click="calculate" type="button">
        Calculate
      </button>
    </div>

    <transition name="calc-fade">
      <div v-if="result" class="calc-results">
        <div class="calc-results-header">
          <span class="calc-results-label">VAT Breakdown</span>
          <span class="calc-results-year">VAT Rate: 15%</span>
        </div>

        <div class="calc-breakdown">
          <div class="calc-row">
            <span>Amount Excluding VAT</span>
            <span>{{ fmt(result.excl) }}</span>
          </div>
          <div class="calc-row">
            <span>VAT (15%)</span>
            <span>{{ fmt(result.vatAmount) }}</span>
          </div>
          <div class="calc-divider"></div>
          <div class="calc-row total">
            <span>Amount Including VAT</span>
            <span>{{ fmt(result.incl) }}</span>
          </div>
        </div>

        <div class="calc-summary">
          <div class="calc-stat highlight">
            <div class="calc-stat-value">{{ fmt(result.vatAmount) }}</div>
            <div class="calc-stat-label">VAT Amount</div>
          </div>
          <div class="calc-stat">
            <div class="calc-stat-value">15%</div>
            <div class="calc-stat-label">Current VAT Rate</div>
          </div>
        </div>

        <p class="calc-disclaimer">
          The standard VAT rate in South Africa is 15%. Zero-rated and exempt
          supplies apply to certain goods and services. Consult a tax adviser
          for VAT classification of specific transactions.
        </p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const VAT_RATE = 0.15

const amount = ref(null)
const mode = ref('excl')
const result = ref(null)

function fmt(val) {
  /* v8 ignore next */
  if (val == null || isNaN(val)) return 'R 0.00'
  return 'R\u00A0' + Number(val).toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function calculate() {
  const v = Number(amount.value) || 0
  let excl, incl, vatAmount

  if (mode.value === 'excl') {
    excl = v
    vatAmount = v * VAT_RATE
    incl = v + vatAmount
  } else {
    incl = v
    excl = v / (1 + VAT_RATE)
    vatAmount = incl - excl
  }

  result.value = { excl, vatAmount, incl }
}
</script>
