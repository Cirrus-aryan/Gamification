// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect, useCallback, useContext, useRef } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card"; // Assuming this is a ShadCN/UI Card component
import { DataContext } from "@/Context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Import Material-UI Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import LayersIcon from '@mui/icons-material/Layers';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import CircularProgress from '@mui/material/CircularProgress'; // For loading spinner

// Define the interfaces for the API response structure for Concept Mapper
interface ConceptNode {
  id: string;
  text: string;
  description?: string; // Optional description for a concept
}

interface ConceptRelationship {
  source: string;
  target: string;
  label?: string;
  direction?: string;
}

interface ConceptMapperContent {
  game_type: string;
  language: string;
  difficulty: string;
  num_concepts: number;
  topic_focus: string;
  central_topic?: string; // Main topic of the concept map
  concepts: ConceptNode[];
  relationships: ConceptRelationship[];
}

// Interface for the game's internal card representation
interface GameCard {
  id: string; // Unique ID for the card (e.g., conceptId-text or conceptId-description)
  content: string; // The text to display on the card
  isFlipped: boolean;
  isMatched: boolean;
  type: "concept" | "description"; // Indicates if it's the concept name or its description
  pairId: string; // The concept ID it belongs to, for matching purposes
}

// --- Inline CSS for card flipping animation ---
// This approach is generally not recommended for larger React apps.
// Consider using CSS Modules or a CSS-in-JS library for better maintainability.
const styles = `
.card-container {
  perspective: 1000px;
}
.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d; /* This is crucial for 3D effect */
}
.card-inner.flipped {
  transform: rotateY(180deg);
}
.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0.5rem; /* Adjust padding as needed */
  border-radius: 0.5rem; /* Match Card component's border-radius */
}
.card-front {
  transform: rotateY(180deg); /* Start rotated for the front face */
}
`;

