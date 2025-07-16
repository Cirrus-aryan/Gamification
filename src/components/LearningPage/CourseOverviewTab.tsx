// components/course/CourseOverviewTab.tsx
import type { Course } from './learning.d';
import { formatDuration } from './utils';

type CourseOverviewTabProps = {
  course: Course;
};

export default function CourseOverviewTab({ course }: CourseOverviewTabProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        {/* What You'll Learn */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What You'll Learn</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {course.learningOutcomes.split(', ').map((outcome, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-5 h-5 flex items-center justify-center mt-0.5">
                  <i className="ri-check-line text-green-500"></i>
                </div>
                <span className="text-gray-700">{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Course Description */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Description</h2>
          <p className="text-gray-700 leading-relaxed">{course.description}</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Prerequisites */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Prerequisites</h3>
          <p className="text-gray-700">{course.prerequisites}</p>
        </div>

        {/* Course Details */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Course Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Language:</span>
              <span className="font-medium">{course.language}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Duration:</span>
              <span className="font-medium">{formatDuration(course.duration)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Level:</span>
              <span className="font-medium">{course.difficultyLevel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Modules:</span>
              <span className="font-medium">{course.Serials.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}