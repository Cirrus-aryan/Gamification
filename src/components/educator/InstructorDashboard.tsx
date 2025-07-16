
import { useEffect, useState } from 'react';
// Assuming these components are defined elsewhere in your project
import OverviewSection from './OverviewSection';
import CoursesSection from './CoursesSection';
import StudentsSection from './StudentsSection';
import AnalyticsSection from './AnalyticsSection';
import ContentSection from './ContentSection';
import PaymentsSection from './PaymentsSection';
import axios from 'axios';
import type { TeacherInfo } from "./instructorTypes";

// Material-UI Icons
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'; // For unverified
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

export default function InstructorDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [instructorData, setInstructorData] = useState<TeacherInfo>();

  // Function to fetch instructor data from the backend
  async function Analyzeddata() {
    try {
      // Ensure localStorage is accessed only on the client-side
      const userId = typeof window !== 'undefined' ? localStorage.getItem("userId") : null;
      if (!userId) {
        console.warn("User ID not found in localStorage.");
        return; // Exit if userId is not available
      }
      // Make API call to fetch teacher data using axios
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_PORT}/TeachersData?id=${userId}`);
      setInstructorData({...res.data.teacher_info,"coursesTaught":res.data.courses_taught});
    } catch (e) {
      console.error("Error fetching instructor data:", e); // Use console.error for errors
    }
  }

  // Fetch data on component mount
  useEffect(() => {
    Analyzeddata();
  }, []); // Empty dependency array ensures this runs once on mount

  // Define navigation tabs with their Material-UI icons
  const tabs = [
    { id: 'overview', label: 'Overview', icon: DashboardOutlinedIcon },
    { id: 'courses', label: 'My Courses', icon: BookOutlinedIcon },
    { id: 'students', label: 'Students', icon: PersonOutlineOutlinedIcon },
    { id: 'content', label: 'Content', icon: DescriptionOutlinedIcon },
    { id: 'payments', label: 'Payments', icon: CreditCardOutlinedIcon },
    { id: 'analytics', label: 'Analytics', icon: BarChartOutlinedIcon }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-inter"> {/* Added font-inter for consistency */}
      {/* Header component (assuming it's defined elsewhere) */}
      {/* <Header /> */} 

      {/* Dashboard Header Section */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6 sm:px-8 lg:px-10">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <img
                src={instructorData?.ProfilePicture || "https://placehold.co/64x64/E0E0E0/333333?text=Profile"} // Placeholder for profile picture
                alt={instructorData?.name || "Instructor Profile"}
                className="w-16 h-16 rounded-full object-cover shadow-md"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {instructorData?.name || "Instructor"}
                </h1>
                <p className="text-gray-600 text-sm">{instructorData?.Role || "Your Role"}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-4 h-4 flex items-center justify-center">
                    {instructorData?.Email_Verified ? (
                      <VerifiedOutlinedIcon className="text-green-500 text-base" />
                    ) : (
                      <HighlightOffOutlinedIcon className="text-red-500 text-base" />
                    )}
                  </div>
                  <span className="text-sm text-gray-500">
                    {instructorData?.Email_Verified ? 'Verified Account' : 'Unverified Account'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium whitespace-nowrap cursor-pointer flex items-center space-x-2 transition duration-200 ease-in-out transform hover:scale-105 shadow-md">
                <div className="w-5 h-5 flex items-center justify-center">
                  <AddOutlinedIcon className="text-white text-lg" />
                </div>
                <span>Create Course</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Section */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <nav className="flex flex-wrap justify-center sm:justify-start space-x-4 sm:space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap cursor-pointer transition duration-200 ease-in-out
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <tab.icon className="text-lg" /> {/* Render Material-UI Icon component */}
                </div>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content Area - Conditionally rendered based on activeTab */}
      {instructorData && (
        <div className="max-w-7xl mx-auto px-6 py-8 sm:px-8 lg:px-10">
          {activeTab === 'overview' && <OverviewSection instructorData={instructorData} />}
          {activeTab === 'courses' && <CoursesSection instructorData={instructorData} />}
          {activeTab === 'students' && <StudentsSection instructorData={instructorData} />}
          {activeTab === 'content' && <ContentSection instructorData={instructorData} />}
          {activeTab === 'payments' && <PaymentsSection instructorData={instructorData} />}
          {activeTab === 'analytics' && <AnalyticsSection instructorData={instructorData} />}
        </div>
      )}
    </div>
  );
}
