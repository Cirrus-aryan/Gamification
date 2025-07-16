'use client';

import type { MusicFile } from '../learning.d';

// Import Material UI Icons
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic'; // For the main playlist icon
import PlayArrowIcon from '@mui/icons-material/PlayArrow'; // For the currently playing track
import InfoIcon from '@mui/icons-material/Info'; // For the information section

interface PlaylistSidebarProps {
  playlist: MusicFile[];
  currentTrack: MusicFile | null;
  onTrackSelect: (track: MusicFile) => void;
  language: string;
}

export default function PlaylistSidebar({
  playlist,
  currentTrack,
  onTrackSelect,
  language
}: PlaylistSidebarProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
          <LibraryMusicIcon className="text-white" fontSize="small" /> {/* Replaced ri-music-2-fill */}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Playlist</h2>
          <p className="text-sm text-gray-500">{language} • {playlist.length} tracks</p>
        </div>
      </div>

      <div className="space-y-2">
        {playlist.map((track, index) => (
          <div
            key={track.segment_key}
            onClick={() => onTrackSelect(track)}
            className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
              currentTrack?.segment_key === track.segment_key
                ? 'bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200'
                : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentTrack?.segment_key === track.segment_key
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {currentTrack?.segment_key === track.segment_key ? (
                  <PlayArrowIcon sx={{ fontSize: '1rem' }} /> 
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className={`font-medium truncate ${
                  currentTrack?.segment_key === track.segment_key
                    ? 'text-purple-700'
                    : 'text-gray-900'
                }`}>
                  {track.title}
                </h3>
                <p className="text-xs text-gray-500 truncate">{track.filename}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-100">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <InfoIcon className="text-white" fontSize="small" /> {/* Replaced ri-information-fill */}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Audio Collection</p>
            <p className="text-xs text-gray-600">High-quality streaming audio</p>
          </div>
        </div>
      </div>
    </div>
  );
}