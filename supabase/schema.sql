create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  store text not null check (store in ('ebook', 'altfit')),
  slug text not null,
  title text not null,
  description text not null default '',
  image_url text not null default '',
  image_path text,
  category text not null default '',
  price numeric(10, 2) not null default 0 check (price >= 0),
  currency text not null default 'USD' check (char_length(currency) = 3),
  variants jsonb not null default '[]'::jsonb check (jsonb_typeof(variants) = 'array'),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (store, slug)
);

create table if not exists public.catalog_settings (
  store text primary key check (store in ('ebook', 'altfit')),
  initialized boolean not null default true
);

create or replace function public.is_catalog_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = (select auth.uid())
  );
$$;

alter table public.admin_users enable row level security;
alter table public.products enable row level security;
alter table public.catalog_settings enable row level security;

drop policy if exists "Users can read their own admin membership" on public.admin_users;
create policy "Users can read their own admin membership"
  on public.admin_users for select to authenticated
  using (user_id = (select auth.uid()));

drop policy if exists "Anyone can read active products" on public.products;
create policy "Anyone can read active products"
  on public.products for select to anon, authenticated
  using (active or (select public.is_catalog_admin()));

drop policy if exists "Admins can insert products" on public.products;
create policy "Admins can insert products"
  on public.products for insert to authenticated
  with check ((select public.is_catalog_admin()));

drop policy if exists "Admins can update products" on public.products;
create policy "Admins can update products"
  on public.products for update to authenticated
  using ((select public.is_catalog_admin()))
  with check ((select public.is_catalog_admin()));

drop policy if exists "Admins can delete products" on public.products;
create policy "Admins can delete products"
  on public.products for delete to authenticated
  using ((select public.is_catalog_admin()));

drop policy if exists "Anyone can read catalog settings" on public.catalog_settings;
create policy "Anyone can read catalog settings"
  on public.catalog_settings for select to anon, authenticated
  using (true);

drop policy if exists "Admins can initialize catalogs" on public.catalog_settings;
create policy "Admins can initialize catalogs"
  on public.catalog_settings for insert to authenticated
  with check ((select public.is_catalog_admin()));

drop policy if exists "Admins can update catalog settings" on public.catalog_settings;
create policy "Admins can update catalog settings"
  on public.catalog_settings for update to authenticated
  using ((select public.is_catalog_admin()))
  with check ((select public.is_catalog_admin()));

grant select on public.admin_users to authenticated;
grant select on public.products to anon, authenticated;
grant insert, update, delete on public.products to authenticated;
grant select on public.catalog_settings to anon, authenticated;
grant insert, update on public.catalog_settings to authenticated;

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Anyone can view product images" on storage.objects;
create policy "Anyone can view product images"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'product-images');

drop policy if exists "Admins can upload product images" on storage.objects;
create policy "Admins can upload product images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'product-images' and (select public.is_catalog_admin()));

drop policy if exists "Admins can update product images" on storage.objects;
create policy "Admins can update product images"
  on storage.objects for update to authenticated
  using (bucket_id = 'product-images' and (select public.is_catalog_admin()))
  with check (bucket_id = 'product-images' and (select public.is_catalog_admin()));

drop policy if exists "Admins can remove product images" on storage.objects;
create policy "Admins can remove product images"
  on storage.objects for delete to authenticated
  using (bucket_id = 'product-images' and (select public.is_catalog_admin()));

-- After creating an account in Supabase Auth, grant it dashboard access:
-- insert into public.admin_users (user_id) values ('AUTH_USER_UUID');
