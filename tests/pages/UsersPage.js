import { BaseCRUDPage } from './BaseCRUDPage.js'
import { URLS } from '../constants.js'

export class UsersPage extends BaseCRUDPage {
  constructor(page) {
    super(page)

    this.usersTable = this.table

    this.emailInput = page.getByRole('textbox', { name: 'Email' })
    this.firstNameInput = page.getByRole('textbox', { name: 'First name' })
    this.lastNameInput = page.getByRole('textbox', { name: 'Last name' })
    this.deleteButtonInForm = page.getByRole('button', { name: 'Delete' }).last()
  }

  async goto() {
    await this.page.goto(URLS.USERS)
    await this.page.waitForURL(URLS.USERS)
    await this.page.waitForLoadState('domcontentloaded')
    await this.table.waitFor({ state: 'visible', timeout: 15000 })
  }

  async createUser(email, firstName, lastName) {
    await this.emailInput.fill(email)
    await this.firstNameInput.fill(firstName)
    await this.lastNameInput.fill(lastName)
    await this.saveButton.click()
  }

  async editUser(firstName, lastName) {
    await this.firstNameInput.fill(firstName)
    await this.lastNameInput.fill(lastName)
    await this.saveButton.click()
  }

  async selectUserByEmail(email) {
    const row = this.page.getByRole('row').filter({ hasText: email })
    await row.getByRole('checkbox').click()
  }

  async deleteSelectedUsers() {
    await this.deleteSelected()
  }

  async clickUserRow(email) {
    const row = this.page.getByRole('row').filter({ hasText: email })
    await row.click()
  }

  async getUserRowByEmail(email) {
    return this.page.getByRole('row').filter({ hasText: email })
  }

  async isUserInList(email) {
    const row = await this.getUserRowByEmail(email)
    return await row.count() > 0
  }

  async createAndReturn({ email, firstName, lastName }) {
    await this.gotoCreate()
    await this.createUser(email, firstName, lastName)
    await this.goto()
  }
}
