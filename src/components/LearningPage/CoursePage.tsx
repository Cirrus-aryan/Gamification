import { useParams } from 'react-router-dom';
import CourseDetailPage from './CourseDetailPage';
import { useState,useEffect } from 'react';
import type { Course } from "./learning.d";
import axios from 'axios';

export async function generateStaticParams() {
  return [
    { id: 'course_001' },
    { id: 'course_002' },
    { id: 'course_003' },
    { id: 'course_004' },
    { id: 'course_005' },
    { id: 'course_006' },
  ];
}

export default function CoursePage() {
  const {id}=useParams();
  const [courses,setCourseData]=useState<Course>()
   async function fetchCourses(){
      try{
        const data=await axios(`${import.meta.env.VITE_BACKEND_PORT}/getcourseDetails?id=${id}`)
        setCourseData(data.data)
      }catch(e){
        console.log(e)
      }
    }
    useEffect(()=>{fetchCourses()},[])
    if(!courses)return <>Temporary Blocked</>
  return <CourseDetailPage course={courses} />;
}

