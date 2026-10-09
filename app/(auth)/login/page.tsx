import type { Metadata } from "next";

import { LoginScreen } from "@/components/common/auth/login-screen";
import { signIn } from "@/modules/auth/actions";

export const metadata: Metadata = {
  title: "Entrar · UniPortal",
};

// Thin route: the screen comes from the design system, the action from G1.
export default function LoginPage() {
  return <LoginScreen action={signIn} />;
}
