# NgFor Optimization

> author: thomas-laforge

### Run Application

```bash
npx nx serve performance-ngfor-optimization
```

### Documentation and Instruction

---
title: 🟢 NgFor Optimization
description: Challenge 36 is about learning how trackby works
author: thomas-laforge
contributors:
  - tomalaforge
  - LMFinney
challengeNumber: 36
command: performance-ngfor-optimization
sidebar:
  order: 13
---

## Information

In this application, we have a list of individuals that we can add, delete or update. If you open the developer Chrome panel by pressing **F12**, go to the <b>Elements</b> tab, and expand the element to see the list, you will notice that each time you add, delete or update a list item, all the DOM elements are destroyed and initialized again. (See video below).

<video controls src="https://github.com/tomalaforge/angular-challenges/assets/30832608/71b90307-3ee3-42c0-a532-b67ce4f20bf6">
</video>

We can also use the <b>Angular DevTool</b> to profile our application and understand what is happening inside our application. I will show you how to do it inside the following video.

<video controls src="https://github.com/tomalaforge/angular-challenges/assets/30832608/dd8108c6-1d89-4b05-9aa5-e760bd6f7f11">
</video>

:::note
If you don't know how to use it, read [the performance introduction page](/challenges/performance/) first and come back after.
:::

If you need more information about `NgFor`, I invite you to read the [documentation](https://angular.dev/api/common/NgFor) first.

## Statement

The goal of this challenge is to understand what is causing this DOM refresh and to solve it.


## RU
---
title: 🟢 NgFor Оптимизация
description: Задача 36 заключается в изучении того, как работает track by
author: thomas-laforge
contributors:
  - webbomj
challengeNumber: 36
command: performance-ngfor-optimization
sidebar:
  order: 13
---

## Information

В этом приложении у нас есть список лиц, которых мы можем добавлять, удалять или обновлять. Если вы откроете панель разработчика Chrome, нажав **F12**, перейдете на вкладку "Источник" и развернете элемент, чтобы просмотреть список, вы заметите, что каждый раз, когда вы добавляете, удаляете или обновляете элемент списка, все элементы DOM уничтожаются и инициализируется снова. (Смотрите видео ниже).

<video controls src="https://github.com/tomalaforge/angular-challenges/assets/30832608/71b90307-3ee3-42c0-a532-b67ce4f20bf6">
</video>

Мы также можем использовать <b>Angular DevTool</b> для профилирования нашего приложения и понимания того, что происходит внутри нашего приложения. Я покажу вам, как это сделать, в следующем видео.

<video controls src="https://github.com/tomalaforge/angular-challenges/assets/30832608/dd8108c6-1d89-4b05-9aa5-e760bd6f7f11">
</video>

:::note[Заметка]
Если вы не знаете, как им пользоваться, сначала прочтите [страницу введения в производительность](/задачи/производительность/) и вернитесь после.
:::

Если вам нужна дополнительная информация о `ngFor`, я приглашаю вас сначала ознакомиться с [документацией](https://angular.dev/api/common/For).36

## Пояснение

Цель этой задачи состоит в том, чтобы понять, что вызывает это обновление DOM, и решить его.
