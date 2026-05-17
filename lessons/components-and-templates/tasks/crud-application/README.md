# Crud application

> author: thomas-laforge

### Run Application

```bash
npx nx serve angular-crud-application
```

### Documentation and Instruction

---
title: 🟢 Crud application
description: Challenge 5 is about refactoring a crud application
author: thomas-laforge
contributors:
  - tomalaforge
  - tomer953
  - svenson95
  - jdegand
  - LMFinney
challengeNumber: 5
command: angular-crud-application
sidebar:
  order: 2
---

## Information

Communicating and having a global/local state in sync with your backend is the heart of any application. You will need to master these following best practises to build strong and reliable Angular Applications.

## Statement

In this exercise, you have a small CRUD application, which get a list of TODOS, update and delete some todos.

Currently, we have a working example but filled with lots of bad practices.

### Step 1: refactor with best practices

What you will need to do:

- Avoid **any** as a type. Using Interface to leverage Typescript type system prevent errors
- Use a **separate service** for all your http calls and use a **Signal** for your todoList
- Don't **mutate** data

```typescript
// Avoid this
this.todos[todoUpdated.id - 1] = todoUpdated;

// Prefer something like this, but need to be improved because we still want the same order
this.todos = [...this.todos.filter((t) => t.id !== todoUpdated.id), todoUpdated];
```

### Step 2: Improve

- Add a **Delete** button: _<a href="https://jsonplaceholder.typicode.com/" target="_blank">Doc of fake API</a>_
- Handle **errors** correctly. _(Globally)_
- Add a Global **loading** indicator. _You can use MatProgressSpinnerModule_

### Step 3: Maintainability!! add some test

- Add 2/3 tests

### Step 4: Awesomeness!!! master your state.

- Use the **component store of ngrx**, **ngrx/store**, **rxAngular**, **tanstack-query** or **ngrx/signal-store** as a local state of your component.
- Have a **localized** Loading/Error indicator, e.g. only on the Todo being processed and **disable** all buttons of the processed Todo. _(Hint: you will need to create an ItemComponent)_

## RU
---
title: 🟢 Crud приложение
description: Задача 5 посвящена рефакторингу crud-приложения
author: thomas-laforge
contributors:
  - webbomj
challengeNumber: 5
command: angular-crud-application
sidebar:
  order: 2
---

## Информация

Взаимодействие и синхронизация глобального/локального состояния с вашей серверной частью - это основа любого приложения. Вам необходимо освоить следующие рекомендации для создания надежных приложений на Angular.

## Обзор

В этом упражнении у вас есть небольшое CRUD приложение, которое получает список задач (TODOS), обновляет и удаляет некоторые задачи.

В настоящее время у нас есть работающий пример, но он наполнен множеством плохих практик.

### Шаг 1: рефакторинг с учетом лучших практик

Что вам нужно будет сделать:

- Избегайте **any** в качестве типа. Использование интерфейсов Typescript предотвращает ошибки
- Используйте **отдельную службу** для всех ваших http-запросов и используйте **Signal** для вашего списка задач
- Не **изменяйте** данные (пример ниже)

```typescript
// Избегайте этого
this.todos[todoUpdated.id - 1] = todoUpdated;

// Предпочитаю что-то вроде этого кода, но он нуждается в улучшении, потому что мы все еще хотим тот же порядок в списке
this.todos = [...this.todos.filter((t) => t.id !== todoUpdated.id), todoUpdated];
```

### Шаг 2: Улучшаем

- Добавьте кнопку **Delete**: _<a href="https://jsonplaceholder.typicode.com/" target="_blank">Документация к fake API</a>_
- Обработайте **ошибки** правильно. _(Глобально)_
- Добавьте глобальный **loading** индикатор загрузки. _Вы можете использовать MatProgressSpinnerModule_

### Шаг 3: Удобство в обслуживании!! Добавьте немного тестов

- Добавьте 2/3 тестов

### Шаг 4: Благоговение!!! овладейте своим состоянием.

- Используйте **component store of ngrx**, **ngrx/store**, **rxAngular**, **tanstack-query** или **ngrx/signal-store** как локальное состояние вашего компонента.
- Добавьте **локальный** индикатор Loading/Error, например, только для обрабатываемого Todo и **отключите (disable)** все кнопки обрабатываемого Todo. _(Подсказка: вам нужно будет создать ItemComponent)_
