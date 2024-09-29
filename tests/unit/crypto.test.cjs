'use strict';

const assert = require('assert');
const {
  cryptoRandom,
  generateUUID,
  generateKey,
  crcToken,
  generateToken,
  validateToken,
  serializeHash,
  deserializeHash,
  hashPassword,
  validatePassword,
  md5,
} = require('./crypto.cjs');

const { test } = require('node:test');

test('cryptoRandom should return a number between 0 and 1', () => {
  const randomValue = cryptoRandom();
  assert(randomValue >= 0 && randomValue < 1);
});

test('generateUUID should return a valid UUID', () => {
  const uuid = generateUUID();
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
  assert(uuidRegex.test(uuid));
});

test('generateKey should return a key of the specified length', () => {
  const length = 10;
  const key = generateKey(length, 'abc');
  assert.strictEqual(key.length, length);
});

test('crcToken should return a valid CRC token', () => {
  const secret = 'secret';
  const key = 'key';
  const crc = crcToken(secret, key);
  assert.strictEqual(crc.length, 4);
});

test('generateToken should return a valid token', () => {
  const secret = 'secret';
  const characters = 'abc';
  const length = 10;
  const token = generateToken(secret, characters, length);
  assert.strictEqual(token.length, length);
});

test('validateToken should return true for a valid token', () => {
  const secret = 'secret';
  const characters = 'abc';
  const length = 10;
  const token = generateToken(secret, characters, length);
  const isValid = validateToken(secret, token);
  assert.strictEqual(isValid, true);
});

test('serializeHash should return a serialized hash', () => {
  const hash = Buffer.from('hash');
  const salt = Buffer.from('salt');
  const serialized = serializeHash(hash, salt);
  assert(serialized.includes('scrypt'));
});

test('deserializeHash should return the correct hash and salt', () => {
  const hash = Buffer.from('hash');
  const salt = Buffer.from('salt');
  const serialized = serializeHash(hash, salt);
  const {
    params,
    salt: deserializedSalt,
    hash: deserializedHash,
  } = deserializeHash(serialized);
  assert.deepStrictEqual(deserializedSalt, salt);
  assert.deepStrictEqual(deserializedHash, hash);
});

test('hashPassword should return a hashed password', async () => {
  const password = 'password';
  const hashedPassword = await hashPassword(password);
  assert(hashedPassword.includes('scrypt'));
});

test('validatePassword should return true for a valid password', async () => {
  const password = 'password';
  const hashedPassword = await hashPassword(password);
  const isValid = await validatePassword(password, hashedPassword);
  assert.strictEqual(isValid, true);
});

test('md5 should return a valid MD5 hash', async () => {
  const filePath = __filename; // Use the current file for testing
  const hash = await md5(filePath);
  const md5Regex = /^[0-9a-f]{32}$/;
  assert(md5Regex.test(hash));
});
