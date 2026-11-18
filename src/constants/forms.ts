export const FORM_IDS = [
  "new-record",
  "quick-action",
  "child",
  "medical-record",
  "vaccination",
  "reminder",
  "measurement",
  "note",
  "document",
  "invite",
] as const;

export type FormId = (typeof FORM_IDS)[number];

export type FieldType =
  "text" | "date" | "datetime" | "number" | "email" | "select" | "file";

export type DateRule = "past-or-today" | "future-or-now" | "any";

export type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
  placeholder: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  dateRule?: DateRule;
  afterBirth?: boolean;
  personName?: boolean;
  options?: readonly { value: string; label: string }[];
};

export type FormConfig = {
  id: FormId;
  title: string;
  description: string;
  returnTo: string;
  fields: readonly FieldConfig[];
};

const textPlaceholder = "Введите значение…";
const selectPlaceholder = "Выберите значение…";

const recordTypes = [
  { value: "Аллергия", label: "Аллергия" },
  { value: "Заболевание", label: "Заболевание" },
  { value: "Лекарство", label: "Лекарство" },
  { value: "Осмотр", label: "Осмотр" },
  { value: "Заметка", label: "Заметка" },
] as const;

const documentTypes = [
  { value: "Полис ОМС", label: "Полис ОМС" },
  { value: "Выписка из карты", label: "Выписка из карты" },
  { value: "Результаты анализов", label: "Результаты анализов" },
  { value: "Другое", label: "Другое" },
] as const;

const accessLevels = [
  { value: "Полный доступ", label: "Полный доступ" },
  { value: "Только просмотр", label: "Только просмотр" },
] as const;

const reminderRepeats = [
  { value: "Без повтора", label: "Без повтора" },
  { value: "За день", label: "За день" },
  { value: "В день события", label: "В день события" },
] as const;

function textField(
  name: string,
  label: string,
  options: Partial<FieldConfig> = {},
): FieldConfig {
  return {
    name,
    label,
    type: "text",
    required: true,
    placeholder: textPlaceholder,
    minLength: 2,
    maxLength: 120,
    ...options,
  };
}

