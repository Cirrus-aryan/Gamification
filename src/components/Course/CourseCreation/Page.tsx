import { useState, useEffect, useContext, useCallback } from "react";
import { DataContext as Authcontext } from "@/Context/Auth";
import { useNavigate } from "react-router-dom"; // Link is not used, can be removed if not needed
import { DataContext } from "@/Context/Context";
import InputBox from "@/components/InputBox";
import ProcessingPage from "@/components/Course/CourseCreation/Summary/ProcessingPage";
import ResultPanel from "@/components/Course/CourseCreation/ResultPanelSummary";
import ProcessingPanel from "@/components/ProcessingPanel";
import TabList from "@/components/Course/CourseCreation/TabList";
import Gamepage from "./Games/Page";
import ResultPanelotes from "./ResultNotes";
import ResultQA from "./ResultQA";
import QuizQuestion from "./Resultmcqs";
import ResultQuestionPaper from "./ResultQuestionPaper";
import AudioBook from "./Audio/AudioBook";
import LinearProgress, { type LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MuiButton from "@mui/material/Button";
import axios from "axios";
import { toast } from 'react-hot-toast'; // Import react-hot-toast for better notifications

// --- Type Definitions ---
interface CourseInfo {
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

interface AnalysisItem {
  id?: string;
  content?: string;
  type?: string;
  key?: string; // Added key for module grouping
  name?: string; // Added name for clarity
  summary?: string; // Added summary for clarity
  language?: string; // Added language for clarity
  analysis_result?: any; // Added analysis_result for clarity
  [key: string]: any;
}

interface TabItem {
  id: string;
  name: string;
  fileUrl?: string;
  content?: any;
  Formate?: string; // Renamed from Formate to format for consistency
  extractKeyPoints?: boolean;
  includeCitations?: boolean;
  language?: string;
  processingIntensity?: string;
  data?: any;
  reference?: { key: string }; // Added reference with key for module grouping
  [key: string]: any;
}

interface MusicPlaylistItem {
  data: { key: string }; // Added data with key for module grouping
  musicfiles: any[];
  language: string;
  [key: string]: any;
}

interface CourseBackupData {
  courseInfo: CourseInfo;
  Analysis: AnalysisItem[];
  Tabs: TabItem[];
  musicplaylists?: MusicPlaylistItem[];
  lastSaved?: number;
}

// Linear Progress Component (moved outside to keep Page component cleaner)
function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary' }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

function Page() {
  const {
    Tabs,
    setTabs,
    courseInfo,
    setCourseInfo,
    Analysis,
    setAnalysis,
    setGameSettings,
    filter,
    setfilter,
    setFinalFormate,
    setreturnlink,
    musicplaylists,
    setmusicplaylists,
  } = useContext(DataContext); // Removed unused musicplaylistslanguage

  const [userDetails, setUserDetails] = useState<any>(null); // Initialize with null for clarity
  const { data: authData } = useContext(Authcontext); // Renamed data to authData to avoid conflict

  // Set UserDetails inside useEffect to prevent infinite re-renders and ensure it updates
  useEffect(() => {
    setUserDetails(authData);
  }, [authData]); // Depend on 'authData' so it updates if the auth context data changes

  const [result, setResult] = useState<any>(null); // Initialize with null
  const [isLoading, setIsLoading] = useState(false); // Renamed loading to isLoading for clarity
  const [progress, setProgress] = useState(0);
  const LOCAL_STORAGE_KEY = "courseCreationBackup";
  const navigate = useNavigate();

  // Function to save course data to localStorage
  const saveCourseData = useCallback(() => {
    const hasMeaningfulCourseInfo =
      courseInfo &&
      courseInfo.title?.trim() !== "" && // Use optional chaining for safer access
      courseInfo.description?.trim() !== "";

    const hasAnalysisData = Analysis && Analysis.length > 0;
    const hasTabsData = Tabs && Tabs.length > 0;
    const hasMusicPlaylistsData = musicplaylists && musicplaylists.length > 0;

    if (
      hasMeaningfulCourseInfo ||
      hasAnalysisData ||
      hasTabsData ||
      hasMusicPlaylistsData
    ) {
      const dataToSave: CourseBackupData = {
        courseInfo,
        Analysis: Analysis,
        Tabs: Tabs,
        musicplaylists: musicplaylists,
        lastSaved: Date.now(),
      };
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));
        // Update finalFormate if it's meant to hold the current state for submission/export
        // This transformation logic might be better placed just before submission if finalFormate is only for backend
        setFinalFormate([
          {
            ...courseInfo,
            SummarysPerfiles: Analysis,
            ProcessedFiles: Tabs,
            musicplaylists: musicplaylists,
          },
        ]);
        console.log("Course data backed up to localStorage successfully.");
      } catch (error) {
        console.error("Error saving course data to localStorage:", error);
        toast.error("Failed to save course progress.");
      }
    } else {
      console.log(
        "Skipping backup: Not enough meaningful data to save yet (e.g., empty course info, analysis, tabs, or music playlists)."
      );
    }
  }, [
    courseInfo,
    Analysis,
    Tabs,
    musicplaylists,
    setFinalFormate,
  ]);

  // Auto-save effect
  useEffect(() => {
    const handler = setTimeout(() => {
      saveCourseData();
    }, 1000); // Save every 1 second after last change

    return () => {
      clearTimeout(handler);
    };
  }, [saveCourseData]); // Dependency array should be saveCourseData, not empty

  // Load data from localStorage on component mount
  useEffect(() => {
    const backup = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (backup) {
      try {
        const parsedBackup: CourseBackupData = JSON.parse(backup);

        // Validate and set courseInfo
        if (parsedBackup.courseInfo && typeof parsedBackup.courseInfo === "object") {
          setCourseInfo(parsedBackup.courseInfo);
        } else {
          console.warn("Invalid 'courseInfo' found in backup, using default state.");
        }

        // Validate and set Analysis
        if (Array.isArray(parsedBackup.Analysis)) {
          setAnalysis(parsedBackup.Analysis);
        } else {
          console.warn("Invalid 'Analysis' data found in backup, defaulting to empty array.");
          setAnalysis([]);
        }

        // Validate and set Tabs
        if (Array.isArray(parsedBackup.Tabs)) {
          setTabs(parsedBackup.Tabs);
        } else {
          console.warn("Invalid 'Tabs' data found in backup, defaulting to empty array.");
          setTabs([]);
        }

        // Restore musicplaylists
        if (Array.isArray(parsedBackup.musicplaylists)) {
          setmusicplaylists(parsedBackup.musicplaylists);
        } else {
          console.warn("Invalid 'musicplaylists' data found in backup, defaulting to empty array.");
          setmusicplaylists([]);
        }

        console.log(
          `Course data restored from localStorage (last saved: ${new Date(
            parsedBackup.lastSaved || 0
          ).toLocaleString()}).`
        );
        toast.success("Course progress loaded from backup!");
      } catch (e) {
        console.error(
          "Failed to parse or restore course creation backup from localStorage:",
          e
        );
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        console.log("Corrupted backup cleared from localStorage to prevent further issues.");
        toast.error("Failed to load saved progress. Backup corrupted.");
      }
    } else {
      console.log("No previous course data backup found in localStorage.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array means this runs once on mount

  // Renders the appropriate result panel based on the 'result' state
  const renderResult = useCallback(() => { // Memoize this function
    switch (result?.formate) {
      case "summary":
        return (
          <ResultPanel
            result={
              result?.formatted_result?.summary || result?.formatted_result
            }
          />
        );
      case "notes":
        return <ResultPanelotes result={result?.formatted_result?.notes} />;
      case "qa":
        return <ResultQA result={result?.formatted_result?.qa} />;
      case "MCQs":
        return <QuizQuestion mcqData={result?.formatted_result?.mcqs} />;
      case "paper":
        return <ResultQuestionPaper data={result?.formatted_result} />;
      default:
        return (
          <div className="flex items-center justify-center h-full text-gray-500 text-base sm:text-lg">
            Select a processing option to see results.
          </div>
        );
    }
  }, [result]); // Depend on result

  const startProgressAnimation = () => {
    setProgress(10); // Start progress at 10%
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 90) { // Cap at 90% during processing
          return 90;
        }
        return prevProgress + 5; // Smoother increment
      });
    }, 300); // Slower interval for realistic demo
    return timer;
  };

  const finalSubmission = async () => {
    if (!userDetails || !userDetails.userEmail) { // Basic check for user details
      toast.error("User not authenticated. Please log in.");
      navigate("/login"); // Redirect to login
      return;
    }

    setIsLoading(true); // Indicate loading
    const timerId = startProgressAnimation(); // Start the progress animation

    try {
      // Ensure finalFormate is up-to-date before submission
      // This transformation could be done directly in finalSubmission if finalFormate is solely for backend
      const currentFinalFormate = [{
        ...courseInfo,
        SummarysPerfiles: Analysis,
        ProcessedFiles: Tabs,
        musicplaylists: musicplaylists,
      }];

      if (!currentFinalFormate || currentFinalFormate.length === 0) {
        toast.error("No course data to publish.");
        clearInterval(timerId);
        setProgress(100);
        setIsLoading(false);
        return;
      }

      const submissionDataForBackend = currentFinalFormate.map((data) => {
        const courseDetails = {
          title: data.title,
          description: data.description,
          prerequisites: data.prerequisites,
          price: data.pricingType === "paid" ? parseFloat(data.price as string || "0") : 0, // Ensure price is a number
          learningOutcomes: data.learningOutcomes,
          language: data.language,
          duration: data.duration,
          difficultyLevel: data.difficulty,
          currency: data.currency,
          category: data.category,
          reviews: [],
          enrolledUsers: [],
          InstructorID:localStorage.getItem("userId"), // Ensure userDetails has relevant instructor info
          StartDate: Date.now(), // Correct way to call Date.now()
        };

        const organizedCourseContent: any[] = [];
        const contentByModuleKey = new Map<string, any>(); // Temporary map to group content by module key

        const getOrCreateModuleContent = (map: Map<string, any>, key: string) => {
          if (!map.has(key)) {
            map.set(key, {
              moduleKey: key,
              summaries: [],
              processedFiles: [],
              audioFiles: [],
            });
          }
          return map.get(key);
        };

        data.SummarysPerfiles?.forEach((val:any) => { // Use optional chaining
          if (val.key) { // Ensure key exists
            const moduleContent = getOrCreateModuleContent(contentByModuleKey, val.key);
            moduleContent.summaries.push({
              name: val.name,
              link: val.type === "Text" ? JSON.stringify({ Topic: val.name, data: val.summary }) : val.link,
              type: val.type,
              language_used: val.language,
              analysis_result: val.analysis_result,
            });
          }
        });

        data.ProcessedFiles?.forEach((val:any) => { // Use optional chaining
          if (val.reference?.key) { // Ensure reference and key exist
            const moduleContent = getOrCreateModuleContent(contentByModuleKey, val.reference.key);
            moduleContent.processedFiles.push({
              filtersApplied: {
                format: val.Formate, // Corrected from Formate to format for consistency if backend expects it
                extractKeyPoints: val.extractKeyPoints,
                includeCitations: val.includeCitations,
                language_used: val.language,
                processingIntensity: val.processingIntensity,
              },
              result: JSON.stringify(val.data),
            });
          }
        });

        data.musicplaylists?.forEach((val:any) => { // Use optional chaining
          if (val.data?.key) { // Ensure data and key exist
            const moduleContent = getOrCreateModuleContent(contentByModuleKey, val.data.key);
            moduleContent.audioFiles.push({
              musicFiles: val.musicfiles,
              language: val.language
            });
          }
        });

        contentByModuleKey.forEach(module => {
          organizedCourseContent.push(module);
        });

        // The 'Serials' transformation seems to be a summary of the organized content
        // This needs to be carefully constructed based on what the backend expects.
        // The original code was iterating over organizedCourseContent.map((data)=>{data.map((val)=>{...})})
        // which seems incorrect as `data` is a single module, not an array of modules.
        // Assuming 'Serials' is a flattened list of topics and their applied filters/audiobooks
        const serials: any[] = organizedCourseContent.map(module => {
            const summariesInfo = module.summaries.map((summary: any) => ({
                lang: summary.language_used,
                topic: summary.analysis_result?.mainheading, // Use optional chaining
            }));
            const filteredInfo = module.processedFiles.map((file: any) => file.filtersApplied);
            const audiobookInfo = module.audioFiles.map((audio: any) => audio.language);

            // Assuming topic name comes from the first summary's name in the module
            const topicName = module.summaries[0]?.name || "Untitled Topic";

            return {
                topic: { name: topicName },
                summaries: summariesInfo,
                Filtered: filteredInfo,
                audiobook: audiobookInfo,
            };
        });


        return {
          ...courseDetails,
          organizedCourseContent: organizedCourseContent,
          Serials: serials // Send the correctly formed serials
        };
      });

      console.log("Final submission data for Backend:", submissionDataForBackend);

      if (submissionDataForBackend.length > 0) {
        const formData = new FormData();
        formData.append("Data", JSON.stringify(submissionDataForBackend[0])); // Assuming only one course object is submitted at a time

        const response = await axios.post(`${import.meta.env.VITE_BACKEND_PORT}/Publish`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Important for FormData
            }
        });
        console.log("Publish API response:", response.data);
        toast.success("Course published successfully!");
        localStorage.removeItem(LOCAL_STORAGE_KEY); // Clear backup after successful publish
        navigate('/course-published-success'); // Navigate to a success page
      } else {
        toast.error("No valid data to submit for publication.");
      }
    } catch (error) {
      console.error("Error during final submission:", error);
      if (axios.isAxiosError(error)) {
        toast.error(`Publication failed: ${error.response?.data?.message || error.message}`);
      } else {
        toast.error("An unexpected error occurred during publication.");
      }
    } finally {
      clearInterval(timerId); // Ensure timer is cleared
      setProgress(100); // Set progress to 100% on completion or error
      setIsLoading(false); // Stop loading
    }
  };
  useEffect(()=>setreturnlink("/Course_Completion"),[])
  return (
    <div className="min-h-screen flex flex-col p-4 sm:p-6 lg:p-8 bg-gray-50 ">
      <div className="flex flex-wrap lg:flex-nowrap gap-4 mb-6">
        <div className="h-full">
          <InputBox  />
        </div>
        <div className="w-full  h-full">
          <ProcessingPage language={courseInfo.language}/>
        </div>
      </div>
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 overflow-hidden">
        <div className="h-screen overflow-y-auto border border-gray-200 rounded-lg p-4 shadow-sm bg-white">
          <ProcessingPanel
            setfilter={setfilter}
            filter={filter}
            setresult={setResult} // Use setResult
            loading={isLoading} // Use isLoading
            setloading={setIsLoading} // Use setIsLoading
          />
        </div>
        <div className="h-screen overflow-y-auto border border-gray-200 rounded-lg p-4 shadow-sm bg-white">
          {renderResult()}
        </div>
      </div>
      <div className="mb-6">
        <TabList tabs={Tabs} setTabs={setTabs} />
      </div>
      <div className="mb-6">
        <Gamepage Analysis={Analysis} setGameSettings={setGameSettings}/>
      </div>
      <div className="mb-6">
        <AudioBook />
      </div>
      <Box sx={{ width: '100%', mt: 2 }}>
        <LinearProgressWithLabel value={progress} />
      </Box>
      <MuiButton
        variant="contained"
        color="primary"
        onClick={finalSubmission}
        disabled={isLoading} // Use isLoading
        sx={{ mt: 2, py: 1.5, fontSize: '1rem', borderRadius: '8px' }}
      >
        {isLoading ? 'Publishing...' : 'Publish Course'}
      </MuiButton>
    </div>
  );
}

export default Page;