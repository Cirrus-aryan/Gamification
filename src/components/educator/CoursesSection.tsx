
'use client';

import { useState } from 'react';
import type{ TeacherInfo } from './instructorTypes';

interface CoursesSectionProps {
  instructorData: TeacherInfo;
}

export default function CoursesSection({ instructorData }: CoursesSectionProps) {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium whitespace-nowrap cursor-pointer flex items-center space-x-2">
          <div className="w-5 h-5 flex items-center justify-center">
            <i className="ri-add-line"></i>
          </div>
          <span>Create New Course</span>
        </button>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {instructorData.coursesTaught?.map((course) => (
          <div key={course._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 relative">
              <img 
                src={`https://readdy.ai/api/search-image?query=modern%20educational%20course%20banner%20for%20$%7Bcourse.category%7D%20learning%2C%20professional%20online%20education%20design%20with%20clean%20layout&width=400&height=192&seq=${course._id}&orientation=landscape`}
                alt={course.title}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                  {course.category}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {course.difficultyLevel}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                {course.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {course.description}
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-gray-500">Students:</span>
                  <span className="font-medium text-gray-900 ml-1">
                    {course.enrolledUsers?.length || 0}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Duration:</span>
                  <span className="font-medium text-gray-900 ml-1">
                    {formatDuration(course.duration)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Price:</span>
                  <span className="font-medium text-gray-900 ml-1">
                    ${course.price}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">Revenue:</span>
                  <span className="font-medium text-gray-900 ml-1">
                    ${course.payments?.reduce((sum, payment) => sum + payment.amount, 0) || 0}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-star-fill text-yellow-400"></i>
                  </div>
                  <span className="text-sm text-gray-600 font-medium">
                    4.{Math.floor(Math.random() * 3) + 5} ({course.reviews?.length || 0} reviews)
                  </span>
                </div>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  Active
                </span>
              </div>
              
              <div className="flex space-x-2">
                <button 
                  onClick={() => setSelectedCourse(selectedCourse === course._id ? null : course._id)}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 text-sm font-medium whitespace-nowrap cursor-pointer"
                >
                  View Details
                </button>
                <button className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 text-sm font-medium whitespace-nowrap cursor-pointer">
                  Edit
                </button>
              </div>
            </div>
            
            {/* Expanded Details */}
            {selectedCourse === course._id && (
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Course Content</h4>
                    <div className="space-y-2">
                      {course.organizedCourseContent?.slice(0, 3).map((content, index) => (
                        <div key={content.moduleKey} className="flex items-center justify-between p-2 bg-white rounded">
                          <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                              {index + 1}
                            </div>
                            <span className="text-sm font-medium">Module {content.moduleKey}</span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {content.summaries?.length || 0} items
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Recent Payments</h4>
                    <div className="space-y-1">
                      {course.payments?.slice(0, 3).map((payment, _index) => (
                        <div key={payment._id} className="flex items-center justify-between p-2 bg-white rounded text-sm">
                          <span className="text-gray-600">{payment.user_email}</span>
                          <span className="font-medium text-green-600">${payment.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Course Statistics Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-6">Course Performance Overview</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Course</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Students</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Completion Rate</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Revenue</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Rating</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Last Updated</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {instructorData.coursesTaught?.map((course) => (
                  <tr key={course._id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{course.title}</div>
                      <div className="text-sm text-gray-500">{course.category}</div>
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-900">
                      {course.enrolledUsers?.length || 0}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{width: '75%'}}></div>
                        </div>
                        <span className="text-sm font-medium">75%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-medium text-gray-900">
                      ${course.payments?.reduce((sum, payment) => sum + payment.amount, 0) || 0}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-1">
                        <div className="w-4 h-4 flex items-center justify-center">
                          <i className="ri-star-fill text-yellow-400"></i>
                        </div>
                        <span className="font-medium">4.{Math.floor(Math.random() * 3) + 5}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {formatDate(course.StartDate)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 cursor-pointer">
                          <div className="w-4 h-4 flex items-center justify-center">
                            <i className="ri-edit-line"></i>
                          </div>
                        </button>
                        <button className="text-green-600 hover:text-green-800 cursor-pointer">
                          <div className="w-4 h-4 flex items-center justify-center">
                            <i className="ri-eye-line"></i>
                          </div>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
