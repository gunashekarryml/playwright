import { test, expect } from '@playwright/test';
import { login } from './helpers/login';

test('wrong password shows an error', async ({ page }) => {
  await login(page, 'standard_user', 'wrong');
  await expect(page.locator('[data-test="error"]')).toContainText('do not match');
});

test('locked out user cannot log in', async ({ page }) => {
  await login(page, 'locked_out_user');
  await expect(page.locator('[data-test="error"]')).toContainText('locked out');
});
