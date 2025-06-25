
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useAuth } from '@/components/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Brain, Sparkles, User, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const StudentAccess = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [quizCode, setQuizCode] = useState(searchParams.get('code') || '');
  const [rollNumber, setRollNumber] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      toast({
        title: "Please Sign In",
        description: "You need to be logged in to take quizzes",
        variant: "destructive"
      });
      navigate('/auth');
    }
  }, [user, navigate, toast]);

  const handleStartQuiz = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "Please sign in first",
        variant: "destructive"
      });
      return;
    }

    if (!quizCode.trim()) {
      toast({
        title: "Quiz Code Required",
        description: "Please enter a quiz code to continue",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    console.log('Looking for quiz with code:', quizCode.toUpperCase());

    try {
      // Find the quiz by code
      const { data: quiz, error: quizError } = await supabase
        .from('quizzes')
        .select(`
          *,
          quiz_questions (*)
        `)
        .eq('quiz_code', quizCode.toUpperCase())
        .eq('is_active', true)
        .single();

      console.log('Quiz search result:', { quiz, error: quizError });

      if (quizError || !quiz) {
        console.error('Quiz not found:', quizError);
        toast({
          title: "Quiz Not Found",
          description: "Invalid quiz code or quiz is no longer active. Please check the code and try again.",
          variant: "destructive"
        });
        return;
      }

      if (!quiz.quiz_questions || quiz.quiz_questions.length === 0) {
        toast({
          title: "Quiz Error",
          description: "This quiz has no questions. Please contact your teacher.",
          variant: "destructive"
        });
        return;
      }

      console.log('Found quiz:', quiz.title, 'with', quiz.quiz_questions.length, 'questions');

      // Store quiz data for the quiz page
      sessionStorage.setItem('currentQuiz', JSON.stringify({
        quiz,
        student: {
          id: user.id,
          name: user.user_metadata?.full_name || user.user_metadata?.username || user.email,
          rollNumber: rollNumber || 'N/A'
        }
      }));

      toast({
        title: "Quiz Found! 🎯",
        description: `Starting "${quiz.title}" with ${quiz.quiz_questions.length} questions`,
      });

      navigate('/quiz');

    } catch (error: any) {
      console.error('Quiz loading error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to load quiz. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null; // Will redirect to auth
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navigation />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        <Card className="w-full max-w-md animate-fade-in hover-scale bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader className="text-center">
            <div className="bg-gradient-to-br from-purple-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Brain className="h-8 w-8 text-white animate-bounce" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Take Quiz 📝
            </CardTitle>
            <p className="text-gray-600">
              Enter quiz code and your details to start your assessment
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="quizCode" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Quiz Code *
              </Label>
              <Input
                id="quizCode"
                type="text"
                placeholder="Enter 6-digit quiz code"
                value={quizCode}
                onChange={(e) => setQuizCode(e.target.value.toUpperCase())}
                className="transition-all duration-200 focus:scale-[1.02] focus:shadow-lg font-mono text-center text-lg tracking-wider"
                maxLength={6}
              />
              <p className="text-xs text-gray-500">Get this code from your teacher or the quiz link</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="rollNumber" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Roll Number (Optional)
              </Label>
              <Input
                id="rollNumber"
                type="text"
                placeholder="Enter your roll number or ID"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                className="transition-all duration-200 focus:scale-[1.02] focus:shadow-lg"
              />
            </div>
            
            <Button
              onClick={handleStartQuiz}
              disabled={loading || !quizCode.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg transform"
              size="lg"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Loading Quiz...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-4 w-4" />
                  <span>Start Quiz Adventure</span>
                </div>
              )}
            </Button>
            
            <div className="text-center bg-gradient-to-r from-purple-50 to-cyan-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center justify-center gap-2 mb-2">
                <User className="h-4 w-4 text-purple-600" />
                <p className="text-sm font-medium text-purple-700">
                  Welcome, {user.user_metadata?.full_name || user.user_metadata?.username || user.email}!
                </p>
              </div>
              <p className="text-xs text-purple-600">
                Make sure you have a stable internet connection before starting
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default StudentAccess;
