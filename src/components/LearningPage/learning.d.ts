// types/learning.d.ts
export type Review = {
  rating: number;
  // Add other review properties if they exist, e.g., comment, userId
};

export type Serial = {
  topic: {
    name: string;
  };
  summaries: {
    lang: string;
    topic: string;
  }[];
  Filtered: {
    format: string;
    language_used: string;
  }[];
  audiobook: string[];
};

export type Instructor = {
  userName: string;
  userProfilePicture: string;
  userRole: string;
  userEmail: string;
};

export type Course = {
  CourseID: string;
  title: string;
  description: string;
  category: string;
  reviews: Review[];
  enrolledUsers: string[]; // Assuming an array of user IDs
  duration: number; // in minutes
  difficultyLevel: string;
  currency: string;
  price: number;
  StartDate: number; // ISO date string
  learningOutcomes: string; // comma-separated string
  prerequisites: string;
  language: string;
  Serials: Serial[];
  Instructor: Instructor;
};