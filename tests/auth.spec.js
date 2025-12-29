import { test, expect } from '@playwright/test'
import { LoginPage } from './pages/LoginPage.js'
import { MainPage } from './pages/MainPage.js'
import { CREDENTIALS } from './constants.js'

test.describe('Authentication', () => {
  test('successful login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page)
    const mainPage = new MainPage(page)

    await loginPage.goto()
    await loginPage.login(CREDENTIALS.ADMIN.username, CREDENTIALS.ADMIN.password)

    await expect(mainPage.welcomeHeading).toBeVisible()
    await expect(mainPage.profileButton).toBeVisible()
    await expect(page).toHaveURL(/\/#\/$/)
  })

  test('user can see main menu after login', async ({ page }) => {
    const loginPage = new LoginPage(page)
    const mainPage = new MainPage(page)

    await loginPage.goto()
    await loginPage.login(CREDENTIALS.TEST_USER.username, CREDENTIALS.TEST_USER.password)

    await expect(mainPage.dashboardMenuItem).toBeVisible()
    await expect(mainPage.tasksMenuItem).toBeVisible()
    await expect(mainPage.usersMenuItem).toBeVisible()
  })

  test('login with any username and password', async ({ page }) => {
    const loginPage = new LoginPage(page)
    const mainPage = new MainPage(page)

    await loginPage.goto()
    await loginPage.login(CREDENTIALS.RANDOM_USER.username, CREDENTIALS.RANDOM_USER.password)

    await expect(mainPage.welcomeHeading).toBeVisible()
  })
})
