import { test, expect } from '@playwright/test';

const caseStudies = ['/work/tap-to-launch/', '/work/hello-design-system/', '/work/vantage/'];

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

test('home spotlights link to the case study', async ({ page }) => {
  await page.goto('/');
  for (const path of caseStudies) {
    const id = path.split('/')[2];
    const spotlight = page.locator(`#project-${id}`);
    // One named link for assistive tech; the images link to the same page but stay hidden
    await expect(spotlight.getByRole('link', { name: /View case study/ })).toHaveAttribute(
      'href',
      path,
    );
    await expect(spotlight.getByRole('link')).toHaveCount(1);
    const shots = spotlight.locator('a.shot');
    await expect(shots.first()).toHaveAttribute('href', path);
    for (const shot of await shots.all()) await expect(shot).toHaveAttribute('href', path);
  }
});

test('gallery next button advances the count', async ({ page }) => {
  await page.goto('/work/tap-to-launch/');
  // First gallery that has controls (more than one item)
  const gallery = page.locator('[data-gallery]:has([data-count])').first();
  await gallery.scrollIntoViewIfNeeded();
  const count = gallery.locator('[data-count]');
  await expect(count).toHaveText(/^1 of \d+$/);
  const total = (await count.textContent())!.split(' of ')[1];
  await gallery.getByRole('button', { name: 'Next image' }).click();
  await expect(count).toHaveText(`2 of ${total}`);
  await expect(gallery.getByRole('button', { name: 'Previous image' })).toBeEnabled();
});

test('compact table of contents sticks and jumps on small screens', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 700 });
  await page.goto('/work/tap-to-launch/');
  const summary = page.getByText('On this page', { exact: true });
  await expect(summary).toBeVisible();
  await page.mouse.wheel(0, 2000);
  await expect(summary).toBeInViewport();
  await summary.click();
  await page.locator('.toc-compact').getByRole('link', { name: 'Delivery' }).click();
  await expect(page.locator('#section-delivery')).toBeInViewport();
});

test('cards in a gallery are all the same size', async ({ page }) => {
  await page.goto('/work/tap-to-launch/');
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

test('Magic Move lists its key user experiences in the process section', async ({ page }) => {
  await page.goto('/work/tap-to-launch/');
  const block = page.getByRole('region', { name: 'Key user experiences' });
  await expect(block.getByRole('listitem')).toHaveCount(3);
  await expect(
    page.locator('#section-overview').getByRole('region', { name: 'Key user experiences' }),
  ).toHaveCount(0);
  await expect(block.getByRole('heading', { name: 'Tap to Launch' })).toBeVisible();
});
