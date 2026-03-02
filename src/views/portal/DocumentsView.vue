<template>
  <div class="portal-page">
    <PortalNav />

    <main class="portal-main">
      <div class="portal-container">

        <!-- Page header -->
        <header class="page-header">
          <div>
            <h1 class="page-title">Documents</h1>
            <p class="page-sub">All your tax, financial and legal documents in one place.</p>
          </div>
          <button class="upload-btn" @click="fakeUpload">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
            </svg>
            Upload Document
          </button>
        </header>

        <!-- Category tabs -->
        <div class="cat-tabs">
          <button
            v-for="cat in categories"
            :key="cat.key"
            :class="['cat-tab', { active: activeCat === cat.key }]"
            @click="activeCat = cat.key"
          >
            {{ cat.label }}
            <span class="cat-count">{{ cat.key === 'all' ? docs.length : docs.filter(d => d.category === cat.key).length }}</span>
          </button>
        </div>

        <!-- Search -->
        <div class="search-wrap">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input v-model="search" type="search" placeholder="Search documents…" class="search-input" />
        </div>

        <!-- Document list -->
        <div class="doc-table-wrap">
          <table class="doc-table" v-if="filteredDocs.length">
            <thead>
              <tr>
                <th>Document</th>
                <th class="hide-sm">Category</th>
                <th class="hide-sm">Size</th>
                <th class="hide-sm">Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="doc in filteredDocs" :key="doc.id" class="doc-tr">
                <td class="doc-td-name">
                  <div class="doc-cell">
                    <div class="doc-icon" :class="`doc-icon-${doc.iconColor}`">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/>
                      </svg>
                    </div>
                    <div>
                      <div class="doc-filename">{{ doc.name }}</div>
                      <div class="doc-type-mobile hide-lg">{{ doc.type }}</div>
                    </div>
                  </div>
                </td>
                <td class="hide-sm">
                  <span class="doc-cat-badge" :class="`badge-${doc.category}`">{{ doc.type }}</span>
                </td>
                <td class="hide-sm doc-size">{{ doc.size }}</td>
                <td class="hide-sm doc-date">{{ doc.date }}</td>
                <td class="doc-actions">
                  <button class="action-btn" @click="fakeDownload(doc.name)" title="Download">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div v-else class="doc-empty">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/>
            </svg>
            <p>No documents found.</p>
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
import PortalNav from '@/components/portal/PortalNav.vue'

const search = ref('')
const activeCat = ref('all')

const categories = [
  { key: 'all', label: 'All' },
  { key: 'tax', label: 'Tax Returns' },
  { key: 'financial', label: 'Financial Statements' },
  { key: 'correspondence', label: 'Correspondence' },
]

const docs = [
  { id: 1,  name: 'ITR12 2024-25.pdf',                   category: 'tax',            type: 'Tax Return',              size: '2.4 MB', date: '15 Jan 2026', iconColor: 'gold' },
  { id: 2,  name: 'ITR12 2023-24.pdf',                   category: 'tax',            type: 'Tax Return',              size: '2.1 MB', date: '20 Jan 2025', iconColor: 'gold' },
  { id: 3,  name: 'ITR12 2022-23.pdf',                   category: 'tax',            type: 'Tax Return',              size: '1.9 MB', date: '10 Feb 2024', iconColor: 'gold' },
  { id: 4,  name: 'VAT201 Oct 2025.pdf',                 category: 'tax',            type: 'VAT Return',              size: '320 KB', date: '25 Nov 2025', iconColor: 'gold' },
  { id: 5,  name: 'VAT201 Aug 2025.pdf',                 category: 'tax',            type: 'VAT Return',              size: '295 KB', date: '25 Sep 2025', iconColor: 'gold' },
  { id: 6,  name: 'PAYE Registration.pdf',               category: 'tax',            type: 'SARS Registration',       size: '412 KB', date: '15 Sep 2023', iconColor: 'gold' },
  { id: 7,  name: 'VAT Registration Certificate.pdf',    category: 'tax',            type: 'SARS Registration',       size: '380 KB', date: '15 Sep 2023', iconColor: 'gold' },
  { id: 8,  name: 'AFS 2024.pdf',                        category: 'financial',      type: 'Annual Financial Stmts',  size: '1.1 MB', date: '01 Dec 2025', iconColor: 'blue' },
  { id: 9,  name: 'AFS 2023.pdf',                        category: 'financial',      type: 'Annual Financial Stmts',  size: '980 KB', date: '05 Dec 2024', iconColor: 'blue' },
  { id: 10, name: 'Management Accounts Q4 2025.pdf',     category: 'financial',      type: 'Management Accounts',     size: '542 KB', date: '31 Jan 2026', iconColor: 'blue' },
  { id: 11, name: 'Management Accounts Q3 2025.pdf',     category: 'financial',      type: 'Management Accounts',     size: '498 KB', date: '01 Nov 2025', iconColor: 'blue' },
  { id: 12, name: 'Tax Planning Letter 2026.pdf',        category: 'correspondence', type: 'Tax Planning Letter',     size: '185 KB', date: '05 Jan 2026', iconColor: 'purple' },
  { id: 13, name: 'Engagement Letter 2024.pdf',          category: 'correspondence', type: 'Engagement Letter',       size: '210 KB', date: '28 Feb 2024', iconColor: 'purple' },
]

