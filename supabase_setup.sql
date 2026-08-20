-- Çorlu TSO Bütüncül Yeşil Dönüşüm & Sürdürülebilirlik Karnesi — Başvuru Tablosu
-- Bu SQL'i Supabase Dashboard > SQL Editor içine yapıştırıp RUN'a basın.
-- Aynı Supabase projesini diğer Çorlu TSO uygulamalarınızla paylaşıyorsanız sorun
-- değil; bu tablo diğerlerinden bağımsız, ayrı bir tablodur.

create table if not exists yesil_donusum_basvurular (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- Zorunlu iletişim bilgileri (6 ay sonraki takip için)
  company_name text not null,
  contact_name text not null,
  email text not null,
  phone text not null,

  -- Seçilen sektör
  sector_id text,
  sector_label text,

  -- Skorlar
  overall_score numeric not null,
  level_name text not null,
  category_scores jsonb,

  -- Ham cevaplar (ileride yeniden analiz edebilmek için)
  answers jsonb,

  -- KVKK onayı
  kvkk_consent boolean not null default true,
  kvkk_consent_at timestamptz not null default now()
);

-- Row Level Security: herkes INSERT edebilsin, kimse dışarıdan SELECT/UPDATE/DELETE yapamasın.
-- Siz (Oda) verileri Supabase Dashboard'a kendi hesabınızla giriş yaparak göreceksiniz;
-- anon/public anahtarla dışarıdan okuma mümkün OLMAYACAK.
alter table yesil_donusum_basvurular enable row level security;

create policy "Herkes basvuru ekleyebilir"
  on yesil_donusum_basvurular
  for insert
  to anon
  with check (true);

-- Not: Bilerek bir SELECT policy eklemedik. Kayıtları sadece
-- Supabase Dashboard > Table Editor üzerinden (kendi giriş bilgilerinizle) göreceksiniz.
