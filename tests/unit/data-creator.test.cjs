'use strict';

const assert = require('assert');
const {
  randomDate,
  randomUsername,
  randomEmail,
  randomPassword,
  randomString,
  randomStringWithPrefix,
} = require('../../utils/data-creator.cjs');

const { test } = require('node:test');

test('randomDate should return a date in ISO format by default', () => {
  const date = randomDate();
  assert.match(date, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/);
});

test('randomDate should return a date in UTC format when specified', () => {
  const date = randomDate(new Date(), new Date(), 'utc');
  assert.match(date, /^\w{3}, \d{2} \w{3} \d{4} \d{2}:\d{2}:\d{2} GMT$/);
});

test('randomUsername should return a username of the specified length', () => {
  const length = 10;
  const username = randomUsername(length);
  assert.strictEqual(username.length, length);
});

test('randomEmail should return a valid email address', () => {
  const email = randomEmail();
  assert.match(email, /^[a-z]+@[a-z]+\.com$/);
});

test('randomPassword should return a password of the specified length', () => {
  const length = 12;
  const password = randomPassword(length);
  assert.strictEqual(password.length, length);
});

test('randomString should return a string of the specified length', () => {
  const length = 20;
  const str = randomString(length);
  assert.strictEqual(str.length, length);
});

test('randomStringWithPrefix should return a string with the specified prefix', () => {
  const prefix = 'prefix-';
  const length = 20;
  const str = randomStringWithPrefix(prefix, undefined, length);
  assert(str.startsWith(prefix));
  assert.strictEqual(str.length, length);
});
