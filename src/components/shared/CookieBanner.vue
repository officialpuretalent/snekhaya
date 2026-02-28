<template>
  <div
    v-if="isVisible"
    id="cookieBanner"
    class="cookie-banner cookie-banner-visible"
    role="dialog"
    aria-live="polite"
    aria-label="Cookie consent"
  >
    <div class="cookie-banner-inner">
      <div class="cookie-banner-text">
        <p>We use cookies to improve your experience and analyse site usage. You can accept or decline non-essential cookies.</p>
      </div>
      <div class="cookie-banner-actions">
        <button class="cookie-btn cookie-btn-outline" @click="decline">Decline</button>
        <button class="cookie-btn cookie-btn-gold" @click="accept">Accept</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCookieConsent } from '@/composables/useCookieConsent.js'

const { isVisible, accept, decline } = useCookieConsent()
</script>
