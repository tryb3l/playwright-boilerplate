"use strict";

const { PlaywrightTestConfig } = require("@playwright/test");

const PlaywrightTestConfig = {
  use: {
    baseURL: "https://example.com",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "Chromium",
      use: { browserName: "chromium" },
    },
    {
      name: "WebKit",
      use: { browserName: "webkit" },
    },
    {
      name: "Firefox",
      use: { browserName: "firefox" },
    },
  ],
};

module.exports = PlaywrightTestConfig;
