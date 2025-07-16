import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  SkipNext as SkipNextIcon,
  SkipPrevious as SkipPreviousIcon,
  VolumeUp as VolumeUpIcon,
  VolumeOff as VolumeOffIcon,
  Loop as LoopIcon,
  LoopOutlined as LoopOffIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  PlayCircleFilledWhite as PlayCircleFilledWhiteIcon,
  FastForward as FastForwardIcon,
  FastRewind as FastRewindIcon,
} from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'sonner';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AudioFile {
  filename: string;
  s3_url: string;
  segment_key: string;
  title: string;
  description?: string;
  cover_image_url?: string;
  duration?: number;
}

interface SoundBLOGProps {
  audioFiles: AudioFile[];
  initialIndex?: number;
  onTrackChange?: (index: number, audioFile: AudioFile | null) => void;
  onPlayerStateChange?: (state: { isPlaying: boolean; isLoading: boolean; error: string | null }) => void;
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0 || !isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

const PLAYBACK_SPEEDS = [0.75, 1, 1.25, 1.5, 2];
const SEEK_STEP = 10;

const SoundBLOG: React.FC<SoundBLOGProps> = ({
  audioFiles,
  initialIndex = 0,
  onTrackChange,
  onPlayerStateChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(() => {
    const savedVolume = localStorage.getItem('audioPlayerVolume');
    return savedVolume ? parseInt(savedVolume, 10) : 100;
  });
  const [isMuted, setIsMuted] = useState(() => {
    const savedMute = localStorage.getItem('audioPlayerMuted');
    if (savedMute !== null) return savedMute === 'true';
    const savedVolume = localStorage.getItem('audioPlayerVolume');
    return savedVolume ? parseInt(savedVolume, 10) === 0 : false;
  });
  const [isLooping, setIsLooping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [playbackRate, setPlaybackRate] = useState(() => {
    const savedRate = localStorage.getItem('audioPlayerPlaybackRate');
    return savedRate ? parseFloat(savedRate) : 1;
  });
  const [isSeeking, setIsSeeking] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const currentAudio = useMemo(() => {
    if (!audioFiles || audioFiles.length === 0) return null;
    return audioFiles[currentIndex];
  }, [audioFiles, currentIndex]);

  // Effect for updating external state callbacks
  useEffect(() => {
    onPlayerStateChange?.({ isPlaying, isLoading, error });
  }, [isPlaying, isLoading, error, onPlayerStateChange]);

  // --- Effect for loading/changing the audio source ---
  useEffect(() => {
    if (!audioRef.current) return;

    setIsLoading(true);
    setError(null);
    setAudioProgress(0); // Reset progress on new track load
    setDuration(0); // Reset duration initially

    if (currentAudio) {
      // Set the source and load the audio
      audioRef.current.src = currentAudio.s3_url;
      audioRef.current.load(); // This will trigger 'loadedmetadata' and 'canplay' events

      // Apply other properties here, but DON'T include them in this useEffect's dependency array
      // They have their own effects below or are handled by their direct setters.
      audioRef.current.playbackRate = playbackRate;
      audioRef.current.volume = (isMuted ? 0 : volume) / 100;
      audioRef.current.loop = isLooping;

      onTrackChange?.(currentIndex, currentAudio);
    } else {
      audioRef.current.src = '';
      audioRef.current.load();
      setIsLoading(false);
      setIsPlaying(false);
      setError("No audio file selected or available.");
      onTrackChange?.(currentIndex, null);
    }
    // This effect should ONLY re-run when the *current track* fundamentally changes.
  }, [currentIndex, currentAudio, onTrackChange]); // Only dependencies that determine the current track

  // --- Effects for applying other audio properties independently ---
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = (isMuted ? 0 : volume) / 100;
    }
  }, [volume, isMuted]); // Depend on both volume and isMuted

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = isLooping;
    }
  }, [isLooping]);


  // --- Audio Event Handlers (memoized with useCallback) ---
  const handlePlayPause = useCallback(() => {
    if (!audioRef.current || isLoading || error) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(playError => {
        console.error("Error playing audio:", playError);
        setIsPlaying(false);
        if (playError.name === "NotAllowedError") {
          toast.error("Autoplay Blocked", {
            description: "Your browser prevented autoplay. Please click play to start the audio.",
            duration: 5000,
          });
        } else if (playError.name === "AbortError") {
          console.warn("Play request aborted.");
        } else {
          setError("Could not play audio. Please try again.");
          toast.error("Playback Error", {
            description: "Failed to play audio. The track might be temporarily unavailable.",
            duration: 5000,
          });
        }
      });
    }
  }, [isPlaying, isLoading, error]);

  const handleSkip = useCallback((dir: "next" | "prev") => {
    if (audioFiles.length === 0) return;

    let newIndex = currentIndex;
    if (dir === "next") {
      newIndex = (currentIndex + 1);
      if (newIndex >= audioFiles.length) {
        newIndex = isLooping ? 0 : currentIndex;
      }
    } else {
      newIndex = (currentIndex - 1);
      if (newIndex < 0) {
        newIndex = isLooping ? audioFiles.length - 1 : currentIndex;
      }
    }

    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
      setIsPlaying(false);
      // No need to set isLoading here, the main track loading effect will handle it.
    } else if (audioFiles.length === 1 && currentAudio) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
      setIsPlaying(true);
    }
  }, [currentIndex, audioFiles.length, isLooping, currentAudio]);


  const handleSelectChapter = useCallback((idx: number) => {
    if (idx < 0 || idx >= audioFiles.length || idx === currentIndex) {
      handlePlayPause();
      return;
    }
    setCurrentIndex(idx);
    setIsPlaying(false);
    // No need to set isLoading here, the main track loading effect will handle it.
  }, [currentIndex, audioFiles.length, handlePlayPause]);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current && !isSeeking) {
      setAudioProgress(audioRef.current.currentTime);
    }
  }, [isSeeking]);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setIsLoading(false); // Metadata loaded, can get duration
      // If we were playing, try to resume play
      if (isPlaying) { // Important: check `isPlaying` state
          audioRef.current.play().catch(e => console.error("Error resuming play after metadata:", e));
      }
    }
  }, [isPlaying]); // Depend on isPlaying to resume correctly

  const handleCanPlay = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleWaiting = useCallback(() => {
    setIsLoading(true);
  }, []);

  const handlePlaying = useCallback(() => {
    setIsLoading(false);
  }, []);

 

  const handleEnded = useCallback(() => {
    setIsPlaying(false);
    setAudioProgress(0);

    if (isLooping) {
      audioRef.current?.play().catch(() => {});
      setIsPlaying(true);
    } else {
      handleSkip("next");
    }
  }, [isLooping, handleSkip]);

  const handleVolumeChange = useCallback((value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    localStorage.setItem('audioPlayerVolume', newVolume.toString());
  }, []); // Volume is now handled by its own useEffect

  const handleMuteToggle = useCallback(() => {
    const newState = !isMuted;
    setIsMuted(newState);
    localStorage.setItem('audioPlayerMuted', newState.toString());
  }, [isMuted]); // Mute is now handled by its own useEffect

  const handleLoopToggle = useCallback(() => {
    const newState = !isLooping;
    setIsLooping(newState);
    localStorage.setItem('audioPlayerLooping', newState.toString()); // Persist loop state
  }, [isLooping]); // Loop is now handled by its own useEffect

  const handlePlaybackRateChange = useCallback((rate: number) => {
    setPlaybackRate(rate);
    localStorage.setItem('audioPlayerPlaybackRate', rate.toString());
  }, []); // Playback rate is now handled by its own useEffect

  const handleSeek = useCallback((value: number[]) => {
    const newTime = value[0];
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setAudioProgress(newTime);
    }
  }, []);

  const handleSeekStart = useCallback(() => {
    setIsSeeking(true);
  }, []);

  const handleSeekEnd = useCallback((value: number[]) => {
    setIsSeeking(false);
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setAudioProgress(value[0]);
    }
  }, []);

  // --- Keyboard Controls (for enhanced accessibility) ---
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target && ((e.target as HTMLElement).tagName === "INPUT" ||
                       (e.target as HTMLElement).tagName === "TEXTAREA" ||
                       (e.target as HTMLElement).isContentEditable)) {
        return;
      }

      switch (e.code) {
        case "Space":
          e.preventDefault();
          handlePlayPause();
          break;
        case "ArrowRight":
          e.preventDefault();
          if (audioRef.current) {
            audioRef.current.currentTime = Math.min(audioRef.current.currentTime + SEEK_STEP, duration);
          }
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (audioRef.current) {
            audioRef.current.currentTime = Math.max(audioRef.current.currentTime - SEEK_STEP, 0);
          }
          break;
        case "ArrowUp":
          e.preventDefault();
          setVolume(v => Math.min(v + 10, 100));
          break;
        case "ArrowDown":
          e.preventDefault();
          setVolume(v => Math.max(v - 10, 0));
          break;
        case "KeyN":
          e.preventDefault();
          handleSkip("next");
          break;
        case "KeyP":
          e.preventDefault();
          handleSkip("prev");
          break;
        case "KeyM":
          e.preventDefault();
          handleMuteToggle();
          break;
        case "KeyL":
          e.preventDefault();
          handleLoopToggle();
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handlePlayPause, duration, handleSkip, handleMuteToggle, handleLoopToggle, setVolume]);


  // --- Render Logic and Conditional UI ---
  if (audioFiles.length === 0) {
    return (
      <Card className="border border-gray-200 shadow-sm h-full flex items-center justify-center p-8 text-center">
        <p className="text-gray-500">No audio files available to play. Please add tracks to the playlist.</p>
      </Card>
    );
  }

  if (!currentAudio) {
    return (
      <Card className="border border-gray-200 shadow-sm h-full flex items-center justify-center p-8 text-center">
        <p className="text-gray-500">Error: Selected audio file not found. Please try refreshing.</p>
      </Card>
    );
  }

  return (
    <TooltipProvider delayDuration={300}>
      <Card className="border border-gray-200 shadow-sm h-full flex flex-col">
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onCanPlay={handleCanPlay}
          onWaiting={handleWaiting}
          onPlaying={handlePlaying}
          onEnded={handleEnded}
          preload="auto"
          aria-label="Audio Player"
        />

        <div className="relative h-64 overflow-hidden rounded-t-xl">
          <img
            src={currentAudio.cover_image_url || "https://readdy.ai/api/search-image?query=abstract%20digital%20technology%20concept%20with%20neural%20network%20visualization%2C%20professional%20AI%20machine%20learning%20illustration%20with%20blue%20and%20purple%20glowing%20nodes%20on%20dark%20background%2C%20high%20quality&width=800&height=300&seq=audiobg&orientation=landscape"}
            alt={`Cover image for ${currentAudio.title || "Audio Book"}`}
            className="w-full h-full object-cover object-top transition-opacity duration-300"
            style={{ opacity: isLoading && !error ? 0.7 : 1 }}
            onError={(e) => { (e.target as HTMLImageElement).src = "https://readdy.ai/api/search-image?query=abstract%20digital%20technology%20concept%20with%20neural%20network%20visualization%2C%20professional%20AI%20machine%20learning%20illustration%20with%20blue%20and%20purple%20glowing%20nodes%20on%20dark%20background%2C%20high%20quality&width=800&height=300&seq=audiobg&orientation=landscape"; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
            <h2 className="text-white text-2xl font-bold line-clamp-1" title={currentAudio.title}>{currentAudio.title || "Audio Book"}</h2>
            <p className="text-gray-200 text-sm">Chapter {currentIndex + 1} of {audioFiles.length}</p>
            {currentAudio.description && (
                <p className="text-gray-300 text-xs mt-1 line-clamp-2" title={currentAudio.description}>
                    {currentAudio.description}
                </p>
            )}
            {(isLoading && !error) && (
              <div className="flex items-center text-white mt-2">
                <CircularProgress size={20} color="inherit" className="mr-2" />
                <span>Loading Audio...</span>
              </div>
            )}
            {error && (
              <p className="text-red-400 mt-2 text-sm">{error}</p>
            )}
          </div>
        </div>

        <CardContent className="pt-6 flex-grow overflow-y-auto custom-scrollbar">
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Chapters</h3>
            <div className="space-y-2">
              {audioFiles.map((chapter, index) => (
                <div
                  key={chapter.segment_key || `chapter-${index}`}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors duration-200
                    ${index === currentIndex
                      ? "bg-blue-100 border border-blue-300 shadow-sm"
                      : "hover:bg-gray-100"
                    }`}
                  onClick={() => handleSelectChapter(index)}
                  tabIndex={0}
                  role="button"
                  aria-current={index === currentIndex ? "true" : undefined}
                  aria-label={
                    index === currentIndex
                      ? `Currently playing chapter ${index + 1}: ${chapter.title || `Chapter ${index + 1}`}`
                      : `Select chapter ${index + 1}: ${chapter.title || `Chapter ${index + 1}`}`
                  }
                  onKeyDown={e => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleSelectChapter(index);
                    }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center
                      ${index === currentIndex ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`}>
                      {index === currentIndex && isPlaying ? <PauseIcon fontSize="small" /> : (index === currentIndex ? <PlayCircleFilledWhiteIcon fontSize="small" /> : index + 1)}
                    </div>
                    <span className="font-medium line-clamp-1" title={chapter.title || `Chapter ${index + 1}`}>{chapter.title || `Chapter ${index + 1}`}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {formatTime(chapter.duration || 0)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t border-gray-200 pt-4">
          <div className="w-full space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">{formatTime(audioProgress)}</span>
              <Slider
                value={[audioProgress]}
                max={duration || 1}
                step={0.1}
                className="flex-1"
                onValueChange={handleSeek}
                onValueCommit={handleSeekEnd}
                onPointerDown={handleSeekStart}
                disabled={isLoading || error !== null || duration === 0}
                aria-label="Audio progress slider"
                aria-valuemin={0}
                aria-valuemax={duration}
                aria-valuenow={audioProgress}
                aria-valuetext={`Current time ${formatTime(audioProgress)} of ${formatTime(duration)}`}
              />
              <span className="text-sm text-gray-500">{formatTime(duration)}</span>
              <span className="text-xs text-gray-400 ml-2">
                -{formatTime(Math.max(0, duration - audioProgress))}
              </span>
            </div>

            <div className="flex items-center justify-center gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 !rounded-button cursor-pointer"
                    onClick={() => handleSkip("prev")}
                    disabled={audioFiles.length < 2 && !isLooping}
                    aria-label="Previous track"
                  >
                    <SkipPreviousIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Previous Track (P)</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 !rounded-button cursor-pointer"
                    onClick={() => {
                        if (audioRef.current) {
                            audioRef.current.currentTime = Math.max(audioRef.current.currentTime - SEEK_STEP, 0);
                            setAudioProgress(audioRef.current.currentTime);
                        }
                    }}
                    disabled={isLoading || error !== null || duration === 0}
                    aria-label={`Rewind ${SEEK_STEP} seconds`}
                  >
                    <FastRewindIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Rewind {SEEK_STEP}s (←)</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12 !rounded-button cursor-pointer text-blue-600 hover:text-blue-700 transition-colors"
                    onClick={handlePlayPause}
                    disabled={isLoading || error !== null || !currentAudio.s3_url}
                    aria-label={isPlaying ? "Pause audio" : "Play audio"}
                  >
                    {isLoading && !error ? <CircularProgress size={24} color="inherit" /> : (isPlaying ? <PauseIcon fontSize="large" /> : <PlayArrowIcon fontSize="large" />)}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{isPlaying ? "Pause (Space)" : "Play (Space)"}</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 !rounded-button cursor-pointer"
                    onClick={() => {
                        if (audioRef.current) {
                            audioRef.current.currentTime = Math.min(audioRef.current.currentTime + SEEK_STEP, duration);
                            setAudioProgress(audioRef.current.currentTime);
                        }
                    }}
                    disabled={isLoading || error !== null || duration === 0}
                    aria-label={`Forward ${SEEK_STEP} seconds`}
                  >
                    <FastForwardIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Forward {SEEK_STEP}s (→)</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 !rounded-button cursor-pointer"
                    onClick={() => handleSkip("next")}
                    disabled={audioFiles.length < 2 && !isLooping}
                    aria-label="Next track"
                  >
                    <SkipNextIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Next Track (N)</TooltipContent>
              </Tooltip>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="!rounded-button cursor-pointer whitespace-nowrap"
                      onClick={handleMuteToggle}
                      aria-label={isMuted ? "Unmute volume" : `Mute volume, current volume ${volume}%`}
                    >
                      {isMuted || volume === 0 ? <VolumeOffIcon className="mr-1" /> : <VolumeUpIcon className="mr-1" />}
                      {isMuted ? "Muted" : `${volume}%`}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Toggle Mute (M)</TooltipContent>
                </Tooltip>
                <Slider
                  value={[isMuted ? 0 : volume]}
                  max={100}
                  step={1}
                  className="w-24"
                  onValueChange={handleVolumeChange}
                  aria-label="Volume slider"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={isMuted ? 0 : volume}
                  aria-valuetext={isMuted ? "Volume muted" : `Volume at ${volume}%`}
                />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`!rounded-button cursor-pointer whitespace-nowrap ${isLooping ? 'bg-blue-100 text-blue-600 hover:bg-blue-200' : 'hover:bg-gray-100'}`}
                      onClick={handleLoopToggle}
                      aria-pressed={isLooping}
                      aria-label={isLooping ? "Disable loop" : "Enable loop"}
                    >
                      {isLooping ? <LoopIcon className="mr-1" /> : <LoopOffIcon className="mr-1" />}
                      {isLooping ? "Looping" : "Loop"}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Toggle Loop (L)</TooltipContent>
                </Tooltip>
                <select
                  value={playbackRate}
                  onChange={e => handlePlaybackRateChange(Number(e.target.value))}
                  className="ml-2 border rounded px-2 py-1 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  aria-label="Select playback speed"
                >
                  {PLAYBACK_SPEEDS.map(rate => (
                    <option key={rate} value={rate}>{rate}x</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="!rounded-button cursor-pointer whitespace-nowrap"
                      asChild
                      disabled={!currentAudio.s3_url}
                    >
                      <a
                        href={ currentAudio.s3_url}
                        download={currentAudio.filename || currentAudio.title ? `${currentAudio.title || currentAudio.filename}.mp3` : "audio.mp3"}
                        aria-label={`Download ${currentAudio.title || 'audio file'}`}
                      >
                        <DownloadIcon className="mr-1" /> Download
                      </a>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Download Audio</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="!rounded-button cursor-pointer whitespace-nowrap"
                      onClick={() => {
                        const urlToShare = currentAudio.s3_url;
                        if (navigator.clipboard) {
                          navigator.clipboard.writeText(urlToShare)
                            .then(() => toast.success("Link copied!", { description: "Audio link copied to clipboard.", duration: 3000 }))
                            .catch(() => toast.error("Copy Failed", { description: "Could not copy link.", duration: 3000 }));
                        } else {
                          const el = document.createElement('textarea');
                          el.value = urlToShare;
                          document.body.appendChild(el);
                          el.select();
                          document.execCommand('copy');
                          document.body.removeChild(el);
                          toast.info("Link copied!", { description: "Audio link copied to clipboard (fallback).", duration: 3000 });
                        }
                      }}
                      aria-label="Share audio link"
                      disabled={!currentAudio.s3_url}
                    >
                      <ShareIcon className="mr-1" /> Share
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Share Audio Link</TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </TooltipProvider>
  );
};

export default SoundBLOG;