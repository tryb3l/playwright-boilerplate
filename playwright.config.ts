import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  //Directory where your tests are located
  testDir: "./tests",
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
};
