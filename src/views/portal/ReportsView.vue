<template>
  <div class="portal-page">
    <PortalNav />

    <main class="portal-main">
      <div class="portal-container">

        <!-- Page header -->
        <header class="page-header">
          <div>
            <h1 class="page-title">Reports &amp; Statements</h1>
            <p class="page-sub">Financial reports prepared by Snekhaya Tax &amp; Accounting Advisory.</p>
          </div>
          <div class="header-controls">
            <select v-model="selectedYear" class="year-select">
              <option value="2025">Year ended Feb 2025</option>
              <option value="2024">Year ended Feb 2024</option>
              <option value="2023">Year ended Feb 2023</option>
            </select>
            <button class="print-btn" @click="fakePrint">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>
              </svg>
              Download PDF
            </button>
          </div>
        </header>

        <!-- Report tabs -->
        <div class="report-tabs">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            :class="['report-tab', { active: activeTab === tab.key }]"
            @click="activeTab = tab.key"
          >
            <component :is="'svg'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-html="tab.icon"></component>
            {{ tab.label }}
          </button>
        </div>

        <!-- Disclaimer -->
        <div class="report-disclaimer">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          This is a demonstration of your portal. All figures shown are illustrative and do not represent actual financial data.
        </div>

        <!-- ── Income Statement ── -->
        <div v-show="activeTab === 'income'" class="report-card">
          <div class="report-card-head">
            <div>
              <div class="report-eyebrow">Profit &amp; Loss</div>
              <h2 class="report-card-title">Income Statement</h2>
              <div class="report-period">For the year ended 28 February {{ selectedYear }}</div>
            </div>
            <div class="report-entity">
              <div class="report-entity-name">{{ user?.company || 'Your Company (Pty) Ltd' }}</div>
              <div class="report-entity-reg">Registration No. 2019/012345/07</div>
            </div>
          </div>

          <div class="fin-table-wrap">
            <table class="fin-table">
              <thead>
                <tr>
                  <th></th>
                  <th class="num-col">{{ selectedYear }}</th>
                  <th class="num-col prev-col">{{ Number(selectedYear) - 1 }}</th>
                </tr>
              </thead>
              <tbody>
                <tr class="section-head"><td colspan="3">Revenue</td></tr>
                <tr><td class="indent">Service revenue</td><td class="num">{{ fmt(1_234_567) }}</td><td class="num prev">{{ fmt(1_098_234) }}</td></tr>
                <tr><td class="indent">Other income</td><td class="num">{{ fmt(18_500) }}</td><td class="num prev">{{ fmt(12_000) }}</td></tr>
                <tr class="subtotal"><td>Total revenue</td><td class="num">{{ fmt(1_253_067) }}</td><td class="num prev">{{ fmt(1_110_234) }}</td></tr>

                <tr class="section-spacer"><td colspan="3"></td></tr>
                <tr class="section-head"><td colspan="3">Operating expenses</td></tr>
                <tr><td class="indent">Cost of services</td><td class="num neg">{{ fmt(-456_789) }}</td><td class="num prev neg">{{ fmt(-402_345) }}</td></tr>
                <tr><td class="indent">Employee costs</td><td class="num neg">{{ fmt(-198_450) }}</td><td class="num prev neg">{{ fmt(-175_200) }}</td></tr>
                <tr><td class="indent">Occupancy costs</td><td class="num neg">{{ fmt(-48_000) }}</td><td class="num prev neg">{{ fmt(-44_000) }}</td></tr>
                <tr><td class="indent">Administration</td><td class="num neg">{{ fmt(-66_000) }}</td><td class="num prev neg">{{ fmt(-58_500) }}</td></tr>
                <tr class="subtotal"><td>Total operating expenses</td><td class="num neg">{{ fmt(-769_239) }}</td><td class="num prev neg">{{ fmt(-680_045) }}</td></tr>

                <tr class="section-spacer"><td colspan="3"></td></tr>
                <tr class="total-row"><td>EBITDA</td><td class="num">{{ fmt(483_828) }}</td><td class="num prev">{{ fmt(430_189) }}</td></tr>
                <tr><td class="indent">Depreciation &amp; amortisation</td><td class="num neg">{{ fmt(-45_000) }}</td><td class="num prev neg">{{ fmt(-40_000) }}</td></tr>
                <tr class="total-row"><td>Operating profit (EBIT)</td><td class="num">{{ fmt(438_828) }}</td><td class="num prev">{{ fmt(390_189) }}</td></tr>

                <tr class="section-spacer"><td colspan="3"></td></tr>
                <tr><td class="indent">Finance costs</td><td class="num neg">{{ fmt(-18_750) }}</td><td class="num prev neg">{{ fmt(-22_400) }}</td></tr>
                <tr class="total-row"><td>Profit before tax</td><td class="num">{{ fmt(420_078) }}</td><td class="num prev">{{ fmt(367_789) }}</td></tr>
                <tr><td class="indent">Income tax expense</td><td class="num neg">{{ fmt(-117_622) }}</td><td class="num prev neg">{{ fmt(-102_981) }}</td></tr>

                <tr class="grand-total"><td>Net profit for the year</td><td class="num">{{ fmt(302_456) }}</td><td class="num prev">{{ fmt(264_808) }}</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- ── Balance Sheet ── -->
        <div v-show="activeTab === 'balance'" class="report-card">
          <div class="report-card-head">
            <div>
              <div class="report-eyebrow">Statement of Financial Position</div>
              <h2 class="report-card-title">Balance Sheet</h2>
              <div class="report-period">As at 28 February {{ selectedYear }}</div>
            </div>
            <div class="report-entity">
              <div class="report-entity-name">{{ user?.company || 'Your Company (Pty) Ltd' }}</div>
              <div class="report-entity-reg">Registration No. 2019/012345/07</div>
            </div>
          </div>

          <div class="fin-table-wrap">
            <table class="fin-table">
              <thead>
                <tr>
                  <th></th>
                  <th class="num-col">{{ selectedYear }}</th>
                  <th class="num-col prev-col">{{ Number(selectedYear) - 1 }}</th>
                </tr>
              </thead>
              <tbody>
                <tr class="section-head"><td colspan="3">Assets</td></tr>
                <tr class="section-head sub"><td colspan="3">Non-current assets</td></tr>
                <tr><td class="indent">Property, plant &amp; equipment</td><td class="num">{{ fmt(425_000) }}</td><td class="num prev">{{ fmt(460_000) }}</td></tr>
                <tr><td class="indent">Vehicles</td><td class="num">{{ fmt(280_000) }}</td><td class="num prev">{{ fmt(340_000) }}</td></tr>
                <tr><td class="indent">Intangible assets</td><td class="num">{{ fmt(45_000) }}</td><td class="num prev">{{ fmt(52_000) }}</td></tr>
                <tr class="subtotal"><td>Total non-current assets</td><td class="num">{{ fmt(750_000) }}</td><td class="num prev">{{ fmt(852_000) }}</td></tr>

                <tr class="section-spacer"><td colspan="3"></td></tr>
                <tr class="section-head sub"><td colspan="3">Current assets</td></tr>
                <tr><td class="indent">Inventory</td><td class="num">{{ fmt(82_400) }}</td><td class="num prev">{{ fmt(76_200) }}</td></tr>
                <tr><td class="indent">Trade receivables</td><td class="num">{{ fmt(198_650) }}</td><td class="num prev">{{ fmt(212_340) }}</td></tr>
                <tr><td class="indent">Cash and cash equivalents</td><td class="num">{{ fmt(312_480) }}</td><td class="num prev">{{ fmt(198_650) }}</td></tr>
                <tr class="subtotal"><td>Total current assets</td><td class="num">{{ fmt(593_530) }}</td><td class="num prev">{{ fmt(487_190) }}</td></tr>

                <tr class="grand-total"><td>Total assets</td><td class="num">{{ fmt(1_343_530) }}</td><td class="num prev">{{ fmt(1_339_190) }}</td></tr>

                <tr class="section-spacer"><td colspan="3"></td></tr>
                <tr class="section-head"><td colspan="3">Equity &amp; Liabilities</td></tr>
                <tr class="section-head sub"><td colspan="3">Equity</td></tr>
                <tr><td class="indent">Share capital</td><td class="num">{{ fmt(100) }}</td><td class="num prev">{{ fmt(100) }}</td></tr>
                <tr><td class="indent">Retained earnings</td><td class="num">{{ fmt(789_136) }}</td><td class="num prev">{{ fmt(486_680) }}</td></tr>
                <tr class="subtotal"><td>Total equity</td><td class="num">{{ fmt(789_236) }}</td><td class="num prev">{{ fmt(486_780) }}</td></tr>

                <tr class="section-spacer"><td colspan="3"></td></tr>
                <tr class="section-head sub"><td colspan="3">Non-current liabilities</td></tr>
                <tr><td class="indent">Long-term borrowings</td><td class="num">{{ fmt(350_000) }}</td><td class="num prev">{{ fmt(560_000) }}</td></tr>
                <tr><td class="indent">Deferred tax</td><td class="num">{{ fmt(45_294) }}</td><td class="num prev">{{ fmt(38_110) }}</td></tr>
                <tr class="subtotal"><td>Total non-current liabilities</td><td class="num">{{ fmt(395_294) }}</td><td class="num prev">{{ fmt(598_110) }}</td></tr>

                <tr class="section-spacer"><td colspan="3"></td></tr>
                <tr class="section-head sub"><td colspan="3">Current liabilities</td></tr>
                <tr><td class="indent">Trade payables</td><td class="num">{{ fmt(98_345) }}</td><td class="num prev">{{ fmt(110_200) }}</td></tr>
                <tr><td class="indent">VAT payable</td><td class="num">{{ fmt(22_455) }}</td><td class="num prev">{{ fmt(19_300) }}</td></tr>
                <tr><td class="indent">Income tax payable</td><td class="num">{{ fmt(38_200) }}</td><td class="num prev">{{ fmt(124_800) }}</td></tr>
                <tr class="subtotal"><td>Total current liabilities</td><td class="num">{{ fmt(159_000) }}</td><td class="num prev">{{ fmt(254_300) }}</td></tr>

                <tr class="grand-total"><td>Total equity &amp; liabilities</td><td class="num">{{ fmt(1_343_530) }}</td><td class="num prev">{{ fmt(1_339_190) }}</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- ── Tax Summary ── -->
        <div v-show="activeTab === 'tax'" class="report-card">
          <div class="report-card-head">
            <div>
              <div class="report-eyebrow">SARS Summary</div>
              <h2 class="report-card-title">Tax Summary</h2>
              <div class="report-period">Tax year ended 28 February {{ selectedYear }}</div>
            </div>
            <div class="report-entity">
              <div class="report-entity-name">{{ user?.company || 'Your Company (Pty) Ltd' }}</div>
              <div class="report-entity-reg">Registration No. 2019/012345/07</div>
            </div>
          </div>

          <div class="tax-grid">
            <div class="tax-stat-card">
              <div class="tax-stat-label">Taxable income</div>
              <div class="tax-stat-value">{{ fmt(420_078) }}</div>
              <div class="tax-stat-sub">After deductions &amp; allowances</div>
            </div>
            <div class="tax-stat-card">
              <div class="tax-stat-label">Corporate tax (28%)</div>
              <div class="tax-stat-value tax-stat-neg">{{ fmt(-117_622) }}</div>
              <div class="tax-stat-sub">Normal income tax</div>
            </div>
            <div class="tax-stat-card">
              <div class="tax-stat-label">VAT payable</div>
              <div class="tax-stat-value tax-stat-neg">{{ fmt(-22_455) }}</div>
              <div class="tax-stat-sub">Net VAT (bi-monthly)</div>
            </div>
            <div class="tax-stat-card">
              <div class="tax-stat-label">Effective tax rate</div>
              <div class="tax-stat-value">27.99%</div>
              <div class="tax-stat-sub">Corporate tax / profit before tax</div>
            </div>
          </div>

          <div class="fin-table-wrap" style="margin-top: 1.5rem;">
            <table class="fin-table">
              <thead>
                <tr>
                  <th>Tax type</th>
                  <th class="num-col">Amount (R)</th>
                  <th>Status</th>
                  <th>Due date</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Income Tax (ITR14)</td><td class="num neg">{{ fmt(-117_622) }}</td><td><span class="status-badge paid">Paid</span></td><td class="doc-date">30 Sep {{ selectedYear }}</td></tr>
                <tr><td>Provisional Tax (IRP6 — 1st)</td><td class="num neg">{{ fmt(-55_000) }}</td><td><span class="status-badge paid">Paid</span></td><td class="doc-date">31 Aug {{ Number(selectedYear) - 1 }}</td></tr>
                <tr><td>Provisional Tax (IRP6 — 2nd)</td><td class="num neg">{{ fmt(-62_622) }}</td><td><span class="status-badge paid">Paid</span></td><td class="doc-date">28 Feb {{ selectedYear }}</td></tr>
                <tr><td>VAT (Oct/Nov)</td><td class="num neg">{{ fmt(-22_455) }}</td><td><span class="status-badge paid">Paid</span></td><td class="doc-date">25 Nov {{ Number(selectedYear) - 1 }}</td></tr>
                <tr><td>PAYE (Annual reconciliation)</td><td class="num neg">{{ fmt(-198_450) }}</td><td><span class="status-badge paid">Paid</span></td><td class="doc-date">31 May {{ selectedYear }}</td></tr>
                <tr><td>VAT (Feb period)</td><td class="num neg">{{ fmt(-18_200) }}</td><td><span class="status-badge pending">Due 25 Mar {{ selectedYear }}</span></td><td class="doc-date">25 Mar {{ selectedYear }}</td></tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>

    <!-- Toast -->
    <Transition name="toast">
      <div v-if="toastMsg" class="dl-toast">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        {{ toastMsg }}
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import PortalNav from '@/components/portal/PortalNav.vue'

