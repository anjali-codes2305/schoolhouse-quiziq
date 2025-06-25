import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import QuizPreview from '@/components/QuizPreview';
import { useAuth } from '@/components/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Plus, Trash2, Share2, Copy, CheckCircle, Clock, Eye, ArrowUp, ArrowDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Question {
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: number;
}

const CreateQuiz = () => {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    subject: '',
    time_limit: 1800,
    time_per_question: 30,
    schoolName: '',
    schoolLogo: ''
  });
  
  const [questions, setQuestions] = useState<Question[]>([
    {
      question_text: '',
      option_a: '',
      option_b: '',
      option_c: '',
      option_d: '',
      correct_answer: 0
    }
  ]);

  const [createdQuizCode, setCreatedQuizCode] = useState<string | null>(null);

  const subjects = [
    'Mathematics', 'Science', 'English', 'History', 'Geography',
    'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Literature'
  ];

  // Check if user is authorized to create quizzes
  useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to create quizzes",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }

    if (userProfile && userProfile.role !== 'admin') {
      toast({
        title: "Access Denied",
        description: "Only teachers can create quizzes. Students should take quizzes instead.",
        variant: "destructive"
      });
      navigate('/student-access');
      return;
    }
  }, [user, userProfile, navigate, toast]);

  // Generate a unique quiz code
  const generateUniqueQuizCode = async (): Promise<string> => {
    let attempts = 0;
    const maxAttempts = 10;
    
    while (attempts < maxAttempts) {
      // Generate a 6-character code with letters and numbers
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
      
      // Check if this code already exists
      const { data: existingQuiz, error } = await supabase
        .from('quizzes')
        .select('id')
        .eq('quiz_code', code)
        .maybeSingle();
      
      if (error) {
        console.error('Error checking quiz code:', error);
        throw error;
      }
      
      if (!existingQuiz) {
        return code;
      }
      
      attempts++;
    }
    
    throw new Error('Unable to generate unique quiz code after multiple attempts');
  };

  const addQuestion = () => {
    setQuestions([...questions, {
      question_text: '',
      option_a: '',
      option_b: '',
      option_c: '',
      option_d: '',
      correct_answer: 0
    }]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const moveQuestion = (index: number, direction: 'up' | 'down') => {
    const newQuestions = [...questions];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < questions.length) {
      [newQuestions[index], newQuestions[targetIndex]] = [newQuestions[targetIndex], newQuestions[index]];
      setQuestions(newQuestions);
    }
  };

  const updateQuestion = (index: number, field: keyof Question, value: string | number) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    setQuestions(updated);
  };

  const validateForm = () => {
    // Validate quiz data
    if (!quizData.title.trim()) {
      toast({
        title: "Validation Error",
        description: "Quiz title is required",
        variant: "destructive"
      });
      return false;
    }

    if (!quizData.subject) {
      toast({
        title: "Validation Error",
        description: "Subject is required",
        variant: "destructive"
      });
      return false;
    }

    // Validate questions
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      
      if (!question.question_text.trim()) {
        toast({
          title: "Validation Error",
          description: `Question ${i + 1}: Question text is required`,
          variant: "destructive"
        });
        return false;
      }

      if (!question.option_a.trim() || !question.option_b.trim() || 
          !question.option_c.trim() || !question.option_d.trim()) {
        toast({
          title: "Validation Error",
          description: `Question ${i + 1}: All options are required`,
          variant: "destructive"
        });
        return false;
      }

      if (question.correct_answer < 0 || question.correct_answer > 3) {
        toast({
          title: "Validation Error",
          description: `Question ${i + 1}: Please select a correct answer`,
          variant: "destructive"
        });
        return false;
      }
    }

    return true;
  };

  const handlePreview = () => {
    if (!validateForm()) {
      return;
    }
    setShowPreview(true);
  };

  const handleStartQuizFromPreview = () => {
    // Create a temporary quiz session for preview
    const tempQuizData = {
      quiz: {
        id: 'preview',
        title: quizData.title,
        description: quizData.description,
        subject: quizData.subject,
        time_limit: quizData.time_per_question * questions.length,
        quiz_questions: questions.map((q, index) => ({
          ...q,
          id: `preview-${index}`,
          question_order: index + 1
        }))
      },
      student: {
        name: userProfile?.full_name || 'Preview User',
        rollNumber: 'PREVIEW'
      },
      school: {
        name: quizData.schoolName || 'Preview School',
        logo_url: quizData.schoolLogo
      }
    };

    sessionStorage.setItem('currentQuiz', JSON.stringify(tempQuizData));
    navigate('/quiz');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create a quiz",
        variant: "destructive"
      });
      return;
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    console.log('Starting quiz creation process...');

    try {
      // Generate unique quiz code
      const uniqueQuizCode = await generateUniqueQuizCode();
      console.log('Generated unique quiz code:', uniqueQuizCode);

      // First, create or get the school
      let schoolId: string;
      
      console.log('Checking for existing school...');
      // Check if school already exists
      const { data: existingSchool, error: schoolCheckError } = await supabase
        .from('schools')
        .select('id')
        .eq('admin_email', user.email!)
        .maybeSingle();

      if (schoolCheckError) {
        console.error('Error checking school:', schoolCheckError);
        throw schoolCheckError;
      }

      if (existingSchool) {
        console.log('Using existing school:', existingSchool.id);
        schoolId = existingSchool.id;
      } else {
        console.log('Creating new school...');
        // Create new school
        const { data: newSchool, error: schoolError } = await supabase
          .from('schools')
          .insert({
            name: quizData.schoolName || 'My School',
            admin_email: user.email!,
            logo_url: quizData.schoolLogo || null
          })
          .select()
          .single();

        if (schoolError) {
          console.error('Error creating school:', schoolError);
          throw schoolError;
        }
        
        if (!newSchool) {
          throw new Error('Failed to create school');
        }
        
        console.log('Created new school:', newSchool.id);
        schoolId = newSchool.id;
      }

      console.log('Creating quiz...');
      // Create the quiz with the unique quiz code
      const totalTimeLimit = quizData.time_per_question * questions.length;
      const { data: quiz, error: quizError } = await supabase
        .from('quizzes')
        .insert({
          title: quizData.title,
          description: quizData.description,
          subject: quizData.subject,
          time_limit: totalTimeLimit,
          created_by: user.id,
          school_id: schoolId,
          quiz_code: uniqueQuizCode
        })
        .select()
        .single();

      if (quizError) {
        console.error('Error creating quiz:', quizError);
        throw quizError;
      }

      if (!quiz) {
        throw new Error('Failed to create quiz');
      }

      console.log('Created quiz:', quiz.id, 'with code:', quiz.quiz_code);

      // Add questions
      console.log('Adding questions...');
      const questionsWithQuizId = questions.map((q, index) => ({
        ...q,
        quiz_id: quiz.id,
        question_order: index + 1
      }));

      const { error: questionsError } = await supabase
        .from('quiz_questions')
        .insert(questionsWithQuizId);

      if (questionsError) {
        console.error('Error creating questions:', questionsError);
        throw questionsError;
      }

      console.log('Successfully created quiz with questions');
      setCreatedQuizCode(quiz.quiz_code);
      toast({
        title: "Success! 🎉",
        description: `Quiz created successfully! Quiz code: ${quiz.quiz_code}`,
      });

    } catch (error: any) {
      console.error('Quiz creation error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create quiz. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const copyQuizCode = () => {
    if (createdQuizCode) {
      navigator.clipboard.writeText(createdQuizCode);
      toast({
        title: "Copied! 📋",
        description: "Quiz code copied to clipboard",
      });
    }
  };

  const shareQuizLink = () => {
    if (createdQuizCode) {
      const link = `${window.location.origin}/student-access?code=${createdQuizCode}`;
      navigator.clipboard.writeText(link);
      toast({
        title: "Link Copied! 🔗",
        description: "Quiz link copied to clipboard",
      });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <Navigation />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
          <Card className="text-center animate-fade-in">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
              <p className="text-gray-600 mb-4">You need to be logged in to create quizzes.</p>
              <Button onClick={() => navigate('/auth')} className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
                Go to Sign In
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (createdQuizCode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <Navigation />
        <div className="max-w-2xl mx-auto px-4 py-8">
          <Card className="animate-fade-in hover-scale">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-green-600 flex items-center justify-center gap-2">
                <CheckCircle className="h-6 w-6" />
                Quiz Created Successfully! 🎉
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-lg mb-4">Your quiz code is:</p>
                <div className="bg-gradient-to-r from-purple-100 to-cyan-100 p-6 rounded-lg text-3xl font-mono font-bold text-center border-2 border-dashed border-purple-300">
                  {createdQuizCode}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={copyQuizCode} className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Code
                </Button>
                <Button onClick={shareQuizLink} variant="outline" className="flex-1 border-purple-300 hover:bg-purple-50">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Link
                </Button>
              </div>
              
              <div className="text-center">
                <Button onClick={() => {
                  setCreatedQuizCode(null);
                  setQuizData({
                    title: '',
                    description: '',
                    subject: '',
                    time_limit: 1800,
                    time_per_question: 30,
                    schoolName: '',
                    schoolLogo: ''
                  });
                  setQuestions([{
                    question_text: '',
                    option_a: '',
                    option_b: '',
                    option_c: '',
                    option_d: '',
                    correct_answer: 0
                  }]);
                }} variant="outline" className="border-purple-300 hover:bg-purple-50">
                  Create Another Quiz
                </Button>
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
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Create New Quiz ✨
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* School Details */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="schoolName">School/Organization Name</Label>
                  <Input
                    id="schoolName"
                    value={quizData.schoolName}
                    onChange={(e) => setQuizData({...quizData, schoolName: e.target.value})}
                    placeholder="Enter school name"
                    className="transition-all duration-200 focus:scale-[1.02]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="schoolLogo">School Logo URL (optional)</Label>
                  <Input
                    id="schoolLogo"
                    value={quizData.schoolLogo}
                    onChange={(e) => setQuizData({...quizData, schoolLogo: e.target.value})}
                    placeholder="Enter logo URL"
                    className="transition-all duration-200 focus:scale-[1.02]"
                  />
                </div>
              </div>

              {/* Quiz Details */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Quiz Title *</Label>
                  <Input
                    id="title"
                    value={quizData.title}
                    onChange={(e) => setQuizData({...quizData, title: e.target.value})}
                    placeholder="Enter quiz title"
                    required
                    className="transition-all duration-200 focus:scale-[1.02]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Select value={quizData.subject} onValueChange={(value) => setQuizData({...quizData, subject: value})}>
                    <SelectTrigger className="transition-all duration-200 focus:scale-[1.02]">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map(subject => (
                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={quizData.description}
                  onChange={(e) => setQuizData({...quizData, description: e.target.value})}
                  placeholder="Enter quiz description"
                  rows={3}
                  className="transition-all duration-200 focus:scale-[1.02]"
                />
              </div>

              {/* Timer Settings */}
              <div className="bg-gradient-to-r from-purple-50 to-cyan-50 p-4 rounded-lg border border-purple-200">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Timer Settings</h3>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timePerQuestion">Time per Question (seconds)</Label>
                  <Input
                    id="timePerQuestion"
                    type="number"
                    value={quizData.time_per_question}
                    onChange={(e) => setQuizData({...quizData, time_per_question: parseInt(e.target.value) || 30})}
                    min="10"
                    max="300"
                    className="transition-all duration-200 focus:scale-[1.02]"
                  />
                  <p className="text-xs text-gray-600">
                    Students will have {quizData.time_per_question} seconds to answer each question.
                    Total quiz time will be: {Math.floor((quizData.time_per_question * questions.length) / 60)} minutes and {(quizData.time_per_question * questions.length) % 60} seconds
                  </p>
                </div>
              </div>

              {/* Questions */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Questions</h3>
                  <div className="flex gap-2">
                    <Button 
                      type="button" 
                      onClick={handlePreview}
                      variant="outline" 
                      size="sm" 
                      className="hover:scale-105 transition-all duration-200 border-blue-300 hover:bg-blue-50"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Preview Quiz
                    </Button>
                    <Button type="button" onClick={addQuestion} variant="outline" size="sm" className="hover:scale-105 transition-all duration-200">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Question
                    </Button>
                  </div>
                </div>

                {questions.map((question, index) => (
                  <Card key={index} className="p-4 transition-all duration-200 hover:shadow-lg border-l-4 border-l-purple-400">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-lg">Question {index + 1}</h4>
                      <div className="flex items-center gap-2">
                        {/* Question reordering buttons */}
                        <Button
                          type="button"
                          onClick={() => moveQuestion(index, 'up')}
                          disabled={index === 0}
                          variant="outline"
                          size="sm"
                          className="p-2"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          onClick={() => moveQuestion(index, 'down')}
                          disabled={index === questions.length - 1}
                          variant="outline"
                          size="sm"
                          className="p-2"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </Button>
                        {questions.length > 1 && (
                          <Button
                            type="button"
                            onClick={() => removeQuestion(index)}
                            variant="destructive"
                            size="sm"
                            className="hover:scale-105 transition-all duration-200"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Question Text *</Label>
                        <Textarea
                          value={question.question_text}
                          onChange={(e) => updateQuestion(index, 'question_text', e.target.value)}
                          placeholder="Enter your question here..."
                          required
                          className="transition-all duration-200 focus:scale-[1.02] mt-1"
                          rows={2}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Option A *</Label>
                          <Input
                            value={question.option_a}
                            onChange={(e) => updateQuestion(index, 'option_a', e.target.value)}
                            placeholder="First option"
                            required
                            className="transition-all duration-200 focus:scale-[1.02] mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Option B *</Label>
                          <Input
                            value={question.option_b}
                            onChange={(e) => updateQuestion(index, 'option_b', e.target.value)}
                            placeholder="Second option"
                            required
                            className="transition-all duration-200 focus:scale-[1.02] mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Option C *</Label>
                          <Input
                            value={question.option_c}
                            onChange={(e) => updateQuestion(index, 'option_c', e.target.value)}
                            placeholder="Third option"
                            required
                            className="transition-all duration-200 focus:scale-[1.02] mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Option D *</Label>
                          <Input
                            value={question.option_d}
                            onChange={(e) => updateQuestion(index, 'option_d', e.target.value)}
                            placeholder="Fourth option"
                            required
                            className="transition-all duration-200 focus:scale-[1.02] mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700">Correct Answer *</Label>
                        <Select 
                          value={question.correct_answer.toString()} 
                          onValueChange={(value) => updateQuestion(index, 'correct_answer', parseInt(value))}
                        >
                          <SelectTrigger className="transition-all duration-200 focus:scale-[1.02] mt-1">
                            <SelectValue placeholder="Select the correct answer" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">Option A</SelectItem>
                            <SelectItem value="1">Option B</SelectItem>
                            <SelectItem value="2">Option C</SelectItem>
                            <SelectItem value="3">Option D</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="button"
                  onClick={handlePreview}
                  variant="outline"
                  className="flex-1 border-blue-300 hover:bg-blue-50 transition-all duration-200 hover:scale-[1.02]"
                  size="lg"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Quiz
                </Button>

                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg transform"
                  size="lg"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Quiz...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4" />
                      <span>Create Amazing Quiz</span>
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Quiz Preview Modal */}
      {showPreview && (
        <QuizPreview
          title={quizData.title}
          description={quizData.description}
          subject={quizData.subject}
          timePerQuestion={quizData.time_per_question}
          questions={questions}
          onClose={() => setShowPreview(false)}
          onStartQuiz={handleStartQuizFromPreview}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default CreateQuiz;
