export class MainPage {
  constructor(page) {
    this.page = page
    this.welcomeHeading = page.getByRole('heading', { name: 'Welcome to the administration' })
    this.profileButton = page.getByRole('button', { name: 'Profile' })
    this.logoutMenuItem = page.getByRole('menuitem', { name: 'Logout' })
    this.dashboardMenuItem = page.getByRole('menuitem', { name: 'Dashboard' })
    this.tasksMenuItem = page.getByRole('menuitem', { name: 'Tasks' })
    this.usersMenuItem = page.getByRole('menuitem', { name: 'Users' })
  }

  async logout() {
    await this.profileButton.click()
    await this.logoutMenuItem.waitFor({ state: 'visible' })
    await this.logoutMenuItem.click()
  }

  async isLoggedIn() {
    return await this.welcomeHeading.isVisible()
  }
}
