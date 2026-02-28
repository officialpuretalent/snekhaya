import { onMounted } from 'vue'

export function useFadeUp() {
  onMounted(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in')
          observer.unobserve(e.target)
        }
      })
    }, { threshold: 0.12 })

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
  })
}
