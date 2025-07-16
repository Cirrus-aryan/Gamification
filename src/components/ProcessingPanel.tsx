import { useContext, useEffect, useState, type JSX } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs,TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area"; // Make sure this is imported
import DescriptionIcon from "@mui/icons-material/Description";
import NoteIcon from "@mui/icons-material/Note";
import HelpIcon from "@mui/icons-material/Help";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import EditNoteIcon from "@mui/icons-material/EditNote";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ArticleIcon from "@mui/icons-material/Article";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LightModeIcon from "@mui/icons-material/LightMode";
import BalanceIcon from "@mui/icons-material/Balance";
import PsychologyIcon from "@mui/icons-material/Psychology";
import axios from "axios";
import { DataContext } from "@/Context/Context";

// Define a more comprehensive list of languages outside the component
// This list is extensive but still a selection, not truly 'all' ~7000 languages
export const allLanguages = [
  { value: "english", label: "English" },
  { value: "hindi", label: "Hindi" },
  { value: "spanish", label: "Spanish" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "japanese", label: "Japanese" },
  { value: "malayalam", label: "Malayalam" },
  { value: "tamil", label: "Tamil" },
  { value: "mandarin", label: "Mandarin Chinese" },
  { value: "arabic", label: "Arabic" },
  { value: "bengali", label: "Bengali" },
  { value: "portuguese", label: "Portuguese" },
  { value: "russian", label: "Russian" },
  { value: "urdu", label: "Urdu" },
  { value: "indonesian", label: "Indonesian" },
  { value: "korean", label: "Korean" },
  { value: "turkish", label: "Turkish" },
  { value: "vietnamese", label: "Vietnamese" },
  { value: "italian", label: "Italian" },
  { value: "marathi", label: "Marathi" },
  { value: "telugu", label: "Telugu" },
  { value: "cantonese", label: "Cantonese" },
  { value: "thai", label: "Thai" },
  { value: "polish", label: "Polish" },
  { value: "ukrainian", label: "Ukrainian" },
  { value: "gujarati", label: "Gujarati" },
  { value: "kannada", label: "Kannada" },
  { value: "swahili", label: "Swahili" },
  { value: "amharic", label: "Amharic" },
  { value: "hausa", label: "Hausa" },
  { value: "yoruba", label: "Yoruba" },
  { value: "igbo", label: "Igbo" },
  { value: "zulu", label: "Zulu" },
  { value: "afrikaans", label: "Afrikaans" },
  { value: "dutch", label: "Dutch" },
  { value: "swedish", label: "Swedish" },
  { value: "danish", label: "Danish" },
  { value: "norwegian", label: "Norwegian" },
  { value: "finnish", label: "Finnish" },
  { value: "greek", label: "Greek" },
  { value: "romanian", label: "Romanian" },
  { value: "czech", label: "Czech" },
  { value: "slovak", label: "Slovak" },
  { value: "hungarian", label: "Hungarian" },
  { value: "serbian", label: "Serbian" },
  { value: "croatian", label: "Croatian" },
  { value: "bulgarian", label: "Bulgarian" },
  { value: "albanian", label: "Albanian" },
  { value: "lithuanian", label: "Lithuanian" },
  { value: "latvian", label: "Latvian" },
  { value: "estonian", label: "Estonian" },
  { value: "irish", label: "Irish" },
  { value: "welsh", label: "Welsh" },
  { value: "quechua", label: "Quechua" },
  { value: "guarani", label: "Guaraní" },
  { value: "nahuatl", label: "Nahuatl" },
  { value: "aymara", label: "Aymara" },
  { value: "cree", label: "Cree" },
  { value: "inuktitut", label: "Inuktitut" },
  { value: "tok_pisin", label: "Tok Pisin" },
  { value: "maori", label: "Maori" },
  { value: "samoan", label: "Samoan" },
  { value: "fijian", label: "Fijian" },
  { value: "filipino", label: "Filipino (Tagalog)" },
  { value: "burmese", label: "Burmese" },
  { value: "khmer", label: "Khmer" },
  { value: "lao", label: "Lao" },
  { value: "nepali", label: "Nepali" },
  { value: "sinhala", label: "Sinhala" },
  { value: "uzbek", label: "Uzbek" },
  { value: "kazakh", label: "Kazakh" },
  { value: "azerbaijani", label: "Azerbaijani" },
  { value: "persian", label: "Persian (Farsi)" },
  { value: "punjabi", label: "Punjabi" },
  { value: "javanese", label: "Javanese" },
  { value: "sundanese", label: "Sundanese" },
  { value: "hebrew", label: "Hebrew" },
  { value: "pashto", label: "Pashto" },
  { value: "kurdish", label: "Kurdish" },
  { value: "georgian", label: "Georgian" },
  { value: "armenian", label: "Armenian" },
  { value: "mongolian", label: "Mongolian" },
  { value: "tatar", label: "Tatar" },
  { value: "tibetan", label: "Tibetan" },
  { value: "uyghur", label: "Uyghur" },
  { value: "zhuang", label: "Zhuang" },
  { value: "akan", label: "Akan" },
  { value: "ganda", label: "Ganda" },
  { value: "kinyarwanda", label: "Kinyarwanda" },
  { value: "kirundi", label: "Kirundi" },
  { value: "lingala", label: "Lingala" },
  { value: "luganda", label: "Luganda" },
  { value: "nko", label: "N'Ko" },
  { value: "sotho", label: "Sotho" },
  { value: "tigrinya", label: "Tigrinya" },
  { value: "tsonga", label: "Tsonga" },
  { value: "venda", label: "Venda" },
  { value: "xhosa", label: "Xhosa" },
  // Add more as needed, remembering the balance between comprehensiveness and UI usability
];


