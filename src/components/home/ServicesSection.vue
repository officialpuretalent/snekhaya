<template>
  <section class="services" id="services">
    <div class="services-header fade-up">
      <div>
        <div class="eyebrow">
          <div class="eyebrow-rule"></div>
          <span class="t-label">What We Offer</span>
        </div>
        <h2 class="t-title">Services for every<br><em>business need</em></h2>
      </div>
      <p class="services-header-intro">
        From foundational compliance to high-level financial strategy, our suite of services is designed to
        support your business at every stage of its journey — comprehensively and with care.
      </p>
    </div>

    <div class="services-grid">
      <div
        v-for="service in services"
        :key="service.num"
        :class="['service-card', { 'service-card-featured': service.featured }, 'fade-up', service.delay]"
      >
        <div class="service-card-accent"></div>
        <span class="service-num">{{ service.num }}</span>
        <div class="service-icon" v-html="service.icon"></div>
        <div class="service-category t-label" :style="service.featured ? 'color:var(--gold-dim)' : ''">{{ service.category }}</div>
        <h3 class="service-name" :style="service.featured ? 'color:rgba(255,255,255,0.88)' : ''">{{ service.name }}</h3>
        <ul v-if="service.items" class="service-items">
          <li v-for="item in service.items" :key="item">{{ item }}</li>
        </ul>
        <p v-if="service.body" class="service-body">{{ service.body }}</p>
        <a v-if="service.cta" href="#contact" class="btn-sm-gold">Enquire Now</a>
      </div>
    </div>
  </section>
</template>

<script setup>
const services = [
  {
    num: '01',
    delay: '',
    category: 'Tax & Compliance',
    name: 'Tax Returns & Submissions',
    icon: `<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>`,
    items: ['Annual Income Tax Returns', 'Provisional Tax Returns', 'VAT Returns', 'Payroll Returns']
  },
  {
    num: '02',
    delay: 'd1',
    category: 'Registrations & Filings',
    name: 'Company & Regulatory Filings',
    icon: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>`,
    items: ['Company Registration', 'VAT Registration', 'Customs Registration', 'CIPC Annual Returns', 'Beneficial Ownership Filing']
  },
  {
    num: '03',
    delay: 'd2',
    category: 'Financial Services',
    name: 'Reporting & Planning',
    icon: `<svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>`,
    items: ['Annual Financial Statements', 'Management Accounts', 'Cashflow Projections', 'Budget Preparation']
  },
  {
    num: '04',
    delay: '',
    category: 'Business Support',
    name: 'Strategic Advisory',
    icon: `<svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" /></svg>`,
    items: ['CFO Advisory', 'Business & Funding Proposals', 'Company Profile', 'Finance Policy Development & Reviews']
  },
  {
    num: '05',
    delay: 'd1',
    category: 'Specialized Services',
    name: 'Specialized Compliance',
    icon: `<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>`,
    items: ['COIDA', 'Reinstatement of Companies']
  },
  {
    num: '∞',
    delay: 'd2',
    category: 'Ongoing Partnership',
    name: 'Monthly Retainer Contracts',
    featured: true,
    icon: `<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>`,
    body: 'Dedicated, ongoing support for all your tax and accounting needs. Predictable monthly costs, priority access, and a partner at your side throughout the year.',
    cta: true
  }
]
</script>
