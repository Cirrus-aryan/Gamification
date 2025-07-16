// components/ProcessingPage/SummarySection.tsx
import { cn } from "@/lib/utils";

// Define the type for the recursive subsection to be an array of FormattedResponseItem
interface SubSectionType {
  heading?: string;
  para?: string;
  Bulletpoints?: string[];
  subsections?: FormattedResponseItem[]; // subsections can be an array of FormattedResponseItem
}

// Update FormattedResponseItem to reflect the structure
interface FormattedResponseItem {
  mainheading?: string;
  sections?: (SubSectionType & { subsections?: FormattedResponseItem[] })[]; // sections can contain subsections which are also FormattedResponseItem
  heading?: string;
  para?: string;
  Bulletpoints?: string[];
  subsections?: FormattedResponseItem[]; // For the recursive call, this could be an array of items
}

const SummarySection = ({ response }: { response: FormattedResponseItem | FormattedResponseItem[] | null }) => {
  const isArrayResponse = Array.isArray(response);
  // Helper function to process text and apply bold and underline
  const processBulletText = (text: string) => {
    // Regex to find text enclosed in ** (e.g., **Necessity**)
    const parts = text?.split(/(\*\*.*?\*\*)/g);

    return parts.map((part, i) => {
      if (part?.startsWith('**') && part?.endsWith('**')) {
        // Remove the ** delimiters and apply styling
        const content = part.substring(2, part?.length - 2);
        return (
          <strong key={i} className="underline">
            {content}
          </strong>
        );
      }
      return part;
    });
  };

  // Helper function to render a single section item with a professional design
  const renderSectionItem = (item: FormattedResponseItem, index: number, isSubSection = false) => (
    <div
      key={index}
      className={cn(
        "my-3 p-4 rounded-lg border transition-shadow duration-200 ease-in-out",
        isSubSection
          ? "bg-gray-50 border-gray-200 ml-6 hover:shadow-md"
          : "bg-white border-gray-100 hover:shadow-lg"
      )}
    >
      {item.heading && (
        <h3
          className={cn(
            "font-semibold text-lg md:text-xl mb-2",
            isSubSection ? "text-gray-700" : "text-gray-800"
          )}
        >
          {item.heading}
        </h3>
      )}
      {item?.para && <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-3">{item.para}</p>}
      {item?.Bulletpoints && item?.Bulletpoints?.length > 0 && (
        <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm md:text-base">
          {item?.Bulletpoints.map((val, bulletIndex) => (
            <li key={bulletIndex} className="flex items-start before:content-['•'] before:mr-2 before:text-blue-500">
              {processBulletText(val)} {/* Apply the new helper function here */}
            </li>
          ))}
        </ul>
      )}
      {/* Recursively render subsections if they exist */}
      {item.subsections && item.subsections.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <SummarySection response={item.subsections} />
        </div>
      )}
    </div>
  );

  return (
    <div
      className=""
    >
      {response ? (
        <>
          {!isArrayResponse && (response as FormattedResponseItem).mainheading && (
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-5 text-center tracking-tight">
              {(response as FormattedResponseItem).mainheading}
            </h1>
          )}

          <div className="flex flex-col gap-3">
            {isArrayResponse ? (
              (response as FormattedResponseItem[]).map((d, index) => renderSectionItem(d, index, true))
            ) : (
              (response as FormattedResponseItem).sections?.map((d, index) => renderSectionItem(d, index))
            )}
          </div>
        </>
      ) : (
        <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 p-8">
          <svg className="w-14 h-14 mb-4 text-blue-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004 13V9m7.5 7.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"></path>
          </svg>
          <p className="text-lg font-medium text-gray-600">Processing in progress...</p>
          <p className="text-sm text-gray-500">Your summary will appear here shortly.</p>
        </div>
      )}
    </div>
  );
};

export default SummarySection;