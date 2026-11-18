import type { Metadata } from "next";
import { AppScreen } from "@/components/screens/app-screen";
import { screens } from "@/constants/screens";

export const metadata: Metadata = {
  title: screens.vaccinations.title,
};

export default function VaccinationsPage() {
  return <AppScreen screenKey="vaccinations" />;
}
