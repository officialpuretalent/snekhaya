<template>
  <div class="step-panel" v-show="store.currentStep === 3" id="panel-3">
    <div class="details-layout">
      <div style="max-width:600px">
        <div style="margin-bottom:1.75rem">
          <div class="bsb-label" style="margin-bottom:0.5rem">Review Your Booking</div>
          <p style="font-size:0.875rem;font-weight:300;color:var(--ink-3);line-height:1.75">Please confirm the details below before we schedule your consultation.</p>
        </div>

        <div style="border:1px solid var(--border);border-radius:12px;overflow:hidden;margin-bottom:1.5rem">
          <div class="conf-detail" style="padding:1.25rem 1.5rem;border-bottom:1px solid var(--border);display:flex;gap:1rem;align-items:flex-start">
            <div class="bsb-icon" style="margin-top:2px">
              <svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:var(--gold);fill:none;stroke-width:1.75;stroke-linecap:round;stroke-linejoin:round">
                <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <div style="flex:1">
              <div class="conf-detail-label">Date &amp; Time</div>
              <div class="conf-detail-value">{{ store.formattedDateTime }}</div>
            </div>
            <span class="bsb-change" @click="goToStep(1)">Edit</span>
          </div>
          <div style="padding:1.25rem 1.5rem;border-bottom:1px solid var(--border);display:flex;gap:1rem;align-items:flex-start">
            <div class="bsb-icon" style="margin-top:2px">
              <svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:var(--gold);fill:none;stroke-width:1.75;stroke-linecap:round;stroke-linejoin:round">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div style="flex:1">
              <div class="conf-detail-label">Contact</div>
              <div class="conf-detail-value">{{ store.contactSummary }}</div>
            </div>
            <span class="bsb-change" @click="goToStep(2)">Edit</span>
          </div>
          <div style="padding:1.25rem 1.5rem;border-bottom:1px solid var(--border);display:flex;gap:1rem;align-items:flex-start">
            <div class="bsb-icon" style="margin-top:2px">
              <svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:var(--gold);fill:none;stroke-width:1.75;stroke-linecap:round;stroke-linejoin:round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <div style="flex:1">
              <div class="conf-detail-label">Services</div>
              <div class="conf-detail-value">{{ store.servicesSummary }}</div>
            </div>
            <span class="bsb-change" @click="goToStep(2)">Edit</span>
          </div>
          <div v-if="store.description" style="padding:1.25rem 1.5rem;">
            <div class="conf-detail-label">Additional Context</div>
            <div class="conf-detail-value" style="margin-top:0.3rem;font-style:italic;color:var(--ink-3)">"{{ store.description }}"</div>
          </div>
        </div>

        <p style="font-size:0.8rem;font-weight:300;color:var(--ink-4);line-height:1.7">
          By submitting, a confirmation email will be sent to you, a calendar event will be created, and our team will review your requirements before the session to ensure maximum value from our time together.
        </p>
      </div>
    </div>

    <div class="panel-footer">
      <span class="panel-footer-note">
        <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
        Review your details before proceeding to payment
      </span>
      <div class="panel-footer-actions">
        <button class="btn btn-ghost" @click="goToStep(2)">
          <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6" /></svg>
          Back
        </button>
        <button class="btn btn-primary" @click="goToStep(4)">
          Proceed to Payment
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

function goToStep(n) {
  store.currentStep = n
  nextTick(() => {
    const card = document.querySelector('.booking-card')
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}
</script>
