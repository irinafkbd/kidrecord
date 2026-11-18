"use client";

import { Screen } from "@/layouts/screen";
import type { ScreenKey } from "@/constants/screens";
import { screens } from "@/constants/screens";
import type { CardLine, ScreenContent } from "@/constants/screens";
import { useRecordsStore } from "@/store/use-records-store";
import { formatAge, formatRuDate } from "@/utils/dates";

const actionHref: Record<ScreenKey, string> = {
  login: "/forms/child",
  home: "/forms/quick-action",
  profile: "/forms/child",
  medicalCard: "/forms/medical-record",
  vaccinations: "/forms/vaccination",
  reminders: "/forms/reminder",
  growth: "/forms/measurement",
  developmentDiary: "/forms/note",
  documents: "/forms/document",
  access: "/forms/invite",
};

const addHref: Record<ScreenKey, string> = {
  ...actionHref,
  login: "/forms/new-record",
  home: "/forms/new-record",
};

type AppScreenProps = {
  screenKey: ScreenKey;
};

export function AppScreen({ screenKey }: AppScreenProps) {
  const records = useRecordsStore();
  const source = screens[screenKey];
  const content: ScreenContent = {
    title: source.title,
    actionLabel: source.actionLabel,
    actionHref: actionHref[screenKey],
    cards: source.cards.map((card, index) => ({
      title: cardTitle(screenKey, index, card.title, records),
      lines: cardLines(
        screenKey,
        index,
        card.lines,
        addHref[screenKey],
        records,
      ),
    })),
  };

  return <Screen content={content} />;
}

function cardTitle(
  screenKey: ScreenKey,
  index: number,
  title: string,
  records: ReturnType<typeof useRecordsStore.getState>,
): string {
  if (screenKey === "home" && index === 0) {
    if (!records.child.customized) {
      return title;
    }

    return `${records.child.name} · ${formatAge(records.child.birthDate)}`;
  }

  return title;
}

function cardLines(
  screenKey: ScreenKey,
  index: number,
  lines: readonly string[],
  href: string,
  records: ReturnType<typeof useRecordsStore.getState>,
): CardLine[] {
  const source = index === 0 ? dynamicLines(screenKey, lines, records) : lines;

  return source.map((line) =>
    line.startsWith("＋") ? { text: line, href } : { text: line },
  );
}

function dynamicLines(
  screenKey: ScreenKey,
  fallback: readonly string[],
  records: ReturnType<typeof useRecordsStore.getState>,
): readonly string[] {
  switch (screenKey) {
    case "home":
      return [
        "Следующая прививка · по календарю",
        ...records.homeNotes,
        "Последние показатели",
        `Рост ${records.heightCm} см · Вес ${records.weightKg} кг`,
      ];
    case "profile":
      return [
        `Дата рождения · ${formatRuDate(records.child.birthDate)}`,
        records.child.sexLabel,
        records.child.customized
          ? `Возраст · ${formatAge(records.child.birthDate)}`
          : "Возраст · 1 год 9 месяцев",
        ...(records.child.details ? [records.child.details] : []),
      ];
    case "medicalCard":
      return records.medicalLines;
    case "vaccinations":
      return records.vaccinationLines;
    case "reminders":
      return records.reminderLines;
    case "growth":
      return [
        `Рост · ${records.heightCm} см`,
        `Вес · ${records.weightKg} кг`,
        ...records.growthHistory,
      ];
    case "developmentDiary":
      return records.diaryLines;
    case "documents":
      return records.documentLines;
    case "access":
      return records.accessLines;
    default:
      return fallback;
  }
}
