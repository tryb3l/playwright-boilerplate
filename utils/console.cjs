'use strict';

const { ConsoleMessage, Page } = require('@playwright/test');

/**
 * Helper class to record console messages from a Playwright page.
 */
class ConsoleHelper {
  /**
   * Initializes a new instance of the ConsoleHelper.
   * @param {Page} page - The Playwright page object.
   */
  constructor(page) {
    this.page = page;
    this.recordingOn = false;
    this.recordedLogs = [];
    this.consoleMessageHandler = (consoleMessage) => {
      this.recordedLogs.push(consoleMessage);
    };
  }

  /**
   * Starts recording console messages.
   */
  startRecording() {
    if (this.recordingOn) {
      throw new Error('Recording is already started');
    }
    this.recordedLogs = [];
    this.recordingOn = true;
    this.page.on('console', this.consoleMessageHandler);
  }

  /**
   * Stops recording console messages and returns the recorded logs.
   * @returns {ConsoleMessage[]} An array of recorded console messages.
   */
  stopRecording() {
    if (!this.recordingOn) {
      throw new Error('Recording is not started');
    }
    this.page.removeListener('console', this.consoleMessageHandler);
    this.recordingOn = false;
    return this.recordedLogs;
  }
}

module.exports = ConsoleHelper;
