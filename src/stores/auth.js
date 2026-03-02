import { defineStore } from 'pinia'

const STORAGE_KEY = 'snekhaya_portal'

// Demo accounts — plaintext passwords are intentional for this fake/demo system
const SEED_USERS = [
  {
    id: 'usr_demo',
    name: 'Sipho Dlamini',
    email: 'demo@snekhaya.co.za',
    password: 'Demo@2026',
    role: 'client',
    phone: '082 000 0001',
    idNumber: '8501015800082',
    company: 'Dlamini Holdings (Pty) Ltd',
    joinedAt: '2024-03-01',
  },
  {
    id: 'usr_admin',
    name: 'Nompumelelo Khumalo',
    email: 'admin@snekhaya.co.za',
    password: 'Admin@2026',
    role: 'admin',
    phone: '031 000 0002',
    idNumber: '',
    company: 'Snekhaya Tax & Accounting Advisory',
    joinedAt: '2023-01-01',
  },
]

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
  } catch {
    return null
  }
}

function persist(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export const useAuthStore = defineStore('auth', {
  state: () => {
    const saved = load()
    return {
      user: saved?.user ?? null,
      token: saved?.token ?? null,
      _extra: saved?.extra ?? [],
    }
  },

  getters: {
    isAuthenticated: (s) => !!s.token,
    isAdmin: (s) => s.user?.role === 'admin',
  },

  actions: {
    _all() {
      return [...SEED_USERS, ...this._extra]
    },

    login({ email, password }) {
      const match = this._all().find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
      )
      if (!match) throw new Error('Incorrect email or password. Please try again.')
      const { password: _pw, ...safe } = match
      this.user = safe
      this.token = `snk_${Date.now()}`
      persist({ user: this.user, token: this.token, extra: this._extra })
    },

    register({ name, email, password, phone, idNumber }) {
      if (this._all().find((u) => u.email.toLowerCase() === email.toLowerCase())) {
        throw new Error('An account with this email address already exists.')
      }
      const user = {
        id: `usr_${Date.now()}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        role: 'client',
        phone: phone?.trim() || '',
        idNumber: idNumber?.trim() || '',
        company: '',
        joinedAt: new Date().toISOString().slice(0, 10),
      }
      this._extra = [...this._extra, user]
      const { password: _pw, ...safe } = user
      this.user = safe
      this.token = `snk_${Date.now()}`
      persist({ user: this.user, token: this.token, extra: this._extra })
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem(STORAGE_KEY)
    },
  },
})
