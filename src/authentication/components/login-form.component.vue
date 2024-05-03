<template>
  <form v-on:submit="login($event)" class="bg-white dark:bg-black shadow-xl rounded px-8 pt-6 pb-8">
    <div class="flex flex-col space-y-6">
        <div class="flex justify-center">
          <img class="h-8 w-auto" src="/jobsync-logo.png" alt="JobSync Logo">
        </div>
        <div>
          <h1 class="text-center font-bold text-3xl">{{ $t('auth.login') }}</h1>
        </div>
        <div class="w-full">
          <label class="block tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2" for="email">
            {{ $t('auth.e-mail') }}
          </label>
          <pv-input id="email" class="w-full" v-model="email" placeholder="Enter your email" type="email" />
        </div>
      <div class="w-full">
        <label class="block tracking-wide text-gray-700 dark:text-white text-xs font-bold mb-2" for="password">
          {{ $t('auth.password') }}
        </label>
        <pv-input id="password" class="w-full" v-model="password" type="password" placeholder="••••••••••••" />
      </div>
      <pv-button type="submit" :label="$t('auth.login')" outlined />
      <div class="grid place-items-center">
        <p class="text-primary">
          <router-link to="/forgot-password" class="hover:font-medium">{{ $t('auth.forgot-password') }}</router-link>
        </p>
        <p>{{ $t('auth.account-question') }}
          <router-link class="hover:font-medium text-primary" to="register">{{ $t('auth.sign-up') }}</router-link>
        </p>
      </div>
    </div>
  </form>
</template>

<script>
import {AuthApiService} from "../services/authApiService.js";
import {useUserStore} from "../../shared/store/user-store.store.js";

export default {
  name: "login-form",
  data() {
    return {
      email: '',
      password: '',
      authApi: new AuthApiService()
    }
  },
  setup() {
    const userStore = useUserStore();

    const setUser = (user) => {
      userStore.setUser(user);
    };

    return { setUser };
  },
  methods: {
    login(event) {
      event.preventDefault();
      this.authApi.signIn(this.email, this.password)
        .then(res => {
          if (res.data.token) {
            localStorage.setItem('user', JSON.stringify(res.data));
          }
          this.$toast.add({
            severity: "success",
            summary: "JobSync",
            detail: "Logged in",
            life: 2000
          });
          this.setUser(res.data);
          location.reload();
          this.$router.push("/home")
        })
        .catch(err => this.$toast.add({
          severity: "warn",
          detail: "Invalid email or password",
          summary: err.response.data.message,
          life: 2000
        }));
    }
  }
}
</script>

<style scoped>

</style>