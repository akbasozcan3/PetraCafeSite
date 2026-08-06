(function(){"use strict";var o=function(e,n){return(n||document).querySelector(e)},l=function(e,n,a){var t=document.createElement(e);return n&&(t.className=n),a!=null&&(t.textContent=a),t},v=function(e,n){var a=o(e);a&&n!=null&&n!==""&&(a.textContent=n)};(window.__firinciContentPromise||fetch("/api/content",{headers:{Accept:"application/json"}}).then(function(e){return e.ok?e.json():null})).then(function(e){if(!e){console.warn("[FIRINCI CONTENT] /api/content returned empty payload");return}if(e.kaynak!=="db"){console.warn("[FIRINCI CONTENT] unexpected /api/content kaynak:",e.kaynak);return}if(!e.data){console.warn("[FIRINCI CONTENT] /api/content missing data");return}k(e.data);window.__firinciEfekt&&window.__firinciEfekt(document)}).catch(function(e){console.error("[FIRINCI CONTENT] fetch /api/content failed:",e)});function k(e){x(e.duyuru),_(e.makaleler),w(e.manifesto),E(e.hikaye),q(e.galeri),z(e.yorumlar),N(e.iletisim||e.ziyaret)}function _(e){var n=o(".posts");if(!(!n||!e||!e.length)){var a=e.filter(function(i){return i&&i.slug&&i.yayinda!==!1&&!i.statik});if(a.length){var t={};Array.prototype.forEach.call(n.querySelectorAll("a.post"),function(i){var u=i.getAttribute("href")||"";t[u.replace(/[^a-z0-9-]/g,"")]=!0}),a.slice().reverse().forEach(function(i){var u=C("a","post");u.href="/blog/"+encodeURIComponent(i.slug)+"/"+encodeURIComponent(i.slug);var r=C("div","post__meta");i.kategori&&r.appendChild(C("b",null,i.kategori)),i.tarih&&r.appendChild(C("time",null,i.tarih));var s=C("div");s.appendChild(C("h2",null,i.baslik||"")),i.ozet&&s.appendChild(C("p",null,i.ozet)),u.appendChild(r),u.appendChild(s),n.insertBefore(u,n.firstChild)})}}}function C(e,n,a){var t=document.createElement(e);return n&&(t.className=n),a!=null&&(t.textContent=a),t}function x(e){var n=o("#duyuru");if(n&&n.remove(),!(!e||!e.aktif||!e.metin)){var a=l("div","duyuru",e.metin);a.id="duyuru",document.body.insertBefore(a,document.body.firstChild),document.documentElement.classList.add("duyuru-acik")}}function w(e){if(e){v(".manifesto__eyebrow",e.ustBaslik);var n=o(".manifesto__type");!n||!e.satirlar||(n.textContent="",e.satirlar.forEach(function(a){var t=l("span","ml");t.appendChild(l("b",null,a.kalin||"")),t.appendChild(document.createTextNode(" ")),t.appendChild(l("em",null,a.italik||"")),n.appendChild(t)}))}}function E(e){if(e){var n=o("#hikaye");if(n){var a=o(".h2",n);a&&e.baslik&&(a.textContent=e.baslik,delete a.dataset.ef),v("#hikaye .lead",e.giris),v("#hikaye .body",e.metin);var t=o(".stats",n);t&&e.sayaclar&&(t.textContent="",e.sayaclar.forEach(function(i){var u=l("div","stat"),r=l("b",null,"0");r.setAttribute("data-count",i.sayi),u.appendChild(r),u.appendChild(l("span",null,i.etiket||"")),t.appendChild(u)}),A(t))}}}function A(e){var n=e.querySelectorAll("[data-count]");if(!("IntersectionObserver"in window)){Array.prototype.forEach.call(n,function(t){t.textContent=t.getAttribute("data-count")});return}var a=new IntersectionObserver(function(t){t.forEach(function(i){if(i.isIntersecting){var u=parseInt(i.target.getAttribute("data-count"),10)||0,r=performance.now(),s=1500;(function c(p){var h=Math.min(1,(p-r)/s);i.target.textContent=Math.round(u*(1-Math.pow(1-h,3))),h<1&&requestAnimationFrame(c)})(r),a.unobserve(i.target)}})},{threshold:.6});Array.prototype.forEach.call(n,function(t){a.observe(t)})}function S(e){if(e){var n=o("#menu");if(n){var a=o(".h2",n);a&&e.baslik&&(a.textContent=e.baslik,delete a.dataset.ef),v("#menu .section__head .lead",e.giris),v("#menu .menu__note",e.not);var t=o(".menu",n);!t||!e.gruplar||(t.textContent="",e.gruplar.forEach(function(i){var u=(i.urunler||[]).filter(function(c){return c.ad&&c.ad.trim()});if(!(!i.ad||!u.length)){var r=l("div","menu__group");r.setAttribute("data-fade",""),r.appendChild(l("h3",null,i.ad));var s=l("ul","menu__list");u.forEach(function(c){var p=document.createElement("li");c.fav&&(p.className="is-fav");var h=l("span","menu__name",c.ad);if(c.not){var d=l("em",null,c.not);h.appendChild(document.createTextNode(" ")),h.appendChild(d)}p.appendChild(h),c.fiyat&&String(c.fiyat).trim()&&(p.appendChild(document.createElement("i")),p.appendChild(l("span","menu__price",c.fiyat))),s.appendChild(p)}),r.appendChild(s),t.appendChild(r)}}))}}}function q(e){
var n=o(".gallery");

if(!n || !e || !e.length) return;

n.textContent="";

e.forEach(function(a){

if(a.src){

var t=l(
"figure",
"shot shot--"+(a.boy==="wide"?"wide":a.boy==="third"?"third":"half")
);

t.setAttribute(
"data-reveal-mask",
""
);


var i=document.createElement("img");

i.src=(a.src.indexOf("http")===0||a.src.indexOf("/")===0)?a.src:("/"+String(a.src).replace(/^\//,""));
i.alt=a.baslik||"";
i.loading="lazy";
i.decoding="async";


t.appendChild(i);


if(a.baslik){
t.appendChild(
l("figcaption",null,a.baslik)
);
}


n.appendChild(t);

}

});

setTimeout(function(){

    window.__firinciEfekt && window.__firinciEfekt(document);

    window.dispatchEvent(new Event("scroll"));

},300);

}
function z(e){if(o("#yorumlarTrack"))return;var n=o(".yorumlar");!n||!e||!e.length||(n.textContent="",e.forEach(function(a){if(!(!a||!a.metin)){var t=l("figure","yorum");t.setAttribute("data-fade","");var i=Math.max(1,Math.min(5,Number(a.yildiz)||5)),u=l("div","yorum__yildiz",new Array(i+1).join("\u2605")+new Array(6-i).join("\u2606"));u.setAttribute("aria-label","5 \xFCzerinden "+i+" y\u0131ld\u0131z"),t.appendChild(u),t.appendChild(l("blockquote",null,a.metin));var r=l("figcaption");r.appendChild(l("b",null,a.ad||"")),r.appendChild(l("span",null,a.unvan||"")),t.appendChild(r),n.appendChild(t)}}))}function N(e){if(!e)return;var n=o("#iletisim");if(!n)return;var a=o(".h2",n);a&&e.baslik&&(a.textContent=e.baslik,delete a.dataset.ef),v("#iletisim .lead",e.giris),v("#iletisim .body",e.metin);var t=n.querySelectorAll(".corp__row");if(t.length>=5){var i=o("span",t[0]);i&&(i.textContent="",[e.adresSatir1,e.adresSatir2,e.adresSatir3].forEach(function(d,f){d&&(f&&i.appendChild(document.createElement("br")),i.appendChild(document.createTextNode(d)))})),s(o("span",t[1]),e.saatler),c(o("span",t[2]),"tel:"+(e.telefonHam||""),e.telefon),c(o("span",t[3]),e.whatsapp,e.telefon,!0),s(o("span",t[4]),e.ozelPastaNot)}var u=o(".map-btn",n);u&&(e.koordinat||e.haritaSorgu)&&(u.href="https://www.google.com/maps/dir/?api=1&destination="+encodeURIComponent(e.koordinat||e.haritaSorgu));var r=n.querySelectorAll(".contact-lines a");r.length>=4&&(p(r[0],"tel:"+(e.telefonHam||""),e.telefon,null),p(r[1],e.whatsapp,null,null),p(r[2],e.instagramUrl,e.instagram,e.instagramNot),p(r[3],"mailto:"+(e.eposta||""),e.eposta,null));function s(d,f){d&&f&&(d.textContent=f)}function c(d,f,y,g){if(!(!d||!f||!y)){d.textContent="";var m=document.createElement("a");m.href=f,m.textContent=y,g&&(m.target="_blank",m.rel="noopener noreferrer"),d.appendChild(m)}}function p(d,f,y,g){f&&(d.href=f);var m=o("b",d),b=o("span",d);m&&y&&(m.textContent=y),b&&g&&(b.textContent=g)}var h=document.querySelectorAll(".foot__grid a");Array.prototype.forEach.call(h,function(d){d.href&&d.href.indexOf("google.com/maps")>-1&&e.haritaSorgu&&(d.href="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(e.haritaSorgu),e.adresSatir1&&(d.textContent=e.adresSatir1))})}})();
