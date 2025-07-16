'use client';

interface AIThinkingProcessProps {
  isThinking: boolean;
  currentThought: string;
  confidence: number;
}

export default function AIThinkingProcess({ isThinking, currentThought, confidence }: AIThinkingProcessProps) {
  if (!isThinking) return null;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6 border border-blue-200">
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
          <i className="ri-brain-line text-white"></i>
        </div>
        <h3 className="font-semibold text-blue-900">AI Thinking Process</h3>
        <div className="ml-auto flex space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-100"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-200"></div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-4 mb-4">
        <p className="text-gray-700 italic">"{currentThought}"</p>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-sm text-blue-700">Confidence Level</span>
        <div className="flex items-center space-x-2">
          <div className="w-32 bg-blue-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${confidence}%` }}
            ></div>
          </div>
          <span className="text-sm font-medium text-blue-700">{confidence}%</span>
        </div>
      </div>
    </div>
  );
}