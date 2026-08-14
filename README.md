# Çorlu TSO — Yeşil Dönüşüm & Sürdürülebilirlik Karnesi

Çorlu Ticaret ve Sanayi Odası üyesi firmaların sektörlerine özel bir öz-değerlendirme
yapıp enerji, su, döngüsel ekonomi ve ESG (sosyal-yönetişim) alanlarındaki mevcut
durumlarını görmelerini; buna bağlı hibe, teşvik ve mevzuat uyum önerileri almalarını
sağlayan, tamamen **client-side** (sunucusuz, veri saklamasız) bir web uygulaması.

Çorlu TSO'nun mevcut [Dijital Olgunluk Ölçüm Aracı](https://github.com/) ile aynı
tasarım dilini ve teknoloji yığınını kullanır ama **bağımsız bir uygulamadır** —
ortak veritabanı veya kod paylaşımı yoktur.

## Öne çıkan özellikler

- **11 sektör seçeneği** (10 tam kapsamlı + 1 jenerik "Diğer Sektörler"), Çorlu 1 OSB'nin
  gerçek üye sektörel dağılımına göre önceliklendirildi:
  Tekstil & Boyahane, Kimya-Plastik, Metal & Makine, Deri, Gıda-Tarım, Otomotiv Yan Sanayi,
  Kağıt-Matbaa-Ambalaj, Elektrik-Elektronik, İnşaat Malzemeleri & Boya, Hizmet & Perakende,
  Diğer Sektörler (Lojistik, Sağlık, Mobilya, Gayrimenkul vb.)
- Sektör başına 20 soru (4 kategori × 5 soru: Enerji, Su/Kimyasal, Döngüsel Ekonomi, ESG),
  8-10 dakikada tamamlanır.
- Skor hesaplama, kategori grafikleri ve hibe/teşvik eşleştirmesi **tamamen tarayıcıda**
  çalışır — hiçbir veri sunucuya gönderilmez veya saklanmaz.
- Koşullu TR-ETS/SKDM uyarı modülü (50.000 ton CO2e eşiği sorusuna bağlı).
- Firmaya özel hibe/teşvik önerileri (KOSGEB, VAP, Ziraat Bankası, ZDHC, LWG, Yeşil Lojistik
  Belgesi, AEEE/RoHS vb.) — kaynağı doğrulanmış, güven seviyesi işaretli.
- Çorlu TSO **Hibe Motoru**'na yönlendirme kartı (detaylı/güncel hibe taraması için).
- PDF rapor indirme (jsPDF, Türkçe karakter destekli DejaVu Sans fontu, kurumsal kimlik).

## Teknoloji yığını

- React 18 + Vite 5
- Tailwind CSS 3
- jsPDF (PDF rapor üretimi)
- lucide-react (ikonlar)
- **Backend yok** — Supabase, veritabanı veya API entegrasyonu bulunmuyor.

## Kurulum

```bash
npm install
npm run dev       # geliştirme sunucusu, http://localhost:5173
npm run build     # üretim derlemesi -> dist/
npm run preview   # üretim derlemesini yerelde önizle
```

## Proje yapısı

```
src/
  App.jsx              — Ana uygulama: sektör seçimi, soru akışı, sonuç ekranı
  main.jsx             — React giriş noktası
  index.css            — Tailwind direktifleri
  lib/
    sectors.js          — Tüm sektör/kategori/soru/finansman verisi
    scoring.js           — Skor hesaplama, seviye belirleme, öneri filtreleme mantığı
    pdfReport.js          — PDF rapor üretimi (jsPDF)
public/
  ctso-logo.png          — Kurumsal logo
  fonts/                  — DejaVu Sans (Türkçe karakter desteği için PDF fontu)
```

## Veri kaynağı ve doğruluk notu

`src/lib/sectors.js` içindeki mevzuat ve finansman bilgileri (KOSGEB, VAP, Ziraat Bankası,
TR-ETS/SKDM, ZDHC, LWG, AEEE/RoHS vb.) **Ağustos 2026** itibarıyla araştırılmış ve
kaynaklandırılmıştır. Her programın `confidence` alanı doğrulama seviyesini gösterir:

- `high` — resmi/güncel kaynakla doğrulandı
- `medium` — ikincil kaynak, başvuru öncesi ilgili kurumdan teyit önerilir

Mevzuat ve teşvik programları zamanla değişebilir. Bu araç **bilgilendirme amaçlıdır**;
resmi başvurular öncesi güncel şartların ilgili kurumdan (KOSGEB, Enerji Bakanlığı, ilgili
banka vb.) teyit edilmesi önerilir.

## Hibe Motoru entegrasyonu

Bu uygulama, Çorlu TSO'nun Hibe Motoru (`hibemotoru.vercel.app`) uygulamasıyla veri/kod
paylaşmaz. Sonuç ekranında ve PDF raporda, detaylı ve güncel hibe taraması için Hibe
Motoru'na yönlendiren bir bağlantı bulunur. Bağlantı adresini değiştirmek için
`src/App.jsx` içindeki `HIBE_MOTORU_URL` sabitini güncelleyin.

## Sektör/soru içeriğini güncelleme

Tüm soru, kategori ve finansman verisi `src/lib/sectors.js` içinde düz JavaScript
nesneleri olarak tutulur. Yeni bir sektör eklemek veya mevcut soruları düzenlemek için
bu dosyayı doğrudan düzenlemeniz yeterli — ayrı bir CMS veya veritabanı gerekmez.

## Lisans / Kullanım

Çorlu Ticaret ve Sanayi Odası için özel olarak geliştirilmiştir.
