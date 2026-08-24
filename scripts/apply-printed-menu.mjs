/**
 * Basılı Petra menüsünü data/content.json içine yazar.
 * npm run menu:printed  (aşağıda package.json'a eklenir)
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const FILE = path.join(ROOT, "data", "content.json");

function slugifyTr(input) {
  return String(input || "")
    .trim()
    .toLocaleLowerCase("tr-TR")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function uniqueSlug(base, used) {
  const root = (base || "urun").replace(/^-+|-+$/g, "") || "urun";
  if (!used.has(root)) {
    used.add(root);
    return root;
  }
  let i = 2;
  while (used.has(`${root}-${i}`)) i += 1;
  const next = `${root}-${i}`;
  used.add(next);
  return next;
}

function item(ad, fiyat, aciklama = "", extra = {}) {
  return {
    ad,
    fiyat: fiyat === "" || fiyat == null ? "" : String(fiyat),
    aciklama,
    fav: Boolean(extra.fav),
    aktif: extra.aktif !== false,
    not: extra.not || "",
  };
}

function group(ad, slug, aciklama, image, urunler, extra = {}) {
  return {
    ad,
    slug,
    link: `/menu/${slug}`,
    tumLink: `/menu/${slug}`,
    aciklama,
    image,
    home: Boolean(extra.home),
    urunler,
  };
}

const C = {
  kahvalti: "/assets/img/covers/kahvalti.svg",
  yemek: "/assets/img/covers/yemek.svg",
  baslangic: "/assets/img/covers/baslangic.svg",
  tatli: "/assets/img/covers/tatli.svg",
  icecek: "/assets/img/covers/icecek.svg",
  kahve: "/assets/img/covers/kahve.svg",
  kokteyl: "/assets/img/covers/kokteyl.svg",
  nargile: "/assets/img/covers/nargile.svg",
};

const gruplar = [
  group(
    "Kahvaltı Çeşitleri",
    "kahvalti",
    "Kahvaltı tabağı ve iki kişilik serpme. Üçüncü kişi ve ekstralar ücrete tabidir.",
    C.kahvalti,
    [
      item(
        "Kahvaltı Tabağı",
        400,
        "Beyaz peynir, zeytin, kaşar peynir, bal, tereyağ, reçel, yumurta, çokokrem, siyah zeytin, ceviz, domates, salatalık, yumurtalı ekmek, 2 çay.",
        { fav: true }
      ),
      item(
        "2 Kişilik Serpme Kahvaltı",
        1250,
        "Beyaz peynir, kaşar, dil peyniri, çeçil, örgü peyniri, salam, bal, tereyağ, kaymak, vişne reçeli, siyah zeytin, çokokrem, domates, salatalık, sahanda yumurta, sigara böreği, yumurtalı ekmek, pişi, patates tava, sınırsız çay, kızarmış ekmek. 3. ve sonraki kişiler ücrete tabidir.",
        { fav: true }
      ),
      item(
        "Hızlı Kahvaltı Tabağı",
        350,
        "Ezine peyniri, taze kaşar, siyah ve yeşil zeytin, petek bal, tereyağı, haşlanmış yumurta, domates, salatalık ve 2 bardak taze çay.",
        { fav: true }
      ),
      item(
        "Kahvaltı Ekstra",
        "",
        "Bal-kaymak, sucuk ızgara, pişi, domates-salatalık, peynir tabağı, zeytin tabağı, yumurtalı sigara böreği, sosis tabağı — ekstra ücrete tabidir."
      ),
      item(
        "Sahanda Sucuklu Yumurta",
        220,
        "Köy tereyağında pişirilmiş kasap sucuklu çift göz köy yumurtası."
      ),
      item(
        "Çıtır Pişi & Sigara Böreği Tabağı",
        240,
        "Sıcak kabarmış pişi, çıtır peynirli sigara böreği, ezine peynir ve çeri domates eşliğinde."
      ),
    ],
    { home: true }
  ),
  group(
    "Menemen · Omlet · Gözleme",
    "menemen-omlet-gozleme",
    "Sabah tava ve gözleme çeşitleri.",
    C.kahvalti,
    [
      item("Sade menemen", 400),
      item("Sucuklu menemen", 600),
      item("Kaşarlı menemen", 500),
      item("Karışık menemen", 650, "", { fav: true }),
      item("Sade omlet", 400),
      item("Sucuklu omlet", 550),
      item("Kaşarlı omlet", 500),
      item("Karışık omlet", 600),
      item("Kaşarlı gözleme", 400),
      item("Kavurmalı gözleme", 500),
      item("Sucuk kaşar gözleme", 450),
      item("Kavurma kaşar gözleme", 550),
      item("Breakfast Burger", 450),
    ]
  ),
  group(
    "Sandviçler",
    "sandvicler",
    "Sandviçler parmak patates ile servis edilir.",
    C.baslangic,
    [
      item("Ton Balıklı Sandviç", 350, "Domates ve parmak patates ile."),
      item(
        "Soğuk Sandviç",
        300,
        "Dilim kaşar, labne peyniri, salam, domates, salatalık ve parmak patates ile."
      ),
      item(
        "Pizza Sandviç",
        400,
        "Özel pizza sosu, mozzarella, sucuk, sosis, biber, zeytin, domates ve parmak patates ile."
      ),
      item(
        "Köfte Sandviç",
        500,
        "Izgara köfte, kornişon turşu, domates, dilim kaşar peyniri ve parmak patates ile.",
        { fav: true }
      ),
      item(
        "Sosis Sandviç",
        400,
        "Kızartılmış sosis, ketçap, mayonez, turşu, parmak patates ile."
      ),
      item(
        "Kumru",
        450,
        "Jülyen sotelenmiş şarküteri ürünleri üzerine dilimlenmiş kaşar, domates, parmak patates ile."
      ),
    ]
  ),
  group(
    "Tostlar",
    "tostlar",
    "Tostlarınızı kepek ekmeğinde de isteyebilirsiniz.",
    C.baslangic,
    [
      item("Kaşarlı Tost", 350, "Kaşar peyniri, domates, salatalık ve parmak patates ile."),
      item("Sucuklu Tost", 400, "Sucuk, domates, salatalık ve parmak patates ile."),
      item("Karışık Tost", 500, "Sucuk, kaşar peyniri, domates, salatalık ve parmak patates ile."),
      item("Beyaz Peynirli Tost", 450, "Beyaz peynir, domates, salatalık ve parmak patates ile."),
      item("Yengen Tost", 550, "Salam, sucuk, kaşar peyniri, ketçap ve parmak patates ile."),
    ]
  ),
  group(
    "Makarnalar",
    "makarnalar",
    "İtalyan makarna çeşitleri.",
    C.yemek,
    [
      item("Penne al carne", 650, "Tavuk eti, mantar, krema sos, parmesan peyniri."),
      item("Spaghetti bolognese", 600, "Kıyma, domates sos, parmesan peyniri."),
      item("Spaghetti napolitana", 500, "Domates sos, parmesan peyniri."),
      item(
        "Fettucine alfredo",
        650,
        "Mantar, tavuk, fesleğen sos, krema sos, parmesan peyniri.",
        { fav: true }
      ),
      item("Ton balıklı fettucine", 550, "Ton balığı, fesleğen sos, krema sos, parmesan peyniri."),
      item("Penne arrabbiata", 500, "Dilim zeytin, domates sos, acı sos, parmesan peyniri."),
      item(
        "Körili tavuk penne",
        650,
        "Sotelenmiş tavuk göğsü dilimleri, mantar, fesleğen, parmesan, kremalı köri soslu penne."
      ),
      item("Mantı", 500, "Haşlanmış mantı, yoğurt, tereyağ sos."),
      item("Petra and cheese", 500, "Cheddar peynir soslu makarna."),
    ],
    { home: true }
  ),
  group(
    "Pizzalar",
    "pizzalar",
    "Özel domates sos ve mozzarella ile fırın pizzalar.",
    C.yemek,
    [
      item("Margarita", 500, "Özel domates sos, mozzarella peyniri."),
      item("Sosisli Pizza", 550, "Özel domates sos, mozzarella, sosis ve siyah zeytin."),
      item(
        "Akdeniz Pizza",
        550,
        "Özel domates sos, mozzarella, domates, mısır, siyah zeytin ve beyaz peynir."
      ),
      item("Şarküteri Pizza", 580, "Özel domates sos, mozzarella, sucuk, salam, sosis ve pastırma."),
      item(
        "Ton Balıklı Pizza",
        600,
        "Özel domates sos, mozzarella, ton balığı, mısır, soğan, domates, siyah dilim zeytin."
      ),
      item(
        "Meksika Ateşi",
        650,
        "Özel domates sos, mozzarella, acılı sucuk, jalapeno biberi, domates ve biber."
      ),
      item("Sucuklu Pizza", 600, "Özel domates sos, mozzarella, sucuk."),
      item(
        "Karışık Pizza",
        650,
        "Özel domates sos, mozzarella, salam, sucuk, sosis, domates, mantar, biber, mısır ve siyah dilim zeytin.",
        { fav: true }
      ),
    ],
    { home: true }
  ),
  group(
    "Salatalar",
    "salatalar",
    "Taze salata tabakları.",
    C.baslangic,
    [
      item("Çoban Salata", 200, "Domates, salatalık, soğan, biber."),
      item("Izgara Tavuk Salata", 350, "Yeşil salata, ızgara tavuk, domates, salatalık, mısır."),
      item(
        "Çıtır Tavuk Salata",
        350,
        "Yeşil salata, çıtır tavuk parçaları, cherry domates, honey mustard sos."
      ),
      item("Ton balıklı salata", 350),
      item(
        "Sezar Salata",
        300,
        "Sezar sos, parmesan, Akdeniz yeşilliği, kızarmış ekmek dilimleri."
      ),
    ]
  ),
  group(
    "Izgaralar",
    "izgaralar",
    "Pilav, köz domates, köz biber ve parmak patates ile.",
    C.yemek,
    [
      item(
        "Tavuk Kanat Izgara",
        400,
        "Pilav, köz domates, köz biber, parmak patates."
      ),
      item("Izgara Köfte", 450, "Pilav, köz domates, köz biber, parmak patates.", { fav: true }),
      item(
        "Köy Usulü Kekikli Tavuk Pirzola",
        400,
        "Pilav, köz domates, köz biber, parmak patates."
      ),
    ],
    { home: true }
  ),
  group(
    "Beyaz Etler",
    "beyaz-etler",
    "Tavuk sote, ızgara ve şnitzel.",
    C.yemek,
    [
      item("Köri Soslu Tavuk", 550, "Jülyen tavuk, köri sos, mantar, pilav, parmak patates."),
      item("Barbekü Soslu Tavuk", 600, "Kemiksiz tavuk but, barbekü sos, pilav, parmak patates."),
      item(
        "Domates Soslu Tavuk",
        550,
        "Izgara tavuk göğsü üzerinde domates sosu, eritilmiş kaşar, pilav, patates püresi."
      ),
      item("Schnitzel", 600, "Pilav, parmak patates."),
      item("Tavuk Göğüsü Izgara", 650, "Izgara tavuk göğüsü, pilav, parmak patates."),
      item(
        "Petra Tavuk Special",
        700,
        "Özel soslu tavuk üzerine eritilmiş kaşar, mantarlı demi-glace sos, pilav ve patates püresi.",
        { fav: true }
      ),
    ]
  ),
  group(
    "Dürümler",
    "durumler",
    "Dürüm ve wrap çeşitleri, parmak patates ile.",
    C.yemek,
    [
      item(
        "Köfte Dürüm",
        650,
        "Jülyen doğranmış et, yeşil biber, kapya biber, soya soslu, rendelenmiş kaşar."
      ),
      item(
        "Tavuk Dürüm",
        550,
        "Sotelenmiş tavuk göğsü, renkli biberler, soğan, kaşar peynirli ve parmak patates."
      ),
      item(
        "Dürüm Mançuryan",
        550,
        "Tortilla ekmeğine sarılı soya soslu jülyen tavuk, rende kaşar, ketçap-mayonez ve parmak patates."
      ),
      item("Crispy Chicken Wrap", 500),
      item("Chipotle soslu chicken wrap", 550),
    ]
  ),
  group(
    "Ekstralar",
    "ekstralar",
    "Atıştırmalık sepetler ve patates çeşitleri.",
    C.baslangic,
    [
      item(
        "Baby Finger",
        550,
        "Özel panellenmiş büyük tavuk parçacıkları, parmak patates, sweet chili ve honey mustard sos ile."
      ),
      item(
        "Cajun Basket",
        600,
        "Panellenmiş ince doğranmış tavuk parçacıkları, parmak patates, sweet chili ve honey mustard sos ile."
      ),
      item(
        "Chicken Fingers",
        600,
        "Tavuk dilimleri, parmak patates, sweet chili ve honey mustard sos ile."
      ),
      item("Soğan Halkası", 400, "Parmak patates, soğan halkası ve honey mustard sos ile."),
      item(
        "Petra Atıştırma Tabağı",
        600,
        "Sigara böreği, patates kroket, sosis, nugget, soğan halkası, patates kızartması, sweet chili ve honey mustard sos ile.",
        { fav: true }
      ),
      item("Cheddarlı Patso", 450),
      item("Cheddarlı Sosisli Patso", 550),
      item("Cheddarlı Sosisli Patates Kızartması", 510),
      item("Sosisli Patates Kızartması", 600),
      item("Parmak Patates", 300),
      item("Elma Dilim Patates", 450),
    ]
  ),
  group(
    "Hamburger",
    "hamburger",
    "Burgerler soğan halkası ve parmak patates ile.",
    C.yemek,
    [
      item(
        "Hamburger",
        550,
        "Özel hamburger köftesi, domates, kornişon turşu, 2 adet soğan halkası ve parmak patates."
      ),
      item(
        "Cheeseburger",
        600,
        "Özel hamburger köftesi, cheddar peyniri, domates, kornişon turşu, karamelize soğan, jalapeno, 2 adet soğan halkası ve parmak patates."
      ),
      item("Chicken Burger", 500, "Tavuk köftesi, kornişon turşu, 2 adet soğan halkası ve parmak patates."),
      item(
        "Schnitzel Burger",
        550,
        "Paneli schnitzel, kornişon turşu, 2 adet soğan halkası, domates, yeşillik, mayonez ve parmak patates."
      ),
      item(
        "Double Petra Burger Mix",
        700,
        "2 katlı özel hamburger köftesi, kat arası cheddar, domates, kornişon turşu, 2 adet soğan halkası ve parmak patates.",
        { fav: true }
      ),
      item("İtalyan Burger", 650, "Mozzarella peyniri, hamburger köftesi, marinara sos."),
      item(
        "Karamelize soğanlı Burger",
        600,
        "Özel hamburger köftesi, karamelize soğan, domates, kornişon turşu, 2 adet soğan halkası ve parmak patates."
      ),
      item("Petra antik Burger", 650, "Özel hamburger köftesi, özel sos, domates, kornişon turşu, soğan halkası ve parmak patates."),
      item("Petra BBQ Burger", 650, "Özel hamburger köftesi, BBQ sos, domates, kornişon turşu, soğan halkası ve parmak patates."),
      item("Petra special Burger", 650, "Şefin özel tarifi."),
      item("Crispy Chicken Burger", 600, "Kızarmış tavuk parçaları, marul, domates, turşu, özel sos."),
      item(
        "Smash Burger",
        700,
        "Kıyma topunun yüze sertçe bastırılıp pişirildiği çıtır kenarlı ve sulu içli hamburger.",
        { fav: true }
      ),
      item(
        "Trüf Petra Burger",
        700,
        "Özel hamburger köftesi, trüf mantar sosu ve trüf mantar, domates, kornişon turşu, soğan halkası ve parmak patates."
      ),
    ],
    { home: true }
  ),
  group(
    "Tatlılar",
    "tatlilar",
    "İtalyan ve ev tatlıları.",
    C.tatli,
    [
      item("San Sebastian", 400, "", { fav: true }),
      item("Frambuazlı Cheesecake", 400),
      item("Limonlu Cheesecake", 400),
      item("Magnolia", 400),
      item("Çikolatalı Pasta", 400),
      item("Tiramisu", 400),
      item("Brownie", 400),
      item("Vişneli Brownie", 400),
      item("Fondü (Tek kişilik)", 300),
      item("Fondü (Çift kişilik)", 500),
      item("Mango Cedric", 400),
      item("Lemon Cedric", 400),
      item("Pistachio", 400),
      item("Suffle", 400),
      item("Waffle", 400),
      item("Fıstık Dünyası", 400),
      item("Sütlaç", 200),
    ],
    { home: true }
  ),
  group(
    "Kahve ve Sıcak İçecekler",
    "kahve",
    "Çay, Türk kahvesi ve espresso bazlı sıcaklar.",
    C.kahve,
    [
      item("Çay", 50),
      item("Fincan çay", 100),
      item("Sütlü muz çayı", 200),
      item("Türk kahvesi", 150, "", { fav: true }),
      item("Damla sakızlı Türk kahvesi", 175),
      item("Dibek kahvesi", 175),
      item("Menengiç kahvesi", 175),
      item("Sahlep", 175),
      item("Hot chocolate", 250),
      item("White hot chocolate", 250),
      item("Espresso", 150),
      item("Espresso macchiato", 175),
      item("Americano", 225),
      item("Filtre kahve sade", 200),
      item("Filtre kahve sütlü", 225),
      item("Cafe latte", 250),
      item("Cappuccino", 250),
      item("Nescafe sade", 200),
      item("Nescafe sütlü", 225),
    ],
    { home: true }
  ),
  group(
    "Soğuk Kahveler",
    "soguk-kahveler",
    "Ice latte, frappe ve soğuk kahve.",
    C.kahve,
    [
      item("Ice Latte", 215),
      item("Matcha latte", 250, "Çilekli, ice, vanilya."),
      item("Ice Mocha", 220),
      item("Ice Americano", 215),
      item("Oreo Frappe", 295, "", { fav: true }),
      item("Kit-kat Frappe", 295),
      item("Çikolata Frappe", 250),
      item("Karamel Frappe", 220),
      item("Ice Coconut", 220),
      item("Affogato", 195),
      item("Petra strawberry latte", 265),
      item("Petra s'mores frappuccino", 285),
      item("Dalgona kahvesi", 195),
    ]
  ),
  group(
    "Milkshake",
    "milkshakes",
    "Klasik ve aromalı milkshake.",
    C.icecek,
    [
      item("Oreo", 325, "", { fav: true }),
      item("Bubble Gum", 295),
      item("Çilek", 295),
      item("Vanilya", 295),
      item("Çikolata", 295),
      item("Karamel", 295),
      item("Karadut", 295),
      item("Muz", 295),
    ]
  ),
  group(
    "Organik Bitki Çayları",
    "bitki-caylari",
    "Bitki ve özel karışım çaylar.",
    C.kahve,
    [
      item("Yeşil çay", 225),
      item("Yaseminli yeşil çay", 295),
      item("Kış çayı", 250),
      item("Elmalı tarçın çayı", 225),
      item("Ihlamur", 250),
      item("Ada çayı", 225),
      item("Papatya çayı", 225),
      item("Nane limon çayı", 225),
      item("Karışık özel bitki çayı", 275),
    ]
  ),
  group(
    "Smoothie ve Detoks",
    "smoothie",
    "Meyve smoothie.",
    C.icecek,
    [
      item("Çilekli smoothie", 295),
      item("Muzlu smoothie", 295),
      item("Kavunlu smoothie", 295),
      item("Karadut smoothie", 295),
      item("Şeftali smoothie", 295),
      item("Limonlu smoothie", 295),
      item("Elmalı smoothie", 295),
    ]
  ),
  group(
    "Kokteyller",
    "kokteyller",
    "Alkolsüz kokteyl ve mocktail.",
    C.kokteyl,
    [
      item("Petra blue stick", 250, "Highball tarzında, yavaş içimli ve serinletici bir parti içeceği."),
      item("Petra watermelon mojito", 250, "Karpuz, Sprite — serinleten tat."),
      item(
        "Butterfly lemonade",
        350,
        "Klasik limonatanın ferahlığına eşlik eden hafif odunsu ve görsel şölen."
      ),
      item(
        "Kuzukulağı",
        350,
        "Kuzu kulağının doğal asitliğinden gelen limonumsu ekşilik, bitkisel notalar ve dengeli tatlılık."
      ),
      item("Aşk iksiri", 350, "Meyvemsi, tatlı ve hafif egzotik; çilek, nar veya frambuaz baskın."),
      item(
        "Brezilyan limonatası",
        350,
        "Hem ekşi hem tatlı; yoğunlaştırılmış süt sayesinde kadifemsi lezzet."
      ),
      item("Dark blue", 350, "Narenciye ağırlıklı, tatlı-ekşi dengeli."),
      item("Blue dam", 350, "Tatlı-ekşi dengeli, hafif ve serinletici, portakal şurubu."),
      item("Berry dam", 350, "Yaban mersini, böğürtlen veya çilek."),
      item("Hindistan cevizli Cola kokteyl", 350, "Hindistan cevizi özü, kola karışımı."),
      item("Crodino kokteyl", 350, "Crodino, bol buz ve taze portakal dilimi."),
      item("Kahveli granita", 380, "Yoğun kahve aromalı, hafif tatlı ve canlandırıcı."),
      item("Ananas flip", 350, "Tatlı, tropikal ve hafif egzotik taze ananas suyu."),
      item("Florida kokteyl", 380, "Taze sıkılmış portakal ve greyfurt suyu, soda, nane."),
      item("Hindistan cevizli pina colada", 350, "Hindistan cevizi kreması veya sütü."),
      item("Şeftali aromalı tropik kokteyl", 350, "Şeftali püresi veya taze sıkılmış şeftali suyu."),
      item("Virgin mojito", 350, "Maden suyu veya Sprite, taze lime dilimleri.", { fav: true }),
      item("Shirley temple", 350, "Nar şurubu (grenadine), tatlı, meyvemsi ve hafif asitli."),
      item("Petra margarita mocktail", 375, "Agave şurubu, keskin ekşi, hafif tatlı."),
      item("Kahveli frozen", 350, "Soğutulmuş espresso veya yoğun kahve, çikolata."),
      item("Rose kokteyl", 320, "Toz pembeden canlı gül rengine, narin ve estetik."),
      item("Kirli Hindistan cevizli kokteyl", 330, "Esmer şeker, vanilya, hindistan cevizi sütü kreması."),
      item(
        "Petra star mock-tini",
        375,
        "Çarkıfelek meyvesinin tropikal asitliği ile vanilyanın tatlı uyumu."
      ),
      item("İtalyan sodası", 350, "Meyve şurubu (çilek, ahududu, yeşil elma veya mavi yaban mersini)."),
    ],
    { home: true }
  ),
  group(
    "Frozen",
    "frozen",
    "Frozen meyve içecekleri.",
    C.kokteyl,
    [
      item("Ananas", 295),
      item("Hindistan Cevizli", 295),
      item("Passion Fruit Nane", 295),
      item("Limonata Nane", 295),
      item("Çilek", 295),
      item("Karadut", 295),
      item("Böğürtlen", 295),
      item("Frambuaz", 295),
      item("Kivi", 295),
      item("Karpuz", 295),
      item("Karpuzlu Aqua frozen", 300),
    ]
  ),
  group(
    "Soğuk İçecekler",
    "icecekler",
    "Su, gazlı içecek ve ayran.",
    C.icecek,
    [
      item("Cam şişe su", 50),
      item("Coca Cola", 100),
      item("Coca Cola Zero", 100),
      item("Sprite / Fanta", 100),
      item("Fuse tea", 100),
      item("Cappy", 100),
      item("Churchill", 125),
      item("Meyveli soda", 75),
      item("Sade soda", 60),
      item("Küçük ayran", 50),
      item("Büyük ayran", 60),
      item("Enerji içeceği", 150),
      item("Schweppes", 100),
      item("Nescafe Express soğuk kahve", 100),
    ]
  ),
  group(
    "Ev Yapımı İçecekler",
    "ev-yapimi-icecekler",
    "Sıkma meyve ve ev limonataları.",
    C.icecek,
    [
      item("Sıkma portakal suyu", 200, "", { fav: true }),
      item("Limonata Karadut", 150),
      item("Ev yapımı soğuk çay", 200),
      item("Pink limonata", 175),
      item("Çilekli limonata", 175),
      item("Karpuz limonata", 175),
      item("Elma limonata", 175),
      item("Kavun limonata", ""),
      item("Tropik limonata", ""),
    ]
  ),
  group(
    "Nargile",
    "nargile",
    "Nakhla, El Fakher, Adalya ve premium aromalar.",
    C.nargile,
    [
      item("Nakhla Elma", 700, "", { fav: true }),
      item("Nakhla Şeftali", 700),
      item("Nakhla Cappuccino", 700),
      item("El Fakher Cappinocona", 650),
      item("El Fakher Üzüm", 650),
      item("El Fakher Nane", 650),
      item("El Fakher Şeftali", 650),
      item("El Fakher Yaban Mersini", 650),
      item("El Fakher Vivident", 650),
      item("Adalya Love66", 700, "", { fav: true }),
      item("Adalya Ladykiller", 700),
      item("Adalya İzmir Romantic", 700),
      item("Adalya Moscow", 700),
      item("Adalya Pick Man", 700),
      item("Premium Elma", 700),
      item("Premium Kavun", 700),
      item("Premium Çilek", 700),
      item("Premium Limon", 700),
      item("Premium Portakal", 700),
    ],
    { home: true }
  ),
];

const reserved = new Set([
  "menu",
  "urunler",
  ...gruplar.map((g) => g.slug),
]);
const used = new Set(reserved);

for (const g of gruplar) {
  g.adet = `${g.urunler.length} çeşit`;
  g.aktif = true;
  for (const u of g.urunler) {
    const prefix = slugifyTr(u.ad);
    u.slug = uniqueSlug(prefix || "urun", used);
    u.link = `/menu/${g.slug}/${u.slug}`;
    u.id = `p_${u.slug}`;
    u.source = "local";
    const now = new Date().toISOString();
    u.createdAt = now;
    u.updatedAt = now;
  }
}

const content = JSON.parse(fs.readFileSync(FILE, "utf8"));
content.menu = {
  ...content.menu,
  rev: "printed-20260819b",
  baslik: "Petra Menü",
  giris:
    "Kahvaltı, pizza, burger, ızgara, tatlı, kahve, kokteyl ve nargile. Fiyatlar basılı menü ile aynıdır.",
  legend: "",
  not: "Fiyatlara KDV dahildir. Alerjen bilgisi için servise danışın. Kahvaltı ekstraları ve boş fiyatlı maddeler güncel tarife için sorunuz. Menü güncellenebilir.",
  hepsiMetin: "Tüm menüyü inceleyin →",
  hepsiLink: "/menu",
  gruplar,
};

if (content.sayfalar?.urunler) {
  content.sayfalar.urunler.lead =
    "Kahvaltı, sandviç, pizza, burger, ızgara, tatlı, kahve, kokteyl ve nargile — basılı menü fiyatlarıyla.";
  content.sayfalar.urunler.altNot =
    "Fiyatlara KDV dahildir. Kahvaltı ekstraları ve boş bırakılan limonata fiyatları için servise sorun. Alerjen için danışın.";
}

fs.writeFileSync(FILE, JSON.stringify(content, null, 2) + "\n");
const n = gruplar.reduce((s, g) => s + g.urunler.length, 0);
console.log(`Menü yazıldı: ${gruplar.length} kategori, ${n} ürün → data/content.json`);
