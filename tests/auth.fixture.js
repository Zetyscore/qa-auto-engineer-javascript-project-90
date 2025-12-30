import { test as base } from '@playwright/test'
import { UsersPage } from './pages/UsersPage.js'
import { StatusesPage } from './pages/StatusesPage.js'
import { LabelsPage } from './pages/LabelsPage.js'
import { TasksPage } from './pages/TasksPage.js'
import { LoginPage } from './pages/LoginPage.js'
import { CREDENTIALS } from './constants.js'

export const test = base.extend({
  loggedPage: async ({ browser }, use) => {
    const context = await browser.newContext()
    const page = await context.newPage()

    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await page.waitForLoadState('domcontentloaded')

    await loginPage.login(
      CREDENTIALS.ADMIN.username,
      CREDENTIALS.ADMIN.password,
    )

    await page.waitForURL(/\/#\//)
    await page.waitForLoadState('domcontentloaded')

    await use(page)
    await context.close()
  },

  usersPage: async ({ loggedPage }, use) => {
    const usersPage = new UsersPage(loggedPage)
    await use(usersPage)
  },

  statusesPage: async ({ loggedPage }, use) => {
    const statusesPage = new StatusesPage(loggedPage)
    await use(statusesPage)
  },

  labelsPage: async ({ loggedPage }, use) => {
    const labelsPage = new LabelsPage(loggedPage)
    await use(labelsPage)
  },

  tasksPage: async ({ loggedPage }, use) => {
    const tasksPage = new TasksPage(loggedPage)
    await use(tasksPage)
  },
})

export { expect } from '@playwright/test'
