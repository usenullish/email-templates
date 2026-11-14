import {
  ResetPassword,
  type ResetPasswordProps,
} from "../_templates/reset-password/reset-password";

export const ResetPasswordFr = (props: ResetPasswordProps) => (
  <ResetPassword lang="fr" {...props} />
);

ResetPasswordFr.PreviewProps = {
  url: "https://nullish.ch/api/auth/reset-password/eyJhbGciOiJIUzI1NiJ9?callbackURL=%2Freset-password",
} as ResetPasswordProps;

export default ResetPasswordFr;
