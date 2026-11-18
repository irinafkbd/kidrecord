import type { Metadata } from "next";
import { AppScreen } from "@/components/screens/app-screen";
import { screens } from "@/constants/screens";

export const metadata: Metadata = {
  title: screens.growth.title,
};

export default function GrowthPage() {
  return <AppScreen screenKey="growth" />;
}
