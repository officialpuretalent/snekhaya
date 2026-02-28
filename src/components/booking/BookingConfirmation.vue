<template>
  <div class="page" id="confirmationScreen" v-if="store.showConfirmation">
    <div class="conf-card">
      <div class="conf-top">
        <div class="conf-icon-ring">
          <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
        <h2 class="conf-heading">Your session is <em>confirmed</em></h2>
        <p class="conf-subheading">
          Thank you for booking with Snekhaya Tax &amp; Accounting Advisory. Everything is in motion — here's what happens next.
        </p>
      </div>

      <div class="conf-details">
        <div class="conf-detail">
          <div class="conf-detail-label">Date &amp; Time</div>
          <div class="conf-detail-value">{{ store.confDateTime }}</div>
        </div>
        <div class="conf-detail">
          <div class="conf-detail-label">Duration</div>
          <div class="conf-detail-value">{{ store.confDuration }}</div>
        </div>
        <div class="conf-detail">
          <div class="conf-detail-label">Client</div>
          <div class="conf-detail-value">{{ store.confClient }}</div>
        </div>
        <div class="conf-detail">
          <div class="conf-detail-label">Services</div>
          <div class="conf-detail-value">{{ store.servicesSummary }}</div>
        </div>
        <div class="conf-detail">
          <div class="conf-detail-label">Amount Paid</div>
          <div class="conf-detail-value" style="color:var(--gold)">{{ store.formattedFee }}</div>
        </div>
      </div>

      <div class="conf-next">
        <div class="conf-next-title">What Happens Next</div>
        <div class="conf-next-steps">
          <div class="conf-step">
            <div class="conf-step-num">1</div>
            <div class="conf-step-body">
              <div class="conf-step-title">Confirmation email sent</div>
              <div class="conf-step-text">A confirmation email with all booking details has been sent to your inbox. Please check your spam folder if it doesn't arrive within a few minutes.</div>
            </div>
          </div>
          <div class="conf-step">
            <div class="conf-step-num">2</div>
            <div class="conf-step-body">
              <div class="conf-step-title">Calendar invite on its way</div>
              <div class="conf-step-text">You'll receive a Google Calendar invite with a meeting link or venue details. Add it to your calendar to ensure you don't miss your session.</div>
            </div>
          </div>
          <div class="conf-step">
            <div class="conf-step-num">3</div>
            <div class="conf-step-body">
              <div class="conf-step-title">We'll prepare for your session</div>
              <div class="conf-step-text">Our team will review your requirements and prepare relevant insights and questions for your session. You may receive a follow-up email with any documents or information to bring along.</div>
            </div>
          </div>
          <div class="conf-step">
            <div class="conf-step-num">4</div>
            <div class="conf-step-body">
              <div class="conf-step-title">We meet — and get to work</div>
              <div class="conf-step-text">Your consultation will be focused, confidential, and productive. We'll walk you through your options, answer your questions, and set a clear path forward.</div>
            </div>
          </div>
        </div>
      </div>

      <div class="conf-footer">
        <span class="conf-footer-note">Questions? Email us at info@snekhaya.co.za</span>
        <div class="conf-footer-actions">
          <RouterLink to="/" class="btn-back-home">
            <svg viewBox="0 0 24 24" style="width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Website
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBookingStore } from '@/stores/booking.js'
const store = useBookingStore()
</script>
