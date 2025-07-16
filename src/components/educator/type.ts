export interface TeacherInfo {
  _id: string;
  Email: string;
  name: string;
  ProfilePicture: string;
  Role: string;
  Email_Verified: boolean;
  created_at: number;
  Enrolled: Array<{
    [courseId: string]: {
      progress: number;
      ModelsGameScore: { [key: string]: any };
    };
  }>;
  EnrolledStudents: Array<{
    Student_id: string;
    tasks: any[];
  }>;
}



interface CourseContentSummary {
  name: string;
  link: string;
  type: string;
  language_used: string;
  analysis_result: any;
}

interface FilteredSummary {
  format: string;
  extractKeyPoints: boolean;
  includeCitations: boolean;
  language_used: string;
  processingIntensity: string;
}

interface OrganizedCourseContentItem {
  moduleKey: string;
  summaries: CourseContentSummary[];
  processedFiles?: FilteredSummary[];
  audioFiles?: AudioFile[];
}
 interface AudioFile {
  musicFiles: MusicFile[];
  language: string;
}

/**
 * Interface for a single music file.
 */
interface MusicFile {
  title: string;
  filename: string;
  s3_url: string;
  segment_key: string;
}

export interface CourseTaught {
  _id: string;
  title: string;
  description: string;
  prerequisites: string;
  price: number;
  learningOutcomes: string;
  language: string;
  duration: number;
  difficultyLevel: string;
  currency: string;
  category: string;
  reviews: any[];
  enrolledUsers: any[];
  Instructor: {
    userEmail: string;
    userName: string;
    userProfilePicture: string;
    userRole: string;
  };
  StartDate: number;
  organizedCourseContent: OrganizedCourseContentItem[];
  Serials:[],
  payments:Payment[]
}
export interface CourseSerial {
  topic: {
    name: string;
  };
  summaries: {
    lang: string;
    topic: string;
  }[];
  Filtered: FilteredOptions[]; // Array of applied filters
  audiobook: string[]; // Array of languages for audiobooks
}
export interface FilteredOptions {
  format: string;
  extractKeyPoints: boolean;
  includeCitations: boolean;
  language_used: string;
  processingIntensity: string;
}

interface Payment {
  _id: string;
  user_id: string;
  user_email: string;
  course_id: string;
  instructor_email: string;
  razorpay_payment_id: string;
  razorpay_order_id: string;
  amount: number;         // Added
  currency: string;       // Added
  payment_status: string; // Added
  paid_at: string;        // Added (Assuming string format like "2025-07-11T15:52:58.712000")
}

