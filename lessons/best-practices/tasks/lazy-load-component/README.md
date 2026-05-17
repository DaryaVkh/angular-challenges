# lazy-load-component

> author: lance-finney

### Run Application

```bash
npx nx serve angular-lazy-load-component
```

### Documentation and Instruction

---
title: 🟢 Lazy Load a Component
description: Challenge 52 is about understanding how to lazy load a component in Angular.
author: lance-finney
contributors:
  - LMFinney
challengeNumber: 52
command: angular-lazy-load-component
sidebar:
  order: 21
---

## Information

Angular has long had route-based lazy loading for entire modules, but lazy loading individual components was much more complicated. This challenge is about understanding how to lazy load a component easily with a feature that was introduced in Angular 17.

## Statement

This is a simple application that can display a `TopComponent` that we are pretending would slow the application down if it were part of the initial bundle (it actually contains just a bit of text, but we are pretending).

The current implementation shows a `PlaceholderComponent` until the user clicks a button to display the `TopComponent`. However, even though the `TopComponent` isn't visible until the button is clicked, it is still loaded as part of the initial bundle.

Use a new feature of Angular 17 to lazy load the `TopComponent` so that it is visible _and loaded_ when the user clicks the button to display it.

When you are done, you should be able to see the `TopComponent` being loaded into the browser in a separate bundle when you click the button to display it. In Chrome, you should see this by opening the DevTools, going to the Network tab, and then clicking the button to display the `TopComponent`.

## Hints

<details>
  <summary>Hint 1</summary>

You should be able to remove the `topLoaded` signal when you are done.

</details>

<details>
  <summary>Hint 2</summary>

The new Angular feature will hide the `TopComponent` from view, but it will still be loaded in the initial bundle unless you change how both `AppComponent` and `TopComponent` are defined in their decorators. This challenge start with the old `NgModule`-based architecture, but you will need to change it to use the new feature.

</details>

<details>
  <summary>Hint 3</summary>

The new feature is [Deferrable Views](https://angular.dev/guide/defer), which provides several different triggers. One of them is ideal for this challenge.

</details>

## RU
---
title: 🟢 Ленивая загрузка компонента
description: Испытание 52 посвящено изучению ленивой загрузки компонентов в Angular.
author: lance-finney
contributors:
  - LMFinney
  - stillst
challengeNumber: 52
command: angular-lazy-load-component
sidebar:
  order: 21
  badge: Новое
---

## Информация

В Angular уже давно существует механизм для ленивой загрузки модулей на основе маршрутов, но ленивая загрузка отдельных компонентов была намного сложнее. Это испытание посвящено изучению того, как лениво загружать компоненты при помощи новой фичи, которая появилась в Angular 17.

## Пояснение

Это простое приложение отображает `TopComponent`, который, по нашим предположениям, замедлил бы работу приложения, если бы был частью начального пакета (хотя на самом деле он содержит лишь немного текста, но мы притворяемся, что он замедляет приложение).

В текущем решении `PlaceholderComponent` отображается до тех пор, пока пользователь не нажмет кнопку для показа `TopComponent`. Однако, несмотря на то что `TopComponent` не виден до нажатия на кнопку, он все равно загружается вместе с начальным пакетом.

Используйте новую фичу Angular 17 для ленивой загрузки `TopComponent`, чтобы он загружался и отображался только после нажатия пользователем кнопки.

Когда вы закончите, вы увидите, что браузер загружает `TopComponent` в отдельном пакете после нажатия на кнопку для его отображения. В Chrome вы можете увидеть это, открыв DevTools, перейдя на вкладку "Network", и нажав кнопку для отображения `TopComponent`.

## Подсказки

<details>
  <summary>Подсказка 1</summary>

Вы должны иметь возможность удалить сигнал `topLoaded`, когда закончите.

</details>

<details>
  <summary>Подсказка 2</summary>

Новая фича Angular скроет `TopComponent` из вида, но он все равно будет загружаться в начальном пакете, если вы не измените способ определения `AppComponent`, и `TopComponent` в их декораторах. Эта задача начинается со старой архитектуры на основе `NgModule`, но вам нужно будет изменить ее, чтобы использовать новую фичу.

</details>

<details>
  <summary>Подсказка 3</summary>

Новая фича - это [Отложенные представления (Deferrable Views)](https://angular.dev/guide/defer). Фича предлагает несколько триггеров. Один из них идеально подходит для этой задачи.

</details>
