<template>
  <div class="step-panel" v-show="store.currentStep === 2" id="panel-2">
    <div class="details-layout">
      <!-- Summary bar -->
      <div class="booking-summary-bar">
        <div class="bsb-icon">
          <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
        </div>
        <div>
          <div class="bsb-label">Appointment</div>
          <div class="bsb-value">{{ store.formattedDateTime }}</div>
        </div>
        <span class="bsb-change" @click="back">Change</span>
      </div>

      <div class="details-grid">
        <div class="form-section-title">Contact Details</div>

        <div class="fgroup">
          <label class="flabel">First Name *</label>
          <input type="text" :class="['finput', { 'input-error': store.errors.firstName }]" v-model="store.firstName" placeholder="Your first name" required>
        </div>
        <div class="fgroup">
          <label class="flabel">Last Name *</label>
          <input type="text" :class="['finput', { 'input-error': store.errors.lastName }]" v-model="store.lastName" placeholder="Your last name" required>
        </div>
        <div class="fgroup">
          <label class="flabel">Email Address *</label>
          <input type="email" :class="['finput', { 'input-error': store.errors.email }]" v-model="store.email" placeholder="your@email.com" required>
        </div>
        <div class="fgroup">
          <label class="flabel">Phone Number *</label>
          <input type="tel" :class="['finput', { 'input-error': store.errors.phone }]" v-model="store.phone" placeholder="+27 00 000 0000" required>
        </div>
        <div class="fgroup full">
          <label class="flabel">Company / Business Name</label>
          <input type="text" class="finput" v-model="store.company" placeholder="Your business name (optional)">
        </div>

        <div class="form-section-title" style="margin-top:0.75rem">
          Services Required
          <span style="font-family:'DM Sans',sans-serif;font-size:0.7rem;font-weight:300;color:var(--ink-4);margin-left:0.5rem;">(select all that apply)</span>
        </div>

        <div class="full">
          <div :class="{ 'services-error': store.servicesError }" class="services-multi">
            <div
              v-for="pill in servicePills"
              :key="pill.id"
              :class="['service-pill', { selected: store.selectedServices.includes(pill.id) }]"
              @click="store.toggleService(pill.id)"
            >
              <div class="service-pill-check"><svg viewBox="0 0 12 9"><polyline points="1 4 4.5 7.5 11 1" /></svg></div>
              <div class="service-pill-icon" v-html="pill.icon"></div>
              <div>
                <span class="service-pill-label">{{ pill.label }}</span>
                <span class="service-pill-sub">{{ pill.sub }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="fgroup full" style="margin-top:0.5rem">
          <label class="flabel">Additional Context</label>
          <textarea class="ftextarea" v-model="store.description" placeholder="Tell us more about your situation, specific questions, or anything you'd like us to know before the session…"></textarea>
        </div>
      </div>
    </div>

    <div class="panel-footer">
      <span class="panel-footer-note">
        <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
        Your information is kept private and secure
      </span>
      <div class="panel-footer-actions">
        <button class="btn btn-ghost" @click="back">
          <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6" /></svg>
          Back
        </button>
        <button class="btn btn-primary" @click="next">
          Review &amp; Confirm
          <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" transform="rotate(180 12 12)" /></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick } from 'vue'
import { useBookingStore } from '@/stores/booking.js'

const store = useBookingStore()

const servicePills = [
  {
    id: 'Tax & Compliance',
    label: 'Tax & Compliance',
    sub: 'Returns · VAT · Payroll',
    icon: `<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>`
  },
  {
    id: 'Registrations & Filings',
    label: 'Registrations & Filings',
    sub: 'CIPC · VAT · Customs',
    icon: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>`
  },
  {
    id: 'Financial Services',
    label: 'Financial Services',
    sub: 'Statements · Cashflow · Budgets',
    icon: `<svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>`
  },
  {
    id: 'Business Support',
    label: 'Business Support',
    sub: 'CFO Advisory · Proposals',
    icon: `<svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" /></svg>`
  },
  {
    id: 'Specialized Services',
    label: 'Specialized Services',
    sub: 'COIDA · Reinstatement',
    icon: `<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>`
  },
  {
    id: 'Monthly Retainer',
    label: 'Monthly Retainer',
    sub: 'Ongoing partnership',
    icon: `<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>`
  }
]

function back() {
  store.goToStep(1)
  nextTick(() => {
    const card = document.querySelector('.booking-card')
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

function next() {
  store.goToStep(3)
  nextTick(() => {
    const card = document.querySelector('.booking-card')
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}
</script>
