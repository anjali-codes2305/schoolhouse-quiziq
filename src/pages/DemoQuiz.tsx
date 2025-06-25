
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Clock, CheckCircle, ArrowRight, Play, Trophy } from 'lucide-react';

interface Question {
  id: number;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: number;
}

const demoQuestions: Question[] = [
  {
    id: 1,
    question_text: "What is the capital of France?",
    option_a: "London",
    option_b: "Berlin",
    option_c: "Paris",
    option_d: "Madrid",
    correct_answer: 2
  },
  {
    id: 2,
    question_text: "Which planet is known as the Red Planet?",
    option_a: "Venus",
    option_b: "Mars",
    option_c: "Jupiter",
    option_d: "Saturn",
    correct_answer: 1
  },
  {
    id: 3,
    question_text: "What is 2 + 2 × 3?",
    option_a: "12",
    option_b: "8",
    option_c: "10",
    option_d: "6",
    correct_answer: 1
  },
  {
    id: 4,
    question_text: "Who wrote the play 'Romeo and Juliet'?",
    option_a: "Charles Dickens",
    option_b: "William Shakespeare",
    option_c: "Jane Austen",
    option_d: "Mark Twain",
    correct_answer: 1
  },
  {
    id: 5,
    question_text: "What is the largest mammal in the world?",
    option_a: "African Elephant",
    option_b: "Blue Whale",
    option_c: "Giraffe",
    option_d: "Polar Bear",
    correct_answer: 1
  }
];

