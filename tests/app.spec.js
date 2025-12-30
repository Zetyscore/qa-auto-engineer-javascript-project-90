import { test, expect } from '@playwright/test'
import { LoginPage } from './pages/LoginPage.js'

test('application renders successfully', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.goto()

  await expect(page).toHaveTitle(/Task Manager/)

  await expect(loginPage.usernameInput).toBeVisible()
  await expect(loginPage.passwordInput).toBeVisible()
  await expect(loginPage.signInButton).toBeVisible()
})
