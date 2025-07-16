// CourseContent.tsx
import { useContext, useEffect, useState } from 'react';
import type { OrganizedCourseContent } from "./learning.d";
import SummarySection from '@/components/ProcessingPage/SummarySection';

// Import the new component
import ProcessedFileDisplay from './ProcessedFileDisplay';

// Import Material-UI Accordion components and icon
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Import Material-UI Icons (already present in your code, keeping for completeness)
import BookOpenLineIcon from '@mui/icons-material/MenuBookOutlined';
import FileTextLineIcon from '@mui/icons-material/DescriptionOutlined';
import StickyNoteLineIcon from '@mui/icons-material/StickyNote2Outlined';
import QuestionAnswerLineIcon from '@mui/icons-material/ForumOutlined';
import CheckboxMultipleLineIcon from '@mui/icons-material/CheckBoxOutlined';
import FileList3LineIcon from '@mui/icons-material/AssignmentOutlined';
import FileLineIcon from '@mui/icons-material/InsertDriveFileOutlined';
import PlayCircleLineIcon from '@mui/icons-material/PlayCircleOutline';
import CheckLineIcon from '@mui/icons-material/Check';
import FilePdfLineIcon from '@mui/icons-material/PictureAsPdfOutlined';
import ArrowLeftLineIcon from '@mui/icons-material/ArrowBack';
import ArrowRightLineIcon from '@mui/icons-material/ArrowForward';
import BookmarkLineIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkFillIcon from '@mui/icons-material/Bookmark';
import AudioPlayerPage from './AudioBook';
import { DataContext } from '@/Context/Context';
import FeedbackPage from '@/components/Feedback/page';
import Gamepage from '@/components/Course/CourseCreation/Games/Page';

