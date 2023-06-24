import path from "path";
import { pathToFileURL } from "url";

export const run = async () => {
  try {
    await import(
      pathToFileURL(path.resolve(process.cwd(), "test/tests.mjs")).href
    );
  } catch (e) {
    console.error(e);
  }
  console.log("Test run finished");
};
