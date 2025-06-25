
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Play, Eye } from 'lucide-react';

interface Question {
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: number;
}

interface QuizPreviewProps {
  title: string;
  description: string;
  subject: string;
  timePerQuestion: number;
  questions: Question[];
  onClose: () => void;
  onStartQuiz: () => void;
}

const QuizPreview = ({ 
  title, 
  description, 
  subject, 
  timePerQuestion, 
  questions, 
  onClose, 
  onStartQuiz 
}: QuizPreviewProps) => {
  const [currentPreviewQuestion, setCurrentPreviewQuestion] = useState(0);

  const currentQuestion = questions[currentPreviewQuestion];
  const options = [
    currentQuestion.option_a,
    currentQuestion.option_b,
    currentQuestion.option_c,
    currentQuestion.option_d
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Eye className="h-6 w-6 text-blue-500" />
                Quiz Preview
              </h2>
              <p className="text-gray-600 mt-1">Review your quiz before sharing</p>
            </div>
            <Button onClick={onClose} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Edit
            </Button>
          </div>

          {/* Quiz Info */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl text-purple-600">{title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <span className="font-medium text-gray-700">Subject: </span>
                  <span className="font-bold text-blue-600">{subject}</span>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <span className="font-medium text-gray-700">Questions: </span>
                  <span className="font-bold text-green-600">{questions.length}</span>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <span className="font-medium text-gray-700">Time/Question: </span>
                  <span className="font-bold text-orange-600">{timePerQuestion}s</span>
                </div>
              </div>
              {description && (
                <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{description}</p>
              )}
            </CardContent>
          </Card>

          {/* Question Preview */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  Question {currentPreviewQuestion + 1} of {questions.length}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setCurrentPreviewQuestion(Math.max(0, currentPreviewQuestion - 1))}
                    disabled={currentPreviewQuestion === 0}
                    variant="outline"
                    size="sm"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => setCurrentPreviewQuestion(Math.min(questions.length - 1, currentPreviewQuestion + 1))}
                    disabled={currentPreviewQuestion === questions.length - 1}
                    variant="outline"
                    size="sm"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="font-semibold text-gray-900 text-lg">
                {currentQuestion.question_text}
              </h3>
              <div className="grid gap-3">
                {options.map((option, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      index === currentQuestion.correct_answer
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                        index === currentQuestion.correct_answer
                          ? 'border-green-500 bg-green-500 text-white'
                          : 'border-gray-300 text-gray-600'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="font-medium">{option}</span>
                      {index === currentQuestion.correct_answer && (
                        <span className="text-green-600 text-sm font-bold">✓ Correct Answer</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={onStartQuiz}
              className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 transition-all duration-200 hover:scale-[1.02]"
              size="lg"
            >
              <Play className="mr-2 h-5 w-5" />
              Start Quiz Now
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              size="lg"
              className="border-purple-300 hover:bg-purple-50"
            >
              Continue Editing
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPreview;
