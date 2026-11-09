import { test, expect } from '@playwright/test';
import { login } from './helpers/login';

const prices = async (page) =>
  (await page.locator('.inventory_item_price').allTextContents()).map((p) => Number(p.slice(1)));

test('sort by price low to high', async ({ page }) => {
  await login(page);
  await page.selectOption('.product_sort_container', 'lohi');
  const list = await prices(page);
  expect(list).toEqual([...list].sort((a, b) => a - b));
});

test('sort by name Z to A', async ({ page }) => {
  await login(page);
  await page.selectOption('.product_sort_container', 'za');
  const names = await page.locator('.inventory_item_name').allTextContents();
  expect(names).toEqual([...names].sort().reverse());
});
