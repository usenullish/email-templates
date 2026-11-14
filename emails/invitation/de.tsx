import { Invitation, type InvitationProps } from "../_templates/invitation/invitation";

export const InvitationDe = (props: InvitationProps) => <Invitation lang="de" {...props} />;

InvitationDe.PreviewProps = {
  url: "https://nullish.ch/invitations/accept#Jx3b9Qe7sV1mK4pR8tW2yZ6nC0dF5hL",
  organization: "Acme GmbH",
  expiresOn: "21. November 2026",
  invitedBy: "Jane Doe (jane@acme.ch)",
} as InvitationProps;

export default InvitationDe;
