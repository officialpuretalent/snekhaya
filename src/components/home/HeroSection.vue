<template>
  <section class="hero">
    <div class="hero-swirl" aria-hidden="true">
      <svg viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <path d="M1500 -80 C1350 0 1150 80 1200 260 C1250 440 1450 500 1380 680 C1310 860 1050 880 830 820 C610 760 420 620 380 440 C340 260 500 110 680 140 C860 170 950 330 880 460 C810 590 640 610 560 530 C480 450 510 330 600 290" stroke="#B89A4E" stroke-opacity="0.11" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <path d="M-60 980 C60 830 180 720 120 560 C60 400 -80 300 40 160 C160 20 360 -20 520 80 C680 180 700 400 560 490 C420 580 260 520 240 400 C220 280 360 220 460 280" stroke="#B89A4E" stroke-opacity="0.07" stroke-width="2" fill="none" stroke-linecap="round"/>
        <path d="M200 -40 C280 60 220 200 120 260 C20 320 -60 240 0 140" stroke="#B89A4E" stroke-opacity="0.05" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        <path d="M1300 700 C1350 620 1400 540 1340 480 C1280 420 1200 460 1220 540 C1240 620 1320 620 1340 560" stroke="#B89A4E" stroke-opacity="0.06" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        <ellipse cx="1200" cy="150" rx="300" ry="250" fill="#B89A4E" fill-opacity="0.025" transform="rotate(-20 1200 150)"/>
        <ellipse cx="220" cy="760" rx="250" ry="200" fill="#B89A4E" fill-opacity="0.018" transform="rotate(15 220 760)"/>
      </svg>
    </div>

    <div class="hero-inner">
      <div class="hero-left">
        <div class="hero-kicker">
          <span class="hero-kicker-dot"></span>
          <span class="hero-kicker-text">Over 20 Years of Trusted Excellence</span>
        </div>

        <h1 class="t-display">
          We worry about<br>
          <em>compliance</em> so<br>
          you won't have to
        </h1>

        <p class="t-body hero-body">
          With over two decades of experience, your business is in capable hands. We prioritise compliance and
          accurate reporting — so you can stay focused on growth.
        </p>

        <div class="hero-stats">
          <div class="hero-stat">
            <div class="hero-stat-num">20+</div>
            <div class="hero-stat-label">Years</div>
          </div>
          <div class="hero-stat">
            <div class="hero-stat-num">5</div>
            <div class="hero-stat-label">Services</div>
          </div>
          <div class="hero-stat">
            <div class="hero-stat-num">100%</div>
            <div class="hero-stat-label">Compliance</div>
          </div>
        </div>

        <div class="hero-cta">
          <a href="#services" class="btn btn-primary btn-arrow">Our Services</a>
          <RouterLink to="/booking" class="btn btn-ghost">Book Consultation</RouterLink>
        </div>
      </div>

      <div class="hero-right">
        <div class="hero-panel">
          <div class="hero-panel-card">
            <div class="hero-panel-header">
              <span class="hero-panel-title">Core Services</span>
              <span class="hero-panel-badge">KwaDukuza, SA</span>
            </div>

            <div class="hero-panel-item">
              <div class="panel-icon"><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg></div>
              <span class="panel-item-text">Tax &amp; Compliance</span>
              <span class="panel-item-arrow"><svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg></span>
            </div>

            <div class="hero-panel-item">
              <div class="panel-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg></div>
              <span class="panel-item-text">Registrations &amp; Filings</span>
              <span class="panel-item-arrow"><svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg></span>
            </div>

            <div class="hero-panel-item">
              <div class="panel-icon"><svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg></div>
              <span class="panel-item-text">Financial Services</span>
              <span class="panel-item-arrow"><svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg></span>
            </div>

            <div class="hero-panel-item">
              <div class="panel-icon"><svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" /></svg></div>
              <span class="panel-item-text">Business Support</span>
              <span class="panel-item-arrow"><svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg></span>
            </div>

            <div class="hero-panel-item">
              <div class="panel-icon"><svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg></div>
              <span class="panel-item-text">Specialized Services</span>
              <span class="panel-item-arrow"><svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg></span>
            </div>

            <div class="hero-panel-item">
              <div class="panel-icon"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg></div>
              <span class="panel-item-text">Monthly Retainer Contracts</span>
              <span class="panel-item-arrow"><svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg></span>
            </div>
          </div>
          <div class="hero-panel-float"></div>
        </div>
      </div>
    </div>
  </section>
</template>
