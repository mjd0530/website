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

test('theme switcher works by keyboard and persists', async ({ page }) => {
  await page.addInitScript(() => {
    if (!sessionStorage.getItem('seeded')) {
      localStorage.setItem('theme', 'light');
      sessionStorage.setItem('seeded', '1');
    }
  });
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Theme: Light' });
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');

  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  const group = page.getByRole('group', { name: 'Theme' });
  await expect(group.getByRole('radio', { name: 'Light' })).toBeFocused();

  await page.keyboard.press('ArrowDown');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.getByRole('button', { name: 'Theme: Dark' })).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(group).toBeHidden();
  await expect(page.getByRole('button', { name: 'Theme: Dark' })).toBeFocused();

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('theme panel closes on outside click', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /^Theme/ }).click();
  await expect(page.getByRole('group', { name: 'Theme' })).toBeVisible();
  await page.locator('main').click({ position: { x: 5, y: 5 } });
  await expect(page.getByRole('group', { name: 'Theme' })).toBeHidden();
});

test('header fits at 320px without horizontal scroll', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto('/');
  await page.getByRole('button', { name: /^Theme/ }).click();
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

test('theme switcher works with real mouse clicks on option labels', async ({ page }) => {
  await page.addInitScript(() => {
    if (!sessionStorage.getItem('seeded')) {
      localStorage.setItem('theme', 'light');
      sessionStorage.setItem('seeded', '1');
    }
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Theme: Light' }).click();
  const group = page.getByRole('group', { name: 'Theme' });
  // Click the visible label text, not the radio itself.
  await group.getByText('Dark', { exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await group.getByText('High contrast', { exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'contrast');
  await expect(group).toBeVisible();
});

test('theme panel closes when tabbing away', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /^Theme/ }).click();
  const group = page.getByRole('group', { name: 'Theme' });
  await expect(group).toBeVisible();
  // Focus is on the checked radio; Tab leaves the radio group and the switcher.
  await page.keyboard.press('Tab');
  await expect(group).toBeHidden();
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
