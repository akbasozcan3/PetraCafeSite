const fs = require("fs");
const s = fs.readFileSync("assets/js/main.js", "utf8");
const keys = ["data-fade", "__firinci", "ScrollTrigger.refresh", "fromTo", "no-motion"];
for (const k of keys) {
  let i = 0,
    c = 0;
  while ((i = s.indexOf(k, i)) !== -1) {
    c++;
    if (c <= 2) console.log("\n---", k, c, "\n", s.slice(Math.max(0, i - 80), i + 160));
    i += k.length;
  }
  console.log(k, "total", c);
}
