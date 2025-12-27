export class BaseCRUDPage {
  constructor(page) {
    this.page = page

    this.createLink = page.getByRole('link', { name: 'Create' })
    this.exportButton = page.getByRole('button', { name: 'Export' })
    this.table = page.getByRole('table')
    this.selectAllCheckbox = page.getByRole('checkbox', { name: 'Select all' })
    this.itemsSelectedHeading = page.getByRole('heading', { level: 6 }).filter({ hasText: /items? selected/ })

    this.deleteButton = page.getByRole('button', { name: 'Delete' }).first()

    this.saveButton = page.getByRole('button', { name: 'Save' })

    this.successMessage = page.getByRole('alert')
  }

  async goto() {
    throw new Error('Method goto() must be implemented by child class')
  }

  async gotoCreate() {
    await this.createLink.click()
  }

  async deleteSelected() {
    await this.deleteButton.click()
  }

  async selectAll() {
    await this.selectAllCheckbox.click()
  }

  async getSelectedItemsCount() {
    return await this.itemsSelectedHeading.textContent() || '0 items selected'
  }

  async createAndReturn() {
    throw new Error('Method createAndReturn() must be implemented by child class')
  }

  async createMultiple(elementsData) {
    for (const data of elementsData) {
      await this.createAndReturn(data)
    }
  }
}
