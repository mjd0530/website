// Prints the built /resume/ page to public/mike-demar-resume.pdf using its print styles.
// Run after `npm run build`: `npm run resume:pdf`, then rebuild so dist/ picks up the new PDF.
// Uses Playwright's Chromium, already a dev dependency for the test suite.
import { spawn } from 'node:child_process';
import { chromium } from '@playwright/test';

const port = 4330;
const url = `http://localhost:${port}/resume/`;
const out = new URL('../public/mike-demar-resume.pdf', import.meta.url);

const server = spawn('npx', ['astro', 'preview', '--port', String(port), '--ignore-lock'], {
  stdio: 'ignore',
});

async function waitFor(target, tries = 60) {
  for (let i = 0; i < tries; i++) {
    try {
      if ((await fetch(target)).ok) return;
    } catch {
      // Server not up yet.
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Preview server did not start at ${target}`);
}

try {
  await waitFor(url);
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.emulateMedia({ media: 'print', colorScheme: 'light' });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => globalThis.document.fonts.ready);
  await page.pdf({
    path: out.pathname,
    format: 'Letter',
    preferCSSPageSize: true,
    printBackground: false,
  });
  await browser.close();
  console.log(`Wrote ${out.pathname}`);
} finally {
  server.kill();
}
