import React, { useMemo, memo } from "react";
import { CheckCircle, Circle, XCircle } from "lucide-react";
import clsx from "clsx"; // Using clsx for conditional class names

// --- Type Definitions (No Change - They are already excellent!) ---
type OptionKey = "A" | "B" | "C" | "D";



// --- Option Component (New: Extracting for Reusability and Readability) ---
interface OptionButtonProps {
  optionKey: OptionKey;
  optionText: string;
  isSelected: boolean;
  showCorrect: boolean;
  showWrong: boolean;
  disabled: boolean;
  onClick: (key: OptionKey) => void;
}

const OptionButton: React.FC<OptionButtonProps> = memo(
  ({ optionKey, optionText, isSelected, showCorrect, showWrong, disabled, onClick }) => {
    // Memoizing the class string calculation for performance if many options
    const buttonClasses = useMemo(() => {
      return clsx(
        // Responsive padding: p-2 on small screens, p-3 on medium and up
        "w-full text-left flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl border transition-colors duration-200",
        {
          "bg-green-50 border-green-500 text-green-800": showCorrect,
          "bg-red-50 border-red-500 text-red-800": showWrong,
          "bg-gray-200": isSelected && !showCorrect && !showWrong && !disabled, // Selected but not yet evaluated
          "bg-gray-50 border-gray-300 text-gray-800": !isSelected && !showCorrect && !showWrong, // Default
          "cursor-not-allowed opacity-80": disabled, // Visual cue for disabled
          "hover:bg-gray-100": !disabled && !isSelected && !showCorrect && !showWrong, // Hover effect for default state
        }
      );
    }, [isSelected, showCorrect, showWrong, disabled]);

    const Icon = useMemo(() => {
      if (showCorrect) return CheckCircle;
      if (showWrong) return XCircle;
      return Circle;
    }, [showCorrect, showWrong]);

    const iconColor = useMemo(() => {
      if (showCorrect) return "text-green-600";
      if (showWrong) return "text-red-600";
      return "text-gray-400";
    }, [showCorrect, showWrong]);

    return (
      <button
        type="button" // Good practice for buttons inside forms/divs
        onClick={() => onClick(optionKey)}
        className={buttonClasses}
        disabled={disabled}
        // Accessibility: Announce selection state
        aria-checked={isSelected}
        aria-live="polite" // Announce changes in status if needed, though icon/color might suffice
      >
        {/* Icon container with responsive padding-top for alignment */}
        <div className="pt-0.5 sm:pt-1 flex-shrink-0"> {/* flex-shrink-0 prevents icon from shrinking */}
          <Icon className={clsx("w-4 h-4 sm:w-5 sm:h-5", iconColor)} /> {/* Responsive icon size */}
        </div>
        {/* Text content with responsive font sizes */}
        <div className="flex flex-col items-start"> {/* Use flex-col to stack key and text if needed */}
          <span className="font-bold text-xs sm:text-sm">{optionKey}:</span>{" "} {/* Responsive font size */}
          <span className="text-sm sm:text-base text-balance break-words">{optionText}</span> {/* Responsive font size, text-balance, break-words */}
        </div>
      </button>
    );
  }
);

export default OptionButton;