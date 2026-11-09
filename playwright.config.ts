import { defineConfig, devices } from '@playwright/test';

// Tests run against the production build (`astro preview`), not the dev server.
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://localhost:4329',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: 'npm run preview -- --port 4329 --ignore-lock',
    url: 'http://localhost:4329',
    reuseExistingServer: !process.env.CI,
  },
});
