const fs = require('fs');
const pages = [
  { dir: 'app/(shop)/gizlilik-politikasi', slug: 'gizlilik-politikasi', key: 'gizlilikPolitikasi', defaultTitle: 'Gizlilik Politikası ve KVKK Aydqnlatma Metni' },
  { dir: 'app/(shop)/rezervasyon-kosullari', slug: 'rezervasyon-kosullari', key: 'rezervasyonKosullari', defaultTitle: 'Rezervasyon, İptal ve İade Keɟulları' },
  { dir: 'app/(shop)/kullanim-kosullari', slug: 'kullanim-kosullari', key: 'kullanimKosullari', defaultTitle: 'Kullanım Koşulları' },
  { dir: 'app/(shop)/cerez-politikasi', slug: 'cerez-politikasi', key: 'cerezPolitikasi', defaultTitle: 'Çerez Politikası' },
  { dir: 'app/(shop)/ticari-bilgiler', slug: 'ticari-bilgiler', key: 'ticariBilgiler', defaultTitle: 'İşletme ve Ticari Bilgiler' }
];
pages.forEach(p=>{
  fs.mkdirSync(p.dir, {recursive:true});
  const c = `default export function Page() {}`;
});