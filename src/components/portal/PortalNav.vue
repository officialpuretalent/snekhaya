<template>
  <nav class="pnav">
    <div class="pnav-inner">
      <!-- Brand -->
      <RouterLink to="/" class="pnav-brand">
        <span class="pnav-monogram">STA</span>
        <div class="pnav-vsep"></div>
        <div class="pnav-wm">
          <span class="pnav-wm-main">Snekhaya</span>
          <span class="pnav-wm-sub">Client Portal</span>
        </div>
      </RouterLink>

      <!-- Desktop nav links -->
      <div class="pnav-links">
        <RouterLink to="/portal/dashboard" class="pnav-link">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
          </svg>
          Dashboard
        </RouterLink>
        <RouterLink to="/portal/documents" class="pnav-link">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/>
          </svg>
          Documents
        </RouterLink>
        <RouterLink to="/portal/reports" class="pnav-link">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
          </svg>
          Reports
        </RouterLink>
      </div>

      <!-- User dropdown -->
      <div class="pnav-user" ref="userArea">
        <button class="pnav-user-btn" @click="userOpen = !userOpen">
          <span class="pnav-avatar">{{ initial }}</span>
          <span class="pnav-uname">{{ firstName }}</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
        <Transition name="drop">
          <div v-if="userOpen" class="pnav-drop">
            <div class="pnav-drop-info">
              <div class="pnav-drop-name">{{ user?.name }}</div>
              <div class="pnav-drop-email">{{ user?.email }}</div>
              <span class="pnav-drop-role">{{ user?.role === 'admin' ? 'Administrator' : 'Client' }}</span>
            </div>
            <div class="pnav-drop-divider"></div>
            <RouterLink to="/" class="pnav-drop-item" @click="userOpen = false">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/>
              </svg>
              Back to website
            </RouterLink>
            <button class="pnav-drop-item pnav-drop-danger" @click="handleLogout">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Sign Out
            </button>
          </div>
        </Transition>
      </div>

      <!-- Hamburger -->
      <button class="pnav-hamburger" @click="mobileOpen = !mobileOpen" :class="{ open: mobileOpen }" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
    </div>

    <!-- Mobile menu -->
    <Transition name="mobile">
      <div v-if="mobileOpen" class="pnav-mobile">
        <RouterLink to="/portal/dashboard" class="pnav-mobile-link" @click="mobileOpen = false">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
          </svg>
          Dashboard
        </RouterLink>
        <RouterLink to="/portal/documents" class="pnav-mobile-link" @click="mobileOpen = false">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/>
          </svg>
          Documents
        </RouterLink>
        <RouterLink to="/portal/reports" class="pnav-mobile-link" @click="mobileOpen = false">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
          </svg>
          Reports
        </RouterLink>
        <div class="pnav-mobile-divider"></div>
        <div class="pnav-mobile-user">
          <span class="pnav-avatar pnav-avatar-lg">{{ initial }}</span>
          <div>
            <div class="pnav-mobile-uname">{{ user?.name }}</div>
            <div class="pnav-mobile-uemail">{{ user?.email }}</div>
          </div>
        </div>
        <button class="pnav-mobile-signout" @click="handleLogout">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Sign Out
        </button>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const user = computed(() => auth.user)
const initial = computed(() => user.value?.name?.[0]?.toUpperCase() || '?')
const firstName = computed(() => user.value?.name?.split(' ')[0] || '')

const userOpen = ref(false)
const mobileOpen = ref(false)
const userArea = ref(null)

function handleLogout() {
  auth.logout()
  router.push('/portal/login')
}

function onDocClick(e) {
  if (userArea.value && !userArea.value.contains(e.target)) {
    userOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', onDocClick))
onUnmounted(() => document.removeEventListener('click', onDocClick))
</script>

<style scoped>
.pnav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  box-shadow: 0 1px 0 var(--border);
}

.pnav-inner {
  display: flex;
  align-items: center;
  height: 64px;
  padding: 0 1.5rem;
  gap: 0.5rem;
  max-width: 1280px;
  margin: 0 auto;
}

/* Brand */
.pnav-brand {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  text-decoration: none;
  flex-shrink: 0;
  margin-right: 1rem;
}
.pnav-monogram {
  font-family: 'Cormorant', serif;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--gold);
}
.pnav-vsep {
  width: 1px;
  height: 1.25rem;
  background: var(--border-mid);
}
.pnav-wm {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.pnav-wm-main {
  font-family: 'Cormorant', serif;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  color: var(--ink);
  line-height: 1.2;
}
.pnav-wm-sub {
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-3);
  line-height: 1;
}

