<template>
  <div class="auth-page">

    <!-- ─── Left: Brand panel (desktop) ─── -->
    <aside class="auth-brand">
      <div class="auth-brand-inner">
        <RouterLink to="/" class="auth-logo-link">
          <span class="auth-monogram">STA</span>
          <div class="auth-vsep"></div>
          <div>
            <div class="auth-wm-main">Snekhaya</div>
            <div class="auth-wm-sub">Tax &amp; Accounting Advisory</div>
          </div>
        </RouterLink>

        <div class="auth-brand-body">
          <div class="auth-brand-eyebrow">Client Portal</div>
          <h1 class="auth-brand-heading">
            Your finances,<br>at your&nbsp;fingertips.
          </h1>
          <div class="auth-brand-rule"></div>
          <blockquote class="auth-brand-quote">
            "Snekhaya transformed how I manage my business taxes. Professional,
            thorough, and always available when I need them most."
            <cite>— Thabo Mokoena, Director, TM Investments (Pty) Ltd</cite>
          </blockquote>
        </div>

        <div class="auth-brand-trust">
          <span>SARS Registered Tax Practitioner</span>
          <span class="auth-dot">·</span>
          <span>SAIPA Member</span>
          <span class="auth-dot">·</span>
          <span>Est. 2018</span>
        </div>
      </div>
    </aside>

    <!-- ─── Right: Form panel ─── -->
    <main class="auth-form-side">
      <div class="auth-form-inner">

        <!-- Mobile logo -->
        <RouterLink to="/" class="auth-mobile-logo">
          <span class="auth-monogram auth-monogram-dark">STA</span>
          <div class="auth-vsep auth-vsep-dark"></div>
          <div>
            <div class="auth-wm-main auth-wm-dark">Snekhaya</div>
            <div class="auth-wm-sub auth-wm-sub-dark">Tax &amp; Accounting Advisory</div>
          </div>
        </RouterLink>

        <!-- Page heading -->
        <div class="auth-heading-block">
          <h2 class="auth-page-title">
            {{ mode === 'login' ? 'Welcome back' : 'Create your account' }}
          </h2>
          <p class="auth-page-sub">
            {{ mode === 'login'
              ? 'Sign in to access your documents, reports and statements.'
              : 'Join the Snekhaya client portal for secure self-service.' }}
          </p>
        </div>

        <!-- Tab switcher -->
        <div class="auth-tabs" role="tablist">
          <button
            role="tab"
            :class="['auth-tab', { active: mode === 'login' }]"
            @click="switchMode('login')"
          >Sign In</button>
          <button
            role="tab"
            :class="['auth-tab', { active: mode === 'register' }]"
            @click="switchMode('register')"
          >Create Account</button>
        </div>

        <!-- ── Sign In form ── -->
        <form v-show="mode === 'login'" @submit.prevent="handleLogin" class="auth-form" novalidate>
          <div class="field">
            <label for="li-email">Email address</label>
            <input
              id="li-email"
              type="email"
              v-model="li.email"
              placeholder="you@example.com"
              autocomplete="email"
            />
          </div>

          <div class="field">
            <div class="field-label-row">
              <label for="li-pw">Password</label>
              <button type="button" class="text-link" @click="showForgot = true">Forgot password?</button>
            </div>
            <div class="input-wrap">
              <input
                id="li-pw"
                :type="showLiPw ? 'text' : 'password'"
                v-model="li.password"
                placeholder="Enter your password"
                autocomplete="current-password"
              />
              <button type="button" class="eye-btn" @click="showLiPw = !showLiPw" tabindex="-1">
                <svg v-if="!showLiPw" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
                <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              </button>
            </div>
          </div>

          <Transition name="err">
            <div v-if="liError" class="auth-error" role="alert">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {{ liError }}
            </div>
          </Transition>

          <button type="submit" class="auth-submit" :disabled="liLoading">
            <span v-if="liLoading" class="spin"></span>
            <span v-else>Sign In</span>
          </button>

          <p class="auth-switch">
            Don't have an account?
            <button type="button" @click="switchMode('register')">Create one</button>
          </p>

          <div class="auth-demo-hint">
            <span class="demo-label">Demo credentials</span>
            <code>demo@snekhaya.co.za</code>
            <span class="demo-sep">/</span>
            <code>Demo@2026</code>
          </div>
        </form>

        <!-- ── Register form ── -->
        <form v-show="mode === 'register'" @submit.prevent="handleRegister" class="auth-form" novalidate>
          <div class="field">
            <label for="rg-name">Full name <span class="req">*</span></label>
            <input
              id="rg-name"
              type="text"
              v-model="rg.name"
              placeholder="Your full name"
              autocomplete="name"
            />
          </div>

          <div class="field">
            <label for="rg-email">Email address <span class="req">*</span></label>
            <input
              id="rg-email"
              type="email"
              v-model="rg.email"
              placeholder="you@example.com"
              autocomplete="email"
            />
          </div>

          <div class="field-row two-col">
            <div class="field">
              <label for="rg-phone">Phone number</label>
              <input id="rg-phone" type="tel" v-model="rg.phone" placeholder="082 000 0000" autocomplete="tel" />
            </div>
            <div class="field">
              <label for="rg-id">SA ID number</label>
              <input id="rg-id" type="text" v-model="rg.idNumber" placeholder="13-digit ID" maxlength="13" inputmode="numeric" />
            </div>
          </div>

          <div class="field">
            <label for="rg-pw">Password <span class="req">*</span></label>
            <div class="input-wrap">
              <input
                id="rg-pw"
                :type="showRgPw ? 'text' : 'password'"
                v-model="rg.password"
                placeholder="At least 8 characters"
                autocomplete="new-password"
              />
              <button type="button" class="eye-btn" @click="showRgPw = !showRgPw" tabindex="-1">
                <svg v-if="!showRgPw" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
                <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              </button>
            </div>
            <div v-if="rg.password" class="pw-strength-wrap">
              <div class="pw-strength-bar">
                <div class="pw-fill" :style="{ width: pwStrength.pct + '%', background: pwStrength.color }"></div>
              </div>
              <span class="pw-label" :style="{ color: pwStrength.color }">{{ pwStrength.label }}</span>
            </div>
          </div>

          <div class="field">
            <label for="rg-cpw">Confirm password <span class="req">*</span></label>
            <div class="input-wrap">
              <input
                id="rg-cpw"
                :type="showCpw ? 'text' : 'password'"
                v-model="rg.confirmPassword"
                placeholder="Re-enter your password"
                autocomplete="new-password"
              />
              <button type="button" class="eye-btn" @click="showCpw = !showCpw" tabindex="-1">
                <svg v-if="!showCpw" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                </svg>
                <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              </button>
            </div>
          </div>

          <label class="auth-checkbox">
            <input type="checkbox" v-model="rg.agree" />
            <span>I agree to Snekhaya's Terms of Service and Privacy Policy</span>
          </label>

          <Transition name="err">
            <div v-if="rgError" class="auth-error" role="alert">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {{ rgError }}
            </div>
          </Transition>

          <button type="submit" class="auth-submit" :disabled="rgLoading">
            <span v-if="rgLoading" class="spin"></span>
            <span v-else>Create Account</span>
          </button>

          <p class="auth-switch">
            Already have an account?
            <button type="button" @click="switchMode('login')">Sign in</button>
          </p>
        </form>
      </div>

      <div class="auth-form-footer">
        <RouterLink to="/">← Back to Snekhaya.co.za</RouterLink>
      </div>
    </main>

    <!-- ─── Forgot password modal ─── -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showForgot" class="modal-backdrop" @click.self="closeForgot">
          <div class="forgot-modal">
            <button class="modal-close" @click="closeForgot">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <div class="forgot-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
            </div>
            <h3 class="forgot-title">Reset your password</h3>
            <p class="forgot-body">Enter your email address and we'll send a reset link to your inbox.</p>
            <input
              type="email"
              v-model="forgotEmail"
              placeholder="your@email.com"
              class="forgot-input"
              :disabled="forgotSent"
            />
            <button class="auth-submit" @click="handleForgot" :disabled="forgotSent || !forgotEmail">
              <svg v-if="forgotSent" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span>{{ forgotSent ? 'Email Sent' : 'Send Reset Link' }}</span>
            </button>
            <p v-if="forgotSent" class="forgot-success">
              If an account exists for that address, you'll receive a reset link shortly.
            </p>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const mode = ref(route.name === 'portal-register' ? 'register' : 'login')

