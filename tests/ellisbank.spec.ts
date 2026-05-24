import { test, expect } from '@playwright/test';

test('ellisbank_readings', async({page}) => {

    const login = process.env.ellisbank_login_number
    const password = process.env.ellisbank_login_password

    if(!login || !password){
        throw Error('Не заданы eirc_login_number или eirc_login_number в .env')
    }

    await page.goto('https://ellisbank.com/public/index.zul')

    const inputs = await page.getByRole('textbox')
    await expect(inputs).toHaveCount(2)

    await inputs.first().fill(login)
    await inputs.nth(1).fill(password)

    const btns = await page.locator('img[src*="login-button.gif"]')

    await btns.first().click()

    await page.getByText('Показания счетчиков').click()
})