#!/usr/bin/env node

import { readFileSync } from "fs";
import { color } from "./colors.mjs";

const testFilePath = "test/tests.mjs";

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
      verbCounts[verb] = verbCounts[verb] ? verbCounts[verb] + 1 : 1;
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

const drawBarPlot = (csvData) => {
  const [header, ...dataRows] = csvData.trim().split("\n");

  const data = dataRows.map((row) => {
    const [verb, count] = row.split(",");
    return {
      verb,
      count: parseInt(count),
    };
  });

  // Get the width of the terminal (fallback to 40 if not available, 120 max)
  const terminalWidth = Math.min(process.stdout.columns ?? 40, 120);

  // Determine the maximum value in the data set
  const maxValue = Math.max(...data.map((item) => item.count));

  // Define the character to represent the bars
  const barChar = "\u2587";

  // Calculate the maximum width of the verb column
  const maxVerbWidth = Math.max(...data.map((item) => item.verb.length));
  const maxCountWidth = Math.max(
    ...data.map((item) => Math.floor(Math.log10(item.count)) + 1)
  );

  // Add the header for the chart output
  let chartOutput = color(
    `<bold>Frequency of starting verbs in test case description:</bold>\n`
  );

  // Iterate over the data and print the bar chart
  data.forEach((item) => {
    // Add padding to align verb column
    const verbPadding = " ".repeat(maxVerbWidth - item.verb.length);

    const countPadding = " ".repeat(
      maxCountWidth - (Math.floor(Math.log10(item.count)) + 1)
    );

    const verbCol = `${verbPadding + item.verb}:`; // Add the verb column to the left of the bar
    const countCol = ` ${item.count + countPadding}`; // Add the verb column to the left of the bar
    const maxBarWidth = terminalWidth - (verbCol.length + countCol.length + 2);
    const barLength = Math.round((item.count / maxValue) * maxBarWidth); // Scale the bars to a fixed length
    const bar = barChar.repeat(barLength);

    // Add the bar to the chart output
    chartOutput += color(`${verbCol} <red>${bar}</red> ${countCol}\n`);
  });

  console.log(chartOutput);
};

const main = () => {
  try {
    const testsFile = readFileSync(testFilePath, "utf8");
    const descriptions = testsFile.match(/(it|test)\s*\(\s*["'][^"']*["']/g);
    if (descriptions) {
      const sanitizedDescriptions = descriptions.map(
        (match) => match.match(/(it|test)\s*\(\s*["']([^"']+)["']/)[2]
      );
      const verbCounts = analyzeDescriptions(sanitizedDescriptions);
      const csvData = generateCsvData(verbCounts);

      drawBarPlot(csvData);
    } else {
      console.error("No test descriptions found in the test file.");
    }
  } catch (error) {
    console.error(error);
  }
};

main();
