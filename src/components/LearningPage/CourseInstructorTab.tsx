// components/course/CourseInstructorTab.tsx
import type { Instructor } from './learning.d';

type CourseInstructorTabProps = {
  instructor: Instructor;
};

export default function CourseInstructorTab({ instructor }: CourseInstructorTabProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-start space-x-6">
        <img
          src={instructor.userProfilePicture}
          alt={instructor.userName}
          className="w-24 h-24 rounded-full border-4 border-gray-200"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{instructor.userName}</h2>
          <p className="text-lg text-blue-600 mb-4">{instructor.userRole}</p>
          <p className="text-gray-600 mb-4">Contact: {instructor.userEmail}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">4.8</div>
              <div className="text-sm text-gray-600">Instructor Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">15,000+</div>
              <div className="text-sm text-gray-600">Students Taught</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">8</div>
              <div className="text-sm text-gray-600">Courses Created</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}