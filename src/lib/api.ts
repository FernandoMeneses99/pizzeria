import { supabase, hasSupabase, type MenuItem, type Reservation } from './supabase'
import { fallbackMenu } from '../data/fallback'

export async function getMenuItems(): Promise<MenuItem[]> {
  if (!hasSupabase || !supabase) return fallbackMenu
  const { data, error } = await supabase.from('menu_items').select('*').order('sort_order', { ascending: true }).order('name')
  if (error || !data || data.length === 0) return fallbackMenu
  return data as MenuItem[]
}

export async function getFeaturedMenu(): Promise<MenuItem[]> {
  const items = await getMenuItems()
  return items.filter(i => i.featured || i.category === 'pizza').slice(0, 6)
}

export async function createReservation(payload: Reservation) {
  if (!hasSupabase || !supabase) throw new Error('Supabase no configurado. Define VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY.')
  const { error } = await supabase.from('reservations').insert([payload])
  if (error) throw error
}

export async function getReservations(): Promise<Reservation[]> {
  if (!hasSupabase || !supabase) return []
  const { data, error } = await supabase.from('reservations').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return (data || []) as Reservation[]
}

export async function getSiteConfig(): Promise<Record<string, any>> {
  if (!hasSupabase || !supabase) return {}
  const { data } = await supabase.from('site_config').select('*')
  const map: Record<string, any> = {}
  ;(data || []).forEach((r: any) => { map[r.key] = r.value })
  return map
}

export async function upsertMenuItem(item: Partial<MenuItem>) {
  if (!hasSupabase || !supabase) throw new Error('Supabase no configurado')
  const { error } = await supabase.from('menu_items').upsert(item).select()
  if (error) throw error
}
export async function deleteMenuItem(id: string) {
  if (!hasSupabase || !supabase) throw new Error('Supabase no configurado')
  const { error } = await supabase.from('menu_items').delete().eq('id', id)
  if (error) throw error
}
export async function upsertSiteConfig(key: string, value: any) {
  if (!hasSupabase || !supabase) throw new Error('Supabase no configurado')
  const { error } = await supabase.from('site_config').upsert({ key, value }, { onConflict: 'key' })
  if (error) throw error
}