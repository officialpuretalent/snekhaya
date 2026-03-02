<template>
  <div class="portal-page">
    <PortalNav />

    <main class="portal-main">
      <div class="portal-container">

        <!-- Header -->
        <header class="dash-header">
          <div>
            <p class="dash-greeting">{{ greeting }}, {{ firstName }}.</p>
            <p class="dash-date">{{ currentDate }}</p>
          </div>
          <RouterLink to="/booking" class="dash-cta">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Book Appointment
          </RouterLink>
        </header>

        <!-- Stat cards -->
        <div class="dash-stats">
          <div class="stat-card">
            <div class="stat-icon stat-doc">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/>
              </svg>
            </div>
            <div class="stat-num">12</div>
            <div class="stat-lbl">Documents</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon stat-cal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <div class="stat-num">2</div>
            <div class="stat-lbl">Upcoming Meetings</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon stat-bell">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
              </svg>
            </div>
            <div class="stat-num">3</div>
            <div class="stat-lbl">Notifications</div>
          </div>
          <div class="stat-card">
            <div class="stat-icon stat-report">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
            </div>
            <div class="stat-num">3</div>
            <div class="stat-lbl">Reports Available</div>
          </div>
        </div>

        <!-- Two-column grid -->
        <div class="dash-grid">

          <!-- Recent documents -->
          <section class="dash-card">
            <div class="dash-card-head">
              <h2 class="dash-card-title">Recent Documents</h2>
              <RouterLink to="/portal/documents" class="dash-card-link">View all →</RouterLink>
            </div>
            <div class="doc-list">
              <div v-for="doc in recentDocs" :key="doc.id" class="doc-row">
                <div class="doc-file-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/>
                  </svg>
                </div>
                <div class="doc-info">
                  <div class="doc-name">{{ doc.name }}</div>
                  <div class="doc-meta">{{ doc.type }} · {{ doc.date }}</div>
                </div>
                <button class="doc-dl-btn" @click="fakeDownload(doc.name)" title="Download">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                </button>
              </div>
            </div>
          </section>

          <!-- Upcoming appointments -->
          <section class="dash-card">
            <div class="dash-card-head">
              <h2 class="dash-card-title">Upcoming Meetings</h2>
              <RouterLink to="/booking" class="dash-card-link">Book new →</RouterLink>
            </div>
            <div class="appt-list">
              <div v-for="appt in appointments" :key="appt.id" class="appt-row">
                <div class="appt-date-block">
                  <span class="appt-day">{{ appt.day }}</span>
                  <span class="appt-mon">{{ appt.month }}</span>
                </div>
                <div class="appt-info">
                  <div class="appt-title">{{ appt.title }}</div>
                  <div class="appt-meta">{{ appt.time }} · {{ appt.type }}</div>
                </div>
                <span class="appt-badge">Confirmed</span>
              </div>
            </div>
          </section>
        </div>

        <!-- Notifications -->
        <section class="dash-card">
          <div class="dash-card-head">
            <h2 class="dash-card-title">Notifications</h2>
          </div>
          <div class="notif-list">
            <div v-for="n in notifications" :key="n.id" class="notif-row" :class="{ unread: !n.read }">
              <div class="notif-dot" v-if="!n.read"></div>
              <div class="notif-icon-wrap" :class="`notif-${n.type}`">
                <svg v-if="n.type === 'doc'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/>
                </svg>
                <svg v-else-if="n.type === 'cal'" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <div class="notif-body">
                <div class="notif-title">{{ n.title }}</div>
                <div class="notif-sub">{{ n.body }}</div>
              </div>
              <div class="notif-time">{{ n.time }}</div>
            </div>
          </div>
        </section>

      </div>
    </main>

    <!-- Download toast -->
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
const firstName = computed(() => user.value?.name?.split(' ')[0] || 'there')

// Greeting based on time of day
const greeting = computed(() => {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
})

const currentDate = computed(() => {
  return new Date().toLocaleDateString('en-ZA', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })
})

// Fake recent documents
const recentDocs = [
  { id: 1, name: 'ITR12 2024/25.pdf', type: 'Tax Return', date: '15 Jan 2026' },
  { id: 2, name: 'AFS 2024.pdf', type: 'Financial Statements', date: '01 Dec 2025' },
  { id: 3, name: 'Management Accounts Q4 2025.pdf', type: 'Management Accounts', date: '31 Jan 2026' },
  { id: 4, name: 'VAT201 Oct 2025.pdf', type: 'VAT Return', date: '25 Nov 2025' },
  { id: 5, name: 'Tax Planning Letter 2026.pdf', type: 'Correspondence', date: '05 Jan 2026' },
]

// Fake appointments
const appointments = [
  { id: 1, day: '10', month: 'Mar', title: 'Tax Planning Review', time: '10:00 AM', type: 'Video call' },
  { id: 2, day: '19', month: 'Mar', title: 'Annual Audit Discussion', time: '2:00 PM', type: 'In-person' },
]

// Fake notifications
const notifications = [
  { id: 1, type: 'doc', title: 'ITR12 2024/25 Ready', body: 'Your tax return has been completed and is ready for review.', time: '2 days ago', read: false },
  { id: 2, type: 'cal', title: 'Meeting Reminder', body: 'Tax Planning Review on Monday 10 March at 10:00 AM.', time: '3 days ago', read: false },
  { id: 3, type: 'info', title: 'VAT Filing Deadline', body: 'Your VAT return for the Feb 2026 period is due 25 March 2026.', time: '5 days ago', read: false },
  { id: 4, type: 'doc', title: 'Financial Statements Uploaded', body: 'Annual Financial Statements for 2024 are now available.', time: '2 months ago', read: true },
]

