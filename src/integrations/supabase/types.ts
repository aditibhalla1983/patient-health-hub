export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      health_submissions: {
        Row: {
          age: number
          condition: Database["public"]["Enums"]["health_condition"]
          created_at: string
          duration: string | null
          gender: Database["public"]["Enums"]["gender_type"] | null
          id: string
          medications: string | null
          notes: string | null
          symptoms: string
          triggers: string | null
          user_id: string
        }
        Insert: {
          age: number
          condition: Database["public"]["Enums"]["health_condition"]
          created_at?: string
          duration?: string | null
          gender?: Database["public"]["Enums"]["gender_type"] | null
          id?: string
          medications?: string | null
          notes?: string | null
          symptoms: string
          triggers?: string | null
          user_id: string
        }
        Update: {
          age?: number
          condition?: Database["public"]["Enums"]["health_condition"]
          created_at?: string
          duration?: string | null
          gender?: Database["public"]["Enums"]["gender_type"] | null
          id?: string
          medications?: string | null
          notes?: string | null
          symptoms?: string
          triggers?: string | null
          user_id?: string
        }
        Relationships: []
      }
      lupus_data: {
        Row: {
          created_at: string
          flare_frequency_per_month: number | null
          id: string
          organ_involvement: string | null
          quality_of_life_score: number | null
          submission_id: string
          user_id: string
          uv_trigger: boolean | null
        }
        Insert: {
          created_at?: string
          flare_frequency_per_month?: number | null
          id?: string
          organ_involvement?: string | null
          quality_of_life_score?: number | null
          submission_id: string
          user_id: string
          uv_trigger?: boolean | null
        }
        Update: {
          created_at?: string
          flare_frequency_per_month?: number | null
          id?: string
          organ_involvement?: string | null
          quality_of_life_score?: number | null
          submission_id?: string
          user_id?: string
          uv_trigger?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "lupus_data_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "health_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      migraine_data: {
        Row: {
          aura: boolean | null
          created_at: string
          frequency_per_month: number | null
          id: string
          severity: number | null
          submission_id: string
          treatment_effectiveness: number | null
          trigger_type: string | null
          user_id: string
        }
        Insert: {
          aura?: boolean | null
          created_at?: string
          frequency_per_month?: number | null
          id?: string
          severity?: number | null
          submission_id: string
          treatment_effectiveness?: number | null
          trigger_type?: string | null
          user_id: string
        }
        Update: {
          aura?: boolean | null
          created_at?: string
          frequency_per_month?: number | null
          id?: string
          severity?: number | null
          submission_id?: string
          treatment_effectiveness?: number | null
          trigger_type?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "migraine_data_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "health_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          persona: Database["public"]["Enums"]["persona_type"]
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          persona?: Database["public"]["Enums"]["persona_type"]
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          persona?: Database["public"]["Enums"]["persona_type"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      gender_type: "female" | "male" | "non-binary" | "prefer-not"
      health_condition:
        | "Migraine"
        | "Lupus"
        | "Arthritis"
        | "Diabetes"
        | "Asthma"
        | "Heart Disease"
        | "Depression"
        | "Anxiety"
        | "Other"
      persona_type: "patient" | "caregiver"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      gender_type: ["female", "male", "non-binary", "prefer-not"],
      health_condition: [
        "Migraine",
        "Lupus",
        "Arthritis",
        "Diabetes",
        "Asthma",
        "Heart Disease",
        "Depression",
        "Anxiety",
        "Other",
      ],
      persona_type: ["patient", "caregiver"],
    },
  },
} as const
