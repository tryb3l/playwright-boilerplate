'use strict';

class LoginPage {
  constructor(pageManager) {
    this.pageManager = pageManager;
  }

  async navigate() {
    await this.pageManager.navigateTo('https://example.com/login');
    return this;
  }

  async login(username, password) {
    await this.pageManager
      .fill('#username', username)
      .fill('#password', password)
      .click('button[type="submit"]');
    return this;
  }

  async isLoginSuccessful() {
    return await this.pageManager.isVisible('#logout');
  }
}

module.exports = LoginPage;
