import type { Metadata } from "next";
import { AppScreen } from "@/components/screens/app-screen";
import { screens } from "@/constants/screens";

export const metadata: Metadata = {
  title: screens.medicalCard.title,
};

export default function MedicalCardPage() {
  return <AppScreen screenKey="medicalCard" />;
}
