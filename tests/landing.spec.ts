import { test, expect } from '@playwright/test';

test('landing page has a welcome message', async ({ page }) => {
  await page.goto('/landing');
  await expect(page.locator('h2')).toContainText('Converse com a versão mais clara de você mesmo.');
});
