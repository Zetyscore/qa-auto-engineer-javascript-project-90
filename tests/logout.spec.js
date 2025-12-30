import { test, expect } from './auth.fixture.js'
import { LoginPage } from './pages/LoginPage.js'
import { MainPage } from './pages/MainPage.js'

test.describe('Logout', () => {
  test('user can logout from the application', async ({ loggedPage }) => {
    const mainPage = new MainPage(loggedPage)
    const loginPage = new LoginPage(loggedPage)

    await expect(mainPage.welcomeHeading).toBeVisible()

    await mainPage.logout()

    await expect(loginPage.usernameInput).toBeVisible()
    await expect(loginPage.passwordInput).toBeVisible()
    await expect(loginPage.signInButton).toBeVisible()
    await expect(loggedPage).toHaveURL(/\/#\/login$/)
  })

  test('logout button is accessible from profile menu', async ({ loggedPage }) => {
    const mainPage = new MainPage(loggedPage)

    await mainPage.profileButton.click()

    await expect(mainPage.logoutMenuItem).toBeVisible()
  })

  test('after logout user cannot access main page without login', async ({ loggedPage }) => {
    const mainPage = new MainPage(loggedPage)
    const loginPage = new LoginPage(loggedPage)

    await mainPage.logout()

    await expect(loginPage.usernameInput).toBeVisible()

    await loggedPage.goto('/')

    await expect(loggedPage).toHaveURL(/\/#\/login$/)
    await expect(loginPage.usernameInput).toBeVisible()
  })
})
