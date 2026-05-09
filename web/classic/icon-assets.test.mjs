import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const rootUrl = new URL('./', import.meta.url);

function readLocalFile(relativePath) {
  return readFileSync(new URL(relativePath, rootUrl), 'utf8');
}

test('classic 前端使用统一的 favicon 和图标资源', () => {
  const html = readLocalFile('index.html');

  assert.match(html, /href="\/management\/favicon\.ico"/);
  assert.match(html, /href="\/management\/icon-16x16\.png"/);
  assert.match(html, /href="\/management\/icon-32x32\.png"/);
  assert.match(html, /href="\/management\/icon-48x48\.png"/);
  assert.match(html, /href="\/management\/icon-128x128\.png"/);
  assert.match(html, /href="\/management\/icon-256x256\.png"/);
  assert.match(html, /href="\/management\/icon-512x512\.png"/);

  assert.equal(existsSync(new URL('public/icon-16x16.png', rootUrl)), true);
  assert.equal(existsSync(new URL('public/icon-32x32.png', rootUrl)), true);
  assert.equal(existsSync(new URL('public/icon-48x48.png', rootUrl)), true);
  assert.equal(existsSync(new URL('public/icon-128x128.png', rootUrl)), true);
  assert.equal(existsSync(new URL('public/icon-256x256.png', rootUrl)), true);
  assert.equal(existsSync(new URL('public/icon-512x512.png', rootUrl)), true);
});
