import {
  SubscriptionTrialReminder,
  type SubscriptionTrialReminderProps,
} from "../_templates/subscription-trial-reminder/subscription-trial-reminder";

export const SubscriptionTrialReminderFr = (props: SubscriptionTrialReminderProps) => (
  <SubscriptionTrialReminder lang="fr" {...props} />
);

SubscriptionTrialReminderFr.PreviewProps = {
  url: "https://nullish.ch/orgs/0b6f9c2e-3d4a-4f1b-9e8c-7a5d2c1b0e9f/subscription/plans",
  organization: "Acme GmbH",
  endsOn: "21 novembre 2026",
} as SubscriptionTrialReminderProps;

export default SubscriptionTrialReminderFr;
