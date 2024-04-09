import {createRouter, createWebHistory} from "vue-router";

// Pages
import {useUserStore} from "../authentication/store/user-store.store.js";
import RegisterComponent from "../authentication/pages/register.component.vue";
import LoginComponent from "../authentication/pages/login.component.vue";
import PasswordForgotComponent from "../authentication/pages/password-forgot.component.vue";
import PasswordRecoveryComponent from "../authentication/pages/password-recovery.component.vue";
import PageNotFoundComponent from "../shared/pages/page-not-found.component.vue";
import ProfileManagement from "../authentication/pages/profile-management.vue";
import SettingsComponent from "../settings/pages/settings.component.vue";
import JobsPostsPage from "../applicants/pages/jobs-posts.page.vue";
import ApplicatProfilePage from "../applicants/pages/applicat-profile.page.vue";
import ApplicationsPage from "../applications/pages/applications.page.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
      // Authentication
      { path: '/login', name: 'Log In', component: LoginComponent, meta: { requiresAuth: false }},
      { path: '/register', name: 'Register', component: RegisterComponent, meta: { requiresAuth: false } },
      { path: '/forgot-password', name: 'Forgot Password', component: PasswordForgotComponent, meta: { requiresAuth: false } },
      { path: '/recover-password', name: 'Recover Password', component: PasswordRecoveryComponent, meta: { requiresAuth: false } },
      // User profile edit and settings
      { path: '/manage-profile', name: 'User-Profile', component: ProfileManagement, meta: { requiresAuth: true } },
      { path: '/settings', name: 'Settings', component: SettingsComponent, meta: { requiresAuth: true } },

      // Applicants
      { path: '/jobs', name: 'Job posts', component: JobsPostsPage, meta: { requiresAuth: true, requiresCandidate: true } },
      { path: '/profile', name: 'Applicant Profile', component: ApplicatProfilePage, meta: { requiresAuth: true, requiresCandidate: true } },
      { path: '/applications', name: 'Candidate Applications', component:ApplicationsPage , meta: { requiresAuth: true, requiresCandidate: true } },

      // Recruiters


      // Support
      { path: '/:pathMatch(.*)*', name: 'Error 404', component: PageNotFoundComponent, meta: { requiresAuth: true } },
      { path: '/', redirect: '/home'},
  ]
});

router.beforeEach((to, from, next) => {
    const userStore = useUserStore();

    // if user is not auth and wants to access auth required route, redirect to sign in
    if (to.meta.requiresAuth && !userStore.isAuthenticated) {
        next('/login');
    // if user is auth and wants to access auth required route, redirect to home
    } else if (!to.meta.requiresAuth && userStore.isAuthenticated) {
        next('/');
    }
    // if user is trying to access the root path, redirect based on role
    else if (to.path === '/home') {
        if (userStore.role === 'ROLE_APPLICANT') {
            next('/jobs');
        }
        else {
            next('/home');
        }
    }
    next();
})

export default router;