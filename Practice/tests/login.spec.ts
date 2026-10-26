import {test,expect} from '@playwright/test';
import { validLoginData } from '../test-data/testData';
import { LoginPage } from '../Pages/loginPage';

test('Verify Navigation', async({page})=>
{

    const loginpage=new LoginPage(page);
    await loginpage.navigator();
    await expect(page.getByRole('heading',{name:'Test Login page for Automation Testing Practice'})).toBeVisible();


}

)

test('Verify successful login with valid credentials',async({page})=>
{
    const loginpage=new LoginPage(page);
    await loginpage.navigator();
    await expect(page.getByRole('heading',{name:'Test Login page for Automation Testing Practice'}));

    await loginpage.login(validLoginData.username,validLoginData.password);
    await expect(page.getByRole('heading',{name:'Secure Area page for Automation Testing Practice'})).toBeVisible();


}
)