const auth = useAuthStore()
const user = computed(() => auth.user)

const selectedYear = ref('2025')
const activeTab = ref('income')

const tabs = [
  { key: 'income',  label: 'Income Statement',   icon: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>' },
  { key: 'balance', label: 'Balance Sheet',       icon: '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>' },
  { key: 'tax',     label: 'Tax Summary',         icon: '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>' },
]

function fmt(n) {
  const abs = Math.abs(n)
  const formatted = abs.toLocaleString('en-ZA', { minimumFractionDigits: 0 })
  return n < 0 ? `(${formatted})` : formatted
}

const toastMsg = ref('')
let toastTimer = null
function fakePrint() {
  clearTimeout(toastTimer)
  toastMsg.value = 'Preparing PDF — this feature is coming soon.'
  toastTimer = setTimeout(() => { toastMsg.value = '' }, 3000)
}
</script>

<style scoped>
.portal-page {
  min-height: 100vh;
  background: var(--surface-2);
  font-family: 'DM Sans', system-ui, sans-serif;
}
.portal-main { padding: 2.5rem 0 4rem; }
.portal-container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Header */
.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}
.page-title {
  font-family: 'Cormorant', serif;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 400;
  color: var(--ink);
}
.page-sub { font-size: 0.9rem; color: var(--ink-3); margin-top: 0.25rem; }
.header-controls { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; flex-shrink: 0; }
.year-select {
  padding: 0.55rem 0.875rem;
  border: 1.5px solid var(--border-mid);
  border-radius: 6px;
  font-size: 0.875rem;
  font-family: inherit;
  background: var(--surface);
  color: var(--ink);
  outline: none;
  cursor: pointer;
  transition: border-color 0.15s;
}
.year-select:focus { border-color: var(--gold); }
.print-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1.125rem;
  background: var(--surface);
  color: var(--ink);
  border: 1.5px solid var(--border-mid);
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: border-color 0.15s, box-shadow 0.15s, color 0.15s;
}
.print-btn:hover {
  border-color: var(--gold);
  box-shadow: 0 0 0 3px var(--gold-pale);
  color: var(--gold);
}

