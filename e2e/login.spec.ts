//import { test, expect} from "playwright-test-coverage"
import { test, expect } from "playwright/test";

// The "test" keyword must be imported from playwright-test-coverage to get it into the coverage analysis.
test('has title', async ({page})=>{
    await page.goto(`/salasinfo`);
    //Expect a title "to contain" the substring "SalasInfo"
    await expect(page).toHaveTitle(/SalasInfo/);
});

test('Fills form', async ({page})=>{
    await page.goto('/salasinfo');

    await page.getByLabel('Email Address:').fill('dummy@udea.edu.co');
    await page.getByLabel('Password:').fill('dummypassword');
    await page.getByRole('button').click();

});