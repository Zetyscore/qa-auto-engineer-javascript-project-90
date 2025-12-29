import { test, expect } from './auth.fixture.js'
import { TestDataHelper } from './helpers/testData.js'
import { AssertionHelper } from './helpers/assertions.js'

test.describe('Labels Management', () => {
  test('create new label', async ({ labelsPage }) => {
    const labelName = TestDataHelper.generateName('TestLabel')

    await labelsPage.goto()
    await labelsPage.gotoCreate()
    await labelsPage.createLabel(labelName)

    await AssertionHelper.expectElementCreated(labelsPage.successMessage)

    await labelsPage.goto()
    await expect(await labelsPage.getLabelRowByName(labelName)).toBeVisible()
  })

  test('view labels list', async ({ labelsPage }) => {
    const labelNames = [
      TestDataHelper.generateName('ViewLabel1'),
      TestDataHelper.generateName('ViewLabel2'),
      TestDataHelper.generateName('ViewLabel3'),
    ]

    await labelsPage.goto()
    await labelsPage.createMultiple(labelNames)

    await expect(labelsPage.labelsTable).toBeVisible()
    for (const name of labelNames) {
      await expect(await labelsPage.getLabelRowByName(name)).toBeVisible()
    }
  })

  test('edit label', async ({ page, labelsPage }) => {
    await labelsPage.goto()
    await labelsPage.clickLabelRow('task')
    await expect(page.getByRole('heading', { name: /Label task/ })).toBeVisible()

    await labelsPage.editLabel('urgent-task')

    await AssertionHelper.expectElementUpdated(labelsPage.successMessage)
  })

  test('delete single label', async ({ labelsPage }) => {
    const labelName = TestDataHelper.generateName('DeleteLabel')

    await labelsPage.goto()
    await labelsPage.createAndReturn(labelName)

    await labelsPage.selectLabelByName(labelName)
    await labelsPage.deleteSelectedLabels()

    await AssertionHelper.expectElementDeleted(labelsPage.successMessage)
    await labelsPage.goto()
    await expect(await labelsPage.getLabelRowByName(labelName)).toBeHidden()
  })

  test('bulk delete labels', async ({ labelsPage }) => {
    const labelNames = [
      TestDataHelper.generateName('BulkLabel1'),
      TestDataHelper.generateName('BulkLabel2'),
    ]

    await labelsPage.goto()
    await labelsPage.createMultiple(labelNames)

    for (const name of labelNames) {
      await labelsPage.selectLabelByName(name)
    }

    await AssertionHelper.expectItemsSelected(labelsPage.itemsSelectedHeading, labelNames.length)
    await labelsPage.deleteSelectedLabels()

    await AssertionHelper.expectElementDeleted(labelsPage.successMessage)
    await labelsPage.goto()
    for (const name of labelNames) {
      await expect(await labelsPage.getLabelRowByName(name)).toBeHidden()
    }
  })
})
