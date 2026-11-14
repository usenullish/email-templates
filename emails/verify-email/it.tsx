import { VerifyEmail, type VerifyEmailProps } from "../_templates/verify-email/verify-email";

export const VerifyEmailIt = (props: VerifyEmailProps) => <VerifyEmail lang="it" {...props} />;

VerifyEmailIt.PreviewProps = {
  url: "https://nullish.ch/api/auth/verify-email?token=eyJhbGciOiJIUzI1NiJ9&callbackURL=%2F",
} as VerifyEmailProps;

export default VerifyEmailIt;
