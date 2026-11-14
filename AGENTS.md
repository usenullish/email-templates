# nullish email templates

This project holds the emails sent by nullish. You help change how they look or read. Read `README.md` first: it explains the project from the user's side.

These are the notifications nullish sends itself (account emails, invitations). They ship with nullish and only those who self-host can change them, by mounting their exported `templates` folder and setting `NULLISH_MAIL_TEMPLATES_DIR`. An email falls back to the built-in template when a subject, HTML or text is missing or empty for its language. This project only holds those notifications.

An email is one self-contained HTML file and one plain-text file per language, written with React Email. nullish fills them with LiquidJS and sends them.

`npm run export` renders each email in `emails/<type>/<lang>.tsx` to `templates/<type>/html/<lang>.html` and `templates/<type>/text/<lang>.txt`, and writes the subjects of `emails/_templates/<type>/i18n.json` to `templates/<type>/subject.json`. It runs `export.sh`, which exports each folder of `emails/` that doesn't start with `_`, then `export.subjects.mjs`, which writes the `subject.json` files.

## Where to work

Each email has its own folder in `emails/_templates/<type>/`, with its component and its texts. The invitation is a complete example:

- `emails/_templates/invitation/invitation.tsx`: the email. Its props default to the Liquid placeholders.
- `emails/_templates/invitation/i18n.json`: the texts, keyed by language: `en`, `de`, `fr` and `it`.
- `emails/_templates/link-email/link-email.tsx`: the layout shared by the emails. It parses the texts and fills the `{value}` tokens.
- `emails/_templates/link-email/schema.ts`: the Zod schemas of the texts and the `Lang` type.
- `emails/_templates/link-email/i18n.json`: the texts of the layout itself (fallback line and footer tagline).
- `emails/_components/theme.ts`: colors and font. `emails/_components/logo.tsx`: the inline SVG logo.
- `emails/<type>/<lang>.tsx`: one file per language, the entry points of React Email. They only set `lang` and the `PreviewProps`. Keep them that way.

Folders starting with `_` are not emails: React Email skips them.

Don't change `package.json` scripts or the workflows in `.github/` unless the user asks for it.

## Rules for templates

### Data

- The data is under `nullish`, grouped by object, e.g. `nullish.invitation.url`, `nullish.organization.name`. The tables in `README.md` are the reference: use only fields listed there, with their exact names.
- Values are already formatted strings (dates in the language of the email). Don't format them again.
- Fields that can be empty must be wrapped in `[% if %]`.
- A new field needs nullish to send it. Tell the user when a change needs one.

### Syntax

- LiquidJS with custom delimiters: `[[ value ]]` for output, `[% tag %]` for tags, e.g. `[% if %]…[% else %]…[% endif %]`.
- Never write `{{ }}` or `{% %}`.
- Placeholders are the default values of the props of the template component, e.g. `url = "[[ nullish.passwordReset.url ]]"`. The export renders without props, so it keeps the placeholders. The preview passes the `PreviewProps` of `emails/<type>/<lang>.tsx` instead.
- Output is HTML-escaped in the HTML version. The plain-text version is rendered without escaping.
- `<Preview>` cuts its text after 200 characters. Don't put long Liquid tags in `preview`, or the cut breaks them.

### Texts

- Texts are in the `i18n.json` of each email. Every language needs every key of `schema.ts`, with a text that isn't empty.
- `subject` is not rendered by the email: it goes to `subject.json` as is. Write its data as Liquid placeholders, e.g. `[[ nullish.organization.name ]]`, not `{value}` tokens.
- Values in texts are written `{name}` and filled by `LinkEmail` from its `values` prop. Pass every token the texts use.
- Write for people: short, plain sentences, one idea each. Use `du` / `tu` / informal Italian, like the nullish app. German is Swiss: `ss`, never `ß`. Keep Italian neutral in gender where you can.
- The brand is written `nullish`, in lowercase.

### Layout

- Style with inline style objects (`CSSProperties`), as React Email does. Take colors and the font from `theme.ts`.
- The emails are light only. Don't add `prefers-color-scheme` media queries, `color-scheme` meta tags or theme classes.
- The exported files must be self-contained: inline images as SVG. Never reference external URLs for images, styles or fonts.
- Colors that should follow a client's dark mode must be set with `color` or `background-color` on HTML elements. For SVG, use `fill="currentColor"` and set `color` on the HTML element around it.
- Don't add comments in code.

## Checking your work

1. Run `npm run lint`, `npm run fmt:check` and `npm run typecheck`. They must pass.
2. Run `npm run export`. Check that each email has its four languages in `templates/<type>/html/` and `templates/<type>/text/`, and a `templates/<type>/subject.json` with the four subjects.
3. Render each exported file with sample data, using the same settings as nullish, and check that nothing throws:

   ```js
   import { Liquid } from "liquidjs";
   import fs from "node:fs";

   const options = {
     outputDelimiterLeft: "[[",
     outputDelimiterRight: "]]",
     tagDelimiterLeft: "[%",
     tagDelimiterRight: "%]",
     strictVariables: true,
     lenientIf: true,
   };

   const html = new Liquid({ ...options, outputEscape: "escape" });
   const text = new Liquid(options);

   const data = {
     nullish: {
       organization: { name: "Acme GmbH" },
       invitation: {
         url: "https://nullish.ch/invitations/accept#token",
         expiresOn: "21 novembre 2026",
         invitedBy: { name: "Jane Doe", email: "jane@acme.ch" },
       },
     },
   };

   for (const lang of ["en", "fr", "de", "it"]) {
     await html.parseAndRender(
       fs.readFileSync(`templates/invitation/html/${lang}.html`, "utf8"),
       data,
     );
     await text.parseAndRender(
       fs.readFileSync(`templates/invitation/text/${lang}.txt`, "utf8"),
       data,
     );
   }
   ```

   If you changed an optional field, also render with it set to `null`.

4. Tell the user to check the result in the preview (`npm run dev`), since layout can only be judged visually.

## Working with the user

- Do what is asked, and keep changes small and in the existing style.
- Ask before structural changes: renaming or moving files, new dependencies, changes to the export or the workflows.
- When the user asks "why", explain. Change code only when asked.

## References

- React Email: https://react.email/docs
- LiquidJS: https://liquidjs.com
- Zod: https://zod.dev
