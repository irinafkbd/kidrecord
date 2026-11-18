export type NavItem = {
  href: "/" | "/medical-card" | "/vaccinations" | "/profile";
  label: string;
};

export const NAV_ITEMS = [
  { href: "/", label: "Главная" },
  { href: "/medical-card", label: "Карта" },
  { href: "/vaccinations", label: "Прививки" },
  { href: "/profile", label: "Профиль" },
] as const satisfies readonly NavItem[];
