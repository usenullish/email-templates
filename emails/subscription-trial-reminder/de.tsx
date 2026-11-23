import {
  SubscriptionTrialReminder,
  type SubscriptionTrialReminderProps,
} from "../_templates/subscription-trial-reminder/subscription-trial-reminder";

export const SubscriptionTrialReminderDe = (props: SubscriptionTrialReminderProps) => (
  <SubscriptionTrialReminder lang="de" {...props} />
);

SubscriptionTrialReminderDe.PreviewProps = {
  url: "https://nullish.ch/orgs/0b6f9c2e-3d4a-4f1b-9e8c-7a5d2c1b0e9f/subscription/plans",
  organization: "Acme GmbH",
  endsOn: "21. November 2026",
} as SubscriptionTrialReminderProps;

export default SubscriptionTrialReminderDe;
