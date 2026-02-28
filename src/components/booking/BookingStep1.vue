<template>
  <div class="step-panel" v-show="store.currentStep === 1" id="panel-1">
    <div class="cal-layout">
      <!-- Calendar -->
      <div class="cal-left">
        <div class="cal-header">
          <span class="cal-month-label">{{ store.calMonthLabel }}</span>
          <div class="cal-nav-btns">
            <button class="cal-nav-btn" @click="store.prevMonth()" aria-label="Previous month">
              <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <button class="cal-nav-btn" @click="store.nextMonth()" aria-label="Next month">
              <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        </div>
        <div class="cal-grid">
          <div class="cal-day-name">Su</div>
          <div class="cal-day-name">Mo</div>
          <div class="cal-day-name">Tu</div>
          <div class="cal-day-name">We</div>
          <div class="cal-day-name">Th</div>
          <div class="cal-day-name">Fr</div>
          <div class="cal-day-name">Sa</div>
          <div
            v-for="day in store.calendarDays"
            :key="day.key"
            :class="['cal-day', { empty: day.type === 'empty', today: day.isToday, past: day.isPast, selected: day.isSelected }]"
            @click="day.type === 'day' && !day.isPast && store.selectDate(day)"
          >{{ day.type === 'day' ? day.day : '' }}</div>
        </div>
      </div>

      <!-- Time slots -->
      <div class="cal-right">
        <div class="time-header">
          <div class="time-header-label">Available Times</div>
          <div class="time-selected-date">
            <span v-if="store.selectedDate" class="time-selected-date">{{ store.selectedDateLabel }}</span>
            <span v-else class="time-selected-date time-placeholder">Select a date first</span>
          </div>
        </div>

        <span class="dur-label">Session Duration</span>
        <div class="duration-toggle">
          <div :class="['dur-btn', { selected: store.selectedDuration === '30' }]" @click="store.setDuration('30')">30 min</div>
          <div :class="['dur-btn', { selected: store.selectedDuration === '60' }]" @click="store.setDuration('60')">1 hour</div>
          <div :class="['dur-btn', { selected: store.selectedDuration === '90' }]" @click="store.setDuration('90')">90 min</div>
        </div>

        <TransitionGroup tag="div" class="slots-grid" name="slot">
          <div
            v-for="(slot, index) in store.timeSlots"
            :key="slot.time + store.selectedDateKey"
            :style="{ '--slot-delay': `${index * 0.028}s` }"
            :class="['time-slot', { unavailable: slot.isUnavailable, selected: slot.isSelected }]"
            @click="!slot.isUnavailable && store.selectTime(slot)"
          >{{ slot.time }}</div>
        </TransitionGroup>

        <p class="slots-note" v-if="store.selectedDate">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
          All times are in South African Standard Time (SAST, UTC+2).
        </p>
      </div>
    </div>

    <div class="panel-footer">
      <span class="panel-footer-note">
        <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
        Select a date and time to continue
      </span>
      <div class="panel-footer-actions">
        <button class="btn btn-primary" :disabled="!store.step1Valid" @click="next">
          Continue
          <svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" transform="rotate(180 12 12)" /></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { nextTick } from 'vue'
import { useBookingStore } from '@/stores/booking.js'

const store = useBookingStore()

function next() {
  store.goToStep(2)
  nextTick(() => {
    const card = document.querySelector('.booking-card')
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}
</script>
