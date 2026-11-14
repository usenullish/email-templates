import { expect, FrameLocator, Page } from "@playwright/test";

export interface TemplatePageParams {
  page: Page;
  path: `/${string}`;
  title: string;
}

export class TemplatePage {
  private readonly page: Page;
  private readonly frame: FrameLocator;

  private constructor({ page, frame }: Pick<TemplatePageParams, "page"> & { frame: FrameLocator }) {
    this.page = page;
    this.frame = frame;
  }

  static async init({ title, path, page }: TemplatePageParams): Promise<TemplatePage> {
    await page.goto(path, { waitUntil: "domcontentloaded" });

    const frame = page.frameLocator(`iframe[title="${title}"]`);

    return new TemplatePage({ page, frame });
  }

  async assertText({ text }: { text: string }) {
    await expect(this.frame.getByText(text, { exact: true })).toBeVisible();
  }

  async assertLink({ url, text }: { url: string; text: string }) {
    await expect(this.frame.locator(`a[href="${url}"]`, { hasText: text })).toHaveCount(1);
  }

  async toggleDarkMode() {
    const toggle = this.page.locator('button[value="dark"]');

    await toggle.click();

    await this.page.waitForTimeout(2000);

    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    await expect(this.frame.locator("body[data-applied-color-inversion]")).toHaveCount(1);
  }

  async assertScreenshot({ name }: { name: string }) {
    const html = await this.frame.locator("html").evaluate((element) => element.outerHTML);

    await this.page.setContent(html);

    await expect(this.page).toHaveScreenshot(name, { fullPage: true });
  }
}
