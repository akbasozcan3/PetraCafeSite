from pathlib import Path
import re

kok = Path(__file__).resolve().parents[2]  # proje kökü

degisen = []

pattern = re.compile(
    r'window\.__firinciEfekt=function\(t\)\{.*?\};',
    re.DOTALL
)

yeni = (
    'window.__firinciEfekt=function(t){'
    'M(t);'
    'window.ScrollTrigger&&ScrollTrigger.refresh();'
    '};'
)

for dosya in kok.rglob("main.js"):
    try:
        text = dosya.read_text(encoding="utf-8", errors="ignore")

        if "window.__firinciEfekt" not in text:
            continue

        yeni_text, adet = pattern.subn(yeni, text)

        if adet:
            dosya.write_text(yeni_text, encoding="utf-8")
            degisen.append(str(dosya))

    except Exception as e:
        print(dosya, e)

print("\nDüzenlenen dosyalar:\n")
for d in degisen:
    print(d)

print(f"\nToplam {len(degisen)} dosya güncellendi.")