import { cn } from "@/lib/utils";


const ResultPanelotes = ({ result }: { result: any[] }) => {
  if (!result || result.length === 0) {
    return (
      <p className="text-gray-500 text-center py-4 text-sm sm:text-base">
        No notes data available.
      </p>
    );
  }

  return (
    <div className="w-full border border-gray-200 bg-white rounded-lg p-4 sm:p-6 shadow-sm">
      {result?.map((v, index) => {
        let title = v?.title ? v.title.replaceAll("**", "") : "";

        return (
          <div
            key={index}
            className={cn(
              "pb-4",
              index < result.length - 1 && "border-b border-gray-100 mb-4 sm:pb-6 sm:mb-6"
            )}
          >
            {title && (
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2 sm:mb-3 leading-tight">
                {title}
              </h2>
            )}

            {Array.isArray(v?.content) && v.content.length > 0 ? (
              <ul className="list-disc pl-5 text-gray-600 space-y-1 text-sm sm:text-base">
                {v?.content?.map((val: string, bpIndex: number) => {
                  // const bulletpoint = val?.replace("**", "");
                  return (
                    <li key={bpIndex} className="leading-relaxed break-words">
                      {val}
                    </li>
                  );
                })}
              </ul>
            ):<p className="leading-relaxed break-words">
                      {v?.content?.replace("**", "")}
                    </p>}
          </div>
        );
      })}
    </div>
  );
};

export default ResultPanelotes;
