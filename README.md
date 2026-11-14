# nullish email templates

The emails sent by [nullish](https://nullish.ch), e.g. to verify an email address or to invite someone to an organization.

Templates are written with [React Email](https://react.email). Each email is exported as one HTML file and one plain-text file per language. nullish fills them with the data of the email and sends them.

> [!NOTE]
> These are the notifications nullish itself sends, such as account emails and invitations. They are part of nullish: only those who self-host it can change them, by replacing the exported files.

## Getting started

1. Clone the repository and install the dependencies:

```sh
npm install
```

2. Start the preview:

```sh
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000).

## What to edit

Each email has its own folder in `emails/_templates/`. For the invitation, it's `emails/_templates/invitation/`, and you'll mostly work in two files:

- `invitation.tsx` is the email: which texts and data it shows.
- `i18n.json` holds the texts, in English, French, German and Italian.

The emails share one layout, `emails/_templates/link-email/link-email.tsx`: the logo, a title, a few paragraphs, a button with a link, a note and the footer.

Open a file with the preview next to it, change something and save: the preview updates right away.

## Emails

| Email          | Sent when                                                   | Folder                             |
| -------------- | ----------------------------------------------------------- | ---------------------------------- |
| Verify email   | A user signs up, or signs in before verifying their address | `emails/_templates/verify-email`   |
| Reset password | A user asks to reset their password                         | `emails/_templates/reset-password` |
| Invitation     | A member of an organization invites someone to join it      | `emails/_templates/invitation`     |

## Writing a template

### Data

When nullish sends an email, it fills the template with its data. In the template, that data sits under the namespace `nullish`.

What `nullish` contains depends on the email.

#### Verify email

| Field                           | Type | Can be empty | Description                      |
| ------------------------------- | ---- | ------------ | -------------------------------- |
| `nullish.emailVerification.url` | URL  | no           | Link to verify the email address |

#### Reset password

| Field                       | Type | Can be empty | Description                   |
| --------------------------- | ---- | ------------ | ----------------------------- |
| `nullish.passwordReset.url` | URL  | no           | Link to choose a new password |

#### Invitation

| Field                                | Type | Can be empty | Description                                |
| ------------------------------------ | ---- | ------------ | ------------------------------------------ |
| `nullish.invitation.url`             | URL  | no           | Link to open the invitation                |
| `nullish.organization.name`          | text | no           | Name of the organization                   |
| `nullish.invitation.expiresOn`       | date | no           | Date the invitation expires                |
| `nullish.invitation.invitedBy.name`  | text | no           | Name of the person who sent the invitation |
| `nullish.invitation.invitedBy.email` | text | no           | Email address of the person who sent it    |

All values are already formatted, in the language of the email. Don't format them again.

Fields that can be empty may be missing or `null`. Wrap them in `[% if %]`, see [Syntax](#syntax).

### Syntax

An email is exported once, but its data changes with every email nullish sends. So the template holds placeholders, like `[[ nullish.passwordReset.url ]]`, and nullish fills them in when it sends the email.

Write them as the default values of the props. The export keeps them, while the preview replaces them with sample values:

```tsx
export const ResetPassword = ({
  lang,
  url = "[[ nullish.passwordReset.url ]]",
}: ResetPasswordProps & { lang: Lang }) => <LinkEmail lang={lang} i18n={resetPassword} url={url} />;
```

- `[[ … ]]` prints a value. It is HTML-escaped.
- `[% … %]` is a tag: `if`, `unless`, comparisons, e.g. `[% if nullish.organization.name %]…[% endif %]`.

> [!TIP]
> Placeholders are rendered with [LiquidJS](https://liquidjs.com). Its [documentation](https://liquidjs.com/tutorials/intro-to-liquid.html) lists everything you can use.

### Texts in several languages

Each email supports four languages. Its texts come from the `i18n.json` next to it, one entry per language:

```json
{
  "en": {
    "subject": "Reset your password",
    "preview": "Choose a new password for your nullish account.",
    "title": "Reset your password",
    "paragraphs": ["We received a request to reset the password of your nullish account."],
    "action": "Reset password",
    "disclaimer": "If you did not ask to reset your password, you can safely ignore this email."
  },
  "de": { … },
  "fr": { … },
  "it": { … }
}
```

| Key          | Where it appears                                              |
| ------------ | ------------------------------------------------------------- |
| `subject`    | The subject of the email                                      |
| `preview`    | The short text shown after the subject in the inbox           |
| `title`      | The heading at the top of the email                           |
| `paragraphs` | The body, one entry per paragraph                             |
| `action`     | The label of the button                                       |
| `disclaimer` | The note below the button, e.g. what to do if it's unexpected |

Every language needs every key, with a text that isn't empty. The texts are checked when the email is previewed or exported.

Texts can contain values in curly braces, e.g. `{organization}`. The email replaces them with its data:

```json
"paragraphs": ["{invitedBy} invited you to join {organization} on nullish."]
```

The `subject` isn't part of the email itself: it's exported to `subject.json`, see [Exporting](#exporting). Write its data as placeholders:

```json
"subject": "You've been invited to join [[ nullish.organization.name ]] on nullish"
```

### Layout and styling

Style with inline styles, as React Email does. The colors and the font are in `emails/_components/theme.ts`.

The emails are light. Email clients that use a dark mode adapt the colors themselves. To see roughly how, use the dark mode toggle of the preview.

### Images and fonts

The exported files **must not** depend on other files or on external resources.

- Inline images as SVG, like the logo in `emails/_components/logo.tsx`.
- Fonts can't be loaded. The emails use JetBrains Mono when it's installed, and the system's monospace font otherwise.

### Plain text

The plain-text version is generated from the HTML. To leave an element out of it, e.g. the logo, wrap it in a `Section` with `data-skip-in-text={true}`.

## Exporting

When the templates are ready, export them:

```sh
npm run export
```

This writes one HTML and one plain-text file per email and language, and a `subject.json` with the subject in each language:

```
templates/invitation/html/en.html
templates/invitation/html/fr.html
templates/invitation/html/de.html
templates/invitation/html/it.html
templates/invitation/text/en.txt
…
templates/invitation/subject.json
```

```json
{
  "en": "You've been invited to join [[ nullish.organization.name ]] on nullish",
  "de": "Du wurdest eingeladen, [[ nullish.organization.name ]] auf nullish beizutreten",
  …
}
```

## Using the templates in nullish

The templates are released with this repository: each release attaches the exported files as `templates.tar.gz`. nullish ships them and uses them to send its emails.

To use your own version when self-hosting, export it, mount the `templates` folder in the nullish server and point `NULLISH_MAIL_TEMPLATES_DIR` to it:

```yaml title="docker-compose.yml"
server:
  environment:
    NULLISH_MAIL_TEMPLATES_DIR: /templates
  volumes:
    - ./templates:/templates:ro
```

An email uses your template when its subject, HTML and text exist for its language and aren't empty. Otherwise it falls back to the built-in one. Changes apply to the next email, without a restart. See [Self-hosting](https://nullish.ch/en/developers/self-hosting/#your-own-templates).
