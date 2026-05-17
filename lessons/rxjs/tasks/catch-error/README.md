# catchError

> Author: Devesh Chaudhari

### Run Application

```bash
npx nx serve rxjs-catch-error
```

### Documentation and Instruction

---
title: 🟢 catchError
description: Challenge 38 is about learning observable completion.
author: devesh-chaudhari
command: rxjs-catch-error
contributors:
  - DeveshChau
  - tomalaforge
  - LMFinney
challengeNumber: 38
sidebar:
  order: 14
---

## Information

### How to Use the Application

Our application features a form with a text input box and a "Fetch" button. Upon clicking the "Fetch" button, data is retrieved from a [free API](https://jsonplaceholder.typicode.com/).

The correct values for a successful response are limited to: posts, comments, albums, photos, todos, and users. Any other values will result in an error response.

### Bug

A bug has been identified in our application. Users are only able to successfully fetch data until an invalid request is sent. Once an error response is received, users are unable to send additional requests.

### Learnings

This application provides an opportunity to understand the correct placement of a [`catchError`](https://rxjs.dev/api/operators/catchError) operator. If placed incorrectly, the overall subscription will be completed, preventing users from sending more requests. The goal is to preserve the overall subscription by handling error notifications from inner observables appropriately.

## Statement

The goal is to use the catchError operator to handle error management inside your Rxjs stream.

## Constraints

Users should be able to log the value/error each time they click the "Fetch" button.

## RU
---
title: 🟢 catchError
description: Задача 38 посвященя изучению завершения Observable.
author: devesh-chaudhari
command: rxjs-catch-error
contributors:
  - Dinozavvvr
challengeNumber: 38
sidebar:
  order: 14
---

## Информация

### Как использовать приложение

Наше приложение представляет собой форму с полем ввода текста и кнопкой "Получить". При нажатии на кнопку "Получить" данные извлекаются из [бесплатного API](https://jsonplaceholder.typicode.com/).

Корректные значения для успешного ответа ограничены следующим: posts, comments, albums, photos, todos и users. Любые другие значения приведут к ошибке.

### Ошибка

В нашем приложении обнаружена ошибка. Пользователи могут успешно получать данные только до тех пор, пока не будет отправлен недопустимый запрос. После получения ответа об ошибке пользователи не могут отправлять дополнительные запросы.

### Изучение

Это приложение предоставляет возможность понять правильное размещение оператора [`catchError`](https://rxjs.dev/api/operators/catchError). Если он размещен неправильно, вся подписка будет завершена, что предотвратит отправку дополнительных запросов. Цель состоит в том, чтобы сохранить общую подписку, правильно обрабатывая уведомления об ошибках от внутренних Observable.

## Утверждение

Цель - использовать оператор catchError для управления ошибками внутри вашего потока Rxjs.

## Ограничения

Пользователи должны иметь возможность журналировать значение/ошибку каждый раз при нажатии кнопки "Получить".
