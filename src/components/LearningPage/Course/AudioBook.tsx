
'use client';

import { useState, useEffect } from 'react';
import AudioPlayer from '@/components/LearningPage/Course/Components/AudioPlayer';
import PlaylistSidebar from '@/components/LearningPage/Course/Components/PlaylistSidebar';
import AudioHeader from '@/components/LearningPage/Course/Components/AudioHeader';

export interface MusicFile {
  title: string;
  filename: string;
  s3_url: string;
  segment_key: string;
}

interface AudioFile {
  musicFiles: MusicFile[];
  language: string;
}

export default function AudioPlayerPage({mockAudioData}:{mockAudioData:AudioFile[]}) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('english');
  const [currentTrack, setCurrentTrack] = useState<MusicFile | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState<MusicFile[]>([]);

  useEffect(() => {
    const defaultPlaylist = mockAudioData.find(item => item.language.toLowerCase() === selectedLanguage);
    console.log(defaultPlaylist)
    if (defaultPlaylist && defaultPlaylist.musicFiles.length > 0) {
      setCurrentPlaylist(defaultPlaylist.musicFiles);
      if (!currentTrack) {
        setCurrentTrack(defaultPlaylist.musicFiles[0]);
      }
    }
  }, [selectedLanguage]);
  useEffect(()=>{console.log(mockAudioData)},[])
  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setIsPlaying(false);
    const newPlaylist = mockAudioData.find(item => item.language === language);
    if (newPlaylist && newPlaylist.musicFiles.length > 0) {
      setCurrentPlaylist(newPlaylist.musicFiles);
      setCurrentTrack(newPlaylist.musicFiles[0]);
    }
  };

  const handleTrackSelect = (track: MusicFile) => {
    setCurrentTrack(track);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (currentTrack && currentPlaylist.length > 0) {
      const currentIndex = currentPlaylist.findIndex(track => track.segment_key === currentTrack.segment_key);
      const nextIndex = (currentIndex + 1) % currentPlaylist.length;
      setCurrentTrack(currentPlaylist[nextIndex]);
    }
  };

  const handlePrevious = () => {
    if (currentTrack && currentPlaylist.length > 0) {
      const currentIndex = currentPlaylist.findIndex(track => track.segment_key === currentTrack.segment_key);
      const prevIndex = currentIndex === 0 ? currentPlaylist.length - 1 : currentIndex - 1;
      setCurrentTrack(currentPlaylist[prevIndex]);
    }
  };

  const availableLanguages = mockAudioData.map(item => item.language);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <AudioHeader 
        availableLanguages={availableLanguages}
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleLanguageChange}
      />
      
      <div className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 overflow-scroll h-[70vh]">
              <PlaylistSidebar
                playlist={currentPlaylist}
                currentTrack={currentTrack}
                onTrackSelect={handleTrackSelect}
                language={selectedLanguage}
              />
            </div>
            
            <div className="lg:col-span-3">
              <AudioPlayer
                currentTrack={currentTrack}
                isPlaying={isPlaying}
                onPlayPause={handlePlayPause}
                onNext={handleNext}
                onPrevious={handlePrevious}
                playlist={currentPlaylist}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
