import { BaseCRUDPage } from './BaseCRUDPage.js'
import { URLS } from '../constants/urls.js'

export class StatusesPage extends BaseCRUDPage {
  constructor(page) {
    super(page)

    this.statusesTable = this.table

    this.nameInput = page.getByRole('textbox', { name: 'Name' })
    this.slugInput = page.getByRole('textbox', { name: 'Slug' })
  }

  async goto() {
    await this.page.goto(URLS.STATUSES)
    await this.page.waitForURL(URLS.STATUSES)
    await this.page.waitForLoadState('domcontentloaded')
    await this.table.waitFor({ state: 'visible', timeout: 15000 })
  }

  async createStatus(name, slug) {
    await this.nameInput.fill(name)
    await this.slugInput.fill(slug)
    await this.saveButton.click()
  }

  async editStatus(name, slug) {
    await this.nameInput.fill(name)
    await this.slugInput.fill(slug)
    await this.saveButton.click()
  }

  async selectStatusByName(name) {
    const row = this.page.getByRole('row').filter({ hasText: name })
    await row.getByRole('checkbox').click()
  }

  async deleteSelectedStatuses() {
    await this.deleteSelected()
  }

  async clickStatusRow(name) {
    const row = this.page.getByRole('row').filter({ hasText: name })
    await row.click()
  }

  async getStatusRowByName(name) {
    return this.page.getByRole('row').filter({ hasText: name })
  }

  async isStatusInList(name) {
    const row = await this.getStatusRowByName(name)
    return await row.count() > 0
  }

  async createAndReturn({ name, slug }) {
    await this.gotoCreate()
    await this.createStatus(name, slug)
    await this.goto()
  }
}
