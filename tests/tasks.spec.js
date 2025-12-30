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

  test('create new task', async ({ tasksPage }) => {
    await tasksPage.goto()

    const taskTitle = 'New Test Task'
    await tasksPage.createAndReturn({ assignee: 'john@google.com', title: taskTitle, status: 'Draft' })

    await expect(tasksPage.getTaskByTitle(taskTitle)).toBeVisible()

    await tasksPage.deleteTask(taskTitle)
  })

  test('edit existing task', async ({ tasksPage }) => {
    await tasksPage.goto()

    const taskTitle = 'Task to Edit'
    await tasksPage.createAndReturn({ assignee: 'john@google.com', title: taskTitle, status: 'Draft' })

    await tasksPage.clickTaskEdit(taskTitle)

    const updatedTitle = 'Task to Edit - Updated'
    await tasksPage.editTask(updatedTitle)

    await expect(tasksPage.successMessage).toContainText('Element updated')

    await tasksPage.goto()
    await tasksPage.deleteTask(updatedTitle)
  })

  test('drag task between columns on kanban board', async ({ tasksPage }) => {
    await tasksPage.goto()

    // Создаем задачу в Draft
    const taskTitle = 'Drag Test Task'
    await tasksPage.createAndReturn({ assignee: 'john@google.com', title: taskTitle, status: 'Draft' })

    // Проверяем что задача в Draft
    const isInDraft = await tasksPage.isTaskInColumn(taskTitle, tasksPage.draftColumn)
    expect(isInDraft).toBeTruthy()

    // Перетаскиваем в To Review
    await tasksPage.dragTaskToColumn(taskTitle, tasksPage.toReviewColumn)

    // Проверяем что задача переместилась в To Review
    await expect(tasksPage.toReviewColumn.getByText(taskTitle, { exact: true })).toBeVisible()

    // Cleanup
    await tasksPage.deleteTask(taskTitle)
  })

  test('delete task', async ({ tasksPage }) => {
    await tasksPage.goto()

    const taskTitle = 'Task to Delete'
    await tasksPage.createAndReturn({ assignee: 'john@google.com', title: taskTitle, status: 'Draft' })

    await tasksPage.deleteTask(taskTitle)

    await expect(tasksPage.successMessage).toContainText('deleted')
  })
})
