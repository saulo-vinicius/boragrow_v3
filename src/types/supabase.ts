export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      plants: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          strain: string;
          stage: string;
          user_id: string;
          image_url: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          strain: string;
          stage: string;
          user_id: string;
          image_url?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          strain?: string;
          stage?: string;
          user_id?: string;
          image_url?: string | null;
        };
      };
      plant_metrics: {
        Row: {
          id: string;
          created_at: string;
          plant_id: string;
          ph: number;
          ppm: number;
          temperature: number;
          humidity: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          plant_id: string;
          ph: number;
          ppm: number;
          temperature: number;
          humidity: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          plant_id?: string;
          ph?: number;
          ppm?: number;
          temperature?: number;
          humidity?: number;
        };
      };
      recipes: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          description: string | null;
          user_id: string;
          data: Json;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          description?: string | null;
          user_id: string;
          data: Json;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          description?: string | null;
          user_id?: string;
          data?: Json;
        };
      };
      profiles: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          email: string;
          name: string | null;
          avatar_url: string | null;
          subscription_tier: string;
          subscription_start: string | null;
          subscription_end: string | null;
          is_admin: boolean;
        };
        Insert: {
          id: string;
          created_at?: string;
          updated_at?: string;
          email: string;
          name?: string | null;
          avatar_url?: string | null;
          subscription_tier?: string;
          subscription_start?: string | null;
          subscription_end?: string | null;
          is_admin?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          email?: string;
          name?: string | null;
          avatar_url?: string | null;
          subscription_tier?: string;
          subscription_start?: string | null;
          subscription_end?: string | null;
          is_admin?: boolean;
        };
      };
      suggested_items: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          category: string;
          price: string;
          link: string;
          featured: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          category: string;
          price: string;
          link: string;
          featured?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          category?: string;
          price?: string;
          link?: string;
          featured?: boolean;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