/* Report tabs */
.report-tabs {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.report-tab {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.625rem 1.125rem;
  border: 1.5px solid var(--border-mid);
  border-radius: 99px;
  background: var(--surface);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--ink-2);
  cursor: pointer;
  font-family: inherit;
  transition: all 0.15s;
}
.report-tab:hover { border-color: var(--gold); color: var(--gold); }
.report-tab.active {
  background: var(--gold);
  border-color: var(--gold);
  color: white;
}

/* Disclaimer */
.report-disclaimer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #fffbf0;
  border: 1px solid rgba(184, 154, 78, 0.3);
  border-radius: 6px;
  font-size: 0.8375rem;
  color: #8a6e28;
}

/* Report card */
.report-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}
.report-card-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1.5rem 1.75rem;
  border-bottom: 1px solid var(--border);
  flex-wrap: wrap;
}
.report-eyebrow {
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 0.375rem;
}
.report-card-title {
  font-family: 'Cormorant', serif;
  font-size: 1.375rem;
  font-weight: 500;
  color: var(--ink);
}
.report-period {
  font-size: 0.8375rem;
  color: var(--ink-3);
  margin-top: 0.25rem;
}
.report-entity { text-align: right; }
.report-entity-name { font-size: 0.9rem; font-weight: 600; color: var(--ink); }
.report-entity-reg { font-size: 0.78rem; color: var(--ink-3); margin-top: 0.125rem; }

