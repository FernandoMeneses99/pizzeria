import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export const hasSupabase = !!supabase

export type MenuCategory = 'pizza' | 'drinks' | 'burgers' | 'pasta'
export interface MenuItem {
  id: string
  name: string
  description: string | null
  price: number
  image_url: string | null
  category: MenuCategory
  featured?: boolean
  sort_order?: number
}
export interface Reservation {
  id?: string
  name: string
  email?: string
  phone?: string
  guests?: number
  reservation_date?: string
  reservation_time?: string
  message?: string
  status?: string
  created_at?: string
}
export interface SiteConfig {
  id?: string
  key: string
  value: any
}