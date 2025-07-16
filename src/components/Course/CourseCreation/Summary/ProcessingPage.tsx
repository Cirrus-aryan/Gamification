// components/ProcessingPage/ProcessingPage.tsx
import { useContext, useState } from "react";
import { DataContext } from "@/Context/Context";
import { analyzeContent } from "../../../ProcessingPage/AnalyzeService";
import { Button } from "@/components/ui/button";
import PlayArrowOutlined from "@mui/icons-material/PlayArrow";
import PreviewSection from "../../../ProcessingPage/PreviewSection";
import SummarySection from "../../../ProcessingPage/SummarySection";
import DeleteIcon from "@mui/icons-material/Delete";
import SettingsOverscanIcon from "@mui/icons-material/SettingsOverscan";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import TabDialog from "./TabDialog";

function ProcessingPage({language}:{language:any}) {
  const { final, response, setResponse, Analysis, setAnalysis } = useContext(DataContext);
  const [processingStatus, setProcessingStatus] = useState<null | "processing" | "complete" | "error">(null);
  const handleDelete = (id: string | undefined, type: string) => {
    setAnalysis(Analysis.filter((t: any) => (t.key || t.type) !== (id || type)));
  };

  async function handleAnalyze() {
    if (!final) return;
    setProcessingStatus("processing");

    // Assuming analyzeContent correctly handles selectedLanguage and updates Analysis
    const result = await analyzeContent(final, language, setAnalysis);
    if (result) {
      setResponse(result);
      setProcessingStatus("complete");
    } else {
      setProcessingStatus("error");
    }
  }

  return (
    // Main container with responsive padding and shadow
    <div className="border border-gray-200 w-full rounded-2xl p-4 sm:p-6 lg:p-8 flex flex-col bg-white shadow-sm">
      {/* Header section with title and action buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        {/* Responsive title font size */}
        <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl text-gray-800 mb-2 sm:mb-0">
          Preview & Output
        </h1>
        <div className="flex gap-2">
          
          <Button onClick={handleAnalyze} disabled={processingStatus === "processing"}>
            <PlayArrowOutlined className="mr-1" />
            {processingStatus === "processing" ? "Processing..." : "Process"}
          </Button>
        </div>
      </div>

      <hr className="my-3 border-gray-200" />

      {/* Original Content and Summary sections */}
      {/* Grid layout: single column on small, two columns on large */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {/* Original Content */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold p-2 text-gray-700">Original Content</h2>
          <div className="border border-gray-200 rounded-xl my-2 mx-0 sm:mx-1 overflow-auto bg-gray-50 shadow-inner
                        min-h-[200px] h-auto lg:h-96"> {/* Responsive height */}
            <PreviewSection final={final} />
          </div>
        </div>
        {/* Summary */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold p-2 text-gray-700">Summary</h2>
          <div className="border border-gray-200 rounded-xl my-2 mx-0 sm:mx-1 p-3 sm:p-4 text-gray-700 overflow-y-auto shadow-sm
                        bg-white transition-shadow duration-300 ease-in-out hover:shadow-md
                        min-h-[200px] h-screen lg:h-96"> {/* Responsive height */}
            <SummarySection response={response} />
          </div>
        </div>
      </div>

      {/* Analysis Cards Section - Horizontal scroll for multiple cards */}
      <div className="flex flex-row overflow-x-auto gap-2 p-1 -mx-1"> {/* Added horizontal padding with negative margin */}
        {Analysis.map((v: any) => {
          return (
            <div
              key={v.key || v.type} // Use key or type as fallback for unique key
              className="flex-shrink-0 flex flex-col p-3 sm:p-4 border border-gray-300 rounded-lg shadow-sm bg-white
                         w-[calc(100%-0.5rem)] sm:w-[calc(50%-0.5rem)] md:w-[calc(33.33%-0.66rem)] lg:w-[calc(25%-0.75rem)]
                         hover:shadow-md transition-shadow duration-200"
            >
              <div className="text-sm sm:text-base text-gray-700 space-y-1">
                <div className="flex justify-between items-center pb-2 border-b border-gray-100 mb-2">
                  <span className="font-semibold text-gray-800">Output Format:</span>
                  <span className="text-gray-600">{v.type}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Name:</span>
                  <span className="break-words text-right">{v.name}</span> {/* Ensure name wraps */}
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Language:</span>
                  <span>{v.language}</span>
                </div>
                {/* Add other relevant config details if available in 'v' */}
                {v.summary_Length_IF_Summary_formateis_Choosen && (
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Summary Length:</span>
                    <span>{v.summary_Length_IF_Summary_formateis_Choosen}</span>
                  </div>
                )}
                {typeof v.includeCitations !== 'undefined' && (
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Include Citations:</span>
                    <span className={v.includeCitations ? "text-green-600" : "text-red-600"}>
                      {v.includeCitations ? "Yes" : "No"}
                    </span>
                  </div>
                )}
                {typeof v.extractKeyPoints !== 'undefined' && (
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Extract Key Points:</span>
                    <span className={v.extractKeyPoints ? "text-green-600" : "text-red-600"}>
                      {v.extractKeyPoints ? "Yes" : "No"}
                    </span>
                  </div>
                )}
                {typeof v.useBulletPoints !== 'undefined' && (
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Use Bullet Points:</span>
                    <span className={v.useBulletPoints ? "text-green-600" : "text-red-600"}>
                      {v.useBulletPoints ? "Yes" : "No"}
                    </span>
                  </div>
                )}
                {v.processingIntensity && (
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Processing Intensity:</span>
                    <span>{v.processingIntensity}</span>
                  </div>
                )}
              </div>
              <div className="flex justify-end items-center mt-4 pt-3 border-t border-gray-100 space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="p-1 sm:p-2 rounded-full text-gray-500 hover:bg-gray-100 transition"
                      title="View Details"
                    >
                      <SettingsOverscanIcon fontSize="small" />
                    </button>
                  </DialogTrigger>
                  <TabDialog tab={v} /> {/* Pass the entire 'v' object as 'tab' */}
                </Dialog>
                <button
                  type="button"
                  className="p-1 sm:p-2 rounded-full text-red-500 hover:bg-red-100 transition"
                  title="Delete Configuration"
                  onClick={() => handleDelete(v?.key, v?.type)}
                >
                  <DeleteIcon fontSize="small" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProcessingPage;