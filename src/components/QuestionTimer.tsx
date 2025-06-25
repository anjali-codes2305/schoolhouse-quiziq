
import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface QuestionTimerProps {
  timeLimit: number; // in seconds
  onTimeUp: () => void;
  isActive: boolean;
  onTick?: (timeLeft: number) => void;
}

const QuestionTimer = ({ timeLimit, onTimeUp, isActive, onTick }: QuestionTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    setTimeLeft(timeLimit);
  }, [timeLimit]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      const timer = setTimeout(() => {
        const newTimeLeft = timeLeft - 1;
        setTimeLeft(newTimeLeft);
        onTick?.(newTimeLeft);
        
        if (newTimeLeft === 0) {
          onTimeUp();
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [timeLeft, isActive, onTimeUp, onTick]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `${secs}s`;
  };

  return (
    <div className={`flex items-center space-x-2 px-3 md:px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
      timeLeft <= 10 ? 'bg-red-500/20 text-red-300 animate-pulse' : 
      timeLeft <= 30 ? 'bg-yellow-500/20 text-yellow-300' : 'bg-white/10 text-white'
    }`}>
      <Clock className="h-4 w-4" />
      <span className="whitespace-nowrap">
        Time Left: {formatTime(timeLeft)}
      </span>
    </div>
  );
};

export default QuestionTimer;
