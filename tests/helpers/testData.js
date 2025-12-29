import { CONFIG } from '../constants.js'

export class TestDataHelper {
  static generateEmail(prefix = CONFIG.DEFAULT_PREFIX) {
    if (!prefix || typeof prefix !== 'string') {
      throw new Error('Email prefix must be a non-empty string')
    }

    const timestamp = Date.now()
    const email = `${prefix}${timestamp}${CONFIG.EMAIL_DOMAIN}`

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw new Error(`Generated invalid email: ${email}`)
    }

    return email
  }

  static generateName(prefix = 'Test') {
    if (!prefix || typeof prefix !== 'string') {
      throw new Error('Name prefix must be a non-empty string')
    }

    const timestamp = Date.now()
    return `${prefix}${timestamp}`
  }

  static generateSlug(prefix = CONFIG.DEFAULT_PREFIX) {
    if (!prefix || typeof prefix !== 'string') {
      throw new Error('Slug prefix must be a non-empty string')
    }

    const timestamp = Date.now()
    const slug = `${prefix}_${timestamp}`

    const slugRegex = /^[a-z0-9_]+$/
    if (!slugRegex.test(slug)) {
      throw new Error(`Generated invalid slug: ${slug}. Use lowercase and underscores only.`)
    }

    return slug
  }

  static getTimestamp() {
    return Date.now()
  }
}
