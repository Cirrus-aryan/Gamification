

import { useState, useRef, useEffect } from 'react';
import type { MusicFile } from '../learning';

// Import Material UI Icons
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined'; // For 'no track selected' message
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff'; // For mute
import SpeedIcon from '@mui/icons-material/Speed'; // For playback speed

interface AudioPlayerProps {
  currentTrack: MusicFile | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  playlist: MusicFile[];
}

export default function AudioPlayer({
  currentTrack,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  playlist
}: AudioPlayerProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value) / 100;
    setVolume(newVolume);
    setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    setShowSpeedMenu(false);
  };

  if (!currentTrack) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <LibraryMusicOutlinedIcon className="text-gray-400" sx={{ fontSize: '2rem' }} /> {/* Replaced ri-music-2-line */}
        </div>
        <p className="text-gray-500">No track selected</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={onNext}
        preload="metadata"
        // Ensure that the src updates when currentTrack changes
        src={currentTrack.s3_url}
      >
        Your browser does not support the audio element.
      </audio>

      <div className="relative">
        {/*
          NOTE: You are using currentTrack.s3_url for the <img> src.
          S3_url is for audio files. If you have a separate image URL for album art,
          you should use that here instead. Otherwise, this image might not display correctly
          or might try to load the audio file as an image.
          For now, I'm leaving it as is, but be mindful of this.
        */}
        <img
          src={currentTrack.s3_url}
          alt={currentTrack.title}
          className="w-full h-80 object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-3xl font-bold mb-2">{currentTrack.title}</h1>
          <p className="text-white/80">{currentTrack.filename}</p>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <span className="text-sm text-gray-500 w-12">
            {formatTime(currentTime)}
          </span>

          <div className="flex-1 relative">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleSeek}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          <span className="text-sm text-gray-500 w-12">
            {formatTime(duration)}
          </span>
        </div>

        <div className="flex items-center justify-center space-x-6 mb-6">
          <button
            onClick={onPrevious}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <SkipPreviousIcon className="text-gray-700" sx={{ fontSize: '2rem' }} /> {/* Replaced ri-skip-back-fill */}
          </button>

          <button
            onClick={onPlayPause}
            className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all cursor-pointer shadow-lg"
          >
            {isPlaying ? (
              <PauseIcon className="text-white" sx={{ fontSize: '2.5rem' }} /> // Replaced ri-pause-fill
            ) : (
              <PlayArrowIcon className="text-white" sx={{ fontSize: '2.5rem' }} /> // Replaced ri-play-fill
            )}
          </button>

          <button
            onClick={onNext}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <SkipNextIcon className="text-gray-700" sx={{ fontSize: '2rem' }} /> {/* Replaced ri-skip-forward-fill */}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleMute}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              {isMuted ? (
                <VolumeOffIcon className="text-gray-600" /> // Replaced ri-volume-mute-fill
              ) : (
                <VolumeUpIcon className="text-gray-600" /> // Replaced ri-volume-up-fill
              )}
            </button>

            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume * 100}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-gray-200 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${isMuted ? 0 : volume * 100}%, #e5e7eb ${isMuted ? 0 : volume * 100}%, #e5e7eb 100%)`
                }}
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                className="flex items-center space-x-1 px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer text-sm"
              >
                <SpeedIcon className="text-gray-600" fontSize="small" /> {/* Replaced ri-speed-fill */}
                <span className="text-gray-700 whitespace-nowrap">{playbackSpeed}x</span>
              </button>

              {showSpeedMenu && (
                <div className="absolute bottom-full mb-2 right-0 bg-white rounded-lg shadow-lg border p-2 min-w-24 z-10"> {/* Added z-10 for layering */}
                  {speedOptions.map((speed) => (
                    <button
                      key={speed}
                      onClick={() => handleSpeedChange(speed)}
                      className={`block w-full text-left px-3 py-1 rounded text-sm hover:bg-gray-100 transition-colors cursor-pointer whitespace-nowrap ${
                        playbackSpeed === speed ? 'bg-purple-100 text-purple-700' : 'text-gray-700'
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="text-sm text-gray-500">
              {playlist.length} tracks in playlist
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}