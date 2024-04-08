import { defineStore } from 'pinia'

export const useThemeStore = defineStore({
  id: 'theme',
  state: () => ({
    theme: 'light',
  }),
  getters: {
    colorTheme() {
      return this.theme === 'light' ? 'dark' : 'light';
    },
  },
  actions: {
    setTheme(theme) {
      // Tailwind
      const root = window.document.documentElement;
      root.classList.remove(this.colorTheme);
      root.classList.add(theme);
      this.theme = theme;

      // Primevue theme
      const themeLink = document.getElementById('theme-link');
      themeLink.href = `/themes/viva-${theme}/theme.css`;
      localStorage.setItem('theme', theme);

      // Update the theme in the store's state
      this.theme = theme;
    },
    initTheme() {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        this.setTheme(savedTheme);
      }
    },
  },
});