import  { useState, useCallback, useEffect } from "react"; // Removed memo, useMemo, useContext as they are not used directly in this snippet
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
// Assuming allLanguages is correctly imported if needed elsewhere, not directly used in the provided snippet
// import { allLanguages } from "@/components/ProcessingPanel"; 
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

// Define the Game interface for better type checking
interface Game {
  game: string;
  levels: string;
  topics: string[];
}

// Define an interface for the game settings to be passed via context
interface GameSettings {
  selectedDifficulty: string;
  numberOfQuestions: string;
  timeLimitPerQuestion: string;
  selectedTopicFocus: string;
  originalAPIResult: any; // The full content from which to generate the game
  gameType: string; // e.g., "Quiz Challenge", "Concept Mapper"
  availableTopics: string[]; // All topics from the selected game idea
  language: string; // Added language to game settings
}

interface SavedData {
  key: string;
  link: string;
  name: string;
  summary?: any;
  analysis_result: any;
  type: string;
  language: string;
}

function Gamepage({ Analysis, setGameSettings }: { Analysis: SavedData[]; setGameSettings: any }) {
  const [gamesData, setGamesData] = useState<Game[]>([]);
  const [isLoadingGames, setIsLoadingGames] = useState<boolean>(false);
  const [errorGames, setErrorGames] = useState<string | null>(null);
  const [selectedresult, setselectedresult] = useState<string | undefined>();
  // States for dialog settings
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("medium");
  const [numberOfQuestions, setNumberOfQuestions] = useState<string>("10");
  const [timeLimitPerQuestion, setTimeLimitPerQuestion] = useState<string>("60");
  const [selectedTopicFocus, setSelectedTopicFocus] = useState<string>("all");
  const [selectedlanguage] = useState<string | undefined>("english"); // Default to english
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to fetch game ideas (GamefiedFilters)
  const createGameFilter = useCallback(async () => {
    if (!selectedresult) {
      setErrorGames("Please select a data source to create game filters.");
      return;
    }

    setIsLoadingGames(true);
    setErrorGames(null); // Clear previous errors
    console.log("Creating game filter with selected result:", selectedresult);
    const formdata = new FormData();
    const data = Analysis.find((item: any) => item.key === selectedresult);

    if (!data) {
      setErrorGames("Selected data source not found in Analysis.");
      setIsLoadingGames(false);
      return;
    }

    formdata.append("API_Result", JSON.stringify(data)); // Ensure 'data' is the correct object structure
    formdata.append("language", selectedlanguage || "english"); // Pass selected language

    try {
      const apiUrl = import.meta.env.VITE_BACKEND_PORT;
      const res = await axios.post(
        `${apiUrl}/GamefiedFilters`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Game ideas fetched successfully:", res.data);
      if (res.data?.game_ideas && Array.isArray(res.data.game_ideas)) {
        setGamesData(res.data.game_ideas);
      } else {
        setErrorGames("Invalid response format for game ideas.");
        setGamesData([]);
      }
    } catch (e) {
      console.error("Error creating game filter:", e);
      if (axios.isAxiosError(e)) {
        setErrorGames(e.response?.data?.detail || "Failed to fetch game ideas.");
      } else {
        setErrorGames("An unexpected error occurred while fetching game ideas.");
      }
    } finally {
      setIsLoadingGames(false);
    }
  }, [selectedresult, selectedlanguage, Analysis]);


  useEffect(() => {
    console.log("Games Data Updated:", gamesData);
  }, [gamesData]);

  // Handle starting the game: Stores settings and navigates
  const handleStartGame = (gameIdea: Game) => {
    // 1. Close the dialog immediately
    // This is a common pattern for shadcn/ui dialogs when you need to close programmatically
    document.querySelector('[role="dialog"]')?.closest("dialog")?.close();

    // 2. Prepare the settings to be passed to the next page via context
    const settings: GameSettings = {
      selectedDifficulty,
      numberOfQuestions,
      timeLimitPerQuestion,
      selectedTopicFocus,
      originalAPIResult: Analysis.find((item: any) => item.key === selectedresult), // Pass the original content identifier
      gameType: gameIdea.game,
      availableTopics: gameIdea.topics,
      language: selectedlanguage || "english", // Include selected language
    };
    console.log(gameIdea);
    // 3. Store these settings in the DataContext
    setGameSettings(settings); // Ensure DataContext has a setGameSettings method

    // 4. Navigate to the specific game page.
    // Corrected navigation logic:
    let gamePathSegment = "";
    if (gameIdea.game === "Quiz Challenge") {
      gamePathSegment = "quiz";
    } else if (gameIdea.game === "Concept Mapper") {
      gamePathSegment = "MemoryCard"; // Or whatever your route for Concept Mapper is
    } else if (gameIdea.game === "Memory Card") {
        gamePathSegment = "memory-card"; // Example for Memory Card
    }
    // Add more else if statements for other game types as needed

    if (gamePathSegment) {
      navigate(`/${gamePathSegment}`);
    } else {
      console.warn(`No specific route defined for game type: ${gameIdea.game}`);
      // Optionally, navigate to a default game page or show an error
      navigate('/default-game-page');
    }
  };

  return (
    <Card className="bg-white m-2 p-4 sm:p-6 lg:p-8 rounded-lg shadow-sm">
      {" "}
      {/* Responsive padding */}
      <CardContent className="p-0">
        {" "}
        {/* Remove default CardContent padding */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-gray-800">
          Learning Games
        </h2>
        {/* Data Selection */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <Label htmlFor="data-select" className="text-base font-medium flex-shrink-0">
            Select Data Source:
          </Label>
          <Select value={selectedresult} onValueChange={setselectedresult}>
            <SelectTrigger id="data-select" className="w-full sm:w-[250px]">
              {" "}
              {/* Responsive width */}
              <SelectValue placeholder="Choose a processed data" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Processed Data</SelectLabel>
                {Analysis &&
                  Analysis?.map((val: any) => (
                    <SelectItem key={val.key} value={val.key}>
                      {val.name} - ({val.type})
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* Game Ideas Grid */}
        {gamesData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {" "}
            {/* More responsive grid */}
            {gamesData.map((data, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <Button
                    className="p-4 h-auto flex flex-col items-center justify-center rounded-lg border text-center transition-all hover:shadow-md border-gray-200 hover:border-gray-300 w-full"
                    variant="ghost"
                  >
                    <i className="fas fa-puzzle-piece text-2xl sm:text-3xl text-purple-600 mb-2"></i>{" "}
                    {/* Responsive icon size */}
                    <p className="font-medium text-sm sm:text-base">{data.game} Challenge</p>{" "}
                    {/* Responsive text size */}
                    <p className="text-xs sm:text-sm text-gray-500">
                      {data.game === "Quiz Challenge"
                        ? "Multiple choice questions"
                        : data.game === "Concept Mapper"
                        ? "Match concepts and descriptions"
                        : "Interactive learning experience"}
                    </p>
                  </Button>
                </DialogTrigger>
                {/* DialogContent for game settings - made fully responsive */}
                <DialogContent className=" w-auto" style={{ maxWidth: "100vw", maxHeight: "100vh" }}>
                  <DialogHeader className="flex-shrink-0 mb-4">
                    <DialogTitle className="text-xl sm:text-2xl font-bold">
                      {data.game} Settings
                    </DialogTitle>
                    <DialogDescription className="text-sm sm:text-base">
                      Customize your {data.game} experience.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4 flex-grow overflow-y-auto">
                    {" "}
                    {/* Added flex-grow and overflow-y-auto */}
                    {/* Difficulty Level */}
                    <div className="space-y-2">
                      <Label htmlFor={`difficulty-${index}`} className="text-sm sm:text-base">
                        Difficulty Level
                      </Label>
                      <Select
                        defaultValue={selectedDifficulty}
                        onValueChange={setSelectedDifficulty}
                      >
                        <SelectTrigger id={`difficulty-${index}`} className="w-full">
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {/* Number of Questions */}
                    <div className="space-y-2">
                      <Label htmlFor={`num-questions-${index}`} className="text-sm sm:text-base">
                        Number of Questions
                      </Label>
                      <Select
                        defaultValue={numberOfQuestions}
                        onValueChange={setNumberOfQuestions}
                      >
                        <SelectTrigger id={`num-questions-${index}`} className="w-full">
                          <SelectValue placeholder="Select number of questions" />
                        </SelectTrigger>
                        <SelectContent>
                          {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((d) => (
                            <SelectItem key={d} value={String(d)}>
                              {d} Questions
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {/* Time Limit per Question */}
                    <div className="space-y-2">
                      <Label htmlFor={`time-limit-${index}`} className="text-sm sm:text-base">
                        Time Limit per Question
                      </Label>
                      <Select
                        defaultValue={timeLimitPerQuestion}
                        onValueChange={setTimeLimitPerQuestion}
                      >
                        <SelectTrigger id={`time-limit-${index}`} className="w-full">
                          <SelectValue placeholder="Select time limit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 Seconds</SelectItem>
                          <SelectItem value="60">60 Seconds</SelectItem>
                          <SelectItem value="90">90 Seconds</SelectItem>
                          <SelectItem value="120">120 Seconds</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {/* Topic Focus */}
                    <div className="space-y-2">
                      <Label htmlFor={`topic-focus-${index}`} className="text-sm sm:text-base">
                        Topic Focus
                      </Label>
                      <Select
                        defaultValue={selectedTopicFocus}
                        onValueChange={setSelectedTopicFocus}
                      >
                        <SelectTrigger id={`topic-focus-${index}`} className="w-full">
                          <SelectValue placeholder="Select topic focus" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Topics</SelectItem>
                          {data.topics.map((topic) => (
                            <SelectItem key={topic} value={topic}>
                              {topic}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter className="flex-shrink-0 mt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        document.querySelector('[role="dialog"]')?.closest("dialog")?.close()
                      }
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleStartGame(data)}
                    >
                      Start Game
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-8 text-sm sm:text-base">
            No games generated yet. Click "Quick Create" to get started!
          </p>
        )}
        {/* Loading and Error Indicators for Game Ideas */}
        {isLoadingGames && (
          <p className="text-center text-blue-600 mt-4 text-sm sm:text-base">
            Generating game ideas...
          </p>
        )}
        {errorGames && (
          <p className="text-center text-red-500 mt-4 text-sm sm:text-base">
            Error: {errorGames}
          </p>
        )}
        <Separator className="my-6" />
        {/* Game Creation Tools */}
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h3 className="font-medium mb-1 text-base sm:text-lg text-gray-800">
              Game Creation Tools
            </h3>
            <p className="text-sm text-gray-500">
              Create custom learning games from your content.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            {" "}
            {/* Responsive buttons */}
            <Button
              variant="outline"
              onClick={createGameFilter}
              className="rounded-lg whitespace-nowrap cursor-pointer w-full sm:w-auto"
              disabled={isLoadingGames || !selectedresult}
            >
              <i className="fas fa-magic mr-2"></i>
              {isLoadingGames ? "Creating..." : "Quick Create"}
            </Button>
            {/* Removed the extra Button that was not fully implemented */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Gamepage;