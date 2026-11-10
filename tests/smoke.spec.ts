import { test, expect } from '@playwright/test';
import { pages } from './pages';

for (const path of pages) {
  test(`${path} has one h1, a main landmark and a working skip link`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('main#main')).toHaveCount(1);
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Skip to content' });
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();
  });

  test(`${path} has no horizontal scroll at 320px`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 });
    await page.goto(path);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

test('theme follows prefers-color-scheme when nothing is saved', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('theme follows prefers-contrast: more before colour scheme', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark', contrast: 'more' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'contrast');
});

test('a saved theme wins over system preferences', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('theme', 'light'));
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});
