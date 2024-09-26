"use strict";

const { devices } = require("@playwright/test");

const commonSettings = {
  baseURL: "https://example.com",
  screenshot: "only-on-failure",
  video: "retain-on-failure",
  trace: "on-first-retry",
  storageState: "playwright/.auth/state.json", // Use the saved authentication state
};

const apiSettings = {
  baseURL: "https://api.example.com",
  extraHTTPHeaders: {
    // Add any headers required for API tests
    "Content-Type": "application/json",
  },
  storageState: "playwright/.auth/state.json", // Use the saved authentication state
};

const e2eSettings = {
  chromium: {
    browserName: "chromium",
    ...devices["Desktop Chrome"],
  },
  webkit: {
    browserName: "webkit",
    ...devices["Desktop Safari"],
  },
  firefox: {
    browserName: "firefox",
    ...devices["Desktop Firefox"],
  },
};

module.exports = {
  commonSettings,
  apiSettings,
  e2eSettings,
};
