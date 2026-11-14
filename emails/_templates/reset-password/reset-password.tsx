import resetPassword from "./i18n.json";
import { LinkEmail } from "../link-email/link-email";
import type { Lang } from "../link-email/schema";

export interface ResetPasswordProps {
  url?: string;
}

export const ResetPassword = ({
  lang,
  url = "[[ nullish.passwordReset.url ]]",
}: ResetPasswordProps & { lang: Lang }) => <LinkEmail lang={lang} i18n={resetPassword} url={url} />;
