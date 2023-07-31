import path from "path";
import { pathToFileURL } from "url";
import { color } from "./colors.mjs";

const tick = "\u2713";
const cross = "\u2717";

const exitCodes = {
  ok: 0,
  failures: 1,
};

let successes = 0;
let failures = [];

export const run = async () => {
  try {
    await import(
      pathToFileURL(path.resolve(process.cwd(), "test/tests.mjs")).href
    );
  } catch (e) {
    console.error(e);
  }
  printFailures();
  console.log(
    color(
      `<green>${successes}</green> tests passed, ` +
        `<red>${failures.length}</red> tests failed.`
    )
  );
  process.exit(failures.length > 0 ? exitCodes.failures : exitCodes.ok);
};

export const it = (name, body) => {
  try {
    body();
    console.log(color(` <green>${tick}</green> ${name}`));
    successes++;
  } catch (e) {
    console.error(color(` <red>${cross}</red> ${name}`));
    failures.push(e);
  }
};

export const describe = (name, body) => {
  console.log(name);
  body();
};

const printFailure = (e) => {
  console.error(e);
  console.error("");
};

const printFailures = () => {
  if (failures.length > 0) {
    console.error("");
    console.error("Failures:");
    console.error("");
  }
  failures.forEach(printFailure);
};
