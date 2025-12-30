import { test, expect } from './auth.fixture.js'
import { TestDataHelper } from './helpers/testData.js'
import { AssertionHelper } from './helpers/assertions.js'

test.describe('Users Management', () => {
  test('create new user', async ({ usersPage }) => {
    const testEmail = TestDataHelper.generateEmail('testuser')

    await usersPage.goto()
    await usersPage.gotoCreate()
    await usersPage.createUser(testEmail, 'TestFirstName', 'TestLastName')

    await AssertionHelper.expectElementCreated(usersPage.successMessage)

    await usersPage.goto()
    await expect(usersPage.getUserRowByEmail(testEmail)).toBeVisible()
  })

  test('view users list', async ({ usersPage }) => {
    const users = [
      {
        email: TestDataHelper.generateEmail('view1'),
        firstName: 'ViewTest',
        lastName: 'User1',
      },
      {
        email: TestDataHelper.generateEmail('view2'),
        firstName: 'ViewTest',
        lastName: 'User2',
      },
    ]

    await usersPage.goto()
    await usersPage.createMultiple(users)

    await expect(usersPage.usersTable).toBeVisible()
    for (const user of users) {
      await expect(usersPage.getUserRowByEmail(user.email)).toBeVisible()
    }
  })

  test('edit user', async ({ loggedPage, usersPage }) => {
    await usersPage.goto()
    await usersPage.clickUserRow('peter@outlook.com')
    await expect(loggedPage.getByRole('heading', { name: /User peter@outlook.com/ })).toBeVisible()

    await usersPage.editUser('UpdatedPeter', 'Brown')

    await AssertionHelper.expectElementUpdated(usersPage.successMessage)
  })

  test('delete single user', async ({ usersPage }) => {
    const testEmail = TestDataHelper.generateEmail('deleteuser')

    await usersPage.goto()
    await usersPage.createAndReturn({
      email: testEmail,
      firstName: 'Delete',
      lastName: 'Me',
    })

    await usersPage.selectUserByEmail(testEmail)
    await usersPage.deleteSelectedUsers()

    await AssertionHelper.expectElementDeleted(usersPage.successMessage)
    await usersPage.goto()
    await expect(usersPage.getUserRowByEmail(testEmail)).toBeHidden()
  })

  test('bulk delete users', async ({ usersPage }) => {
    const users = [
      {
        email: TestDataHelper.generateEmail('bulk1'),
        firstName: 'BulkTest',
        lastName: 'User1',
      },
      {
        email: TestDataHelper.generateEmail('bulk2'),
        firstName: 'BulkTest',
        lastName: 'User2',
      },
    ]

    await usersPage.goto()
    await usersPage.createMultiple(users)

    for (const user of users) {
      await usersPage.selectUserByEmail(user.email)
    }

    await AssertionHelper.expectItemsSelected(usersPage.itemsSelectedHeading, users.length)
    await usersPage.deleteSelectedUsers()

    await AssertionHelper.expectElementDeleted(usersPage.successMessage)
    await usersPage.goto()
    for (const user of users) {
      await expect(usersPage.getUserRowByEmail(user.email)).toBeHidden()
    }
  })
})
