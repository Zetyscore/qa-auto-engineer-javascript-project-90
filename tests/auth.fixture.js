import { test as base } from '@playwright/test'
import { UsersPage } from './pages/UsersPage.js'
import { StatusesPage } from './pages/StatusesPage.js'
import { LabelsPage } from './pages/LabelsPage.js'
import { TasksPage } from './pages/TasksPage.js'
import { LoginPage } from './pages/LoginPage.js'
import { CREDENTIALS } from './constants.js'

export const test = base.extend({
  page: async ({ page }, use) => {
    // Auto-login before each test
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await page.waitForLoadState('domcontentloaded')
    await loginPage.login(CREDENTIALS.ADMIN.username, CREDENTIALS.ADMIN.password)
    await page.waitForURL(/\/#\//)
    await page.waitForLoadState('domcontentloaded')

    await use(page)
  },

  usersPage: async ({ page }, use) => {
    const usersPage = new UsersPage(page)
    await use(usersPage)
  },

  statusesPage: async ({ page }, use) => {
    const statusesPage = new StatusesPage(page)
    await use(statusesPage)
  },

  labelsPage: async ({ page }, use) => {
    const labelsPage = new LabelsPage(page)
    await use(labelsPage)
  },

  tasksPage: async ({ page }, use) => {
    const tasksPage = new TasksPage(page)
    await use(tasksPage)
  },
})

export { expect } from '@playwright/test'