const filteredDocs = computed(() => {
  let list = activeCat.value === 'all' ? docs : docs.filter(d => d.category === activeCat.value)
  if (search.value.trim()) {
    const q = search.value.trim().toLowerCase()
    list = list.filter(d => d.name.toLowerCase().includes(q) || d.type.toLowerCase().includes(q))
  }
  return list
})

// Toast
const toastMsg = ref('')
let toastTimer = null
function fakeDownload(name) {
  clearTimeout(toastTimer)
  toastMsg.value = `Downloading ${name}…`
  toastTimer = setTimeout(() => { toastMsg.value = '' }, 2800)
}
function fakeUpload() {
  clearTimeout(toastTimer)
  toastMsg.value = 'Upload feature coming soon — contact your advisor to share documents.'
  toastTimer = setTimeout(() => { toastMsg.value = '' }, 4000)
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
.upload-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background: var(--surface);
  color: var(--ink);
  border: 1.5px solid var(--border-mid);
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
  transition: border-color 0.15s, box-shadow 0.15s;
  flex-shrink: 0;
}
.upload-btn:hover {
  border-color: var(--gold);
  box-shadow: 0 0 0 3px var(--gold-pale);
  color: var(--gold);
}

/* Category tabs */
.cat-tabs {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.cat-tab {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 1rem;
  border: 1.5px solid var(--border-mid);
  border-radius: 99px;
  background: var(--surface);
  font-size: 0.8375rem;
  font-weight: 500;
  color: var(--ink-2);
  cursor: pointer;
  font-family: inherit;
  transition: border-color 0.15s, color 0.15s, background 0.15s;
}
.cat-tab:hover { border-color: var(--gold); color: var(--gold); }
.cat-tab.active {
  background: var(--gold);
  border-color: var(--gold);
  color: white;
}
.cat-count {
  font-size: 0.75rem;
  font-weight: 600;
  background: rgba(0,0,0,0.1);
  padding: 0.1rem 0.4rem;
  border-radius: 99px;
}
.cat-tab.active .cat-count { background: rgba(255,255,255,0.25); }

/* Search */
.search-wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.search-wrap svg {
  position: absolute;
  left: 0.875rem;
  color: var(--ink-3);
  pointer-events: none;
}
.search-input {
  width: 100%;
  max-width: 380px;
  padding: 0.625rem 0.9rem 0.625rem 2.5rem;
  border: 1.5px solid var(--border-mid);
  border-radius: 6px;
  font-size: 0.9rem;
  font-family: inherit;
  background: var(--surface);
  color: var(--ink);
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.search-input:focus {
  border-color: var(--gold);
  box-shadow: 0 0 0 3px var(--gold-pale);
}
.search-input::placeholder { color: var(--ink-4); }

/* Table */
.doc-table-wrap {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}
.doc-table {
  width: 100%;
  border-collapse: collapse;
}
.doc-table thead tr {
  border-bottom: 1px solid var(--border);
}
.doc-table th {
  padding: 0.875rem 1.25rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-3);
  text-align: left;
}
.doc-tr {
  border-bottom: 1px solid var(--border);
  transition: background 0.12s;
}
.doc-tr:last-child { border-bottom: none; }
.doc-tr:hover { background: var(--surface-2); }
.doc-tr td { padding: 0.875rem 1.25rem; vertical-align: middle; }

.doc-td-name { width: 100%; }
.doc-cell { display: flex; align-items: center; gap: 0.75rem; }
.doc-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.doc-icon-gold { background: rgba(184, 154, 78, 0.12); color: var(--gold); }
.doc-icon-blue { background: rgba(52, 152, 219, 0.1); color: #2980b9; }
.doc-icon-purple { background: rgba(155, 89, 182, 0.1); color: #8e44ad; }
.doc-filename {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--ink);
}
.doc-type-mobile { font-size: 0.78rem; color: var(--ink-3); margin-top: 0.1rem; }
.doc-size, .doc-date { font-size: 0.8375rem; color: var(--ink-3); white-space: nowrap; }
.doc-actions { text-align: right; }

/* Category badge */
.doc-cat-badge {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.25rem 0.625rem;
  border-radius: 99px;
  white-space: nowrap;
}
.badge-tax { background: rgba(184, 154, 78, 0.12); color: #8a6e28; }
.badge-financial { background: rgba(52, 152, 219, 0.1); color: #2471a3; }
.badge-correspondence { background: rgba(155, 89, 182, 0.1); color: #7d3c98; }

/* Action button */
.action-btn {
  width: 32px;
  height: 32px;
  border: 1px solid var(--border-mid);
  border-radius: 6px;
  background: none;
  color: var(--ink-3);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.15s, color 0.15s, background 0.15s;
}
.action-btn:hover { border-color: var(--gold); color: var(--gold); background: var(--gold-pale); }

/* Empty state */
.doc-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 4rem 1.5rem;
  color: var(--ink-4);
}
.doc-empty p { font-size: 0.9375rem; }

/* Responsive helpers */
@media (max-width: 640px) {
  .hide-sm { display: none; }
}
@media (min-width: 641px) {
  .hide-lg { display: none; }
}

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
