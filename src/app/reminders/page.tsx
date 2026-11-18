import type { Metadata } from "next";
import { AppScreen } from "@/components/screens/app-screen";
import { screens } from "@/constants/screens";

export const metadata: Metadata = {
  title: screens.reminders.title,
};

export default function RemindersPage() {
  return <AppScreen screenKey="reminders" />;
}
