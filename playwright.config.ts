import { PlaywrightTestConfig } from "@playwright/test";

export const baseURL = "https://reqres.in/api";

const config: PlaywrightTestConfig = {
  //Directory where your tests are located
  testDir: "tests/",
  // Time for each of your test to run from start to finish (60 seconds), increase if needed
  timeout: 60 * 1000,
  //It will fail your tests on CI if you have tests.only() or describe.only() in your tests
  forbidOnly: !!process.env.CI,
  // Option for your CI to retry.
  retries: process.env.CI ? 2 : 0,
  expect: {
    // Time for your expect() assertion to run and find desired condition (30 seconds)
    //
    timeout: 30 * 1000,
  },
  //It will let all your tests run in parallel
  fullyParallel: true,
  // Here you can choose which reporter to use
  // TODO: describe more reporter options
  reporter: "html",
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10 * 1000,
    ignoreHTTPSErrors: true,
    video: "retain-on-failure",
    screenshot: "off",
  },
  // Here you can specify which browsers you want to run your tests on
  projects: [
    {
      name: "Chromium",
      use: {
        browserName: "chromium",
        headless: true,
      },
    },
    {
      name: "Firefox",
      use: {
        browserName: "firefox",
        headless: true,
      },
    },
    {
      name: "WebKit",
      use: {
        browserName: "webkit",
        headless: true,
      },
    },
  ],
};

export default config;
