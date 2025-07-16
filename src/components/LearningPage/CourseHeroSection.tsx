// components/course/CourseHeroSection.tsx
import { Link } from 'react-router-dom';
import type { Course } from './learning.d'; // Adjust path if necessary
import { getRating, formatDuration } from './utils';
import React from 'react';

// Import Material-UI Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import GroupIcon from '@mui/icons-material/Group';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';

type CourseHeroSectionProps = {
  course: Course;
  children?: React.ReactNode;
};

export default function CourseHeroSection({ course, children }: CourseHeroSectionProps) {
  const rating = getRating(course.reviews);

  return (
    <div className="relative bg-white">
      <div className="absolute inset-0">
        <img
          src={`https://images.shiksha.com/mediadata/ugcDocuments/images/wordpressImages/2020_05_software-development-i1.jpg`}
          alt={course.title}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Course Info */}
          <div className="lg:col-span-2 text-white">
            <div className="mb-4">
              <Link to="/marketplace" className="inline-flex items-center text-white/80 hover:text-white text-sm">
                <div className="w-4 h-4 flex items-center justify-center mr-2">
                  <ArrowBackIcon fontSize="small" /> {/* Replaced ri-arrow-left-line */}
                </div>
                Back to Marketplace
              </Link>
            </div>

            <div className="mb-4">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {course.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">{course.title}</h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl">{course.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="w-8 h-8 flex items-center justify-center mb-2">
                  <StarIcon className="text-yellow-400 text-xl" /> {/* Replaced ri-star-fill */}
                </div>
                <div className="text-2xl font-bold">{rating.toFixed(1)}</div>
                <div className="text-sm text-white/80">Rating</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="w-8 h-8 flex items-center justify-center mb-2">
                  <GroupIcon className="text-blue-400 text-xl" /> {/* Replaced ri-group-line */}
                </div>
                <div className="text-2xl font-bold">{course.enrolledUsers.length.toLocaleString()}</div>
                <div className="text-sm text-white/80">Students</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="w-8 h-8 flex items-center justify-center mb-2">
                  <AccessTimeIcon className="text-green-400 text-xl" /> {/* Replaced ri-time-line */}
                </div>
                <div className="text-2xl font-bold">{formatDuration(course.duration)}</div>
                <div className="text-sm text-white/80">Duration</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="w-8 h-8 flex items-center justify-center mb-2">
                  <SignalCellularAltIcon className="text-purple-400 text-xl" /> {/* Replaced ri-signal-tower-line */}
                </div>
                <div className="text-lg font-bold">{course.difficultyLevel}</div>
                <div className="text-sm text-white/80">Level</div>
              </div>
            </div>
          </div>
          {/* Render children here */}
          <div className="lg:col-span-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}