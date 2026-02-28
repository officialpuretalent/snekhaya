<template>
  <div id="booking-page">
    <BookingNav />

    <div class="page" id="bookingFlow" v-show="!store.showConfirmation">
      <BookingHeader />
      <BookingStepper />

      <div class="booking-card" id="bookingCard">
        <BookingStep1 />
        <BookingStep2 />
        <BookingStep3 />
        <BookingStep4 />
      </div>
    </div>

    <BookingConfirmation />
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue'
import { useBookingStore } from '@/stores/booking.js'
import BookingNav from '@/components/booking/BookingNav.vue'
import BookingHeader from '@/components/booking/BookingHeader.vue'
import BookingStepper from '@/components/booking/BookingStepper.vue'
import BookingStep1 from '@/components/booking/BookingStep1.vue'
import BookingStep2 from '@/components/booking/BookingStep2.vue'
import BookingStep3 from '@/components/booking/BookingStep3.vue'
import BookingStep4 from '@/components/booking/BookingStep4.vue'
import BookingConfirmation from '@/components/booking/BookingConfirmation.vue'

const store = useBookingStore()

useHead({
  title: 'Book a Consultation — Snekhaya Tax & Accounting Advisory',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' },
    { name: 'description', content: 'Book a consultation with Snekhaya Tax & Accounting Advisory. Choose your preferred date, time, and service.' }
  ]
})
</script>
