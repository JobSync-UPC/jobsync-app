import { defineStore } from 'pinia';

export const useUserStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    role: null,
    user: null,
    companyId: null,
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
            this.companyId = data.recruiter.company.id;
          }
        }
    },
    logout() {
      localStorage.removeItem("user");
      this.isAuthenticated = false;
      this.role = null;
      this.isApplicant = null;
      this.companyId = null;
      this.token = null;
    },
  }
});