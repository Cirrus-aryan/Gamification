/**
 * Interface for the overall Course data structure.
 */
export interface Course {
  title: string;
  description: string;
  prerequisites: string;
  price: number;
  learningOutcomes: string;
  language: string;
  duration: number; // Duration in minutes
  difficultyLevel: string;
  currency: string;
  category: string;
  reviews: CourseReview[];
  enrolledUsers: string[]; // Array of user IDs (strings)
  StartDate: number; // Timestamp
  organizedCourseContent: OrganizedCourseContent[];
  Serials: CourseSerial[];
  CourseID: string;
  Instructor: InstructorInfo;
  userData: UserData;
}

/**
 * Interface for a single course review.
 */
export interface CourseReview {
  rating: number;
  comment: string;
  // Add other review properties if they exist, e.g., userId, reviewDate
}

/**
 * Interface for the Instructor information.
 */
export interface InstructorInfo {
  userEmail: string;
  userName: string;
  userProfilePicture: string;
  userRole: string;
}

/**
 * Interface for the user's data.
 */
export interface UserData {
  _id: string;
  Email: string;
  name: string;
  ProfilePicture: string;
  Role: string;
  Email_Verified: boolean;
  created_at: number; // Timestamp
  Enrolled: UserEnrolledCourse[]; // Array of enrolled course objects for the user
  EnrolledStudents: EnrolledStudent[];
}

/**
 * Interface for an entry in the UserData.Enrolled array.
 * The key is the CourseID, and the value is an object containing progress and game scores.
 */
export interface UserEnrolledCourse {
  [courseId: string]: {
    progress: number;
    ModelsGameScore: Record<string, any>; // Flexible for different game scores
  };
}

/**
 * Interface for an enrolled student entry in UserData.EnrolledStudents.
 */
export interface EnrolledStudent {
  Student_id: string;
  tasks: any[]; // Define a more specific interface if task structure is known
}

/**
 * Interface for a module within organizedCourseContent.
 */
export interface OrganizedCourseContent {
  moduleKey: string;
  summaries: CourseSummary[];
  processedFiles: ProcessedFile[];
  audioFiles: AudioFile[];
}

/**
 * Interface for a course summary.
 */
export interface CourseSummary {
  name: string;
  link: string;
  type: string;
  language_used: string;
  analysis_result: AnalysisResult;
}

/**
 * Interface for the analysis result of a summary.
 */
export interface AnalysisResult {
  mainheading: string;
  sections: AnalysisSection[];
}

/**
 * Interface for a section within analysis_result.
 */
export interface AnalysisSection {
  heading: string;
  para: string;
  Bulletpoints: string[];
  subsections: AnalysisSubSection[];
}

/**
 * Interface for a subsection within an analysis section.
 */
export interface AnalysisSubSection {
  heading: string;
  para: string;
  Bulletpoints: string[];
  subsections: AnalysisSubSection[]; // Recursive for nested subsections
}

/**
 * Interface for a processed file.
 */
export interface ProcessedFile {
  filtersApplied: {
    format: string;
    extractKeyPoints: boolean;
    includeCitations: boolean;
    language_used: string;
    processingIntensity: string;
  };
  result: string; // This 'result' is a stringified JSON, consider parsing if always JSON
}

/**
 * Interface for an audio file entry.
 */
export interface AudioFile {
  musicFiles: MusicFile[];
  language: string;
}

/**
 * Interface for a single music file.
 */
export interface MusicFile {
  title: string;
  filename: string;
  s3_url: string;
  segment_key: string;
}

/**
 * Interface for a Course Serial entry.
 */
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

/**
 * Interface for Filtered options within CourseSerial.
 */
export interface FilteredOptions {
  format: string;
  extractKeyPoints: boolean;
  includeCitations: boolean;
  language_used: string;
  processingIntensity: string;
}

// Note: The 'result' field in ProcessedFile is currently a string.
// If its content is always a specific JSON structure (like the summary, notes, qa, mcqs, paper results),
// you might want to define interfaces for those specific results and use a union type or
// conditional types based on 'format' to parse it properly.
// For example:
// type ProcessedFileResult = SummaryResult | NotesResult | QaResult | McqsResult | PaperResult;
// result: string | ProcessedFileResult;
// And then parse the string content into the appropriate JSON object.
