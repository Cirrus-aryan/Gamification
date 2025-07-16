'use client';

import { useState } from 'react';
// Material-UI Icons for the sidebar items
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'; // For general file
import NotesOutlinedIcon from '@mui/icons-material/NotesOutlined'; // For summary/notes format
import QuizIcon from '@mui/icons-material/Quiz';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined'; // For question paper
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined'; // For audiobook
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
// Shadcn UI Components
import { Button } from '@/components/ui/button'; // Still needed for other buttons
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'; // Import Collapsible components

// Re-using interfaces from your models.py translation (or learning.d.ts)
// Ensure these paths are correct based on your project structure
import type { CourseSerial, FilteredOptions } from './learning'; // Assuming CourseSerial and FilteredOptions are in learning.d.ts

interface CourseSidebarProps {
  modules: CourseSerial[];
  selectedModule: number;
  onModuleSelect: (index: number) => void;
}

export default function CourseSidebar({
  modules,
  selectedModule,
  onModuleSelect,
}: CourseSidebarProps) {
  // Change state to hold only the index of the currently expanded module, or null if none
  const [expandedModuleIndex, setExpandedModuleIndex] = useState<number | null>(selectedModule);

  // Helper function to get Material-UI icon component based on format string
  const getFormatIconComponent = (format: string) => {
    switch (format.toLowerCase()) {
      case 'summary': return NotesOutlinedIcon;
      case 'notes': return NotesOutlinedIcon;
      case 'qa': return QuizIcon;
      case 'mcqs': return QuizOutlinedIcon;
      case 'questionpaper': return AssignmentOutlinedIcon;
      case 'paper': return AssignmentOutlinedIcon;
      default: return DescriptionOutlinedIcon;
    }
  };

  const toggleModule = (moduleIndex: number) => {
    // If the clicked module is already expanded, close it (set to null)
    // Otherwise, expand the clicked module
    setExpandedModuleIndex(prevIndex => (prevIndex === moduleIndex ? null : moduleIndex));
  };

  const handleModuleClick = (moduleIndex: number) => {
    onModuleSelect(moduleIndex);
    // When a module is clicked, also expand it (accordion behavior)
    setExpandedModuleIndex(moduleIndex);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border h-full">
      <div className="p-4">
        <h3 className="font-semibold text-gray-900">Course Content</h3>
        <p className="text-sm text-gray-500 mt-1">{modules.length} modules</p>
      </div>
      <Separator className="my-0" /> {/* Using Shadcn Separator */}

      <ScrollArea className="h-[600px]"> {/* Using Shadcn ScrollArea */}
        {modules.map((module, moduleIndex) => {
          // Determine if the current module is expanded based on the single state variable
          const isExpanded = expandedModuleIndex === moduleIndex;

          return (
            <Collapsible
              key={moduleIndex}
              open={isExpanded}
              // onOpenChange is now handled by toggleModule, which manages the single expanded state
              onOpenChange={() => toggleModule(moduleIndex)}
              className="border-b last:border-b-0"
            >
              <div className="flex">
                <Button
                  variant="ghost" // Use ghost variant for a subtle button
                  onClick={() => handleModuleClick(moduleIndex)}
                  className={`flex-1 justify-start px-4 py-3 h-auto text-left hover:bg-gray-50 transition-colors ${
                    selectedModule === moduleIndex ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">{module.topic.name}</h4>
                    </div>
                  </div>
                </Button>

                {/* CollapsibleTrigger directly renders a native button */}
                <CollapsibleTrigger asChild>
                  <button
                    className="px-3 py-3 h-auto hover:bg-gray-50 transition-colors flex items-center justify-center"
                    // Apply button-like styles directly if needed, or rely on parent flex for alignment
                  >
                    {isExpanded ? (
                      <ExpandMoreIcon className="text-gray-400 transition-transform duration-200" />
                    ) : (
                      <ChevronRightIcon className="text-gray-400 transition-transform duration-200" />
                    )}
                  </button>
                </CollapsibleTrigger>
              </div>
              <Separator className="my-0" /> {/* Using Shadcn Separator */}

              <CollapsibleContent> {/* Wrap expandable content with CollapsibleContent */}
                <div className="bg-gray-50 p-4 space-y-3">
                  {/* Display Summaries */}
                  {module.summaries?.length > 0 && (
                    <div>
                      <h5 className="text-sm font-semibold text-gray-700 mb-2">Summaries:</h5>
                      <ul className="space-y-1">
                        {module.summaries.map((summary, sIdx) => (
                          <li key={sIdx} className="flex items-center text-sm text-gray-600">
                            <NotesOutlinedIcon sx={{ fontSize: 16, mr: 1 }} />
                            <span>{summary.topic} ({summary.lang})</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Display Filtered Content */}
                  {module.Filtered?.length > 0 && (
                    <div>
                      <h5 className="text-sm font-semibold text-gray-700 mb-2">Processed Formats:</h5>
                      <ul className="space-y-1">
                        {module.Filtered.map((filtered: FilteredOptions, fIdx) => {
                          const IconComponent = getFormatIconComponent(filtered.format);
                          return (
                            <li key={fIdx} className="flex items-center text-sm text-gray-600">
                              <IconComponent sx={{ fontSize: 16, mr: 1 }} />
                              <span>{filtered.format} ({filtered.language_used})</span>
                              {filtered.extractKeyPoints && (
                                <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
                                  Key Points
                                </Badge>
                              )}
                              {filtered.includeCitations && (
                                <Badge variant="secondary" className="ml-1 bg-purple-100 text-purple-800">
                                  Citations
                                </Badge>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                  {/* Display Audiobooks */}
                  {module.audiobook?.length > 0 && (
                    <div>
                      <h5 className="text-sm font-semibold text-gray-700 mb-2">Audiobooks:</h5>
                      <ul className="space-y-1">
                        {module.audiobook.map((lang, aIdx) => (
                          <li key={aIdx} className="flex items-center text-sm text-gray-600">
                            <HeadsetMicOutlinedIcon sx={{ fontSize: 16, mr: 1 }} />
                            <span>{lang}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Message if no content types are available for the module */}
                  {!module.summaries?.length && !module.Filtered?.length && !module.audiobook?.length && (
                    <p className="text-sm text-gray-500">No detailed content available for this module.</p>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </ScrollArea>

      {/* Quick Actions */}
      <div className="p-4 border-t bg-gray-50">
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-900">
            <BookmarkBorderOutlinedIcon className="mr-2 h-4 w-4" />
            <span>My Bookmarks</span>
          </Button>

          <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-900">
            <HelpOutlineOutlinedIcon className="mr-2 h-4 w-4" />
            <span>Ask Question</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
