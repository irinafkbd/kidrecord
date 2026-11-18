import type { FieldConfig } from "@/constants/forms";

const personNamePattern = /^[A-Za-zА-Яа-яЁё][A-Za-zА-Яа-яЁё' -]{0,79}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const maxFileBytes = 10 * 1024 * 1024;

export type FormValues = Record<string, string>;

export function validateField(
  field: FieldConfig,
  values: FormValues,
  birthDate?: string,
): string | undefined {
  const value = values[field.name]?.trim() ?? "";

  if (!value) {
    return field.required ? `Заполните поле «${field.label}»` : undefined;
  }

  if (field.minLength !== undefined && value.length < field.minLength) {
    return `В поле «${field.label}» нужно не меньше ${field.minLength} символов`;
  }

  if (field.maxLength !== undefined && value.length > field.maxLength) {
    return `В поле «${field.label}» можно не больше ${field.maxLength} символов`;
  }

  if (field.personName && !personNamePattern.test(value)) {
    return "Укажите имя буквами, без цифр";
  }

  if (field.type === "email" && !emailPattern.test(value)) {
    return "Укажите электронную почту, например name@example.com";
  }

  if (field.type === "number") {
    const number = Number(value.replace(",", "."));
    if (!Number.isFinite(number)) {
      return `В поле «${field.label}» нужно число`;
    }
    if (field.min !== undefined && number < field.min) {
      return `Значение «${field.label}» не меньше ${field.min}`;
    }
    if (field.max !== undefined && number > field.max) {
      return `Значение «${field.label}» не больше ${field.max}`;
    }
  }

  if (field.type === "date" || field.type === "datetime") {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return `Укажите корректное значение в поле «${field.label}»`;
    }

    const now = new Date();
    if (field.dateRule === "past-or-today" && date > endOfToday(now)) {
      return "Дата не может быть в будущем";
    }
    if (field.dateRule === "future-or-now" && date.getTime() < now.getTime()) {
      return "Укажите дату и время не раньше текущего момента";
    }
    if (field.name === "birthDate") {
      const oldest = new Date(now);
      oldest.setFullYear(oldest.getFullYear() - 18);
      if (date < oldest) {
        return "Дата рождения должна относиться к ребёнку";
      }
    }
    if (field.afterBirth && birthDate) {
      const birth = new Date(birthDate);
      if (!Number.isNaN(birth.getTime()) && date < startOfDay(birth)) {
        return "Дата не может быть раньше даты рождения";
      }
    }
  }

  return undefined;
}

export function validateForm(
  fields: readonly FieldConfig[],
  values: FormValues,
  birthDate?: string,
): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const field of fields) {
    const message = validateField(field, values, birthDate);
    if (message) {
      errors[field.name] = message;
    }
  }

  return errors;
}

export function validateFile(
  file: File | null,
  required: boolean,
): string | undefined {
  if (!file) {
    return required ? "Выберите файл" : undefined;
  }

  if (file.size > maxFileBytes) {
    return "Файл больше 10 МБ";
  }

  return undefined;
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function endOfToday(now: Date): Date {
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59,
    999,
  );
}
