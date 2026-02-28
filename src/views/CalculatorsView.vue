<template>
  <div id="calculators-page">
    <AppNav />

    <main class="calc-page-main">
      <!-- Page Header -->
      <section class="calc-page-hero">
        <div class="container">
          <div class="eyebrow fade-up">
            <span class="eyebrow-rule"></span>
            <span class="t-label">SARS Tax Tools</span>
          </div>
          <h1 class="t-display fade-up d1">
            Tax <em>Calculators</em>
          </h1>
          <p class="t-body calc-hero-body fade-up d2">
            Free, up-to-date tools for South African taxpayers. All figures
            automatically reflect the current SARS tax year.
          </p>

          <!-- Tax year selector -->
          <div class="calc-year-bar fade-up d3">
            <span class="calc-year-label">Tax Year:</span>
            <div class="calc-year-tabs">
              <button
                v-for="(yd, key) in TAX_YEARS"
                :key="key"
                :class="['calc-year-btn', { active: selectedYear === key }]"
                @click="selectedYear = key"
                type="button"
              >
                {{ yd.label }}
                <span v-if="key === currentYearKey" class="calc-year-current-badge">Current</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Calculator Tabs -->
      <section class="calc-section">
        <div class="container">
          <div class="calc-tabs fade-up">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              :class="['calc-tab', { active: activeTab === tab.id }]"
              @click="activeTab = tab.id"
              type="button"
            >
              <span class="calc-tab-icon">{{ tab.icon }}</span>
              <span class="calc-tab-label">{{ tab.label }}</span>
            </button>
          </div>

          <div class="calc-content-wrap fade-up d1">
            <!-- Income Tax -->
            <div v-show="activeTab === 'income'">
              <div class="calc-content-header">
                <h2 class="t-heading">Income Tax (PAYE)</h2>
                <p class="t-small">
                  Brackets: {{ selectedYearData.period }}
                </p>
              </div>
              <IncomeCalculator :taxYearKey="selectedYear" :key="`income-${selectedYear}`" />
            </div>

            <!-- VAT -->
            <div v-show="activeTab === 'vat'">
              <div class="calc-content-header">
                <h2 class="t-heading">VAT Calculator</h2>
                <p class="t-small">Standard rate: 15% · VAT stays unchanged for {{ selectedYearData.label }}</p>
              </div>
              <VatCalculator />
            </div>

            <!-- CGT -->
            <div v-show="activeTab === 'cgt'">
              <div class="calc-content-header">
                <h2 class="t-heading">Capital Gains Tax</h2>
                <p class="t-small">
                  40% inclusion rate · Annual exclusion: R{{ fmtNum(selectedYearData.cgtExclusion) }} · {{ selectedYearData.label }}
                </p>
              </div>
              <CgtCalculator :taxYearKey="selectedYear" :key="`cgt-${selectedYear}`" />
            </div>

            <!-- RA -->
            <div v-show="activeTab === 'ra'">
              <div class="calc-content-header">
                <h2 class="t-heading">Retirement Annuity Deduction</h2>
                <p class="t-small">
                  Max deduction: 27.5% of income or R{{ fmtNum(selectedYearData.raMaxAmount) }} · {{ selectedYearData.label }}
                </p>
              </div>
              <RaCalculator :taxYearKey="selectedYear" :key="`ra-${selectedYear}`" />
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="calc-cta-section">
        <div class="container">
          <div class="calc-cta-inner fade-up">
            <div class="eyebrow">
              <span class="eyebrow-rule"></span>
              <span class="t-label">Need Professional Advice?</span>
            </div>
            <h2 class="t-title">
              These tools give you direction.<br />
              <em>We give you certainty.</em>
            </h2>
            <p class="t-body">
              Our advisers review your full financial picture — salary structure,
              investments, retirement planning and compliance — and provide
              personalised tax optimisation strategies.
            </p>
            <RouterLink to="/#contact" class="btn btn-primary btn-arrow">
              Book a Consultation
            </RouterLink>
          </div>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useHead } from '@unhead/vue'
import AppNav from '@/components/shared/AppNav.vue'
import AppFooter from '@/components/shared/AppFooter.vue'
import IncomeCalculator from '@/components/calculators/IncomeCalculator.vue'
import VatCalculator from '@/components/calculators/VatCalculator.vue'
import CgtCalculator from '@/components/calculators/CgtCalculator.vue'
import RaCalculator from '@/components/calculators/RaCalculator.vue'
import { TAX_YEARS, getCurrentTaxYearKey } from '@/data/taxData.js'
import { useFadeUp } from '@/composables/useFadeUp.js'

useFadeUp()

const currentYearKey = getCurrentTaxYearKey()
const selectedYear = ref(currentYearKey)
const activeTab = ref('income')

const selectedYearData = computed(() => TAX_YEARS[selectedYear.value])

const tabs = [
  { id: 'income', label: 'Income Tax',       icon: '₂₆' },
  { id: 'vat',    label: 'VAT',              icon: '15%' },
  { id: 'cgt',    label: 'Capital Gains',    icon: 'CGT' },
  { id: 'ra',     label: 'Retirement RA',    icon: 'RA'  },
]

function fmtNum(val) {
  return Math.round(val).toLocaleString('en-ZA')
}

useHead({
  title: 'Tax Calculators | Snekhaya Tax & Accounting Advisory',
  meta: [
    { name: 'description', content: 'Free South African tax calculators: income tax (PAYE), VAT, capital gains tax (CGT) and retirement annuity deductions. Always updated to the current SARS tax year.' },
    { property: 'og:title', content: 'SA Tax Calculators | Snekhaya Advisory' },
    { property: 'og:description', content: 'Free, current-year PAYE, VAT, CGT and RA tax calculators for South African taxpayers.' },
  ],
  link: [{ rel: 'canonical', href: 'https://snekhaya.co.za/#/calculators' }],
})
</script>