// Toast
const toastMsg = ref('')
let toastTimer = null
function fakeDownload(name) {
  clearTimeout(toastTimer)
  toastMsg.value = `Downloading ${name}…`
  toastTimer = setTimeout(() => { toastMsg.value = '' }, 2800)
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
.dash-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}
.dash-greeting {
  font-family: 'Cormorant', serif;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 400;
  color: var(--ink);
  line-height: 1.2;
}
.dash-date {
  font-size: 0.875rem;
  color: var(--ink-3);
  margin-top: 0.25rem;
}
.dash-cta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background: var(--gold);
  color: white;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  transition: background 0.15s;
  flex-shrink: 0;
}
.dash-cta:hover { background: #c9ae72; }

/* Stat cards */
.dash-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
@media (min-width: 640px) { .dash-stats { grid-template-columns: repeat(4, 1fr); } }

.stat-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-shadow: var(--shadow-sm);
}
.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.stat-doc { background: rgba(184, 154, 78, 0.12); color: var(--gold); }
.stat-cal { background: rgba(52, 152, 219, 0.1); color: #2980b9; }
.stat-bell { background: rgba(155, 89, 182, 0.1); color: #8e44ad; }
.stat-report { background: rgba(39, 174, 96, 0.1); color: #27ae60; }
.stat-num {
  font-family: 'Cormorant', serif;
  font-size: 2rem;
  font-weight: 500;
  color: var(--ink);
  line-height: 1;
}
.stat-lbl {
  font-size: 0.8125rem;
  color: var(--ink-3);
  font-weight: 500;
}

/* Two-col grid */
.dash-grid {
  display: grid;
  gap: 1.5rem;
}
@media (min-width: 768px) { .dash-grid { grid-template-columns: 1fr 1fr; } }

/* Cards */
.dash-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}
.dash-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--border);
}
.dash-card-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--ink);
}
.dash-card-link {
  font-size: 0.8125rem;
  color: var(--gold);
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.15s;
}
.dash-card-link:hover { opacity: 0.75; }

/* Document list */
.doc-list { display: flex; flex-direction: column; }
.doc-row {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 0.875rem 1.5rem;
  border-bottom: 1px solid var(--border);
  transition: background 0.12s;
}
.doc-row:last-child { border-bottom: none; }
.doc-row:hover { background: var(--surface-2); }
.doc-file-icon {
  width: 32px;
  height: 32px;
  border-radius: 7px;
  background: var(--gold-pale);
  color: var(--gold);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.doc-info { flex: 1; min-width: 0; }
.doc-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--ink);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.doc-meta { font-size: 0.78rem; color: var(--ink-3); margin-top: 0.1rem; }
.doc-dl-btn {
  width: 30px;
  height: 30px;
  border: 1px solid var(--border-mid);
  border-radius: 6px;
  background: none;
  color: var(--ink-3);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: border-color 0.15s, color 0.15s, background 0.15s;
}
.doc-dl-btn:hover { border-color: var(--gold); color: var(--gold); background: var(--gold-pale); }

/* Appointment list */
.appt-list { display: flex; flex-direction: column; }
.appt-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--border);
}
.appt-row:last-child { border-bottom: none; }
.appt-date-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 48px;
  background: var(--gold-pale);
  border-radius: 8px;
  flex-shrink: 0;
}
.appt-day {
  font-family: 'Cormorant', serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--gold);
  line-height: 1;
}
.appt-mon {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--gold);
  line-height: 1.2;
}
.appt-info { flex: 1; }
.appt-title { font-size: 0.875rem; font-weight: 600; color: var(--ink); }
.appt-meta { font-size: 0.78rem; color: var(--ink-3); margin-top: 0.1rem; }
.appt-badge {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #27ae60;
  background: rgba(39, 174, 96, 0.1);
  padding: 0.25rem 0.625rem;
  border-radius: 99px;
}

/* Notifications */
.notif-list { display: flex; flex-direction: column; }
.notif-row {
  display: flex;
  align-items: flex-start;
  gap: 0.875rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--border);
  position: relative;
  transition: background 0.12s;
}
.notif-row:last-child { border-bottom: none; }
.notif-row.unread { background: #fdfcf8; }
.notif-row.unread:hover { background: #faf8f2; }
.notif-dot {
  position: absolute;
  left: 0.625rem;
  top: 1.25rem;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--gold);
  flex-shrink: 0;
}
.notif-icon-wrap {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 0.1rem;
}
.notif-doc { background: rgba(184, 154, 78, 0.12); color: var(--gold); }
.notif-cal { background: rgba(52, 152, 219, 0.1); color: #2980b9; }
.notif-info { background: rgba(155, 89, 182, 0.1); color: #8e44ad; }
.notif-body { flex: 1; min-width: 0; }
.notif-title { font-size: 0.875rem; font-weight: 600; color: var(--ink); }
.notif-sub { font-size: 0.8125rem; color: var(--ink-3); margin-top: 0.2rem; line-height: 1.4; }
.notif-time { font-size: 0.78rem; color: var(--ink-4); white-space: nowrap; margin-top: 0.125rem; }

/* Download toast */
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
  white-space: nowrap;
}
.toast-enter-active, .toast-leave-active { transition: opacity 0.25s, transform 0.25s; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateX(-50%) translateY(10px); }
</style>
