export const CONFIG = {
  EMAIL_DOMAIN: '@example.com',
  DEFAULT_PREFIX: 'test',
}

export const CREDENTIALS = {
  ADMIN: {
    username: 'admin',
    password: 'password',
  },
  TEST_USER: {
    username: 'testuser',
    password: '12345',
  },
  RANDOM_USER: {
    username: 'randomuser',
    password: 'randompass',
  },
}

export const MESSAGES = {
  ELEMENT_CREATED: 'Element created',
  ELEMENT_UPDATED: 'Element updated',
  ELEMENT_DELETED: 'deleted',
  ITEMS_SELECTED: 'items selected',
}

export const MESSAGE_PATTERNS = {
  ITEMS_SELECTED: /\d+\s+items?\s+selected/,
}

export const URLS = {
  HOME: '/',
  TASKS: '/#/tasks',
  USERS: '/#/users',
  LABELS: '/#/labels',
  STATUSES: '/#/task_statuses',
  LOGIN: '/#/login',
}
