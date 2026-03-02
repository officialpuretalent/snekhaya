<template>
  <div class="calc-panel">
    <div class="calc-intro">
      <p class="t-body">
        Estimate your Capital Gains Tax (CGT) liability on the disposal of an asset.
        CGT is included in your taxable income at the inclusion rate; it is not a separate flat tax.
      </p>
    </div>

    <div class="calc-form-card">
    <div class="calc-form">
      <div class="calc-field-group">
        <label class="calc-label">Proceeds (Sale Price)</label>
        <div class="calc-input-wrap">
          <span class="calc-prefix">R</span>
          <input v-model.number="proceeds" type="number" min="0" step="1000" class="calc-input" placeholder="0" />
        </div>
      </div>

      <div class="calc-field-group">
        <label class="calc-label">Base Cost</label>
        <div class="calc-hint">Original cost plus allowable improvement expenses</div>
        <div class="calc-input-wrap">
          <span class="calc-prefix">R</span>
          <input v-model.number="baseCost" type="number" min="0" step="1000" class="calc-input" placeholder="0" />
        </div>
      </div>

      <div class="calc-field-group">
        <label class="calc-label">Apply Annual Exclusion (R{{ fmt2(yearData.cgtExclusion) }})?</label>
        <div class="calc-segment-group">
          <label :class="['calc-segment', { active: applyExclusion === true }]">
            <input type="radio" v-model="applyExclusion" :value="true" class="calc-segment-radio" />
            <span>Yes — I haven't used my exclusion this year</span>
          </label>
          <label :class="['calc-segment', { active: applyExclusion === false }]">
            <input type="radio" v-model="applyExclusion" :value="false" class="calc-segment-radio" />
            <span>No — already applied against another gain</span>
          </label>
        </div>
      </div>

      <div class="calc-field-group">
        <label class="calc-label">Your Marginal Income Tax Rate</label>
        <div class="calc-hint">Select your highest applicable tax bracket rate</div>
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
          <span class="calc-results-label">CGT Breakdown</span>
          <span class="calc-results-year">{{ yearData.label }} Tax Year</span>
        </div>

        <div class="calc-breakdown">
          <div class="calc-row">
            <span>Proceeds</span>
            <span>{{ fmt(result.proceeds) }}</span>
          </div>
          <div class="calc-row deduction">
            <span>Less: Base Cost</span>
            <span>({{ fmt(result.baseCost) }})</span>
          </div>
          <div class="calc-row total">
            <span>Capital Gain</span>
            <span>{{ fmt(result.capitalGain) }}</span>
          </div>

          <div class="calc-divider"></div>

          <div class="calc-row deduction" v-if="result.exclusionApplied > 0">
            <span>Less: Annual Exclusion</span>
            <span>({{ fmt(result.exclusionApplied) }})</span>
          </div>
          <div class="calc-row total">
            <span>Net Capital Gain</span>
            <span>{{ fmt(result.netGain) }}</span>
          </div>

          <div class="calc-divider"></div>

          <div class="calc-row">
            <span>Inclusion Rate (40%)</span>
            <span>{{ fmt(result.inclusionAmount) }}</span>
          </div>
          <div class="calc-row">
            <span>Marginal Tax Rate Applied</span>
            <span>{{ (marginalRate * 100).toFixed(0) }}%</span>
          </div>
          <div class="calc-divider"></div>
          <div class="calc-row total">
            <span>Estimated CGT</span>
            <span>{{ fmt(result.cgtAmount) }}</span>
          </div>
        </div>

        <div class="calc-summary">
          <div class="calc-stat">
            <div class="calc-stat-value">{{ result.effectiveCgtRate }}%</div>
            <div class="calc-stat-label">Effective CGT Rate on Gain</div>
          </div>
          <div class="calc-stat highlight">
            <div class="calc-stat-value">{{ fmt(result.cgtAmount) }}</div>
            <div class="calc-stat-label">Estimated Tax Due</div>
          </div>
        </div>

        <p v-if="result.capitalGain <= 0" class="calc-info-note">
          No capital gain — base cost exceeds proceeds. A capital loss may be carried forward to offset future gains.
        </p>

        <p class="calc-disclaimer">
          Individual inclusion rate is 40%. This estimate assumes the asset is held by
          a natural person and is not a primary residence (which carries a R2 million exclusion).
          Consult a tax professional for a full CGT assessment.
        </p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { TAX_YEARS } from '@/data/taxData.js'

const props = defineProps({
  taxYearKey: { type: String, required: true },
})

const yearData = computed(() => TAX_YEARS[props.taxYearKey])

const proceeds = ref(null)
const baseCost = ref(null)
const applyExclusion = ref(true)
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
  const p = Number(proceeds.value) || 0
  const bc = Number(baseCost.value) || 0

  const capitalGain = p - bc
  const exclusionApplied = applyExclusion.value ? Math.min(capitalGain, yd.cgtExclusion) : 0
  const netGain = Math.max(0, capitalGain - exclusionApplied)
  const inclusionAmount = netGain * yd.cgtInclusionRate
  const cgtAmount = inclusionAmount * marginalRate.value
  const effectiveCgtRate = capitalGain > 0
    ? ((cgtAmount / capitalGain) * 100).toFixed(2)
    : '0.00'

  result.value = {
    proceeds: p,
    baseCost: bc,
    capitalGain,
    exclusionApplied,
    netGain,
    inclusionAmount,
    cgtAmount,
    effectiveCgtRate,
  }
}
</script>
