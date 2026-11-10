import { test, expect } from '@playwright/test';

const path = '/work/magic-move/';

test('case study video is first and does not autoplay', async ({ page }) => {
  await page.goto(path);
  const video = page.locator('[data-video] video');
  await expect(video).toHaveCount(1);
  await expect(video).not.toHaveAttribute('autoplay');
  await expect(video).toHaveAttribute('preload', 'none');
  // It sits in the header, before the first case-study section
  const order = await page.evaluate(() => {
    const v = document.querySelector('[data-video]')!;
    const s = document.querySelector('.cs-section')!;
    return v.compareDocumentPosition(s) & Node.DOCUMENT_POSITION_FOLLOWING;
  });
  expect(order).toBeTruthy();
  await page.waitForTimeout(1000);
  expect(await video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
  expect(await video.evaluate((v: HTMLVideoElement) => v.currentTime)).toBe(0);
});

test('play button starts the video and hands over to native controls', async ({ page }) => {
  await page.goto(path);
  const play = page.getByRole('button', { name: /Play video/ });
  await expect(play).toBeVisible();
  await play.click();
  const video = page.locator('[data-video] video');
  await expect(play).toBeHidden();
  await expect(video).toHaveJSProperty('controls', true);
  await expect
    .poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime))
    .toBeGreaterThan(0);
});

test('video has a text description', async ({ page }) => {
  await page.goto(path);
  const details = page.locator('[data-video] details');
  await details.getByText('Video description').click();
  await expect(details.locator('p')).toContainText('Smart Share');
});
