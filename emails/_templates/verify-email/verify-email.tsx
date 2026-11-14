import verifyEmail from "./i18n.json";
import { LinkEmail } from "../link-email/link-email";
import type { Lang } from "../link-email/schema";

export interface VerifyEmailProps {
  url?: string;
}

export const VerifyEmail = ({
  lang,
  url = "[[ nullish.emailVerification.url ]]",
}: VerifyEmailProps & { lang: Lang }) => <LinkEmail lang={lang} i18n={verifyEmail} url={url} />;
