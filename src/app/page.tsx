import type { Metadata } from "next";
import { AppScreen } from "@/components/screens/app-screen";
import { APP_NAME } from "@/constants/app";
import { screens } from "@/constants/screens";

export const metadata: Metadata = {
  title: {
    absolute: `${screens.home.title} · ${APP_NAME}`,
  },
};

export default function HomePage() {
  return <AppScreen screenKey="home" />;
}