/* Desktop links */
.pnav-links {
  display: none;
  align-items: center;
  gap: 0.125rem;
  flex: 1;
}
@media (min-width: 768px) {
  .pnav-links { display: flex; }
}
.pnav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.875rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--ink-2);
  text-decoration: none;
  transition: color 0.15s, background 0.15s;
}
.pnav-link:hover { color: var(--ink); background: var(--surface-2); }
.pnav-link.router-link-active {
  color: var(--gold);
  background: var(--gold-pale);
}

/* User area */
.pnav-user {
  position: relative;
  margin-left: auto;
}
@media (max-width: 767px) {
  .pnav-user { display: none; }
}
.pnav-user-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem 0.375rem 0.375rem;
  border: 1.5px solid var(--border-mid);
  border-radius: 99px;
  background: none;
  cursor: pointer;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.pnav-user-btn:hover {
  border-color: var(--gold);
  box-shadow: 0 0 0 3px var(--gold-pale);
}
.pnav-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--gold);
  color: white;
  font-size: 0.8125rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.pnav-avatar-lg { width: 40px; height: 40px; font-size: 1rem; }
.pnav-uname {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--ink);
}

/* Dropdown */
.pnav-drop {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background: var(--surface);
  border: 1px solid var(--border-mid);
  border-radius: 10px;
  box-shadow: var(--shadow-md);
  width: 230px;
  overflow: hidden;
}
.pnav-drop-info {
  padding: 1rem 1rem 0.875rem;
}
.pnav-drop-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--ink);
}
.pnav-drop-email {
  font-size: 0.8rem;
  color: var(--ink-3);
  margin-top: 0.125rem;
}
.pnav-drop-role {
  display: inline-block;
  margin-top: 0.5rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--gold);
  background: var(--gold-pale);
  padding: 0.2rem 0.5rem;
  border-radius: 99px;
}
.pnav-drop-divider {
  height: 1px;
  background: var(--border);
}
.pnav-drop-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  background: none;
  cursor: pointer;
  text-decoration: none;
  color: var(--ink-2);
  transition: background 0.12s;
  font-family: inherit;
}
.pnav-drop-item:hover { background: var(--surface-2); }
.pnav-drop-danger { color: #c0392b; }
.pnav-drop-danger:hover { background: #fff5f5; }

/* Hamburger */
.pnav-hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  padding: 6px;
  border: none;
  background: none;
  cursor: pointer;
  margin-left: auto;
  border-radius: 6px;
  transition: background 0.15s;
}
.pnav-hamburger:hover { background: var(--surface-2); }
@media (min-width: 768px) { .pnav-hamburger { display: none; } }
.pnav-hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--ink);
  border-radius: 2px;
  transition: 0.22s;
  transform-origin: center;
}
.pnav-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.pnav-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.pnav-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

/* Mobile menu */
.pnav-mobile {
  background: var(--surface);
  border-top: 1px solid var(--border);
  padding: 0.625rem 1.25rem 1.5rem;
}
.pnav-mobile-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 0.375rem;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--ink-2);
  text-decoration: none;
  border-bottom: 1px solid var(--border);
}
.pnav-mobile-link.router-link-active { color: var(--gold); }
.pnav-mobile-divider {
  height: 1px;
  background: var(--border);
  margin: 1rem 0 0.75rem;
}
.pnav-mobile-user {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  margin-bottom: 0.75rem;
}
.pnav-mobile-uname { font-size: 0.9rem; font-weight: 600; color: var(--ink); }
.pnav-mobile-uemail { font-size: 0.8rem; color: var(--ink-3); margin-top: 0.1rem; }
.pnav-mobile-signout {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ffd5d5;
  border-radius: 6px;
  background: #fff5f5;
  color: #c0392b;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
}

/* Transitions */
.drop-enter-active, .drop-leave-active { transition: opacity 0.15s, transform 0.15s; }
.drop-enter-from, .drop-leave-to { opacity: 0; transform: translateY(-8px); }
.mobile-enter-active, .mobile-leave-active { transition: opacity 0.2s; }
.mobile-enter-from, .mobile-leave-to { opacity: 0; }
</style>
