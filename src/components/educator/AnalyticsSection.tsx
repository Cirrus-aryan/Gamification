
import type{ TeacherInfo } from './instructorTypes';

interface AnalyticsSectionProps {
  instructorData: TeacherInfo;
}

export default function AnalyticsSection({ instructorData }: AnalyticsSectionProps) {
  const totalRevenue = instructorData.coursesTaught?.reduce((sum, course) => {
    return sum + (course.payments?.reduce((courseSum, payment) => courseSum + payment.amount, 0) || 0);
  }, 0) || 0;

  const totalStudents = instructorData.EnrolledStudents.length;
  const activeStudents = instructorData.EnrolledStudents.filter(s => s.tasks.length > 0).length;
  const avgProgress = instructorData.Enrolled.length > 0 
    ? instructorData.Enrolled.reduce((sum, enrollment) => {
        const progress = Object.values(enrollment)[0]?.progress || 0;
        return sum + progress;
      }, 0) / instructorData.Enrolled.length 
    : 0;

  const monthlyData = [
    { month: 'Jan', revenue: Math.floor(totalRevenue * 0.1), students: Math.floor(totalStudents * 0.15) },
    { month: 'Feb', revenue: Math.floor(totalRevenue * 0.12), students: Math.floor(totalStudents * 0.18) },
    { month: 'Mar', revenue: Math.floor(totalRevenue * 0.15), students: Math.floor(totalStudents * 0.22) },
    { month: 'Apr', revenue: Math.floor(totalRevenue * 0.18), students: Math.floor(totalStudents * 0.25) },
    { month: 'May', revenue: Math.floor(totalRevenue * 0.22), students: Math.floor(totalStudents * 0.20) },
    { month: 'Jun', revenue: Math.floor(totalRevenue * 0.23), students: Math.floor(totalStudents * 0.30) }
  ];

  return (
    <div className="space-y-8">
      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">+12% from last month</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 flex items-center justify-center">
                <i className="ri-money-dollar-circle-line text-white text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Students</p>
              <p className="text-3xl font-bold text-gray-900">{activeStudents}</p>
              <p className="text-sm text-blue-600 mt-1">+{Math.round((activeStudents/totalStudents)*100)}% engagement</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 flex items-center justify-center">
                <i className="ri-user-follow-line text-white text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg Completion</p>
              <p className="text-3xl font-bold text-gray-900">{Math.round(avgProgress)}%</p>
              <p className="text-sm text-purple-600 mt-1">+5% this month</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 flex items-center justify-center">
                <i className="ri-bar-chart-line text-white text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Course Rating</p>
              <p className="text-3xl font-bold text-gray-900">4.8</p>
              <p className="text-sm text-yellow-600 mt-1">+0.2 this month</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 flex items-center justify-center">
                <i className="ri-star-line text-white text-xl"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue and Student Growth Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-6">Revenue Trend</h3>
          <div className="space-y-4">
            {monthlyData.map((data) => (
              <div key={data.month} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{data.month}</span>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{width: `${(data.revenue / Math.max(...monthlyData.map(d => d.revenue))) * 100}%`}}
                    ></div>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900">${data.revenue.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-6">Student Growth</h3>
          <div className="space-y-4">
            {monthlyData.map((data) => (
              <div key={data.month} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{data.month}</span>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{width: `${(data.students / Math.max(...monthlyData.map(d => d.students))) * 100}%`}}
                    ></div>
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-900">{data.students}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Course Performance Analytics */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-6">Course Performance Analytics</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Course</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Enrollment</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Completion Rate</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Revenue</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Avg Progress</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Rating</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Growth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {instructorData.coursesTaught?.map((course, index) => {
                const courseRevenue = course.payments?.reduce((sum, payment) => sum + payment.amount, 0) || 0;
                const enrollmentCount = course.enrolledUsers?.length || 0;
                const completionRate = 65 + (index * 5); // Mock completion rate
                const avgCourseProgress = 70 + (index * 3); // Mock progress
                const rating = 4.3 + (index * 0.1);
                const growth = 5 + (index * 2);
                
                return (
                  <tr key={course._id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{course.title}</div>
                      <div className="text-sm text-gray-500">{course.category}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{enrollmentCount}</div>
                      <div className="text-sm text-gray-500">students</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{width: `${completionRate}%`}}></div>
                        </div>
                        <span className="text-sm font-medium">{completionRate}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">${courseRevenue.toLocaleString()}</div>
                      <div className="text-sm text-green-600">+{growth}%</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{width: `${avgCourseProgress}%`}}></div>
                        </div>
                        <span className="text-sm font-medium">{avgCourseProgress}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-1">
                        <div className="w-4 h-4 flex items-center justify-center">
                          <i className="ri-star-fill text-yellow-400"></i>
                        </div>
                        <span className="font-medium">{rating.toFixed(1)}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-green-600 font-medium">+{growth}%</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Progress Distribution */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-6">Student Progress Distribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-red-600">
                {Math.floor(totalStudents * 0.15)}
              </span>
            </div>
            <h4 className="font-medium text-gray-900">0-25% Complete</h4>
            <p className="text-sm text-gray-500">Beginners</p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-yellow-600">
                {Math.floor(totalStudents * 0.25)}
              </span>
            </div>
            <h4 className="font-medium text-gray-900">25-50% Complete</h4>
            <p className="text-sm text-gray-500">In Progress</p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-blue-600">
                {Math.floor(totalStudents * 0.35)}
              </span>
            </div>
            <h4 className="font-medium text-gray-900">50-75% Complete</h4>
            <p className="text-sm text-gray-500">Advanced</p>
          </div>
          
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-green-600">
                {Math.floor(totalStudents * 0.25)}
              </span>
            </div>
            <h4 className="font-medium text-gray-900">75-100% Complete</h4>
            <p className="text-sm text-gray-500">Completed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
