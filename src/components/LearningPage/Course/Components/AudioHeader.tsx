
// Import Material UI Icons
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic'; // For ri-music-2-fill
import LanguageIcon from '@mui/icons-material/Language'; // For ri-global-line
import GraphicEqIcon from '@mui/icons-material/GraphicEq'; // For ri-music-line, or a similar icon for streaming audio

interface AudioHeaderProps {
  availableLanguages: string[];
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

export default function AudioHeader({
  availableLanguages,
  selectedLanguage,
  onLanguageChange
}: AudioHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="w-px h-6 bg-gray-300"></div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                <LibraryMusicIcon className="text-white" fontSize="small" /> {/* Replaced ri-music-2-fill */}
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Audio Player</h1>
                <p className="text-sm text-gray-500">Multi-language audio collection</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <LanguageIcon className="text-gray-500" fontSize="small" /> {/* Replaced ri-global-line */}
              <span className="text-sm text-gray-600">Language:</span>
            </div>

            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              {availableLanguages.map((language) => (
                <button
                  key={language}
                  onClick={() => onLanguageChange(language)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                    selectedLanguage === language
                      ? 'bg-white text-purple-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {language}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <GraphicEqIcon fontSize="small" /> {/* Replaced ri-music-line */}
              <span>Streaming Audio</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}