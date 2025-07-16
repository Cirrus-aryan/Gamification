// components/course/CourseDetailPage.tsx
import { useState } from 'react';
import type { Course } from './learning.d';
import CourseHeroSection from './CourseHeroSection';
import CourseEnrollmentCard from './CourseEnrollmentCard';
import CourseTabs from './CourseTabs';
import CourseOverviewTab from './CourseOverviewTab';
import CourseCurriculumTab from './CourseCurriculumTab';
import CourseInstructorTab from './CourseInstructorTab';
import CourseEnrollmentModal from './CourseEnrollmentModal';
import Reviews from './Reviews'; // Assuming Reviews is at the components level
import { getRating } from './utils';

export default function CourseDetailPage({ course }: { course: Course }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showEnrollModal, setShowEnrollModal] = useState(false);

  const rating = getRating(course.reviews);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'ri-information-line' },
    { id: 'curriculum', label: 'Curriculum', icon: 'ri-list-check-line' },
    { id: 'instructor', label: 'Instructor', icon: 'ri-user-star-line' },
    { id: 'reviews', label: 'Reviews', icon: 'ri-star-line' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <CourseHeroSection course={course}>
        <div className="lg:col-span-1">
          <CourseEnrollmentCard course={course} onEnrollClick={() => setShowEnrollModal(true)} />
        </div>
      </CourseHeroSection>

      {/* Tabs Navigation */}
      <CourseTabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'overview' && <CourseOverviewTab course={course} />}
        {activeTab === 'curriculum' && <CourseCurriculumTab course={course} />}
        {activeTab === 'instructor' && <CourseInstructorTab instructor={course.Instructor} />}
        {activeTab === 'reviews' && <Reviews course={course} rating={rating} />}
      </div>

      {/* Enrollment Modal */}
      {showEnrollModal && (
        <CourseEnrollmentModal course={course} onClose={() => setShowEnrollModal(false)} />
      )}
    </div>
  );
}