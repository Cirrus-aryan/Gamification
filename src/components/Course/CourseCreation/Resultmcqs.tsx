import { useEffect } from 'react'; // Import React
import MCQCard from "./MCQCard";

// This is the main QuizQuestion component that accepts an array of quiz data
// and renders an MCQCard for each item.
function QuizQuestion({ mcqData }: { mcqData: any }) {
  useEffect(() => console.log("QuizQuestion data:", mcqData), [mcqData]);

  // Handle case where no MCQ data is provided
  if (!mcqData || mcqData.length === 0) {
    return (
      <p className="text-gray-500 text-center py-4 text-sm sm:text-base">
        No quiz questions available.
      </p>
    );
  }

  return (
    // The `space-y-6` class provides vertical spacing between each MCQCard.
    // Padding can be added here or controlled by the parent component (e.g., TabDialog).
    <div className="space-y-6 p-2 sm:p-4"> {/* Added responsive padding */}
      {mcqData.map((mcq: any, index: number) => (
      
        <MCQCard key={index} mcq={mcq} index={index} />
      ))}
    </div>
  );
}

export default QuizQuestion;