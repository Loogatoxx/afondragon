/**
 * Result of a sign-in attempt. Error codes stay in English (project rule);
 * the form maps them to Portuguese messages and never shows raw errors.
 */
export type LoginErrorCode =
  | "email_required"
  | "email_not_institutional"
  | "password_required"
  | "invalid_credentials"
  | "unexpected";

export type LoginState = {
  error?: LoginErrorCode;
  fieldErrors?: Partial<Record<"email" | "password", LoginErrorCode>>;
  /** Echo of the typed email, so it is not lost after an error */
  email?: string;
};

/** Server action signature expected by <LoginForm action={...} />. */
export type LoginAction = (state: LoginState, formData: FormData) => Promise<LoginState>;