function switchMode(m) {
  mode.value = m
  liError.value = ''
  rgError.value = ''
}

// ── Sign in ──
const li = ref({ email: '', password: '' })
const liError = ref('')
const liLoading = ref(false)
const showLiPw = ref(false)

async function handleLogin() {
  liError.value = ''
  if (!li.value.email || !li.value.password) {
    liError.value = 'Please enter your email and password.'
    return
  }
  liLoading.value = true
  try {
    await delay(700)
    auth.login(li.value)
    router.push(route.query.redirect || '/portal/dashboard')
  } catch (e) {
    liError.value = e.message
  } finally {
    liLoading.value = false
  }
}

// ── Register ──
const rg = ref({
  name: '', email: '', phone: '', idNumber: '',
  password: '', confirmPassword: '', agree: false,
})
const rgError = ref('')
const rgLoading = ref(false)
const showRgPw = ref(false)
const showCpw = ref(false)

const pwStrength = computed(() => {
  const pw = rg.value.password
  let score = 0
  if (pw.length >= 8) score++
  if (pw.length >= 12) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  const levels = [
    { label: 'Very weak', color: '#e74c3c' },
    { label: 'Weak', color: '#e67e22' },
    { label: 'Fair', color: '#f39c12' },
    { label: 'Strong', color: '#27ae60' },
    { label: 'Very strong', color: '#1e8449' },
  ]
  return { pct: (score / 5) * 100, ...(levels[score - 1] || { label: '', color: 'var(--border)' }) }
})

