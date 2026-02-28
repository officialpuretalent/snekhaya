<template>
  <section class="leadership" id="leadership">
    <div class="leadership-inner">
      <div class="ceo-card fade-up">
        <div class="ceo-photo-wrap">
          <img :src="ceoPhoto" alt="Sinegugu Mthembu – Chief Executive Officer" class="ceo-photo">
          <div class="ceo-nameplate">
            <div class="ceo-name">Sinegugu Mthembu</div>
            <div class="ceo-title-text">Chief Executive Officer &mdash; Former CFO &amp; Manager, Budget &amp; Compliance</div>
          </div>
        </div>
        <div class="ceo-strip">
          <div class="ceo-strip-cell">
            <div class="ceo-strip-val">20+</div>
            <div class="ceo-strip-key">Years</div>
          </div>
          <div class="ceo-strip-cell">
            <div class="ceo-strip-val">CFO</div>
            <div class="ceo-strip-key">Background</div>
          </div>
          <div class="ceo-strip-cell">
            <div class="ceo-strip-val">SA</div>
            <div class="ceo-strip-key">Based</div>
          </div>
        </div>
      </div>

      <div class="ceo-content fade-up d2">
        <div class="eyebrow">
          <div class="eyebrow-rule"></div>
          <span class="t-label">Leadership</span>
        </div>
        <h2 class="t-title">Led by <em>experience</em><br>and expertise</h2>
        <p class="t-body">
          Sinegugu Mthembu brings an exceptional professional background to the helm of Snekhaya Tax and
          Accounting Advisory. As a former CFO and Budget &amp; Compliance Manager, she has navigated complex
          financial landscapes across multiple industries.
        </p>
        <p class="t-body">
          Her hands-on experience in senior financial leadership positions her to understand not just the
          numbers, but the strategic implications behind them — delivering advice that is both technically
          rigorous and commercially astute.
        </p>

        <div class="ceo-pullquote">
          <p>"We do not simply file returns. We build financial confidence so that businesses can grow without limits."</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import ceoPhoto from '@/assets/images/ceo.png'
</script>
