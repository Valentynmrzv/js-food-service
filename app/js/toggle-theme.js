const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};
const themeSwitchToggle = document.querySelector('#theme-switch-toggle');
const body = document.body;

const setTheme = (theme) => {
  body.classList.remove(Theme.LIGHT, Theme.DARK);
  body.classList.add(theme);
  localStorage.setItem('theme', theme);
  themeSwitchToggle.checked = theme === Theme.DARK;
};
themeSwitchToggle.addEventListener('change', () => {
  if (themeSwitchToggle.checked) {
    setTheme(Theme.DARK);
  } else {
    setTheme(Theme.LIGHT);
  }
});
const savedTheme = localStorage.getItem('theme');
if (savedTheme === Theme.DARK) {
  setTheme(Theme.DARK);
} else {
  setTheme(Theme.LIGHT);
};
