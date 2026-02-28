<template>
  <nav>
    <div class="nav-inner">
      <BrandLogo />
      <RouterLink to="/" class="nav-back">
        <svg viewBox="0 0 24 24">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back to site
      </RouterLink>
    </div>
  </nav>
</template>

<script setup>
import BrandLogo from '@/components/shared/BrandLogo.vue'
</script>
