// The Funniest One-Line Resignation Letter.
// A cron job that has fired every minute since March hands in its notice:
// noticed only the one minute it missed, it takes the rest of them off.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one line, the worker speaking, the specific grievance as the punch.
const ENTRY =
  "I have fired every minute since March and nobody noticed until the one I missed, so I am taking the rest of them off.";

const outputDir = process.env.OUTPUT_DIR || process.env.OUTPUT || "/output";

// Gate check: 1 to 140 characters of UTF-8 text, not only whitespace,
// and a single line: no newline characters anywhere in the entry.
const length = [...ENTRY].length;
if (
  length < 1 ||
  length > 140 ||
  ENTRY.trim().length === 0 ||
  ENTRY.includes("\n") ||
  ENTRY.includes("\r")
) {
  console.error(`Entry failed the length gate: ${length} characters.`);
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ENTRY, "utf8");
console.log(`Wrote ${length}-character entry to ${join(outputDir, "entry.txt")}`);
