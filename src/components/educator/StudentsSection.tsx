
import { useState } from 'react';
import type{ TeacherInfo } from './instructorTypes';

interface StudentsSectionProps {
  instructorData: TeacherInfo;
}

export default function StudentsSection({ instructorData }: StudentsSectionProps) {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState('All');

  const statusOptions = ['All', 'Active', 'Completed', 'Inactive'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Students</h2>
        <div className="flex items-center space-x-4">
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium whitespace-nowrap cursor-pointer flex items-center space-x-2">
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-download-line"></i>
            </div>
            <span>Export List</span>
          </button>
        </div>
      </div>

      {/* Student Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{instructorData.EnrolledStudents.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 flex items-center justify-center">
                <i className="ri-user-line text-white text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Students</p>
              <p className="text-2xl font-bold text-gray-900">
                {instructorData.EnrolledStudents.filter(s => s.tasks.length > 0).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 flex items-center justify-center">
                <i className="ri-user-follow-line text-white text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg Progress</p>
              <p className="text-2xl font-bold text-gray-900">73%</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 flex items-center justify-center">
                <i className="ri-bar-chart-line text-white text-xl"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Students List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-6">Student List</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Student</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Student ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Enrolled Courses</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Progress</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Tasks Completed</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {instructorData.EnrolledStudents.map((student, index) => {
                  const enrolledCourseCount = instructorData.Enrolled.filter(enrollment => 
                    Object.keys(enrollment).some(courseId => 
                      instructorData.coursesTaught?.some(course => course._id === courseId)
                    )
                  ).length;
                  
                  const avgProgress = instructorData.Enrolled.length > 0 
                    ? instructorData.Enrolled.reduce((sum, enrollment) => {
                        const progress = Object.values(enrollment)[0]?.progress || 0;
                        return sum + progress;
                      }, 0) / instructorData.Enrolled.length 
                    : 0;

                  return (
                    <tr key={student.Student_id} className="hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={`https://readdy.ai/api/search-image?query=professional%20student%20learning%20online%2C%20focused%20person%20studying%20technology%20courses&width=40&height=40&seq=student${index}&orientation=squarish`}
                            alt="Student"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <div className="font-medium text-gray-900">Student #{student.Student_id.slice(-4)}</div>
                            <div className="text-sm text-gray-500">student{index + 1}@example.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600 font-mono">
                        {student.Student_id.slice(-8)}
                      </td>
                      <td className="py-4 px-4 font-medium text-gray-900">
                        {enrolledCourseCount}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{width: `${Math.min(avgProgress, 100)}%`}}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{Math.round(avgProgress)}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-medium text-gray-900">
                        {student.tasks.length}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          student.tasks.length > 0 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {student.tasks.length > 0 ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => setSelectedStudent(selectedStudent === student.Student_id ? null : student.Student_id)}
                            className="text-blue-600 hover:text-blue-800 cursor-pointer"
                          >
                            <div className="w-4 h-4 flex items-center justify-center">
                              <i className="ri-eye-line"></i>
                            </div>
                          </button>
                          <button className="text-green-600 hover:text-green-800 cursor-pointer">
                            <div className="w-4 h-4 flex items-center justify-center">
                              <i className="ri-message-line"></i>
                            </div>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Student Details</h3>
                <button 
                  onClick={() => setSelectedStudent(null)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <div className="w-6 h-6 flex items-center justify-center">
                    <i className="ri-close-line text-xl"></i>
                  </div>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Student Info */}
              <div className="flex items-center space-x-4">
                <img 
                  src={`https://readdy.ai/api/search-image?query=professional%20student%20learning%20online%2C%20focused%20person%20studying%20technology%20courses&width=80&height=80&seq=${selectedStudent}&orientation=squarish`}
                  alt="Student"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xl font-semibold">Student #{selectedStudent.slice(-4)}</h4>
                  <p className="text-gray-600">student@example.com</p>
                  <p className="text-sm text-gray-500">ID: {selectedStudent}</p>
                </div>
              </div>

              {/* Course Progress */}
              <div>
                <h5 className="font-semibold mb-3">Course Progress</h5>
                <div className="space-y-3">
                  {instructorData.Enrolled.slice(0, 3).map((enrollment, index) => {
                    const courseId = Object.keys(enrollment)[0];
                    const progressData = Object.values(enrollment)[0];
                    const course = instructorData.coursesTaught?.find(c => c._id === courseId);
                    
                    return (
                      <div key={courseId} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{course?.title || `Course ${index + 1}`}</span>
                          <span className="text-sm text-gray-600">{progressData.progress}% complete</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{width: `${progressData.progress}%`}}
                          ></div>
                        </div>
                        {progressData.ModelsGameScore && Object.keys(progressData.ModelsGameScore).length > 0 && (
                          <div className="mt-2 text-sm text-gray-600">
                            Quiz Scores: {Object.keys(progressData.ModelsGameScore).length} completed
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tasks */}
              <div>
                <h5 className="font-semibold mb-3">Recent Tasks</h5>
                <div className="space-y-2">
                  {instructorData.EnrolledStudents.find(s => s.Student_id === selectedStudent)?.tasks.slice(0, 5).map((_task, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <span className="text-sm">Task #{index + 1}</span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Completed
                      </span>
                    </div>
                  )) || (
                    <p className="text-gray-500 text-sm">No tasks completed yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
