"use strict";

const base = require("@playwright/test").test;

const test = base.extend({
  authenticatedRequest: async ({ request }, use) => {
    const response = await request.post("/auth/login", {
      data: {
        username: "your-username",
        password: "your-password",
      },
    });

    const token = (await response.json()).token;

    const authenticatedRequest = request.newContext({
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    await use(authenticatedRequest);
  },

  // TODO consider add more fixtures here
});

module.exports = { test };
