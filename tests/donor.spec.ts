
import { test, expect } from '../fixtures/donorFixture';
import { validDonorData } from '../test-data/donorData';


test('Verify Create Donor page and enter donor information', async ({ donorPage }) => {
 await donorPage.fillDonorForm(validDonorData);
  await donorPage.enterEmail('qa.test@example.com');
  await donorPage.enterNotes('Created for PW testing');
});

test('Verify required field validation on Create Donor page', async ({ donorPage }) => {
  await donorPage.verifySaveDonorIsDisabled();
});

test('Verify Cancel button redirects to Donors list', async ({ page, donorPage }) => {
  await donorPage.cancelDonorCreation();

  await expect(
    page.getByText('Donors', { exact: true }).first()
  ).toBeVisible();
});

test('Verify Save Donor button is enabled when all required fields are completed', async ({ donorPage }) => {
  await donorPage.fillDonorForm(validDonorData);
  await donorPage.verifySaveDonorIsEnabled();
});

