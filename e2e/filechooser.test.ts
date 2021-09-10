import test, { expect } from "@playwright/test";
import { join } from "path";

test("should work with file chooser", async ({
  page,
  browserName,
  baseURL,
}) => {
  await page.goto(".");
  const hasShowOpenFilePicker = await page.evaluate(
    "!!window.showOpenFilePicker"
  );
  console.log(
    `${browserName} has showOpenFilePicker with ${baseURL}: ${hasShowOpenFilePicker}`
  );
  const [fileChooser] = await Promise.all([
    page.waitForEvent("filechooser"),
    page.click("text=Open a file"),
  ]);
  await fileChooser.setFiles(join(__dirname, "../public/index.html"));
  await expect(page.locator("#fileNames")).toHaveText("index.html");
});
