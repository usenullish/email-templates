import invitation from "./i18n.json";
import { LinkEmail } from "../link-email/link-email";
import type { Lang } from "../link-email/schema";

export interface InvitationProps {
  url?: string;
  organization?: string;
  expiresOn?: string;
  invitedBy?: string;
}

export const Invitation = ({
  lang,
  url = "[[ nullish.invitation.url ]]",
  organization = "[[ nullish.organization.name ]]",
  expiresOn = "[[ nullish.invitation.expiresOn ]]",
  invitedBy = "[[ nullish.invitation.invitedBy.name ]] ([[ nullish.invitation.invitedBy.email ]])",
}: InvitationProps & { lang: Lang }) => (
  <LinkEmail
    lang={lang}
    i18n={invitation}
    url={url}
    values={{ organization, expiresOn, invitedBy }}
  />
);
