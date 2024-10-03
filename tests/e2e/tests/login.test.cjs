'use strict';

const { test, expect } = require('@playwright/test');
const PageManager = require('../../utils/pageManager.cjs');
const LoginPage = require('../pages/loginPage.cjs');
const DashboardPage = require('../pages/dashboardPage.cjs');

test.describe('Login Tests', () => {
  test('should login successfully', async ({ page }) => {
    const pageManager = new PageManager(page);
    const loginPage = new LoginPage(pageManager);
    const dashboardPage = new DashboardPage(pageManager);

    await loginPage.navigate().login('your-username', 'your-password');

    const isLoginSuccessful = await loginPage.isLoginSuccessful();
    expect(isLoginSuccessful).toBe(true);

    const welcomeMessage = await dashboardPage.getWelcomeMessage();
    expect(welcomeMessage).toContain('Welcome');
  });
});
