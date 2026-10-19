# Master Dependency Injection

🔴 Уровень: сложный · ⏱ 45–60 минут · Тема: [Иерархия инжекторов](../../lecture/basics.md#иерархия-инжекторов)

### Как запускать

```bash
npm run serve:angular-master-dependency-injection
```

## Документация

---
title: 🔴 Master Dependency Injection
description: Испытание 16 про то, как по-настоящему работает внедрение зависимостей
author: thomas-laforge
contributors:
  - tomalaforge
  - tomer953
  - kabrunko-dev
challengeNumber: 16
command: angular-master-dependency-injection
sidebar:
  order: 203
---

## Информация

Для этой задачи нужно хорошо понимать, как работает [Dependency Injection](https://angular.dev/guide/di/dependency-injection) в Angular, и особенно [иерархия инжекторов](https://angular.dev/guide/di/hierarchical-dependency-injection).

На экране таблица товаров, у каждого три цены. Валюта у товаров разная (поле `currencyCode` в `product.model.ts`), но сейчас во **всех** строках выводится `€`.

Почему так происходит:

- `CurrencyPipe` (`currency.pipe.ts`) получает сервис через `inject(CurrencyService)` и берёт из него символ валюты `symbol$`.
- `CurrencyService` (`currency.service.ts`) — это `ComponentStore` с состоянием `{ code: string }`. По умолчанию `code: 'EUR'`.
- Сервис предоставлен один раз, в `providers` у `AppComponent`, то есть на уровне всей таблицы. Поэтому все пайпы во всех строках получают **один и тот же** экземпляр с кодом `EUR`.

Чтобы каждая строка показывала свою валюту, у каждой строки должен быть **свой экземпляр** `CurrencyService` с нужным кодом.

Самый простой способ — передать валюту вторым аргументом пайпа (`price | currency: product.currencyCode`). В этой задаче так делать нельзя: смысл упражнения именно в DI.

:::note[Примечание]
`ProductDirective` с `ngTemplateContextGuard` в `app.component.ts` нужна только для типизации `let-product` в шаблоне. К решению она отношения не имеет.
:::

## Задача

Сделать так, чтобы в каждой строке таблицы выводился символ валюты этого товара.

## Ограничения

- Нельзя изменять `currency.pipe.ts`.
- Нельзя передавать валюту в пайп аргументом из шаблона.
- Нельзя оборачивать строку в компонент. `TableComponent` рендерит каждую строку прямо внутри `<tbody>`, и лишний host-элемент между `<tbody>` и `<tr>` сломает вёрстку таблицы.
- `currency.service.ts` и `product.model.ts` менять не нужно.

## Критерии успеха

После решения в таблице должны быть такие валюты:

| Товар | Ожидаемый вывод (priceA) |
|---|---|
| bike | `1000US$` |
| tent | `112€` |
| sofa | `500€` |
| watch | `50AU$` |
| computer | `1000£` |
| mug | `10€` |
| headset | `100CAD` |
| cable | `5€` |
| table | `100€` |

Колонки `priceB` и `priceC` в каждой строке показывают ту же валюту, что и `priceA`.

## Подсказки

<details>
  <summary>Подсказка 1</summary>

Пайп в шаблоне получает зависимости из инжектора того элемента, внутри которого он используется. Если там ничего не нашлось, поиск идёт вверх по родительским элементам. Какой элемент есть в каждой строке и находится ближе всего к `<td>`?

</details>

<details>
  <summary>Подсказка 2</summary>

`providers` можно объявить не только у компонента, но и у **директивы**: `@Directive({ providers: [...] })`. Директиву вешают на уже существующий элемент, лишних узлов в DOM она не добавляет.

</details>

<details>
  <summary>Подсказка 3</summary>

Директива, которая предоставляет `CurrencyService`, может сама его заинжектить и передать ему код валюты строки. В `ComponentStore` для этого есть `patchState` / `setState`.

</details>
