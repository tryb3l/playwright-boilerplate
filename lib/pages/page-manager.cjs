'use strict';

const { Page } = require('@playwright/test');
const BasePage = require('./base.page.cjs');

/**
 * Manages page objects and caches them for reuse.
 */
class PageManager {
  /**
   * @param {Page} page - The Playwright Page object
   */
  constructor(page) {
    this._page = page;
    this._cache = new Map();
  }

  /**
   * Retrieves a page object, initializing it if not already cached.
   * @template T
   * @param {new (page: Page) => T} pageObjectType - The page object class to retrieve.
   * @returns {Promise<T>} - The initialized page object.
   */
  async get(pageObjectType) {
    if (!this._cache.has(pageObjectType.name)) {
      this._cache.set(pageObjectType.name, new pageObjectType(this._page));
    }
    await this._cache.get(pageObjectType.name).onInit();
    return this._cache.get(pageObjectType.name);
  }
}

module.exports = PageManager;