// hooks/useProcessedResult.ts
import ResultPanel from "@/components/Course/CourseCreation/ResultPanelSummary";
import ResultPanelotes from "@/components/Course/CourseCreation/ResultNotes";
import ResultQA from "@/components/Course/CourseCreation/ResultQA";
import QuizQuestion from "@/components/Course/CourseCreation/Resultmcqs";
import ResultQuestionPaper from "@/components/Course/CourseCreation/ResultQuestionPaper";
import { useCallback } from "react";

interface ProcessedFile {
  filtersApplied: {
    format: string;
    extractKeyPoints: boolean;
    includeCitations: boolean;
    language_used: string;
    processingIntensity: string;
  };
  result: string; // This 'result' is a stringified JSON, consider parsing if always JSON
}

export const useProcessedResult = (Data: ProcessedFile) => {
  const RenderComponent = useCallback(() => {
    // Check if Data or Data.result exists before parsing
    if (!Data || !Data.result) {
      return (
        <div className="flex items-center justify-center h-full text-gray-500 text-base sm:text-lg">
          No data to display.
        </div>
      );
    }

    try {
      const res = JSON.parse(Data.result);

      switch (Data.filtersApplied.format.toLowerCase()) { // Use toLowerCase() for robust matching
        case "summary":
          return <ResultPanel result={res?.summary} />;
        case "notes":
          return <ResultPanelotes result={res?.notes} />;
        case "qa":
          return <ResultQA result={res?.qa} />;
        case "mcqs": // Make sure this matches your file.filtersApplied.format exactly
          return <QuizQuestion mcqData={res?.mcqs} />;
        case "questionpaper": // Make sure this matches your file.filtersApplied.format exactly
          return <ResultQuestionPaper data={res} />;
        default:
          return (
            <div className="flex items-center justify-center h-full text-gray-500 text-base sm:text-lg">
              Select a processing option to see results.
            </div>
          );
      }
    } catch (error) {
      console.error("Error parsing processed file result:", error);
      return (
        <div className="flex items-center justify-center h-full text-red-500 text-base sm:text-lg">
          Error loading content.
        </div>
      );
    }
  }, [Data]); // Depend on Data so the component re-renders if Data changes

  return RenderComponent;
};