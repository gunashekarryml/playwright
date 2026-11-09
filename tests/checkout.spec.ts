import { test, expect } from '@playwright/test';

test('login, add to cart, checkout', async ({ page }) => {
  // Skip heavy assets for speed
  await page.route('**/*.{png,jpg,jpeg,svg,woff,woff2}', (r) => r.abort());

  await page.goto('/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  await page.click('#add-to-cart-sauce-labs-backpack');
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  await page.click('.shopping_cart_link');
  await page.click('#checkout');
  await page.fill('#first-name', 'Test');
  await page.fill('#last-name', 'User');
  await page.fill('#postal-code', '12345');
  await page.click('#continue');
  await page.click('#finish');

  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});
