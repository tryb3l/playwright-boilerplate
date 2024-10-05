'use strict';

const { Locator, Page } = require('@playwright/test');
const BasePage = require('../pages/base.page.cjs');

/**
 * Represents a base component that extends the BasePage class.
 */
class BaseComponent extends BasePage {
  /**
   * @param {Page} page - The Playwright Page object
   * @param {Locator} locator - The Playwright Locator object
   */
  constructor(page, locator) {
    super(page);
    this.locator = locator;
  }

  /**
   * Checks if the component is visible.
   * @param {boolean} [expectedResult=true] - The expected visibility state.
   * @param {number} [timeout=5000] - The timeout in milliseconds.
   * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating visibility.
   */
  async isVisible(expectedResult = true, timeout = 5000) {
    const element = this.locator;

    // Try-catch block to avoid throwing an exception if waitFor doesn't succeed
    try {
      if (expectedResult) {
        await element.waitFor({ state: 'visible', timeout });
      } else {
        await element.waitFor({ state: 'hidden', timeout });
      }
    } catch (err) {
      // Handle the error if needed
    }
    return await element.isVisible();
  }

  /**
   * Checks if the component is enabled.
   * @param {boolean} [expectedResult=true] - The expected enabled state.
   * @param {number} [timeout=5000] - The timeout in milliseconds.
   * @returns {Promise<boolean>} - A promise that resolves to a boolean indicating if the component is enabled.
   */
  async isEnabled(expectedResult = true, timeout = 5000) {
    const element = this.locator;

    // Try-catch block to avoid throwing an exception if waitFor doesn't succeed
    try {
      if (expectedResult) {
        await element.waitFor({ state: 'enabled', timeout });
      } else {
        await element.waitFor({ state: 'disabled', timeout });
      }
    } catch (err) {
      // Handle the error if needed
    }
    return await element.isEnabled();
  }

  // TODO: Add more component-specific methods here
}

module.exports = BaseComponent;
