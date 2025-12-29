### Hexlet tests and linter status:
[![Actions Status](https://github.com/Zetyscore/qa-auto-engineer-javascript-project-90/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Zetyscore/qa-auto-engineer-javascript-project-90/actions)
[![Playwright Tests](https://github.com/Zetyscore/qa-auto-engineer-javascript-project-90/actions/workflows/playwright.yml/badge.svg)](https://github.com/Zetyscore/qa-auto-engineer-javascript-project-90/actions)

## О проекте

Проект представляет собой Kanban-доску для управления задачами, построенную на React с использованием библиотеки [@hexlet/testing-task-manager](https://www.npmjs.com/package/@hexlet/testing-task-manager).

### Основные компоненты:
- **Задачи (Tasks)** - управление задачами на Kanban-доске
- **Статусы (Statuses)** - создание и настройка статусов задач
- **Метки (Labels)** - организация задач с помощью меток
- **Пользователи (Users)** - управление пользователями системы
- **Аутентификация** - вход и выход из системы

## Тестирование

Проект использует **Playwright** для E2E тестирования. Все тесты написаны на **JavaScript** с применением паттерна **Page Object Model**.

### Что тестируем:
- Загрузка и отображение приложения
- Аутентификацию пользователей
- CRUD операции для задач, статусов, меток и пользователей
-  Фильтрацию задач на Kanban-доске
- Выход из системы

### Как запустить тесты:

```bash
# Установка зависимостей
npm install

# Запуск приложения
npm run dev

# Запуск всех тестов
npm test

# Запуск тестов с UI
npm run test:ui

# Запуск тестов с отображением браузера
npm run test:headed
```

### Линтинг:

```bash
# Проверка кода
npm run lint

# Автоматическое исправление
npm run lint:fix
```
