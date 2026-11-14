import { Invitation, type InvitationProps } from "../_templates/invitation/invitation";

export const InvitationFr = (props: InvitationProps) => <Invitation lang="fr" {...props} />;

InvitationFr.PreviewProps = {
  url: "https://nullish.ch/invitations/accept#Jx3b9Qe7sV1mK4pR8tW2yZ6nC0dF5hL",
  organization: "Acme GmbH",
  expiresOn: "21 novembre 2026",
  invitedBy: "Jane Doe (jane@acme.ch)",
} as InvitationProps;

export default InvitationFr;
