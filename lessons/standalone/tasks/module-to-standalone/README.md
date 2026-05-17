# Module to Standalone

> author: thomas-laforge

### Run Application

```bash
npx nx serve angular-module-to-standalone
```

### Documentation and Instruction

---
title: 🟢 Module to Standalone
description: Challenge 31 is about migrating a module based application to a standalone application.
author: thomas-laforge
contributors:
  - tomalaforge
challengeNumber: 31
command: angular-module-to-standalone
sidebar:
  order: 6
---

## Information

In v14, standalone components were released and made stable in v15. If you haven't played with them, it's never too late. You can try them out in this challenge.

Moreover, the goal is to see how **Nx** and **standalone components** work together, and experience the process of decoupling your app with Nx lib and standalone components.

Finally, standalone components are very simple to understand, but **routing/lazy-loaded components** can be a bit harder to grasp. This challenge will allow you to manipulate components at different levels of nesting and work with lazy loaded routes.

After completing this challenge, standalone components will no longer hold any secrets for you.

## Statement

The goal of this challenge is to migrate your application from module based components to standalone components.

## Note

You can also test the [Angular schematic](https://angular.dev/reference/migrations/standalone) to migrate NgModule to Standalone components. _(Since we are using nx, start your command with nx instead of ng)_

## RU
---
title: 🟢 Module к Standalone компоненту
description: Задача 31 заключается в переносе приложения с компонентов основанных на модулях на автономные компоненты (standalone).
author: thomas-laforge
contributors:
  - webbomj
challengeNumber: 31
command: angular-module-to-standalone
sidebar:
  order: 6
---

## Информация

В версии 14 были выпущены автономные компоненты, а в версии 15 они стали стабильными. Если вы еще не игрались с ними, никогда не поздно начать. Вы можете попробовать их в этом испытании.

Более того, цель состоит в том, чтобы увидеть, как **Nx** и **автономные компоненты(standalone)** работают вместе, и понять процесс разделения вашего приложения с помощью Nx lib и автономных компонентов.

Наконец, автономные компоненты очень просты для понимания, но **маршрутизация/компоненты с отложенной загрузкой** могут быть немного сложнее для понимания. Эта задача позволит вам манипулировать компонентами на разных уровнях вложенности и работать с маршрутами с отложенной загрузкой.

После выполнения этого задания автономные компоненты больше не будут хранить для вас никаких секретов.

## Пояснение

Цель этой задачи - перенести ваше приложение с компонентов, основанных на модулях, на автономные компоненты.

## Примечание

Вы также можете протестировать [Angular schematic](https://angular.dev/reference/migrations/standalone) для переноса NgModule на автономные компоненты. _(Поскольку мы используем nx, начните свою команду с nx вместо ng)_
