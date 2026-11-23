import subscriptionTrialReminder from "./i18n.json";
import { LinkEmail } from "../link-email/link-email";
import type { Lang } from "../link-email/schema";

export interface SubscriptionTrialReminderProps {
  url?: string;
  organization?: string;
  endsOn?: string;
}

export const SubscriptionTrialReminder = ({
  lang,
  url = "[[ nullish.plans.url ]]",
  organization = "[[ nullish.organization.name ]]",
  endsOn = "[[ nullish.trial.endsOn ]]",
}: SubscriptionTrialReminderProps & { lang: Lang }) => (
  <LinkEmail
    lang={lang}
    i18n={subscriptionTrialReminder}
    url={url}
    values={{ organization, endsOn }}
  />
);
