import type { Metadata } from "next";
import { AppScreen } from "@/components/screens/app-screen";
import { screens } from "@/constants/screens";

export const metadata: Metadata = {
  title: screens.access.title,
};

export default function AccessPage() {
  return <AppScreen screenKey="access" />;
}
