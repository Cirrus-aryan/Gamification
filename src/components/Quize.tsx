import React, { useState, useEffect, useContext, useCallback, useRef } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataContext } from "@/Context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// --- Material-UI Icon Imports (Keeping as is for direct use) ---
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ScoreIcon from '@mui/icons-material/Score';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import type{GameSettings,QuizGameContent,QuizQuestion} from "./type"
// --- Interfaces (remains the same) ---

// --- Main QuizPage Component ---
const QuizPage: React.FC = () => {
  const { gameSettings,GameScore,setGameScore,setGameContent, returnlink } = useContext(DataContext);
  const navigate = useNavigate();

  // Refs to store latest state values without triggering useEffect re-runs
  const scoreRef = useRef(0);
  const questionsLengthRef = useRef(0);
  const gameSettingsRef = useRef<GameSettings | null>(null);
  const navigateRef = useRef(navigate); // navigate from useNavigate is already stable

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [isLoadingQuiz, setIsLoadingQuiz] = useState<boolean>(true);
  const [errorQuiz, setErrorQuiz] = useState<string | null>(null);

  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [streak, setStreak] = useState<number>(0);
  const [isSoundOn, setIsSoundOn] = useState<boolean>(true);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  // Update refs when their corresponding states/props change
  useEffect(() => {
    scoreRef.current = score;
  }, [score]);
  useEffect(()=>console.log(GameScore),[GameScore])
  useEffect(() => {
    questionsLengthRef.current = questions.length;
  }, [questions.length]);

  useEffect(() => {
    gameSettingsRef.current = gameSettings;
  }, [gameSettings]);

  // Calculate initial time limit once game settings are available
  useEffect(() => {
    if (gameSettings?.numberOfQuestions && gameSettings?.timeLimitPerQuestion) {
      const newInitialTimeLimit =
        parseInt(gameSettings.numberOfQuestions) * parseInt(gameSettings.timeLimitPerQuestion);
      setTimeLeft(newInitialTimeLimit);
    }
  }, [gameSettings]);

  // --- API Call to Load Game (Quiz) Content ---
  const loadQuizContent = useCallback(async (levelToLoad: number) => {
    const currentSettings = gameSettingsRef.current; // Use ref for latest settings
    if (!currentSettings || !currentSettings.originalAPIResult) {
      alert("It looks like you refreshed the page or game settings are missing. Redirecting to game selection.");
      navigateRef.current(`/${returnlink}`); // Use ref for navigate
      return;
    }

    setIsLoadingQuiz(true);
    setErrorQuiz(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setProgress(0); // Reset progress for new level

    const formData = new FormData();
    formData.append("language", "English");
    formData.append("selectedDifficulty", currentSettings.selectedDifficulty);
    formData.append("numberOfQuestions", currentSettings.numberOfQuestions);
    formData.append("timeLimitPerQuestion", currentSettings.timeLimitPerQuestion);
    formData.append("selectedTopicFocus", currentSettings.selectedTopicFocus);
    formData.append("originalAPIResult", JSON.stringify(currentSettings.originalAPIResult));
    formData.append("GIVENTOPICFORCHOOSEN", currentSettings.availableTopics.join(","));
    formData.append("level", String(levelToLoad));

    try {
      const apiUrl = import.meta.env.VITE_BACKEND_PORT;
      const res = await axios.post<QuizGameContent>(`${apiUrl}/quiz`, formData);
      console.log(`Quiz Loaded for Level ${levelToLoad}:`, res.data);

      if (res.data && res.data.questions && res.data.questions.length > 0) {
        setQuestions(res.data.questions);
        setGameContent(res.data);
        // Recalculate time for the new set of questions if different number of questions
        const newTotalTime = parseInt(currentSettings.numberOfQuestions) * parseInt(currentSettings.timeLimitPerQuestion);
        setTimeLeft(newTotalTime);
      } else {
        setErrorQuiz(`No quiz questions were generated for Level ${levelToLoad}. Please try again.`);
      }
    } catch (e) {
      console.error("Error loading quiz:", e);
      if (axios.isAxiosError(e)) {
        setErrorQuiz(e.response?.data?.detail || "Failed to load quiz content from server.");
      } else {
        setErrorQuiz("An unexpected error occurred while loading the quiz.");
      }
      setTimeout(() => navigateRef.current(`${returnlink}`), 3000); // Use ref for navigate
    } finally {
      setIsLoadingQuiz(false);
    }
  }, [setGameContent, returnlink]); // Dependencies simplified due to refs

  // Effect to load quiz on component mount or when level changes
  useEffect(() => {
    loadQuizContent(currentLevel);
  }, [loadQuizContent, currentLevel]);

  // Timer effect - Now less dependent on frequently changing states
  useEffect(() => {
    if (!isPaused && timeLeft > 0 && !isLoadingQuiz && questions.length > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
    if (timeLeft === 0 && questions.length > 0) {
      // Access latest values via refs
      const totalPossibleTime = parseInt(gameSettingsRef.current?.numberOfQuestions || '0') * parseInt(gameSettingsRef.current?.timeLimitPerQuestion || '0');
      alert(`Time's up! Game Over. You scored ${scoreRef.current} out of ${questionsLengthRef.current * 100}.`);
    setGameScore({Quize: { score: scoreRef.current, totalQuestions: questionsLengthRef.current, timeTaken: totalPossibleTime - timeLeft } });
    }
  }, [isPaused, timeLeft, isLoadingQuiz, questions.length]); // questions.length is still needed here as it affects when timer starts/stops

  // Memoize formatTime if it's being called frequently in render
  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, []); // No dependencies, so it's stable

  const handleAnswerSelect = (optionIndex: number) => {
    if (isPaused || isAnswered || isLoadingQuiz || questions.length === 0) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = currentQuestion.options[optionIndex] === currentQuestion.correct_answer;

    // Batch all state updates for a single render cycle after selection
    setSelectedAnswer(optionIndex);
    setIsAnswered(true);

    if (isCorrect) {
      setScore((prev) => prev + 100);
      setStreak((prev) => prev + 1);
      // Play correct answer sound (implementation omitted for brevity)
    } else {
      setStreak(0);
      // Play incorrect answer sound (implementation omitted for brevity)
    }

    const nextQuestionTimer = setTimeout(() => {
      // These updates will trigger a new render
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null); // Clear selected answer for next question
        setIsAnswered(false);   // Reset answered status
        setProgress(((currentQuestionIndex + 1) + 1) / questions.length * 100); // Progress for next question
      } else {
        // All questions answered for the current level
        alert(`Level ${currentLevel} Complete! Moving to Level ${currentLevel + 1}.`);
        setCurrentLevel((prev) => prev + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setStreak(0);
        setProgress(0); // Reset progress for the new level
      }
    }, 1500); // 1.5 seconds delay

    return () => clearTimeout(nextQuestionTimer);
  };

  // Memoize the question card to prevent re-renders unless question changes
  // or isAnswered/selectedAnswer (for styling)
  const MemoizedQuestionCard = React.memo(({ question, options, currentQuestionIndex, selectedAnswer, isAnswered, correct_answer, explanation, handleAnswerSelect }: {
    question: string;
    options: string[];
    currentQuestionIndex: number;
    selectedAnswer: number | null;
    isAnswered: boolean;
    correct_answer: string;
    explanation?: string;
    handleAnswerSelect: (index: number) => void;
  }) => {
    return (
      <Card className="p-8 bg-gray-700 rounded-xl shadow-2xl border border-gray-600">
        <h2 className="text-3xl font-semibold mb-8 leading-relaxed text-gray-100">
          {currentQuestionIndex + 1}. {question}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className={`
                p-5 text-xl text-left justify-start !rounded-lg whitespace-normal h-auto
                font-medium transition-all duration-300 border-2
                ${isAnswered
                  ? option === correct_answer
                    ? "bg-green-600 border-green-700 text-white shadow-md scale-105"
                    : index === selectedAnswer
                    ? "bg-red-600 border-red-700 text-white shadow-md scale-105"
                    : "bg-gray-600 border-gray-500 text-gray-200 opacity-70"
                  : "bg-gray-600 border-gray-500 text-gray-100 hover:bg-blue-500 hover:border-blue-600 hover:text-white"
                }
                ${isAnswered ? "cursor-not-allowed" : "cursor-pointer"}
              `}
              onClick={() => handleAnswerSelect(index)}
              disabled={isAnswered}
            >
              <span className="mr-3 font-bold text-blue-200">
                {String.fromCharCode(65 + index)}.
              </span>
              {option}
              {isAnswered && (
                <span className="ml-auto text-2xl">
                  {option === correct_answer ? (
                    <CheckCircleOutlineIcon className="text-green-200" />
                  ) : index === selectedAnswer ? (
                    <CancelOutlinedIcon className="text-red-200" />
                  ) : null}
                </span>
              )}
            </Button>
          ))}
        </div>
        {isAnswered && explanation && (
          <div className="mt-6 p-4 bg-gray-600 rounded-lg text-gray-200 text-md border border-gray-500">
            <p className="font-semibold text-lg mb-2 text-blue-300">Explanation:</p>
            <p>{explanation}</p>
          </div>
        )}
      </Card>
    );
  });


  // --- Render Logic for Loading, Error, No Questions ---
  if (isLoadingQuiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-xl animate-pulse">Loading quiz questions for Level {currentLevel}...</p>
      </div>
    );
  }

  if (errorQuiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <Card className="p-8 text-center bg-white rounded-lg shadow-xl max-w-md w-full">
          <p className="text-xl text-red-600 mb-4 font-semibold">Error: {errorQuiz}</p>
          <Button
            onClick={() => navigateRef.current(`${returnlink}`)} // Use ref
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            Go back to Games
          </Button>
        </Card>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <Card className="p-8 text-center bg-white rounded-lg shadow-xl max-w-md w-full">
          <p className="text-xl text-gray-800 mb-4">No questions available for Level {currentLevel}. Please try generating again.</p>
          <Button
            onClick={() => navigateRef.current(`${returnlink}`)} // Use ref
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
          >
            Generate New Game
          </Button>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  // --- Main Quiz UI ---
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 text-white font-sans antialiased">
      {/* Header */}
      <header className="fixed top-0 w-full bg-gray-800 bg-opacity-90 shadow-lg z-50 py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <Button
            variant="ghost"
            className="!rounded-full px-4 py-2 text-white hover:bg-gray-700 transition-colors"
            onClick={() => navigateRef.current(`${returnlink}`)} // Use ref
          >
            <ArrowBackIcon className="mr-2" />
            Back
          </Button>
          <div className="text-3xl font-extrabold text-blue-400 flex items-center">
            <ScoreIcon className="mr-2 text-blue-400" />
            Score: {score}
          </div>
          <div className="text-2xl font-bold text-gray-300 flex items-center">
            <AccessTimeIcon className="mr-2 text-gray-300" />
            {formatTime(timeLeft)}
          </div>
        </div>
        <Progress value={progress} className="h-2 w-full mt-3 rounded-none bg-gray-700 [&::-webkit-progress-bar]:bg-blue-600 [&::-webkit-progress-value]:bg-blue-500" />
      </header>

      {/* Main Game Area */}
      <main className="flex-grow pt-28 pb-28 px-4 max-w-4xl mx-auto w-full flex flex-col justify-center">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-blue-300 drop-shadow-lg">
          Quiz Challenge - Level {currentLevel}
        </h1>
        <div className="mb-10">
          <MemoizedQuestionCard
            question={currentQuestion.question}
            options={currentQuestion.options}
            currentQuestionIndex={currentQuestionIndex}
            selectedAnswer={selectedAnswer}
            isAnswered={isAnswered}
            correct_answer={currentQuestion.correct_answer}
            explanation={currentQuestion.explanation}
            handleAnswerSelect={handleAnswerSelect} // Pass the handler
          />
        </div>

        {/* Game Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button
            variant="outline"
            className="!rounded-full px-6 py-3 text-lg bg-gray-700 border-gray-600 text-white hover:bg-blue-500 hover:border-blue-600 transition-colors"
            onClick={() => setIsPaused(!isPaused)}
          >
            {isPaused ? <PlayArrowIcon className="mr-2" /> : <PauseIcon className="mr-2" />}
            {isPaused ? "Resume" : "Pause"}
          </Button>
          <Button
            variant="outline"
            className="!rounded-full px-6 py-3 text-lg bg-gray-700 border-gray-600 text-white hover:bg-blue-500 hover:border-blue-600 transition-colors opacity-50 cursor-not-allowed"
            disabled
          >
            <HelpOutlineIcon className="mr-2" />
            Hint
          </Button>
          <Button
            variant="outline"
            className="!rounded-full px-6 py-3 text-lg bg-gray-700 border-gray-600 text-white hover:bg-blue-500 hover:border-blue-600 transition-colors"
            onClick={() => setIsSoundOn(!isSoundOn)}
          >
            {isSoundOn ? <VolumeUpIcon className="mr-2" /> : <VolumeOffIcon className="mr-2" />}
            Sound
          </Button>
          <Button
            variant="destructive"
            className="!rounded-full px-6 py-3 text-lg bg-red-600 border-red-700 text-white hover:bg-red-700 transition-colors"
            onClick={() => {
              if (window.confirm("Are you sure you want to quit this game? Your progress will be lost.")) {
                   setGameScore({Quize: { score: scoreRef.current, totalQuestions: questionsLengthRef.current, timeTaken: (parseInt(gameSettingsRef.current?.numberOfQuestions || '0') * parseInt(gameSettingsRef.current?.timeLimitPerQuestion || '0')) - timeLeft } });
                navigateRef.current(`${returnlink}`) // Use ref
              }
            }}
          >
            <ExitToAppIcon className="mr-2" />
            Exit
          </Button>
        </div>
      </main>

      {/* Status Bar */}
      <footer className="fixed bottom-0 w-full bg-gray-800 bg-opacity-90 shadow-lg py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-gray-300 text-lg">
          <div className="font-semibold">Level: <span className="text-blue-400">{currentLevel}</span></div>
          <div className="flex items-center gap-2">
            <QuestionMarkIcon className="text-blue-400" />
            <span>
              Question <span className="font-bold text-blue-400">{currentQuestionIndex + 1}</span> / {questions.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <LocalFireDepartmentIcon className="text-orange-500" />
            <span>Streak: <span className="font-bold text-orange-400">{streak}</span></span>
          </div>
        </div>
      </footer>

      {/* Pause Overlay */}
      {isPaused && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-gray-700 p-10 rounded-xl shadow-2xl text-center border border-gray-600">
            <h2 className="text-4xl font-extrabold mb-6 text-blue-300">Game Paused</h2>
            <p className="text-lg text-gray-200 mb-8">Take a breath, then get back in the game!</p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Button
                className="px-8 py-4 text-xl !rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                onClick={() => setIsPaused(false)}
              >
                <PlayArrowIcon className="mr-3" /> Resume Game
              </Button>
              <Button
                variant="destructive"
                className="px-8 py-4 text-xl !rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors"
                onClick={() => {
                  if (window.confirm("Are you sure you want to quit? Your current progress will be lost.")) {
                      setGameScore({Quize: { score: scoreRef.current, totalQuestions: questionsLengthRef.current, timeTaken: (parseInt(gameSettingsRef.current?.numberOfQuestions || '0') * parseInt(gameSettingsRef.current?.timeLimitPerQuestion || '0')) - timeLeft } });
                      navigateRef.current(`${returnlink}`) // Use ref
                  }
                }}
              >
                <ExitToAppIcon className="mr-3" /> Quit Game
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;