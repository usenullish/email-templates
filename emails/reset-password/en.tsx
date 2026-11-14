import {
  ResetPassword,
  type ResetPasswordProps,
} from "../_templates/reset-password/reset-password";

export const ResetPasswordEn = (props: ResetPasswordProps) => (
  <ResetPassword lang="en" {...props} />
);

ResetPasswordEn.PreviewProps = {
  url: "https://nullish.ch/api/auth/reset-password/eyJhbGciOiJIUzI1NiJ9?callbackURL=%2Freset-password",
} as ResetPasswordProps;

export default ResetPasswordEn;
