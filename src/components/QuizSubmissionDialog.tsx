
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CheckCircle, Clock } from "lucide-react";

interface QuizSubmissionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  currentQuestion: number;
  totalQuestions: number;
  timeLeft: number;
}

const QuizSubmissionDialog = ({
  isOpen,
  onClose,
  onConfirm,
  currentQuestion,
  totalQuestions,
  timeLeft
}: QuizSubmissionDialogProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-white border-0 shadow-2xl">
        <AlertDialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          <AlertDialogTitle className="text-center text-xl font-bold text-gray-900">
            Submit Quiz?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-gray-600 space-y-2">
            <p>Are you sure you want to submit your quiz?</p>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Questions Answered:</span>
                <span className="font-semibold">{currentQuestion + 1} of {totalQuestions}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Time Remaining:</span>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <span className="font-semibold">{formatTime(timeLeft)}</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-amber-600 font-medium">
              Once submitted, you cannot make any changes.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-3">
          <AlertDialogCancel 
            onClick={onClose}
            className="flex-1 hover:bg-gray-100 transition-colors"
          >
            Continue Quiz
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 transition-all duration-200"
          >
            Submit Quiz
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default QuizSubmissionDialog;
