# Default vs OnPush

> author: thomas-laforge

### Run Application

```bash
npx nx serve performance-default-vs-onpush
```

### Documentation and Instruction

---
title: 🟢 Default vs OnPush
description: Challenge 34 is about learning the difference between Default and OnPush Change Detection Strategy.
author: thomas-laforge
contributors:
  - tomalaforge
challengeNumber: 34
command: performance-default-vs-onpush
sidebar:
  order: 7
---

## Information

In this challenge, we will explore the differences and impacts of using `ChangeDetectionStrategy.Default` versus `ChangeDetectionStrategy.OnPush`.

You can read the [Angular documentation](https://angular.dev/best-practices/skipping-subtrees) to learn more about the differences between these strategies.

In this challenge, all components start with the `Default` strategy. When you type letters inside the input field, you will notice that all components are highlighted in orange.

:::note
I added color highlighting to each component and each row to provide a better visualization of when a component is rerendered.
:::

As you can see, each letter triggers a new change detection cycle, and all components are rerendered, causing performance issues.

Let's use the <b>Angular DevTool</b> to profile our application and understand how this tool can help us understand what is happening inside our application.

:::note
If you don't know how to use it, read [the performance introduction page](/challenges/performance/) first and come back after.
:::

Now, start profiling your application and type some letters inside the input field to trigger some change detection cycles.

If you click on one of the bars (indicated by the yellow arrow in the picture below), you can see that `PersonListComponent`, `RandomComponent`, and all the `MatListItem` are impacted by the change detection cycle, even when we only interact with the input field.

![profiler record](../../../../assets/performance/34/profiler-record.png 'Profiler Record')

## Statement

The goal of this challenge is to improve the clustering of change detection within the application using the `OnPush` change detection strategy, but not only...

## Hints:

<details>
  <summary>Hint 1</summary>

Use `ChangeDetectionStrategy.OnPush` but this will not be enough.

</details>

<details>
  <summary>Hint 2</summary>

Create smaller components to better separate the input field from the list.

</details>

## RU
---
title: 🟢 Default vs OnPush
description: Задача 34 заключается в изучении разницы между стратегией обнаружения изменений Default и OnPush.
author: thomas-laforge
contributors:
  - webbomj
challengeNumber: 34
command: performance-default-vs-onpush
sidebar:
  order: 7
---

## Информация

В этом задании мы рассмотрим различия и последствия использования `ChangeDetectionStrategy.Default` в сравнении с `ChangeDetectionStrategy.OnPush`.

Вы можете прочитать [Angular документацию](https://angular.dev/best-practices/skipping-subtrees) чтобы узнать больше о различиях между этими стратегиями.

В этом задании все компоненты начинаются со стратегии `Default`. Когда вы вводите буквы в поле ввода, вы заметите, что все компоненты выделены оранжевым цветом.

:::note[Заметка]
Я добавил цветовую подсветку к каждому компоненту и каждой строке, чтобы обеспечить лучшую визуализацию при повторном отображении компонента.
:::

Как вы можете видеть, каждая буква запускает новый цикл обнаружения изменений, и все компоненты перерисовываются, что вызывает проблемы с производительностью.

Давайте воспользуемся <b>Angular DevTool</b> для профилирования нашего приложения и поймем, как этот инструмент может помочь нам понять, что происходит внутри нашего приложения.

:::note[Заметка]
Если вы не знаете, как им пользоваться, прочтите [страницу введения в производительность](/challenges/performance/) сначала и возвращайся.
:::

Теперь начните профилировать свое приложение и введите несколько букв в поле ввода, чтобы запустить несколько циклов обнаружения изменений.

Если вы нажмете на одну из полос (обозначенную желтой стрелкой на рисунке ниже), вы можете увидеть, что на `PersonListComponent`, `RandomComponent` и все `MatListItem` влияет цикл обнаружения изменений, даже когда мы взаимодействуем только с полем ввода.

![profiler record](../../../../../assets/performance/34/profiler-record.png 'Profiler Record')

## Пояснение

Цель этой задачи состоит в том, чтобы улучшить кластеризацию обнаружения изменений в приложении, используя стратегию обнаружения изменений "OnPush", но не только...

## Подсказки:

<details>
  <summary>Подсказка 1</summary>

Используйте `ChangeDetectionStrategy.OnPush` но этого будет не достаточно.

</details>

<details>
  <summary>Подсказка 2</summary>

Создайте компоненты меньшего размера, чтобы лучше отделить поле ввода от списка.

</details>
