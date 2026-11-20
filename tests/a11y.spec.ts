import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { pages, themes } from './pages';

for (const theme of themes) {
  for (const path of pages) {
    test(`axe: ${path} in ${theme} theme`, async ({ page }) => {
      await page.addInitScript((t) => localStorage.setItem('theme', t), theme);
      await page.goto(path);
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
        .analyze();
      expect(results.violations).toEqual([]);
    });
  }
}
