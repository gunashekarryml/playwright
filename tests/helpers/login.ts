import { Page } from '@playwright/test';

export async function login(page: Page, user = 'standard_user', password = 'secret_sauce') {
  await page.route('**/*.{png,jpg,jpeg,svg,woff,woff2}', (r) => r.abort());
  await page.goto('/');
  await page.fill('#user-name', user);
  await page.fill('#password', password);
  await page.click('#login-button');
}