export const forms: Record<FormId, FormConfig> = {
  "new-record": {
    id: "new-record",
    title: "Новая запись",
    description: "Заполните поля и сохраните запись",
    returnTo: "/",
    fields: [
      textField("title", "Название записи"),
      {
        name: "date",
        label: "Дата",
        type: "date",
        required: true,
        placeholder: textPlaceholder,
        dateRule: "past-or-today",
        afterBirth: true,
      },
      textField("comment", "Комментарий", {
        required: false,
        maxLength: 500,
      }),
    ],
  },
  "quick-action": {
    id: "quick-action",
    title: "Быстрое действие",
    description: "Заполните поля и сохраните запись",
    returnTo: "/",
    fields: [
      textField("subject", "Что добавить"),
      {
        name: "date",
        label: "Дата",
        type: "date",
        required: true,
        placeholder: textPlaceholder,
        dateRule: "any",
      },
      textField("comment", "Комментарий", {
        required: false,
        maxLength: 500,
      }),
    ],
  },
  child: {
    id: "child",
    title: "Данные ребёнка",
    description: "Заполните поля и сохраните запись",
    returnTo: "/profile",
    fields: [
      textField("name", "Имя", { personName: true, maxLength: 80 }),
      {
        name: "birthDate",
        label: "Дата рождения",
        type: "date",
        required: true,
        placeholder: textPlaceholder,
        dateRule: "past-or-today",
      },
      textField("details", "Дополнительные сведения", {
        required: false,
        maxLength: 500,
      }),
    ],
  },
  "medical-record": {
    id: "medical-record",
    title: "Медицинская запись",
    description: "Заполните поля и сохраните запись",
    returnTo: "/medical-card",
    fields: [
      {
        name: "kind",
        label: "Тип записи",
        type: "select",
        required: true,
        placeholder: selectPlaceholder,
        options: recordTypes,
      },
      {
        name: "visitDate",
        label: "Дата посещения",
        type: "date",
        required: true,
        placeholder: textPlaceholder,
        dateRule: "past-or-today",
        afterBirth: true,
      },
      textField("description", "Описание", { maxLength: 500 }),
    ],
  },
  vaccination: {
    id: "vaccination",
    title: "Новая прививка",
    description: "Заполните поля и сохраните запись",
    returnTo: "/vaccinations",
    fields: [
      textField("vaccine", "Название вакцины"),
      {
        name: "date",
        label: "Дата вакцинации",
        type: "date",
        required: true,
        placeholder: textPlaceholder,
        dateRule: "past-or-today",
        afterBirth: true,
      },
      textField("comment", "Серия / комментарий", {
        required: false,
        maxLength: 200,
      }),
    ],
  },
  reminder: {
    id: "reminder",
    title: "Новое напоминание",
    description: "Заполните поля и сохраните запись",
    returnTo: "/reminders",
    fields: [
      textField("title", "Название события"),
      {
        name: "when",
        label: "Дата и время",
        type: "datetime",
        required: true,
        placeholder: textPlaceholder,
        dateRule: "future-or-now",
      },
      {
        name: "repeat",
        label: "Повтор / уведомление",
        type: "select",
        required: true,
        placeholder: selectPlaceholder,
        options: reminderRepeats,
      },
    ],
  },
  measurement: {
    id: "measurement",
    title: "Новое измерение",
    description: "Заполните поля и сохраните запись",
    returnTo: "/growth",
    fields: [
      {
        name: "height",
        label: "Рост, см",
        type: "number",
        required: true,
        placeholder: textPlaceholder,
        min: 30,
        max: 220,
      },
      {
        name: "weight",
        label: "Вес, кг",
        type: "number",
        required: true,
        placeholder: textPlaceholder,
        min: 0.5,
        max: 150,
      },
      {
        name: "date",
        label: "Дата измерения",
        type: "date",
        required: true,
        placeholder: textPlaceholder,
        dateRule: "past-or-today",
        afterBirth: true,
      },
    ],
  },
  note: {
    id: "note",
    title: "Новая заметка",
    description: "Заполните поля и сохраните запись",
    returnTo: "/development-diary",
    fields: [
      textField("event", "Событие или навык"),
      {
        name: "date",
        label: "Дата",
        type: "date",
        required: true,
        placeholder: textPlaceholder,
        dateRule: "past-or-today",
        afterBirth: true,
      },
      textField("description", "Описание", { maxLength: 500 }),
    ],
  },
  document: {
    id: "document",
    title: "Загрузить документ",
    description: "Заполните поля и сохраните запись",
    returnTo: "/documents",
    fields: [
      textField("title", "Название документа"),
      {
        name: "kind",
        label: "Тип документа",
        type: "select",
        required: true,
        placeholder: selectPlaceholder,
        options: documentTypes,
      },
      {
        name: "fileName",
        label: "Выбрать файл",
        type: "file",
        required: true,
        placeholder: "Файл не выбран",
      },
    ],
  },
  invite: {
    id: "invite",
    title: "Пригласить пользователя",
    description: "Заполните поля и сохраните запись",
    returnTo: "/access",
    fields: [
      textField("name", "Имя пользователя", {
        personName: true,
        maxLength: 80,
      }),
      {
        name: "email",
        label: "Электронная почта",
        type: "email",
        required: true,
        placeholder: textPlaceholder,
        maxLength: 254,
      },
      {
        name: "access",
        label: "Уровень доступа",
        type: "select",
        required: true,
        placeholder: selectPlaceholder,
        options: accessLevels,
      },
    ],
  },
};

export function isFormId(value: string): value is FormId {
  return FORM_IDS.some((formId) => formId === value);
}
