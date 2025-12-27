import { test, expect } from './fixtures/auth.fixture.js'

test.describe('Tasks Management', () => {
  test('view kanban board columns', async ({ page, tasksPage }) => {
    await tasksPage.goto()

    await expect(page.getByRole('heading', { name: 'Draft', exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'To Review' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'To Be Fixed' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'To Publish' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Published' })).toBeVisible()
  })

  test('view tasks on board', async ({ page, tasksPage }) => {
    await tasksPage.goto()

    await expect(page.getByText('Task 1', { exact: true })).toBeVisible()
    await expect(page.getByText('Task 2', { exact: true })).toBeVisible()
    await expect(page.getByText('Task 3', { exact: true })).toBeVisible()
  })

  test('tasks have filters', async ({ tasksPage }) => {
    await tasksPage.goto()

    await expect(tasksPage.assigneeFilter).toBeVisible()
    await expect(tasksPage.statusFilter).toBeVisible()
    await expect(tasksPage.labelFilter).toBeVisible()
  })

  test('filter tasks by status', async ({ page, tasksPage }) => {
    await tasksPage.goto()

    await tasksPage.statusFilter.click()
    await page.getByRole('option', { name: 'Draft' }).click()

    await expect(page.getByRole('heading', { name: 'Draft', exact: true })).toBeVisible()
  })

  test('navigate to create task page', async ({ page, tasksPage }) => {
    await tasksPage.goto()

    await tasksPage.createLink.click()

    await expect(page.getByRole('heading', { name: 'Create Task' })).toBeVisible()
    await expect(page.getByRole('textbox', { name: 'Title' })).toBeVisible()
  })
})
