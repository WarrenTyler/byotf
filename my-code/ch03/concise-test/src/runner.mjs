import path from "path";
import { pathToFileURL } from "url";
import { color } from "./colors.mjs";

let successes = 0;
let failures = 0;

const exitCodes = {
  ok: 0,
  failures: 1,
};

export const run = async () => {
  try {
    await import(
      pathToFileURL(path.resolve(process.cwd(), "test/tests.mjs")).href
    );
  } catch (e) {
    console.error(e);
  }

  console.log(
    color(
      `<green>${successes}</green> tests passed, <red>${failures}</red> tests failed.`
    )
  );
  process.exit(failures !== 0 ? exitCodes.failures : exitCodes.ok);
};

const tick = "\u2713";
const cross = "\u2717";
export const it = (name, body) => {
  try {
    body();
    console.log(color(` <green>${tick}</green> ${name}`));
    successes++;
  } catch (e) {
    console.log(color(` <red>${cross}</red> ${name}`));
    console.error(e);
    failures++;
  }
};

export const describe = (name, body) => {
  console.log(name);
  body();
};
