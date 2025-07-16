
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import * as echarts from "echarts";
import { useEffect } from "react";

const Educator: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("score");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [timeFilter, setTimeFilter] = useState("weekly");

  // Mock data for courses
  const courses = [
    {
      id: 1,
      title: "Advanced Web Development",
      thumbnail:
        "https://readdy.ai/api/search-image?query=modern%20web%20development%20course%20thumbnail%20with%20code%20editor%20and%20colorful%20UI%20elements%2C%20professional%20clean%20design%2C%20soft%20gradient%20background%20in%20blue%20tones%2C%20high%20quality%20digital%20illustration&width=400&height=225&seq=1&orientation=landscape",
      students: 245,
      status: "Active",
      rating: 4.8,
      completionRate: 78,
      engagement: 85,
      feedback: 4.7,
    },
    {
      id: 2,
      title: "UX/UI Design Fundamentals",
      thumbnail:
        "https://readdy.ai/api/search-image?query=UI%20UX%20design%20course%20thumbnail%20with%20wireframes%2C%20color%20palettes%20and%20design%20tools%2C%20professional%20clean%20design%2C%20soft%20gradient%20background%20in%20purple%20tones%2C%20high%20quality%20digital%20illustration&width=400&height=225&seq=2&orientation=landscape",
      students: 189,
      status: "Active",
      rating: 4.6,
      completionRate: 82,
      engagement: 79,
      feedback: 4.5,
    },
    {
      id: 3,
      title: "Data Science for Beginners",
      thumbnail:
        "https://readdy.ai/api/search-image?query=data%20science%20course%20thumbnail%20with%20charts%2C%20graphs%20and%20visualization%20elements%2C%20professional%20clean%20design%2C%20soft%20gradient%20background%20in%20green%20tones%2C%20high%20quality%20digital%20illustration&width=400&height=225&seq=3&orientation=landscape",
      students: 312,
      status: "Active",
      rating: 4.9,
      completionRate: 75,
      engagement: 88,
      feedback: 4.8,
    },
    {
      id: 4,
      title: "Mobile App Development",
      thumbnail:
        "https://readdy.ai/api/search-image?query=mobile%20app%20development%20course%20thumbnail%20with%20smartphone%20mockups%20and%20code%20elements%2C%20professional%20clean%20design%2C%20soft%20gradient%20background%20in%20orange%20tones%2C%20high%20quality%20digital%20illustration&width=400&height=225&seq=4&orientation=landscape",
      students: 178,
      status: "Draft",
      rating: 0,
      completionRate: 0,
      engagement: 0,
      feedback: 0,
    },
  ];

  // Mock data for students
  const students = [
    {
      id: 1,
      name: "Emma Thompson",
      avatar:
        "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20woman%20with%20brown%20hair%20and%20friendly%20smile%2C%20neutral%20background%2C%20high%20quality%20portrait%20photograph&width=100&height=100&seq=5&orientation=squarish",
      course: "Advanced Web Development",
      progress: 92,
      score: 98,
      lastActive: "2025-07-03",
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar:
        "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20asian%20man%20with%20black%20hair%20and%20friendly%20smile%2C%20neutral%20background%2C%20high%20quality%20portrait%20photograph&width=100&height=100&seq=6&orientation=squarish",
      course: "UX/UI Design Fundamentals",
      progress: 88,
      score: 95,
      lastActive: "2025-07-04",
    },
    {
      id: 3,
      name: "Sarah Johnson",
      avatar:
        "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20woman%20with%20blonde%20hair%20and%20friendly%20smile%2C%20neutral%20background%2C%20high%20quality%20portrait%20photograph&width=100&height=100&seq=7&orientation=squarish",
      course: "Data Science for Beginners",
      progress: 76,
      score: 89,
      lastActive: "2025-07-02",
    },
    {
      id: 4,
      name: "David Rodriguez",
      avatar:
        "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20hispanic%20man%20with%20dark%20hair%20and%20friendly%20smile%2C%20neutral%20background%2C%20high%20quality%20portrait%20photograph&width=100&height=100&seq=8&orientation=squarish",
      course: "Advanced Web Development",
      progress: 95,
      score: 94,
      lastActive: "2025-07-04",
    },
    {
      id: 5,
      name: "Olivia Wilson",
      avatar:
        "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20woman%20with%20red%20hair%20and%20friendly%20smile%2C%20neutral%20background%2C%20high%20quality%20portrait%20photograph&width=100&height=100&seq=9&orientation=squarish",
      course: "UX/UI Design Fundamentals",
      progress: 82,
      score: 91,
      lastActive: "2025-07-01",
    },
    {
      id: 6,
      name: "James Lee",
      avatar:
        "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20an%20asian%20man%20with%20glasses%20and%20friendly%20smile%2C%20neutral%20background%2C%20high%20quality%20portrait%20photograph&width=100&height=100&seq=10&orientation=squarish",
      course: "Data Science for Beginners",
      progress: 79,
      score: 87,
      lastActive: "2025-07-03",
    },
    {
      id: 7,
      name: "Sophia Martinez",
      avatar:
        "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20latina%20woman%20with%20dark%20hair%20and%20friendly%20smile%2C%20neutral%20background%2C%20high%20quality%20portrait%20photograph&width=100&height=100&seq=11&orientation=squarish",
      course: "Advanced Web Development",
      progress: 68,
      score: 82,
      lastActive: "2025-06-30",
    },
    {
      id: 8,
      name: "Ethan Brown",
      avatar:
        "https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20black%20man%20with%20short%20hair%20and%20friendly%20smile%2C%20neutral%20background%2C%20high%20quality%20portrait%20photograph&width=100&height=100&seq=12&orientation=squarish",
      course: "Mobile App Development",
      progress: 45,
      score: 78,
      lastActive: "2025-07-02",
    },
  ];

  // Filter and sort students
  const filteredStudents = students
    .filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.course.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortColumn === "name") {
        return sortDirection === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortColumn === "progress") {
        return sortDirection === "asc"
          ? a.progress - b.progress
          : b.progress - a.progress;
      } else if (sortColumn === "score") {
        return sortDirection === "asc" ? a.score - b.score : b.score - a.score;
      } else if (sortColumn === "lastActive") {
        return sortDirection === "asc"
          ? new Date(a.lastActive).getTime() - new Date(b.lastActive).getTime()
          : new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime();
      }
      return 0;
    });

  // Handle sort
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("desc");
    }
  };

  // Initialize charts
  useEffect(() => {
    if (activeTab === "analytics") {
      // Completion Rate Chart
      const completionChart = echarts.init(
        document.getElementById("completion-chart"),
      );
      const completionOption = {
        animation: false,
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: courses.map((course) => course.title).filter((_, i) => i < 3),
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
        },
        yAxis: {
          type: "value",
          min: 0,
          max: 100,
          name: "Completion Rate (%)",
        },
        series: [
          {
            name: courses[0].title,
            type: "line",
            data: [35, 45, 55, 65, 72, 78],
          },
          {
            name: courses[1].title,
            type: "line",
            data: [40, 52, 61, 70, 78, 82],
          },
          {
            name: courses[2].title,
            type: "line",
            data: [30, 42, 53, 62, 70, 75],
          },
        ],
      };
      completionChart.setOption(completionOption);

      // Engagement Chart
      const engagementChart = echarts.init(
        document.getElementById("engagement-chart"),
      );
      const engagementOption = {
        animation: false,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["Video Views", "Quiz Attempts", "Discussion Posts"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          name: "Count",
        },
        yAxis: {
          type: "category",
          data: courses.map((course) => course.title).filter((_, i) => i < 3),
        },
        series: [
          {
            name: "Video Views",
            type: "bar",
            stack: "total",
            data: [320, 302, 341],
          },
          {
            name: "Quiz Attempts",
            type: "bar",
            stack: "total",
            data: [120, 132, 101],
          },
          {
            name: "Discussion Posts",
            type: "bar",
            stack: "total",
            data: [60, 72, 71],
          },
        ],
      };
      engagementChart.setOption(engagementOption);

      // Feedback Chart
      const feedbackChart = echarts.init(
        document.getElementById("feedback-chart"),
      );
      const feedbackOption = {
        animation: false,
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "Feedback",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 16,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 65, name: "Excellent (5★)" },
              { value: 25, name: "Good (4★)" },
              { value: 8, name: "Average (3★)" },
              { value: 2, name: "Poor (2★)" },
              { value: 0, name: "Very Poor (1★)" },
            ],
          },
        ],
      };
      feedbackChart.setOption(feedbackOption);

      // Handle resize
      const handleResize = () => {
        completionChart.resize();
        engagementChart.resize();
        feedbackChart.resize();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        completionChart.dispose();
        engagementChart.dispose();
        feedbackChart.dispose();
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [activeTab, timeFilter, courses]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-indigo-600">
                  EduCreator
                </h1>
              </div>
              <nav className="ml-6 flex space-x-8">
                <Button
                  variant={activeTab === "dashboard" ? "default" : "ghost"}
                  onClick={() => setActiveTab("dashboard")}
                  className="!rounded-button whitespace-nowrap"
                >
                  <i className="fas fa-tachometer-alt mr-2"></i>
                  Dashboard
                </Button>
                <Button
                  variant={activeTab === "courses" ? "default" : "ghost"}
                  onClick={() => setActiveTab("courses")}
                  className="!rounded-button whitespace-nowrap"
                >
                  <i className="fas fa-book mr-2"></i>
                  My Courses
                </Button>
                <Button
                  variant={activeTab === "students" ? "default" : "ghost"}
                  onClick={() => setActiveTab("students")}
                  className="!rounded-button whitespace-nowrap"
                >
                  <i className="fas fa-user-graduate mr-2"></i>
                  Students
                </Button>
                <Button
                  variant={activeTab === "analytics" ? "default" : "ghost"}
                  onClick={() => setActiveTab("analytics")}
                  className="!rounded-button whitespace-nowrap"
                >
                  <i className="fas fa-chart-line mr-2"></i>
                  Analytics
                </Button>
              </nav>
            </div>
            <div className="flex items-center">
              <Button
                variant="ghost"
                className="relative cursor-pointer !rounded-button whitespace-nowrap"
              >
                <i className="fas fa-bell text-gray-500"></i>
                <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>
              <div className="ml-3 relative">
                <div className="flex items-center cursor-pointer">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://readdy.ai/api/search-image?query=professional%20headshot%20portrait%20of%20a%20male%20educator%20with%20glasses%20and%20friendly%20smile%2C%20neutral%20background%2C%20high%20quality%20photograph&width=100&height=100&seq=13&orientation=squarish" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    John Doe
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="py-6">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  Welcome back, John!
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Here's what's happening with your courses today.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      Total Courses
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <div className="text-3xl font-bold text-gray-900">
                        {courses.length}
                      </div>
                      <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">
                        +1 this month
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      Total Students
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <div className="text-3xl font-bold text-gray-900">
                        924
                      </div>
                      <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">
                        +56 this month
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      Average Rating
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <div className="text-3xl font-bold text-gray-900">
                        4.8
                      </div>
                      <div className="ml-2 text-yellow-500">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">
                      Total Revenue
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <div className="text-3xl font-bold text-gray-900">
                        $12,845
                      </div>
                      <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">
                        +8.2% this month
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Courses */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Recent Courses
                  </h3>
                  <Button
                    onClick={() => setActiveTab("courses")}
                    variant="outline"
                    className="text-sm cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    View all
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {courses.slice(0, 3).map((course) => (
                    <Card key={course.id} className="overflow-hidden">
                      <div className="h-40 overflow-hidden">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg font-medium">
                            {course.title}
                          </CardTitle>
                          <Badge
                            className={
                              course.status === "Active"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                            }
                          >
                            {course.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <i className="fas fa-user-graduate mr-1"></i>
                          <span>{course.students} students</span>
                        </div>
                        {course.status === "Active" && (
                          <div className="flex items-center mt-1 text-sm text-gray-500">
                            <i className="fas fa-star text-yellow-500 mr-1"></i>
                            <span>{course.rating} rating</span>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="pt-0">
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="cursor-pointer !rounded-button whitespace-nowrap"
                          >
                            <i className="fas fa-edit mr-1"></i> Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="cursor-pointer !rounded-button whitespace-nowrap"
                          >
                            <i className="fas fa-eye mr-1"></i> View
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Top Students */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Top Students
                  </h3>
                  <Button
                    onClick={() => setActiveTab("students")}
                    variant="outline"
                    className="text-sm cursor-pointer !rounded-button whitespace-nowrap"
                  >
                    View all
                  </Button>
                </div>
                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Score</TableHead>
                        <TableHead>Last Active</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.slice(0, 5).map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage src={student.avatar} />
                                <AvatarFallback>
                                  {student.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span>{student.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{student.course}</TableCell>
                          <TableCell>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div
                                className="bg-indigo-600 h-2.5 rounded-full"
                                style={{ width: `${student.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500">
                              {student.progress}%
                            </span>
                          </TableCell>
                          <TableCell>{student.score}/100</TableCell>
                          <TableCell>
                            {new Date(student.lastActive).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </div>
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === "courses" && (
            <div className="py-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    My Courses
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Manage your existing courses or create new ones.
                  </p>
                </div>
                <Button className="cursor-pointer !rounded-button whitespace-nowrap">
                  <i className="fas fa-plus mr-2"></i>
                  Create New Course
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                  <Card key={course.id} className="overflow-hidden">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl font-bold">
                          {course.title}
                        </CardTitle>
                        <Badge
                          className={
                            course.status === "Active"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                          }
                        >
                          {course.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <i className="fas fa-user-graduate mr-2"></i>
                          <span>{course.students} students enrolled</span>
                        </div>
                        {course.status === "Active" && (
                          <>
                            <div className="flex items-center text-sm text-gray-500">
                              <i className="fas fa-star text-yellow-500 mr-2"></i>
                              <span>{course.rating} average rating</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <i className="fas fa-chart-line mr-2"></i>
                              <span>
                                {course.completionRate}% completion rate
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                        variant="outline"
                        className="cursor-pointer !rounded-button whitespace-nowrap"
                      >
                        <i className="fas fa-edit mr-1"></i> Edit
                      </Button>
                      <Button
                        variant="outline"
                        className="cursor-pointer !rounded-button whitespace-nowrap"
                      >
                        <i className="fas fa-eye mr-1"></i> View
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="cursor-pointer !rounded-button whitespace-nowrap"
                          >
                            <i className="fas fa-ellipsis-h"></i>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem className="cursor-pointer">
                            <i className="fas fa-copy mr-2"></i> Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <i className="fas fa-archive mr-2"></i> Archive
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer text-red-600">
                            <i className="fas fa-trash-alt mr-2"></i> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Students Tab */}
          {activeTab === "students" && (
            <div className="py-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Student Leaderboard
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Track your students' performance across all courses.
                  </p>
                </div>
                <div className="w-64">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-gray-300"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-search text-gray-400"></i>
                    </div>
                  </div>
                </div>
              </div>

              <Card>
                <ScrollArea className="h-[600px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead
                          className="cursor-pointer"
                          onClick={() => handleSort("name")}
                        >
                          Student
                          {sortColumn === "name" && (
                            <span className="ml-1">
                              {sortDirection === "asc" ? (
                                <i className="fas fa-sort-up"></i>
                              ) : (
                                <i className="fas fa-sort-down"></i>
                              )}
                            </span>
                          )}
                        </TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead
                          className="cursor-pointer"
                          onClick={() => handleSort("progress")}
                        >
                          Progress
                          {sortColumn === "progress" && (
                            <span className="ml-1">
                              {sortDirection === "asc" ? (
                                <i className="fas fa-sort-up"></i>
                              ) : (
                                <i className="fas fa-sort-down"></i>
                              )}
                            </span>
                          )}
                        </TableHead>
                        <TableHead
                          className="cursor-pointer"
                          onClick={() => handleSort("score")}
                        >
                          Score
                          {sortColumn === "score" && (
                            <span className="ml-1">
                              {sortDirection === "asc" ? (
                                <i className="fas fa-sort-up"></i>
                              ) : (
                                <i className="fas fa-sort-down"></i>
                              )}
                            </span>
                          )}
                        </TableHead>
                        <TableHead
                          className="cursor-pointer"
                          onClick={() => handleSort("lastActive")}
                        >
                          Last Active
                          {sortColumn === "lastActive" && (
                            <span className="ml-1">
                              {sortDirection === "asc" ? (
                                <i className="fas fa-sort-up"></i>
                              ) : (
                                <i className="fas fa-sort-down"></i>
                              )}
                            </span>
                          )}
                        </TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage src={student.avatar} />
                                <AvatarFallback>
                                  {student.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span>{student.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{student.course}</TableCell>
                          <TableCell>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div
                                className={`h-2.5 rounded-full ${
                                  student.progress >= 80
                                    ? "bg-green-600"
                                    : student.progress >= 60
                                      ? "bg-blue-600"
                                      : student.progress >= 40
                                        ? "bg-yellow-500"
                                        : "bg-red-600"
                                }`}
                                style={{ width: `${student.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500">
                              {student.progress}%
                            </span>
                          </TableCell>
                          <TableCell>
                            <span
                              className={`font-medium ${
                                student.score >= 90
                                  ? "text-green-600"
                                  : student.score >= 75
                                    ? "text-blue-600"
                                    : student.score >= 60
                                      ? "text-yellow-500"
                                      : "text-red-600"
                              }`}
                            >
                              {student.score}/100
                            </span>
                          </TableCell>
                          <TableCell>
                            {new Date(student.lastActive).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="cursor-pointer !rounded-button whitespace-nowrap"
                              >
                                <i className="fas fa-eye"></i>
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="cursor-pointer !rounded-button whitespace-nowrap"
                              >
                                <i className="fas fa-envelope"></i>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </Card>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="py-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Course Analytics
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Detailed insights into your course performance.
                  </p>
                </div>
                <div>
                  <Tabs value={timeFilter} onValueChange={setTimeFilter}>
                    <TabsList>
                      <TabsTrigger
                        value="weekly"
                        className="!rounded-button whitespace-nowrap"
                      >
                        Weekly
                      </TabsTrigger>
                      <TabsTrigger
                        value="monthly"
                        className="!rounded-button whitespace-nowrap"
                      >
                        Monthly
                      </TabsTrigger>
                      <TabsTrigger
                        value="yearly"
                        className="!rounded-button whitespace-nowrap"
                      >
                        Yearly
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Completion Rates</CardTitle>
                    <CardDescription>
                      Percentage of students completing each course over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div
                      id="completion-chart"
                      style={{ height: "300px" }}
                    ></div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Student Engagement</CardTitle>
                    <CardDescription>
                      Breakdown of student activities by course
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div
                      id="engagement-chart"
                      style={{ height: "300px" }}
                    ></div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Student Feedback</CardTitle>
                  <CardDescription>
                    Distribution of ratings across all courses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div id="feedback-chart" style={{ height: "300px" }}></div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      {/* Quick Action Sidebar */}
      <div className="fixed bottom-8 right-8 flex flex-col space-y-4">
        <Button className="rounded-full h-14 w-14 shadow-lg cursor-pointer !rounded-button whitespace-nowrap">
          <i className="fas fa-plus text-xl"></i>
        </Button>
        <Button
          variant="outline"
          className="rounded-full h-12 w-12 bg-white shadow-md cursor-pointer !rounded-button whitespace-nowrap"
        >
          <i className="fas fa-comment text-indigo-600"></i>
        </Button>
        <Button
          variant="outline"
          className="rounded-full h-12 w-12 bg-white shadow-md cursor-pointer !rounded-button whitespace-nowrap"
        >
          <i className="fas fa-question text-indigo-600"></i>
        </Button>
      </div>
    </div>
  );
};

export default Educator;
