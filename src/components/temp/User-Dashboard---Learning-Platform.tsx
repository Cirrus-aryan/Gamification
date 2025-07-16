// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import * as echarts from "echarts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/swiper-bundle.css";

const UserDashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  React.useEffect(() => {
    // Weekly Learning Activity Chart
    const activityChart = echarts.init(
      document.getElementById("weekly-activity-chart")
    );
    const activityOption = {
      animation: false,
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        axisTick: {
          alignWithLabel: true,
        },
      },
      yAxis: {
        type: "value",
        name: "Hours",
      },
      series: [
        {
          name: "Learning Hours",
          type: "bar",
          barWidth: "60%",
          data: [2.5, 3.8, 1.2, 4.5, 3.0, 5.2, 2.8],
          itemStyle: {
            color: "#6366f1",
          },
        },
      ],
    };
    activityChart.setOption(activityOption);
    // Subject Distribution Chart
    const subjectChart = echarts.init(
      document.getElementById("subject-distribution-chart")
    );
    const subjectOption = {
      animation: false,
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        right: 10,
        top: "center",
        data: [
          "Programming",
          "Design",
          "Data Science",
          "Business",
          "Languages",
        ],
      },
      series: [
        {
          name: "Time Spent",
          type: "pie",
          radius: ["50%", "70%"],
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
            { value: 35, name: "Programming", itemStyle: { color: "#6366f1" } },
            { value: 20, name: "Design", itemStyle: { color: "#8b5cf6" } },
            {
              value: 25,
              name: "Data Science",
              itemStyle: { color: "#ec4899" },
            },
            { value: 10, name: "Business", itemStyle: { color: "#14b8a6" } },
            { value: 10, name: "Languages", itemStyle: { color: "#f59e0b" } },
          ],
        },
      ],
    };
    subjectChart.setOption(subjectOption);
    // Handle resize
    const handleResize = () => {
      activityChart.resize();
      subjectChart.resize();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      activityChart.dispose();
      subjectChart.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // Mock data for courses
  const activeCourses = [
    {
      id: 1,
      title: "Advanced Web Development",
      progress: 75,
      image:
        "https://readdy.ai/api/search-image?query=modern%20web%20development%20coding%20screen%20with%20colorful%20code%20syntax%20highlighting%2C%20clean%20workspace%20with%20minimal%20background%2C%20professional%20development%20environment%2C%20high%20quality%20detailed%20image&width=400&height=250&seq=1&orientation=landscape",
      nextLesson: "JavaScript Promises",
    },
    {
      id: 2,
      title: "UX/UI Design Fundamentals",
      progress: 45,
      image:
        "https://readdy.ai/api/search-image?query=ui%20ux%20design%20workspace%20with%20wireframes%20and%20color%20palettes%20on%20screen%2C%20clean%20modern%20desk%20setup%2C%20professional%20design%20tools%2C%20minimal%20background%2C%20high%20quality%20detailed%20image&width=400&height=250&seq=2&orientation=landscape",
      nextLesson: "User Research Methods",
    },
    {
      id: 3,
      title: "Data Science with Python",
      progress: 30,
      image:
        "https://readdy.ai/api/search-image?query=data%20visualization%20and%20python%20code%20on%20computer%20screen%2C%20data%20science%20workspace%20with%20charts%20and%20graphs%2C%20professional%20analytics%20environment%2C%20clean%20minimal%20background%2C%20high%20quality%20detailed%20image&width=400&height=250&seq=3&orientation=landscape",
      nextLesson: "Pandas for Data Analysis",
    },
    {
      id: 4,
      title: "Business Leadership",
      progress: 60,
      image:
        "https://readdy.ai/api/search-image?query=professional%20business%20meeting%20with%20diverse%20team%20discussing%20strategy%2C%20modern%20conference%20room%2C%20leadership%20concept%2C%20clean%20minimal%20background%2C%20high%20quality%20detailed%20image&width=400&height=250&seq=4&orientation=landscape",
      nextLesson: "Strategic Decision Making",
    },
  ];
  const recommendedCourses = [
    {
      id: 5,
      title: "Machine Learning Fundamentals",
      description:
        "Learn the basics of machine learning algorithms and applications",
      difficulty: "Intermediate",
      duration: "8 weeks",
      image:
        "https://readdy.ai/api/search-image?query=machine%20learning%20concept%20with%20neural%20network%20visualization%2C%20futuristic%20AI%20technology%2C%20clean%20minimal%20background%20with%20blue%20tech%20elements%2C%20professional%20educational%20content%2C%20high%20quality%20detailed%20image&width=400&height=250&seq=5&orientation=landscape",
    },
    {
      id: 6,
      title: "Mobile App Development",
      description: "Build cross-platform mobile apps with React Native",
      difficulty: "Intermediate",
      duration: "10 weeks",
      image:
        "https://readdy.ai/api/search-image?query=mobile%20app%20development%20with%20smartphone%20mockups%20and%20code%20on%20screen%2C%20modern%20development%20environment%2C%20clean%20minimal%20background%2C%20professional%20coding%20workspace%2C%20high%20quality%20detailed%20image&width=400&height=250&seq=6&orientation=landscape",
    },
    {
      id: 7,
      title: "Digital Marketing Mastery",
      description: "Master the latest digital marketing strategies and tools",
      difficulty: "Beginner",
      duration: "6 weeks",
      image:
        "https://readdy.ai/api/search-image?query=digital%20marketing%20analytics%20dashboard%20with%20growth%20charts%2C%20social%20media%20icons%2C%20marketing%20campaign%20visuals%2C%20clean%20minimal%20background%2C%20professional%20marketing%20workspace%2C%20high%20quality%20detailed%20image&width=400&height=250&seq=7&orientation=landscape",
    },
    {
      id: 8,
      title: "Blockchain Development",
      description: "Learn to build decentralized applications on blockchain",
      difficulty: "Advanced",
      duration: "12 weeks",
      image:
        "https://readdy.ai/api/search-image?query=blockchain%20technology%20visualization%20with%20connected%20nodes%2C%20cryptocurrency%20concept%2C%20futuristic%20tech%20background%2C%20clean%20minimal%20design%2C%20professional%20educational%20content%2C%20high%20quality%20detailed%20image&width=400&height=250&seq=8&orientation=landscape",
    },
    {
      id: 9,
      title: "Graphic Design Essentials",
      description:
        "Master the fundamentals of graphic design with industry tools",
      difficulty: "Beginner",
      duration: "8 weeks",
      image:
        "https://readdy.ai/api/search-image?query=graphic%20design%20workspace%20with%20color%20palettes%2C%20design%20software%20interface%2C%20creative%20artwork%20in%20progress%2C%20clean%20minimal%20background%2C%20professional%20design%20environment%2C%20high%20quality%20detailed%20image&width=400&height=250&seq=9&orientation=landscape",
    },
  ];
  const upcomingTasks = [
    {
      id: 1,
      title: "JavaScript Final Project",
      course: "Advanced Web Development",
      dueDate: "2025-07-10",
      priority: "High",
    },
    {
      id: 2,
      title: "User Persona Creation",
      course: "UX/UI Design Fundamentals",
      dueDate: "2025-07-08",
      priority: "Medium",
    },
    {
      id: 3,
      title: "Data Visualization Assignment",
      course: "Data Science with Python",
      dueDate: "2025-07-15",
      priority: "Medium",
    },
    {
      id: 4,
      title: "Case Study Analysis",
      course: "Business Leadership",
      dueDate: "2025-07-07",
      priority: "High",
    },
  ];
  const achievements = [
    { id: 1, name: "Fast Learner", icon: "fa-solid fa-bolt" },
    { id: 2, name: "7-Day Streak", icon: "fa-solid fa-fire" },
    { id: 3, name: "Quiz Master", icon: "fa-solid fa-crown" },
    { id: 4, name: "Early Bird", icon: "fa-solid fa-sun" },
  ];
  return (
    <div className="flex bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm">
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
              <a
                href="#"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-indigo-50 text-indigo-600 font-medium cursor-pointer"
              >
                <i className="fa-solid fa-chart-line w-5 text-center"></i>
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <i className="fa-solid fa-book w-5 text-center"></i>
                <span>My Courses</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <i className="fa-solid fa-chart-simple w-5 text-center"></i>
                <span>Progress</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <i className="fa-solid fa-clipboard-list w-5 text-center"></i>
                <span>Assignments</span>
              </a>
            </li>
            <li>
              <a
                href="https://readdy.ai/home/384eec86-e7cc-4f56-82b6-4e6caaa1d74d/498069c5-cc64-4f00-ae4e-e8e78ef20825"
                data-readdy="true"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <i className="fa-solid fa-calendar w-5 text-center"></i>
                <span>Calendar</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <i className="fa-solid fa-message w-5 text-center"></i>
                <span>Messages</span>
                <Badge className="ml-auto bg-indigo-600 hover:bg-indigo-700">
                  3
                </Badge>
              </a>
            </li>
            <li>
              <a
                href="https://readdy.ai/home/384eec86-e7cc-4f56-82b6-4e6caaa1d74d/03ac036a-5e00-4b2b-bd0b-b0e21c303f54"
                data-readdy="true"
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <i className="fa-solid fa-gear w-5 text-center"></i>
                <span>Settings</span>
              </a>
            </li>
          </ul>
        </nav>
        {/* Help Section */}
        <div className="p-4 border-t border-gray-200">
          <a
            href="#"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            <i className="fa-solid fa-circle-question w-5 text-center"></i>
            <span>Help & Support</span>
          </a>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-600">
              Welcome back, John! Ready to continue learning?
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search courses, lessons..."
                className="w-64 pl-10 pr-4 py-2 rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <i className="fa-solid fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
            <div className="relative cursor-pointer">
              <i className="fa-solid fa-bell text-gray-600 text-xl"></i>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                5
              </span>
            </div>
          </div>
        </header>
        {/* Stats Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-3">
          <div className="grid grid-cols-4 gap-4">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-indigo-50">
              <div className="bg-indigo-100 p-2 rounded-full">
                <i className="fa-solid fa-book-open text-indigo-600 text-lg"></i>
              </div>
              <div>
                <p className="text-sm text-gray-600">Courses in Progress</p>
                <p className="text-xl font-bold">4</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50">
              <div className="bg-green-100 p-2 rounded-full">
                <i className="fa-solid fa-check-circle text-green-600 text-lg"></i>
              </div>
              <div>
                <p className="text-sm text-gray-600">Completed Courses</p>
                <p className="text-xl font-bold">12</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50">
              <div className="bg-blue-100 p-2 rounded-full">
                <i className="fa-solid fa-clock text-blue-600 text-lg"></i>
              </div>
              <div>
                <p className="text-sm text-gray-600">Hours Spent Learning</p>
                <p className="text-xl font-bold">87</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-amber-50">
              <div className="bg-amber-100 p-2 rounded-full">
                <i className="fa-solid fa-fire text-amber-600 text-lg"></i>
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Streak</p>
                <p className="text-xl font-bold">7 days</p>
              </div>
            </div>
          </div>
        </div>
        {/* Main Content Scrollable Area */}
        <ScrollArea className="flex-1 px-6 py-6 overflow-auto">
          <div className="space-y-8 pb-10">
            {/* Course Progress Section */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">My Learning Progress</h2>
                <Button
                  variant="outline"
                  className="!rounded-button whitespace-nowrap cursor-pointer"
                >
                  View All Courses{" "}
                  <i className="fa-solid fa-arrow-right ml-2"></i>
                </Button>
              </div>
              <Card>
                <div className="divide-y divide-gray-200">
                  {activeCourses.map((course) => (
                    <div
                      key={course.id}
                      className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-48 h-32 flex-shrink-0 overflow-hidden rounded-lg">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {course.title}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              Next Lesson: {course.nextLesson}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-indigo-50 text-indigo-700 border-indigo-200"
                          >
                            In Progress
                          </Badge>
                        </div>
                        <div className="space-y-2 max-w-xl">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">
                              Course Progress
                            </span>
                            <span className="font-medium">
                              {course.progress}%
                            </span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                        <div className="mt-4 flex items-center gap-3">
                          <Button className="!rounded-button whitespace-nowrap cursor-pointer">
                            Continue Learning
                          </Button>
                          <Button
                            variant="outline"
                            className="!rounded-button whitespace-nowrap cursor-pointer"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </section>
            {/* Analytics Section */}
            <section>
              <h2 className="text-xl font-bold mb-4">Learning Analytics</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Weekly Activity Chart */}
                <Card className="col-span-2">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold">Weekly Learning Activity</h3>
                  </div>
                  <div className="p-4">
                    <div
                      id="weekly-activity-chart"
                      style={{ height: "300px" }}
                    ></div>
                  </div>
                </Card>
                {/* Subject Distribution */}
                <Card>
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold">Time Spent by Subject</h3>
                  </div>
                  <div className="p-4">
                    <div
                      id="subject-distribution-chart"
                      style={{ height: "300px" }}
                    ></div>
                  </div>
                </Card>
              </div>
            </section>
            {/* Two Column Layout for Tasks and Achievements */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Upcoming Tasks */}
              <Card className="col-span-2">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="font-semibold">Upcoming Tasks</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="!rounded-button whitespace-nowrap cursor-pointer"
                  >
                    View All
                  </Button>
                </div>
                <div className="p-4">
                  <ul className="divide-y divide-gray-200">
                    {upcomingTasks.map((task) => {
                      const dueDate = new Date(task.dueDate);
                      const today = new Date();
                      const isOverdue = dueDate < today;
                      const isDueSoon =
                        !isOverdue &&
                        dueDate.getTime() - today.getTime() <
                          3 * 24 * 60 * 60 * 1000; // 3 days
                      let priorityColor = "bg-gray-100 text-gray-800";
                      if (task.priority === "High")
                        priorityColor = "bg-red-100 text-red-800";
                      else if (task.priority === "Medium")
                        priorityColor = "bg-yellow-100 text-yellow-800";
                      return (
                        <li key={task.id} className="py-3 first:pt-0 last:pb-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{task.title}</h4>
                              <p className="text-sm text-gray-600">
                                {task.course}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge
                                variant="outline"
                                className={priorityColor}
                              >
                                {task.priority}
                              </Badge>
                              {isOverdue ? (
                                <span className="text-xs text-red-600 font-medium">
                                  Overdue
                                </span>
                              ) : isDueSoon ? (
                                <span className="text-xs text-amber-600 font-medium">
                                  Due soon
                                </span>
                              ) : (
                                <span className="text-xs text-gray-600">
                                  Due{" "}
                                  {new Date(task.dueDate).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="mt-2 flex space-x-2">
                            <Button
                              size="sm"
                              className="!rounded-button whitespace-nowrap cursor-pointer"
                            >
                              Start Task
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="!rounded-button whitespace-nowrap cursor-pointer"
                            >
                              View Details
                            </Button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Card>
              {/* Achievements */}
              <Card>
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold">Your Achievements</h3>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    {achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className="bg-gray-50 p-4 rounded-lg text-center"
                      >
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 mb-2">
                          <i className={`${achievement.icon} text-xl`}></i>
                        </div>
                        <p className="font-medium">{achievement.name}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <Button
                      variant="outline"
                      className="!rounded-button whitespace-nowrap cursor-pointer"
                    >
                      View All Achievements
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
            {/* Recommended Courses */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Recommended for You</h2>
                <Button
                  variant="outline"
                  className="!rounded-button whitespace-nowrap cursor-pointer"
                >
                  Browse All Courses
                </Button>
              </div>
              <Swiper
                modules={[Pagination, Autoplay, Navigation]}
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                  1280: { slidesPerView: 4 },
                }}
                pagination={{ clickable: true }}
                navigation
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                className="pb-10"
              >
                {recommendedCourses.map((course) => (
                  <SwiperSlide key={course.id}>
                    <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-300">
                      <div className="h-40 overflow-hidden">
                        <img
                          src={course.image}
                          alt={course.title}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div className="p-4 space-y-3">
                        <h3 className="font-semibold text-lg line-clamp-1">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {course.description}
                        </p>
                        <div className="flex justify-between text-sm">
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-200"
                          >
                            {course.difficulty}
                          </Badge>
                          <span className="text-gray-600">
                            <i className="fa-regular fa-clock mr-1"></i>{" "}
                            {course.duration}
                          </span>
                        </div>
                        <Button className="w-full mt-2 !rounded-button whitespace-nowrap cursor-pointer">
                          Enroll Now
                        </Button>
                      </div>
                    </Card>
                  </SwiperSlide>
                ))}
              </Swiper>
            </section>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
export default UserDashboard;
