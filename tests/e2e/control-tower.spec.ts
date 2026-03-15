import { expect, test, type Page } from '@playwright/test';

async function dismissGuideIfVisible(page: Page) {
  const closeGuideButton = page.getByRole('button', { name: /close guide/i });

  if (await closeGuideButton.isVisible().catch(() => false)) {
    await closeGuideButton.click();
  }
}

test('home loads the executive shell with breadcrumbs and theme controls', async ({
  page,
}) => {
  await page.goto('/');
  await dismissGuideIfVisible(page);

  await expect(
    page.getByRole('heading', { name: 'Operations Control Tower' }),
  ).toBeVisible();
  await expect(page.getByLabel('Breadcrumb')).toContainText('Executive Overview');
  await expect(
    page.getByRole('button', { name: /switch to light mode/i }),
  ).toBeVisible();
});

test('sidebar navigation updates the active route state', async ({ page }) => {
  await page.goto('/');
  await dismissGuideIfVisible(page);

  const deliveryLink = page.getByRole('link', { name: 'Delivery Control Tower' });
  await deliveryLink.click();

  await expect(page).toHaveURL(/\/delivery$/);
  await expect(
    page.getByRole('heading', { name: 'Delivery Control Tower' }),
  ).toBeVisible();
  await expect(deliveryLink).toHaveAttribute('aria-current', 'page');
});

test('delivery queue presets and clear controls update the view', async ({
  page,
}) => {
  await page.goto('/delivery');
  await dismissGuideIfVisible(page);

  await page.getByRole('button', { name: 'Western Recovery' }).click();
  await expect(page).toHaveURL(/region=Western/);
  await expect(page.getByText(/Showing \d+ of \d+ delivery decisions/)).toBeVisible();

  await page.getByRole('button', { name: 'Clear' }).click();
  await expect(page).toHaveURL(/\/delivery(?:#delivery-decisions)?$/);
  await expect(page.getByText(/Showing \d+ of \d+ delivery decisions/)).toBeVisible();
});

test('explorer mobile cards open the focus detail sheet', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/explorer');
  await dismissGuideIfVisible(page);

  await page.getByRole('searchbox', { name: 'Search portfolio projects' }).fill('PRJ-016');
  await expect(page).toHaveURL(/query=PRJ-016/);

  const focusCard = page.getByRole('button', {
    name: /Open MoI Regional Secure VPN details/i,
  });

  await expect(focusCard).toBeVisible();
  await focusCard.click();

  await expect(page).toHaveURL(/focus=PRJ-016/);
  await expect(page.locator('aside[role="dialog"]')).toBeVisible();
});
