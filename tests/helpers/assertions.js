import { expect } from '@playwright/test'
import { MESSAGES } from '../constants/messages.js'

export class AssertionHelper {
  static async expectElementCreated(successMessage) {
    await expect(successMessage).toContainText(MESSAGES.ELEMENT_CREATED)
  }

  static async expectElementUpdated(successMessage) {
    await expect(successMessage).toContainText(MESSAGES.ELEMENT_UPDATED)
  }

  static async expectElementDeleted(successMessage) {
    await expect(successMessage).toContainText(MESSAGES.ELEMENT_DELETED)
  }

  static async expectItemsSelected(itemsSelectedHeading, count) {
    await expect(itemsSelectedHeading).toContainText(`${count} ${MESSAGES.ITEMS_SELECTED}`)
  }
}
