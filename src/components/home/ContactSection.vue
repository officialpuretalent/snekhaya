<template>
  <section class="contact" id="contact">
    <div class="contact-inner">
      <div class="fade-up">
        <div class="eyebrow">
          <div class="eyebrow-rule"></div>
          <span class="t-label">Contact</span>
        </div>
        <h2 class="t-title">Let's discuss your<br><em>requirements</em></h2>
        <p class="t-body" style="margin-top:1.25rem">We are here to help you navigate every financial and
          compliance challenge. Reach out — we respond promptly and professionally.</p>

        <div class="contact-details">
          <div class="contact-item">
            <div class="contact-icon"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.09 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .9h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg></div>
            <div>
              <div class="contact-item-label">Telephone</div>
              <div class="contact-item-value">+27 78 310 1762<br>+27 73 786 6576</div>
            </div>
          </div>

          <div class="contact-item">
            <div class="contact-icon"><svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg></div>
            <div>
              <div class="contact-item-label">Email</div>
              <div class="contact-item-value">info@snekhaya.co.za</div>
            </div>
          </div>

          <div class="contact-item">
            <div class="contact-icon"><svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg></div>
            <div>
              <div class="contact-item-label">Office</div>
              <div class="contact-item-value">Suite 4 Truworths Square<br>88 King Shaka Street<br>KwaDukuza, 4450</div>
            </div>
          </div>
        </div>
      </div>

      <div class="fade-up d2">
        <div class="contact-form-wrap">
          <div class="eyebrow" style="margin-bottom:1.75rem">
            <div class="eyebrow-rule"></div>
            <span class="t-label">Send an Enquiry</span>
          </div>

          <form @submit.prevent="submitEnquiry">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">First Name</label>
                <input type="text" class="form-field" v-model="form.firstName" placeholder="First name">
              </div>
              <div class="form-group">
                <label class="form-label">Last Name</label>
                <input type="text" class="form-field" v-model="form.lastName" placeholder="Last name">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input type="email" class="form-field" v-model="form.email" placeholder="your@email.com">
            </div>

            <div class="form-group">
              <label class="form-label">Phone Number</label>
              <input type="tel" class="form-field" v-model="form.phone" placeholder="+27 00 000 0000">
            </div>

            <div class="form-group">
              <label class="form-label">Service of Interest</label>
              <select class="form-field" v-model="form.service">
                <option value="">Select a service…</option>
                <option>Tax &amp; Compliance</option>
                <option>Registrations &amp; Filings</option>
                <option>Financial Services</option>
                <option>Business Support</option>
                <option>Specialized Services</option>
                <option>Monthly Retainer Contract</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Message</label>
              <textarea class="form-field" v-model="form.message" placeholder="Briefly describe your requirements…"></textarea>
            </div>

            <button type="submit" class="form-submit">Send Enquiry</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  service: '',
  message: ''
})

function submitEnquiry() {
  // TODO: implement real enquiry submission
  console.log('Enquiry submitted:', { ...form })
}
</script>
