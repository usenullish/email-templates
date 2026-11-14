import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "react-email";
import type { CSSProperties } from "react";
import common from "./i18n.json";
import { LinkEmailCommonI18nSchema, LinkEmailI18nSchema, type Lang } from "./schema";
import { Logo } from "../../_components/logo";
import { colors, fontFamily } from "../../_components/theme";

export interface LinkEmailProps {
  lang: Lang;
  i18n: unknown;
  url: string;
  values?: Record<string, string>;
}

export const LinkEmail = ({ lang, i18n, url, values = {} }: LinkEmailProps) => {
  const { fallback, tagline } = LinkEmailCommonI18nSchema.parse(common)[lang];

  const format = (text: string): string =>
    text.replace(/\{(\w+)\}/g, (match: string, key: string) => values[key] ?? match);

  const { preview, title, paragraphs, action, disclaimer } = LinkEmailI18nSchema.parse(i18n)[lang];
  const copy = {
    preview: format(preview),
    title: format(title),
    paragraphs: paragraphs.map(format),
    action: format(action),
    disclaimer: format(disclaimer),
  };

  return (
    <Html lang={lang} dir="ltr">
      <Head />
      <Body style={page}>
        <Preview>{copy.preview}</Preview>
        <Container style={container}>
          <Section style={card}>
            <Section data-skip-in-text={true} style={logo}>
              <Logo />
            </Section>

            <Heading as="h1" style={heading}>
              {copy.title}
            </Heading>

            {copy.paragraphs.map((paragraph) => (
              <Text key={paragraph} style={text}>
                {paragraph}
              </Text>
            ))}

            <Section style={actions}>
              <Button href={url} style={button}>
                {copy.action}
              </Button>
            </Section>

            <Section data-skip-in-text={true}>
              <Text style={small}>{fallback}</Text>
              <Link href={url} style={link}>
                {url}
              </Link>
            </Section>

            <Hr style={hr} />

            <Text style={small}>{copy.disclaimer}</Text>
          </Section>

          <Text style={signature}>
            <Link href="https://nullish.ch" style={signatureLink}>
              nullish
            </Link>{" "}
            · {tagline}
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const page: CSSProperties = {
  backgroundColor: colors.page,
  fontFamily,
  margin: 0,
  padding: "32px 16px",
};

const container: CSSProperties = {
  maxWidth: "520px",
  margin: "0 auto",
};

const logo: CSSProperties = {
  color: colors.logo,
};

const card: CSSProperties = {
  backgroundColor: colors.card,
  border: `1px solid ${colors.border}`,
  padding: "32px",
};

const heading: CSSProperties = {
  color: colors.foreground,
  fontFamily,
  fontSize: "20px",
  fontWeight: 700,
  lineHeight: "28px",
  margin: "32px 0 16px",
};

const text: CSSProperties = {
  color: colors.foreground,
  fontFamily,
  fontSize: "14px",
  lineHeight: "22px",
  margin: "0 0 16px",
};

const actions: CSSProperties = {
  margin: "24px 0",
};

const button: CSSProperties = {
  backgroundColor: colors.primary,
  color: colors.primaryForeground,
  fontFamily,
  fontSize: "14px",
  fontWeight: 500,
  lineHeight: "20px",
  textDecoration: "none",
  padding: "10px 16px",
  borderRadius: 0,
};

const small: CSSProperties = {
  color: colors.muted,
  fontFamily,
  fontSize: "12px",
  lineHeight: "18px",
  margin: "0 0 4px",
};

const link: CSSProperties = {
  color: colors.primary,
  fontFamily,
  fontSize: "12px",
  lineHeight: "18px",
  wordBreak: "break-all",
  textDecoration: "underline",
};

const hr: CSSProperties = {
  borderColor: colors.border,
  borderStyle: "solid",
  borderWidth: "1px 0 0",
  margin: "24px 0",
};

const signature: CSSProperties = {
  color: colors.muted,
  fontFamily,
  fontSize: "12px",
  lineHeight: "18px",
  textAlign: "center",
  margin: "16px 0 0",
};

const signatureLink: CSSProperties = {
  color: colors.muted,
  textDecoration: "underline",
};
