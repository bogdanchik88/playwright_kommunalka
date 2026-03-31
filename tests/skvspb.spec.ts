import { test, expect } from '@playwright/test';

test('skvspb_readings', async ({ page }) => {
    const login = process.env.skvspb_login_number
    const password = process.env.skvspb_login_password
    
    if (!login || !password) {
        throw new Error('Не заданы skvspb_login_number или skvspb_login_password в .env');
    }

    await page.goto('https://lk.сквспб.рф')

    await page.locator('input[name="Auth[login]"]').fill(login)
    await page.locator('input[name="Auth[password]"]').fill(password)

    await page.getByRole('button', {name: 'войти'}).click()
    await expect(page).toHaveURL(/\/lk$/)

    await page.getByRole('link', {name: '112470110075'}).click()
    await expect(page).toHaveURL(/\/accruals$/)

    await page.getByRole('link', {name: 'Показания счетчиков '}).click()
    await expect(page).toHaveURL(/\/meters$/)

    await page.locator('a', {hasText: '№ Z25023503'}).click()

    const val = await page.locator('input[name="MeterSend[value1]"]')
    await val.clear()
    //ВНЕСТИ АКТУАЛЬНЫЕ ПОКАЗАНИЯ
    await val.fill('67')
})