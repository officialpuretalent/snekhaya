import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useScrolled(threshold = 16) {
  const isScrolled = ref(false)

  function handleScroll() {
    isScrolled.value = window.scrollY > threshold
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return { isScrolled }
}
