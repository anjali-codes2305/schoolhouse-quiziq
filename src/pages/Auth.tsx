import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/components/AuthContext';
import { Brain, Eye, EyeOff, Sparkles, AlertCircle, CheckCircle, Stars } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const { signUp, signIn, resetPassword, user, userProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Handle email confirmation
  useEffect(() => {
    const type = searchParams.get('type');
    const confirmed = searchParams.get('confirmed');
    
    if (confirmed === 'true') {
      toast({
        title: "Email Confirmed! ✅",
        description: "Your account has been confirmed. You can now sign in.",
      });
    }
    
    if (type === 'recovery') {
      setActiveTab('forgot');
      toast({
        title: "Password Recovery",
        description: "You can now reset your password using the form below.",
      });
    }
  }, [searchParams, toast]);

  // Redirect authenticated users based on their role
  useEffect(() => {
    if (user && userProfile) {
      const userRole = userProfile.role || 'student';
      console.log('Redirecting user with role:', userRole);
      
      if (userRole === 'admin') {
        navigate('/create-quiz');
      } else {
        navigate('/student-access');
      }
    }
  }, [user, userProfile, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let result;
      if (activeTab === 'signup') {
        if (!fullName.trim() || !username.trim()) {
          toast({
            title: "Error",
            description: "Please fill in all required fields.",
            variant: "destructive"
          });
          setLoading(false);
          return;
        }
        result = await signUp(email, password, fullName, username, role);
      } else {
        result = await signIn(email, password);
      }

      if (result.error) {
        toast({
          title: "Error",
          description: result.error.message,
          variant: "destructive"
        });
      } else {
        if (activeTab === 'signup') {
          toast({
            title: "Account Created! 🎉",
            description: result.message || "Please check your email to confirm your account before signing in.",
          });
        } else {
          toast({
            title: "Welcome back! 🎓",
            description: "Successfully signed in.",
          });
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const result = await resetPassword(email);
      if (result.error) {
        toast({
          title: "Error",
          description: result.error.message,
          variant: "destructive"
        });
      } else {
        setResetEmailSent(true);
        toast({
          title: "Success!",
          description: "Password reset email sent! Check your inbox and spam folder.",
        });
      }
    } catch (error) {
      console.error('Password reset error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            <Stars className="h-4 w-4 text-cyan-400" />
          </div>
        ))}
      </div>

      <Navigation />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8 relative z-10">
        <Card className="w-full max-w-md animate-fade-in hover-scale bg-white/95 backdrop-blur-lg border-0 shadow-2xl transform transition-all duration-300 hover:shadow-3xl">
          <CardHeader className="text-center relative">
            <div className="bg-gradient-to-br from-purple-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse shadow-lg">
              <Brain className="h-8 w-8 text-white animate-bounce" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent animate-fade-in">
              {activeTab === 'signup' ? 'Join QuizIQ ✨' : activeTab === 'forgot' ? 'Reset Password 🔑' : 'Welcome Back! 🎓'}
            </CardTitle>
            <p className="text-gray-600 animate-fade-in delay-200">
              {activeTab === 'signup' 
                ? 'Create your account to start your learning journey' 
                : activeTab === 'forgot'
                ? 'Enter your email to reset your password'
                : 'Sign in to continue your educational adventure'
              }
            </p>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-6 bg-gradient-to-r from-purple-50 to-cyan-50">
                <TabsTrigger value="signin" className="text-sm transition-all duration-200 hover:scale-105">Sign In</TabsTrigger>
                <TabsTrigger value="signup" className="text-sm transition-all duration-200 hover:scale-105">Sign Up</TabsTrigger>
                <TabsTrigger value="forgot" className="text-sm transition-all duration-200 hover:scale-105">Reset</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin" className="animate-fade-in">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="transition-all duration-200 focus:scale-[1.02] focus:shadow-lg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="transition-all duration-200 focus:scale-[1.02] focus:shadow-lg pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent transition-all duration-200 hover:scale-110"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <Button
                      type="button"
                      variant="link"
                      className="text-sm text-purple-600 hover:text-purple-700 p-0 h-auto transition-all duration-200 hover:scale-105"
                      onClick={() => setActiveTab('forgot')}
                    >
                      Forgot your password?
                    </Button>
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg transform"
                    size="lg"
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <Sparkles className="h-4 w-4 animate-spin" />
                        <span>Signing In...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4" />
                        <span>Sign In</span>
                      </div>
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="animate-fade-in">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="transition-all duration-200 focus:scale-[1.02] focus:shadow-lg"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="username">Username *</Label>
                      <Input
                        id="username"
                        type="text"
                        placeholder="Choose username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="transition-all duration-200 focus:scale-[1.02] focus:shadow-lg"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="transition-all duration-200 focus:scale-[1.02] focus:shadow-lg"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        className="transition-all duration-200 focus:scale-[1.02] focus:shadow-lg pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent transition-all duration-200 hover:scale-110"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">Minimum 6 characters</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">I am a... *</Label>
                    <Select value={role} onValueChange={setRole}>
                      <SelectTrigger className="transition-all duration-200 focus:scale-[1.02] focus:shadow-lg">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">🎓 Student - Take Quizzes</SelectItem>
                        <SelectItem value="admin">👨‍🏫 Teacher - Create Quizzes</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">
                      {role === 'student' 
                        ? 'As a student, you can take quizzes created by teachers' 
                        : 'As a teacher, you can create quizzes and view student results'
                      }
                    </p>
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg transform"
                    size="lg"
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <Sparkles className="h-4 w-4 animate-spin" />
                        <span>Creating Account...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Sparkles className="h-4 w-4" />
                        <span>Create Account</span>
                      </div>
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="forgot" className="animate-fade-in">
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="reset-email">Email Address</Label>
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="transition-all duration-200 focus:scale-[1.02] focus:shadow-lg"
                    />
                  </div>
                  
                  {resetEmailSent && (
                    <div className="flex items-start space-x-2 text-green-600 text-sm p-3 bg-green-50 rounded-lg animate-fade-in">
                      <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Email sent successfully!</p>
                        <p>Check your email inbox and spam folder for password reset instructions.</p>
                      </div>
                    </div>
                  )}
                  
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg transform"
                    size="lg"
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <Sparkles className="h-4 w-4 animate-spin" />
                        <span>Sending...</span>
                      </div>
                    ) : (
                      'Send Reset Email'
                    )}
                  </Button>
                  
                  <div className="text-center">
                    <Button
                      type="button"
                      variant="link"
                      className="text-sm text-purple-600 hover:text-purple-700 transition-all duration-200 hover:scale-105"
                      onClick={() => {
                        setActiveTab('signin');
                        setResetEmailSent(false);
                      }}
                    >
                      Back to Sign In
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-700 flex items-center">
                <CheckCircle className="h-3 w-3 mr-1" />
                <strong>Secure Connection:</strong> Your data is protected with Supabase authentication.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
