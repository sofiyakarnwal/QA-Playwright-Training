import {test as base} from '@playwright/test';
import { DonorPage } from '../pages/DonorPage';

const APP_URL =
'https://ep-inv-qa-static-02-csg9dnckbrgjhsg5.z02.azurefd.net/';

type DonorFixtures={donorPage:DonorPage};

export const test=base.extend<DonorFixtures>({
    donorPage:async({page},use)=>{
    const donorPage=new DonorPage(page);

    await page.goto(APP_URL, { waitUntil: 'domcontentloaded' });
    await page.getByText('Donors',{exact:true}).first().click();
    await page.getByRole('button',{name:/Donor/i}).click();
    await donorPage.verifyCreateDonorPage();
    await use(donorPage);

    }
});

export { expect } from '@playwright/test';