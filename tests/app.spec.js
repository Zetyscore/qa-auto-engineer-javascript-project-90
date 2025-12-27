import { test, expect } from '@playwright/test'

test('application renders successfully', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/Vite \+ React/)

  await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible()
  await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible()
})
