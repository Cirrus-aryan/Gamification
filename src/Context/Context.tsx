import { createContext,  useState, type ReactNode } from "react";
import type { DataContextType,FilterState,FinalItem,SavedData} from "./types"

// Default/initial context value (functions are no-ops)
const DataContext = createContext<DataContextType>({
  final: null,
  setFinal: () => {},
  key: "",
  setKey: () => {},
  summary: "",
  setSummary: () => {},
  response: [],
  setResponse: () => {},
  API_Result:"",
  setAPI_Result:()=>{},
  Tabs:[],
  setTabs:()=>{},
  filter:{
    Formate: "summary",
    summary_Length_IF_Summary_formateis_Choosen: "large",
    includeCitations: false,
    extractKeyPoints: true,
    useBulletPoints: true,
    processingIntensity: "balanced",
    language:"english"
  },
  setfilter:()=>{},
  gameSettings:{},
  setGameSettings:()=>{},
  GameContent:{},
  setGameContent:()=>{},
  Analysis:{},
  courseInfo:{}, setCourseInfo:()=>{},
  returnlink:"",setreturnlink:()=>{},
  musicplaylists:[],setmusicplaylists:()=>{},
  GameScore:{},setGameScore:()=>{},
  musicplaylistslanguage:"",setmusicplaylistslanguage:()=>{},
  setAnalysis:()=>{},finalFormate:[], setFinalFormate: () => {},
});

// Global Context Provider
function GlobalContext({ children }: { children: ReactNode }) {
  const [Analysis,setAnalysis]=useState<SavedData[]>([])
  const [final, setFinal] = useState<FinalItem | null>(null); // ✅ corrected here
  const [key, setKey] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [response, setResponse] = useState<any[]>([]);
  const [API_Result,setAPI_Result]=useState<string>("");
  const [Tabs,setTabs]=useState<any[]|[]>([]);
  const [GameContent,setGameContent]=useState<any>();
  const [gameSettings,setGameSettings]=useState<any>();
  const [musicplaylistslanguage,setmusicplaylistslanguage]=useState<any>();
  const [GameScore,setGameScore]=useState<{
    Quize:{
      score:Number,
      totalQuestions:Number,
      timeTaken:Number
    };
  }>()
  const [musicplaylists,setmusicplaylists]=useState<any[]>([]);
  const [returnlink,setreturnlink]=useState<string>("")  
  const [filter, setfilter] = useState<FilterState>({
    Formate: "summary",
    summary_Length_IF_Summary_formateis_Choosen: "large",
    includeCitations: false,
    extractKeyPoints: true,
    useBulletPoints: true,
    processingIntensity: "balanced",
    language:"english"
  });
  const [courseInfo, setCourseInfo] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "beginner",
    duration: 0,
    prerequisites: "",
    learningOutcomes: "",
    pricingType: "paid",
    price: "",
    currency: "USD",
    language: "en",
  });
  const [finalFormate, setFinalFormate] = useState<any[]>([]);
  // useEffect(()=>{console.log(Tabs.map((d)=>d.res.data.formatted_result.split("QUESTION")))})
  return (
    <DataContext.Provider
      value={{GameScore,setGameScore,returnlink,setreturnlink,courseInfo,musicplaylists,setmusicplaylists,musicplaylistslanguage,setmusicplaylistslanguage, setCourseInfo,Analysis,setAnalysis,finalFormate, setFinalFormate,GameContent,setGameContent, final, setFinal, key, setKey, summary, setSummary, response, setResponse ,API_Result,setAPI_Result,Tabs,setTabs,filter, setfilter,gameSettings,setGameSettings}}
    >
      {children}
    </DataContext.Provider>
  );
}

export { GlobalContext, DataContext };
