import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const contentPath = path.join(root, "data", "content.json");

const DEFAULT_GALERI = [
  { src: "/assets/img/cephe.jpg", baslik: "Fırınımız · Taşdelen", boy: "wide" },
  { src: "/assets/img/kapi.jpg", baslik: "Giriş", boy: "half" },
  { src: "/assets/img/urun/vitrin-pasta.jpg", baslik: "Pasta vitrini", boy: "half" },
  { src: "/assets/img/urun/ekmek-rustik.jpg", baslik: "Somunlar", boy: "third" },
  { src: "/assets/img/urun/vitrin-hamur.jpg", baslik: "Hamur işleri", boy: "third" },
  { src: "/assets/img/urun/simit.jpg", baslik: "Sıcacık simit", boy: "third" },
];

const DEFAULT_YORUMLAR = [
  { metin: "Ekibimizin sıcak ve samimi hizmeti sayesinde unutulmaz bir tatlı anı yaşadığımı belirtmek isterim.", ad: "Ayşe Yılmaz", unvan: "Öğretmen", yildiz: 5 },
  { metin: "Her ürününde kalite ve özen gözeten Taşdelen Fırıncı, beklentilerimi fazlasıyla karşıladı.", ad: "Mehmet Demir", unvan: "Mühendis", yildiz: 5 },
  { metin: "Kızımın doğum günü için istediğimiz temada pasta hazırladılar, hem görüntüsü hem lezzeti çok beğenildi.", ad: "Zeynep Kaya", unvan: "Taşdelen sakini", yildiz: 5 },
];

const DEFAULT_MAKALELER = [
  { slug: "pasta-siparisi-rehberi", baslik: "Doğum günü pastası siparişi: kaç kişilik, ne zaman verilir?", ozet: "Kişi sayısına göre pasta boyu, kaç saat önceden sipariş vermeniz gerektiği, yazı ve figür seçenekleri.", kategori: "Pastane", tarih: "21 Temmuz 2026", yayinda: true, statik: true },
  { slug: "hangi-ekmek-kime-uygun", baslik: "Tam buğday, çavdar, siyez: hangi ekmek kime uygun?", ozet: "Un çeşitlerinin lif, mineral ve glüten farkları; kan şekeri ve sindirim açısından karşılaştırma.", kategori: "Ekmek", tarih: "9 Temmuz 2026", yayinda: true, statik: true },
  { slug: "ekmek-nasil-saklanir", baslik: "Ekmek nasıl saklanır? Taze kalması için 7 kural", ozet: "Buzdolabı neden ekmeği bayatlatır, poşet mi bez mi, dilimlenmiş ekmek nasıl dondurulur.", kategori: "Pratik Bilgi", tarih: "28 Haziran 2026", yayinda: true, statik: true },
  { slug: "eksi-maya-ekmek-nedir", baslik: "Ekşi mayalı ekmek nedir? Neden tercih edilir?", ozet: "Ekşi mayanın fermantasyon süreci, sindirim ve lezzet farkları, hangi ürünlerimizde kullanıldığı.", kategori: "Maya", tarih: "12 Haziran 2026", yayinda: true, statik: true },
];

const content = JSON.parse(fs.readFileSync(contentPath, "utf8"));
let changed = false;

if (!content.galeri?.length) {
  content.galeri = DEFAULT_GALERI;
  changed = true;
}
if (!content.yorumlar?.length) {
  content.yorumlar = DEFAULT_YORUMLAR;
  changed = true;
}
if (!content.makaleler?.length) {
  content.makaleler = DEFAULT_MAKALELER;
  changed = true;
}

if (changed) {
  fs.writeFileSync(contentPath, JSON.stringify(content, null, 2), "utf8");
  console.log("content.json güncellendi: galeri, yorumlar, makaleler");
} else {
  console.log("content.json zaten dolu — değişiklik yok");
}
