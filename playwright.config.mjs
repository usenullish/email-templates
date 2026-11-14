import { defineConfig, devices } from "@playwright/test";

const DEV = (process.env.NODE_ENV ?? "production") === "development";
const PORT = 3000;

export default defineConfig({
  webServer: {
    command: "npm run dev",
    reuseExistingServer: !process.env.CI,
    port: PORT,
  },
  testDir: "tests",
  testMatch: ["**/*.spec.ts"],
  fullyParallel: false,
  use: {
    trace: "on",
    ...(DEV && { headless: false }),
    screenshot: "only-on-failure",
    baseURL: `http://localhost:${PORT}`,
  },
  projects: [
    {
      name: "Google Chrome",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },
  ],
  workers: 1,
  snapshotPathTemplate: `{testDir}/__screenshots__/${process.env.NODE_ENV ?? "production"}/{testFilePath}/{arg}{ext}`,
});
