# Control Value Accessor

> author: stanislav-gavrilov

### Run Application

```bash
npx nx serve forms-control-value-accessor
```

### Documentation and Instruction

---
title: 🟠 Control Value Accessor
description: Challenge 41 is about creating a custom form control that implements Control Value Accessor interface.
author: stanislav-gavrilov
contributors:
  - stillst
challengeNumber: 41
command: forms-control-value-accessor
sidebar:
  order: 1
---

## Information

In this challenge, the goal is to create a custom form field that is using the Form API of Angular `ControlValueAccessor`. You can find the documentation [here](https://angular.dev/api/forms/ControlValueAccessor). This interface is crucial for creating custom form controls that can interact seamlessly with Angular's forms API.

## Statement

The primary goal is to use control in the `feedbackForm` to eliminate the need for using `@Output` to retrieve the value and inject it into the `FormGroup`.
Additionally, you are required to integrate validation for the new control to ensure that rating data exist. (The form submission button should be disabled if the form is invalid).

Currently, rating is coded this way:

```html
<app-rating-control (ratingUpdated)="rating = $event"></app-rating-control>
```

```ts
rating: string | null = null;

onFormSubmit(): void {
  this.feedBackSubmit.emit({
    ...this.feedbackForm.value,
    rating: this.rating, // not inside the FormGroup and no validation
  });
}
```

The goal is to include rating into the `FormGroup`

```html
<app-rating-control [formControl]="feedbackForm.controls.rating"></app-rating-control>
```

## RU
---
title: 🟠 Control Value Accessor
description: Испытание 41 про создание пользовательское поле формы которое использует интерфейс ControlValueAccessor.
author: stanislav-gavrilov
contributors:
  - stillst
challengeNumber: 41
command: forms-control-value-accessor
sidebar:
  order: 1
---

## Информация

Цель этого испытания создать пользовательское поле формы, которое использует API формы Angular через `ControlValueAccessor`. Документацию можно посмотреть [здесь](https://angular.dev/api/forms/ControlValueAccessor). Этот интерфейс критически важен для создания пользовательских элементов управления формами, которые могут беспрепятственно взаимодействовать с API форм Angular.

## Пояснение

Задача - использовать контрол в `feedbackForm` напрямую, чтобы убрать необходимость в использовании `@Output` для получения значения из `app-rating-control` и установки его в `FormGroup`.
Кроме того, вы должны добавить валидацию для нового элемента управления, чтобы гарантировать наличие данных о рейтинге. (Кнопка отправки формы должна быть отключена, если форма недействительна).

Сейчас компонент рейтинга используется следующим образом:

```html
<app-rating-control (ratingUpdated)="rating = $event"></app-rating-control>
```

```ts
rating: string | null = null;

onFormSubmit(): void {
  this.feedBackSubmit.emit({
    ...this.feedbackForm.value,
    rating: this.rating, // not inside the FormGroup and no validation
  });
}
```

Необходимо, чтобы компонент можно было использовать так:

```html
<app-rating-control [formControl]="feedbackForm.controls.rating"></app-rating-control>
```
