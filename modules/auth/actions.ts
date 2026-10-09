"use server";

import { redirect } from "next/navigation";

import type { LoginState } from "@/components/common/auth/types";

/**
 * DEMO sign-in for the prototype. Dados e login (G1) replaces the body with
 * Supabase auth (signInWithPassword) and keeps the same LoginState contract.
 */
export async function signIn(_state: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const fieldErrors: LoginState["fieldErrors"] = {};
  if (!email) fieldErrors.email = "email_required";
  else if (!email.toLowerCase().endsWith("@ipt.pt")) fieldErrors.email = "email_not_institutional";
  if (!password) fieldErrors.password = "password_required";
  if (Object.keys(fieldErrors).length > 0) return { fieldErrors, email };

  // Demo only: any institutional email signs in, except this test password.
  if (password === "errada") return { error: "invalid_credentials", email };

  redirect("/portal");
}
