# InjectionToken

🟠 Уровень: средний · ⏱ 30–45 минут · Тема: [InjectionToken и провайдеры](../../lecture/basics.md#injectiontoken)

### Как запускать

```bash
npm run serve:angular-injection-token
```

## Документация

---
title: 🟠 InjectionToken
description: Испытание 39 про возможности внедрения зависимостей
author: thomas-laforge
contributors:
  - tomalaforge
  - jdegand
  - LMFinney
challengeNumber: 39
command: angular-injection-token
videoLinks:
  - link: https://www.youtube.com/watch?v=ntggdQycFyc
    alt: Injection Token, Arthur Lannelucq (на французском)
    flag: FR
sidebar:
  order: 118
---

## Информация

В приложении две страницы, они переключаются кнопками **Video** и **Phone**:

- `VideoComponent` — экран видеозвонка;
- `PhoneComponent` — экран телефонного звонка.

Обе страницы используют один и тот же `TimerContainerComponent`, внутри которого лежит `TimerComponent`. Интервал таймера берётся из глобальной константы `DEFAULT_TIMER = 1000` (файл `data.ts`). Её напрямую импортируют и `TimerContainerComponent`, и `TimerComponent`.

Сначала таймер был нужен только для видеозвонков, и команда разработки сделала его на **1 секунду**. Через несколько недель продуктовая команда добавила экран телефонного звонка и хочет переиспользовать там `TimerComponent`, но уже с интервалом **2 секунды**. Как это сделать?

:::note[Примечание]
Значения в коде заданы в миллисекундах. Подписи `(should be the default 1000s)` и `(should be 2000s)` в шаблонах означают 1000 и 2000 **мс**, то есть 1 и 2 секунды.
:::

## Задача

Сейчас на экране Phone таймер всё ещё тикает раз в секунду. Нужно, чтобы для `PhoneComponent` и всего, что внутри него, интервал стал 2 секунды. Для `VideoComponent` интервал должен остаться 1 секунда.

## Ограничения

- Нельзя использовать `@Input()` и сигнальный `input()`. В этом маленьком примере инпут был бы нормальным решением. Но в реальном приложении нужный компонент может лежать на много уровней глубже, и пробрасывать значение через каждый уровень — плохой дизайн.
- Нельзя просто поменять `DEFAULT_TIMER` или захардкодить `2000` в `TimerComponent`: экран Video должен по-прежнему работать с 1 секундой.

## Критерии успеха

- На `/video` в контейнере написано `timer is 1000`, а счётчик `Timer running` растёт раз в секунду.
- На `/phone` написано `timer is 2000`, а счётчик растёт раз в 2 секунды.
- `TimerContainerComponent` и `TimerComponent` получают значение через DI, а не прямым импортом константы.

## Подсказки

<details>
  <summary>Подсказка 1</summary>

Значение из `import` одно на всё приложение, его нельзя подменить для отдельной ветки дерева компонентов. А зависимость, полученную через `inject()`, можно переопределить в `providers` любого компонента выше по дереву.

</details>

<details>
  <summary>Подсказка 2</summary>

Для примитивных значений (числа, строки, конфиги) класса-сервиса нет, поэтому DI-токеном для них служит `InjectionToken`. Подробнее в статье [Stop being scared of InjectionTokens](https://itnext.io/stop-being-scared-of-injectiontokens-ab22f72f0fe9) (на английском) и в разделе лекции [InjectionToken](../../lecture/basics.md#injectiontoken).

</details>

## Видеоразбор

К задаче есть [видео от Arthur Lannelucq](https://www.youtube.com/watch?v=ntggdQycFyc), но оно на французском. Ниже разбор того же решения на русском.

<details>
  <summary>📺 Разбор на русском (внутри полное решение)</summary>

### 1. Почему глобальная константа не подходит

`DEFAULT_TIMER` импортируется прямо в компоненты. Импорт ES-модуля даёт одно значение на всё приложение, и подменить его для отдельной страницы нельзя. Чтобы значение могло отличаться в разных частях дерева компонентов, его нужно получать через DI, а не через `import`.

### 2. Создаём InjectionToken

Класс-сервис сам служит DI-токеном, а у числа класса нет. Для таких случаев есть `InjectionToken`:

```ts
// data.ts
import { InjectionToken } from '@angular/core';

export const DEFAULT_TIMER = 1000;

export const TIMER = new InjectionToken<number>('timer', {
  providedIn: 'root',
  factory: () => DEFAULT_TIMER,
});
```

- Строка `'timer'` — только описание для сообщений об ошибках и DevTools. Токен уникален потому, что это отдельный объект, а не из-за строки.
- `providedIn: 'root'` вместе с `factory` задают значение по умолчанию. Если ниже по дереву токен никто не переопределил, `inject(TIMER)` вернёт `1000`. Без фабрики провайдер пришлось бы регистрировать вручную, иначе будет `NullInjectorError`.

### 3. Получаем значение через `inject()`

```ts
// timer-container.component.ts
export class TimerContainerComponent {
  timer = inject(TIMER);
}

// timer.component.ts
export class TimerComponent {
  timer = toSignal(interval(inject(TIMER)));
}
```

### 4. Переопределяем значение для экрана Phone

```ts
// phone.component.ts
@Component({
  selector: 'app-phone',
  imports: [TimerContainerComponent],
  providers: [{ provide: TIMER, useValue: 2000 }],
  template: `...`,
})
export default class PhoneComponent {}
```

`providers` у компонента создают ему собственный ElementInjector. Когда `TimerContainerComponent` и `TimerComponent` внутри `PhoneComponent` вызывают `inject(TIMER)`, Angular ищет провайдер снизу вверх, находит его у `PhoneComponent` и возвращает `2000`.

У `VideoComponent` такого провайдера нет. Поиск доходит до root, срабатывает фабрика, и получается `1000`.

### 5. Бонус: функция-провайдер

Чтобы не писать каждый раз `{ provide: ..., useValue: ... }`, обычно делают функцию-хелпер. Так устроены `provideRouter`, `provideHttpClient` и другие встроенные функции Angular:

```ts
// data.ts
export const provideTimer = (timer: number): Provider => ({
  provide: TIMER,
  useValue: timer,
});

// phone.component.ts
providers: [provideTimer(2000)],
```

Ещё один вариант — объявить провайдер на уровне маршрута в `app.config.ts`:

```ts
{
  path: 'phone',
  loadComponent: () => import('./phone.component'),
  providers: [provideTimer(2000)],
},
```

</details>
