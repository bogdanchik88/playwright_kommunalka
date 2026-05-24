import { test, expect } from '@playwright/test';

test('eirc_readings', async({page}) => {
    const login = process.env.eirc_login_number
    const password = process.env.eirc_login_password

    if (!login || !password) {
        throw new Error('Не заданы eirc_login_number или eirc_login_number в .env');
    }

    await page.goto('https://ikus.pesc.ru/auth/login')

    const inputs = await page.getByRole('textbox')
    await expect(inputs).toHaveCount(2)

    await inputs.first().fill(login)
    await inputs.nth(1).fill(password)

    await page.getByRole('button', { name: 'Войти', exact: true }).click();
})