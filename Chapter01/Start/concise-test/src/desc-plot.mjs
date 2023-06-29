#!/usr/bin/env node

import { readFileSync } from "fs";

const testFilePath = "test/tests.mjs"; // Update with your actual test file path

const getVerb = (description) => {
  const words = description.split(" ");
  if (words.length > 0) {
    return words[0];
  }
  return "";
};

const analyzeDescriptions = (descriptions) => {
  const verbCounts = {};

  descriptions.forEach((description) => {
    const verb = getVerb(description);
    if (verb) {
      verbCounts[verb] = verbCounts[verb]
        ? verbCounts[verb] + 1
        : 1;
    }
  });

  return verbCounts;
};

const generateCsvData = (verbCounts) => {
  let csvData = "Verb,Count\n";

  Object.entries(verbCounts).forEach(([verb, count]) => {
    csvData += `${verb},${count}\n`;
  });

  return csvData;
};

const main = () => {
  try {
    const testsFile = readFileSync(testFilePath, "utf8");
    const descriptions = testsFile.match(
      /(it|test)\s*\(\s*["'][^"']*["']/g
    );
    if (descriptions) {
      const sanitizedDescriptions = descriptions.map(
        (match) =>
          match.match(
            /(it|test)\s*\(\s*["']([^"']+)["']/
          )[2]
      );
      const verbCounts = analyzeDescriptions(
        sanitizedDescriptions
      );
      const csvData = generateCsvData(verbCounts);
      console.log(csvData);
    } else {
      console.error(
        "No test descriptions found in the test file."
      );
    }
  } catch (error) {
    console.error(error);
  }
};

main();
