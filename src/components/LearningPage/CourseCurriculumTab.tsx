// components/course/CourseCurriculumTab.tsx
import type { Course } from './learning.d';

type CourseCurriculumTabProps = {
  course: Course;
};

export default function CourseCurriculumTab({ course }: CourseCurriculumTabProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-900">Course Curriculum</h2>
        <p className="text-gray-600 mt-2">{course.Serials.length} modules with comprehensive learning materials</p>
      </div>

      <div className="divide-y">
        {course.Serials.map((serial, index) => (
          <div key={index} className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">{index + 1}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{serial.topic.name}</h3>
            </div>

            <div className="ml-14 space-y-4">
              {/* Summaries */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Available Summaries:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {serial.summaries.map((summary, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-file-text-line text-blue-500"></i>
                      </div>
                      <span>{summary.lang}: {summary.topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Materials */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Learning Materials:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {serial.Filtered.map((filtered, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-file-list-line text-green-500"></i>
                      </div>
                      <span>{filtered.format} ({filtered.language_used})</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Audio Books */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Audio Content:</h4>
                <div className="space-y-1">
                  {serial.audiobook.map((audio, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-headphone-line text-orange-500"></i>
                      </div>
                      <span>{audio}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}