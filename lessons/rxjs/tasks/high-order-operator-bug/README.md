# High Order Operator Bug

> author: thomas-laforge

### Run Application

```bash
npx nx serve rxjs-high-order-operator-bug
```

### Documentation and Instruction

---
title: 🟠 High Order Operator Bug
description: Challenge 11 is about resolving a Rxjs bug because of high order operators
author: thomas-laforge
contributors:
  - tomalaforge
  - LMFinney
challengeNumber: 11
command: rxjs-high-order-operator-bug
sidebar:
  order: 114
---

Let's dive inside the wonderful word of RxJS.

This challenge is inspired by a real-life example.

## Information

### User Story

We need a button for each `Topic`. When we click on it, we delete all objects with this `Topic` in our database _(Fake DB in our case)_. Finally, we display **All [topic] have been deleted** if everything was deleted successfully or **Error: deletion of some [topic] failed** if some deletions failed

### Constraints

We can only pass one object to our DB for deletion at the time. The DB will respond true if the data was successfully deleted and false otherwise.

### Statement

The QA team reports a **bug**. The UI shows **All [topic] have been deleted** all the time, even if some deletions fail.

👉 Spot the bug and correct it.

## RU
---
title: 🟠 Ошибка в операторе высшего порядка RxJS
description: Задача 11 посвящена устранению ошибки в RxJS из-за операторов высшего порядка
author: thomas-laforge
contributors:
  - Dinozavvvr
challengeNumber: 11
command: rxjs-high-order-operator-bug
sidebar:
  order: 114
---

Давайте погрузимся в удивительный мир RxJs.

Этот вызов вдохновлен реальным примером.

## Информация

### История пользователя

Нам нужна кнопка для каждой `Статья`. Когда мы нажимаем на нее, мы удаляем все объекты с этой `Статьей` в нашей базе данных _(Фейковая БД в нашем случае)_. Наконец, мы отображаем **Все [статьи] были удалены** в случае успешного удаления или **Ошибка: удаление некоторых [статей] не удалось** если удаление некоторых объектов не удалось.

### Ограничения:

Мы можем передавать в нашу БД для удаления только один объект за раз. БД ответит true, если данные были успешно удалены, и false в противном случае.

### Утверждение

Команда тестировщиков сообщает об **ошибке**. Интерфейс пользователя всегда показывает **Все [темы] были удалены**, даже если некоторые удаления не удалось.

👉 Найдите ошибку и исправьте ее.
