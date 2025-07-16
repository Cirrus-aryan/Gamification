'use client';

import { useEffect, useState } from 'react';
import Header from './Header';
import Filter from './Filter';
import axios from 'axios';
import CourseCards from './CourseCards';

interface Instructor {
  userEmail: string;
  userName: string;
  userProfilePicture: string;
  userRole: string;
}

interface Summary {
  lang: string;
  topic: string;
}

interface FilteredOptions {
  format: string;
  extractKeyPoints: boolean;
  includeCitations: boolean;
  language_used: string;
  processingIntensity: string;
}

interface Serial {
  topic: {
    name: string;
  };
  summaries: Summary[];
  Filtered: FilteredOptions;
  audiobook: string[];
}

export interface Course {
  title: string;
  description: string;
  prerequisites: string;
  price: number;
  learningOutcomes: string;
  language: string;
  duration: number;
  difficultyLevel: string;
  currency: string;
  category: string;
  reviews: any[];
  enrolledUsers: any[];
  Instructor: Instructor;
  StartDate: number;
  Serials: Serial[];
  CourseID: string;
}
export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [courseData, setCourseData] = useState<Course[]>([]);
  

  const categories = ['all', 'Web Development', 'Data Science', 'Marketing', 'Mobile Development', 'Design', 'Cybersecurity'];
  const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced', 'Beginner to Intermediate', 'Intermediate to Advanced', 'Beginner to Advanced'];
  const languages = ['all', 'English', 'Spanish', 'French'];

  const filteredCourses = courseData.filter(course => {
    const categoryMatch = selectedCategory === 'all' || course.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'all' || course.difficultyLevel.includes(selectedDifficulty);
    const languageMatch = selectedLanguage === 'all' || course.language === selectedLanguage;
    
    return categoryMatch && difficultyMatch && languageMatch;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'duration':
        return b.duration - a.duration;
      case 'rating':
        const avgRatingA = a.reviews.reduce((sum, review) => sum + review.rating, 0) / a.reviews.length;
        const avgRatingB = b.reviews.reduce((sum, review) => sum + review.rating, 0) / b.reviews.length;
        return avgRatingB - avgRatingA;
      default: // popularity
        return b.enrolledUsers.length - a.enrolledUsers.length;
    }
  });

  const getRating = (reviews: any[]) => {
    if (reviews.length === 0) return 0;
    return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  async function fetchCourses(){
    try{
      const data=await axios.get(`${import.meta.env.VITE_BACKEND_PORT}/getcourceInfo`)
      setCourseData(data.data)
      console.log(data)
    }catch(e){
      console.log(e)
    }
  }
  useEffect(()=>{fetchCourses()},[])
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header/>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Filter 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
        categories={categories} 
        selectedDifficulty={selectedDifficulty} 
        setSelectedDifficulty={setSelectedDifficulty} 
        difficulties={difficulties} 
        selectedLanguage={selectedLanguage} 
        setSelectedLanguage={setSelectedLanguage} languages={languages} setSortBy={setSortBy} sortedCourses={sortedCourses} sortBy={sortBy} />

        {/* Course Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {sortedCourses.map((course,index) => {
            const rating = getRating(course.reviews);
            const startDate = new Date(course.StartDate).toLocaleDateString();
            
            return (
              <CourseCards key={index} course={course} formatDuration={formatDuration} rating={rating} startDate={startDate}/>
            );
          })}
        </div>

        {sortedCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <i className="ri-search-line text-4xl text-gray-300"></i>
            </div>
            <h3 className="text-xl font-medium text-gray-600 mb-2">No courses found</h3>
            <p className="text-gray-500">Try adjusting your filters to find more courses.</p>
          </div>
        )}
      </div>
    </div>
  );
}