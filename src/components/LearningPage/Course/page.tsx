'use client';

import { useEffect, useState, useCallback, useContext } from 'react';
import CourseHeader from './CourseHeader';
import CourseContent from './CourseContent';
import CourseSidebar from './CourseSidebar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import type { Course,  OrganizedCourseContent } from './learning.d'; // Ensure types are correctly imported
import { DataContext } from '@/Context/Context';

export default function CoursePages() {
  const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);
  const { id } = useParams();
  const {setreturnlink}=useContext(DataContext)
  const [course, setCourse] = useState<Course|undefined>();
  // State to track completed lessons by their moduleKey
  const [_completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [lesson,setlesson]=useState<OrganizedCourseContent>()
  // Function to fetch course data
  async function FetchCourse() {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_PORT}/StudyMaterial?id=${id}&UserId=${localStorage.getItem("userId")}`);
      setCourse(data);
      console.log("Fetched Course Data:", data); // Log the data received
      // Optionally, initialize completedLessons based on fetched data if completion status is part of the API response
      // For example, if data.data.completedModuleKeys is an array of completed keys:
      // if (data.data.completedModuleKeys) {
      //   setCompletedLessons(new Set(data.data.completedModuleKeys));
      // }
    } catch (e) {
      console.error("Error fetching course:", e); // Use console.error for errors
    }
  }
  useEffect(()=>setreturnlink(`/Learning/course/${id}/Platform`),[])

  // Fetch course data on component mount or when 'id' changes
  useEffect(() => {
    FetchCourse();
  }, [id]);

  // Get the currently selected module/lesson based on selectedModuleIndex
  // Ensure organizedCourseContent exists before accessing it

  // Log the selected module's content when it changes
  useEffect(() => {
    let currentModule;
    if(course){
        currentModule = course?.organizedCourseContent?.[selectedModuleIndex]||undefined;
        setlesson(currentModule);
      }
    if (currentModule) {
      console.log("Selected Module Content:", currentModule);
    }
  }, [course,selectedModuleIndex]);

  // Function to mark a lesson as complete
  const handleLessonComplete = useCallback((moduleKey: string) => {
    setCompletedLessons(prev => {
      const newSet = new Set(prev);
      newSet.add(moduleKey);
      // You might want to persist this completion status to your backend here
      console.log(`Lesson with moduleKey: ${moduleKey} marked as complete.`);
      return newSet;
    });
  }, []);

  // Function to navigate to the next lesson
  const handleNextLesson = useCallback(() => {
    if (course?.organizedCourseContent && selectedModuleIndex < course?.organizedCourseContent.length - 1) {
      setSelectedModuleIndex(prevIndex => prevIndex + 1);
    } else {
      console.log("No next lesson available.");
      // Optionally, show a message to the user that they've reached the end
    }
  }, [course?.organizedCourseContent, selectedModuleIndex]);

  // Function to navigate to the previous lesson
  const handlePreviousLesson = useCallback(() => {
    if (selectedModuleIndex > 0) {
      setSelectedModuleIndex(prevIndex => prevIndex - 1);
    } else {
      console.log("No previous lesson available.");
      // Optionally, show a message to the user that they're at the beginning
    }
  }, [selectedModuleIndex]);


  return course==undefined&&lesson?<>Loading ...</>:(
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <CourseHeader course={course!} />

      <div className="w-screen mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <CourseSidebar
              // Pass the Serials array directly to modules prop
              modules={course?.Serials || []} // Provide a default empty array if undefined
              selectedModule={selectedModuleIndex}
              onModuleSelect={setSelectedModuleIndex}
            />
          </div>

          <div className="lg:col-span-3">
            {/* Conditional rendering for CourseContent */}
            {lesson ? (
              <CourseContent
                lesson={lesson}
                onLessonComplete={handleLessonComplete}
                onNextLesson={handleNextLesson}
                onPreviousLesson={handlePreviousLesson}
                moduleIndex={selectedModuleIndex} // Pass the current module index
                // lessonIndex={selectedModuleIndex} // If CourseContent needs a specific lessonIndex
              />
            ) : (
              <p className="text-gray-600 text-lg text-center p-8">
                {/* Show a message if no module is selected or course data isn't loaded */}
                {course?.Serials && course?.Serials.length > 0
                  ? "Select a module from the sidebar to view its content."
                  : "Loading course content or no content available."
                }
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}