import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Navigation from '@/components/Navigation';
import QuestionTimer from '@/components/QuestionTimer';
import QuizSubmissionDialog from '@/components/QuizSubmissionDialog';
import { CheckCircle, ArrowRight, Lock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: number;
  question_order: number;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  subject: string;
  time_limit: number;
  quiz_questions: Question[];
}

const Quiz = () => {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quizData, setQuizData] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [questionTimeLeft, setQuestionTimeLeft] = useState(30);
  const [totalTimeLeft, setTotalTimeLeft] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [showSubmissionDialog, setShowSubmissionDialog] = useState(false);
  const [isQuestionLocked, setIsQuestionLocked] = useState(false);

  useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to take quizzes",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }

    if (userProfile && userProfile.role !== 'student') {
      toast({
        title: "Access Denied",
        description: "Only students can take quizzes. Teachers should create quizzes instead.",
        variant: "destructive"
      });
      navigate('/create-quiz');
      return;
    }

    const data = sessionStorage.getItem('currentQuiz');
    if (!data) {
      toast({
        title: "No Quiz Found",
        description: "Please enter a valid quiz code first",
        variant: "destructive"
      });
      navigate('/student-access');
      return;
    }

    try {
      const parsedData = JSON.parse(data);
      console.log('Loaded quiz data:', parsedData);
      setQuizData(parsedData);
      setAnswers(new Array(parsedData.quiz.quiz_questions.length).fill(null));
      
      // Calculate time per question (30 seconds default, or total time divided by questions)
      const timePerQuestion = Math.max(30, Math.floor(parsedData.quiz.time_limit / parsedData.quiz.quiz_questions.length));
      setQuestionTimeLeft(timePerQuestion);
      setTotalTimeLeft(parsedData.quiz.time_limit);
      setLoading(false);
    } catch (error) {
      console.error('Error parsing quiz data:', error);
      toast({
        title: "Error",
        description: "Invalid quiz data",
        variant: "destructive"
      });
      navigate('/student-access');
    }
  }, [user, userProfile, navigate, toast]);

  useEffect(() => {
    if (totalTimeLeft > 0 && !loading) {
      const timer = setTimeout(() => setTotalTimeLeft(totalTimeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (totalTimeLeft === 0 && !loading) {
      handleSubmitQuiz();
    }
  }, [totalTimeLeft, loading]);

  const handleQuestionTimeUp = () => {
    // Lock the current question instead of auto-advancing
    setIsQuestionLocked(true);
    setIsTimerActive(false);
    
    toast({
      title: "Time's Up! ⏰",
      description: "This question is now locked. Click Next to continue.",
      duration: 3000
    });
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (!isQuestionLocked && questionTimeLeft > 0) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleNext = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);

    if (currentQuestion < quizData.quiz.quiz_questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsQuestionLocked(false);
      setIsTimerActive(true);
      
      // Reset timer for next question
      const timePerQuestion = Math.max(30, Math.floor(quizData.quiz.time_limit / quizData.quiz.quiz_questions.length));
      setQuestionTimeLeft(timePerQuestion);
    } else {
      // Show confirmation dialog before submission
      setShowSubmissionDialog(true);
    }
  };

  const handleSubmitQuiz = async (finalAnswers: (number | null)[] = answers) => {
    setIsTimerActive(false);
    setShowSubmissionDialog(false);
    
    try {
      const score = finalAnswers.reduce((total, answer, index) => {
        const question = quizData.quiz.quiz_questions[index];
        return total + (answer === question.correct_answer ? 1 : 0);
      }, 0);

      const percentage = Math.round((score / quizData.quiz.quiz_questions.length) * 100);

      // Show thank you message
      toast({
        title: "Thank you for using QuizIQ! 🎓",
        description: "Your quiz has been submitted successfully",
        duration: 3000
      });

      const { error } = await supabase
        .from('quiz_attempts')
        .insert({
          quiz_id: quizData.quiz.id,
          student_id: user!.id,
          student_name: quizData.student.name,
          roll_number: quizData.student.rollNumber,
          answers: finalAnswers,
          score,
          total_questions: quizData.quiz.quiz_questions.length,
          percentage,
          time_taken: quizData.quiz.time_limit - totalTimeLeft
        });

      if (error) {
        console.error('Error saving quiz attempt:', error);
        toast({
          title: "Warning",
          description: "Quiz completed but couldn't save to database. Your results are still available.",
          variant: "destructive"
        });
      }

      const quizResults = {
        ...quizData,
        answers: finalAnswers,
        score,
        totalQuestions: quizData.quiz.quiz_questions.length,
        percentage,
        completedAt: new Date().toISOString(),
        questions: quizData.quiz.quiz_questions
      };

      sessionStorage.setItem('quizResults', JSON.stringify(quizResults));
      navigate('/results');
    } catch (error) {
      console.error('Error submitting quiz:', error);
      toast({
        title: "Error",
        description: "Failed to submit quiz. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (loading || !quizData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-xl font-medium">Loading quiz...</div>
          <div className="text-purple-200 text-sm mt-2">Preparing your questions</div>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / quizData.quiz.quiz_questions.length) * 100;
  const currentQuestionData = quizData.quiz.quiz_questions[currentQuestion];
  const options = [
    currentQuestionData.option_a,
    currentQuestionData.option_b,
    currentQuestionData.option_c,
    currentQuestionData.option_d
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navigation 
        schoolName={quizData.school?.name} 
        schoolLogo={quizData.school?.logo_url} 
      />
      
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
        {/* Enhanced Quiz Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-white/20">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {quizData.quiz.title}
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-purple-200">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Welcome,</span>
                <span className="font-bold text-cyan-300">{quizData.student.name}</span>
              </div>
              {quizData.student.rollNumber !== 'N/A' && (
                <div className="flex items-center gap-2">
                  <span className="text-sm">Roll:</span>
                  <span className="font-medium">{quizData.student.rollNumber}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="text-sm">Subject:</span>
                <span className="font-medium text-green-300">{quizData.quiz.subject}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Progress and Timer */}
        <div className="mb-8 space-y-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <span className="text-white font-medium">
                  Question {currentQuestion + 1} of {quizData.quiz.quiz_questions.length}
                </span>
                <div className="bg-white/20 px-3 py-1 rounded-full text-xs text-white font-medium">
                  {Math.round(progress)}% Complete
                </div>
                {isQuestionLocked && (
                  <div className="flex items-center gap-2 bg-red-500/20 px-3 py-1 rounded-full text-xs text-red-300">
                    <Lock className="h-3 w-3" />
                    Locked
                  </div>
                )}
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <QuestionTimer
                  timeLimit={questionTimeLeft}
                  onTimeUp={handleQuestionTimeUp}
                  isActive={isTimerActive && !isQuestionLocked}
                  onTick={setQuestionTimeLeft}
                />
                <div className="text-sm font-medium text-gray-300 bg-white/10 px-3 py-2 rounded-full">
                  Total: {formatTime(totalTimeLeft)}
                </div>
              </div>
            </div>
            <Progress value={progress} className="w-full mt-4 h-2" />
          </div>
        </div>

        {/* Enhanced Question Card */}
        <Card className="animate-fade-in hover-scale bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <CardTitle className="text-xl md:text-2xl text-gray-900 leading-relaxed">
                {currentQuestionData.question_text}
              </CardTitle>
              <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full ml-4 whitespace-nowrap">
                {currentQuestion + 1}/{quizData.quiz.quiz_questions.length}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            <div className="grid gap-4">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={isQuestionLocked}
                  className={`w-full p-4 md:p-5 text-left rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
                    selectedAnswer === index
                      ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-cyan-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                  } ${isQuestionLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 flex items-center justify-center font-bold text-sm md:text-base transition-all duration-200 ${
                      selectedAnswer === index 
                        ? 'border-purple-500 bg-purple-500 text-white shadow-lg' 
                        : 'border-gray-300 text-gray-600 bg-white'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-gray-900 text-base md:text-lg font-medium flex-1">
                      {option}
                    </span>
                    {selectedAnswer === index && (
                      <CheckCircle className="h-6 w-6 text-purple-500 animate-scale-in" />
                    )}
                    {isQuestionLocked && (
                      <Lock className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </button>
              ))}
            </div>
            
            <div className="pt-6 border-t border-gray-100">
              <Button
                onClick={handleNext}
                disabled={selectedAnswer === null && !isQuestionLocked}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                size="lg"
              >
                {isQuestionLocked ? (
                  <div className="flex items-center justify-center">
                    <span className="mr-2">Continue</span>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                ) : currentQuestion === quizData.quiz.quiz_questions.length - 1 ? (
                  <div className="flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span>Finish Quiz</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <span>Next Question</span>
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </div>
                )}
              </Button>
              
              {selectedAnswer === null && !isQuestionLocked && (
                <p className="text-center text-sm text-gray-500 mt-3 animate-pulse">
                  Please select an answer to continue
                </p>
              )}
              {isQuestionLocked && (
                <p className="text-center text-sm text-red-600 mt-3 flex items-center justify-center gap-2">
                  <Lock className="h-4 w-4" />
                  Time expired - Question locked
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quiz Submission Confirmation Dialog */}
      <QuizSubmissionDialog
        isOpen={showSubmissionDialog}
        onClose={() => setShowSubmissionDialog(false)}
        onConfirm={() => handleSubmitQuiz()}
        currentQuestion={currentQuestion}
        totalQuestions={quizData?.quiz?.quiz_questions?.length || 0}
        timeLeft={totalTimeLeft}
      />
    </div>
  );
};

export default Quiz;