// Inject the styles once when the script loads
// This ensures it's only added once, preventing re-injection on re-renders
if (!document.head.querySelector('#concept-mapper-styles')) {
  const styleSheet = document.createElement("style");
  styleSheet.id = "concept-mapper-styles"; // Add an ID to prevent duplicates
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

// --- Memoized GameCard Component ---
// This is crucial for performance. It ensures individual cards only re-render
// when their specific props (isFlipped, isMatched, etc.) change,
// not when other unrelated state in the parent (ConceptMapperGame) changes.
const MemoizedGameCard = React.memo(({ card, handleCardClick, canFlip }: {
  card: GameCard;
  handleCardClick: (card: GameCard) => void;
  canFlip: boolean;
}) => {
  return (
    <Card
      key={card.id}
      className={`p-4 sm:p-6 aspect-[3/4] cursor-pointer rounded-lg shadow-md card-container
        ${card.isMatched ? "bg-green-100 border-green-500" : "bg-white hover:shadow-lg"}
        ${!canFlip || card.isMatched || card.isFlipped ? "pointer-events-none" : ""}
      `}
      onClick={() => handleCardClick(card)}
    >
      <div className={`card-inner ${card.isFlipped ? "flipped" : ""}`}>
        {/* Card Back */}
        <div
          className={`card-back bg-blue-50 border-2 border-blue-400`}
        >
          <QuestionMarkIcon className="text-4xl text-blue-400" />
        </div>
        {/* Card Front */}
        <div
          className={`card-front ${card.isMatched ? "border-green-500 bg-green-50" : "border-gray-300 bg-white"}`}
        >
          <p className="text-sm sm:text-base font-medium break-words text-gray-800">
            {card.content}
          </p>
        </div>
      </div>
    </Card>
  );
});


const ConceptMapperGame: React.FC = () => {
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(300); // Default time for the game
  const [progress, setProgress] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [currentLevel] = useState<number>(1);
  const [streak, setStreak] = useState<number>(0);
  const [isSoundOn, setIsSoundOn] = useState<boolean>(true);
  const [cards, setCards] = useState<GameCard[]>([]);
  const [canFlip, setCanFlip] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const { Analysis, gameSettings,  returnlink } = useContext(DataContext);
  const navigate = useNavigate();

  // --- Refs for stable dependencies in useEffects and Callbacks ---
  const gameSettingsRef = useRef(gameSettings);
  const AnalysisRef = useRef(Analysis);
  const navigateRef = useRef(navigate);
  const returnlinkRef = useRef(returnlink);
  const scoreRef = useRef(score); // For timer's game over logic
  const cardsLengthRef = useRef(cards.length); // For timer's game over logic

  // Update refs when their corresponding states/props change
  useEffect(() => {
    gameSettingsRef.current = gameSettings;
  }, [gameSettings]);

  useEffect(() => {
    AnalysisRef.current = Analysis;
  }, [Analysis]);

  useEffect(() => {
    returnlinkRef.current = returnlink;
  }, [returnlink]);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    cardsLengthRef.current = cards.length;
  }, [cards.length]);


  // Function to generate game cards from the fetched ConceptMapperContent
  const generateCardsFromConcepts = useCallback((conceptMapData: ConceptMapperContent): GameCard[] => {
    const generatedCards: GameCard[] = [];
    conceptMapData.concepts.forEach((concept) => {
      generatedCards.push({
        id: `${concept.id}-text`,
        content: concept.text,
        isFlipped: false,
        isMatched: false,
        type: "concept",
        pairId: concept.id,
      });
      if (concept.description && concept.description.trim() !== "") {
        generatedCards.push({
          id: `${concept.id}-description`,
          content: concept.description,
          isFlipped: false,
          isMatched: false,
          type: "description",
          pairId: concept.id,
        });
      }
    });
    console.log("Generated Cards:", generatedCards);
    return generatedCards.sort(() => Math.random() - 0.5);
  }, []); // No dependencies needed for this pure function

  // Callback to load concept map content from the backend API
  const loadConceptMapContent = useCallback(async (levelToLoad: number) => {
    setIsLoading(true);
    setMessage(null);

    const currentSettings = gameSettingsRef.current;
    const currentNavigate = navigateRef.current;
    const currentReturnLink = returnlinkRef.current;

    if (!currentSettings || !currentSettings.originalAPIResult) {
      setMessage("It looks like you refreshed the page or game settings are missing. Redirecting to game selection.");
      setTimeout(() => currentNavigate(`/${currentReturnLink}`), 3000);
      return;
    }



    const formData = new FormData();
    formData.append("language", currentSettings.language || "English");
    formData.append("selectedDifficulty", currentSettings.selectedDifficulty);
    formData.append("numberOfConcepts", currentSettings.numberOfQuestions);
    formData.append("selectedTopicFocus", currentSettings.selectedTopicFocus);
    formData.append("originalAPIResult", JSON.stringify(currentSettings.originalAPIResult));
    formData.append("GIVENTOPICFORCHOOSEN", currentSettings.availableTopics?.join(",") || "");
    formData.append("level", String(levelToLoad));

    try {
      const apiUrl = import.meta.env.VITE_BACKEND_PORT || "http://localhost:8000";
      const res = await axios.post<ConceptMapperContent>(`${apiUrl}/ConceptMapper`, formData);
      console.log(`Concept Mapper Loaded for Level ${levelToLoad}:`, res.data);

      if (res.data && res.data.concepts && res.data.concepts.length > 0) {
        const generatedCards = generateCardsFromConcepts(res.data);
        if (generatedCards.length === 0) {
          setMessage("No valid concept pairs could be generated from the content. Please try a different topic or level.");
          setCards([]);
          return;
        }
        setCards(generatedCards);
        setScore(0);
        setTimeLeft(300);
        setProgress(0);
        setStreak(0);
        setCanFlip(true);
        setGameOver(false);
      } else {
        setMessage("No concepts returned from the API for this level. Redirecting to course completion.");
        setTimeout(() => currentNavigate(`/${currentReturnLink}`), 3000);
      }
    } catch (e) {
      console.error("Error loading Concept Mapper:", e);
      setMessage("Failed to load concept map. Please try again. Redirecting to course completion.");
      setTimeout(() => currentNavigate(`/${currentReturnLink}`), 3000);
    } finally {
      setIsLoading(false);
    }
  }, [generateCardsFromConcepts]); // Dependencies simplified due to refs

  // Effect to load concept map on component mount or when level changes
  useEffect(() => {
    loadConceptMapContent(currentLevel);
  }, [loadConceptMapContent, currentLevel]);

  // Timer effect for game countdown - Optimized with useRef
  useEffect(() => {
    if (!isPaused && !isLoading && !gameOver && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !gameOver) {
      setGameOver(true);
      setIsPaused(true);
      setMessage("Time's up! Game Over. Redirecting to course completion.");
      // Use ref for navigate and returnlink
      setTimeout(() => navigateRef.current(`/${returnlinkRef.current}`), 3000);
    }
  }, [isPaused, isLoading, gameOver, timeLeft]); // Dependencies simplified

  // Effect to check for game completion (all pairs matched)
  useEffect(() => {
    // Only run if cards are loaded and game is not already over
    if (cards.length > 0 && cards.every(card => card.isMatched) && !gameOver) {
      setGameOver(true);
      setIsPaused(true);
      setMessage("Congratulations! You matched all concepts! Redirecting to course completion.");
      // Use ref for navigate and returnlink
      setTimeout(() => navigateRef.current(`/${returnlinkRef.current}`), 3000);
    }
  }, [cards, gameOver]); // dependencies: cards (changes on every match), gameOver (changes once)

  // Utility function to format time for display (memoized)
  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, []); // No dependencies, so it's stable

  // Handler for card clicks
  const handleCardClick = useCallback((clickedCard: GameCard) => {
    if (isPaused || isLoading || gameOver || !canFlip || clickedCard.isMatched || clickedCard.isFlipped) {
      return;
    }

    // Use functional update for setCards to avoid stale state in batching
    setCards(prevCards => prevCards.map((card) =>
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    ));

   
  }, [isPaused, isLoading, gameOver, canFlip]); // Dependencies for useCallback

  // Calculate remaining pairs for display
  const matchedPairsCount = cards.filter((card) => card.isMatched).length / 2;
  const totalPairsCount = cards.length / 2;

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Button
            variant="ghost"
            className="rounded-lg whitespace-nowrap cursor-pointer"
            onClick={() => navigateRef.current(`/${returnlinkRef.current}`)}
          >
            <ArrowBackIcon className="mr-2" />
            Back
          </Button>
          <div className="text-xl sm:text-2xl font-bold">Score: {score}</div>
          <div className="text-lg sm:text-xl font-semibold text-gray-700">
            {formatTime(timeLeft)}
          </div>
        </div>
        <Progress value={progress} className="h-2 rounded-none" />
      </header>

      {/* Main Game Area */}
      <main className="pt-20 pb-24 px-4 max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-800">
          Concept Mapper Challenge - Level {currentLevel}
        </h1>

        {isLoading ? (
          <div className="flex items-center justify-center h-64 text-gray-600 text-lg">
            <CircularProgress size={24} className="mr-2" />
            Loading concepts...
          </div>
        ) : cards.length === 0 ? (
          <div className="flex items-center justify-center h-64 text-red-600 text-lg">
            {message || "No concept pairs available for this level. Please try different settings."}
          </div>
        ) : (
          <div className="max-w-5xl mx-auto mb-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
              {cards.map((card) => (
                <MemoizedGameCard
                  key={card.id}
                  card={card}
                  handleCardClick={handleCardClick}
                  canFlip={canFlip}
                />
              ))}
            </div>
          </div>
        )}

        {/* Game Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button
            variant="outline"
            className="rounded-lg whitespace-nowrap cursor-pointer px-6 py-3 shadow-sm hover:shadow-md transition-all"
            onClick={() => setIsPaused(!isPaused)}
            disabled={isLoading || gameOver}
          >
            {isPaused ? <PlayArrowIcon className="mr-2" /> : <PauseIcon className="mr-2" />}
            {isPaused ? "Resume" : "Pause"}
          </Button>
          <Button
            variant="outline"
            className="rounded-lg whitespace-nowrap cursor-pointer px-6 py-3 shadow-sm hover:shadow-md transition-all"
            disabled={isLoading || gameOver}
          >
            <HelpOutlineIcon className="mr-2" />
            Hint
          </Button>
          <Button
            variant="outline"
            className="rounded-lg whitespace-nowrap cursor-pointer px-6 py-3 shadow-sm hover:shadow-md transition-all"
            onClick={() => setIsSoundOn(!isSoundOn)}
            disabled={isLoading || gameOver}
          >
            {isSoundOn ? <VolumeUpIcon className="mr-2" /> : <VolumeOffIcon className="mr-2" />}
            Sound
          </Button>
          <Button
            variant="destructive"
            className="rounded-lg whitespace-nowrap cursor-pointer px-6 py-3 shadow-sm hover:shadow-md transition-all"
            onClick={() => navigateRef.current(`/${returnlinkRef.current}`)}
            disabled={isLoading}
          >
            <ExitToAppIcon className="mr-2" />
            Exit
          </Button>
        </div>
      </main>

      {/* Status Bar */}
      <footer className="fixed bottom-0 w-full bg-white bg-opacity-90 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-semibold text-gray-700">Level: {currentLevel}</div>
          <div className="flex items-center gap-2 text-gray-700">
            <LayersIcon className="text-blue-500" />
            <span>
              Pairs Matched: {matchedPairsCount} / {totalPairsCount}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <LocalFireDepartmentIcon className="text-orange-500" />
            <span>Streak: {streak}</span>
          </div>
        </div>
      </footer>

      {/* Pause/Game Over Overlay */}
      {(isPaused || gameOver) && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <Card className="bg-white p-8 rounded-xl shadow-2xl text-center max-w-md w-full">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              {gameOver ? "Game Over!" : "Game Paused"}
            </h2>
            {message && <p className="text-lg mb-6 text-gray-700">{message}</p>}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!gameOver && (
                <Button
                  className="rounded-lg whitespace-nowrap cursor-pointer px-6 py-3 text-lg font-semibold shadow-md hover:shadow-lg transition-all"
                  onClick={() => setIsPaused(false)}
                >
                  Resume Game
                </Button>
              )}
              <Button
                variant="destructive"
                className="rounded-lg whitespace-nowrap cursor-pointer px-6 py-3 text-lg font-semibold shadow-md hover:shadow-lg transition-all"
                onClick={() => navigateRef.current(`/${returnlinkRef.current}`)}
              >
                Quit Game
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ConceptMapperGame;
