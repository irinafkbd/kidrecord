import type { Metadata } from "next";
import { AppScreen } from "@/components/screens/app-screen";
import { screens } from "@/constants/screens";

export const metadata: Metadata = {
  title: screens.developmentDiary.title,
};

export default function DevelopmentDiaryPage() {
  return <AppScreen screenKey="developmentDiary" />;
}
