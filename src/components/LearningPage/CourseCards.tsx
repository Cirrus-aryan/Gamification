import { Link } from 'react-router-dom'

// Import MUI icons
import ScheduleIcon from '@mui/icons-material/Schedule'
import BarChartIcon from '@mui/icons-material/BarChart'
import GroupsIcon from '@mui/icons-material/Groups'
import LanguageIcon from '@mui/icons-material/Language'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import HeadphonesIcon from '@mui/icons-material/Headphones'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'

function CourseCards({ course, formatDuration, rating, startDate }: any) {
  return (
    <div key={course.CourseID} className="bg-white rounded-lg shadow-sm border hover:shadow-lg transition-shadow">
      {/* Course Image */}
      <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-lg relative overflow-hidden">
        <img
          src={`https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28%60$%7Bcourse.category%7D%20course%20learning%20education%20modern%20clean%20professional%20background%20$%7Bcourse.title%7D%60%29%7D&width=400&height=225&seq=${course.CourseID}&orientation=landscape`}
          alt={course.title}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-sm font-medium text-gray-900">
            {course.currency} {course.price}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-sm font-medium text-gray-900">{course.category}</span>
        </div>
      </div>

      <div className="p-6">
        {/* Title and Description */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>

        {/* Instructor */}
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={course?.Instructor?.userProfilePicture}
            alt={course?.Instructor?.userName}
            className="w-10 h-10 rounded-full border-2 border-gray-200"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">{course?.Instructor?.userName}</p>
            <p className="text-xs text-gray-500">{course?.Instructor?.userRole}</p>
          </div>
        </div>

        {/* Course Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center space-x-2">
            <ScheduleIcon className="text-gray-400" fontSize="small" />
            <span className="text-gray-600">{formatDuration(course.duration)}</span>
          </div>

          <div className="flex items-center space-x-2">
            <BarChartIcon className="text-gray-400" fontSize="small" />
            <span className="text-gray-600">{course.difficultyLevel}</span>
          </div>

          <div className="flex items-center space-x-2">
            <GroupsIcon className="text-gray-400" fontSize="small" />
            <span className="text-gray-600">{course.enrolledUsers.length.toLocaleString()} students</span>
          </div>

          <div className="flex items-center space-x-2">
            <LanguageIcon className="text-gray-400" fontSize="small" />
            <span className="text-gray-600">{course.language}</span>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <div key={star}>
                {star <= rating ? (
                  <StarIcon className="text-yellow-400" fontSize="small" />
                ) : (
                  <StarBorderIcon className="text-yellow-400" fontSize="small" />
                )}
              </div>
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {rating.toFixed(1)} ({course.reviews.length} reviews)
          </span>
        </div>

        {/* Course Content Preview */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Course Content</h4>
          <div className="space-y-1">
            {course.Serials.slice(0, 3).map((serial: any, index: any) => (
              <div key={index} className="flex items-center space-x-2 text-xs text-gray-600">
                <PlayArrowIcon className="text-blue-500" fontSize="small" />
                <span>{serial.topic.name}</span>
              </div>
            ))}
            {course.Serials.length > 3 && (
              <div className="text-xs text-gray-500 pl-5">
                +{course.Serials.length - 3} more modules
              </div>
            )}
          </div>
        </div>

        {/* Learning Materials */}
        <div className="flex items-center space-x-4 mb-4 text-xs text-gray-600">
          <div className="flex items-center space-x-1">
            <MenuBookIcon className="text-green-500" fontSize="small" />
            <span>Study Materials</span>
          </div>
          <div className="flex items-center space-x-1">
            <HeadphonesIcon className="text-orange-500" fontSize="small" />
            <span>Audio Books</span>
          </div>
          <div className="flex items-center space-x-1">
            <SportsEsportsIcon className="text-purple-500" fontSize="small" />
            <span>Interactive</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Link
            to={`/course/${course.CourseID}`}
            className="flex-1 bg-blue-600 text-white text-center py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            Enroll Now
          </Link>
          <Link
            to={`/course/${course.CourseID}/preview`}
            className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            Preview
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Starts: {startDate}</span>
            <span>Course ID: {course.CourseID}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseCards
