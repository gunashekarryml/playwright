import { test, expect } from '@playwright/test';
import { login } from './helpers/login';

test('remove an item from the cart', async ({ page }) => {
  await login(page);
  await page.click('#add-to-cart-sauce-labs-backpack');
  await page.click('#add-to-cart-sauce-labs-bike-light');
  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

  await page.click('.shopping_cart_link');
  await page.click('#remove-sauce-labs-backpack');
  await expect(page.locator('.cart_item')).toHaveCount(1);
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});
