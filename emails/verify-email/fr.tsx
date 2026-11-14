import { VerifyEmail, type VerifyEmailProps } from "../_templates/verify-email/verify-email";

export const VerifyEmailFr = (props: VerifyEmailProps) => <VerifyEmail lang="fr" {...props} />;

VerifyEmailFr.PreviewProps = {
  url: "https://nullish.ch/api/auth/verify-email?token=eyJhbGciOiJIUzI1NiJ9&callbackURL=%2F",
} as VerifyEmailProps;

export default VerifyEmailFr;
