import { test, expect } from '@playwright/test';

const caseStudies = ['/work/magic-move/', '/work/hello-design-system/', '/work/vantage/'];

for (const path of caseStudies) {
  test(`${path}: every table-of-contents link has a target`, async ({ page }) => {
    await page.goto(path);
    const ids = await page
      .locator('[data-toc] .toc-list a')
      .evaluateAll((links) => links.map((a) => a.getAttribute('href')!.slice(1)));
    expect(ids.length).toBeGreaterThan(0);
    for (const id of ids) await expect(page.locator(`#${id}`)).toHaveCount(1);
  });
}

test('home links every project card and spotlight to its case study', async ({ page }) => {
  await page.goto('/');
  for (const path of caseStudies) {
    await expect(page.locator(`a[href="${path}"]`)).toHaveCount(2);
  }
});

test('gallery next button advances the count', async ({ page }) => {
  await page.goto('/work/magic-move/');
  // First gallery that has controls (more than one item)
  const gallery = page.locator('[data-gallery]:has([data-count])').first();
  await gallery.scrollIntoViewIfNeeded();
  await expect(gallery.locator('[data-count]')).toHaveText('1 of 2');
  await gallery.getByRole('button', { name: 'Next image' }).click();
  await expect(gallery.locator('[data-count]')).toHaveText('2 of 2');
  await expect(gallery.getByRole('button', { name: 'Previous image' })).toBeEnabled();
});

test('compact table of contents sticks and jumps on small screens', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 700 });
  await page.goto('/work/magic-move/');
  const summary = page.getByText('On this page', { exact: true });
  await expect(summary).toBeVisible();
  await page.mouse.wheel(0, 2000);
  await expect(summary).toBeInViewport();
  await summary.click();
  await page.locator('.toc-compact').getByRole('link', { name: 'Delivery' }).click();
  await expect(page.locator('#section-delivery')).toBeInViewport();
});

test('work cards fill the column on phones', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/');
  const card = page.locator('.work-grid article').first();
  const box = await card.boundingBox();
  // 375 minus two 16px gutters
  expect(box!.width).toBeGreaterThan(330);
});

test('cards in a gallery are all the same size', async ({ page }) => {
  await page.goto('/work/magic-move/');
  for (const gallery of await page.locator('[data-gallery]').all()) {
    const boxes = await gallery
      .locator('[data-item] .media')
      .evaluateAll((els) =>
        els
          .map((e) => e.getBoundingClientRect())
          .map((r) => [Math.round(r.width), Math.round(r.height)]),
      );
    for (const b of boxes) expect(b).toEqual(boxes[0]);
  }
});
