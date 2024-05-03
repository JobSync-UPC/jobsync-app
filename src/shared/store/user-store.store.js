import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    isAuthenticated: false,
    role: null,
    user: null,
    hasCompany: false,
    token: null,
  }),
  actions: {
    setUser(data) {
      this.isAuthenticated = true;
      this.role = data.user.role;
      this.token = data.token;

        if (this.role === "ROLE_APPLICANT") {
            this.user = data.applicant;
        } else {
          this.user = data.recruiter;

          if (data.recruiter.company) {
            this.hasCompany = true;
          }
        }
    },
    updateUser(data) {
      this.user = data;
      this.role = data.role;
      if (data.company) {
        this.hasCompany = true;
      }
    },
    logout() {
      localStorage.removeItem("user");
      this.isAuthenticated = false;
      this.role = null;
      this.isApplicant = null;
      this.hasCompany = false;
      this.token = null;
    },
  }
});