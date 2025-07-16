export interface FormattedResultItem {
type: string;
text: string;
}
export interface SubSectionType {
  heading?: string;
  para?: string;
  Bulletpoints?: string[];
  subsections?: FormattedResponseItem[]; // subsections can be an array of FormattedResponseItem
}

export interface FormattedResponseItem {
  mainheading?: string;
  sections?: (SubSectionType & { subsections?: FormattedResponseItem[] })[]; // sections can contain subsections which are also FormattedResponseItem
  heading?: string;
  para?: string;
  Bulletpoints?: string[];
  subsections?: FormattedResponseItem[]; // For the recursive call, this could be an array of items
}
// Define the exact structure of your localStorage backup object
export interface CourseBackupData {
  courseInfo: CourseInfo;
  Analysis: AnalysisData;
  Tabs: TabItem[]; // Explicitly define Tabs as an array of TabItem
  musicplaylists?: any[]; // Add musicplaylists to the backup data structure
  lastSaved?: number;
}

export interface AnalysisData {
  // Example properties, adjust based on your actual Analysis structure
  summaries?: string[];
  profiles?: any[]; // 'any[]' as a placeholder
}

export interface CourseInfo {
  title: string;
  description: string;
  prerequisites: string;
  learningOutcomes: string;
  pricingType: "paid" | "free";
  price: number | "";
  currency: string;
  language: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced" | "";
  duration: number | "";
}

export interface TabItem {
reference: {
    name: string;
    analysis_result: {
      sections: FormattedResponseItem[]
    };
}
id?: string;
Formate: string;
summary_Length_IF_Summary_formateis_Choosen: string;
includeCitations: boolean;
language: string;
extractKeyPoints: boolean;  
useBulletPoints: boolean;
processingIntensity: string;
data: any;
}
// src/types.ts

export type OptionKey = "A" | "B" | "C" | "D";

export interface MCQQuestion {
  question: string;
  correct_answer: OptionKey;
  options: Record<OptionKey, string>;
}

export interface FormattedResultItem {
  summary?: string;
  notes?: string;
  qa?: Array<{ question: string; answer: string }>; // Example structure
  mcqs?: MCQQuestion[];
  paper?: any; // Define a more specific type for your question paper data
}

export type ResultFormat = "summary" | "notes" | "qa" | "MCQs" | "paper" | null;

export interface APIResult {
  formate: ResultFormat;
  formatted_result: FormattedResultItem;
  // Add other properties if your API result has them (e.g., status, message)
}

// For your context state
export type TabKey = "main" | "games" | "aiTranscoder" | "dashboard"; // Example tab keys

export interface AppState {
  currentTab: TabKey;
  filter: any; // Define a more specific type for your filter
  processing: boolean; // Indicates if an AI process is running
  result: APIResult | null; // The main result object
  error: string | null; // For handling API or processing errors
}

export type AppAction =
  | { type: "SET_CURRENT_TAB"; payload: TabKey }
  | { type: "SET_FILTER"; payload: any }
  | { type: "SET_PROCESSING"; payload: boolean }
  | { type: "SET_RESULT"; payload: APIResult }
  | { type: "CLEAR_RESULT" }
  | { type: "SET_ERROR"; payload: string | null };