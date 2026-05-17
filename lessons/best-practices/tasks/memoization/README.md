# Memoization

> author: thomas-laforge

### Run Application

```bash
npx nx serve performance-memoization
```

### Documentation and Instruction

---
title: 🟢 Memoization
description: Challenge 35 is about learning how pure pipe works
author: thomas-laforge
contributors:
  - tomalaforge
  - LMFinney
challengeNumber: 35
command: performance-memoization
sidebar:
  order: 8
---

## Information

In Angular, <b>pure Pipes</b> are very powerful because the value is memoized, which means if the input value doesn't change, the `transform` function of the pipe is not recomputed, and the cached value is outputted.

You can learn more about pipes in the [Angular documentation](https://angular.dev/guide/pipes) and inside this [deep dive article](https://medium.com/ngconf/deep-dive-into-angular-pipes-c040588cd15d).

In this challenge, we start with a button to load a list of people. Each person is associated with a number, and we will use the Fibonacci calculation to create a heavy computation that will slow down the application.

Once the list is loaded, try typing some letters inside the input field. You will notice that the application is very slow, even though you are only performing very basic typing.

:::note
We will not focus on the initial loading of the list in this challenge.
:::

Let's use the <b>Angular DevTool</b> to profile our application and understand how this tool can help us understand what is happening inside our application.

:::note
If you don't know how to use it, read [the performance introduction page](/challenges/performance/) first and come back after.
:::

Now, start profiling your application and type some letters inside the input field. You will see some red bars showing up inside the profiler panel.

If you click on one of the bars (indicated by the yellow arrow in the picture below), you will see that the change detection cycle is taking more than 3s in `PersonListComponent`.

![profiler record](../../../../assets/performance/35/memoize-profiler.png 'Profiler Record')

## Statement

The goal of this challenge is to understand what is causing this latency and to improve it.

## Hints:

<details>
  <summary>Hint 1</summary>

Use `Pipes` to memoize the Fibonacci computation.

</details>

## RU
---
title: 🟢 Мемоизация
description: Задача 35 заключается в изучении того, как работает чистые pipe
author: thomas-laforge
contributors:
  - webbomj
challengeNumber: 35
command: performance-memoization
sidebar:
  order: 8
---

## Информация

В Angular <b> чистые каналы</b> очень эффективны, потому что значение запоминается, что означает, что если входное значение не изменяется, функция "преобразования" канала не вычисляется повторно, а выводится кэшированное значение.

Вы можете узнать больше о каналах в [документации Angular](https://angular.dev/guide/pipes) и в этой [статье о глубоком погружении в pipes](https://medium.com/ngconf/deep-dive-into-angular-pipes-c040588cd15d).

В этом задании мы начнем с кнопки для загрузки списка людей. Каждый человек связан с числом, и мы будем использовать вычисление Фибоначчи для создания сложных вычислений, которые замедлят работу приложения.

Как только список будет загружен, попробуйте ввести несколько букв в поле ввода. Вы заметите, что приложение работает очень медленно, даже несмотря на то, что вы выполняете только самый простой набор текста.

:::note[Примечание]
В этом задании мы не будем заострять внимание на начальной загрузке списка.
:::

Давайте воспользуемся <b>Angular DevTool</b> для профилирования нашего приложения и поймем, как этот инструмент может помочь нам понять, что происходит внутри нашего приложения.

:::note[Примечание]
Если вы не знаете, как им пользоваться, сначала прочтите [страницу введения в производительность](/задачи/производительность/) и вернитесь после.
:::

Теперь запустите профилирование вашего приложения и введите несколько букв в поле ввода. Вы увидите несколько красных полос, отображающихся внутри панели профиля.

Если вы нажмете на одну из полос (обозначенную желтой стрелкой на рисунке ниже), вы увидите, что цикл обнаружения изменений в `PersonListComponent` занимает более 3 секунд.

![profiler record](../../../../../assets/performance/35/memoize-profiler.png 'Profiler Record')

## Пояснение

Цель этой задачи - понять, что является причиной такой задержки, и улучшить ее.

## Подсказка:

<details>
  <summary>Подсказка 1</summary>

Используйте `Pipes` для запоминания вычисления Фибоначчи.

</details>
