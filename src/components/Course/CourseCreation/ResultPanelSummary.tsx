import { cn } from "@/lib/utils";
import { useEffect } from "react"; // Changed from 'useEffect' to 'React, { useEffect }' for consistency

const ResultPanel = ({ result }: { result: any[] }) => {
  useEffect(() => console.log("ResultPanel rendered with result:", result), [result]);

  if (!result || result.length === 0) {
    return <p className="text-gray-500 text-center py-4 text-sm sm:text-base">No summary data available.</p>;
  }

  return (
    // Main container with responsive padding, border, and shadow
    <div className="w-full border border-gray-200 bg-white rounded-lg p-4 sm:p-6 shadow-sm">
      {result?.map((v, index) => {
        // Clean up markdown formatting (e.g., bold indicators)
        const Heading = v?.Heading ? v.Heading.replaceAll("**", "") : "";
        const Para = v?.Para ? v.Para.replaceAll("**", "") : "";

        return (
          // Each individual result item with responsive bottom margin and separator
          <div
            key={index} // Using index as key is acceptable here if items don't reorder or get deleted
            className={cn(
              "pb-4 sm:pb-6", // Responsive bottom padding for separation
              index < result.length - 1 && "border-b border-gray-100 mb-4 sm:mb-6" // Add separator and margin between items
            )}
          >
            {Heading && (
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2 sm:mb-3 leading-tight">
                {Heading}
              </h2>
            )}
            {Para && (
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 break-words">
                {Para}
              </p>
            )}
            {v?.BulletPoints && v.BulletPoints.length > 0 && (
              <ul className="list-disc pl-5 text-gray-600 mb-3 space-y-1 text-sm sm:text-base">
                {v.BulletPoints.map((val: string, bpIndex: number) => {
                  const bulletpoint = val ? val.replace(/\*\*/g, "") : "";
                  return (
                    <li key={bpIndex} className="leading-relaxed break-words">
                      {bulletpoint}
                    </li>
                  );
                })}
              </ul>
            )}
            {/* Recursive call for subtopics with distinct styling for nesting */}
            {v?.subtopics && v.subtopics.length > 0 && (
              <div className="mt-4 pl-3 sm:pl-4 border-l-2 border-blue-300 ml-2 sm:ml-4">
                <h3 className="text-base sm:text-lg font-semibold text-blue-700 mb-2 leading-tight">Subtopics:</h3>
                {/* Recursive call to render nested subtopics */}
                <ResultPanel result={v.subtopics} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ResultPanel;