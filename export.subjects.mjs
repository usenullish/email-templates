import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const templates = join(process.cwd(), "templates");

for (const type of await readdir(templates)) {
  const i18n = JSON.parse(
    await readFile(join(process.cwd(), "emails", "_templates", type, "i18n.json"), "utf8"),
  );

  const subject = Object.fromEntries(
    Object.entries(i18n).map(([lang, { subject }]) => [lang, subject]),
  );

  await writeFile(join(templates, type, "subject.json"), `${JSON.stringify(subject, null, 2)}\n`);
}

console.log("✔ Successfully exported subjects");
