import path from "path";
import { pathToFileURL } from "url";

export const run = async () => {
  await import(
    pathToFileURL(path.resolve(process.cwd(), "test/tests.mjs")).href
  );
  console.log("Test run finished");
};