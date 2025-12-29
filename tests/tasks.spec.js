import { test, expect } from './auth.fixture.js'

test.describe('Tasks Management', () => {
  test('view kanban board columns', async ({ page, tasksPage }) => {
    await tasksPage.goto()

    await expect(page.getByRole('heading', { name: 'Draft', exact: true })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'To Review' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'To Be Fixed' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'To Publish' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Published' })).toBeVisible()
  })

  test('view tasks on board', async ({ tasksPage }) => {
    await tasksPage.goto()

    await expect(await tasksPage.getTaskByTitle('Task 1')).toBeVisible()
    await expect(await tasksPage.getTaskByTitle('Task 2')).toBeVisible()
    await expect(await tasksPage.getTaskByTitle('Task 3')).toBeVisible()
  })

  test('tasks have filters', async ({ tasksPage }) => {
    await tasksPage.goto()

    await expect(tasksPage.assigneeFilter).toBeVisible()
    await expect(tasksPage.statusFilter).toBeVisible()
    await expect(tasksPage.labelFilter).toBeVisible()
  })

  test('filter tasks by status', async ({ page, tasksPage }) => {
    await tasksPage.goto()

    await tasksPage.filterByStatus('Draft')

    await expect(page.getByRole('heading', { name: 'Draft', exact: true })).toBeVisible()
  })

  test('navigate to create task page', async ({ page, tasksPage }) => {
    await tasksPage.goto()

    await tasksPage.gotoCreate()

    await expect(page.getByRole('heading', { name: 'Create Task' })).toBeVisible()
    await expect(tasksPage.titleInput).toBeVisible()
  })

  test('create new task', async ({ page, tasksPage }) => {
    await tasksPage.goto()
    await tasksPage.gotoCreate()

    await expect(page.getByRole('heading', { name: 'Create Task' })).toBeVisible()

    await tasksPage.titleInput.fill('New Test Task')
    await tasksPage.assigneeInput.click()
    await page.getByRole('option').first().click()

    await tasksPage.statusInput.click()
    await page.getByRole('option', { name: 'Draft' }).click()

    await tasksPage.saveButton.click()

    await expect(tasksPage.successMessage).toContainText('Element created')
  })

  test('edit existing task', async ({ page, tasksPage }) => {
    await tasksPage.goto()

    const taskCard = page.getByRole('button').filter({ hasText: /^Task 2/ }).first()
    await taskCard.getByRole('link', { name: 'Edit' }).click()

    await expect(page.getByRole('heading', { name: /Task Task 2/ })).toBeVisible()

    await tasksPage.titleInput.fill('Task 2 - Edited')
    await tasksPage.saveButton.click()

    await expect(tasksPage.successMessage).toContainText('Element updated')
  })
})
