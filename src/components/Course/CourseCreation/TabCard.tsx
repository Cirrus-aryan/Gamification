import DeleteIcon from "@mui/icons-material/Delete";
import SettingsOverscanIcon from "@mui/icons-material/SettingsOverscan";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import TabDialog from "./TabDialog";
import type { TabItem } from "./type";

const TabCard = ({ tab, onDelete }: { tab: TabItem; onDelete: () => void }) => (
  <div
    className="
      flex-shrink-0 flex flex-col p-3 sm:p-4 border border-gray-300 rounded-lg shadow-sm bg-white
      w-full sm:w-auto
      hover:shadow-md transition-shadow duration-200
    "
  >
    {/* Card Content */}
    {/* Using `text-xs sm:text-sm` for responsive font size */}
    {/* `space-y-1` for consistent vertical spacing */}
    <div className="text-xs sm:text-sm text-gray-700 space-y-1">
      {/* Output Format */}
       <div className="flex justify-between items-center pb-2 border-b border-gray-100 mb-2">
        <span className="font-semibold text-gray-800">Reference :</span>
        <span className="text-gray-600">{tab?.reference?.name}</span>
      </div>
      <div className="flex justify-between items-center pb-2 border-b border-gray-100 mb-2">
        <span className="font-semibold text-gray-800">Output Format:</span>
        <span className="text-gray-600">{tab.Formate}</span>
      </div>

      {/* Summary Length */}
      <div className="flex justify-between items-center">
        <span className="font-medium">Summary Length:</span>
        <span>{tab.summary_Length_IF_Summary_formateis_Choosen}</span>
      </div>

      {/* Include Citations */}
      <div className="flex justify-between items-center">
        <span className="font-medium">Include Citations:</span>
        <span
          className={tab.includeCitations ? "text-green-600" : "text-red-600"}
        >
          {tab.includeCitations ? "Yes" : "No"}
        </span>
      </div>

      {/* Language */}
      <div className="flex justify-between items-center">
        <span className="font-medium">Language:</span>
        <span>{tab.language}</span>
      </div>

      {/* Extract Key Points */}
      <div className="flex justify-between items-center">
        <span className="font-medium">Extract Key Points:</span>
        <span
          className={tab.extractKeyPoints ? "text-green-600" : "text-red-600"}
        >
          {tab.extractKeyPoints ? "Yes" : "No"}
        </span>
      </div>

      {/* Use Bullet Points */}
      <div className="flex justify-between items-center">
        <span className="font-medium">Use Bullet Points:</span>
        <span
          className={tab.useBulletPoints ? "text-green-600" : "text-red-600"}
        >
          {tab.useBulletPoints ? "Yes" : "No"}
        </span>
      </div>

      {/* Processing Intensity */}
      <div className="flex justify-between items-center">
        <span className="font-medium">Processing Intensity:</span>
        <span>{tab.processingIntensity}</span>
      </div>
    </div>

    {/* Action Buttons */}
    {/* Responsive padding and spacing */}
    <div className="flex justify-end items-center mt-3 pt-3 border-t border-gray-100 space-x-2 sm:space-x-3">
      {/* View Details Button */}
      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            className="p-1 sm:p-2 rounded-full text-gray-500 hover:bg-gray-100 "
            title="View Details"
          >
            <SettingsOverscanIcon fontSize="small" />
          </button>
        </DialogTrigger>
        <TabDialog tab={tab} />
      </Dialog>

      {/* Delete Button */}
      <button
        type="button"
        className="p-1 sm:p-2 rounded-full text-red-500 hover:bg-red-100 transition"
        title="Delete Configuration"
        onClick={onDelete}
      >
        <DeleteIcon fontSize="small" />
      </button>
    </div>
  </div>
);

export default TabCard;