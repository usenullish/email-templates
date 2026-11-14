import { test } from "@playwright/test";
import { TemplatePage } from "./page-objects/template";

const url = "https://nullish.ch/invitations/accept#Jx3b9Qe7sV1mK4pR8tW2yZ6nC0dF5hL";

test.describe.configure({ mode: "serial" });

test("should contains url", async ({ page }) => {
  const template = await TemplatePage.init({
    page,
    title: "en.tsx",
    path: "/preview/invitation/en",
  });

  await template.assertLink({ url, text: url });
});

(["light", "dark"] as const).forEach((mode) => {
  test.describe(`${mode} mode`, () => {
    (["en", "de", "fr", "it"] as const).forEach((lang) => {
      test(`invitation ${lang} layout`, async ({ page }) => {
        const template = await TemplatePage.init({
          page,
          title: `${lang}.tsx`,
          path: `/preview/invitation/${lang}`,
        });

        if (mode === "dark") {
          await template.toggleDarkMode();
        }

        await template.assertScreenshot({ name: `invitation-${lang}-${mode}.png` });
      });
    });
  });
});
