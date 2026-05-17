# Race Condition

> author: thomas-laforge

### Run Application

```bash
npx nx serve rxjs-race-condition
```

### Documentation and Instruction

---
title: 🟢 Race Condition
description: Challenge 14 is about race condition in Rxjs
author: thomas-laforge
contributors:
  - tomalaforge
  - LMFinney
challengeNumber: 14
command: rxjs-race-condition
sidebar:
  order: 11
---

## Information

The goal of this application is to display a list of topics in a modal when a button is clicked. The application functions correctly. However, your tech lead has asked you to add tests and they are failing.

## Statement

Correct your application to pass the test

## Constraints

- I can see you coming 🤣 => You CANNOT change the test (the test is working fine) 😳
- You CANNOT change the `fakeGetHttpTopic` method. A delay has been added to fake a slow network.

## Run the test

HEADLESS : `npx nx test rxjs-race-condition`
WATCH MODE : `npx nx test rxjs-race-condition --watch`

## RU
---
title: 🟢 Состояние гонки
description: Задача 14 посвящена race condition в Rxjs
author: thomas-laforge
contributors:
  - webbomj
challengeNumber: 14
command: rxjs-race-condition
sidebar:
  order: 11
---

## Информация

Цель этого приложения - отображать список тем в модальном режиме при нажатии кнопки. Приложение функционирует корректно. Однако ваш технический руководитель попросил вас добавить тесты, и они завершились неудачей.

## Пояснение

Исправьте своё приложение, чтобы пройти тест

## Ограничения:

- Я вижу, как ты приближаешься 🤣 => Вы НЕ МОЖЕТЕ изменить тест (тест работает нормально) 😳
- Вы НЕ МОЖЕТЕ изменить `fakeGetHttpTopic` метод. Добавлена задержка, чтобы имитировать медленную сеть.

## Запуск тестов

HEADLESS : `npx nx component-test rxjs-race-condition`
WATCH MODE : `npx nx component-test rxjs-race-condition --watch`
