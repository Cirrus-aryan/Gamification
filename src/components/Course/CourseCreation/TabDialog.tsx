import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { TabItem } from "./type";
import { Button } from "../../ui/button";
import ResultPanelotes from "./ResultNotes";
import ResultPanel from "./ResultPanelSummary";
import ResultQA from "./ResultQA";
import QuizQuestion from "./Resultmcqs";
import ResultQuestionPaper from "./ResultQuestionPaper";
import SummarySection from "../../ProcessingPage/SummarySection";

const TabDialog = ({ tab }: { tab: TabItem }) => {
  let f = tab;

  const renderResult = () => {
    switch (f?.Formate) {
      case "summary":
        return <ResultPanel result={f?.data?.summary || f?.data} />;
      case "notes":
        return <ResultPanelotes result={f?.data?.notes} />;
      case "qa":
        return <ResultQA result={f?.data?.qa} />;
      case "MCQs":
        return <QuizQuestion mcqData={f?.data?.mcqs} />; // Added || [] to ensure it's always an array
      case "paper":
        return <ResultQuestionPaper data={f?.data} />;
      default:
        return <></>;
    }
  };
  return (
    <>
      <DialogContent
        className="max-w-[100vw] w-[100vw]"
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
        <div
          className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-y-auto"
          style={{ height: "70vh" }}
        >
          <div
            className="bg-gray-50 p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between"
            style={{ maxHeight: "150vh" }}
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Configuration Settings
            </h3>
            <div className="flex-grow text-base text-gray-700 space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                <span className="font-medium text-gray-800">
                  Output Format:
                </span>
                <span className="text-gray-600">{f.Formate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Summary Length:</span>
                <span>{f.summary_Length_IF_Summary_formateis_Choosen}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Include Citations:</span>
                <span
                  className={
                    f.includeCitations ? "text-green-600" : "text-red-600"
                  }
                >
                  {f.includeCitations ? "Yes" : "No"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Language:</span>
                <span>{f.language}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Extract Key Points:</span>
                <span
                  className={
                    f.extractKeyPoints ? "text-green-600" : "text-red-600"
                  }
                >
                  {f.extractKeyPoints ? "Yes" : "No"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Use Bullet Points:</span>
                <span
                  className={
                    f.useBulletPoints ? "text-green-600" : "text-red-600"
                  }
                >
                  {f.useBulletPoints ? "Yes" : "No"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Processing Intensity:</span>
                <span>{f.processingIntensity}</span>{" "}
              </div>
            </div>
            <div
              className="flex-grow flex flex-col bg-white p-5 rounded-lg border border-gray-200 shadow-sm overflow-auto"
              style={{ maxHeight: "55vw", overflow: "auto" }}
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-700">
                Processed Result
              </h3>
              <div className="flex-grow flex flex-col gap-2 overflow-y-auto border p-3 rounded-md bg-gray-50">
                {f.data ? (
                  renderResult()
                ) : (
                  <p className="text-gray-500">
                    No processed result available for this configuration.
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6" style={{ height: "55vh" }}>
            {f.reference?.analysis_result && (
              <div
                className="flex-grow flex flex-col bg-white p-5 rounded-lg border border-gray-200 shadow-sm"
                style={{ height: "70vh" }}
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-700">
                  References
                </h3>
                <div className="flex-grow flex flex-col gap-2 overflow-y-auto border p-3 rounded-md bg-gray-50">
                  <SummarySection
                    response={f?.reference?.analysis_result.sections}
                  />

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
