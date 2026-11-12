-- Supabase schema for Pizzeria (menu dinámico, reservas, configuración)
-- Ejecutar en el SQL Editor de tu proyecto Supabase

create extension if not exists "pgcrypto";

-- Menu items
create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric(10,2) not null default 0,
  image_url text,
  category text not null check (category in ('pizza','drinks','burgers','pasta')),
  featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Reservations (formulario público)
create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  guests int,
  reservation_date date,
  reservation_time time,
  message text,
  status text not null default 'pending', -- pending | confirmed | cancelled
  created_at timestamptz not null default now()
);

-- Site configuration (key/value)
create table if not exists public.site_config (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- RLS
alter table public.menu_items enable row level security;
alter table public.reservations enable row level security;
alter table public.site_config enable row level security;

-- Public read for menu and config
drop policy if exists "public read menu" on public.menu_items;
create policy "public read menu" on public.menu_items for select using (true);
drop policy if exists "public read config" on public.site_config;
create policy "public read config" on public.site_config for select using (true);

-- Public can create reservations (insert only)
drop policy if exists "public insert reservations" on public.reservations;
create policy "public insert reservations" on public.reservations for insert with check (true);

-- NOTE: Para administración (lectura de reservas, CRUD menú/config) se recomienda
-- usar el rol service_role desde un backend seguro o políticas basadas en auth de usuarios admin.
-- Ejemplo rápido (solo si usas Supabase Auth con usuarios autenticados como admin):
-- create policy "auth manage menu" on public.menu_items for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
-- create policy "auth read reservations" on public.reservations for select using (auth.role() = 'authenticated');
-- create policy "auth manage config" on public.site_config for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Seed menu (opcional)
insert into public.menu_items (name, description, price, image_url, category, featured, sort_order) values
('Italian Pizza','Far far away, behind the word mountains, far from the countries Vokalia and Consonantia', 20.00,'/images/pizza-1.jpg','pizza',true,1),
('Hawaiian Pizza','Far far away, behind the word mountains, far from the countries Vokalia and Consonantia', 29.00,'/images/pizza-2.jpg','pizza',true,2),
('Greek Pizza','Far far away, behind the word mountains, far from the countries Vokalia and Consonantia', 20.00,'/images/pizza-3.jpg','pizza',true,3),
('Bacon Crispy Thins','Far far away, behind the word mountains, far from the countries Vokalia and Consonantia', 20.00,'/images/pizza-4.jpg','pizza',true,4),
('Hawaiian Special','Far far away, behind the word mountains, far from the countries Vokalia and Consonantia', 49.91,'/images/pizza-5.jpg','pizza',true,5),
('Ultimate Overload','Far far away, behind the word mountains, far from the countries Vokalia and Consonantia', 20.00,'/images/pizza-6.jpg','pizza',true,6),
('Lemonade Juice','Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.', 2.90,'/images/drink-1.jpg','drinks',false,10),
('Pineapple Juice','Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.', 2.90,'/images/drink-2.jpg','drinks',false,11),
('Soda Drinks','Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.', 2.90,'/images/drink-3.jpg','drinks',false,12),
('Italian Burger','Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.', 2.90,'/images/burger-1.jpg','burgers',false,20),
('Cheese Burger','Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.', 2.90,'/images/burger-2.jpg','burgers',false,21),
('Bacon Burger','Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.', 2.90,'/images/burger-3.jpg','burgers',false,22),
('Italian Pasta','Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.', 2.90,'/images/pasta-1.jpg','pasta',false,30),
('Creamy Pasta','Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.', 2.90,'/images/pasta-2.jpg','pasta',false,31),
('Seafood Pasta','Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.', 2.90,'/images/pasta-3.jpg','pasta',false,32)
on conflict do nothing;