import { test, expect } from '@playwright/test'
import { LoginPage } from './pages/LoginPage.js'
import { MainPage } from './pages/MainPage.js'
import { CREDENTIALS } from './constants.js'

test.describe('Logout', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.login(CREDENTIALS.ADMIN.username, CREDENTIALS.ADMIN.password)
  })

  test('user can logout from the application', async ({ page }) => {
    const mainPage = new MainPage(page)
    const loginPage = new LoginPage(page)

    await expect(mainPage.welcomeHeading).toBeVisible()

    await mainPage.logout()

    await expect(loginPage.usernameInput).toBeVisible()
    await expect(loginPage.passwordInput).toBeVisible()
    await expect(loginPage.signInButton).toBeVisible()
    await expect(page).toHaveURL(/\/#\/login$/)
  })

  test('logout button is accessible from profile menu', async ({ page }) => {
    const mainPage = new MainPage(page)

    await mainPage.profileButton.click()

    await expect(mainPage.logoutMenuItem).toBeVisible()
  })

  test('after logout user cannot access main page without login', async ({ page }) => {
    const mainPage = new MainPage(page)
    const loginPage = new LoginPage(page)

    await mainPage.logout()

    await expect(loginPage.usernameInput).toBeVisible()

    await page.goto('/')

    await expect(page).toHaveURL(/\/#\/login$/)
    await expect(loginPage.usernameInput).toBeVisible()
  })
})
