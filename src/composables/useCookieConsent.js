import { ref } from 'vue'

const STORAGE_KEY = 'snekhaya_cookie_consent'

export function useCookieConsent() {
  const isVisible = ref(!localStorage.getItem(STORAGE_KEY))

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    isVisible.value = false
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, 'declined')
    isVisible.value = false
  }

  return { isVisible, accept, decline }
}
