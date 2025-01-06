export class ThemeManager {
  constructor() {
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
    this.init();
  }

  init() {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode);
    document.documentElement.classList.toggle('dark');
  }
}