import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SummarySection from "../../../ProcessingPage/SummarySection";

const TabDialog = ({ tab }: { tab: any }) => {
  const f = tab;

  // Helper function to render content based on type
  const renderGivenData = () => {
    switch (f.type) {
      case "Video":
        return (
            <video
            src={f.link}
            controls
            className="w-full rounded-md shadow aspect-video"
            aria-label="Video content"
            >
            Sorry, your browser does not support embedded videos.
            </video>
        );
      case "Pdf":
        return (
          <iframe
            src={f.link}
            className="w-full h-full rounded-md border shadow" // h-full within flex-grow parent
            title="PDF Viewer"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms" // Recommended sandbox attributes
            aria-label="PDF document viewer"
          ></iframe>
        );
      case "Text":
        return (
          <div className="p-2 text-gray-700 text-sm sm:text-base">
            <div className="font-bold text-base sm:text-lg mb-1">Key:</div>
            <div className="mb-3 break-words">{f.name}</div>
            <div className="font-bold text-base sm:text-lg mb-1">Text:</div>
            <div className="break-words leading-relaxed">{f.summary as string}</div>
          </div>
        );
      case "YoutubeUrl":
        return (
            <video
            src={f.link}
            controls
            className="w-full h-fit rounded-md shadow aspect-video"
            aria-label="Video content"
            >
            Sorry, your browser does not support embedded videos.
            </video>
        );
      default:
        return (
          <p className="text-gray-500 text-center py-4 text-sm sm:text-base">
            Unsupported data type or no content available.
          </p>
        );
    }
  };

  return (
    <>
      {/* DialogContent for full responsiveness */}
      {/* On mobile, it takes full screen. On larger screens, it becomes a constrained modal. */}
      {/* `fixed inset-0` for full screen overlay, `flex items-center justify-center p-4` for centering */}
      {/* `max-w-full md:max-w-4xl lg:max-w-6xl xl:max-w-7xl` for responsive width */}
      {/* `h-full md:h-[90vh]` for responsive height, allowing some margin on larger screens */}
      {/* `flex flex-col` to stack header, content, and footer vertically */}
       <DialogContent
        className="max-w-[100vw] w-[100vw] overflow-auto"
        style={{ maxWidth: "100vw", maxHeight: "100vh" }}
      >
         <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold text-gray-800">
            {f.Formate} Details
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Detailed view of the configuration and its processed output.
          </DialogDescription>
        </DialogHeader>

        {/* Main content area: Given Data & Config (left), References (right) */}
        {/* `flex-grow` allows this section to take up available vertical space */}
        {/* `grid grid-cols-1 lg:grid-cols-2` for responsive column layout */}
        {/* `gap-4 md:gap-6` for responsive spacing between columns */}
        <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 pb-4"> {/* Removed overflow-y-auto here, as parent now handles */}
          {/* Left Panel: Given Data & Configuration Settings */}
          <div className="flex flex-col gap-4">
            {/* Given Data Section */}
            <div
              className="bg-gray-50 p-4 sm:p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col flex-grow
                         max-h-[60vh] lg:max-h-[70vh] overflow-y-auto" // Responsive max-height and overflow
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-700 flex-shrink-0">
                Given Data
              </h3>
              <div className="flex-grow flex flex-col gap-2 overflow-y-auto border p-3 rounded-md bg-white">
                {renderGivenData()}
              </div>
            </div>

            {/* Configuration Settings Section */}
            <div
              className="bg-gray-50 p-4 sm:p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col flex-shrink-0"
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-700">
                Configuration Settings
              </h3>
              <div className="flex-grow text-sm sm:text-base text-gray-700 space-y-2">
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="font-medium text-gray-800">
                    Output Format:
                  </span>
                  <span className="text-gray-600">{f.Formate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Name:</span>
                  <span className="break-words text-right">{f.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Language:</span>
                  <span>{f.language}</span>
                </div>
                {/* Add other configuration settings if available in 'f' */}
              
                
              </div>
            </div>
          </div>

            <div className="flex flex-col gap-6" style={{ height: "55vh" }}>
            {f.analysis_result && (
              <div
                className="flex-grow flex flex-col bg-white p-5 rounded-lg border border-gray-200 shadow-sm"
                style={{ height: "70vh" }}
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-700">
                  References
                </h3>
                <div className="flex-grow flex flex-col gap-2 overflow-y-auto border p-3 rounded-md bg-gray-50">
                  
                                  <SummarySection response={f.analysis_result.sections || f.analysis_result} />

                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="mt-6 flex justify-end">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </>
  );
};

export default TabDialog;