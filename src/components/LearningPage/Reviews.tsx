// components/Reviews.tsx
// This file likely already exists in your project.
// Ensure it imports the Course and Review types from '../../types/learning'.

import type { Course } from './learning.d'; // Adjust import path as needed

type ReviewsProps = {
  course: Course;
  rating: number; // You might calculate this inside Reviews or pass it down
};

export default function Reviews({ course, rating }: ReviewsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Student Reviews ({course.reviews.length})</h2>
      <div className="flex items-center mb-4">
        <span className="text-4xl font-bold text-yellow-500 mr-2">{rating.toFixed(1)}</span>
        <div className="flex items-center">
          {/* Render stars based on rating */}
          {[...Array(5)].map((_, i) => (
            <i
              key={i}
              className={`ri-star-fill text-xl ${
                i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
              }`}
            ></i>
          ))}
        </div>
        <span className="ml-2 text-gray-600">({course.reviews.length} reviews)</span>
      </div>

      <div className="space-y-6">
        {course.reviews.map((review, index) => (
          <div key={index} className="border-t pt-4">
            <div className="flex items-center mb-2">
              {/* Placeholder for user profile picture/initials */}
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 text-blue-600 font-semibold">
                {/* You might want to display reviewer initials or a small avatar */}
                U
              </div>
              <div>
                <p className="font-semibold text-gray-900">Anonymous User</p> {/* Or actual user name if available */}
                <div className="flex items-center text-sm">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`ri-star-fill ${
                        i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    ></i>
                  ))}
                  <span className="ml-2 text-gray-600">{review.rating.toFixed(1)} star rating</span>
                </div>
              </div>
            </div>
            {/* Add review comment here if available in your Review type */}
            {/* <p className="text-gray-700 mt-2">{review.comment}</p> */}
          </div>
        ))}
        {course.reviews.length === 0 && (
          <p className="text-gray-600">No reviews yet for this course. Be the first to review!</p>
        )}
      </div>
    </div>
  );
}