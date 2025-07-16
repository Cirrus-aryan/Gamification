import { useEffect, useState } from "react";
import type { Course } from './learning.d';
import { CheckCircle } from 'lucide-react'; // Import CheckCircle icon from lucide-react
import { Button } from "../ui/button"; // Import your Button component
import { Link } from "react-router-dom"; // Import Link from react-router-dom

type CourseEnrollmentCardProps = {
  course: Course;
  onEnrollClick: () => void;
};

export default function CourseEnrollmentCard({ course, onEnrollClick }: CourseEnrollmentCardProps) {
  const startDate = new Date(course.StartDate).toLocaleDateString();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Safely get userId from localStorage on component mount
    setUserId(localStorage.getItem("userId"));
  }, []);

  // Check if the current user is enrolled
  const isEnrolled = course.enrolledUsers?.includes(userId || '');

  return (
    <div className="bg-white rounded-xl shadow-2xl p-8 sticky top-8 border border-gray-200">
      <div className="text-center mb-8">
        <div className="text-5xl font-extrabold text-blue-700 mb-2">
          {course.currency} {course.price === 0 ? 'Free' : course.price.toFixed(2)}
        </div>
        <div className="text-gray-600 text-lg">One-time payment</div>
      </div>

      {isEnrolled ? (
        <div className="bg-green-100 text-green-800 font-semibold py-3 px-6 rounded-lg text-center text-lg mb-6 shadow-md">
          <p className="mb-3">You are already enrolled!</p>
          <Link to={`/Learning/course/${course.CourseID}/Platform`}>
            <Button className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold text-center hover:bg-green-700 transition-colors">
              Start Learning
            </Button>
          </Link>
        </div>
      ) : (
        <button
          onClick={onEnrollClick}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 px-6 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg mb-6 whitespace-nowrap focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Enroll Now
        </button>
      )}
      
      <div className="text-center text-sm text-gray-600 mb-6">
        30-day money-back guarantee
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 flex items-center justify-center text-green-500">
            <CheckCircle size={20} />
          </div>
          <span className="text-gray-700 font-medium">Lifetime access</span>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 flex items-center justify-center text-green-500">
            <CheckCircle size={20} />
          </div>
          <span className="text-gray-700 font-medium">Certificate of completion</span>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 flex items-center justify-center text-green-500">
            <CheckCircle size={20} />
          </div>
          <span className="text-gray-700 font-medium">Mobile and desktop access</span>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 flex items-center justify-center text-green-500">
            <CheckCircle size={20} />
          </div>
          <span className="text-gray-700 font-medium">Community support</span>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="text-base text-gray-700 font-semibold">
          Course starts: <span className="font-normal">{startDate}</span>
        </div>
      </div>
    </div>
  );
}
