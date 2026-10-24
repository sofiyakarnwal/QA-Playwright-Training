import { Page, Locator, expect } from '@playwright/test';

export interface DonorData {
firstName: string;
lastName: string;
gender: string;
source: string;
}

export class DonorPage 
{
     readonly page: Page;

  // Donor type
  readonly individualOption: Locator;
  readonly legalEntityOption: Locator;

  // Donor information
  readonly firstNameInput: Locator;
  readonly middleNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly genderDropdown: Locator;
  readonly dateOfBirthInput: Locator;
  readonly sourceDropdown: Locator;

  // Contact information
  readonly emailInput: Locator;
  readonly countryCodeDropdown: Locator;
  readonly phoneNumberInput: Locator;
  readonly extensionInput: Locator;

  // Address
  readonly streetAddressInput: Locator;
  readonly suiteApartmentInput: Locator;
  readonly cityInput: Locator;
  readonly stateProvinceDropdown: Locator;
  readonly zipPostalCodeInput: Locator;
  readonly countryDropdown: Locator;

  // Additional information
  readonly notesInput: Locator;
  readonly assignedToDropdown: Locator;

  // Buttons
  readonly saveDonorButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Donor type
    this.individualOption = page.getByText('Individual', {exact: true,});

    this.legalEntityOption = page.getByText('Legal Entity', {exact: true,});

    // Donor information
    this.firstNameInput = page.getByPlaceholder('Enter first name');
    this.middleNameInput = page.getByPlaceholder('Enter middle name');
    this.lastNameInput = page.getByPlaceholder('Enter last name');

    this.genderDropdown = page.getByText(/^(Select gender|Unspecified|Male|Female)$/)
      .first();

    this.dateOfBirthInput = page.locator('input[placeholder="mm/dd/yy"]');

    this.sourceDropdown = page.getByText(/^(Select source|Referral|Website|Social Media|Direct Contact)$/)
      .first();

    // Contact information
    this.emailInput = page.getByPlaceholder('Enter email address');

    this.countryCodeDropdown = page.getByText(
      'Select country code',
      { exact: true }
    );

    this.phoneNumberInput = page.getByPlaceholder('Enter phone number');
    this.extensionInput = page.getByPlaceholder('Ext.');

    // Address
    this.streetAddressInput = page.getByPlaceholder(
      'Enter street address'
    );

    this.suiteApartmentInput = page.getByPlaceholder(
      'Enter suite, apartment, or condo number'
    );

    this.cityInput = page.getByPlaceholder('Enter city');
    this.stateProvinceDropdown = page.getByPlaceholder('Enter state');
    this.zipPostalCodeInput = page.getByPlaceholder('Enter ZIP code');

    this.countryDropdown = page.getByText('Select country', {
      exact: true,
    });

    // Additional information
    this.notesInput = page.getByPlaceholder(
      'Enter any additional notes'
    );

    this.assignedToDropdown = page.getByText('Select employee', {
      exact: true,
    });

    // Buttons
    this.saveDonorButton = page.getByRole('button', {
      name: 'Save Donor',
      exact: true,
    });

    this.cancelButton = page.getByRole('button', {
      name: 'Cancel',
      exact: true,
    });
  }

  // Page verification
  async verifyCreateDonorPage() {
    await expect(
      this.page.getByRole('heading', { name: 'Add New Donor' })
    ).toBeVisible();

    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.saveDonorButton).toBeVisible();
  }

  // Donor type selection
  async selectIndividualDonor() {
    await this.individualOption.click();
  }

  // Donor information
  async enterDonorInformation(
    firstName: string,
    lastName: string
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
  }

  async selectGender(gender: string) {
    await this.genderDropdown.click();

    const genderOption = this.page
      .getByText(gender, { exact: true })
      .last();

    await genderOption.waitFor({ state: 'visible' });
    await genderOption.click();

    await expect(this.genderDropdown).toHaveText(gender);
  }

  async selectSource(source: string) {
    await this.sourceDropdown.click();

    const sourceOption = this.page
      .getByText(source, { exact: true })
      .last();

    await sourceOption.waitFor({ state: 'visible' });
    await sourceOption.click();

    await expect(this.sourceDropdown).toHaveText(source);
  }

 async fillDonorForm(donor: DonorData) {
  await this.firstNameInput.fill(donor.firstName);
  await this.lastNameInput.fill(donor.lastName);
  await this.selectGender(donor.gender);
  await this.selectSource(donor.source);
}

  // Contact information
  async enterEmail(email: string) {
    await this.emailInput.fill(email);
  }

  // Additional information
  async enterNotes(notes: string) {
    await this.notesInput.fill(notes);
  }

  // Save button validation
  async verifySaveDonorIsDisabled() {
    await expect(this.saveDonorButton).toBeDisabled();
  }

  async verifySaveDonorIsEnabled() {
    await expect(this.saveDonorButton).toBeEnabled();
  }

  // Save donor
  async saveDonor() {
    await this.saveDonorButton.click();
  }

  async cancelDonorCreation()
  {
    await this.cancelButton.click();
  }
}