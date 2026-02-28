import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null
  }),
  getters: {
    isAuthenticated: (state) => !!state.token
  },
  actions: {
    login(_credentials) {
      // TODO: implement real auth
    },
    logout() {
      this.user = null
      this.token = null
    }
  }
})
