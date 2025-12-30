import { test, expect } from './auth.fixture.js'

test.describe('Tasks Management', () => {
  test('view kanban board columns', async ({ loggedPage, tasksPage }) => {
    await tasksPage.goto()

    await expect(loggedPage.getByRole('heading', { name: 'Draft', exact: true })).toBeVisible()
    await expect(loggedPage.getByRole('heading', { name: 'To Review' })).toBeVisible()
    await expect(loggedPage.getByRole('heading', { name: 'To Be Fixed' })).toBeVisible()
    await expect(loggedPage.getByRole('heading', { name: 'To Publish' })).toBeVisible()
    await expect(loggedPage.getByRole('heading', { name: 'Published' })).toBeVisible()
  })

  test('view tasks on board', async ({ tasksPage }) => {
    await tasksPage.goto()

    await expect(tasksPage.getTaskByTitle('Task 1')).toBeVisible()
    await expect(tasksPage.getTaskByTitle('Task 2')).toBeVisible()
    await expect(tasksPage.getTaskByTitle('Task 3')).toBeVisible()
  })

  test('tasks have filters', async ({ tasksPage }) => {
    await tasksPage.goto()

    await expect(tasksPage.assigneeFilter).toBeVisible()
    await expect(tasksPage.statusFilter).toBeVisible()
    await expect(tasksPage.labelFilter).toBeVisible()
  })

  test('filter tasks by status', async ({ loggedPage, tasksPage }) => {
    await tasksPage.goto()

    await tasksPage.filterByStatus('Draft')

    await expect(loggedPage.getByRole('heading', { name: 'Draft', exact: true })).toBeVisible()
  })

  test('navigate to create task page', async ({ loggedPage, tasksPage }) => {
    await tasksPage.goto()

    await tasksPage.gotoCreate()

    await expect(loggedPage.getByRole('heading', { name: 'Create Task' })).toBeVisible()
    await expect(tasksPage.titleInput).toBeVisible()
  })

  test('create new task', async ({ loggedPage, tasksPage }) => {
    await tasksPage.goto()
    await tasksPage.gotoCreate()

    await expect(loggedPage.getByRole('heading', { name: 'Create Task' })).toBeVisible()

    await tasksPage.titleInput.fill('New Test Task')
    await tasksPage.assigneeInput.click()
    await loggedPage.getByRole('option').first().click()

    await tasksPage.statusInput.click()
    await loggedPage.getByRole('option', { name: 'Draft' }).click()

    await tasksPage.saveButton.click()

    await expect(tasksPage.successMessage).toContainText('Element created')
  })

  test('edit existing task', async ({ loggedPage, tasksPage }) => {
    await tasksPage.goto()

    const taskCard = loggedPage.getByRole('button').filter({ hasText: /^Task 2/ }).first()
    await taskCard.getByRole('link', { name: 'Edit' }).click()

    await expect(loggedPage.getByRole('heading', { name: /Task Task 2/ })).toBeVisible()

    await tasksPage.titleInput.fill('Task 2 - Edited')
    await tasksPage.saveButton.click()

    await expect(tasksPage.successMessage).toContainText('Element updated')
  })

  test('tasks can be dragged on kanban board', async ({ loggedPage, tasksPage }) => {
    await tasksPage.goto()

    // Проверяем что задачи имеют атрибут draggable (возможность перемещения)
    const task1Card = loggedPage.getByRole('button').filter({ hasText: /^Task 1/ }).first()
    await expect(task1Card).toBeVisible()

    // Проверяем наличие drag handle или draggable атрибута
    const isDraggable = await task1Card.evaluate((el) => {
      return el.getAttribute('draggable') !== null
        || el.querySelector('[draggable]') !== null
        || el.hasAttribute('data-rfd-drag-handle-draggable-id')
    })

    expect(isDraggable).toBeTruthy()
  })

  test('delete task', async ({ loggedPage, tasksPage }) => {
    await tasksPage.goto()
    await tasksPage.gotoCreate()

    await expect(loggedPage.getByRole('heading', { name: 'Create Task' })).toBeVisible()

    const taskTitle = 'Task to Delete'
    await tasksPage.titleInput.fill(taskTitle)
    await tasksPage.assigneeInput.click()
    await loggedPage.getByRole('option').first().click()

    await tasksPage.statusInput.click()
    await loggedPage.getByRole('option', { name: 'Draft' }).click()

    await tasksPage.saveButton.click()
    await expect(tasksPage.successMessage).toContainText('Element created')

    await tasksPage.goto()
    const taskCard = loggedPage.getByRole('button').filter({ hasText: taskTitle })
    await taskCard.getByRole('link', { name: 'Edit' }).click()

    await expect(loggedPage.getByRole('heading', { name: new RegExp(taskTitle) })).toBeVisible()

    const deleteButton = loggedPage.getByRole('button', { name: 'Delete' })
    await deleteButton.click()

    await expect(tasksPage.successMessage).toContainText('deleted')
  })
})