const DemoQuiz = () => {
  const navigate = useNavigate();
  const [isStarted, setIsStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(demoQuestions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per question
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (timeLeft > 0 && !isQuizComplete && isStarted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isQuizComplete && isStarted) {
      handleTimeUp();
    }
  }, [timeLeft, isQuizComplete, isStarted]);

  const handleStart = () => {
    setIsStarted(true);
    setTimeLeft(30);
  };

  const handleTimeUp = () => {
    // Auto-skip to next question when time is up
    handleNext();
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (timeLeft > 0) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleNext = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);

    if (currentQuestion < demoQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setTimeLeft(30); // Reset timer for next question
    } else {
      // Quiz complete - calculate score
      const finalScore = newAnswers.reduce((total, answer, index) => {
        const question = demoQuestions[index];
        return total + (answer === question.correct_answer ? 1 : 0);
      }, 0);
      setScore(finalScore);
      setIsQuizComplete(true);
    }
  };

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <Navigation />
        
        <div className="max-w-4xl mx-auto px-4 py-16">
          <Card className="animate-fade-in bg-white/95 backdrop-blur-sm text-center">
            <CardHeader>
              <div className="bg-gradient-to-br from-purple-500 to-cyan-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Play className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-3xl text-gray-900 mb-4">
                QuizIQ Demo Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-purple-100 to-cyan-100 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">What you'll experience:</h3>
                <div className="grid md:grid-cols-2 gap-4 text-left">
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-purple-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Timer Feature</h4>
                      <p className="text-sm text-gray-600">30 seconds per question with auto-skip</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Interactive Questions</h4>
                      <p className="text-sm text-gray-600">Multiple choice with instant feedback</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Trophy className="h-5 w-5 text-yellow-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Score Tracking</h4>
                      <p className="text-sm text-gray-600">Real-time progress and results</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <ArrowRight className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Smooth Flow</h4>
                      <p className="text-sm text-gray-600">Seamless question navigation</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Experience our complete quiz platform with {demoQuestions.length} sample questions. 
                  This demo showcases all the features that make QuizIQ perfect for schools and students.
                </p>
                
                <Button 
                  onClick={handleStart}
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 transition-all duration-200 hover:scale-105 text-lg px-8 py-6"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Start Demo Quiz
                </Button>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500 mb-4">Ready to create your own quizzes?</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button 
                      onClick={() => navigate('/auth')}
                      variant="outline"
                      className="border-purple-300 hover:bg-purple-50"
                    >
                      Sign Up as Teacher
                    </Button>
                    <Button 
                      onClick={() => navigate('/student-access')}
                      variant="outline"
                      className="border-cyan-300 hover:bg-cyan-50"
                    >
                      Join a Quiz as Student
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Footer />
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / demoQuestions.length) * 100;
  const currentQuestionData = demoQuestions[currentQuestion];
  const options = [
    currentQuestionData?.option_a,
    currentQuestionData?.option_b,
    currentQuestionData?.option_c,
    currentQuestionData?.option_d
  ];

  if (isQuizComplete) {
    const percentage = Math.round((score / demoQuestions.length) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <Navigation />
        
        <div className="max-w-4xl mx-auto px-4 py-16">
          <Card className="animate-fade-in bg-white/95 backdrop-blur-sm text-center">
            <CardHeader>
              <div className="bg-gradient-to-br from-green-500 to-teal-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="h-12 w-12 text-white" />
              </div>
              <CardTitle className="text-3xl text-gray-900 mb-4">
                🎉 Demo Quiz Complete!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-purple-100 to-cyan-100 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Demo Results</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      {score}/{demoQuestions.length}
                    </div>
                    <div className="text-sm text-gray-700">Questions Correct</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-600 mb-2">
                      {percentage}%
                    </div>
                    <div className="text-sm text-gray-700">Accuracy Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {demoQuestions.length}
                    </div>
                    <div className="text-sm text-gray-700">Questions Completed</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Great job! You've experienced QuizIQ's complete feature set including timer functionality, 
                  interactive questions, and automatic scoring. Ready to use it for your school?
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => window.location.reload()}
                    variant="outline"
                    className="border-purple-300 hover:bg-purple-50"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Try Demo Again
                  </Button>
                  <Button 
                    onClick={() => navigate('/')}
                    variant="outline"
                    className="border-gray-300 hover:bg-gray-50"
                  >
                    Back to Home
                  </Button>
                  <Button 
                    onClick={() => navigate('/auth')}
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                  >
                    Sign Up to Create Your Own Quiz
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
        {/* Quiz Header */}
        <div className="text-center mb-6 md:mb-8 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            QuizIQ Demo Quiz
          </h1>
          <p className="text-purple-200 text-sm md:text-base">
            Experience our quiz platform with timer functionality
          </p>
        </div>

        {/* Progress and Timer */}
        <div className="mb-6 md:mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-white gap-2">
            <span className="text-sm font-medium">
              Question {currentQuestion + 1} of {demoQuestions.length}
            </span>
            <div className={`flex items-center space-x-2 text-sm font-medium px-4 py-2 rounded-full ${
              timeLeft <= 10 ? 'bg-red-500/20 text-red-300' : 'bg-white/10 text-white'
            }`}>
              <Clock className="h-4 w-4" />
              <span>
                Time Left: {timeLeft}s
              </span>
            </div>
          </div>
          <Progress value={progress} className="w-full" />
        </div>

        {/* Question Card */}
        <Card className="animate-fade-in hover-scale bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl text-gray-900">
              {currentQuestionData?.question_text}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={timeLeft === 0}
                className={`w-full p-3 md:p-4 text-left rounded-lg border-2 transition-all duration-200 hover:scale-[1.02] ${
                  selectedAnswer === index
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                } ${timeLeft === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswer === index 
                      ? 'border-purple-500 bg-purple-500' 
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswer === index && (
                      <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-white" />
                    )}
                  </div>
                  <span className="text-gray-900 text-sm md:text-base">{option}</span>
                </div>
              </button>
            ))}
            
            <div className="pt-4 md:pt-6">
              <Button
                onClick={handleNext}
                disabled={selectedAnswer === null && timeLeft > 0}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 transition-all duration-200 hover:scale-[1.02]"
                size="lg"
              >
                {timeLeft === 0 ? (
                  <>
                    Time's Up - Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : currentQuestion === demoQuestions.length - 1 ? (
                  'Finish Demo Quiz'
                ) : (
                  'Next Question'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DemoQuiz;