/* Financial table */
.fin-table-wrap { overflow-x: auto; }
.fin-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 480px;
}
.fin-table td, .fin-table th {
  padding: 0.55rem 1.75rem;
  font-size: 0.875rem;
  vertical-align: middle;
}
.fin-table th {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-3);
  text-align: right;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border);
}
.fin-table th:first-child { text-align: left; }
.fin-table tbody tr { border-bottom: 1px solid rgba(0,0,0,0.04); transition: background 0.1s; }
.fin-table tbody tr:hover { background: var(--surface-2); }
.num-col { width: 130px; }
.prev-col { width: 130px; }

.num { text-align: right; font-variant-numeric: tabular-nums; color: var(--ink-2); }
.prev { color: var(--ink-4); }
.neg { color: var(--ink-2); }
.indent { padding-left: 3rem !important; color: var(--ink-2); }
.section-head > td { font-weight: 700; color: var(--ink); padding-top: 1.25rem; font-size: 0.8125rem; letter-spacing: 0.04em; text-transform: uppercase; }
.section-head.sub > td { font-weight: 600; font-size: 0.875rem; text-transform: none; letter-spacing: 0; color: var(--ink); padding-top: 0.875rem; }
.section-spacer td { padding: 0.25rem !important; }
.subtotal { border-top: 1px solid var(--border-mid) !important; }
.subtotal td { font-weight: 600; color: var(--ink); }
.total-row td { font-weight: 600; color: var(--ink); border-top: 1px solid var(--border-mid); }
.grand-total { border-top: 2px solid var(--ink) !important; }
.grand-total td { font-weight: 700; color: var(--ink); font-size: 0.9375rem; padding-top: 0.75rem; padding-bottom: 0.75rem; }

