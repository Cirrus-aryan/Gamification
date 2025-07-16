// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [leaderboardPeriod, setLeaderboardPeriod] = useState('weekly');

  const courses = [
    {
      id: 1,
      title: "Introduction to Web Development",
      description: "Learn the fundamentals of HTML, CSS, and JavaScript to build modern websites.",
      progress: 65,
      category: "development",
      imagePrompt: "A modern and sleek laptop displaying colorful code on screen with web development icons floating around, professional lighting, minimalist clean background, high quality digital art, web development concept",
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      description: "Master the essential concepts of data analysis, visualization, and machine learning.",
      progress: 32,
      category: "data",
      imagePrompt: "Data visualization charts and graphs with glowing connections on a digital dashboard, futuristic data science concept, clean minimalist background, professional lighting, high quality digital art",
    },
    {
      id: 3,
      title: "UX/UI Design Principles",
      description: "Discover the core principles of user experience and interface design for digital products.",
      progress: 78,
      category: "design",
      imagePrompt: "Designer working on a wireframe interface with colorful UI elements floating around, modern design workspace, clean minimalist background, professional lighting, high quality digital art, UI UX design concept",
    },
    {
      id: 4,
      title: "Advanced JavaScript Frameworks",
      description: "Deep dive into React, Vue, and Angular for building complex web applications.",
      progress: 12,
      category: "development",
      imagePrompt: "Abstract visualization of JavaScript framework components with code elements floating in 3D space, modern tech concept, clean minimalist background, professional lighting, high quality digital art",
    },
    {
      id: 5,
      title: "Business Analytics",
      description: "Learn how to leverage data to make strategic business decisions and drive growth.",
      progress: 45,
      category: "business",
      imagePrompt: "Business analytics dashboard with rising charts and KPI metrics, professional business setting, clean minimalist background, professional lighting, high quality digital art, business intelligence concept",
    },
    {
      id: 6,
      title: "Mobile App Development",
      description: "Build native mobile applications for iOS and Android using modern frameworks.",
      progress: 0,
      category: "development",
      imagePrompt: "Smartphone displaying app development interface with code and UI elements floating around, modern tech concept, clean minimalist background, professional lighting, high quality digital art",
    },
  ];

  const leaderboardData = {
    weekly: [
      { id: 1, name: "Alex Johnson", points: 2840, avatar: "AJ", rank: 1, badge: "gold" },
      { id: 2, name: "Sarah Williams", points: 2735, avatar: "SW", rank: 2, badge: "silver" },
      { id: 3, name: "Michael Chen", points: 2690, avatar: "MC", rank: 3, badge: "bronze" },
      { id: 4, name: "Emma Davis", points: 2510, avatar: "ED", rank: 4 },
      { id: 5, name: "James Wilson", points: 2485, avatar: "JW", rank: 5 },
      { id: 6, name: "Olivia Martinez", points: 2320, avatar: "OM", rank: 6 },
      { id: 7, name: "David Thompson", points: 2290, avatar: "DT", rank: 7 },
      { id: 8, name: "Sophia Lee", points: 2175, avatar: "SL", rank: 8 },
      { id: 9, name: "Daniel Brown", points: 2130, avatar: "DB", rank: 9 },
      { id: 10, name: "Isabella Garcia", points: 2080, avatar: "IG", rank: 10 },
    ],
    monthly: [
      { id: 3, name: "Michael Chen", points: 10250, avatar: "MC", rank: 1, badge: "gold" },
      { id: 1, name: "Alex Johnson", points: 9875, avatar: "AJ", rank: 2, badge: "silver" },
      { id: 8, name: "Sophia Lee", points: 9540, avatar: "SL", rank: 3, badge: "bronze" },
      { id: 2, name: "Sarah Williams", points: 9320, avatar: "SW", rank: 4 },
      { id: 6, name: "Olivia Martinez", points: 8950, avatar: "OM", rank: 5 },
      { id: 4, name: "Emma Davis", points: 8720, avatar: "ED", rank: 6 },
      { id: 10, name: "Isabella Garcia", points: 8540, avatar: "IG", rank: 7 },
      { id: 5, name: "James Wilson", points: 8390, avatar: "JW", rank: 8 },
      { id: 7, name: "David Thompson", points: 8250, avatar: "DT", rank: 9 },
      { id: 9, name: "Daniel Brown", points: 8120, avatar: "DB", rank: 10 },
    ]
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getBadgeColor = (badge: string) => {
    switch(badge) {
      case 'gold': return 'bg-amber-400 text-amber-950';
      case 'silver': return 'bg-slate-300 text-slate-950';
      case 'bronze': return 'bg-amber-700 text-amber-50';
      default: return '';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress === 0) return 'bg-slate-200';
    if (progress < 30) return 'bg-blue-400';
    if (progress < 70) return 'bg-blue-500';
    return 'bg-blue-600';
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <i className="fas fa-graduation-cap text-blue-600 text-2xl"></i>
            <h1 className="text-2xl font-bold text-slate-900">EduLearn Platform</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="!rounded-button">
              <i className="fas fa-bell text-slate-600"></i>
            </Button>
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://readdy.ai/api/search-image?query=professional%20headshot%20portrait%20of%20a%20young%20person%20with%20neutral%20expression%2C%20high%20quality%20photography%2C%20clean%20background%2C%20professional%20lighting&width=100&height=100&seq=avatar1&orientation=squarish" />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Courses Section */}
          <div className="w-full md:w-2/3">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Courses</h2>
              <p className="text-slate-600">Continue your learning journey with our expert-led courses</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-slate-300 focus:border-blue-500"
                />
                <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px] !rounded-button whitespace-nowrap">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="data">Data Science</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredCourses.map(course => (
                <Card key={course.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={`https://readdy.ai/api/search-image?query=$%7Bcourse.imagePrompt%7D&width=600&height=300&seq=course${course.id}&orientation=landscape`}
                      alt={course.title}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{course.title}</CardTitle>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {course.category.charAt(0).toUpperCase() + course.category.slice(1)}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2 h-12">{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-600">Progress</span>
                      <span className="text-sm font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className={`h-2 ${getProgressColor(course.progress)}`} />
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full !rounded-button whitespace-nowrap" variant={course.progress > 0 ? "default" : "outline"}>
                      {course.progress > 0 ? "Continue Learning" : "Start Course"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <i className="fas fa-search text-4xl text-slate-300 mb-4"></i>
                <h3 className="text-xl font-medium text-slate-700 mb-2">No courses found</h3>
                <p className="text-slate-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>

          {/* Leaderboard Section */}
          <div className="w-full md:w-1/3">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <h2 className="text-2xl font-bold mb-1">Leaderboard</h2>
                <p className="text-blue-100">Top performers in our learning community</p>
              </div>

              <Tabs value={leaderboardPeriod} onValueChange={setLeaderboardPeriod} className="w-full">
                <div className="px-4 pt-4">
                  <TabsList className="grid w-full grid-cols-2 !rounded-button">
                    <TabsTrigger value="weekly" className="!rounded-button whitespace-nowrap">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly" className="!rounded-button whitespace-nowrap">Monthly</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="weekly" className="mt-0">
                  <LeaderboardList data={leaderboardData.weekly} getBadgeColor={getBadgeColor} />
                </TabsContent>

                <TabsContent value="monthly" className="mt-0">
                  <LeaderboardList data={leaderboardData.monthly} getBadgeColor={getBadgeColor} />
                </TabsContent>
              </Tabs>

              <div className="p-4 border-t border-slate-200 bg-slate-50">
                <Button variant="outline" className="w-full !rounded-button whitespace-nowrap">
                  View Full Leaderboard
                </Button>
              </div>
            </div>

            <div className="mt-6 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Your Achievements</h3>
                <div className="flex flex-wrap gap-3">
                  <Badge className="px-3 py-1.5 bg-amber-100 text-amber-800 border-amber-200 !rounded-button">
                    <i className="fas fa-trophy text-amber-500 mr-2"></i> 5 Courses Completed
                  </Badge>
                  <Badge className="px-3 py-1.5 bg-emerald-100 text-emerald-800 border-emerald-200 !rounded-button">
                    <i className="fas fa-fire text-emerald-500 mr-2"></i> 15 Day Streak
                  </Badge>
                  <Badge className="px-3 py-1.5 bg-purple-100 text-purple-800 border-purple-200 !rounded-button">
                    <i className="fas fa-star text-purple-500 mr-2"></i> Top 10% in Data
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-300 py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <i className="fas fa-graduation-cap text-blue-400 text-2xl"></i>
                <h2 className="text-xl font-bold text-white">EduLearn</h2>
              </div>
              <p className="text-slate-400 mb-4">Empowering your learning journey with expert-led courses and a supportive community.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                  <i className="fab fa-facebook text-xl"></i>
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                  <i className="fab fa-instagram text-xl"></i>
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors cursor-pointer">Home</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors cursor-pointer">Courses</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors cursor-pointer">Leaderboard</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors cursor-pointer">Community</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors cursor-pointer">About Us</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors cursor-pointer">Help Center</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors cursor-pointer">FAQs</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors cursor-pointer">Contact Us</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors cursor-pointer">Privacy Policy</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors cursor-pointer">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Subscribe</h3>
              <p className="text-slate-400 mb-4">Get the latest updates and offers</p>
              <div className="flex">
                <Input 
                  type="email" 
                  placeholder="Your email" 
                  className="rounded-r-none border-slate-700 bg-slate-800 text-white focus:border-blue-500"
                />
                <Button className="rounded-l-none !rounded-button whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-500">
            <p>© 2025 EduLearn Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

interface LeaderboardListProps {
  data: {
    id: number;
    name: string;
    points: number;
    avatar: string;
    rank: number;
    badge?: string;
  }[];
  getBadgeColor: (badge: string) => string;
}

const LeaderboardList: React.FC<LeaderboardListProps> = ({ data, getBadgeColor }) => {
  const currentUserId = 1; // Assuming user with ID 1 is the current user

  return (
    <div className="divide-y divide-slate-200">
      {data.map((user) => (
        <div 
          key={user.id} 
          className={`flex items-center p-4 ${user.id === currentUserId ? 'bg-blue-50' : ''} ${user.rank <= 3 ? 'bg-opacity-70' : ''}`}
        >
          <div className="w-8 text-center font-semibold text-slate-600">
            {user.rank}
          </div>
          
          <div className="relative ml-2">
            <Avatar className={user.rank <= 3 ? 'ring-2 ring-offset-2 ' + (
              user.rank === 1 ? 'ring-amber-400' : 
              user.rank === 2 ? 'ring-slate-300' : 
              'ring-amber-700'
            ) : ''}>
              <AvatarImage src={`https://readdy.ai/api/search-image?query=professional%20headshot%20portrait%20of%20a%20person%20with%20neutral%20expression%2C%20high%20quality%20photography%2C%20clean%20background%2C%20professional%20lighting&width=100&height=100&seq=avatar${user.id}&orientation=squarish`} />
              <AvatarFallback>{user.avatar}</AvatarFallback>
            </Avatar>
            
            {user.badge && (
              <div className={`absolute -bottom-1 -right-1 rounded-full w-5 h-5 flex items-center justify-center ${getBadgeColor(user.badge)}`}>
                <i className={`fas fa-${user.rank === 1 ? 'crown' : 'medal'} text-xs`}></i>
              </div>
            )}
          </div>
          
          <div className="ml-4 flex-grow">
            <div className="font-medium text-slate-900">
              {user.name}
              {user.id === currentUserId && (
                <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">You</span>
              )}
            </div>
            <div className="text-sm text-slate-500 flex items-center">
              <i className="fas fa-star text-amber-400 mr-1 text-xs"></i>
              {user.points.toLocaleString()} points
            </div>
          </div>
          
          <div>
            <Button variant="ghost" size="sm" className="!rounded-button whitespace-nowrap">
              <i className="fas fa-user-plus text-slate-400"></i>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
