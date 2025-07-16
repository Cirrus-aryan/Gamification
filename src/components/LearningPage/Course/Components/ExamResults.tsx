
interface ExamResultsProps {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: string;
  isPassed: boolean;
  onRetakeExam: () => void;
}

export default function ExamResults({ 
  totalQuestions, 
  correctAnswers, 
  timeSpent, 
  isPassed, 
  onRetakeExam 
}: ExamResultsProps) {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto text-center">
      <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
        isPassed ? 'bg-green-100' : 'bg-red-100'
      }`}>
        <i className={`text-4xl ${isPassed ? 'ri-award-line text-green-600' : 'ri-close-circle-line text-red-600'}`}></i>
      </div>

      <h2 className={`text-3xl font-bold mb-2 ${isPassed ? 'text-green-600' : 'text-red-600'}`}>
        {isPassed ? 'Congratulations!' : 'Better Luck Next Time!'}
      </h2>
      
      <p className="text-xl text-gray-700 mb-8">
        {isPassed ? 'AI has successfully passed the exam!' : 'AI needs more practice to pass.'}
      </p>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-3xl font-bold text-blue-600">{percentage}%</div>
          <div className="text-sm text-blue-700">Final Score</div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-3xl font-bold text-green-600">{correctAnswers}/{totalQuestions}</div>
          <div className="text-sm text-green-700">Correct Answers</div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="text-3xl font-bold text-purple-600">{timeSpent}</div>
          <div className="text-sm text-purple-700">Time Spent</div>
        </div>
        
        <div className="bg-orange-50 rounded-lg p-4">
          <div className="text-3xl font-bold text-orange-600">{isPassed ? 'PASS' : 'FAIL'}</div>
          <div className="text-sm text-orange-700">Result Status</div>
        </div>
      </div>

      {isPassed && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-center mb-3">
            <i className="ri-medal-line text-3xl text-yellow-500 mr-2"></i>
            <span className="text-xl font-semibold text-gray-800">Certificate Earned!</span>
          </div>
          <p className="text-gray-600">The AI has successfully completed the course requirements and earned certification.</p>
        </div>
      )}

      <button
        onClick={onRetakeExam}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 whitespace-nowrap cursor-pointer"
      >
        <i className="ri-refresh-line mr-2"></i>
        Take Another Exam
      </button>
    </div>
  );
}