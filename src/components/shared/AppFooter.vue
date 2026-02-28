<template>
  <footer>
    <div class="trust-bar">
      <span class="trust-bar-label">Recognised &amp; Registered</span>
      <div class="trust-badges">
        <div class="trust-badge"><svg viewBox="0 0 12 12"><polyline points="2 6 5 9 10 3" /></svg>SAICA</div>
        <div class="trust-badge"><svg viewBox="0 0 12 12"><polyline points="2 6 5 9 10 3" /></svg>SAIPA</div>
        <div class="trust-badge"><svg viewBox="0 0 12 12"><polyline points="2 6 5 9 10 3" /></svg>SARS eFiling</div>
        <div class="trust-badge"><svg viewBox="0 0 12 12"><polyline points="2 6 5 9 10 3" /></svg>CIPC Registered</div>
      </div>
    </div>

    <div class="footer-main">
      <div class="footer-col footer-col-brand">
        <div class="footer-brand">
          <BrandLogo />
        </div>
        <p class="footer-desc">Professional tax, compliance and financial advisory rooted in KwaDukuza — serving clients across South Africa.</p>
        <address class="footer-address">
          Suite 4 Truworths Square, 88 King Shaka St<br>
          KwaDukuza, 4450 · KwaZulu-Natal
        </address>
        <div class="footer-contact-links">
          <a href="tel:+27783101762">+27 78 310 1762</a>
          <a href="tel:+27737866576">+27 73 786 6576</a>
          <a href="mailto:info@snekhaya.co.za">info@snekhaya.co.za</a>
        </div>
      </div>

      <div class="footer-col">
        <h4 class="footer-col-heading">Services</h4>
        <ul class="footer-links">
          <li><a href="#services">Tax Returns &amp; Compliance</a></li>
          <li><a href="#services">Company Registration</a></li>
          <li><a href="#services">VAT &amp; PAYE</a></li>
          <li><a href="#services">Financial Statements</a></li>
          <li><a href="#services">Strategic Advisory</a></li>
          <li><RouterLink to="/booking">Book a Consultation</RouterLink></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4 class="footer-col-heading">Learn</h4>
        <ul class="footer-links">
          <li><a href="#about">About Snekhaya</a></li>
          <li><a href="#leadership">Our Leadership</a></li>
          <li><a href="#">Tax Compliance in SA</a></li>
          <li><a href="#">VAT Registration Guide</a></li>
          <li><a href="#">SARS eFiling Overview</a></li>
          <li><a href="#">CIPC &amp; Company Records</a></li>
        </ul>
      </div>

      <div class="footer-col">
        <h4 class="footer-col-heading">Legal</h4>
        <ul class="footer-links">
          <li><a href="#">Terms &amp; Conditions</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">POPIA Compliance</a></li>
          <li><a href="#">Cookie Policy</a></li>
          <li><a href="#">Disclaimer</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <p class="footer-copy">&copy; {{ year }} Snekhaya Tax and Accounting Advisory. All rights reserved.</p>
      <p class="footer-tagline-bottom">We worry about compliance — so you won't have to</p>
    </div>
  </footer>
</template>

<script setup>
import BrandLogo from './BrandLogo.vue'

const year = new Date().getFullYear()
</script>
