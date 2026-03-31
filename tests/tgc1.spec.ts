import { test, expect } from '@playwright/test';

test('tgc1_meters', async ({ page }) => {
  const login = process.env.tgc1_login_email
  const password = process.env.tgc1_login_password

  if (!login || !password) {
    throw new Error('Не заданы tgc1_login_email или tgc1_password в .env');
  }
  await page.goto('https://lk.tgc1.ru/fl/login');

  await page.getByRole('textbox', {name: 'Введите значение'}).fill(login)
  await page.getByRole('textbox', {name: 'Введите пароль'}).fill(password)

  await page.locator('a', { hasText: 'Войти' }).click();

  await expect(page).toHaveURL(/\/fl$/)

  await page.goto(`${new URL(page.url()).origin}/fl/readings`);

  const inputs = await page.getByPlaceholder('Введите значение')
  await expect(inputs).toHaveCount(2)

  //ВНЕСТИ АКТУАЛЬНЫЕ ПОКАЗАНИЯ
  await inputs.first().fill('100')
  await inputs.nth(1).fill('42')
});