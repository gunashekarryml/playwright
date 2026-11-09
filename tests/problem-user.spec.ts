import { test, expect } from '@playwright/test';
import { login } from './helpers/login';

test('problem_user can log in and sees the full catalogue', async ({ page }) => {
  await login(page, 'problem_user');
  await expect(page.locator('.inventory_item')).toHaveCount(6);
});

test('problem_user: first name field loses input at checkout (known bug)', async ({ page }) => {
  await login(page, 'problem_user');
  await page.click('.shopping_cart_link');
  await page.click('#checkout');
  await page.fill('#first-name', 'Test');
  await page.fill('#last-name', 'User');
  // SauceDemo's problem_user writes the typed value into the wrong field
  await expect(page.locator('#first-name')).not.toHaveValue('Test');
});
