import { test, expect } from '@playwright/test';

test.describe('App', () => {
  test('should display the welcome heading', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Welcome to Angular 21');
  });

  test('should have the correct page title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/MyAngularStarterBoilerplate/);
  });
});
