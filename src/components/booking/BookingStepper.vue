<template>
  <div class="stepper" id="stepper">
    <div :class="['step', { active: store.currentStep === 1, done: store.currentStep > 1 }]">
      <div class="step-circle"><span class="step-num">1</span></div>
      <span class="step-label">Date &amp; Time</span>
    </div>
    <div :class="['step-line', { done: store.currentStep > 1 }]"></div>
    <div :class="['step', { active: store.currentStep === 2, done: store.currentStep > 2 }]">
      <div class="step-circle"><span class="step-num">2</span></div>
      <span class="step-label">Details</span>
    </div>
    <div :class="['step-line', { done: store.currentStep > 2 }]"></div>
    <div :class="['step', { active: store.currentStep === 3, done: store.currentStep > 3 }]">
      <div class="step-circle"><span class="step-num">3</span></div>
      <span class="step-label">Review</span>
    </div>
    <div :class="['step-line', { done: store.currentStep > 3 }]"></div>
    <div :class="['step', { active: store.currentStep === 4, done: store.currentStep > 4 }]">
      <div class="step-circle"><span class="step-num">4</span></div>
      <span class="step-label">Payment</span>
    </div>
  </div>
</template>

<script setup>
import { useBookingStore } from '@/stores/booking.js'
const store = useBookingStore()
</script>
