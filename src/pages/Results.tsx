import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Trophy, Award, Download, Home, RotateCcw, Star, TrendingUp, Sparkles } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import jsPDF from 'jspdf';
import { useToast } from '@/hooks/use-toast';

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const data = sessionStorage.getItem('quizResults');
    if (!data) {
      navigate('/student-access');
      return;
    }
    setResults(JSON.parse(data));
  }, [navigate]);

  const downloadCertificate = () => {
    if (!results) return;

    try {
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      // Dark background similar to the reference image
      pdf.setFillColor(30, 30, 30); // Dark gray background
      pdf.rect(0, 0, 297, 210, 'F');

      // Add subtle texture/pattern (optional overlay)
      pdf.setFillColor(40, 40, 40); // Slightly lighter overlay
      pdf.rect(10, 10, 277, 190, 'F');

      // Main border frame
      pdf.setDrawColor(200, 200, 200); // Light gray border
      pdf.setLineWidth(2);
      pdf.rect(15, 15, 267, 180);

      // Inner decorative border
      pdf.setDrawColor(150, 150, 150);
      pdf.setLineWidth(1);
      pdf.rect(20, 20, 257, 170);

      // Add school/platform logo at the top (circular background)
      pdf.setFillColor(255, 255, 255); // White circle background
      pdf.circle(148.5, 40, 15, 'F');
      
      // Platform name in the circle (like "HACK WITH INDIA" in reference)
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(30, 30, 30); // Dark text in the white circle
      pdf.text('QUIZ', 148.5, 37, { align: 'center' });
      pdf.text('IQ', 148.5, 44, { align: 'center' });

      // Platform/School name above certificate (like "BUILD WITH INDIA")
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(200, 200, 200); // Light gray
      const platformText = results.school?.name || 'QUIZIQ PLATFORM';
      pdf.text(platformText.toUpperCase(), 148.5, 65, { align: 'center' });

      // Main "CERTIFICATE" title (large and bold like reference)
      pdf.setFontSize(36);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(255, 255, 255); // White text
      pdf.text('CERTIFICATE', 148.5, 85, { align: 'center' });

      // Subtitle
      pdf.setFontSize(18);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(200, 200, 200);
      pdf.text('OF ACHIEVEMENT', 148.5, 95, { align: 'center' });

      // Description text (similar to reference)
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(180, 180, 180);
      pdf.text('We take immense pride in presenting this award to our esteemed student', 148.5, 110, { align: 'center' });

      // Student name (prominent like in reference)
      pdf.setFontSize(28);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(255, 255, 255);
      pdf.text(results.student.name.toUpperCase(), 148.5, 125, { align: 'center' });

      // Underline for the name
      pdf.setDrawColor(200, 200, 200);
      pdf.setLineWidth(1);
      const nameWidth = pdf.getTextWidth(results.student.name.toUpperCase()) * 28 / 12; // Approximate width scaling
      pdf.line(148.5 - nameWidth/2, 128, 148.5 + nameWidth/2, 128);

      // Achievement description (multi-line like reference)
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(180, 180, 180);
      
      const achievementText = `In recognition of their outstanding performance and achievement in completing the`;
      const quizDetails = `"${results.quiz.title}" assessment in ${results.quiz.subject} with a score of ${results.percentage}%.`;
      const dedication = `Their hard work, talent, and dedication throughout the quiz exemplify their commitment to excellence.`;
      
      pdf.text(achievementText, 148.5, 142, { align: 'center', maxWidth: 200 });
      pdf.text(quizDetails, 148.5, 150, { align: 'center', maxWidth: 200 });
      pdf.text(dedication, 148.5, 158, { align: 'center', maxWidth: 200 });

      // Signature section (like reference)
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'italic');
      pdf.setTextColor(200, 200, 200);
      pdf.text('QuizIQ', 148.5, 175, { align: 'center' });

      // Founder/Authority line
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(150, 150, 150);
      pdf.text('QUIZIQ PLATFORM', 148.5, 182, { align: 'center' });
      pdf.text('EDUCATIONAL EXCELLENCE', 148.5, 187, { align: 'center' });

      // Bottom details
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(120, 120, 120);
      const completedDate = new Date(results.completedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      // Left side details
      pdf.text(`Roll Number: ${results.student.rollNumber}`, 25, 195);
      pdf.text(`Date: ${completedDate}`, 25, 200);
      
      // Right side details
      pdf.text(`Score: ${results.score}/${results.totalQuestions}`, 220, 195);
      pdf.text(`Certificate ID: QIQ-${Date.now().toString().slice(-6)}`, 220, 200);

      // Generate unique filename
      const fileName = `QuizIQ_Certificate_${results.student.name.replace(/\s+/g, '_')}_${results.quiz.subject}_${new Date().toISOString().slice(0, 10)}.pdf`;
      
      // Save the PDF
      pdf.save(fileName);
      
      // Show success message
      toast({
        title: "Certificate Downloaded! 📜",
        description: "Your professional certificate has been saved successfully",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Error",
        description: "Failed to generate certificate. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-500';
    if (percentage >= 70) return 'text-blue-500';
    if (percentage >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getGrade = (percentage: number) => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C';
    return 'F';
  };

  const getPerformanceMessage = (percentage: number) => {
    if (percentage >= 90) return "Outstanding performance! 🌟";
    if (percentage >= 70) return "Great job! Well done! 👏";
    if (percentage >= 50) return "Good effort! Keep practicing! 💪";
    return "Don't give up! Practice makes perfect! 📚";
  };

  const getPerformanceIcon = (percentage: number) => {
    if (percentage >= 90) return <Sparkles className="h-6 w-6 text-yellow-400 animate-pulse" />;
    if (percentage >= 70) return <Trophy className="h-6 w-6 text-blue-400 animate-bounce" />;
    if (percentage >= 50) return <Award className="h-6 w-6 text-green-400" />;
    return <Star className="h-6 w-6 text-gray-400" />;
  };

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl animate-pulse">Loading results...</div>
      </div>
    );
  }

  // Prepare chart data
  const performanceData = [
    { name: 'Correct', value: results.score, color: '#10B981' },
    { name: 'Incorrect', value: results.totalQuestions - results.score, color: '#EF4444' }
  ];

  const questionAnalysis = results.questions.map((q: any, index: number) => ({
    question: `Q${index + 1}`,
    correct: results.answers[index] === q.correct_answer ? 1 : 0
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Enhanced Results Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse shadow-2xl">
            <Trophy className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Quiz Completed! 🎉
          </h1>
          <div className="flex items-center justify-center gap-3 mb-2">
            {getPerformanceIcon(results.percentage)}
            <p className="text-xl md:text-2xl text-gray-200 font-medium">
              {getPerformanceMessage(results.percentage)}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 inline-block">
            <p className="text-cyan-300 font-medium">
              Time taken: {Math.floor((results.quiz.time_limit - (results.time_taken || 0)) / 60)}:{((results.quiz.time_limit - (results.time_taken || 0)) % 60).toString().padStart(2, '0')}
            </p>
          </div>
          <div className="mt-4 p-4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-sm rounded-xl border border-white/20">
            <p className="text-lg text-white font-medium">
              🙏 Thank you for using QuizIQ! 
            </p>
            <p className="text-sm text-purple-200 mt-1">
              We hope this platform helped enhance your learning experience
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Score Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Score Card */}
            <Card className="animate-fade-in hover-scale bg-white/95 backdrop-blur-sm border-0 shadow-2xl overflow-hidden">
              <CardHeader className="text-center bg-gradient-to-r from-purple-500 to-cyan-500 text-white">
                <CardTitle className="text-2xl font-bold">Your Final Score</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6 p-8">
                <div className="space-y-4">
                  <div className="text-8xl font-bold animate-scale-in">
                    <span className={getGradeColor(results.percentage)}>
                      {results.percentage}%
                    </span>
                  </div>
                  <div className="text-4xl font-bold">
                    <span className={getGradeColor(results.percentage)}>
                      Grade: {getGrade(results.percentage)}
                    </span>
                  </div>
                  <div className="text-xl text-gray-600 font-medium">
                    {results.score} out of {results.totalQuestions} questions correct
                  </div>
                  <div className="flex justify-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-8 w-8 transition-all duration-300 ${
                          i < Math.ceil((results.percentage / 100) * 5) 
                            ? 'text-yellow-400 fill-current animate-pulse' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Charts */}
            <Card className="animate-fade-in bg-white/95 backdrop-blur-sm border-0 shadow-2xl hover-scale">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 flex items-center">
                  <TrendingUp className="mr-3 h-6 w-6 text-blue-500" />
                  Performance Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Score Distribution */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-center text-gray-800">Score Distribution</h3>
                    <ResponsiveContainer width="100%" height={220}>
                      <PieChart>
                        <Pie
                          data={performanceData}
                          cx="50%"
                          cy="50%"
                          innerRadius={45}
                          outerRadius={85}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {performanceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Question-wise Analysis */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-center text-gray-800">Question Analysis</h3>
                    <ResponsiveContainer width="100%" height={220}>
                      <BarChart data={questionAnalysis}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="question" />
                        <YAxis domain={[0, 1]} />
                        <Tooltip 
                          formatter={(value) => [value === 1 ? '✓ Correct' : '✗ Incorrect', '']}
                        />
                        <Bar dataKey="correct" fill="#10B981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Quiz Info */}
            <Card className="animate-fade-in bg-white/95 backdrop-blur-sm border-0 shadow-2xl hover-scale">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 flex items-center">
                  <Award className="mr-2 h-5 w-5 text-purple-500" />
                  Quiz Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <span className="font-medium text-gray-700">Quiz: </span>
                  <span className="font-bold text-purple-600">{results.quiz.title}</span>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium text-gray-700">Subject: </span>
                  <span className="font-bold text-blue-600">{results.quiz.subject}</span>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <span className="font-medium text-gray-700">Student: </span>
                  <span className="font-bold text-green-600">{results.student.name}</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Roll: </span>
                  <span className="font-bold text-gray-600">{results.student.rollNumber}</span>
                </div>
                <div className="p-3 bg-cyan-50 rounded-lg">
                  <span className="font-medium text-gray-700">Completed: </span>
                  <span className="font-bold text-cyan-600 text-sm">{new Date(results.completedAt).toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button
                onClick={downloadCertificate}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 transition-all duration-200 hover:scale-105 shadow-lg"
                size="lg"
              >
                <Download className="mr-2 h-5 w-5" />
                Download PDF Certificate
              </Button>
              
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full transition-all duration-200 hover:scale-105 border-2 border-purple-300 hover:bg-purple-50"
              >
                <Link to="/student-access">
                  <RotateCcw className="mr-2 h-5 w-5" />
                  Take Another Quiz
                </Link>
              </Button>
              
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full transition-all duration-200 hover:scale-105 border-2 border-gray-300 hover:bg-gray-50"
              >
                <Link to="/">
                  <Home className="mr-2 h-5 w-5" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Detailed Question Review */}
        <Card className="mt-8 animate-fade-in bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 flex items-center">
              <TrendingUp className="mr-3 h-6 w-6 text-indigo-500" />
              Detailed Question Review
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {results.questions.map((question: any, index: number) => (
              <div
                key={index}
                className={`p-6 rounded-xl border-l-4 transition-all duration-200 hover:scale-[1.02] ${
                  results.answers[index] === question.correct_answer
                    ? 'border-green-500 bg-gradient-to-r from-green-50 to-green-100 shadow-green-100'
                    : 'border-red-500 bg-gradient-to-r from-red-50 to-red-100 shadow-red-100'
                } shadow-lg`}
              >
                <h3 className="font-bold text-gray-900 mb-4 text-lg">
                  Question {index + 1}: {question.question_text}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
                  <div className="p-4 bg-white/70 rounded-lg">
                    <span className="text-gray-600 font-medium">Your answer: </span>
                    <span className={`font-bold ${
                      results.answers[index] === question.correct_answer
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}>
                      {results.answers[index] !== null 
                        ? question[`option_${String.fromCharCode(97 + results.answers[index])}`]
                        : 'No answer selected'
                      }
                    </span>
                    {results.answers[index] === question.correct_answer ? ' ✓' : ' ✗'}
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <span className="text-gray-600 font-medium">Correct answer: </span>
                    <span className="text-green-600 font-bold">
                      {question[`option_${String.fromCharCode(97 + question.correct_answer)}`]} ✓
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default Results;
