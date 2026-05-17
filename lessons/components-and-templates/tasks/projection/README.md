# Projection

> author: thomas-laforge

### Run Application

```bash
npx nx serve angular-projection
```

### Documentation and Instruction

---
title: 🟢 Projection
description: Challenge 1 is about learning how to project DOM element through components
author: thomas-laforge
contributors:
  - tomalaforge
  - jdegand
  - dmmishchenko
  - kabrunko-dev
  - svenson95
challengeNumber: 1
command: angular-projection
blogLink: https://medium.com/@thomas.laforge/create-a-highly-customizable-component-cc3a9805e4c5
videoLinks:
  - link: https://www.youtube.com/watch?v=npyEyUZxoIw&ab_channel=ArthurLannelucq
    alt: Projection video by Arthur Lannelucq
    flag: FR
  - link: https://www.youtube.com/watch?v=yNrfvu7vTa4
    alt: Projection video by Amos Lucian Isaila
    flag: ES
sidebar:
  order: 1
---

## Information

In Angular, content projection is a powerful technique for creating highly customizable components. Utilizing and understanding the concepts of <b>ng-content</b> and <b>ngTemplateOutlet</b> can significantly enhance your ability to create shareable components.

You can learn all about <b>ng-content</b> [here](https://angular.dev/guide/components/content-projection) from simple projection to more complex ones.

To learn about <b>ngTemplateOutlet</b>, you can find the API documentation [here](https://angular.dev/api/common/NgTemplateOutlet) along with some basic examples.

With these two tools in hand, you are now ready to take on the challenge.

## Statement

You will start with a fully functional application that includes a dashboard containing a teacher card and a student card. The goal is to implement the city card.

While the application works, the developer experience is far from being optimal. Every time you need to implement a new card, you have to modify the `card.component.ts`. In real-life projects, this component can be shared among many applications. The goal of the challenge is to create a `CardComponent` that can be customized without any modifications. Once you've created this component, you can begin implementing the `CityCardComponent` and ensure you are not touching the `CardComponent`.

## Constraints

- You <b>must</b> refactor the `CardComponent` and `ListItemComponent`.
- The `@for` must be declared and remain inside the `CardComponent`. You might be tempted to move it to the `ParentCardComponent` like `TeacherCardComponent`.
- `CardComponent` should not contain any conditions.
- CSS: try to avoid using `::ng-deep`. Find a better way to handle CSS styling.

## Bonus Challenges

- Use the signal API to manage your components state (documentation [here](https://angular.dev/guide/signals))
- To reference the template, use a directive instead of magic strings ([What is wrong with magic strings?](https://softwareengineering.stackexchange.com/a/365344))

## RU
---
title: 🟢 Проекция контента
description: Challenge 1 заключается в изучении проекции элементов DOM через компоненты
author: thomas-laforge
contributors:
  - stillst
challengeNumber: 1
command: angular-projection
blogLink: https://medium.com/@thomas.laforge/create-a-highly-customizable-component-cc3a9805e4c5
videoLinks:
  - link: https://www.youtube.com/watch?v=npyEyUZxoIw&ab_channel=ArthurLannelucq
    alt: Projection video by Arthur Lannelucq
    flag: FR
  - link: https://www.youtube.com/watch?v=yNrfvu7vTa4
    alt: Projection video by Amos Lucian Isaila
    flag: ES
sidebar:
  order: 1
---

## Информация

Проекция контента в Angular - это мощная техника для создания компонентов с гибко настраиваемым внешним видом. Понимание и использование концепций <b>ng-content</b> и <b>ngTemplateOutlet</b> может значительно вам помочь создавать компоненты, предназначенные для повторного использования.

[Здесь](https://angular.dev/guide/components/content-projection) вы можете изучить все о <b>ng-content</b>, начиная с простых примеров и до более сложных.

Документацию <b>ngTemplateOutlet</b>t, вместе с базовыми примерами, можно найти [тут](https://angular.dev/api/common/NgTemplateOutlet).

Имея эти два инструмента в своем распоряжении, вы теперь готовы пройти испытание.

## Пояснение

Вы начнете с полностью работающего приложения, которое включает панель с карточкой учителя и карточкой студента. Цель состоит в том, чтобы реализовать карточку города.

Хотя приложение работает, его внутреннее устройство далеко от идеала. Каждый раз, когда вам нужно реализовать новую карточку, вам придется изменять `card.component.ts`. В реальных проектах этот компонент может использоваться во многих приложениях. Цель этого упражнения создать `CardComponent`, внешний вид которого можно настроить без каких-либо изменений. После того как вы создадите этот компонент, вы можете создать `CityCardComponent` без модификации `CardComponent`.

## Ограничения

- Вы <b>должны</b> провести рефакторинг `CardComponent` и `ListItemComponent`.
- Директива `NgFor` должна быть определена и должна оставаться внутри `CardComponent`, несмотря на возможное желание перенести её в `ParentCardComponent`,как это сделано в `TeacherCardComponent`.
- `CardComponent` не должен содержать `NgIf` или `NgSwitch`.
- CSS: избегайте использования `::ng-deep`. Ищите альтернативные способы стилизации с помощью CSS.

## Дополнительные задачи

- Попробуйте использовать новый синтаксис для циклов и условий (документация [тут](https://angular.dev/guide/templates/control-flow)).
- Используйте signal API для управления состоянием компонентов (документация [тут](https://angular.dev/guide/signals)).
- Для ссылки на шаблон используйте директивы вместо магических строк ([What is wrong with magic strings?](https://softwareengineering.stackexchange.com/a/365344)).
