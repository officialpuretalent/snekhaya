<template>
  <div id="home-page">
    <AppNav />
    <HeroSection />
    <TickerSection />
    <AboutSection />
    <ServicesSection />
    <LeadershipSection />
    <CtaStrip />
    <ContactSection />
    <AppFooter />
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue'
import AppNav from '@/components/shared/AppNav.vue'
import AppFooter from '@/components/shared/AppFooter.vue'
import HeroSection from '@/components/home/HeroSection.vue'
import TickerSection from '@/components/home/TickerSection.vue'
import AboutSection from '@/components/home/AboutSection.vue'
import ServicesSection from '@/components/home/ServicesSection.vue'
import LeadershipSection from '@/components/home/LeadershipSection.vue'
import CtaStrip from '@/components/home/CtaStrip.vue'
import ContactSection from '@/components/home/ContactSection.vue'
import { useFadeUp } from '@/composables/useFadeUp.js'

useFadeUp()

useHead({
  title: 'Snekhaya Tax & Accounting Advisory | KwaDukuza, South Africa',
  meta: [
    { name: 'description', content: 'Professional tax returns, company registration, financial statements and strategic advisory. Serving KwaDukuza and clients nationally. SAICA · SAIPA · SARS eFiling · CIPC.' },
    { name: 'keywords', content: 'tax accounting KwaDukuza, tax returns South Africa, company registration, VAT registration, financial statements, SARS eFiling, accounting KwaZulu-Natal' },
    { name: 'author', content: 'Snekhaya Tax & Accounting Advisory' },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: 'Snekhaya Tax & Accounting Advisory' },
    { property: 'og:description', content: 'Professional tax, compliance and financial advisory services in KwaDukuza. SAICA · SAIPA · CIPC · SARS eFiling.' },
    { property: 'og:url', content: 'https://snekhaya.co.za/' },
    { property: 'og:site_name', content: 'Snekhaya Tax & Accounting Advisory' },
    { property: 'og:locale', content: 'en_ZA' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: 'Snekhaya Tax & Accounting Advisory' },
    { name: 'twitter:description', content: 'Tax returns, company registration, financial advisory. KwaDukuza, South Africa.' }
  ],
  link: [
    { rel: 'canonical', href: 'https://snekhaya.co.za/' }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'AccountingService',
        name: 'Snekhaya Tax & Accounting Advisory',
        description: 'Professional tax returns, company registration, VAT, financial statements and strategic advisory services.',
        telephone: ['+27783101762', '+27737866576'],
        email: 'info@snekhaya.co.za',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Suite 4 Truworths Square, 88 King Shaka Street',
          addressLocality: 'KwaDukuza',
          postalCode: '4450',
          addressRegion: 'KwaZulu-Natal',
          addressCountry: 'ZA'
        },
        url: 'https://snekhaya.co.za',
        areaServed: 'ZA',
        hasCredential: ['SAICA', 'SAIPA', 'SARS eFiling', 'CIPC Registered']
      })
    }
  ]
})
</script>
