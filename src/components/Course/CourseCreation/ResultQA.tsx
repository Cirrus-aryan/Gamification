import { useEffect } from "react"; // Changed 'use' to 'React' for consistency
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ResultQA = ({ result }: { result: any[] }) => {
  useEffect(() => console.log("ResultQA data:", result), [result]); // Added dependency array for useEffect

  if (!result || result.length === 0) {
    return (
      <p className="text-gray-500 text-center py-4">No Q&A data available.</p>
    );
  }

  return (
    // Main container with responsive padding and shadow
    <div className="w-full border border-gray-200 bg-white rounded-lg p-4 sm:p-6 shadow-sm">
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-0" // Set default to first item for initial expansion, if desired
      >
        {result?.map((v, index) => {
          // Ensure v.question and v.answer exist before calling replaceAll
          const question = v.question ? v.question.replaceAll("**", "") : "No Question"; // Removed '' for better display
          const answer = v.answer ? v.answer.replaceAll("**", "") : "No Answer";

          return (
            <AccordionItem value={`item-${index}`} key={index}>
              {/* Responsive font size for AccordionTrigger (question) */}
              <AccordionTrigger className="text-left text-sm sm:text-base lg:text-lg font-medium hover:no-underline">
                {question}
              </AccordionTrigger>
              {/* Responsive font size for AccordionContent (answer) */}
              <AccordionContent className="flex flex-col gap-2 text-balance text-sm sm:text-base text-gray-700 leading-relaxed">
                {answer}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default ResultQA;