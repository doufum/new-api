import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeManagementLogoPath } from './src/helpers/brand.js';

test('classic 管理端 logo 路径会映射到 /management', () => {
  assert.equal(normalizeManagementLogoPath(), '/management/logo.png');
  assert.equal(
    normalizeManagementLogoPath('/logo.png'),
    '/management/logo.png',
  );
  assert.equal(
    normalizeManagementLogoPath('https://example.com/logo.png'),
    'https://example.com/logo.png',
  );
  assert.equal(
    normalizeManagementLogoPath('/uploads/logo.png'),
    '/uploads/logo.png',
  );
});
