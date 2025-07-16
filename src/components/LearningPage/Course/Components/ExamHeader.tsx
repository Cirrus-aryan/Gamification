'use client';

interface ExamHeaderProps {
  courseName: string;
  aiName: string;
  currentQuestion: number;
  totalQuestions: number;
  timeRemaining: string;
}

export default function ExamHeader({ courseName, aiName, currentQuestion, totalQuestions, timeRemaining }: ExamHeaderProps) {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{courseName} Certification Exam</h1>
            <p className="text-gray-600">AI Student: {aiName}</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-blue-600">{timeRemaining}</div>
            <div className="text-sm text-gray-500">Time Remaining</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Question {currentQuestion} of {totalQuestions}
          </span>
          <span className="text-sm font-medium text-gray-700">
            {Math.round(progress)}% Complete
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}