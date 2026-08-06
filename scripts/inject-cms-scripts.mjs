import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const CMS_SCRIPTS = [
  "assets/js/site-loader.js",
  "assets/js/content.js",
  "assets/js/cms-ext.js",
];

function depthToAssets(filePath) {
  const rel = path.relative(root, filePath).replace(/\\/g, "/");
  const parts = rel.split("/").filter(Boolean);
  const depth = parts.length - 1;
  return depth <= 0 ? "" : "../".repeat(depth);
}

function injectIntoFile(filePath) {
  let html = fs.readFileSync(filePath, "utf8");
  if (html.includes("cms-ext.js")) return false;

  const prefix = depthToAssets(filePath);
  const tags = CMS_SCRIPTS.map(
    (s) => `<script src="${prefix}${s}" defer=""></script>`
  ).join("\n");

  if (html.includes("</body>")) {
    html = html.replace("</body>", `${tags}\n</body>`);
  } else {
    html += "\n" + tags;
  }
  fs.writeFileSync(filePath, html, "utf8");
  return true;
}

function walk(dir) {
  let count = 0;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      count += walk(full);
    } else if (!name.includes(".")) {
      if (injectIntoFile(full)) count++;
    }
  }
  return count;
}

const dirs = ["urunler", "blog"].map((d) => path.join(root, d));
let total = 0;
for (const dir of dirs) {
  if (fs.existsSync(dir)) total += walk(dir);
}
console.log(`CMS scriptleri ${total} sayfaya eklendi.`);
