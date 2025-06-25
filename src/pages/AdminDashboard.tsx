
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Navigation from '@/components/Navigation';
import { 
  Settings, 
  Plus, 
  Users, 
  BookOpen, 
  Trophy, 
  Download,
  Edit,
  Trash2,
  LogOut
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState<any>(null);
  const [schoolName, setSchoolName] = useState('QuizMaster Academy');
  const [schoolLogo, setSchoolLogo] = useState('');
  
  // Quiz creation form
  const [quizTitle, setQuizTitle] = useState('');
  const [quizSubject, setQuizSubject] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], correctAnswer: 0 }
  ]);

  // Sample data for demonstration
  const [quizzes] = useState([
    {
      id: 1,
      title: 'Weekly Math Quiz',
      subject: 'Mathematics',
      questions: 10,
      submissions: 25,
      avgScore: 78,
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      title: 'Science Chapter 5',
      subject: 'Science',
      questions: 15,
      submissions: 18,
      avgScore: 85,
      createdAt: '2024-01-10'
    }
  ]);

  const [submissions] = useState([
    {
      id: 1,
      studentName: 'John Doe',
      rollNumber: '2024001',
      subject: 'Mathematics',
      score: 8,
      totalQuestions: 10,
      submittedAt: '2024-01-15T10:30:00Z'
    },
    {
      id: 2,
      studentName: 'Jane Smith',
      rollNumber: '2024002',
      subject: 'Science',
      score: 12,
      totalQuestions: 15,
      submittedAt: '2024-01-15T11:15:00Z'
    },
    {
      id: 3,
      studentName: 'Mike Johnson',
      rollNumber: '2024003',
      subject: 'Mathematics',
      score: 7,
      totalQuestions: 10,
      submittedAt: '2024-01-15T14:20:00Z'
    }
  ]);

  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth');
    if (!auth) {
      navigate('/admin-login');
      return;
    }
    setAdminData(JSON.parse(auth));
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    navigate('/admin-login');
  };

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: 0 }]);
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    const updated = [...questions];
    if (field === 'question') {
      updated[index].question = value;
    } else if (field === 'correctAnswer') {
      updated[index].correctAnswer = value;
    } else if (field.startsWith('option')) {
      const optionIndex = parseInt(field.split('-')[1]);
      updated[index].options[optionIndex] = value;
    }
    setQuestions(updated);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const downloadResults = () => {
    const csvContent = [
      ['Student Name', 'Roll Number', 'Subject', 'Score', 'Total Questions', 'Percentage', 'Submitted At'],
      ...submissions.map(sub => [
        sub.studentName,
        sub.rollNumber,
        sub.subject,
        sub.score,
        sub.totalQuestions,
        Math.round((sub.score / sub.totalQuestions) * 100),
        new Date(sub.submittedAt).toLocaleString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'quiz_results.csv';
    link.click();
  };

  if (!adminData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navigation schoolName={schoolName} schoolLogo={schoolLogo} />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="flex justify-between items-center mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Welcome back, {adminData.email}
            </p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="hover:scale-105 transition-transform">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="hover-scale animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Quizzes</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{quizzes.length}</p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Submissions</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{submissions.length}</p>
                </div>
                <Users className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Score</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {Math.round(submissions.reduce((acc, sub) => acc + (sub.score / sub.totalQuestions * 100), 0) / submissions.length)}%
                  </p>
                </div>
                <Trophy className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Students</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {new Set(submissions.map(sub => sub.rollNumber)).size}
                  </p>
                </div>
                <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="animate-fade-in">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="create-quiz">Create Quiz</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Recent Quizzes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Recent Quizzes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quizzes.map((quiz) => (
                    <div key={quiz.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{quiz.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {quiz.subject} • {quiz.questions} questions • {quiz.submissions} submissions
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Avg: {quiz.avgScore}%
                        </span>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create-quiz" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span>Create New Quiz</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quiz-title">Quiz Title</Label>
                    <Input
                      id="quiz-title"
                      placeholder="e.g., Weekly Math Quiz"
                      value={quizTitle}
                      onChange={(e) => setQuizTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quiz-subject">Subject</Label>
                    <Select value={quizSubject} onValueChange={setQuizSubject}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="history">History</SelectItem>
                        <SelectItem value="geography">Geography</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="quiz-description">Description</Label>
                  <Textarea
                    id="quiz-description"
                    placeholder="Brief description of the quiz"
                    value={quizDescription}
                    onChange={(e) => setQuizDescription(e.target.value)}
                  />
                </div>

                {/* Questions */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Questions</h3>
                    <Button onClick={addQuestion} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Question
                    </Button>
                  </div>
                  
                  {questions.map((q, index) => (
                    <Card key={index} className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900 dark:text-white">Question {index + 1}</h4>
                          {questions.length > 1 && (
                            <Button
                              onClick={() => removeQuestion(index)}
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Question Text</Label>
                          <Textarea
                            placeholder="Enter your question"
                            value={q.question}
                            onChange={(e) => updateQuestion(index, 'question', e.target.value)}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {q.options.map((option, optionIndex) => (
                            <div key={optionIndex} className="space-y-2">
                              <Label>Option {optionIndex + 1}</Label>
                              <Input
                                placeholder={`Option ${optionIndex + 1}`}
                                value={option}
                                onChange={(e) => updateQuestion(index, `option-${optionIndex}`, e.target.value)}
                              />
                            </div>
                          ))}
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Correct Answer</Label>
                          <Select
                            value={q.correctAnswer.toString()}
                            onValueChange={(value) => updateQuestion(index, 'correctAnswer', parseInt(value))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {q.options.map((_, optionIndex) => (
                                <SelectItem key={optionIndex} value={optionIndex.toString()}>
                                  Option {optionIndex + 1}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                
                <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                  Create Quiz
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="h-5 w-5" />
                    <span>Quiz Results</span>
                  </CardTitle>
                  <Button onClick={downloadResults} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download CSV
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Student Name</th>
                        <th className="text-left p-2">Roll Number</th>
                        <th className="text-left p-2">Subject</th>
                        <th className="text-left p-2">Score</th>
                        <th className="text-left p-2">Percentage</th>
                        <th className="text-left p-2">Submitted At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {submissions.map((submission) => (
                        <tr key={submission.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                          <td className="p-2 font-medium">{submission.studentName}</td>
                          <td className="p-2">{submission.rollNumber}</td>
                          <td className="p-2">{submission.subject}</td>
                          <td className="p-2">{submission.score}/{submission.totalQuestions}</td>
                          <td className="p-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              Math.round((submission.score / submission.totalQuestions) * 100) >= 70
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                            }`}>
                              {Math.round((submission.score / submission.totalQuestions) * 100)}%
                            </span>
                          </td>
                          <td className="p-2 text-gray-600 dark:text-gray-400">
                            {new Date(submission.submittedAt).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>School Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="school-name">School Name</Label>
                  <Input
                    id="school-name"
                    placeholder="Enter school name"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="school-logo">School Logo URL</Label>
                  <Input
                    id="school-logo"
                    placeholder="Enter logo URL"
                    value={schoolLogo}
                    onChange={(e) => setSchoolLogo(e.target.value)}
                  />
                  {schoolLogo && (
                    <div className="mt-2">
                      <img src={schoolLogo} alt="School Logo Preview" className="h-16 w-16 object-contain border rounded" />
                    </div>
                  )}
                </div>
                
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
