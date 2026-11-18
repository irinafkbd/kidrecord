import { create } from "zustand";
import type { FormId } from "@/constants/forms";
import { formatRuDate, formatRuDateTime } from "@/utils/dates";
import type { FormValues } from "@/utils/validation";

export type ChildProfile = {
  name: string;
  birthDate: string;
  details: string;
  sexLabel: string;
  customized: boolean;
};

type RecordsState = {
  child: ChildProfile;
  homeNotes: string[];
  medicalLines: string[];
  vaccinationLines: string[];
  reminderLines: string[];
  heightCm: string;
  weightKg: string;
  growthHistory: string[];
  diaryLines: string[];
  documentLines: string[];
  accessLines: string[];
  saveRecord: (formId: FormId, values: FormValues) => void;
};

const initialMedicalLines = [
  "Аллергии · Добавить сведения",
  "Заболевания · Нет записей",
  "Осмотры · История посещений",
];

export const useRecordsStore = create<RecordsState>((set) => ({
  child: {
    name: "Арина",
    birthDate: "2025-01-12",
    details: "",
    sexLabel: "Пол · Женский",
    customized: false,
  },
  homeNotes: [],
  medicalLines: initialMedicalLines,
  vaccinationLines: [
    "Гепатит B · Выполнено",
    "АКДС · Запланировано",
    "Полиомиелит · Запланировано",
  ],
  reminderLines: [
    "Вакцинация · 15 декабря",
    "Плановый осмотр · 20 декабря",
    "Push-уведомления · Включены",
  ],
  heightCm: "82",
  weightKg: "11,2",
  growthHistory: ["История измерений"],
  diaryLines: [
    "Первые шаги · Записано",
    "Первые слова · Записано",
    "Новые навыки · Добавить",
  ],
  documentLines: [
    "Полис ОМС · Добавлен",
    "Выписка из карты · Нет файла",
    "Результаты анализов · 2 файла",
  ],
  accessLines: [
    "Мама · Владелец",
    "Папа · Полный доступ",
    "Бабушка · Только просмотр",
  ],
  saveRecord: (formId, values) => {
    set((state) => applyRecord(state, formId, values));
  },
}));

function applyRecord(
  state: RecordsState,
  formId: FormId,
  values: FormValues,
): Partial<RecordsState> {
  switch (formId) {
    case "child":
      return {
        child: {
          ...state.child,
          name: values.name.trim(),
          birthDate: values.birthDate,
          details: values.details.trim(),
          customized: true,
        },
      };
    case "quick-action":
      return {
        homeNotes: [
          joinParts(values.subject, formatRuDate(values.date)),
          ...state.homeNotes,
        ],
      };
    case "new-record":
      return {
        homeNotes: [
          joinParts(values.title, formatRuDate(values.date), values.comment),
          ...state.homeNotes,
        ],
      };
    case "medical-record":
      return {
        medicalLines: [
          joinParts(values.kind, formatRuDate(values.visitDate)),
          ...state.medicalLines,
        ],
      };
    case "vaccination":
      return {
        vaccinationLines: [
          joinParts(values.vaccine, formatRuDate(values.date)),
          ...state.vaccinationLines,
        ],
      };
    case "reminder":
      return {
        reminderLines: [
          joinParts(values.title, formatRuDateTime(values.when), values.repeat),
          ...state.reminderLines,
        ],
      };
    case "measurement":
      return {
        heightCm: values.height.replace(".", ","),
        weightKg: values.weight.replace(".", ","),
        growthHistory: [
          joinParts(
            `Рост ${values.height.replace(".", ",")} см`,
            `Вес ${values.weight.replace(".", ",")} кг`,
            formatRuDate(values.date),
          ),
          ...state.growthHistory,
        ],
      };
    case "note":
      return {
        diaryLines: [
          joinParts(values.event, formatRuDate(values.date)),
          ...state.diaryLines,
        ],
      };
    case "document":
      return {
        documentLines: [
          joinParts(values.title, values.kind),
          ...state.documentLines,
        ],
      };
    case "invite":
      return {
        accessLines: [
          joinParts(values.name, values.access),
          ...state.accessLines,
        ],
      };
  }
}

function joinParts(...parts: string[]): string {
  return parts
    .map((part) => part.trim())
    .filter(Boolean)
    .join(" · ");
}
