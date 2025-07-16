// components/ProcessingPage/ProcessedFileDisplay.tsx
import { useProcessedResult } from '@/hooks/useProccessedResult'; // Correct import path and name
import type { ProcessedFile } from "./learning.d"; // Assuming ProcessedFile type is here
import type { JSX } from 'react/jsx-runtime';

interface ProcessedFileDisplayProps {
  file: ProcessedFile;
  getFormatIcon: (format: string) => JSX.Element; // Pass the icon getter as a prop
}

export default function ProcessedFileDisplay({ file, getFormatIcon }: ProcessedFileDisplayProps) {
  // ✅ Hook called at the top level of this new component
  const RenderProcessedFileContent = useProcessedResult(file);

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow h-[60vh] overflow-scroll">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-lg">
            {getFormatIcon(file.filtersApplied.format)}
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{file.filtersApplied.format}</h4>
            <p className="text-sm text-gray-500">
              {file.filtersApplied.language_used} • {file.filtersApplied.processingIntensity} Intensity
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            {file.filtersApplied.extractKeyPoints && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                Key Points
              </span>
            )}
            {file.filtersApplied.includeCitations && (
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                Citations
              </span>
            )}
          </div>
        </div>
      </div>
      {/* Render the component returned by the hook */}
      {<RenderProcessedFileContent />}
    </div>
  );
}