
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  userProfile: any;
  signUp: (email: string, password: string, fullName: string, username: string, role: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Defer profile fetch to avoid blocking auth state change
          setTimeout(async () => {
            try {
              const { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .maybeSingle();
              
              if (error) {
                console.log('Profile fetch error (this is normal for new users):', error);
                setUserProfile(null);
              } else {
                setUserProfile(profile);
              }
            } catch (error) {
              console.log('Profile fetch failed:', error);
              setUserProfile(null);
            }
          }, 100);
        } else {
          setUserProfile(null);
        }
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      console.log('Initial session check:', session);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        try {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .maybeSingle();
          
          if (error) {
            console.log('Profile fetch error (this is normal for new users):', error);
            setUserProfile(null);
          } else {
            setUserProfile(profile);
          }
        } catch (error) {
          console.log('Profile fetch failed:', error);
          setUserProfile(null);
        }
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string, username: string, role: string) => {
    try {
      console.log('Attempting signup with:', { email, fullName, username, role });
      
      // Use current domain for redirect URL
      const redirectUrl = `${window.location.origin}/auth?confirmed=true`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: fullName,
            username: username,
            role: role
          }
        }
      });

      console.log('Signup response:', { data, error });
      
      if (error) {
        console.error('Signup error:', error);
        return { error };
      }

      // Check if user needs email confirmation
      if (data.user && !data.session) {
        return { 
          error: null,
          message: 'Please check your email and click the confirmation link to complete your registration.'
        };
      }

      return { error: null };
    } catch (error: any) {
      console.error('Signup exception:', error);
      return { error: { message: 'An unexpected error occurred during signup.' } };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting signin with:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      console.log('Signin response:', { data, error });
      
      if (error) {
        console.error('Signin error:', error);
        return { error };
      }

      return { error: null };
    } catch (error: any) {
      console.error('Signin exception:', error);
      return { error: { message: 'An unexpected error occurred during signin.' } };
    }
  };

  const signOut = async () => {
    try {
      console.log('Attempting signout');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Signout error:', error);
      } else {
        setUser(null);
        setSession(null);
        setUserProfile(null);
      }
    } catch (error) {
      console.error('Signout exception:', error);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      console.log('Attempting password reset for:', email);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth?type=recovery`
      });

      console.log('Password reset response:', { error });
      
      if (error) {
        console.error('Password reset error:', error);
        return { error };
      }

      return { error: null };
    } catch (error) {
      console.error('Password reset exception:', error);
      return { error: { message: 'An unexpected error occurred during password reset.' } };
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      loading, 
      userProfile, 
      signUp, 
      signIn, 
      signOut, 
      resetPassword 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
