import { test, expect } from '@playwright/test';

test('login page loads on desktop viewport', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'IICO' })).toBeVisible();
  await expect(page.getByLabel('Email')).toBeVisible();
  await expect(page.getByLabel('Contraseña')).toBeVisible();
});

test.describe('mobile viewport', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('login page loads on a mobile device', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'IICO' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Ingresar' })).toBeVisible();
  });
});
