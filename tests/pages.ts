// Every route the site ships. Add new pages here so axe and smoke tests cover them.
export const pages = [
  '/',
  '/work/tap-to-launch/',
  '/work/hello-design-system/',
  '/work/vantage/',
  '/about/',
  '/resume/',
  '/contact/',
  '/404.html',
] as const;

// 'contrast' is paused; add it back here when the high-contrast theme returns.
export const themes = ['light', 'dark'] as const;
