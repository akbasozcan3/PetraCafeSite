const fs = require("fs");
const s = fs.readFileSync("assets/js/main.js", "utf8");
const i = s.indexOf('getAttribute("href")');
console.log(s.slice(i - 200, i + 350));
