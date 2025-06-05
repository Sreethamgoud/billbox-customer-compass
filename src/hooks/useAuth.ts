
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // When user signs up or signs in, update sample data with their ID
        if (event === 'SIGNED_IN' && session?.user) {
          setTimeout(() => {
            updateSampleDataForUser(session.user.id);
          }, 0);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session:', session?.user?.id);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const updateSampleDataForUser = async (userId: string) => {
    try {
      console.log('Updating sample data for user:', userId);
      const { error } = await supabase.rpc('update_sample_data_for_user', {
        user_uuid: userId
      } as { user_uuid: string });
      
      if (error) {
        console.error('Error updating sample data:', error);
      } else {
        console.log('Sample data updated successfully');
        toast({
          title: "Welcome!",
          description: "Sample data has been loaded for your account",
        });
      }
    } catch (error) {
      console.error('Failed to update sample data:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string) => {
    const redirectUrl = `${window.location.origin}/dashboard`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl
      }
    });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return {
    user,
    session,
    signIn,
    signUp,
    signOut,
    loading,
  };
};
