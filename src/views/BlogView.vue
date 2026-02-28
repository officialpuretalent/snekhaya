<template>
  <div id="blog-page">
    <AppNav />

    <main class="blog-page-main">
      <!-- Hero -->
      <section class="blog-hero">
        <div class="container">
          <div class="eyebrow fade-up">
            <span class="eyebrow-rule"></span>
            <span class="t-label">Tax Insights &amp; Advisory</span>
          </div>
          <h1 class="t-display fade-up d1">
            The Snekhaya <em>Insights</em>
          </h1>
          <p class="t-body blog-hero-body fade-up d2">
            Practical commentary on South African tax law, compliance changes,
            and financial planning — written for individuals and business owners.
          </p>
        </div>
      </section>

      <!-- Featured Post -->
      <section class="blog-featured-section">
        <div class="container">
          <div class="blog-featured-card fade-up">
            <div class="blog-featured-meta">
              <span class="blog-category-tag">{{ featured.category }}</span>
              <span class="blog-read-time">{{ featured.readTime }}</span>
            </div>
            <h2 class="blog-featured-title t-title">{{ featured.title }}</h2>
            <p class="blog-featured-excerpt t-body">{{ featured.excerpt }}</p>
            <div class="blog-card-footer">
              <div class="blog-author-row">
                <span class="blog-author-dot"></span>
                <span class="t-small">{{ featured.author }}</span>
                <span class="blog-date-sep">·</span>
                <span class="t-small">{{ featured.displayDate }}</span>
              </div>
              <button class="btn btn-ghost btn-arrow blog-read-btn" @click="openPost(featured)">
                Read Article
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Post Grid -->
      <section class="blog-grid-section">
        <div class="container">
          <div class="eyebrow fade-up">
            <span class="eyebrow-rule"></span>
            <span class="t-label">Latest Articles</span>
          </div>
          <div class="blog-grid">
            <article
              v-for="(post, i) in otherPosts"
              :key="post.id"
              :class="['blog-card', 'fade-up', `d${(i % 3) + 1}`]"
              @click="openPost(post)"
            >
              <div class="blog-card-top">
                <span class="blog-category-tag">{{ post.category }}</span>
                <span class="blog-read-time">{{ post.readTime }}</span>
              </div>
              <h3 class="blog-card-title">{{ post.title }}</h3>
              <p class="blog-card-excerpt t-small">{{ post.excerpt }}</p>
              <div class="blog-card-footer">
                <div class="blog-author-row">
                  <span class="blog-author-dot"></span>
                  <span class="t-small">{{ post.displayDate }}</span>
                </div>
                <span class="blog-arrow">→</span>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="blog-cta-section">
        <div class="container">
          <div class="blog-cta-inner fade-up">
            <div class="eyebrow">
              <span class="eyebrow-rule"></span>
              <span class="t-label">Stay Informed</span>
            </div>
            <h2 class="t-title">
              Tax law changes.<br /><em>Your strategy should too.</em>
            </h2>
            <p class="t-body">
              Our advisers monitor SARS publications, budget speeches, and
              interpretation notes so you don't have to. Book a consultation
              and let us build a compliant, tax-efficient plan around your goals.
            </p>
            <RouterLink to="/#contact" class="btn btn-primary btn-arrow">
              Speak to an Adviser
            </RouterLink>
          </div>
        </div>
      </section>
    </main>

    <!-- Article Modal -->
    <Teleport to="body">
      <transition name="blog-modal">
        <div v-if="activePost" class="blog-modal-overlay" @click.self="closePost">
          <div class="blog-modal">
            <button class="blog-modal-close" @click="closePost" aria-label="Close">✕</button>
            <div class="blog-modal-inner">
              <div class="blog-modal-meta">
                <span class="blog-category-tag">{{ activePost.category }}</span>
                <span class="blog-read-time">{{ activePost.readTime }}</span>
              </div>
              <h2 class="blog-modal-title t-title">{{ activePost.title }}</h2>
              <div class="blog-modal-byline">
                <span class="blog-author-dot"></span>
                <span class="t-small">{{ activePost.author }}</span>
                <span class="blog-date-sep">·</span>
                <span class="t-small">{{ activePost.displayDate }}</span>
              </div>
              <div class="blog-modal-body">
                <p v-for="(para, i) in activePost.body" :key="i" class="t-body">{{ para }}</p>
              </div>
              <div class="blog-modal-footer">
                <p class="t-small blog-modal-disclaimer">
                  This article is for informational purposes only and does not constitute professional tax advice.
                  For personalised guidance, please consult a registered tax practitioner.
                </p>
                <RouterLink to="/#contact" class="btn btn-primary btn-arrow" @click="closePost">
                  Book a Consultation
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useHead } from '@unhead/vue'
import AppNav from '@/components/shared/AppNav.vue'
import AppFooter from '@/components/shared/AppFooter.vue'
import { blogPosts } from '@/data/blogPosts.js'
import { useFadeUp } from '@/composables/useFadeUp.js'

useFadeUp()

const featured = computed(() => blogPosts.find(p => p.featured))
const otherPosts = computed(() => blogPosts.filter(p => !p.featured))

const activePost = ref(null)

function openPost(post) {
  activePost.value = post
  document.body.style.overflow = 'hidden'
}

function closePost() {
  activePost.value = null
  document.body.style.overflow = ''
}

useHead({
  title: 'Tax Insights & Advisory Blog | Snekhaya Tax & Accounting',
  meta: [
    { name: 'description', content: 'Practical commentary on South African tax law, SARS compliance, budget changes, and financial planning for individuals and business owners.' },
    { property: 'og:title', content: 'The Snekhaya Insights | SA Tax Advisory Blog' },
    { property: 'og:description', content: 'Practical South African tax commentary: income tax, VAT, CGT, retirement planning and SARS compliance.' },
  ],
  link: [{ rel: 'canonical', href: 'https://snekhaya.co.za/#/blog' }],
})
</script>
