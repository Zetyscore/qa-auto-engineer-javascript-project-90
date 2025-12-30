import { URLS } from '../constants.js'

export class TasksPage {
  constructor(page) {
    this.page = page

    this.createLink = page.getByRole('link', { name: 'Create' })

    this.assigneeFilter = page.getByRole('combobox', { name: 'Assignee' }).nth(0)
    this.statusFilter = page.getByRole('combobox', { name: 'Status' }).nth(0)
    this.labelFilter = page.getByRole('combobox', { name: 'Label' }).nth(0)

    this.draftColumn = page.getByRole('heading', { name: 'Draft', exact: true }).locator('..')
    this.toReviewColumn = page.getByRole('heading', { name: 'To Review' }).locator('..')
    this.toBeFixedColumn = page.getByRole('heading', { name: 'To Be Fixed' }).locator('..')
    this.toPublishColumn = page.getByRole('heading', { name: 'To Publish' }).locator('..')
    this.publishedColumn = page.getByRole('heading', { name: 'Published' }).locator('..')

    this.titleInput = page.getByRole('textbox', { name: 'Title' })
    this.contentInput = page.getByRole('textbox', { name: 'Content' })
    this.assigneeInput = page.getByRole('combobox', { name: 'Assignee' }).last()
    this.statusInput = page.getByRole('combobox', { name: 'Status' }).last()
    this.labelInput = page.getByRole('combobox', { name: 'Label' }).last()
    this.saveButton = page.getByRole('button', { name: 'Save' })

    this.successMessage = page.getByRole('alert')
  }

  async goto() {
    await this.page.goto(URLS.TASKS)
    await this.page.waitForURL(URLS.TASKS)
    await this.page.waitForLoadState('domcontentloaded')
    await this.assigneeFilter.waitFor({ state: 'visible', timeout: 15000 })
  }

  async gotoCreate() {
    await this.createLink.click()
  }

  async selectOption(locator, optionText) {
    await locator.click()
    await this.page.getByRole('option', { name: optionText }).click()
  }

  async createTask(assignee, title, status, content, label) {
    await this.selectOption(this.assigneeInput, assignee)
    await this.titleInput.fill(title)

    if (content) {
      await this.contentInput.fill(content)
    }

    await this.selectOption(this.statusInput, status)

    if (label) {
      await this.selectOption(this.labelInput, label)
    }

    await this.saveButton.click()
  }

  async editTask(title) {
    await this.titleInput.fill(title)
    await this.saveButton.click()
  }

  async filterByStatus(status) {
    await this.selectOption(this.statusFilter, status)
  }

  getTaskByTitle(title) {
    return this.page.getByText(title, { exact: true })
  }

  async createAndReturn({ assignee, title, status, content, label }) {
    await this.gotoCreate()
    await this.createTask(assignee, title, status, content, label)
    await this.goto()
  }

  async clickTaskEdit(title) {
    const taskCard = this.page.getByRole('button').filter({ hasText: title })
    await taskCard.getByRole('link', { name: 'Edit' }).click()
  }

  async deleteTask(taskTitle) {
    await this.clickTaskEdit(taskTitle)

    await this.page.getByRole('heading', { name: new RegExp(taskTitle) }).waitFor({ state: 'visible' })

    const deleteButton = this.page.getByRole('button', { name: 'Delete' })
    await deleteButton.click()
  }

  async isTaskInColumn(taskTitle, column) {
    const task = column.getByText(taskTitle, { exact: true })
    return await task.count() > 0
  }

  async dragTaskToColumn(taskTitle, targetColumn) {
    // Находим карточку по точному названию задачи
    const taskCard = this.page.getByText(taskTitle, { exact: true }).locator('..')

    await taskCard.waitFor({ state: 'visible', timeout: 5000 })
    await targetColumn.waitFor({ state: 'visible', timeout: 5000 })

    // Получаем bounding boxes
    const taskBound = await taskCard.boundingBox()
    const targetBound = await targetColumn.boundingBox()

    // Перемещаем мышь к источнику с шагами (критично для react-beautiful-dnd!)
    await this.page.mouse.move(
      taskBound.x + taskBound.width / 2,
      taskBound.y + taskBound.height / 2,
      { steps: 10 },
    )

    // Нажимаем мышь
    await this.page.mouse.down()

    // Перемещаем к целевой колонке с шагами
    const targetX = targetBound.x + targetBound.width / 2
    const targetY = targetBound.y + targetBound.height / 2
    await this.page.mouse.move(targetX, targetY, { steps: 10 })

    // Отпускаем мышь
    await this.page.mouse.up()
  }
}
