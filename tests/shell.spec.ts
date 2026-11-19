import { test, expect } from '@playwright/test';

test('nav marks the current page', async ({ page }) => {
  await page.goto('/about/');
  const nav = page.getByRole('navigation', { name: 'Primary' });
  await expect(nav.getByRole('link', { name: 'About' })).toHaveAttribute('aria-current', 'page');
  await expect(nav.getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current');
});

test('nav links are at least 44px tall', async ({ page }) => {
  await page.goto('/');
  const links = page.getByRole('navigation', { name: 'Primary' }).getByRole('link');
  for (const link of await links.all()) {
    const box = await link.boundingBox();
    expect(box!.height).toBeGreaterThanOrEqual(44);
  }
});

test('theme toggle works by keyboard and persists', async ({ page }) => {
  await page.addInitScript(() => {
    if (!sessionStorage.getItem('seeded')) {
      localStorage.setItem('theme', 'light');
      sessionStorage.setItem('seeded', '1');
    }
  });
  await page.goto('/');
  const toggle = page.getByRole('switch', { name: 'Dark theme' });
  await expect(toggle).toHaveAttribute('aria-checked', 'false');

  await toggle.focus();
  await page.keyboard.press('Space');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(toggle).toHaveAttribute('aria-checked', 'true');
  await expect(toggle).toBeFocused();

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(toggle).toHaveAttribute('aria-checked', 'true');

  await page.keyboard.press('Tab');
  await toggle.focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('theme toggle works with a mouse click and is at least 44px', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('theme', 'light'));
  await page.goto('/');
  const toggle = page.getByRole('switch', { name: 'Dark theme' });
  const box = await toggle.boundingBox();
  expect(box!.height).toBeGreaterThanOrEqual(44);
  await toggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await toggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('header fits at 320px without horizontal scroll', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto('/');
  await expect(page.getByRole('switch', { name: 'Dark theme' })).toBeVisible();
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

test('header stays visible while scrolling', async ({ page }) => {
  await page.goto('/work/magic-move/');
  const header = page.locator('[data-site-header]');
  await expect(header).not.toHaveAttribute('data-scrolled');
  await page.mouse.wheel(0, 1500);
  await expect(header).toHaveAttribute('data-scrolled', '');
  const box = await header.boundingBox();
  expect(box!.y).toBe(0);
  await expect(page.getByRole('navigation', { name: 'Primary' })).toBeInViewport();
});

test('anchored sections land below the sticky header', async ({ page }) => {
  await page.goto('/work/magic-move/#section-delivery');
  const header = await page.locator('[data-site-header]').boundingBox();
  const heading = await page.getByRole('heading', { name: 'Delivery' }).boundingBox();
  expect(heading!.y).toBeGreaterThanOrEqual(header!.height);
});
