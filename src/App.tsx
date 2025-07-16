import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Components that are always present or required for initial setup
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PrivateRoute from "@/components/Privateroute";
import PublicRoute from "@/components/Publicroute"; // Assuming PublicRoute is a wrapper like PrivateRoute
import Instructor from "./components/educator/page";

// --- Lazy-loaded Components ---
// Apply lazy loading to components that are part of specific routes
const Page = lazy(() => import("@/components/Course/CourseCreation/Page"));
const MainLayout = lazy(() => import("@/components/MainPage/page"));
const Billing = lazy(() => import("@/components/Billing/Premium-Subscription-Checkout"));
const Auth = lazy(() => import("@/components/Auth/Google-Login-Only"));
const CoursePage = lazy(() => import("@/components/LearningPage/CoursePage"));
const InteractiveGame1 = lazy(() => import("@/components/Quize"));
const InteractiveGame2 = lazy(() => import("@/components/Interactive-Game-Interface"));
const Admin = lazy(() => import("@/components/Admin/Courses-and-Leaderboard (1)"));
const Selection = lazy(() => import("@/components/Selection/Admin-and-User-Interface"));
const UserDashboard = lazy(() => import("@/components/temp/User-Dashboard---Learning-Platform"));
const MarketplacePage = lazy(() => import("@/components/LearningPage/Learning"));
const CourceCreation = lazy(() => import("@/components/Course/CourceCreation"));
const ConceptMapperGame = lazy(() => import("@/components/Interactive-Game-Interface")); // Re-importing, assuming it's the same as InteractiveGame2 based on original file names
const CoursePages = lazy(() => import("./components/LearningPage/Course/page"));


function App() {
  return (
    <Router>
      <Header />
      <Suspense fallback={<div>Loading...</div>}> {/* This fallback will show while any lazy component is loading */}
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/login" element={<PublicRoute><Auth /></PublicRoute>} />
          <Route path="/educator" element={<PrivateRoute><Instructor /></PrivateRoute>} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/course/:id" element={<PrivateRoute><CoursePage /></PrivateRoute>} />

          <Route path="/Learning/course/:id/Platform" element={<CoursePages />} />
          <Route path="/concept" element={<PrivateRoute><ConceptMapperGame /></PrivateRoute>} />
          <Route path="/UserDashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
          <Route path="/Billing" element={<PrivateRoute><Billing /></PrivateRoute>} />
          <Route path="/SelectionPage" element={<PrivateRoute><Selection /></PrivateRoute>} />
          <Route path="/CourseCreation" element={<PrivateRoute><CourceCreation /></PrivateRoute>} />
          {/* For the Course_Completion route, you're rendering two components side-by-side.
              Both will be lazy-loaded together when this route is accessed. */}
          <Route path="/Course_Completion" element={<PrivateRoute><><Page /></></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
          <Route path="/quiz" element={<PrivateRoute><InteractiveGame1 /></PrivateRoute>} />
          <Route path="/MemoryCard" element={<PrivateRoute><InteractiveGame2 /></PrivateRoute>} />
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;