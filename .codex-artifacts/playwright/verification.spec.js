const { test, expect } = require('@playwright/test');

test.describe('mobile verification', () => {
  test('home exposes a working mobile navigation shell', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('http://localhost:9002/', {
      waitUntil: 'networkidle',
      timeout: 60000,
    });

    const trigger = page.getByRole('button', { name: 'Toggle Sidebar' });
    await expect(trigger).toBeVisible();
    await page.screenshot({
      path: '.codex-artifacts/after/home-mobile.png',
      fullPage: true,
    });

    await trigger.click();
    await expect(
      page.getByRole('dialog').getByRole('link', { name: 'Executive Overview' }),
    ).toBeVisible();
    await page.screenshot({
      path: '.codex-artifacts/after/home-mobile-menu.png',
    });
  });

  test('explorer uses card-based mobile rows and opens detail', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('http://localhost:9002/explorer', {
      waitUntil: 'networkidle',
      timeout: 60000,
    });

    await page.getByRole('textbox', {
      name: 'Search by Project ID, Customer, or Region…',
    }).fill('PRJ-016');

    const firstCard = page.getByRole('button', {
      name: /Open MoI Regional Secure VPN details/,
    });
    await expect(firstCard).toBeVisible();
    await page.screenshot({
      path: '.codex-artifacts/after/explorer-mobile.png',
      fullPage: true,
    });

    await firstCard.click();
    await expect(page).toHaveURL(/focus=PRJ-016/);
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.screenshot({
      path: '.codex-artifacts/after/explorer-mobile-detail.png',
    });
  });
});
