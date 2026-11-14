import {
  ResetPassword,
  type ResetPasswordProps,
} from "../_templates/reset-password/reset-password";

export const ResetPasswordDe = (props: ResetPasswordProps) => (
  <ResetPassword lang="de" {...props} />
);

ResetPasswordDe.PreviewProps = {
  url: "https://nullish.ch/api/auth/reset-password/eyJhbGciOiJIUzI1NiJ9?callbackURL=%2Freset-password",
} as ResetPasswordProps;

export default ResetPasswordDe;
