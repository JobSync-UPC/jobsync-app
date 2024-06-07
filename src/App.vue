<template>
  <pv-toast />
  <pv-toolbar v-if="!isAnAuthenticationPath($route.path)" class="sticky top-0 z-50 shadow">
    <template #start>
      <div class="flex items-center gap-2 md:gap-4 lg:gap-6">
        <router-link to="/">
          <img src="/jobsync-logo.png" alt="JobSync Logo" class="h-6 w-auto md:w-auto lg:w-auto" />
        </router-link>
        <div class="hidden md:flex">
          <div v-if="this.user && this.user.role === 'ROLE_APPLICANT'" class="flex flex-col md:flex-row">
            <pv-button :label="$t('navbar.jobs')" text plain
                       @click="this.$router.push('/jobs')"
                       class="mb-2 md:mb-0 md:mr-2 lg:mr-4"
            />
            <pv-button :label="$t('navbar.applications')" text plain
                       @click="this.$router.push('/applications')"
                       class="mb-2 md:mb-0 md:mr-2 lg:mr-4"
            />
            <pv-button :label="$t('navbar.profile')" text plain
                       @click="this.$router.push('/profile')"
            />
          </div>
          <div v-else-if="this.user && this.user.role === 'ROLE_RECRUITER'" class="flex flex-col md:flex-row">
            <div v-if="this.user.company">
              <pv-button :label="$t('navbar.recruitments')" text plain
                         @click="this.$router.push('/recruitments')"
                         class="mb-2 md:mb-0 md:mr-2 lg:mr-4"
              />
              <pv-button :label="$t('navbar.company')" text plain
                         @click="this.$router.push('/company-profile')"
              />
            </div>
            <div v-else>
              <pv-button :label="$t('navbar.create-organization')" text plain
                         @click="this.$router.push('/company-create')"
              />
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #end>
      <div class="flex gap-4">
        <div class="sm:block md:hidden">
          <pv-button
              icon="pi pi-bars"
              text plain
              @click="this.visibleMobileBar = !this.visibleMobileBar"
          />
        </div>
        <pv-avatar
            shape="circle"
            :image="this.user && this.user.profilePictureUrl" style="width: 36px; height: 36px"
            class="hover:cursor-pointer"
            @click="this.userOptions = !this.userOptions"
        />
      </div>
    </template>
  </pv-toolbar>


  <div class="container mx-auto py-8 px-2">
    <RouterView
        v-on:loggedIn="handleUser"
    />
  </div>

  <pv-dialog v-model:visible="userOptions" :header="greeting()"
             position="topright" :modal="true" :draggable="false">
    <div class="grid">
      <pv-button :label="$t('navbar.user')" text plain
                 @click="this.$router.push('/manage-profile'); this.userOptions = false"
      />
      <pv-button
          :label="$t('settings.title')" text plain
          @click="this.$router.push('/settings'); this.userOptions = false"
      />
      <pv-button
          :label="$t('auth.logout')" text plain
          @click="logout"
      />
    </div>
  </pv-dialog>

  <pv-dialog v-model:visible="visibleMobileBar"
             position="topright" :modal="true" :draggable="false">
    <div v-if="this.user && this.user.role === 'ROLE_APPLICANT'" class="grid">
      <pv-button :label="$t('navbar.jobs')" text plain
                 @click="this.$router.push('/jobs'); this.visibleMobileBar = false"
      />
      <pv-button :label="$t('navbar.applications')" text plain
                 @click="this.$router.push('/applications'); this.visibleMobileBar = false"
      />
      <pv-button :label="$t('navbar.profile')" text plain
                  @click="this.$router.push('/'); this.visibleMobileBar = false"
      />
    </div>
    <div v-else-if="this.user && this.user.role === 'ROLE_RECRUITER'" class="grid">
      <div v-if="this.user.company">
        <pv-button :label="$t('navbar.recruitments')" text plain
                   @click="this.$router.push('/recruitments'); this.visibleMobileBar = false"
        />
        <pv-button :label="$t('navbar.company')" text plain
                   @click="this.$router.push('/company-profile'); this.visibleMobileBar = false"
        />
      </div>
      <div v-else>
        <pv-button :label="$t('navbar.create-organization')" text plain
                   @click="this.$router.push('/create-company'); this.visibleMobileBar = false"
        />
      </div>
    </div>
  </pv-dialog>
</template>

<script>
// Dependencies
import {AuthApiService} from "./authentication/services/authApiService.js";
import {useThemeStore} from "./settings/stores/app-theme.store.js";
import {useUserStore} from "./shared/store/user-store.store.js";
import {UsersApiService} from "./shared/services/users.service.js";

export default {
  data() {
    return {
      visibleMobileBar: false,
      authenticationPaths: new Set([
        "/login",
        "/register",
        "/password-recovery",
        "/forgot-password",
        "/recover-password"
      ]),
      authApi: new AuthApiService(),
      userApi: new UsersApiService(),
      user: null,
      userOptions: false,
    }
  },
  created() {
    this.$i18n.locale = localStorage.getItem("preferred-language") ?? "en";
    const user = localStorage.getItem("auth");

    if (user) {
      this.user = JSON.parse(user).user;
    }
  },
  computed: {
    theme() {
      return useThemeStore().theme;
    },
    user() {
      const user = localStorage.getItem("auth");
      return user ? JSON.parse(user).user : null;
    }
  },
  watch: {
    theme(newTheme) {
      const store = useThemeStore();
      store.setTheme(newTheme);
    },
  },
  mounted() {
    const userStore = useUserStore();
    const userData = localStorage.getItem('auth');

    if (userData) {
      userStore.login(JSON.parse(userData));
    }
  },
  methods: {
    isAnAuthenticationPath(path) {
      return this.authenticationPaths.has(path);
    },
    logout() {
      this.userOptions = false;
      const userStore = useUserStore();
      userStore.logout();
      this.$toast.add({
        severity: "warn",
        summary: "User",
        detail: "Logging out...",
        life: 1000
      });
      this.$router.push("/login");
    },
    greeting(){
      if (this.user) {
        return this.$t('general.hello') + ", " + this.user.firstname;
      }
    },
    handleUser() {
      const userStore = useUserStore();
      userStore.updateUser();
      console.log(userStore.user);
      this.user = userStore.user;
    }
  }
}
</script>

<style scoped>
.sticky {
  position: sticky;
}
</style>
