import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const page_ = '/work/magic-move/';

test('clicking an image card opens the full-screen viewer', async ({ page }) => {
  await page.goto(page_);
  const card = page.locator('[data-lightbox]').first();
  await card.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('[data-image]')).toHaveAttribute('src', /\.webp/);
  await expect(dialog.getByRole('button', { name: 'Close' })).toBeFocused();
  const box = await dialog.boundingBox();
  const vp = page.viewportSize()!;
  expect(box!.width).toBe(vp.width);
  expect(box!.height).toBe(vp.height);
});

test('viewer works by keyboard and returns focus on Escape', async ({ page }) => {
  await page.goto(page_);
  const card = page.locator('[data-lightbox]').nth(1);
  await card.focus();
  await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  const count = dialog.locator('[data-count]');
  const first = await count.textContent();
  await page.keyboard.press('ArrowRight');
  await expect(count).not.toHaveText(first!);
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
  await expect(card).toBeFocused();
});

test('actual size toggle switches the image to natural size', async ({ page }) => {
  await page.goto(page_);
  await page.locator('[data-lightbox]').first().click();
  const dialog = page.getByRole('dialog');
  const zoom = dialog.getByRole('button', { name: 'Actual size' });
  await zoom.click();
  await expect(dialog.getByRole('button', { name: 'Fit to screen' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
});

test('hover shows the short label tooltip; Escape hides it', async ({ page, isMobile }) => {
  test.skip(isMobile, 'hover only');
  await page.goto(page_);
  const card = page.locator('[data-lightbox]').first();
  await card.scrollIntoViewIfNeeded();
  await card.hover();
  const tip = card.locator('.tip');
  await expect(tip).toHaveCSS('opacity', '1');
  await page.keyboard.press('Escape');
  await expect(tip).toHaveCSS('opacity', '0');
});

test('viewer has no axe violations when open', async ({ page }) => {
  await page.goto(page_);
  await page.locator('[data-lightbox]').first().click();
  await expect(page.getByRole('dialog')).toBeVisible();
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});

test('image cards fill edge to edge', async ({ page }) => {
  await page.goto(page_);
  const card = page.locator('[data-lightbox]').first();
  const img = card.locator('img');
  const [c, i] = [await card.boundingBox(), await img.boundingBox()];
  // 1px border on each side
  expect(Math.abs(c!.width - i!.width)).toBeLessThanOrEqual(2);
  expect(Math.abs(c!.height - i!.height)).toBeLessThanOrEqual(2);
});
