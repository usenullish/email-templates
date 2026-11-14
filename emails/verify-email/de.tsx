import { VerifyEmail, type VerifyEmailProps } from "../_templates/verify-email/verify-email";

export const VerifyEmailDe = (props: VerifyEmailProps) => <VerifyEmail lang="de" {...props} />;

VerifyEmailDe.PreviewProps = {
  url: "https://nullish.ch/api/auth/verify-email?token=eyJhbGciOiJIUzI1NiJ9&callbackURL=%2F",
} as VerifyEmailProps;

export default VerifyEmailDe;
