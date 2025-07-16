import React, { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import OptionButton from "./OptionButton"; // Importing the extracted OptionButton component

// --- Type Definitions (No Change - They are already excellent!) ---
type OptionKey = "A" | "B" | "C" | "D";

interface MCQ {
  question: string;
  correct_answer: OptionKey;
  options: Record<OptionKey, string>;
}

interface Props {
  mcq: MCQ;
  index: number;
  // New: Optional callback for when an answer is selected
  onAnswerSelected?: (isCorrect: boolean, selectedOption: OptionKey) => void;
}

// --- Main MCQCard Component ---
const MCQCard: React.FC<Props> = ({ mcq, index, onAnswerSelected }) => {
  const [selected, setSelected] = useState<OptionKey | null>(null);

  // Memoize these derived states to prevent recalculation on every render
  const hasAnswered = useMemo(() => selected !== null, [selected]);

  // Use useCallback to memoize the click handler for OptionButton
  // This prevents unnecessary re-renders of OptionButton when MCQCard re-renders
  const handleOptionClick = useCallback(
    (key: OptionKey) => {
      if (!hasAnswered) {
        setSelected(key);
        // Call the optional external callback
        if (onAnswerSelected) {
          const isCorrectAnswer = key === mcq.correct_answer;
          onAnswerSelected(isCorrectAnswer, key);
        }
      }
    },
    [hasAnswered, mcq.correct_answer, onAnswerSelected] // Dependencies for useCallback
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }} // Added duration for smoother animation
      // Responsive padding: p-4 on small screens, p-6 on medium and up
      className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
    >
      <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mb-4 leading-relaxed flex items-start">
        {/* Question number with fixed width to ensure alignment, prevents shrinking */}
        <span className="text-indigo-600 font-bold mr-2 flex-shrink-0">Q{index + 1}:</span>
        {/* Question text takes remaining space and wraps */}
        <span className="flex-grow break-words">{mcq.question}</span>
      </h2>
      <div className="space-y-3">
        {(Object.keys(mcq.options) as OptionKey[]).map((key) => {
          const isCorrectOption = key === mcq.correct_answer;
          const isSelected = selected === key;
          const showCorrect = hasAnswered && isCorrectOption;
          const showWrong = isSelected && hasAnswered && !isCorrectOption;

          return (
            <OptionButton
              key={key}
              optionKey={key}
              optionText={mcq.options[key]}
              isSelected={isSelected}
              showCorrect={showCorrect}
              showWrong={showWrong}
              disabled={hasAnswered} // Disable all options once an answer is chosen
              onClick={handleOptionClick}
            />
          );
        })}
      </div>
    </motion.div>
  );
};

export default MCQCard;