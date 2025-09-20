import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          address: string | null
          password_hash: string
          is_admin: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          address?: string | null
          password_hash: string
          is_admin?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          address?: string | null
          password_hash?: string
          is_admin?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      sweets: {
        Row: {
          id: string
          name: string
          category: string
          price: number
          quantity: number
          description: string | null
          image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          category: string
          price: number
          quantity?: number
          description?: string | null
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string
          price?: number
          quantity?: number
          description?: string | null
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      purchases: {
        Row: {
          id: string
          user_id: string
          sweet_id: string
          quantity: number
          total_price: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          sweet_id: string
          quantity?: number
          total_price: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          sweet_id?: string
          quantity?: number
          total_price?: number
          created_at?: string
        }
      }
    }
  }
}