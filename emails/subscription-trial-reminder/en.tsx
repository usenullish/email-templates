import {
  SubscriptionTrialReminder,
  type SubscriptionTrialReminderProps,
} from "../_templates/subscription-trial-reminder/subscription-trial-reminder";

export const SubscriptionTrialReminderEn = (props: SubscriptionTrialReminderProps) => (
  <SubscriptionTrialReminder lang="en" {...props} />
);

SubscriptionTrialReminderEn.PreviewProps = {
  url: "https://nullish.ch/orgs/0b6f9c2e-3d4a-4f1b-9e8c-7a5d2c1b0e9f/subscription/plans",
  organization: "Acme GmbH",
  endsOn: "November 21, 2026",
} as SubscriptionTrialReminderProps;

export default SubscriptionTrialReminderEn;
