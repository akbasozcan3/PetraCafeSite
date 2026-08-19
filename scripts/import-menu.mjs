import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.htm"), "utf8");
const contentPath = path.join(root, "data", "content.json");

function stripTags(s) {
  return s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function parseProductLi(liHtml) {
  const fav = /class="[^"]*is-fav/.test(liHtml);
  const linkMatch = liHtml.match(/href="([^"]+)"/);
  const nameMatch = liHtml.match(/<span class="menu__name">([\s\S]*?)<\/span>/);
  let ad = "";
  let not = "";
  if (nameMatch) {
    const inner = nameMatch[1];
    const emMatch = inner.match(/^(.*?)<em>([\s\S]*?)<\/em>/);
    if (emMatch) {
      ad = stripTags(emMatch[1]);
      not = stripTags(emMatch[2]).replace(/·/g, " · ");
    } else {
      ad = stripTags(inner);
    }
  }
  return { ad, not: not || undefined, fav, link: linkMatch?.[1] };
}

function parseGroups() {
  const menuStart = html.indexOf('<div class="menu">');
  const menuEnd = html.indexOf('<p class="menu__note"', menuStart);
  const block = html.slice(menuStart, menuEnd);
  const groupChunks = block.split('<div class="menu__group"').slice(1);
  return groupChunks.map((chunk) => {
    const h3 = chunk.match(/<h3>([\s\S]*?)<\/h3>/);
    const linkMatch = h3?.[1].match(/href="([^"]+)"/);
    const adMatch = h3?.[1].match(/>([^<]+)</);
    const adetMatch = chunk.match(/<span class="menu__adet">([^<]+)<\/span>/);
    const tumMatch = chunk.match(/<a class="menu__tum" href="([^"]+)">/);
    const lis = [...chunk.matchAll(/<li[\s\S]*?<\/li>/g)].map((m) => parseProductLi(m[0]));
    return {
      ad: adMatch ? stripTags(adMatch[1]) : "Kategori",
      link: linkMatch?.[1],
      adet: adetMatch?.[1],
      tumLink: tumMatch?.[1],
      urunler: lis.filter((u) => u.ad),
    };
  });
}

const headMatch = html.match(/<section[^>]*id="menu"[\s\S]*?<div class="section__head">([\s\S]*?)<\/div>/);
const leadMatch = headMatch?.[1].match(/<p class="lead"[^>]*>([\s\S]*?)<\/p>/);
const h2Match = headMatch?.[1].match(/<h2 class="h2"[^>]*>([\s\S]*?)<\/h2>/);
const legendMatch = headMatch?.[1].match(/<p class="menu__legend"[^>]*>([\s\S]*?)<\/p>/);
const hepsiMatch = headMatch?.[1].match(/<p class="menu__hepsi"[^>]*>([\s\S]*?)<\/p>/);
const hepsiLink = hepsiMatch?.[1].match(/href="([^"]+)"/);
const hepsiText = hepsiMatch?.[1]?.replace(/<[^>]+>/g, "").trim();
const noteMatch = html.match(/<p class="menu__note"[^>]*>([\s\S]*?)<\/p>/);

const menu = {
  baslik: h2Match ? stripTags(h2Match[1]) : "Taşdelen'de taptaze fırın lezzetleri",
  giris: leadMatch ? stripTags(leadMatch[1]) : "",
  legend: legendMatch ? stripTags(legendMatch[1]) : "",
  hepsiMetin: hepsiText || "14 kategoride 132 çeşidin tamamını inceleyin →",
  hepsiLink: hepsiLink?.[1] || "urunler/urunler",
  not: noteMatch ? stripTags(noteMatch[1]) : "",
  gruplar: parseGroups(),
};

const content = JSON.parse(fs.readFileSync(contentPath, "utf8"));
content.menu = menu;
fs.writeFileSync(contentPath, JSON.stringify(content, null, 2), "utf8");
console.log(`Menü içe aktarıldı: ${menu.gruplar.length} kategori`);
