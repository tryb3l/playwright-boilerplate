"use strict";

const {
  commonSettings,
  apiSettings,
  e2eSettings,
} = require("./global.config.cjs");

const PlaywrightTestConfig = {
  globalSetup: require.resolve("./global-setup.cjs"),
  globalTeardown: require.resolve("./global-teardown.cjs"),
  use: commonSettings,
  projects: [
    {
      name: "API Tests",
      testDir: "tests/api",
      use: apiSettings,
    },
    {
      name: "E2E Tests - Chromium",
      testDir: "tests/e2e",
      use: e2eSettings.chromium,
    },
    {
      name: "E2E Tests - WebKit",
      testDir: "tests/e2e",
      use: e2eSettings.webkit,
    },
    {
      name: "E2E Tests - Firefox",
      testDir: "tests/e2e",
      use: e2eSettings.firefox,
    },
  ],
};

module.exports = PlaywrightTestConfig;
