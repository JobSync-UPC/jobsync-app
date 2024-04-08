import { defineStore } from 'pinia';

export const useUserStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    role: null,
    user: null,
  }),
  actions: {
    setUser(user) {
      this.isAuthenticated = true;
      this.user = user;
      this.role = user.user.role;
    },
    logout() {
      localStorage.removeItem("user");
      this.isAuthenticated = false;
      this.role = null;
      this.isApplicant = null;
    },
  }
});