function ProcessingPanel({
  setfilter,
  filter,
  setresult,
  loading,setloading
}: {
  setfilter: (val: any) => void;
  filter: any;
  setresult:any,
  loading:boolean,
  setloading:(val:any)=>void;
}) {
  const {Analysis}=useContext(DataContext);
  const [activeTab, setActiveTab] = useState("summary");
  const [summaryLength, setSummaryLength] = useState(50);
  const [includeCitations, setIncludeCitations] = useState(false);
  const [extractKeyPoints, setExtractKeyPoints] = useState(true);
  const [useBulletPoints, setUseBulletPoints] = useState(true);
  const [selectedFormat, setSelectedFormat] = useState("pdf"); // This controls the output format buttons (e.g., PDF, Word)
  const [processingIntensity, setProcessingIntensity] = useState("balanced"); // This controls the AI processing intensity buttons
  const [selectedLanguage, setSelectedLanguage] = useState<string>("english"); // Default to English
  const [selectedresult, setselectedresult] = useState("");
    const [selectedAPI, setselectedAPI] = useState([{}]);

  useEffect(() => {
    setfilter({
      Formate: activeTab,
      summary_Length_IF_Summary_formateis_Choosen:
        summaryLength < 33 ? "Short" : summaryLength < 66 ? "Medium" : "Long",
      includeCitations: includeCitations,
      extractKeyPoints: extractKeyPoints,
      useBulletPoints: useBulletPoints,
      processingIntensity: processingIntensity,
      language: selectedLanguage, // Pass selected language to the filter
    });
  }, [
    activeTab,
    summaryLength,
    includeCitations,
    extractKeyPoints,
    useBulletPoints,
    processingIntensity,
    selectedLanguage, // Dependency for language
    setfilter,
  ]);

  const formatOptions = [
    { value: "pdf", icon: <PictureAsPdfIcon className="text-red-500" />, label: "PDF" },
    { value: "word", icon: <ArticleIcon className="text-blue-500" />, label: "Word" },
    { value: "text", icon: <InsertDriveFileIcon className="text-gray-500" />, label: "Text" },
    { value: "more", icon: <MoreHorizIcon />, label: "More" },
  ];

  const intensityOptions = [
    { value: "light", icon: <LightModeIcon />, label: "Light" },
    { value: "balanced", icon: <BalanceIcon />, label: "Balanced" },
    { value: "deep", icon: <PsychologyIcon />, label: "Deep" },
  ];

  const tabIcons: Record<string, JSX.Element> = {
    summary: <DescriptionIcon className="mr-2" />,
    notes: <NoteIcon className="mr-2" />,
    qa: <HelpIcon className="mr-2" />,
    MCQs: <SportsEsportsIcon className="mr-2" />,
    paper: <EditNoteIcon className="mr-2" />,
  };

  const tabLabels: Record<string, string> = {
    summary: "Summary",
    notes: "Notes",
    qa: "Q&A",
    MCQs: "MCQs",
    paper: "Question Paper",
  };

  const { setTabs} = useContext(DataContext);

  async function analyze() {
    try {
      if (!selectedAPI[0]) {
        console.error("No API selected for analysis.");
        return;
      }
      setloading(true);
      const formData = new FormData();
      formData.append("summary_text", JSON.stringify(selectedAPI[0]!));
      formData.append("language", selectedLanguage);
      formData.append("filters", JSON.stringify(filter));
      console.log("Sending analysis request with formData:", Object.fromEntries(formData.entries()));
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_PORT}/format-summary-string`,
        formData,
      );
      setTabs((val:any)=>[...val,{
        ...filter,
        data:res.data.formatted_result,
        reference:selectedAPI[0],
        id:Tabs.length+1
      }])
      setresult({formate:filter.Formate,formatted_result:res.data.formatted_result});
    } catch (e) {
      console.error("Error during analysis:", e);
      if (axios.isAxiosError(e)) {
        console.error("Axios error response:", e.response?.data);
      }
    }finally{
      setloading(false)
    }
  }
  
  useEffect(()=>{
    setselectedAPI(Analysis.filter((d:any)=>d.key==selectedresult))
  },[selectedresult])
  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div>
          <h2 className="text-xl font-bold mb-4">Processing Options</h2>
          <Button onClick={analyze} className="mb-4" disabled={loading}>{loading?"....Analyzing":"Start Processing"}</Button>
            <Select value={selectedresult} onValueChange={setselectedresult}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Data" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Choose</SelectLabel>
          {Analysis.map((val:any)=>{
                     return <SelectItem value={val.key}>{val.name}</SelectItem>
          })}
          
        </SelectGroup>
      </SelectContent>
    </Select>
        </div>
        {/* Output Type */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Output Type</h3>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 w-full">
              {Object.keys(tabLabels).map((tab) => (
                <TabsTrigger key={tab} value={tab} className="whitespace-nowrap cursor-pointer">
                  {tabIcons[tab]}
                  <span className="hidden sm:inline">{tabLabels[tab]}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        <div>
          <h2 className="text-sm font-semibold mb-1">Choose Language</h2>
          <Select
            value={selectedLanguage}
            onValueChange={(value) => setSelectedLanguage(value)}
          >
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {/* Use ScrollArea for a long list of languages */}
              <ScrollArea className="h-[200px] w-full">
                {allLanguages
                  .sort((a, b) => a.label.localeCompare(b.label)) // Optional: sort alphabetically
                  .map((lang) => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
              </ScrollArea>
            </SelectContent>
          </Select>
        </div>
        {/* Summary Length */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <h3 className="font-medium">Summary Length</h3>
            <span className="text-sm">
              {summaryLength < 33 ? "Short" : summaryLength < 66 ? "Medium" : "Long"}
            </span>
          </div>
          <Slider
            value={[summaryLength]}
            min={0}
            max={100}
            step={1}
            onValueChange={(value) => setSummaryLength(value[0])}
            className="mb-2"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Short</span>
            <span>Medium</span>
            <span>Long</span>
          </div>
        </div>

        {/* Output Format */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Output Format</h3>
          <div className="grid grid-cols-4 gap-2">
            {formatOptions.map((option) => (
              <Button
                key={option.value}
                variant="outline"
                size="sm"
                className={`!rounded-button whitespace-nowrap cursor-pointer ${
                  selectedFormat === option.value
                    ? "border-blue-500 text-blue-600 bg-blue-50"
                    : ""
                }`}
                onClick={() => setSelectedFormat(option.value)}
              >
                {option.icon}
                <span className="ml-2">{option.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* AI Processing Intensity */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">AI Processing Intensity</h3>
          <div className="grid grid-cols-3 gap-2">
            {intensityOptions.map((option) => (
              <Button
                key={option.value}
                variant="outline"
                size="sm"
                className={`!rounded-button whitespace-nowrap cursor-pointer ${
                  processingIntensity === option.value
                    ? "border-blue-500 text-blue-600 bg-blue-50"
                    : ""
                }`}
                onClick={() => setProcessingIntensity(option.value)}
              >
                {option.icon}
                <span className="ml-2">{option.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Advanced Options */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="include-citations">Include Citations</Label>
            <Switch
              id="include-citations"
              checked={includeCitations}
              onCheckedChange={setIncludeCitations}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="extract-key-points">Extract Key Points</Label>
            <Switch
              id="extract-key-points"
              checked={extractKeyPoints}
              onCheckedChange={setExtractKeyPoints}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="use-bullet-points">Use Bullet Points</Label>
            <Switch
              id="use-bullet-points"
              checked={useBulletPoints}
              onCheckedChange={setUseBulletPoints}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProcessingPanel;