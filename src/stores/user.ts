import { defineStore } from 'pinia'

export type Role = 'Admin' | 'Supervisor' | 'Engineer' | 'Viewer'

interface UserState {
  isAuthenticated: boolean
  name: string
  role: Role
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    isAuthenticated: false,
    name: '',
    role: 'Viewer',
  }),
  actions: {
    login(name: string, role: Role) {
      this.isAuthenticated = true
      this.name = name
      this.role = role
    },
    logout() {
      this.isAuthenticated = false
      this.name = ''
      this.role = 'Viewer'
    },
  },
})