async function handleRegister() {
  rgError.value = ''
  const { name, email, password, confirmPassword, agree } = rg.value
  if (!name.trim() || !email.trim() || !password) {
    rgError.value = 'Please fill in all required fields.'
    return
  }
  if (password.length < 8) {
    rgError.value = 'Password must be at least 8 characters long.'
    return
  }
  if (password !== confirmPassword) {
    rgError.value = 'Passwords do not match.'
    return
  }
  if (!agree) {
    rgError.value = 'Please agree to the Terms of Service to continue.'
    return
  }
  rgLoading.value = true
  try {
    await delay(900)
    auth.register(rg.value)
    router.push('/portal/dashboard')
  } catch (e) {
    rgError.value = e.message
  } finally {
    rgLoading.value = false
  }
}

// ── Forgot password ──
const showForgot = ref(false)
const forgotEmail = ref('')
const forgotSent = ref(false)

function handleForgot() {
  if (forgotEmail.value) forgotSent.value = true
}
function closeForgot() {
  showForgot.value = false
  forgotSent.value = false
  forgotEmail.value = ''
}

function delay(ms) {
  return new Promise((r) => setTimeout(r, ms))
}
</script>

<style scoped>
/* ─── Layout ─── */
.auth-page {
  min-height: 100vh;
  display: flex;
  font-family: 'DM Sans', system-ui, sans-serif;
}

/* ─── Brand panel ─── */
.auth-brand {
  display: none;
  width: 44%;
  background: var(--ink);
  position: relative;
  overflow: hidden;
  flex-direction: column;
  flex-shrink: 0;
}
@media (min-width: 900px) {
  .auth-brand { display: flex; }
}
.auth-brand::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse at 25% 15%, rgba(184, 154, 78, 0.1) 0%, transparent 55%),
    radial-gradient(ellipse at 75% 85%, rgba(184, 154, 78, 0.06) 0%, transparent 45%);
  pointer-events: none;
}
.auth-brand::after {
  content: 'S';
  font-family: 'Cormorant', serif;
  font-size: 50rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.025);
  position: absolute;
  bottom: -12rem;
  right: -8rem;
  line-height: 1;
  pointer-events: none;
  user-select: none;
}
.auth-brand-inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  padding: 2.5rem;
  height: 100%;
}
.auth-logo-link {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  text-decoration: none;
  flex-shrink: 0;
}
.auth-monogram {
  font-family: 'Cormorant', serif;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--gold);
}
.auth-monogram-dark { color: var(--gold); }
.auth-vsep {
  width: 1px;
  height: 1.25rem;
  background: rgba(255, 255, 255, 0.18);
}
.auth-vsep-dark { background: var(--border-mid); }
.auth-wm-main {
  font-family: 'Cormorant', serif;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  color: rgba(255, 255, 255, 0.88);
  line-height: 1.2;
}
.auth-wm-dark { color: var(--ink); }
.auth-wm-sub {
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.38);
  line-height: 1;
}
.auth-wm-sub-dark { color: var(--ink-3); }
.auth-brand-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem 0 2rem;
}
.auth-brand-eyebrow {
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 1.25rem;
}
.auth-brand-heading {
  font-family: 'Cormorant', serif;
  font-size: clamp(2rem, 3vw, 3rem);
  font-weight: 300;
  line-height: 1.1;
  letter-spacing: -0.01em;
  color: white;
  margin-bottom: 2rem;
}
.auth-brand-rule {
  width: 3rem;
  height: 1px;
  background: var(--gold);
  margin-bottom: 2rem;
}
.auth-brand-quote {
  font-family: 'Cormorant', serif;
  font-size: 1.125rem;
  font-style: italic;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.7;
  padding: 0;
  margin: 0;
  border: none;
}
.auth-brand-quote cite {
  display: block;
  font-family: 'DM Sans', system-ui, sans-serif;
  font-size: 0.8125rem;
  font-style: normal;
  color: rgba(255, 255, 255, 0.38);
  margin-top: 1.125rem;
  letter-spacing: 0.01em;
}
.auth-brand-trust {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.32);
  letter-spacing: 0.03em;
}
.auth-dot { color: var(--gold); opacity: 0.5; }

