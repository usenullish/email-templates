import {
  ResetPassword,
  type ResetPasswordProps,
} from "../_templates/reset-password/reset-password";

export const ResetPasswordIt = (props: ResetPasswordProps) => (
  <ResetPassword lang="it" {...props} />
);

ResetPasswordIt.PreviewProps = {
  url: "https://nullish.ch/api/auth/reset-password/eyJhbGciOiJIUzI1NiJ9?callbackURL=%2Freset-password",
} as ResetPasswordProps;

export default ResetPasswordIt;
