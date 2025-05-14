"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User, Session } from "@supabase/supabase-js";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  profile: any | null;
  isLoading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<any>;
  updatePassword: (password: string) => Promise<any>;
  updateProfile: (data: any) => Promise<any>;
  isAdmin: boolean;
  subscriptionTier: string;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [subscriptionTier, setSubscriptionTier] = useState("free");

  const supabase = createClient();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (error) throw error;
        setSession(session);
        setUser(session?.user || null);

        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setIsLoading(false);
        }

        const { data: authListener } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            setSession(session);
            setUser(session?.user || null);

            if (session?.user) {
              await fetchProfile(session.user.id);
            } else {
              setProfile(null);
              setIsAdmin(false);
              setSubscriptionTier("free");
              setIsLoading(false);
            }
          },
        );

        return () => {
          authListener.subscription.unsubscribe();
        };
      } catch (error) {
        console.error("Error fetching session:", error);
        setIsLoading(false);
      }
    };

    fetchSession();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;

      setProfile(data);
      setIsAdmin(data?.is_admin || false);
      setSubscriptionTier(data?.subscription_tier || "free");
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      // Create profile for new user
      if (data.user) {
        const { error: profileError } = await supabase.from("profiles").insert([
          {
            id: data.user.id,
            email,
            name,
            subscription_tier: "free",
            is_admin: email === "saulo-vp@hotmail.com", // Make this email an admin
          },
        ]);

        if (profileError) throw profileError;

        // If this is the admin email, update to premium subscription
        if (email === "saulo-vp@hotmail.com") {
          const oneYearFromNow = new Date();
          oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

          const { error: updateError } = await supabase
            .from("profiles")
            .update({
              subscription_tier: "annual",
              subscription_start: new Date().toISOString(),
              subscription_end: oneYearFromNow.toISOString(),
            })
            .eq("id", data.user.id);

          if (updateError) throw updateError;
        }
      }

      return data;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // Clear local state
      setUser(null);
      setSession(null);
      setProfile(null);
      setIsAdmin(false);
      setSubscriptionTier("free");

      // Force page reload to clear any cached state
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error resetting password:", error);
      throw error;
    }
  };

  const updatePassword = async (password: string) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password,
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error updating password:", error);
      throw error;
    }
  };

  const updateProfile = async (data: any) => {
    try {
      if (!user) throw new Error("No user logged in");

      const { error } = await supabase
        .from("profiles")
        .update({
          ...data,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) throw error;

      // Refresh profile data
      await fetchProfile(user.id);

      return { success: true };
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  const value = {
    user,
    session,
    profile,
    isLoading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile,
    isAdmin,
    subscriptionTier,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