/* ─── Form panel ─── */
.auth-form-side {
  flex: 1;
  background: var(--surface);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  min-width: 0;
}
.auth-form-inner {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 3rem 1.5rem 2rem;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
}
@media (min-width: 640px) {
  .auth-form-inner { padding: 4rem 2rem 2rem; }
}
.auth-mobile-logo {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  text-decoration: none;
  margin-bottom: 2.75rem;
}
@media (min-width: 900px) { .auth-mobile-logo { display: none; } }

/* Heading */
.auth-heading-block { margin-bottom: 2rem; }
.auth-page-title {
  font-family: 'Cormorant', serif;
  font-size: 2rem;
  font-weight: 400;
  color: var(--ink);
  margin-bottom: 0.5rem;
  line-height: 1.15;
}
.auth-page-sub {
  font-size: 0.9375rem;
  color: var(--ink-3);
  line-height: 1.55;
}

/* Tabs */
.auth-tabs {
  display: flex;
  background: var(--surface-2);
  border-radius: 8px;
  padding: 3px;
  margin-bottom: 2rem;
  gap: 2px;
}
.auth-tab {
  flex: 1;
  padding: 0.625rem 0.5rem;
  border: none;
  background: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--ink-3);
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}
.auth-tab.active {
  background: var(--surface);
  color: var(--ink);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08), 0 0 0 1px var(--border);
}

/* Form fields */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.125rem;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.field-row { display: flex; flex-direction: column; gap: 1.125rem; }
.two-col { flex-direction: row; gap: 0.875rem; }
.two-col .field { flex: 1; min-width: 0; }
.field label {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--ink-2);
}
.req { color: var(--gold); font-weight: 600; }
.field-label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.text-link {
  font-size: 0.8rem;
  color: var(--gold);
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 2px;
  font-family: inherit;
}
.field input {
  padding: 0.7rem 0.9rem;
  border: 1.5px solid var(--border-mid);
  border-radius: 6px;
  font-size: 0.9375rem;
  font-family: inherit;
  background: var(--surface);
  color: var(--ink);
  transition: border-color 0.15s, box-shadow 0.15s;
  outline: none;
  width: 100%;
}
.field input:focus {
  border-color: var(--gold);
  box-shadow: 0 0 0 3px var(--gold-pale);
}
.field input::placeholder { color: var(--ink-4); }
.input-wrap { position: relative; }
.input-wrap input { padding-right: 2.75rem; }
.eye-btn {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: none;
  color: var(--ink-3);
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  transition: color 0.12s;
}
.eye-btn:hover { color: var(--ink); }

/* Password strength */
.pw-strength-wrap {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.375rem;
}
.pw-strength-bar {
  flex: 1;
  height: 3px;
  background: var(--border);
  border-radius: 99px;
  overflow: hidden;
}
.pw-fill {
  height: 100%;
  border-radius: 99px;
  transition: width 0.3s, background 0.3s;
}
.pw-label {
  font-size: 0.75rem;
  font-weight: 500;
  min-width: 5.5rem;
  text-align: right;
  transition: color 0.3s;
}

