const { test, expect } = require('@playwright/test');

test.describe('experience verification', () => {
  test('home exposes visible mobile navigation without relying on a hidden drawer trigger', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('http://localhost:9002/', {
      waitUntil: 'networkidle',
      timeout: 60000,
    });

    await expect(page.getByText('Quick Navigation')).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Delivery Control Tower' }),
    ).toBeVisible();
    await page.screenshot({
      path: '.codex-artifacts/after/home-mobile.png',
      fullPage: true,
    });

    await page.getByRole('link', { name: 'Delivery Control Tower' }).click();
    await expect(page).toHaveURL(/\/delivery$/);
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

    await page.locator('input[type="search"]').fill('PRJ-016');

    const firstCard = page.getByRole('button', {
      name: /Open MoI Regional Secure VPN details/,
    });
    await expect(firstCard).toBeVisible();
    await expect(page).toHaveURL(/query=PRJ-016/);
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

  test('delivery queue exposes an in-page focus brief entry point', async ({ page }) => {
    await page.goto('http://localhost:9002/delivery', {
      waitUntil: 'networkidle',
      timeout: 60000,
    });

    const firstFocusLink = page.getByRole('link', {
      name: 'Open focus brief',
    }).first();

    await expect(firstFocusLink).toBeVisible();
    await firstFocusLink.click();
    await expect(page).toHaveURL(/\/delivery\?.*focus=/);
    await expect(page.getByRole('dialog')).toBeVisible();
  });

  test('strategic queue exposes an in-page focus brief entry point', async ({ page }) => {
    await page.goto('http://localhost:9002/strategic', {
      waitUntil: 'networkidle',
      timeout: 60000,
    });

    const firstFocusLink = page.getByRole('link', {
      name: 'Open focus brief',
    }).first();

    await expect(firstFocusLink).toBeVisible();
    await firstFocusLink.click();
    await expect(page).toHaveURL(/\/strategic\?.*focus=/);
    await expect(page.getByRole('dialog')).toBeVisible();
  });

  test('methodology supports KPI search and scope filtering', async ({ page }) => {
    await page.goto('http://localhost:9002/methodology', {
      waitUntil: 'networkidle',
      timeout: 60000,
    });

    await page.getByRole('searchbox', { name: 'Search KPI dictionary' }).fill('MTTR');
    await expect(page.getByText('Avg MTTR')).toBeVisible();

    await page.getByRole('button', { name: /Escalations/i }).click();
    await expect(page.getByText('SLA Breach Risk')).toBeVisible();

    await page.getByRole('button', { name: 'Clear' }).click();
    await expect(page.getByText('On-Time Delivery')).toBeVisible();
  });
});
