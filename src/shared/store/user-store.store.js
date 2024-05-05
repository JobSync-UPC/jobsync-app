import { defineStore } from 'pinia';
import {UsersApiService} from "../services/users.service.js";

export const useUserStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null,
    role: null,
    hasCompany: false,
    token: null,

    usersApi: new UsersApiService(),
  }),
  actions: {
    login(data) {
      if (!data.user) {
        return;
      }

      this.isAuthenticated = true;
      this.user = data.user;
      this.role = data.user.role;
      this.token = data.token;

      if (data.user.company) {
        this.hasCompany = true;
      }

      localStorage.setItem('auth', JSON.stringify(data));
    },
    updateUser() {
      if (this.user.id === null || !this.user.id) {
        this.logout();
        return;
      }

      this.usersApi.getById(this.user.id)
          .then((response) => {
            this.user = response.data;
            this.role = response.data.role;
            this.hasCompany = !!response.data.company;
      }).catch((error) => {
        console.error(error);
      });

      localStorage.setItem('auth', JSON.stringify(
          {
            isAuthenticated: this.isAuthenticated,
            user: this.user,
            role:  this.role,
            hasCompany: this.hasCompany,
            token: this.token
          }
      ));
    },
    logout() {
      localStorage.removeItem("auth");
      this.isAuthenticated = false;
      this.user = null;
      this.role = null;
      this.hasCompany = false;
      this.token = null;
    },
  }
});