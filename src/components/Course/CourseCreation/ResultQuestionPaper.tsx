
function ResultQuestionPaper({ data }: { data: any }) {
  console.log("ResultQuestionPaper data:", data);

  if (!data || (!data.paper && !data.answer)) {
    return <p className="text-gray-500 text-center py-4">No question paper data available.</p>;
  }

  return (
    <div className="space-y-6 p-2 sm:p-4"> {/* Added responsive padding and vertical spacing */}
      {/* Render Questions */}
      {data?.paper?.length > 0 && (
        <div className="space-y-4"> {/* Vertical spacing between questions */}
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Questions</h3>
          {data.paper.map((item: any, index: number) => (
            <div key={item?.question_number || index} className="p-3 sm:p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                {/* Question Text */}
                <div className="flex-grow text-sm sm:text-base text-gray-800 font-medium leading-relaxed break-words">
                  <span className="font-semibold text-blue-700 mr-2">
                    {item?.question_type} {item?.question_number}:
                  </span>
                  {item?.question_text}
                </div>
                {/* Marks */}
                {item?.marks && (
                  <div className="flex-shrink-0 mt-2 sm:mt-0 sm:ml-4 text-sm sm:text-base text-gray-600 font-semibold">
                    [{item.marks} Marks]
                  </div>
                )}
              </div>

              {/* Options (if available) */}
              {item?.options && item.options.length > 0 && (
                <div className="ml-0 sm:ml-4 mt-3"> {/* Adjusted margin for small screens */}
                  <p className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">Options:</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base text-gray-700"> {/* Responsive font size and spacing */}
                    {item.options.map((option: { option_tag: string, option_text: string }, optIndex: number) => (
                      <li key={option?.option_tag || optIndex} className="break-words">
                        <span className="font-medium mr-1">{option?.option_tag}.</span> {option?.option_text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Render Answers */}
      {data?.answer?.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-gray-200"> {/* Separator and spacing for answers section */}
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Answers</h3>
          {data.answer.map((item1: any, index: number) => (
            <div key={item1?.question_number || index} className="p-3 sm:p-4 border border-gray-200 rounded-lg shadow-sm bg-white">
              <p className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">
                Answer {item1?.question_number}:
              </p>
              <p className="text-sm sm:text-base text-gray-800 leading-relaxed break-words">
                {item1?.answer_text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ResultQuestionPaper;