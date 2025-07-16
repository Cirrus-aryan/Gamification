import { useState } from 'react';
import type{ TeacherInfo } from './instructorTypes';

interface ContentSectionProps {
  instructorData: TeacherInfo;
}

export default function ContentSection({ instructorData }: ContentSectionProps) {
  const [activeContentTab, setActiveContentTab] = useState('summaries');
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const contentTabs = [
    { id: 'summaries', label: 'Course Summaries', icon: 'ri-file-text-line' },
    { id: 'audio', label: 'Audio Content', icon: 'ri-music-line' },
    { id: 'processed', label: 'Processed Files', icon: 'ri-folder-line' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Course Content</h2>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium whitespace-nowrap cursor-pointer flex items-center space-x-2">
          <div className="w-5 h-5 flex items-center justify-center">
            <i className="ri-upload-line"></i>
          </div>
          <span>Upload Content</span>
        </button>
      </div>

      {/* Content Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {contentTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveContentTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap cursor-pointer ${
                  activeContentTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className={tab.icon}></i>
                </div>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Course Summaries Tab */}
          {activeContentTab === 'summaries' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {instructorData.coursesTaught?.map((course) => (
                  <div key={course._id} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">{course.title}</h4>
                    <div className="space-y-3">
                      {course.organizedCourseContent?.map((content) => (
                        <div key={content.moduleKey} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-sm">Module {content.moduleKey}</span>
                            <button 
                              onClick={() => setSelectedModule(selectedModule === content.moduleKey ? null : content.moduleKey)}
                              className="text-blue-600 hover:text-blue-800 cursor-pointer"
                            >
                              <div className="w-4 h-4 flex items-center justify-center">
                                <i className={`ri-arrow-${selectedModule === content.moduleKey ? 'up' : 'down'}-s-line`}></i>
                              </div>
                            </button>
                          </div>
                          <div className="text-xs text-gray-600 mb-2">
                            {content.summaries?.length || 0} summaries
                          </div>
                          
                          {selectedModule === content.moduleKey && (
                            <div className="space-y-2 mt-3">
                              {content.summaries?.map((summary, index) => (
                                <div key={index} className="bg-white p-3 rounded border">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-sm">{summary.name}</span>
                                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                      {summary.type}
                                    </span>
                                  </div>
                                  <div className="text-xs text-gray-600 mb-2">
                                    Language: {summary.language_used}
                                  </div>
                                  {summary.link && (
                                    <a 
                                      href={summary.link} 
                                      className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer"
                                    >
                                      View Content →
                                    </a>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Audio Content Tab */}
          {activeContentTab === 'audio' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {instructorData.coursesTaught?.map((course) => (
                  <div key={course._id} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-4">{course.title}</h4>
                    <div className="space-y-4">
                      {course.organizedCourseContent?.map((content) => (
                        <div key={content.moduleKey}>
                          {content.audioFiles?.map((audioFile, audioIndex) => (
                            <div key={audioIndex} className="bg-gray-50 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-3">
                                <span className="font-medium">Audio Module {content.moduleKey}</span>
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                  {audioFile.language}
                                </span>
                              </div>
                              <div className="space-y-2">
                                {audioFile.musicFiles?.map((musicFile, musicIndex) => (
                                  <div key={musicIndex} className="bg-white p-3 rounded border">
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <div className="font-medium text-sm">{musicFile.title}</div>
                                        <div className="text-xs text-gray-500">{musicFile.filename}</div>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <button className="text-blue-600 hover:text-blue-800 cursor-pointer">
                                          <div className="w-5 h-5 flex items-center justify-center">
                                            <i className="ri-play-circle-line"></i>
                                          </div>
                                        </button>
                                        <button className="text-green-600 hover:text-green-800 cursor-pointer">
                                          <div className="w-5 h-5 flex items-center justify-center">
                                            <i className="ri-download-line"></i>
                                          </div>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Processed Files Tab */}
          {activeContentTab === 'processed' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {instructorData.coursesTaught?.map((course) => (
                  <div key={course._id} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-4">{course.title}</h4>
                    <div className="space-y-3">
                      {course.organizedCourseContent?.map((content) => (
                        <div key={content.moduleKey} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-sm">Module {content.moduleKey}</span>
                            <span className="text-xs text-gray-600">
                              {content.processedFiles?.length || 0} files
                            </span>
                          </div>
                          
                          <div className="space-y-2">
                            {content.processedFiles?.map((file, index) => (
                              <div key={index} className="bg-white p-2 rounded border">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs font-medium">{file.format.toUpperCase()}</span>
                                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                                    {file.processingIntensity}
                                  </span>
                                </div>
                                <div className="text-xs text-gray-600">
                                  Language: {file.language_used}
                                </div>
                                <div className="flex items-center space-x-2 mt-2 text-xs">
                                  {file.extractKeyPoints && (
                                    <span className="bg-blue-100 text-blue-800 px-1 py-0.5 rounded">Key Points</span>
                                  )}
                                  {file.includeCitations && (
                                    <span className="bg-green-100 text-green-800 px-1 py-0.5 rounded">Citations</span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content Statistics */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-6">Content Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <i className="ri-file-text-line text-2xl text-blue-600"></i>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {instructorData.coursesTaught?.reduce((sum, course) => 
                sum + (course.organizedCourseContent?.reduce((moduleSum, content) => 
                  moduleSum + (content.summaries?.length || 0), 0) || 0), 0) || 0}
            </div>
            <div className="text-sm text-gray-600">Total Summaries</div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <i className="ri-music-line text-2xl text-green-600"></i>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {instructorData.coursesTaught?.reduce((sum, course) => 
                sum + (course.organizedCourseContent?.reduce((moduleSum, content) => 
                  moduleSum + (content.audioFiles?.reduce((audioSum, audio) => 
                    audioSum + (audio.musicFiles?.length || 0), 0) || 0), 0) || 0), 0) || 0}
            </div>
            <div className="text-sm text-gray-600">Audio Files</div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <i className="ri-folder-line text-2xl text-purple-600"></i>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {instructorData.coursesTaught?.reduce((sum, course) => 
                sum + (course.organizedCourseContent?.reduce((moduleSum, content) => 
                  moduleSum + (content.processedFiles?.length || 0), 0) || 0), 0) || 0}
            </div>
            <div className="text-sm text-gray-600">Processed Files</div>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <i className="ri-translate-line text-2xl text-yellow-600"></i>
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {Array.from(new Set(
                instructorData.coursesTaught?.flatMap(course => 
                  course.organizedCourseContent?.flatMap(content => 
                    content.summaries?.map(summary => summary.language_used) || []
                  ) || []
                ) || []
              )).length}
            </div>
            <div className="text-sm text-gray-600">Languages</div>
          </div>
        </div>
      </div>
    </div>
  );
}
