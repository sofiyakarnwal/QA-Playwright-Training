import { test, expect } from '@playwright/test';

test('Verify Admin Dashboard is visible', async ({ page }) => {
  await page.goto('https://ep-inv-qa-static-02-csg9dnckbrgjhsg5.z02.azurefd.net/');

  // Expect a title "to contain" a substring.
  await expect(page.getByText('Admin Dashboard', {exact:true})).toBeVisible();
});

test('Navigate to Donor Module', async ({ page }) => {
  
  // Open URL
  await page.goto('https://ep-inv-qa-static-02-csg9dnckbrgjhsg5.z02.azurefd.net/');

  //Click "Donors" in the left menu
  await page.getByText('Donors', {exact:true}).click();

  //Expect Donor Tabs

  await expect (page.getByText('Individuals', {exact:true})).toBeVisible();
  
});
