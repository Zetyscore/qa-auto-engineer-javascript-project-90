import { BaseCRUDPage } from './BaseCRUDPage.js'
import { URLS } from '../constants.js'

export class LabelsPage extends BaseCRUDPage {
  constructor(page) {
    super(page)

    this.labelsTable = this.table

    this.nameInput = page.getByRole('textbox', { name: 'Name' })
  }

  async goto() {
    await this.page.goto(URLS.LABELS)
    await this.page.waitForURL(URLS.LABELS)
    await this.page.waitForLoadState('domcontentloaded')
    await this.table.waitFor({ state: 'visible', timeout: 15000 })
  }

  async createLabel(name) {
    await this.nameInput.fill(name)
    await this.saveButton.click()
  }

  async editLabel(name) {
    await this.nameInput.fill(name)
    await this.saveButton.click()
  }

  async selectLabelByName(name) {
    const row = this.page.getByRole('row').filter({ hasText: name })
    await row.getByRole('checkbox').click()
  }

  async deleteSelectedLabels() {
    await this.deleteSelected()
  }

  async clickLabelRow(name) {
    const row = this.page.getByRole('row').filter({ hasText: name })
    await row.click()
  }

  getLabelRowByName(name) {
    return this.page.getByRole('row').filter({ hasText: name })
  }

  async isLabelInList(name) {
    const row = this.getLabelRowByName(name)
    return await row.count() > 0
  }

  async createAndReturn(name) {
    await this.gotoCreate()
    await this.createLabel(name)
    await this.goto()
  }
}
