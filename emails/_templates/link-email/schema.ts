import * as z from "zod";

export const LangSchema = z.enum(["en", "de", "fr", "it"]);

export type Lang = z.infer<typeof LangSchema>;

export const LinkEmailTranslationSchema = z.strictObject({
  subject: z.string().min(1),
  preview: z.string().min(1),
  title: z.string().min(1),
  paragraphs: z.array(z.string().min(1)).min(1),
  action: z.string().min(1),
  disclaimer: z.string().min(1),
});

export const LinkEmailI18nSchema = z.record(LangSchema, LinkEmailTranslationSchema);

export const LinkEmailCommonI18nSchema = z.record(
  LangSchema,
  z.strictObject({
    fallback: z.string().min(1),
    tagline: z.string().min(1),
  }),
);
