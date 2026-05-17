# Optimize Change Detection

> author: thomas-laforge

### Run Application

```bash
npx nx serve performance-optimize-change-detection
```

### Documentation and Instruction

---
title: 🟠 Optimize Change Detection
description: Challenge 12 about optimizing the number of change detection cycle while scrolling
author: thomas-laforge
contributors:
  - tomalaforge
  - LMFinney
challengeNumber: 12
command: performance-optimize-change-detection
sidebar:
  order: 107
---

## Information

In Angular, there is a library called <b>Zone.js</b> that performs a lot of magic to simplify a developer's life. Zone.js monkey patches all DOM events so that it will recheck and rerender the view when something has changed inside the application. The developer doesn't have to manually trigger change detection.

However, sometimes Zone.js triggers a lot more change detection than needed. For example, when you are listening to a scroll event, each scroll event will dispatch a new change detection cycle.

In this challenge, we only need to refresh the view at a specific scroll position to display or hide a button. All other cycles are unnecessary.

To have a better visualization of the problem, profile your application with Angular Dev Tools.

:::note
If you don't know how to use it, read [the performance introduction page](/challenges/performance/) first and come back after.
:::

You can learn more details about zone pollution and how to resolve it [here](https://angular.dev/best-practices/zone-pollution).

The following video will explain more in-depth the issue of this application.

<video controls src="https://user-images.githubusercontent.com/30832608/209819211-58d9ddcf-e1ad-4a78-8a7a-2be9d729e3f1.mov">
</video>

## Statement

Your goal for this challenge is to avoid all unnecessary change detection cycles and trigger a change detection only when needed.

## Constraint:

You cannot opt out of Zone.js globally. If this code is part of a large project, and you opt out of Zone.js, you will break your application without any doubt.

## RU
---
title: 🟠 Оптимизация обнаружения изменений
description: Задание 12 посвящено оптимизации количества циклов обнаружения изменений при прокрутке
author: thomas-laforge
contributors:
  - Dinozavvvr
challengeNumber: 12
command: performance-optimize-change-detection
sidebar:
  order: 107
---

## Информация

В Angular есть библиотека под названием <b>Zone.js</b>, которая выполняет множество магии, чтобы упростить жизнь разработчика. Zone.js монкипатчит все события DOM, чтобы перепроверить и перерисовать представление, когда что-то изменилось внутри приложения. Разработчику не нужно вручную запускать обнаружение изменений.

Однако иногда Zone.js вызывает гораздо больше обнаружения изменений, чем это необходимо. Например, когда вы прослушиваете событие прокрутки, каждое событие прокрутки вызывает новый цикл обнаружения изменений.

В этом испытании нам нужно обновлять представление только в определенной позиции прокрутки, чтобы показать или скрыть кнопку. Все остальные циклы избыточны.

Чтобы лучше понять проблему, выполните профилирование вашего приложения с помощью Angular Dev Tools.

:::note
Если вы не знаете, как это сделать, сначала прочтите [введение в производительность](/challenges/performance/).
:::

Вы можете узнать больше деталей о загрязнении зон и способах его решения [здесь](https://angular.dev/best-practices/zone-pollution).

В следующем видео более подробно объясняется проблема этого приложения.

<video controls src="https://user-images.githubusercontent.com/30832608/209819211-58d9ddcf-e1ad-4a78-8a7a-2be9d729e3f1.mov">
</video>

## Утверждение

Ваша цель в этом испытании - избежать всех избыточных циклов обнаружения изменений и запускать обнаружение изменений только при необходимости.

## Ограничение:

Вы не можете глобально отключить Zone.js. Если этот код является частью большого проекта и вы отключите Zone.js, вы без сомнения сломаете ваше приложение.
