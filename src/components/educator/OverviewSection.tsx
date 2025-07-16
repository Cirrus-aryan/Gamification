
import type { TeacherInfo } from './instructorTypes';

// Material-UI Icons for OverviewSection
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import StarFilledIcon from '@mui/icons-material/Star'; // For filled star

interface OverviewSectionProps {
  instructorData: TeacherInfo;
}

export default function OverviewSection({ instructorData }: OverviewSectionProps) {
  const totalStudents = instructorData.EnrolledStudents.length;
  const totalCourses = instructorData.coursesTaught?.length || 0;
  const totalRevenue = instructorData.coursesTaught?.reduce((sum, course) => {
    return sum + (course.payments?.reduce((courseSum, payment) => courseSum + payment.amount, 0) || 0);
  }, 0) || 0;

  const stats = [
    {
      title: 'Total Students',
      value: totalStudents.toString(),
      icon: PersonOutlineOutlinedIcon, // Material-UI Icon
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Active Courses',
      value: totalCourses.toString(),
      icon: BookOutlinedIcon, // Material-UI Icon
      color: 'bg-green-500',
      change: '+5%'
    },
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: AttachMoneyOutlinedIcon, // Material-UI Icon
      color: 'bg-purple-500',
      change: '+18%'
    },
    {
      title: 'Avg Rating',
      value: '4.8',
      icon: StarBorderOutlinedIcon, // Material-UI Icon
      color: 'bg-yellow-500',
      change: '+0.2'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <div className="w-6 h-6 flex items-center justify-center">
                  <stat.icon className="text-white text-xl" /> {/* Render Material-UI Icon component */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Students */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <div className="w-5 h-5 flex items-center justify-center">
              <PersonAddOutlinedIcon className="text-blue-600 text-lg" /> {/* Material-UI Icon */}
            </div>
            <span>Recent Students</span>
          </h3>
          <div className="space-y-4">
            {instructorData.EnrolledStudents.slice(0, 5).map((student, index) => (
              <div key={student.Student_id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <img
                    src={`https://readdy.ai/api/search-image?query=professional%20student%20avatar%20portrait%2C%20friendly%20learner%20profile%20picture&width=40&height=40&seq=student${index}&orientation=squarish`}
                    alt="Student"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900">Student {student.Student_id.slice(-4)}</p>
                    <p className="text-sm text-gray-500">{student.tasks.length} tasks completed</p>
                  </div>
                </div>
                <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <div className="w-5 h-5 flex items-center justify-center">
              <EmojiEventsOutlinedIcon className="text-blue-600 text-lg" /> {/* Material-UI Icon (using trophy as a general "quick actions" icon) */}
            </div>
            <span>Quick Actions</span>
          </h3>
          <div className="space-y-3">
            <button className="w-full flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg cursor-pointer">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 flex items-center justify-center">
                  <AddOutlinedIcon className="text-white text-lg" /> {/* Material-UI Icon */}
                </div>
              </div>
              <span className="font-medium text-gray-900">Create New Course</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg cursor-pointer">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 flex items-center justify-center">
                  <UploadFileOutlinedIcon className="text-white text-lg" /> {/* Material-UI Icon */}
                </div>
              </div>
              <span className="font-medium text-gray-900">Upload Content</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg cursor-pointer">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 flex items-center justify-center">
                  <MessageOutlinedIcon className="text-white text-lg" /> {/* Material-UI Icon */}
                </div>
              </div>
              <span className="font-medium text-gray-900">Message Students</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg cursor-pointer">
              <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 flex items-center justify-center">
                  <BarChartOutlinedIcon className="text-white text-lg" /> {/* Material-UI Icon */}
                </div>
              </div>
              <span className="font-medium text-gray-900">View Analytics</span>
            </button>
          </div>
        </div>
      </div>

      {/* Course Performance */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-6 flex items-center space-x-2">
          <div className="w-5 h-5 flex items-center justify-center">
            <EmojiEventsOutlinedIcon className="text-blue-600 text-lg" /> {/* Material-UI Icon */}
          </div>
          <span>Top Performing Courses</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Course</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Students</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Revenue</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Rating</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {instructorData.coursesTaught?.slice(0, 5).map((course, index) => (
                <tr key={course._id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="font-medium text-gray-900">{course.title}</div>
                    <div className="text-sm text-gray-500">{course.category}</div>
                  </td>
                  <td className="py-4 px-4 font-medium text-gray-900">
                    {course.enrolledUsers?.length || 0}
                  </td>
                  <td className="py-4 px-4 font-medium text-gray-900">
                    ${course.payments?.reduce((sum, payment) => sum + payment.amount, 0) || 0}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-1">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <StarFilledIcon className="text-yellow-400 text-base" /> {/* Material-UI Icon */}
                      </div>
                      <span className="font-medium">4.{5 + index}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