/* Tax stat cards */
.tax-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding: 1.5rem 1.75rem;
  border-bottom: 1px solid var(--border);
}
@media (min-width: 640px) { .tax-grid { grid-template-columns: repeat(4, 1fr); } }
.tax-stat-card {
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1rem;
}
.tax-stat-label {
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--ink-3);
  margin-bottom: 0.5rem;
}
.tax-stat-value {
  font-family: 'Cormorant', serif;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--ink);
  line-height: 1;
  margin-bottom: 0.375rem;
}
.tax-stat-neg { color: #c0392b; }
.tax-stat-sub { font-size: 0.75rem; color: var(--ink-4); line-height: 1.3; }

/* Status badges */
.status-badge {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.25rem 0.625rem;
  border-radius: 99px;
}
.status-badge.paid { background: rgba(39, 174, 96, 0.1); color: #27ae60; }
.status-badge.pending { background: rgba(230, 126, 34, 0.1); color: #d35400; }

.doc-date { font-size: 0.8375rem; color: var(--ink-3); }

/* Toast */
.dl-toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background: var(--ink);
  color: white;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: var(--shadow-md);
  z-index: 500;
  max-width: 90vw;
  text-align: center;
}
.toast-enter-active, .toast-leave-active { transition: opacity 0.25s, transform 0.25s; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateX(-50%) translateY(10px); }
</style>
