'use client';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  onAnswerSelect: (answer: number) => void;
  showResult: boolean;
  isThinking: boolean;
}

export default function QuestionCard({ 
  question, 
  selectedAnswer, 
  onAnswerSelect, 
  showResult, 
  isThinking 
}: QuestionCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(question.difficulty)}`}>
          {question.difficulty}
        </span>
        <span className="text-sm text-gray-500">Question #{question.id}</span>
      </div>

      <h2 className="text-xl font-semibold text-gray-900 mb-6 leading-relaxed">
        {question.question}
      </h2>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          let optionClass = "w-full p-4 text-left border-2 rounded-lg transition-all duration-200 hover:border-blue-300 hover:bg-blue-50";
          
          if (showResult) {
            if (index === question.correctAnswer) {
              optionClass += " border-green-500 bg-green-50 text-green-800";
            } else if (index === selectedAnswer && index !== question.correctAnswer) {
              optionClass += " border-red-500 bg-red-50 text-red-800";
            } else {
              optionClass += " border-gray-200 bg-gray-50";
            }
          } else if (selectedAnswer === index) {
            optionClass += " border-blue-500 bg-blue-50";
          } else {
            optionClass += " border-gray-200";
          }

          return (
            <button
              key={index}
              className={optionClass}
              onClick={() => !showResult && onAnswerSelect(index)}
              disabled={showResult || isThinking}
            >
              <div className="flex items-center">
                <span className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-gray-900">{option}</span>
                {showResult && index === question.correctAnswer && (
                  <i className="ri-check-line text-green-600 ml-auto text-xl"></i>
                )}
                {showResult && index === selectedAnswer && index !== question.correctAnswer && (
                  <i className="ri-close-line text-red-600 ml-auto text-xl"></i>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {showResult && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Explanation:</h3>
          <p className="text-gray-700">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}