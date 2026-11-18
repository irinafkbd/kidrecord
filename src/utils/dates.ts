export function formatRuDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  if (!year || !month || !day) {
    return isoDate;
  }

  return `${day}.${month}.${year}`;
}

export function formatRuDateTime(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function formatAge(isoDate: string, today = new Date()): string {
  const birth = new Date(isoDate);
  if (Number.isNaN(birth.getTime())) {
    return "возраст не указан";
  }

  let months =
    (today.getFullYear() - birth.getFullYear()) * 12 +
    (today.getMonth() - birth.getMonth());
  if (today.getDate() < birth.getDate()) {
    months -= 1;
  }

  if (months < 0) {
    return "дата в будущем";
  }

  const years = Math.floor(months / 12);
  const restMonths = months % 12;
  const parts = [pluralYears(years), pluralMonths(restMonths)].filter(Boolean);

  return parts.join(" ") || "меньше месяца";
}

function pluralYears(years: number): string {
  if (years === 0) {
    return "";
  }

  const mod10 = years % 10;
  const mod100 = years % 100;
  if (mod10 === 1 && mod100 !== 11) {
    return `${years} год`;
  }
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return `${years} года`;
  }

  return `${years} лет`;
}

function pluralMonths(months: number): string {
  if (months === 0) {
    return "";
  }

  const mod10 = months % 10;
  const mod100 = months % 100;
  if (mod10 === 1 && mod100 !== 11) {
    return `${months} месяц`;
  }
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return `${months} месяца`;
  }

  return `${months} месяцев`;
}
