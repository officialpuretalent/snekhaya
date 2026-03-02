import { defineStore } from 'pinia'

export const useBookingStore = defineStore('booking', {
  state: () => {
    const now = new Date()
    return {
      calYear: now.getFullYear(),
      calMonth: now.getMonth(),
      MONTHS: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      DAYS: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      UNAVAILABLE: { 2: [3, 4], 10: [1, 2, 3], 15: [5, 6] },
      allTimeSlots: ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'],
      selectedDate: null,
      selectedTime: null,
      selectedDuration: '30',
      selectedServices: [],
      currentStep: 1,
      showConfirmation: false,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      description: '',
      errors: {},
      servicesError: false,
      cardNumber: '',
      cardName: '',
      cardExpiry: '',
      cardCvv: '',
      paymentErrors: {},
      paymentProcessing: false
    }
  },

  getters: {
    calMonthLabel(state) {
      return `${state.MONTHS[state.calMonth]} ${state.calYear}`
    },
    calendarDays(state) {
      const days = []
      const firstDay = new Date(state.calYear, state.calMonth, 1).getDay()
      const daysInMonth = new Date(state.calYear, state.calMonth + 1, 0).getDate()
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const unavail = state.UNAVAILABLE[state.calMonth] || []
      for (let i = 0; i < firstDay; i++) {
        days.push({ key: `e${i}`, type: 'empty' })
      }
      for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(state.calYear, state.calMonth, d)
        date.setHours(0, 0, 0, 0)
        const isToday = date.getTime() === today.getTime()
        const isPast = date < today || unavail.includes(d)
        const isSelected = state.selectedDate && state.selectedDate.getTime() === date.getTime()
        days.push({ key: `d${d}`, type: 'day', day: d, date, isToday, isPast, isSelected })
      }
      return days
    },
    timeSlots(state) {
      if (!state.selectedDate) {
        return state.allTimeSlots.map(t => ({ time: t, isUnavailable: false, isSelected: false }))
      }
      const unavailForDay = (state.UNAVAILABLE[state.selectedDate.getDate()] || [])
      return state.allTimeSlots.map(t => ({
        time: t,
        isUnavailable: unavailForDay.includes(parseInt(t.split(':')[0])),
        isSelected: state.selectedTime === t
      }))
    },
    selectedDateLabel(state) {
      if (!state.selectedDate) return null
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      return `${dayNames[state.selectedDate.getDay()]}, ${state.selectedDate.getDate()} ${state.MONTHS[state.selectedDate.getMonth()]}`
    },
    step1Valid(state) {
      return state.selectedDate && state.selectedTime
    },
    formattedDateTime(state) {
      if (!state.selectedDate || !state.selectedTime) return ''
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const durLabel = state.selectedDuration === '30' ? '30 min' : state.selectedDuration === '60' ? '1 hr' : '90 min'
      return `${dayNames[state.selectedDate.getDay()]}, ${state.selectedDate.getDate()} ${state.MONTHS[state.selectedDate.getMonth()]} ${state.calYear} at ${state.selectedTime} · ${durLabel}`
    },
    contactSummary(state) {
      const name = `${state.firstName} ${state.lastName}`.trim()
      const parts = [name, state.email, state.phone].filter(Boolean)
      if (state.company) parts.push(state.company)
      return parts.join(' · ')
    },
    servicesSummary(state) {
      return state.selectedServices.join(', ')
    },
    confDateTime(state) {
      if (!state.selectedDate || !state.selectedTime) return ''
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const durLabel = state.selectedDuration === '30' ? '30 min' : state.selectedDuration === '60' ? '1 hr' : '90 min'
      return `${dayNames[state.selectedDate.getDay()]}, ${state.selectedDate.getDate()} ${state.MONTHS[state.selectedDate.getMonth()]} ${state.calYear} at ${state.selectedTime} · ${durLabel}`
    },
    confDuration(state) {
      const map = { '30': '30 minutes', '60': '1 hour', '90': '90 minutes' }
      return map[state.selectedDuration] || ''
    },
    confClient(state) {
      return `${state.firstName} ${state.lastName} · ${state.email}`.trim()
    },
    selectedDateKey(state) {
      return state.selectedDate ? state.selectedDate.toDateString() : 'none'
    },
    consultationFee(state) {
      const map = { '30': 498, '60': 996, '90': 1494 }
      return map[state.selectedDuration] || 996
    },
    formattedFee(state) {
      const map = { '30': 498, '60': 996, '90': 1494 }
      const fee = map[state.selectedDuration] || 996
      return 'R\u00A0' + fee.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0')
    },
    durationLabel(state) {
      const map = { '30': '30-minute session', '60': '1-hour session', '90': '90-minute session' }
      return map[state.selectedDuration] || '1-hour session'
    }
  },

  actions: {
    prevMonth() {
      if (this.calMonth === 0) { this.calMonth = 11; this.calYear-- }
      else this.calMonth--
    },
    nextMonth() {
      if (this.calMonth === 11) { this.calMonth = 0; this.calYear++ }
      else this.calMonth++
    },
    selectDate(day) {
      this.selectedDate = day.date
      this.selectedTime = null
    },
    selectTime(slot) {
      if (!slot.isUnavailable) this.selectedTime = slot.time
    },
    toggleService(id) {
      const idx = this.selectedServices.indexOf(id)
      if (idx === -1) this.selectedServices.push(id)
      else this.selectedServices.splice(idx, 1)
    },
    setDuration(dur) {
      this.selectedDuration = dur
    },
    goToStep(n) {
      if (n === 3 && this.currentStep === 2) {
        if (!this.validateStep2()) return
      }
      this.currentStep = n
    },
    onCardNumberInput(value) {
      const raw = value.replace(/\D/g, '').substring(0, 16)
      this.cardNumber = raw.replace(/(.{4})(?=.)/g, '$1  ')
    },
    onCardExpiryInput(value) {
      let raw = value.replace(/\D/g, '').substring(0, 4)
      this.cardExpiry = raw.length > 2 ? raw.substring(0, 2) + ' / ' + raw.substring(2) : raw
    },
    validatePayment() {
      const errors = {}
      if (this.cardNumber.replace(/\s/g, '').length < 16) errors.cardNumber = true
      if (!this.cardName.trim()) errors.cardName = true
      if (this.cardExpiry.replace(/\D/g, '').length < 4) errors.cardExpiry = true
      if (this.cardCvv.length < 3) errors.cardCvv = true
      this.paymentErrors = errors
      return Object.keys(errors).length === 0
    },
    validateStep2() {
      const errors = {}
      if (!this.firstName.trim()) errors.firstName = true
      if (!this.lastName.trim()) errors.lastName = true
      if (!this.email.trim() || !this.email.includes('@')) errors.email = true
      if (!this.phone.trim()) errors.phone = true
      this.errors = errors
      this.servicesError = this.selectedServices.length === 0
      return Object.keys(errors).length === 0 && !this.servicesError
    },
    submitBooking() {
      if (!this.validatePayment()) return
      this.paymentProcessing = true
      setTimeout(() => {
        this.paymentProcessing = false
        this.showConfirmation = true
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 2000)
    }
  }
})
