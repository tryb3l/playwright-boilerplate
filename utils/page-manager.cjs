'use strict';

class PageManager {
  constructor(page) {
    this.page = page;
  }

  async navigateTo(url) {
    await this.page.goto(url);
    return this;
  }

  async getPageTitle() {
    return await this.page.title();
  }

  async takeScreenshot(path) {
    await this.page.screenshot({ path });
    return this;
  }

  async waitForSelector(selector) {
    await this.page.waitForSelector(selector);
    return this;
  }

  async click(selector) {
    await this.page.click(selector);
    return this;
  }

  async fill(selector, value) {
    await this.page.fill(selector, value);
    return this;
  }

  async getText(selector) {
    return await this.page.textContent(selector);
  }

  async isVisible(selector) {
    return await this.page.isVisible(selector);
  }

  async isEnabled(selector) {
    return await this.page.isEnabled(selector);
  }

  async getAttribute(selector, attribute) {
    return await this.page.getAttribute(selector, attribute);
  }

  async close() {
    await this.page.close();
    return this;
  }
}

module.exports = PageManager;
