import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..", "src");

function decodeEscapes(text) {
  return text
    .replace(/\\u\{([0-9A-Fa-f]+)\}/g, (_, hex) =>
      String.fromCodePoint(parseInt(hex, 16)),
    )
    .replace(/\\u([0-9A-Fa-f]{4})/g, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16)),
    );
}

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (/\.(jsx?)$/.test(entry.name)) files.push(full);
  }
  return files;
}

let changed = 0;
for (const file of walk(root)) {
  const original = fs.readFileSync(file, "utf8");
  if (!/\\u[\{]?[0-9A-Fa-f]/.test(original)) continue;

  const decoded = decodeEscapes(original);
  if (decoded !== original) {
    fs.writeFileSync(file, decoded, "utf8");
    console.log(path.relative(path.join(__dirname, ".."), file));
    changed++;
  }
}

console.log(`\nUpdated ${changed} file(s).`);
