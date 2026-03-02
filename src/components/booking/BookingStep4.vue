<template>
  <div class="step-panel" v-show="store.currentStep === 4" id="panel-4">
    <div class="payment-layout">
      <!-- Order summary -->
      <div>
        <div class="payment-section-title">Order Summary</div>
        <div class="order-summary">
          <div class="order-row">
            <div>
              <div class="order-row-label">Consultation</div>
              <div style="font-size:0.75rem;color:var(--ink-4);margin-top:0.2rem">{{ store.durationLabel }} · R996/hr</div>
            </div>
            <div class="order-row-value">{{ store.formattedFee }}</div>
          </div>
          <div class="order-row">
            <div class="order-row-label">Date &amp; Time</div>
            <div class="order-row-value" style="text-align:right;max-width:200px;font-size:0.8125rem">{{ store.formattedDateTime }}</div>
          </div>
          <div class="order-row order-total">
            <div class="order-row-label">Total Due</div>
            <div class="order-row-value">{{ store.formattedFee }}</div>
          </div>
        </div>

        <p style="margin-top:1.25rem;font-size:0.75rem;font-weight:300;color:var(--ink-4);line-height:1.75">
          This consultation is billed at <strong style="font-weight:500;color:var(--ink-3)">R996 per hour</strong>. Payment is collected upfront to secure your booking.
        </p>
      </div>

      <!-- Card payment form -->
      <div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.25rem">
          <div class="payment-section-title" style="margin-bottom:0">Payment Details</div>
          <div class="mock-badge">
            <span class="mock-badge-dot"></span>
            Demo Mode
          </div>
        </div>

        <div class="card-form">
          <div class="card-icons">
            <div class="card-icon">
              <svg viewBox="0 0 38 24" fill="none"><rect width="38" height="24" rx="4" fill="#1A1F71" fill-opacity="0.08"/><rect x="0.5" y="0.5" width="37" height="23" rx="3.5" stroke="#000" stroke-opacity="0.08"/><text x="19" y="16" text-anchor="middle" font-size="8" font-weight="700" fill="#1A1F71" font-family="sans-serif">VISA</text></svg>
            </div>
            <div class="card-icon">
              <svg viewBox="0 0 38 24" fill="none"><rect width="38" height="24" rx="4" fill="#EB001B" fill-opacity="0.06"/><rect x="0.5" y="0.5" width="37" height="23" rx="3.5" stroke="#000" stroke-opacity="0.08"/><circle cx="15" cy="12" r="6" fill="#EB001B" fill-opacity="0.7"/><circle cx="23" cy="12" r="6" fill="#F79E1B" fill-opacity="0.7"/></svg>
            </div>
            <div class="card-icon">
              <svg viewBox="0 0 38 24" fill="none"><rect width="38" height="24" rx="4" fill="#006FCF" fill-opacity="0.06"/><rect x="0.5" y="0.5" width="37" height="23" rx="3.5" stroke="#000" stroke-opacity="0.08"/><text x="19" y="16" text-anchor="middle" font-size="6" font-weight="700" fill="#006FCF" font-family="sans-serif">AMEX</text></svg>
            </div>
          </div>

          <div class="fgroup" style="margin:0">
            <label class="flabel">Card Number *</label>
            <input
              type="text"
              inputmode="numeric"
              :class="['finput', { 'input-error': store.paymentErrors.cardNumber }]"
              :value="store.cardNumber"
              @input="store.onCardNumberInput($event.target.value)"
              placeholder="1234  5678  9012  3456"
              maxlength="22"
              autocomplete="cc-number"
            >
          </div>

          <div class="fgroup" style="margin:0">
            <label class="flabel">Cardholder Name *</label>
            <input
              type="text"
              :class="['finput', { 'input-error': store.paymentErrors.cardName }]"
              v-model="store.cardName"
              placeholder="Name as on card"
              autocomplete="cc-name"
            >
          </div>

          <div class="card-row">
            <div class="fgroup" style="margin:0">
              <label class="flabel">Expiry *</label>
              <input
                type="text"
                inputmode="numeric"
                :class="['finput', { 'input-error': store.paymentErrors.cardExpiry }]"
                :value="store.cardExpiry"
                @input="store.onCardExpiryInput($event.target.value)"
                placeholder="MM / YY"
                maxlength="7"
                autocomplete="cc-exp"
              >
            </div>
            <div class="fgroup" style="margin:0">
              <label class="flabel">CVV *</label>
              <input
                type="text"
                inputmode="numeric"
                :class="['finput', { 'input-error': store.paymentErrors.cardCvv }]"
                v-model="store.cardCvv"
                placeholder="123"
                maxlength="4"
                autocomplete="cc-csc"
              >
            </div>
          </div>

          <button class="pay-btn" :disabled="store.paymentProcessing" @click="store.submitBooking()">
            <span v-if="!store.paymentProcessing">
              Pay {{ store.formattedFee }}
              <svg viewBox="0 0 24 24" style="width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;margin-left:0.25rem"><polyline points="9 18 15 12 9 6" transform="rotate(180 12 12)"/></svg>
            </span>
            <span v-else class="pay-btn-processing">
              <span class="pay-spinner"></span>
              Processing…
            </span>
          </button>

          <div class="pay-secure-note">
            <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Demo only — no real charge will be made
          </div>
        </div>
      </div>
    </div>

    <div class="panel-footer">
      <span class="panel-footer-note">
        <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
        Simulated secure checkout — no real payment is processed
      </span>
      <div class="panel-footer-actions">
        <button class="btn btn-ghost" @click="back">
          <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6" /></svg>
          Back
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick } from 'vue'
import { useBookingStore } from '@/stores/booking.js'

const store = useBookingStore()

function back() {
  store.currentStep = 3
  nextTick(() => {
    const card = document.querySelector('.booking-card')
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}
</script>
