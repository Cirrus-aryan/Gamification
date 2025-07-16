// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState} from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs,  TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const App: React.FC = () => {
  // Current date and calendar state
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('month');
  const [searchQuery, setSearchQuery] = useState('');
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Event form state
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    course: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    location: '',
    category: '',
    reminder: false
  });

  // Mock data for events
  interface Event {
    id: number;
    title: string;
    description: string;
    course: string;
    start: Date;
    end: Date;
    location: string;
    category: string;
    reminder: boolean;
    priority: 'low' | 'medium' | 'high';
  }

  const eventCategories = [
    { id: 'course', name: 'Course Sessions', color: 'bg-blue-500' },
    { id: 'assignment', name: 'Assignments', color: 'bg-amber-500' },
    { id: 'exam', name: 'Exams', color: 'bg-red-500' },
    { id: 'study', name: 'Study Group', color: 'bg-green-500' },
    { id: 'other', name: 'Other', color: 'bg-purple-500' },
  ];

  const events: Event[] = [
    {
      id: 1,
      title: 'Advanced Web Development Lecture',
      description: 'Interactive session on JavaScript Promises and async/await patterns',
      course: 'Advanced Web Development',
      start: new Date(2025, 6, 5, 10, 0),
      end: new Date(2025, 6, 5, 12, 0),
      location: 'Online - Zoom',
      category: 'course',
      reminder: true,
      priority: 'medium'
    },
    {
      id: 2,
      title: 'JavaScript Final Project Deadline',
      description: 'Submit your final project for the Advanced Web Development course',
      course: 'Advanced Web Development',
      start: new Date(2025, 6, 10, 23, 59),
      end: new Date(2025, 6, 10, 23, 59),
      location: 'Online Submission',
      category: 'assignment',
      reminder: true,
      priority: 'high'
    },
    {
      id: 3,
      title: 'UX/UI Design Workshop',
      description: 'Hands-on workshop on creating user personas and wireframes',
      course: 'UX/UI Design Fundamentals',
      start: new Date(2025, 6, 8, 14, 0),
      end: new Date(2025, 6, 8, 16, 0),
      location: 'Design Lab - Room 302',
      category: 'course',
      reminder: true,
      priority: 'medium'
    },
    {
      id: 4,
      title: 'Data Science Mid-term Exam',
      description: 'Covers Python basics, data manipulation with Pandas, and visualization',
      course: 'Data Science with Python',
      start: new Date(2025, 6, 15, 9, 0),
      end: new Date(2025, 6, 15, 11, 0),
      location: 'Online Proctored Exam',
      category: 'exam',
      reminder: true,
      priority: 'high'
    },
    {
      id: 5,
      title: 'Business Leadership Case Study Discussion',
      description: 'Group analysis of the quarterly business cases',
      course: 'Business Leadership',
      start: new Date(2025, 6, 7, 15, 30),
      end: new Date(2025, 6, 7, 17, 0),
      location: 'Business School - Room 105',
      category: 'course',
      reminder: false,
      priority: 'medium'
    },
    {
      id: 6,
      title: 'Study Group: Python Data Structures',
      description: 'Collaborative study session on advanced Python data structures',
      course: 'Data Science with Python',
      start: new Date(2025, 6, 12, 18, 0),
      end: new Date(2025, 6, 12, 20, 0),
      location: 'Library - Study Room 3',
      category: 'study',
      reminder: true,
      priority: 'low'
    },
    {
      id: 7,
      title: 'User Persona Assignment Due',
      description: 'Submit your user personas for the e-commerce project',
      course: 'UX/UI Design Fundamentals',
      start: new Date(2025, 6, 8, 23, 59),
      end: new Date(2025, 6, 8, 23, 59),
      location: 'Online Submission',
      category: 'assignment',
      reminder: true,
      priority: 'high'
    },
    {
      id: 8,
      title: 'Web Development Office Hours',
      description: 'Get help with your JavaScript projects and assignments',
      course: 'Advanced Web Development',
      start: new Date(2025, 6, 9, 13, 0),
      end: new Date(2025, 6, 9, 15, 0),
      location: 'Online - Zoom',
      category: 'course',
      reminder: false,
      priority: 'low'
    },
    {
      id: 9,
      title: 'Career Services Workshop',
      description: 'Resume building and interview preparation for tech roles',
      course: 'Other',
      start: new Date(2025, 6, 18, 11, 0),
      end: new Date(2025, 6, 18, 12, 30),
      location: 'Career Center - Room 201',
      category: 'other',
      reminder: true,
      priority: 'medium'
    }
  ];

  // Calendar generation functions
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    if (!date) return [];
    
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear() &&
        (categoryFilter === 'all' || event.category === categoryFilter)
      );
    });
  };


  const getUpcomingEvents = () => {
    const now = new Date();
    return events
      .filter(event => event.start >= now)
      .sort((a, b) => a.start.getTime() - b.start.getTime())
      .slice(0, 5);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleCreateEvent = () => {
    setShowEventDialog(true);
  };

  const handleCloseEventDialog = () => {
    setShowEventDialog(false);
    setNewEvent({
      title: '',
      description: '',
      course: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      location: '',
      category: '',
      reminder: false
    });
  };

  const getCategoryColor = (categoryId: string) => {
    const category = eventCategories.find(cat => cat.id === categoryId);
    return category ? category.color : 'bg-gray-500';
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <i className="fa-solid fa-graduation-cap text-indigo-600 text-2xl"></i>
            <h1 className="text-xl font-bold text-indigo-600">LearnHub</h1>
          </div>
        </div>
        {/* User Profile */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20person%20with%20a%20friendly%20smile%2C%20neutral%20background%2C%20high%20quality%20portrait%20photograph%2C%20clean%20minimal%20style&width=100&height=100&seq=10&orientation=squarish" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-xs text-gray-500">Premium Member</p>
            </div>
          </div>
        </div>
        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            <li>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer">
                <i className="fa-solid fa-chart-line w-5 text-center"></i>
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer">
                <i className="fa-solid fa-book w-5 text-center"></i>
                <span>My Courses</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer">
                <i className="fa-solid fa-chart-simple w-5 text-center"></i>
                <span>Progress</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer">
                <i className="fa-solid fa-clipboard-list w-5 text-center"></i>
                <span>Assignments</span>
              </a>
            </li>
            <li>
              <a href="https://readdy.ai/home/384eec86-e7cc-4f56-82b6-4e6caaa1d74d/4c918d81-92db-424c-809c-2575bc35370c" data-readdy="true" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-indigo-50 text-indigo-600 font-medium cursor-pointer">
                <i className="fa-solid fa-calendar w-5 text-center"></i>
                <span>Calendar</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer">
                <i className="fa-solid fa-message w-5 text-center"></i>
                <span>Messages</span>
                <Badge className="ml-auto bg-indigo-600 hover:bg-indigo-700">3</Badge>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer">
                <i className="fa-solid fa-gear w-5 text-center"></i>
                <span>Settings</span>
              </a>
            </li>
          </ul>
        </nav>
        {/* Help Section */}
        <div className="p-4 border-t border-gray-200">
          <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer">
            <i className="fa-solid fa-circle-question w-5 text-center"></i>
            <span>Help & Support</span>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <a href="https://readdy.ai/home/384eec86-e7cc-4f56-82b6-4e6caaa1d74d/4c918d81-92db-424c-809c-2575bc35370c" data-readdy="true" className="text-indigo-600 hover:text-indigo-800 cursor-pointer">
              <i className="fa-solid fa-arrow-left mr-2"></i>
              Back to Dashboard
            </a>
            <Separator orientation="vertical" className="h-6" />
            <h1 className="text-2xl font-bold">Learning Calendar</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search events..."
                className="w-64 pl-10 pr-4 py-2 rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <i className="fa-solid fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
            <Button onClick={handleCreateEvent} className="!rounded-button whitespace-nowrap cursor-pointer">
              <i className="fa-solid fa-plus mr-2"></i>
              Create Event
            </Button>
          </div>
        </header>

        {/* Calendar Controls */}
        <div className="bg-white border-b border-gray-200 px-6 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={handlePrevMonth}
                  className="!rounded-button cursor-pointer"
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </Button>
                <h2 className="text-xl font-semibold">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={handleNextMonth}
                  className="!rounded-button cursor-pointer"
                >
                  <i className="fa-solid fa-chevron-right"></i>
                </Button>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setCurrentDate(new Date())}
                className="!rounded-button whitespace-nowrap cursor-pointer"
              >
                Today
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Tabs 
                defaultValue="month" 
                value={viewMode}
                onValueChange={(value) => setViewMode(value as 'day' | 'week' | 'month')}
                className="w-auto"
              >
                <TabsList>
                  <TabsTrigger value="day" className="cursor-pointer">Day</TabsTrigger>
                  <TabsTrigger value="week" className="cursor-pointer">Week</TabsTrigger>
                  <TabsTrigger value="month" className="cursor-pointer">Month</TabsTrigger>
                </TabsList>
              </Tabs>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px] !rounded-button">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {eventCategories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      <div className="flex items-center space-x-2">
                        <span className={`w-3 h-3 rounded-full ${category.color}`}></span>
                        <span>{category.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Main Calendar Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Calendar Grid */}
          <div className="flex-1 overflow-auto">
            <ScrollArea className="h-full">
              <div className="p-6">
                {viewMode === 'month' && (
                  <div className="bg-white rounded-lg shadow">
                    {/* Calendar Header - Days of Week */}
                    <div className="grid grid-cols-7 text-center py-2 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                        <div key={index} className="font-medium text-gray-500">
                          {day}
                        </div>
                      ))}
                    </div>
                    
                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 auto-rows-fr">
                      {generateCalendarDays().map((day, index) => {
                        if (!day) {
                          return <div key={`empty-${index}`} className="min-h-[120px] p-2 border-b border-r border-gray-200 bg-gray-50"></div>;
                        }
                        
                        const dayEvents = getEventsForDate(day);
                        const isCurrentDay = isToday(day);
                        const isSelected = selectedDate && 
                          day.getDate() === selectedDate.getDate() && 
                          day.getMonth() === selectedDate.getMonth() && 
                          day.getFullYear() === selectedDate.getFullYear();
                        
                        return (
                          <div 
                            key={`day-${index}`} 
                            className={`min-h-[120px] p-2 border-b border-r border-gray-200 ${
                              isCurrentDay ? 'bg-indigo-50' : ''
                            } ${
                              isSelected ? 'ring-2 ring-indigo-500 ring-inset' : ''
                            } hover:bg-gray-50 cursor-pointer transition-colors`}
                            onClick={() => handleDateClick(day)}
                          >
                            <div className="flex justify-between items-start">
                              <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${
                                isCurrentDay ? 'bg-indigo-600 text-white' : ''
                              } ${
                                day.getMonth() !== currentDate.getMonth() ? 'text-gray-400' : 'text-gray-700'
                              }`}>
                                {day.getDate()}
                              </span>
                              {dayEvents.length > 0 && (
                                <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
                                  {dayEvents.length}
                                </Badge>
                              )}
                            </div>
                            <div className="mt-1 space-y-1 max-h-[80px] overflow-hidden">
                              {dayEvents.slice(0, 3).map(event => (
                                <div 
                                  key={event.id}
                                  className={`px-2 py-1 text-xs rounded truncate ${getCategoryColor(event.category)} bg-opacity-20 border-l-2 ${getCategoryColor(event.category)} cursor-pointer`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEventClick(event);
                                  }}
                                >
                                  {formatTime(event.start)} {event.title}
                                </div>
                              ))}
                              {dayEvents.length > 3 && (
                                <div className="text-xs text-gray-500 pl-2">
                                  + {dayEvents.length - 3} more
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {viewMode === 'week' && (
                  <div className="bg-white rounded-lg shadow">
                    {/* Week view header */}
                    <div className="grid grid-cols-8 text-center py-2 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                      <div className="font-medium text-gray-500">Time</div>
                      {Array.from({ length: 7 }).map((_, i) => {
                        const date = new Date(currentDate);
                        const firstDayOfWeek = currentDate.getDate() - currentDate.getDay();
                        date.setDate(firstDayOfWeek + i);
                        
                        return (
                          <div key={i} className="font-medium text-gray-500">
                            <div>{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i]}</div>
                            <div className={`text-sm ${isToday(date) ? 'bg-indigo-600 text-white rounded-full w-7 h-7 flex items-center justify-center mx-auto' : ''}`}>
                              {date.getDate()}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Week view grid */}
                    <div className="overflow-y-auto max-h-[calc(100vh-250px)]">
                      {Array.from({ length: 12 }).map((_, hour) => {
                        const displayHour = hour + 8; // Start at 8 AM
                        return (
                          <div key={hour} className="grid grid-cols-8 border-b border-gray-200">
                            <div className="p-2 text-xs text-gray-500 border-r border-gray-200">
                              {displayHour}:00
                            </div>
                            {Array.from({ length: 7 }).map((_, day) => {
                              const date = new Date(currentDate);
                              const firstDayOfWeek = currentDate.getDate() - currentDate.getDay();
                              date.setDate(firstDayOfWeek + day);
                              date.setHours(displayHour, 0, 0, 0);
                              
                              // Find events that occur during this hour
                              const hourEvents = events.filter(event => {
                                const eventDate = new Date(event.start);
                                return (
                                  eventDate.getDate() === date.getDate() &&
                                  eventDate.getMonth() === date.getMonth() &&
                                  eventDate.getFullYear() === date.getFullYear() &&
                                  eventDate.getHours() === displayHour &&
                                  (categoryFilter === 'all' || event.category === categoryFilter)
                                );
                              });
                              
                              return (
                                <div 
                                  key={day} 
                                  className="p-1 min-h-[60px] border-r border-gray-200 hover:bg-gray-50 cursor-pointer"
                                >
                                  {hourEvents.map(event => (
                                    <div 
                                      key={event.id}
                                      className={`px-2 py-1 text-xs rounded truncate ${getCategoryColor(event.category)} bg-opacity-20 border-l-2 ${getCategoryColor(event.category)} cursor-pointer mb-1`}
                                      onClick={() => handleEventClick(event)}
                                    >
                                      {formatTime(event.start)} {event.title}
                                    </div>
                                  ))}
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {viewMode === 'day' && (
                  <div className="bg-white rounded-lg shadow">
                    {/* Day view header */}
                    <div className="text-center py-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                      <h3 className="font-semibold text-lg">
                        {currentDate.toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          month: 'long', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </h3>
                    </div>
                    
                    {/* Day view grid */}
                    <div className="overflow-y-auto max-h-[calc(100vh-250px)]">
                      {Array.from({ length: 14 }).map((_, hour) => {
                        const displayHour = hour + 8; // Start at 8 AM
                        const currentHourDate = new Date(currentDate);
                        currentHourDate.setHours(displayHour, 0, 0, 0);
                        
                        // Find events that occur during this hour
                        const hourEvents = events.filter(event => {
                          const eventDate = new Date(event.start);
                          return (
                            eventDate.getDate() === currentDate.getDate() &&
                            eventDate.getMonth() === currentDate.getMonth() &&
                            eventDate.getFullYear() === currentDate.getFullYear() &&
                            eventDate.getHours() === displayHour &&
                            (categoryFilter === 'all' || event.category === categoryFilter)
                          );
                        });
                        
                        return (
                          <div key={hour} className="flex border-b border-gray-200">
                            <div className="p-2 w-20 text-sm text-gray-500 border-r border-gray-200 flex-shrink-0">
                              {displayHour}:00
                            </div>
                            <div className="flex-1 p-1 min-h-[80px] hover:bg-gray-50 cursor-pointer">
                              {hourEvents.length === 0 ? (
                                <div className="h-full w-full"></div>
                              ) : (
                                hourEvents.map(event => (
                                  <div 
                                    key={event.id}
                                    className={`px-3 py-2 text-sm rounded-md ${getCategoryColor(event.category)} bg-opacity-20 border-l-3 ${getCategoryColor(event.category)} cursor-pointer mb-1`}
                                    onClick={() => handleEventClick(event)}
                                  >
                                    <div className="font-medium">{event.title}</div>
                                    <div className="text-xs text-gray-600">
                                      {formatTime(event.start)} - {formatTime(event.end)} • {event.location}
                                    </div>
                                  </div>
                                ))
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Right Sidebar */}
          <div className="w-80 border-l border-gray-200 bg-white flex flex-col">
            {/* Selected Date Events */}
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-lg">
                {selectedDate ? formatDate(selectedDate) : "Today's Schedule"}
              </h3>
              <p className="text-sm text-gray-500">
                {selectedDate ? `${getEventsForDate(selectedDate).length} events` : `${getEventsForDate(new Date()).length} events`}
              </p>
            </div>
            
            <ScrollArea className="flex-1">
              <div className="p-4">
                {(selectedDate ? getEventsForDate(selectedDate) : getEventsForDate(new Date())).length > 0 ? (
                  <div className="space-y-3">
                    {(selectedDate ? getEventsForDate(selectedDate) : getEventsForDate(new Date())).map(event => (
                      <Card 
                        key={event.id} 
                        className="p-3 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => handleEventClick(event)}
                      >
                        <div className="flex items-start space-x-2">
                          <div className={`w-1 self-stretch rounded-full ${getCategoryColor(event.category)}`}></div>
                          <div className="flex-1">
                            <h4 className="font-medium">{event.title}</h4>
                            <p className="text-sm text-gray-600">{event.course}</p>
                            <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                              <i className="fa-regular fa-clock"></i>
                              <span>{formatTime(event.start)} - {formatTime(event.end)}</span>
                            </div>
                            <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                              <i className="fa-solid fa-location-dot"></i>
                              <span>{event.location}</span>
                            </div>
                            {event.priority === 'high' && (
                              <Badge className="mt-2 bg-red-100 text-red-800 hover:bg-red-200">
                                High Priority
                              </Badge>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                      <i className="fa-regular fa-calendar text-gray-400 text-2xl"></i>
                    </div>
                    <h4 className="font-medium text-gray-700">No events scheduled</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {selectedDate ? "There are no events scheduled for this day" : "There are no events scheduled for today"}
                    </p>
                    <Button 
                      onClick={handleCreateEvent} 
                      className="mt-4 !rounded-button whitespace-nowrap cursor-pointer"
                    >
                      <i className="fa-solid fa-plus mr-2"></i>
                      Create Event
                    </Button>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            {/* Upcoming Events Section */}
            <div className="p-4 border-t border-gray-200">
              <h3 className="font-semibold mb-3">Upcoming Events</h3>
              <div className="space-y-2">
                {getUpcomingEvents().map(event => (
                  <div 
                    key={event.id}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleEventClick(event)}
                  >
                    <div className={`w-2 h-2 rounded-full ${getCategoryColor(event.category)}`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{event.title}</p>
                      <p className="text-xs text-gray-500">
                        {formatDate(event.start)} • {formatTime(event.start)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Category Legend */}
            <div className="p-4 border-t border-gray-200">
              <h3 className="font-semibold mb-3">Categories</h3>
              <div className="space-y-2">
                {eventCategories.map(category => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <span className={`w-3 h-3 rounded-full ${category.color}`}></span>
                    <span className="text-sm">{category.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Details Dialog */}
      {selectedEvent && (
        <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{selectedEvent.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-center space-x-2">
                <Badge className={`${getCategoryColor(selectedEvent.category)} bg-opacity-20 text-gray-800`}>
                  {eventCategories.find(cat => cat.id === selectedEvent.category)?.name}
                </Badge>
                {selectedEvent.priority === 'high' && (
                  <Badge className="bg-red-100 text-red-800">
                    High Priority
                  </Badge>
                )}
              </div>
              
              <p className="text-sm text-gray-700">{selectedEvent.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-3 text-sm">
                  <i className="fa-solid fa-book-open text-gray-400 w-5"></i>
                  <span>{selectedEvent.course}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <i className="fa-regular fa-calendar text-gray-400 w-5"></i>
                  <span>{formatDate(selectedEvent.start)}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <i className="fa-regular fa-clock text-gray-400 w-5"></i>
                  <span>{formatTime(selectedEvent.start)} - {formatTime(selectedEvent.end)}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <i className="fa-solid fa-location-dot text-gray-400 w-5"></i>
                  <span>{selectedEvent.location}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <i className="fa-solid fa-bell text-gray-400 w-5"></i>
                  <span>{selectedEvent.reminder ? 'Reminder set' : 'No reminder'}</span>
                </div>
              </div>
            </div>
            <DialogFooter className="flex justify-between">
              <div>
                <Button variant="outline" className="!rounded-button whitespace-nowrap cursor-pointer">
                  <i className="fa-solid fa-pen-to-square mr-2"></i>
                  Edit
                </Button>
              </div>
              <div className="space-x-2">
                <Button variant="outline" className="!rounded-button whitespace-nowrap cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50">
                  <i className="fa-solid fa-trash-can mr-2"></i>
                  Delete
                </Button>
                <Button className="!rounded-button whitespace-nowrap cursor-pointer" onClick={() => setSelectedEvent(null)}>
                  Close
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Create Event Dialog */}
      <Dialog open={showEventDialog} onOpenChange={handleCloseEventDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  Event Title
                </label>
                <Input
                  id="title"
                  placeholder="Enter event title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  placeholder="Enter event description"
                  className="w-full rounded-md border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-indigo-500"
                  rows={3}
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                />
              </div>
              
              <div>
                <label htmlFor="course" className="block text-sm font-medium mb-1">
                  Associated Course
                </label>
                <Select
                  value={newEvent.course}
                  onValueChange={(value) => setNewEvent({...newEvent, course: value})}
                >
                  <SelectTrigger id="course" className="!rounded-button">
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Advanced Web Development">Advanced Web Development</SelectItem>
                    <SelectItem value="UX/UI Design Fundamentals">UX/UI Design Fundamentals</SelectItem>
                    <SelectItem value="Data Science with Python">Data Science with Python</SelectItem>
                    <SelectItem value="Business Leadership">Business Leadership</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium mb-1">
                    Start Date
                  </label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newEvent.startDate}
                    onChange={(e) => setNewEvent({...newEvent, startDate: e.target.value})}
                  />
                </div>
                <div>
                  <label htmlFor="startTime" className="block text-sm font-medium mb-1">
                    Start Time
                  </label>
                  <Input
                    id="startTime"
                    type="time"
                    value={newEvent.startTime}
                    onChange={(e) => setNewEvent({...newEvent, startTime: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium mb-1">
                    End Date
                  </label>
                  <Input
                    id="endDate"
                    type="date"
                    value={newEvent.endDate}
                    onChange={(e) => setNewEvent({...newEvent, endDate: e.target.value})}
                  />
                </div>
                <div>
                  <label htmlFor="endTime" className="block text-sm font-medium mb-1">
                    End Time
                  </label>
                  <Input
                    id="endTime"
                    type="time"
                    value={newEvent.endTime}
                    onChange={(e) => setNewEvent({...newEvent, endTime: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium mb-1">
                  Location
                </label>
                <Input
                  id="location"
                  placeholder="Enter location"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-1">
                  Category
                </label>
                <Select
                  value={newEvent.category}
                  onValueChange={(value) => setNewEvent({...newEvent, category: value})}
                >
                  <SelectTrigger id="category" className="!rounded-button">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventCategories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        <div className="flex items-center space-x-2">
                          <span className={`w-3 h-3 rounded-full ${category.color}`}></span>
                          <span>{category.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="reminder"
                  checked={newEvent.reminder}
                  onCheckedChange={(checked) => 
                    setNewEvent({...newEvent, reminder: checked as boolean})
                  }
                />
                <label
                  htmlFor="reminder"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Set reminder for this event
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseEventDialog} className="!rounded-button whitespace-nowrap cursor-pointer">
              Cancel
            </Button>
            <Button className="!rounded-button whitespace-nowrap cursor-pointer">
              Create Event
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default App;
