'use strict';

const { Page, Request, Response } = require('@playwright/test');

/**
 * NetworkInterceptor class to capture network requests and responses.
 */
class NetworkInterceptor {
  /**
   * Creates an instance of NetworkInterceptor.
   * @param {Page} page - The Playwright page object.
   */
  constructor(page) {
    this.page = page;
    this.interceptorOn = false;
    this.interceptedRequests = { requests: [], responses: [] };

    // Bind the handlers to maintain the correct 'this' context.
    this.requestHandler = this.requestHandler.bind(this);
    this.responseHandler = this.responseHandler.bind(this);
  }

  /**
   * Handles intercepted requests.
   * @param {Request} request - The intercepted request.
   */
  requestHandler(request) {
    this.interceptedRequests.requests.push(request);
  }

  /**
   * Handles intercepted responses.
   * @param {Response} response - The intercepted response.
   */
  responseHandler(response) {
    this.interceptedRequests.responses.push(response);
  }

  /**
   * Starts intercepting network requests and responses.
   */
  startIntercepting() {
    if (this.interceptorOn) {
      throw new Error('Interceptor is already started');
    }
    this.interceptedRequests = { requests: [], responses: [] };
    this.interceptorOn = true;
    this.page.on('request', this.requestHandler);
    this.page.on('response', this.responseHandler);
  }

  /**
   * Stops intercepting and returns the intercepted requests and responses.
   * @returns {{requests: Request[], responses: Response[]}} The intercepted data.
   */
  stopIntercepting() {
    if (!this.interceptorOn) {
      throw new Error('Interceptor is not started');
    }
    this.page.removeListener('request', this.requestHandler);
    this.page.removeListener('response', this.responseHandler);
    this.interceptorOn = false;
    return this.interceptedRequests;
  }
}

module.exports = NetworkInterceptor;
