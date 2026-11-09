/**
 * DeepLayer Solutions — Supabase Database Types
 *
 * Generated TypeScript representations of the production PostgreSQL schema.
 * Matches `supabase/migrations/20261109000000_create_core_schema.sql`.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type ContactSubmissionStatus =
  | "new"
  | "in_review"
  | "contacted"
  | "closed"
  | "spam";

export type SubscriberStatus = "pending" | "active" | "unsubscribed";

export type AdminRole = "superadmin" | "admin" | "editor";

export type EmailType =
  | "contact_notification"
  | "contact_autoresponder"
  | "newsletter_confirmation"
  | "newsletter_welcome"
  | "system_alert";

export type EmailLogStatus =
  | "queued"
  | "sent"
  | "delivered"
  | "failed"
  | "bounced";

export interface Database {
  public: {
    Tables: {
      contact_submissions: {
        Row: {
          id: string;
          reference_number: string;
          full_name: string;
          email: string;
          company: string | null;
          service: string | null;
          subject: string;
          message: string;
          status: ContactSubmissionStatus;
          admin_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          reference_number?: string;
          full_name: string;
          email: string;
          company?: string | null;
          service?: string | null;
          subject: string;
          message: string;
          status?: ContactSubmissionStatus;
          admin_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          reference_number?: string;
          full_name?: string;
          email?: string;
          company?: string | null;
          service?: string | null;
          subject?: string;
          message?: string;
          status?: ContactSubmissionStatus;
          admin_notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };

      subscribers: {
        Row: {
          id: string;
          email: string;
          status: SubscriberStatus;
          confirmation_token_hash: string | null;
          token_expires_at: string | null;
          subscribed_at: string | null;
          unsubscribed_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          status?: SubscriberStatus;
          confirmation_token_hash?: string | null;
          token_expires_at?: string | null;
          subscribed_at?: string | null;
          unsubscribed_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          status?: SubscriberStatus;
          confirmation_token_hash?: string | null;
          token_expires_at?: string | null;
          subscribed_at?: string | null;
          unsubscribed_at?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };

      cookie_consents: {
        Row: {
          id: string;
          consent_id: string;
          necessary: boolean;
          analytics: boolean;
          marketing: boolean;
          policy_version: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          consent_id: string;
          necessary?: boolean;
          analytics?: boolean;
          marketing?: boolean;
          policy_version?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          consent_id?: string;
          necessary?: boolean;
          analytics?: boolean;
          marketing?: boolean;
          policy_version?: string;
          created_at?: string;
        };
        Relationships: [];
      };

      email_logs: {
        Row: {
          id: string;
          recipient: string;
          email_type: EmailType;
          related_record_id: string | null;
          provider_message_id: string | null;
          status: EmailLogStatus;
          error_message: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          recipient: string;
          email_type: EmailType;
          related_record_id?: string | null;
          provider_message_id?: string | null;
          status?: EmailLogStatus;
          error_message?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          recipient?: string;
          email_type?: EmailType;
          related_record_id?: string | null;
          provider_message_id?: string | null;
          status?: EmailLogStatus;
          error_message?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };

      admin_profiles: {
        Row: {
          id: string;
          role: AdminRole;
          created_at: string;
        };
        Insert: {
          id: string;
          role?: AdminRole;
          created_at?: string;
        };
        Update: {
          id?: string;
          role?: AdminRole;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "admin_profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };

      rate_limits: {
        Row: {
          key: string;
          count: number;
          reset_at: string;
          created_at: string;
        };
        Insert: {
          key: string;
          count?: number;
          reset_at: string;
          created_at?: string;
        };
        Update: {
          key?: string;
          count?: number;
          reset_at?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
      generate_contact_reference: {
        Args: Record<string, never>;
        Returns: string;
      };
    };
    Enums: {
      contact_submission_status: ContactSubmissionStatus;
      subscriber_status: SubscriberStatus;
      admin_role: AdminRole;
      email_type: EmailType;
      email_log_status: EmailLogStatus;
    };
    CompositeTypes: Record<string, never>;
  };
}
