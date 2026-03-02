<template>
  <nav id="nav" :class="{ scrolled: isScrolled }">
    <div class="nav-inner">
      <RouterLink to="/" class="nav-brand-link" aria-label="Snekhaya home">
        <BrandLogo />
      </RouterLink>

      <ul class="nav-links">
        <li><a href="#about" @click="handleAnchorClick('#about')">About</a></li>
        <li><a href="#services" @click="handleAnchorClick('#services')">Services</a></li>
        <li><RouterLink to="/blog">Insights</RouterLink></li>
        <li><RouterLink to="/calculators">Calculators</RouterLink></li>
        <li><a href="#contact" @click="handleAnchorClick('#contact')">Contact</a></li>
      </ul>

      <div class="nav-action">
        <RouterLink to="/portal/login" class="nav-contact">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
          Sign In
        </RouterLink>
      </div>

      <button
        :class="['nav-hamburger', { open: isMenuOpen }]"
        id="navToggle"
        aria-label="Open menu"
        :aria-expanded="isMenuOpen.toString()"
        @click="toggleMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>

  <div
    :class="['nav-mobile-menu', { open: isMenuOpen }]"
    id="navMobileMenu"
    :aria-hidden="(!isMenuOpen).toString()"
  >
    <a href="#about" @click="handleMobileAnchorClick('#about')">About</a>
    <a href="#services" @click="handleMobileAnchorClick('#services')">Services</a>
    <RouterLink to="/blog" @click="closeMenu">Insights</RouterLink>
    <RouterLink to="/calculators" @click="closeMenu">Calculators</RouterLink>
    <a href="#contact" @click="handleMobileAnchorClick('#contact')">Contact</a>
    <RouterLink to="/portal/login" class="nav-mobile-cta" @click="closeMenu">Sign In</RouterLink>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BrandLogo from './BrandLogo.vue'
import { useScrolled } from '@/composables/useScrolled.js'

const { isScrolled } = useScrolled()
const isMenuOpen = ref(false)
const router = useRouter()
const route = useRoute()

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : ''
}

function closeMenu() {
  isMenuOpen.value = false
  document.body.style.overflow = ''
}

function handleAnchorClick(hash) {
  if (route.name !== 'home') {
    router.push('/' + hash)
  }
}

function handleMobileAnchorClick(hash) {
  closeMenu()
  if (route.name !== 'home') {
    router.push('/' + hash)
  }
}

function handleResize() {
  if (window.innerWidth >= 1024) closeMenu()
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>
