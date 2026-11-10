// Every route the site ships. Add new pages here so axe and smoke tests cover them.
export const pages = [
  '/',
  '/work/magic-move/',
  '/work/hello-design-system/',
  '/work/vantage/',
  '/about/',
  '/resume/',
  '/contact/',
  '/404.html',
] as const;

export const themes = ['light', 'dark', 'contrast'] as const;
