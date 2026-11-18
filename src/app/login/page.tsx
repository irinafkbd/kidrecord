import type { Metadata } from "next";
import { AppScreen } from "@/components/screens/app-screen";
import { screens } from "@/constants/screens";

export const metadata: Metadata = {
  title: screens.login.title,
};

export default function LoginPage() {
  return <AppScreen screenKey="login" />;
}
