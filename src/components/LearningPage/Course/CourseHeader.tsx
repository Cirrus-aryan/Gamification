import type { Course } from "./learning.d";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import StarIcon from "@mui/icons-material/Star";

export default function CourseHeader({ course }: { course: Course }) {
  // If course is not provided or is null/undefined, render a loading state or nothing
  if (!course) {
    // You can return null, a loading spinner, or a placeholder
    return <div>Loading course details...</div>;
  }

  // Now that 'course' is guaranteed to exist, we can safely access its top-level properties.
  // For nested properties that might still be undefined, use optional chaining and nullish coalescing.
  const instructorUserName = course.Instructor?.userName || "N/A";
  const enrolledStudentsCount = course.enrolledUsers?.length ?? 0;
  const reviewsCount = course.reviews?.length ?? 0;
  const courseDurationInHours = course.duration ? course.duration / 60 : 0; // Assuming duration is in minutes

  // --- Logic to find the specific user's progress for this course ---
  let userCourseProgress = 0;
  const enrolledCoursesForUser = course.userData?.Enrolled || [];
  const currentCourseId = course.CourseID; // The ID of the course currently being displayed

  // Iterate through the user's enrolled courses to find the matching one
  for (const enrolledEntry of enrolledCoursesForUser) {
    // Each entry is an object where the key is the course ID
    if (enrolledEntry && typeof enrolledEntry === 'object' && currentCourseId in enrolledEntry) {
      const courseDetails = enrolledEntry[currentCourseId];
      if (courseDetails && typeof courseDetails === 'object' && 'progress' in courseDetails) {
        userCourseProgress = courseDetails.progress;
        break; // Found the progress for the current course, exit loop
      }
    }
  }
  // --- End of progress logic ---

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {course.title}
            </h1>
            <p className="text-gray-600 mb-4">{course.description}</p>

            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-5 h-5 flex items-center justify-center mr-2">
                  <PersonOutlineIcon sx={{ color: "text.secondary" }} />
                </div>
                <span>{instructorUserName}</span>
              </div>

              <div className="flex items-center">
                <div className="w-5 h-5 flex items-center justify-center mr-2">
                  <AccessTimeOutlinedIcon sx={{ color: "text.secondary" }} />
                </div>
                <span>{courseDurationInHours} hours</span>
              </div>

              <div className="flex items-center">
                <div className="w-5 h-5 flex items-center justify-center mr-2">
                  <GroupOutlinedIcon sx={{ color: "text.secondary" }} />
                </div>
                <span>{enrolledStudentsCount.toLocaleString()} students</span>
              </div>

              <div className="flex items-center">
                <div className="w-5 h-5 flex items-center justify-center mr-2">
                  <StarIcon sx={{ color: "text.yellow-400" }} />
                </div>
                <span>{reviewsCount} reviews</span>
              </div>
            </div>
          </div>

          <div className="ml-8">
            <div className="text-right mb-2">
              <span className="text-sm text-gray-500">Progress</span>
            </div>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${userCourseProgress}%` }} // Using userCourseProgress
              ></div>
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {userCourseProgress}% complete {/* Using userCourseProgress */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
