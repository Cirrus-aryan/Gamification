import React, { useState } from "react"; // Import useState
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCookie, deleteCookie } from "@/utils/cookie";
import { DataContext } from "@/Context/Auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { googleLogout } from '@react-oauth/google';

function Header() {
  const token = getCookie("accessToken");
  const navigate = useNavigate();
  const { data, setData } = React.useContext(DataContext);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  const isLoggedIn = Boolean(token && data?.userEmail); // Simplified

  const handleLogout = () => {
    deleteCookie("accessToken");
    localStorage.clear();
    setData(null);
    googleLogout();
    navigate("/login");
  };

  return (
    <div className="relative border-b border-gray-200 py-3 flex items-center justify-between px-4 z-50 bg-white"> {/* Added relative, bg-white, py-3, and z-50 */}
      {/* Logo */}
      <div>
        {/* Adjusted font sizes for responsiveness */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#36454f]">Ascendia Learning</h1>
      </div>

      {/* Desktop Navigation - Hidden on mobile */}
      <nav className="hidden md:flex items-center space-x-8">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-sm font-medium cursor-pointer ${isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-500 transition-colors"}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/marketplace"
          className={({ isActive }) =>
            `text-sm font-medium cursor-pointer ${isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-500 transition-colors"}`
          }
        >
          Learning Section
        </NavLink>
        <NavLink
          to="/CourseCreation"
          className={({ isActive }) =>
            `text-sm font-medium cursor-pointer ${isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-500 transition-colors"}`
          }
        >
          Create Course
        </NavLink>
        <NavLink
          to="/SelectionPage"
          className={({ isActive }) =>
            `text-sm font-medium cursor-pointer ${isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-500 transition-colors"}`
          }
        >
          Selection Page
        </NavLink>
      </nav>

      {/* Right section for Mobile (Hamburger/Avatar) and Desktop (Avatar/Login) */}
      <div className="flex items-center md:hidden"> {/* Visible on mobile */}
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center cursor-pointer mr-4"> {/* Added mr-4 for spacing */}
                <Avatar className="h-8 w-8">
                  <AvatarImage src={data?.userProfilePicture} />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end"> {/* Align to end for better mobile UX */}
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem onClick={handleLogout}>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link to="/login" className="text-sm font-medium text-blue-600 hover:underline mr-4"> {/* Added mr-4 */}
            Login
          </Link>
        )}
        {/* Mobile menu toggle (hamburger/close icon) */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-700 focus:outline-none"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          )}
        </button>
      </div>

      {/* Desktop Login/Avatar (Only visible on md and up) */}
      <div className="hidden md:flex items-center">
        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center cursor-pointer">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={data?.userProfilePicture} />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="text-sm font-medium">{data?.userName}</p>
                  <p className="text-xs text-slate-400">{data?.userEmail}</p>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem onClick={handleLogout}>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link to="/login" className="text-sm font-medium text-blue-600 hover:underline">
            Login
          </Link>
        )}
      </div>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 flex flex-col items-center py-8 animate-fade-in"> {/* Added animate-fade-in */}
          <div className="w-full flex justify-end px-4 mb-8">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-700 focus:outline-none"
              aria-label="Close menu"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <nav className="flex flex-col space-y-6 text-xl"> {/* Larger text for mobile menu for better tap target */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-medium cursor-pointer ${isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-500"}`
              }
              onClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
            >
              Home
            </NavLink>
            <NavLink
              to="/Learning"
              className={({ isActive }) =>
                `font-medium cursor-pointer ${isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-500"}`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Learning Section
            </NavLink>
            <NavLink
              to="/CourseCreation"
              className={({ isActive }) =>
                `font-medium cursor-pointer ${isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-500"}`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Create Course
            </NavLink>
            <NavLink
              to="/SelectionPage"
              className={({ isActive }) =>
                `font-medium cursor-pointer ${isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-500"}`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Selection Page
            </NavLink>
          </nav>
        </div>
      )}
    </div>
  );
}

export default Header;