// src/types.ts

// --- Core Data Structures ---

export type OptionKey = "A" | "B" | "C" | "D";

export interface MCQQuestion {
  question: string;
  correct_answer: OptionKey;
  options: Record<OptionKey, string>;
}

export interface QaPair {
  question: string;
  answer: string;
}

export interface FormattedResultItem {
  summary?: string;
  notes?: string;
  qa?: QaPair[];
  mcqs?: MCQQuestion[];
  paper?: any; // Define a more specific type if you know its structure for question paper
  // Add other properties if your formatted result has them
}

export type ResultFormat = "summary" | "notes" | "qa" | "MCQs" | "paper" | null;

export interface APIResult {
  formate: ResultFormat;
  formatted_result: FormattedResultItem;
  // Add other properties if your API result has them (e.g., status, message, raw_text)
  timestamp?: number; // Added for potential tracking/display
}

export interface FinalItem {
  type: string; // e.g., "document", "url", "text"
  name: string; // e.g., file name, URL title
  key: string; // Unique identifier for the item
  summary: string; // Initial short summary or description
}

export interface FilterState {
  Formate: ResultFormat; // Use ResultFormat directly for consistency
  summary_Length_IF_Summary_formateis_Choosen: "small" | "medium" | "large";
  includeCitations: boolean;
  extractKeyPoints: boolean;
  useBulletPoints: boolean;
  processingIntensity: "low" | "balanced" | "high";
  language: string; // e.g., "english", "spanish" - consider a union type if known options
}

export interface SavedData {
  key: string; // Unique ID for the saved item
  link: string; // Original source link/path
  name: string; // Display name
  summary: any; // Short summary, refine type if possible
  analysis_result: APIResult | null; // The full AI analysis result
  type: string; // e.g., "video", "pdf", "text"
  language: string;
  timestamp: number; // When it was saved
}

// --- Application State for Reducer (Global State) ---

export type AppTab = "dashboard" | "games" | "aiTranscoder" | string; // Use string if tabs are dynamic beyond these

export interface AppState {
  final: FinalItem | null; // Represents the initial input item (e.g., uploaded file details)
  currentKey: string; // A key related to the current item being processed/displayed
  currentSummary: string; // A temporary summary (e.g., from an initial quick analysis)
  apiResponses: any[]; // A general array for raw API responses if you need to store them
  apiResult: APIResult | null; // The structured, processed result from the AI
  activeTabs: AppTab[]; // Array of currently open/available tabs
  currentTab: AppTab; // The currently active tab for display
  currentFilter: FilterState; // Current filter settings for AI processing
  gameSettings: any; // Game-related settings, refine type
  gameContent: any; // Game-related content (e.g., quiz questions for a game), refine type
  analysisHistory: SavedData[]; // History of saved AI analyses
  isProcessing: boolean; // Flag to indicate if an AI process is ongoing
  error: string | null; // Global error message
}

// --- Actions for Reducer ---

export type AppAction =
  | { type: "SET_FINAL"; payload: FinalItem | null }
  | { type: "SET_CURRENT_KEY"; payload: string }
  | { type: "SET_CURRENT_SUMMARY"; payload: string }
  | { type: "ADD_API_RESPONSE"; payload: any }
  | { type: "SET_API_RESULT"; payload: APIResult | null }
  | { type: "SET_ACTIVE_TABS"; payload: AppTab[] }
  | { type: "SET_CURRENT_TAB"; payload: AppTab }
  | { type: "SET_FILTER"; payload: FilterState }
  | { type: "SET_GAME_SETTINGS"; payload: any }
  | { type: "SET_GAME_CONTENT"; payload: any }
  | { type: "ADD_ANALYSIS_TO_HISTORY"; payload: SavedData }
  | { type: "SET_ANALYSIS_HISTORY"; payload: SavedData[] }
  | { type: "SET_PROCESSING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "RESET_STATE" }; // For clearing everything
export interface QuizQuestion {
  question: string;
  options: string[];
  correct_answer: string;
  explanation?: string;
}

export interface QuizGameContent {
  game_type: string;
  difficulty: string;
  num_questions: number;
  topic_focus: string;
  questions: QuizQuestion[];
}

export interface GameSettings {
  selectedDifficulty: string;
  numberOfQuestions: string;
  timeLimitPerQuestion: string;
  selectedTopicFocus: string;
  originalAPIResult: string;
  gameType: string;
  availableTopics: string[];
  gameLevelDescription: string;
}