export default function CourseContent({
  lesson,
  onLessonComplete,
  onNextLesson,
  onPreviousLesson,
}: { lesson: OrganizedCourseContent, onLessonComplete: (val: string) => void, onNextLesson: () => void, onPreviousLesson: () => void, moduleIndex: Number }) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');
  const [activeTab, setActiveTab] = useState('lesson');
  const [bookmarked, setBookmarked] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const {setGameSettings}=useContext(DataContext)
  // State to control which accordion panel is open
  const [expandedPanel, setExpandedPanel] = useState<string | false>(false);

  const handlePanelChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedPanel(isExpanded ? panel : false);
  };
  useEffect

  if (!lesson) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <BookOpenLineIcon className="text-4xl text-gray-300" />
        </div>
        <h3 className="text-xl font-medium text-gray-600 mb-2">Select a module to start learning</h3>
        <p className="text-gray-500">Choose any module from the sidebar to begin your learning journey.</p>
      </div>
    );
  }

  const toggleComplete = () => {
    const newCompleted = !isCompleted;
    setIsCompleted(newCompleted);
    if (newCompleted && onLessonComplete) {
      onLessonComplete(lesson.moduleKey);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    }
  };

  

  // This function is defined here because it's a utility for icons, not a hook.
  // We'll pass it down to ProcessedFileDisplay.
  const getFormatIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case 'summary': return <FileTextLineIcon className="text-blue-600" />;
      case 'notes': return <StickyNoteLineIcon className="text-blue-600" />;
      case 'qa': return <QuestionAnswerLineIcon className="text-blue-600" />;
      case 'mcqs': return <CheckboxMultipleLineIcon className="text-blue-600" />;
      case 'questionpaper': return <FileList3LineIcon className="text-blue-600" />;
      default: return <FileLineIcon className="text-blue-600" />;
    }
  };

 



  const renderLessonContent = () => {
    if (!lesson) return null;

    switch (lesson.summaries[0].type) {
      case 'Video':
      case "YoutubeUrl":
        return (
          <div className="aspect-video bg-black rounded-lg mb-6">
            <video
              src={lesson.summaries[0].link}
              controls
              className="w-full h-fit rounded-md shadow aspect-video"
              aria-label="Video content"
            >
              Sorry, your browser does not support embedded videos.
            </video>
          </div>
        );

      case 'Pdf':
        return (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6 h-[80vh]">
            <div className="flex items-center space-x-3 h-full">
              <div className="w-12 h-12 flex items-center justify-center bg-red-100 rounded-lg">
                <FilePdfLineIcon className="text-2xl text-red-600" />
              </div>
              <div className="flex-1 h-full">
                <iframe
                  src={lesson.summaries[0].link}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                  title={lesson.summaries[0].name}
                />
              </div>
            </div>
          </div>
        );

      case 'Text':
        let parsedTextContent;
        try {
          parsedTextContent = JSON.parse(lesson.summaries[0].link);
        } catch (e) {
          console.error("Failed to parse text content:", e);
          parsedTextContent = { Topic: "Error Loading Content", data: "Could not parse the text content." };
        }
        return (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <div className="prose max-w-none">
              <h1 className="text-gray-900">{parsedTextContent.Topic}</h1>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {parsedTextContent.data}
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
          <div className="w-6 h-6 flex items-center justify-center">
            <CheckLineIcon className="text-green-600" />
          </div>
          <span className="text-green-800 font-medium">Lesson completed successfully!</span>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="flex border-b overflow-x-auto">
          {['lesson', 'summary', 'processed', 'games', 'audiobooks',"feedback"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium capitalize transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'processed' ? 'Processed Files' : tab}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Lesson Content */}
          {activeTab === 'lesson' && (
            <div>
              {lesson ? (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{lesson.summaries[0].name}</h2>
                      <p className="text-gray-600 mt-2">{lesson.summaries[0].analysis_result?.mainheading}</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={toggleComplete}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                          isCompleted
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {isCompleted ? (
                          <span className="flex items-center space-x-2">
                            <CheckLineIcon />
                            <span>Completed</span>
                          </span>
                        ) : (
                          'Mark Complete'
                        )}
                      </button>
                    </div>
                  </div>

                  {renderLessonContent()}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <PlayCircleLineIcon className="text-4xl text-gray-300" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-600 mb-2">Select a lesson to start</h3>
                  <p className="text-gray-500">Choose any lesson from the module to begin learning.</p>
                </div>
              )}
            </div>
          )}

          {/* Summary Tab */}
          {activeTab === 'summary' && (
            <div className='h-screen overflow-scroll'>
              <SummarySection response={lesson.summaries[0].analysis_result?.sections || lesson.summaries[0].analysis_result} />
            </div>
          )}

          {/* Processed Files Tab - Now with Accordion */}
          {activeTab === 'processed' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Processed Files</h2>

              <div className="space-y-4 ">
                {lesson.processedFiles.map((file, index) => {
                  const panelId = `panel-${index}`; // Unique ID for each panel
                  return (
                    <Accordion
                      key={index} // Use file.id if unique, otherwise index
                      expanded={expandedPanel === panelId}
                      onChange={handlePanelChange(panelId)}
                      className="!shadow-md !rounded-lg !border !border-gray-200" // !important for Tailwind override
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`${panelId}-content`}
                        id={`${panelId}-header`}
                      >
                        <div className="flex items-center space-x-3">
                           <div className="flex items-center space-x-3">
          <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-lg">
            {getFormatIcon(file.filtersApplied.format)}
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{file.filtersApplied.format}</h4>
            <p className="text-sm text-gray-500">
              {file.filtersApplied.language_used} • {file.filtersApplied.processingIntensity} Intensity
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            {file.filtersApplied.extractKeyPoints && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                Key Points
              </span>
            )}
            {file.filtersApplied.includeCitations && (
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                Citations
              </span>
            )}
          </div>
        </div>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails>
                        {/* Render the new component for each file */}
                        <ProcessedFileDisplay
                          file={file}
                          getFormatIcon={getFormatIcon}
                        />
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </div>
            </div>
          )}
          {activeTab === 'games' && (
            <div>
        <Gamepage Analysis={[{
           key:lesson.moduleKey,
      link:lesson.summaries[0].link,
      name:lesson.summaries[0].name,
      analysis_result:lesson.summaries[0].analysis_result,
      type:lesson.summaries[0].type ,
      language:lesson.summaries[0].language_used
        }]} setGameSettings={setGameSettings}/>
            </div>
          )}
          {activeTab === 'audiobooks' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Audio Books</h2>

              <div className="space-y-4">
                <AudioPlayerPage mockAudioData={lesson.audioFiles}/>
              </div>
            </div>
          )}
          {
            activeTab ==="feedback"&&( <FeedbackPage/>)
          }
        </div>
      </div>
      {activeTab === 'lesson' && lesson && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowNotes(!showNotes)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                  showNotes ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <StickyNoteLineIcon />
                </div>
                <span>Notes</span>
              </button>

              <button
                onClick={() => setBookmarked(!bookmarked)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                  bookmarked ? 'bg-yellow-100 text-yellow-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  {bookmarked ? <BookmarkFillIcon /> : <BookmarkLineIcon />}
                </div>
                <span>{bookmarked ? 'Bookmarked' : 'Bookmark'}</span>
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={onPreviousLesson}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors whitespace-nowrap"
              >
                <div className="flex items-center space-x-2">
                  <ArrowLeftLineIcon />
                  <span>Previous</span>
                </div>
              </button>

              <button
                onClick={onNextLesson}
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap"
              >
                <div className="flex items-center space-x-2">
                  <span>Next Lesson</span>
                  <ArrowRightLineIcon />
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {showNotes && activeTab === 'lesson' && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="font-semibold text-gray-900 mb-3">My Notes</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add your notes here..."
            className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex justify-between items-center mt-3">
            <span className="text-sm text-gray-500">{notes.length} characters</span>
            <div className="space-x-2">
              <button
                onClick={() => setNotes('')}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Clear
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}