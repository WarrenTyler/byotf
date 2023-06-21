import path from "path";

export const run = async () => {
  await import(path.resolve(process.cwd(), "test/tests.mjs"));
  console.log("Test run finished");
};
