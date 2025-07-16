
// Define the shape of the context
export interface FinalItem {
  type: any;
  name:any;
  key: any;
  summary: any;
}
export interface FilterState {
  Formate: string;
  summary_Length_IF_Summary_formateis_Choosen: string;
  includeCitations: boolean;
  extractKeyPoints: boolean;
  useBulletPoints: boolean;
  processingIntensity: string;
  language:string;
}
export interface SavedData{
  
    key:string,
      link:string,
      name:string,
      summary?:any,
      analysis_result:any,
      type:string  
      language:string;
}
export interface DataContextType {
  final: FinalItem | null;
  setFinal: (val: any) => void;
  key: string;
  setKey: (val: string) => void;
  summary: string;
  setSummary: (val: string) => void;
  response: any[];
  setResponse: (val: any) => void;
  API_Result:string;
  setAPI_Result:(val:string)=>void;
  Tabs:[]|any[];
  setTabs:(val:any)=>void;
  filter:FilterState;
  setfilter:(val:any)=>void
  gameSettings:any;
  setGameSettings:  (val:any)=>void;
  GameContent:any;
  setGameContent:(val:any)=>void
  Analysis:any;
  setAnalysis:(val:any)=>void;
  finalFormate:any[], 
  courseInfo:any, setCourseInfo:(val:any)=>void,
    GameScore:any,setGameScore:(val:any)=>void,
  setFinalFormate: (val:any[]) => void;
  returnlink:string,setreturnlink:(val:string)=>void,
  musicplaylists:any[],setmusicplaylists:(val:any)=>void,
    musicplaylistslanguage:any,setmusicplaylistslanguage:(val:any)=>void

}