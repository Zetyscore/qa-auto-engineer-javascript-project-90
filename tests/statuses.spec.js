import { test, expect } from './auth.fixture.js'
import { TestDataHelper } from './helpers/testData.js'
import { AssertionHelper } from './helpers/assertions.js'

test.describe('Task Statuses Management', () => {
  test('create new status', async ({ statusesPage }) => {
    const statusName = TestDataHelper.generateName('TestStatus')
    const statusSlug = TestDataHelper.generateSlug('test_status')

    await statusesPage.goto()
    await statusesPage.gotoCreate()
    await statusesPage.createStatus(statusName, statusSlug)

    await AssertionHelper.expectElementCreated(statusesPage.successMessage)

    await statusesPage.goto()
    await expect(statusesPage.getStatusRowByName(statusName)).toBeVisible()

    await statusesPage.selectStatusByName(statusName)
    await statusesPage.deleteSelectedStatuses()
  })

  test('view statuses list', async ({ statusesPage }) => {
    const statuses = [
      {
        name: TestDataHelper.generateName('ViewStatus1'),
        slug: TestDataHelper.generateSlug('view_status_1'),
      },
      {
        name: TestDataHelper.generateName('ViewStatus2'),
        slug: TestDataHelper.generateSlug('view_status_2'),
      },
    ]

    await statusesPage.goto()
    await statusesPage.createMultiple(statuses)

    await expect(statusesPage.statusesTable).toBeVisible()
    for (const status of statuses) {
      await expect(statusesPage.getStatusRowByName(status.name)).toBeVisible()
    }

    for (const status of statuses) {
      await statusesPage.selectStatusByName(status.name)
    }
    await statusesPage.deleteSelectedStatuses()
  })

  test('edit status', async ({ loggedPage, statusesPage }) => {
    await statusesPage.goto()
    await statusesPage.clickStatusRow('To Be Fixed')
    await expect(loggedPage.getByRole('heading', { name: /Task status To Be Fixed/ })).toBeVisible()

    await statusesPage.editStatus('Needs Fixing', 'needs_fixing')

    await AssertionHelper.expectElementUpdated(statusesPage.successMessage)
  })

  test('delete single status', async ({ statusesPage }) => {
    const statusName = TestDataHelper.generateName('DeleteStatus')
    const statusSlug = TestDataHelper.generateSlug('delete_status')

    await statusesPage.goto()
    await statusesPage.createAndReturn({ name: statusName, slug: statusSlug })

    await statusesPage.selectStatusByName(statusName)
    await statusesPage.deleteSelectedStatuses()

    await AssertionHelper.expectElementDeleted(statusesPage.successMessage)
    await statusesPage.goto()
    await expect(statusesPage.getStatusRowByName(statusName)).toBeHidden()
  })

  test('bulk delete statuses', async ({ statusesPage }) => {
    const statuses = [
      {
        name: TestDataHelper.generateName('BulkStatus1'),
        slug: TestDataHelper.generateSlug('bulk_status_1'),
      },
      {
        name: TestDataHelper.generateName('BulkStatus2'),
        slug: TestDataHelper.generateSlug('bulk_status_2'),
      },
    ]

    await statusesPage.goto()
    await statusesPage.createMultiple(statuses)

    for (const status of statuses) {
      await statusesPage.selectStatusByName(status.name)
    }

    await AssertionHelper.expectItemsSelected(statusesPage.itemsSelectedHeading, statuses.length)
    await statusesPage.deleteSelectedStatuses()

    await AssertionHelper.expectElementDeleted(statusesPage.successMessage)
    await statusesPage.goto()
    for (const status of statuses) {
      await expect(statusesPage.getStatusRowByName(status.name)).toBeHidden()
    }
  })
})