/* Checkbox */
.auth-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  font-size: 0.8375rem;
  color: var(--ink-2);
  line-height: 1.55;
  cursor: pointer;
}
.auth-checkbox input[type="checkbox"] {
  flex-shrink: 0;
  margin-top: 2px;
  accent-color: var(--gold);
  width: 15px;
  height: 15px;
}

/* Error message */
.auth-error {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #fff5f5;
  border: 1px solid #ffdada;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #c0392b;
}

/* Submit button */
.auth-submit {
  width: 100%;
  padding: 0.875rem 1.5rem;
  background: var(--gold);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.15s, transform 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}
.auth-submit:hover:not(:disabled) { background: #c9ae72; }
.auth-submit:active:not(:disabled) { transform: scale(0.99); }
.auth-submit:disabled { opacity: 0.6; cursor: default; }

/* Spinner */
.spin {
  width: 18px;
  height: 18px;
  border: 2.5px solid rgba(255, 255, 255, 0.4);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  flex-shrink: 0;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Switch link */
.auth-switch {
  text-align: center;
  font-size: 0.875rem;
  color: var(--ink-3);
}
.auth-switch button {
  border: none;
  background: none;
  color: var(--gold);
  font-size: inherit;
  font-family: inherit;
  cursor: pointer;
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 2px;
}

/* Demo hint */
.auth-demo-hint {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  padding: 0.75rem 1rem;
  background: var(--surface-2);
  border: 1px dashed var(--border-mid);
  border-radius: 6px;
  font-size: 0.8125rem;
  color: var(--ink-3);
}
.demo-label { font-weight: 600; color: var(--ink-2); }
.demo-sep { color: var(--ink-4); }
.auth-demo-hint code {
  font-family: 'SF Mono', 'Cascadia Code', monospace;
  font-size: 0.8125rem;
  color: var(--gold);
  background: rgba(184, 154, 78, 0.1);
  padding: 0.1rem 0.375rem;
  border-radius: 4px;
}

/* Footer */
.auth-form-footer {
  padding: 1.25rem 1.5rem;
  border-top: 1px solid var(--border);
  text-align: center;
}
.auth-form-footer a {
  font-size: 0.875rem;
  color: var(--ink-3);
  text-decoration: none;
  transition: color 0.15s;
}
.auth-form-footer a:hover { color: var(--gold); }

/* ─── Forgot modal ─── */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  padding: 1.25rem;
}
.forgot-modal {
  background: var(--surface);
  border-radius: 14px;
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  box-shadow: var(--shadow-lg);
  position: relative;
}
.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  border: none;
  background: none;
  color: var(--ink-3);
  cursor: pointer;
  padding: 5px;
  border-radius: 6px;
  display: flex;
  transition: background 0.12s, color 0.12s;
}
.modal-close:hover { background: var(--surface-2); color: var(--ink); }
.forgot-icon {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  background: var(--gold-pale);
  color: var(--gold);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.25rem;
}
.forgot-title {
  font-family: 'Cormorant', serif;
  font-size: 1.375rem;
  font-weight: 500;
  color: var(--ink);
  margin-bottom: 0.5rem;
}
.forgot-body {
  font-size: 0.9rem;
  color: var(--ink-3);
  margin-bottom: 1.25rem;
  line-height: 1.55;
}
.forgot-input {
  width: 100%;
  padding: 0.7rem 0.9rem;
  border: 1.5px solid var(--border-mid);
  border-radius: 6px;
  font-size: 0.9375rem;
  font-family: inherit;
  outline: none;
  margin-bottom: 1rem;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.forgot-input:focus {
  border-color: var(--gold);
  box-shadow: 0 0 0 3px var(--gold-pale);
}
.forgot-input:disabled { background: var(--surface-2); color: var(--ink-3); }
.forgot-success {
  font-size: 0.875rem;
  color: #27ae60;
  margin-top: 0.875rem;
  text-align: center;
  line-height: 1.5;
}

/* Transitions */
.err-enter-active, .err-leave-active { transition: opacity 0.18s, transform 0.18s; }
.err-enter-from, .err-leave-to { opacity: 0; transform: translateY(-6px); }
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
</style>
