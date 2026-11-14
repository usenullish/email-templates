import { test } from "@playwright/test";
import { TemplatePage } from "./page-objects/template";

const url = "https://nullish.ch/api/auth/verify-email?token=eyJhbGciOiJIUzI1NiJ9&callbackURL=%2F";

test.describe.configure({ mode: "serial" });

test("should contains url", async ({ page }) => {
  const template = await TemplatePage.init({
    page,
    title: "en.tsx",
    path: "/preview/verify-email/en",
  });

  await template.assertLink({ url, text: url });
});

(["light", "dark"] as const).forEach((mode) => {
  test.describe(`${mode} mode`, () => {
    (["en", "de", "fr", "it"] as const).forEach((lang) => {
      test(`verify-email ${lang} layout`, async ({ page }) => {
        const template = await TemplatePage.init({
          page,
          title: `${lang}.tsx`,
          path: `/preview/verify-email/${lang}`,
        });

        if (mode === "dark") {
          await template.toggleDarkMode();
        }

        await template.assertScreenshot({ name: `verify-email-${lang}-${mode}.png` });
      });
    });
  });
});
