export type CardLine = {
  text: string;
  href?: string;
};

export type InfoCardContent = {
  title: string;
  lines: readonly CardLine[];
};

export type ScreenContent = {
  title: string;
  cards: readonly InfoCardContent[];
  actionLabel: string;
  actionHref: string;
};

const editableNote = {
  title: "Дополнительная информация",
  lines: ["Все данные можно редактировать", "＋ Добавить запись"],
} as const;

export const screens = {
  login: {
    title: "Авторизация",
    cards: [
      {
        title: "Добро пожаловать",
        lines: [
          "Создайте профиль ребёнка",
          "Вход по телефону или почте",
          "Продолжить",
        ],
      },
      editableNote,
    ],
    actionLabel: "Продолжить",
    actionHref: "/",
  },
  home: {
    title: "Главная",
    cards: [
      {
        title: "Арина · 1 год 9 месяцев",
        lines: [
          "Следующая прививка · по календарю",
          "Последние показатели",
          "Рост 82 см · Вес 11,2 кг",
        ],
      },
      editableNote,
    ],
    actionLabel: "＋ Добавить",
  },
  profile: {
    title: "Профиль ребёнка",
    cards: [
      {
        title: "Профиль ребёнка",
        lines: [
          "Дата рождения · 12.01.2025",
          "Пол · Женский",
          "Возраст · 1 год 9 месяцев",
        ],
      },
      editableNote,
    ],
    actionLabel: "＋ Добавить",
  },
  medicalCard: {
    title: "Медицинская карта",
    cards: [
      {
        title: "Основные сведения",
        lines: [
          "Аллергии · Добавить сведения",
          "Заболевания · Нет записей",
          "Осмотры · История посещений",
        ],
      },
      editableNote,
    ],
    actionLabel: "＋ Добавить",
  },
  vaccinations: {
    title: "Календарь прививок",
    cards: [
      {
        title: "Ближайшие прививки",
        lines: [
          "Гепатит B · Выполнено",
          "АКДС · Запланировано",
          "Полиомиелит · Запланировано",
        ],
      },
      {
        title: "История и статусы",
        lines: ["Все данные можно редактировать", "＋ Добавить запись"],
      },
    ],
    actionLabel: "＋ Добавить",
  },
  reminders: {
    title: "Напоминания",
    cards: [
      {
        title: "Активные напоминания",
        lines: [
          "Вакцинация · 15 декабря",
          "Плановый осмотр · 20 декабря",
          "Push-уведомления · Включены",
        ],
      },
      editableNote,
    ],
    actionLabel: "＋ Добавить",
  },
  growth: {
    title: "Рост и вес",
    cards: [
      {
        title: "Последние показатели",
        lines: ["Рост · 82 см", "Вес · 11,2 кг", "История измерений"],
      },
      {
        title: "Динамика развития",
        lines: ["Все данные можно редактировать", "＋ Добавить запись"],
      },
    ],
    actionLabel: "＋ Добавить",
  },
  developmentDiary: {
    title: "Дневник развития",
    cards: [
      {
        title: "Дневник развития",
        lines: [
          "Первые шаги · Записано",
          "Первые слова · Записано",
          "Новые навыки · Добавить",
        ],
      },
      editableNote,
    ],
    actionLabel: "＋ Добавить",
  },
  documents: {
    title: "Медицинские документы",
    cards: [
      {
        title: "Медицинские документы",
        lines: [
          "Полис ОМС · Добавлен",
          "Выписка из карты · Нет файла",
          "Результаты анализов · 2 файла",
        ],
      },
      editableNote,
    ],
    actionLabel: "＋ Добавить",
  },
  access: {
    title: "Управление доступом",
    cards: [
      {
        title: "Доступ к профилю",
        lines: [
          "Мама · Владелец",
          "Папа · Полный доступ",
          "Бабушка · Только просмотр",
        ],
      },
      {
        title: "Безопасность",
        lines: ["Все данные можно редактировать", "＋ Добавить запись"],
      },
    ],
    actionLabel: "＋ Добавить",
  },
} as const;

export type ScreenKey = keyof typeof screens;
