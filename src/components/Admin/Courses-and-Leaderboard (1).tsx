// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import * as echarts from 'echarts';
import MainSetting from './Setting/MainSetting';
import MainReportSection from './Reports/MainReportSection';
import MainUsers from './users/MainUsers';
import MainCourcesSections from './Cources/MainCourcesSections';
import Dashboard from './Dashboard/Dashboard';
import Sidebar from './Sidebar/Sidebar';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [userFilter, setUserFilter] = useState('all');
  const [chartInstance, setChartInstance] = useState<echarts.ECharts | null>(null);
  const [enrollmentChartInstance, setEnrollmentChartInstance] = useState<echarts.ECharts | null>(null);
  const [categoryChartInstance, setCategoryChartInstance] = useState<echarts.ECharts | null>(null);

  useEffect(() => {
    // Initialize main chart
    const chartElement = document.getElementById('main-chart');
    if (chartElement) {
      const chart = echarts.init(chartElement);
      setChartInstance(chart);
      
      const option = {
        animation: false,
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['Active Users', 'Course Completions', 'New Enrollments'],
          bottom: 0
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '15%',
          top: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Jun 28', 'Jun 29', 'Jun 30', 'Jul 1', 'Jul 2', 'Jul 3', 'Jul 4']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Active Users',
            type: 'line',
            data: [820, 932, 901, 934, 1290, 1330, 1450],
            smooth: true,
            lineStyle: {
              width: 3,
              color: '#3b82f6'
            },
            areaStyle: {
              opacity: 0.2,
              color: '#3b82f6'
            }
          },
          {
            name: 'Course Completions',
            type: 'line',
            data: [120, 132, 101, 134, 190, 230, 210],
            smooth: true,
            lineStyle: {
              width: 3,
              color: '#10b981'
            }
          },
          {
            name: 'New Enrollments',
            type: 'line',
            data: [320, 332, 301, 334, 390, 330, 320],
            smooth: true,
            lineStyle: {
              width: 3,
              color: '#f59e0b'
            }
          }
        ]
      };
      
      chart.setOption(option);
    }

    // Initialize enrollment chart
    const enrollmentElement = document.getElementById('enrollment-chart');
    if (enrollmentElement) {
      const chart = echarts.init(enrollmentElement);
      setEnrollmentChartInstance(chart);
      
      const option = {
        animation: false,
        tooltip: {
          trigger: 'item'
        },
        legend: {
          bottom: 0,
          left: 'center'
        },
        series: [
          {
            name: 'Enrollment Status',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 16,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: 'Completed' },
              { value: 735, name: 'In Progress' },
              { value: 580, name: 'Not Started' },
              { value: 300, name: 'Abandoned' }
            ]
          }
        ]
      };
      
      chart.setOption(option);
    }

    // Initialize category chart
    const categoryElement = document.getElementById('category-chart');
    if (categoryElement) {
      const chart = echarts.init(categoryElement);
      setCategoryChartInstance(chart);
      
      const option = {
        animation: false,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '15%',
          top: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ['Development', 'Data Science', 'Design', 'Business', 'Marketing']
        },
        series: [
          {
            name: 'Enrollments',
            type: 'bar',
            data: [1890, 1350, 1120, 980, 750],
            itemStyle: {
              color: '#3b82f6'
            }
          }
        ]
      };
      
      chart.setOption(option);
    }

    // Cleanup
    return () => {
      chartInstance?.dispose();
      enrollmentChartInstance?.dispose();
      categoryChartInstance?.dispose();
    };
  }, []);

  // Resize charts on window resize
  useEffect(() => {
    const handleResize = () => {
      chartInstance?.resize();
      enrollmentChartInstance?.resize();
      categoryChartInstance?.resize();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [chartInstance, enrollmentChartInstance, categoryChartInstance]);

  const courses = [
    {
      id: 1,
      title: "Introduction to Web Development",
      instructor: "Alex Johnson",
      students: 1245,
      rating: 4.8,
      revenue: 24900,
      status: "active",
      category: "development",
      lastUpdated: "2025-06-28"
    },
    {
      id: 2,
      title: "Data Science Fundamentals",
      instructor: "Sarah Williams",
      students: 987,
      rating: 4.7,
      revenue: 19740,
      status: "active",
      category: "data",
      lastUpdated: "2025-06-15"
    },
    {
      id: 3,
      title: "UX/UI Design Principles",
      instructor: "Michael Chen",
      students: 1532,
      rating: 4.9,
      revenue: 30640,
      status: "active",
      category: "design",
      lastUpdated: "2025-07-01"
    },
    {
      id: 4,
      title: "Advanced JavaScript Frameworks",
      instructor: "Emma Davis",
      students: 876,
      rating: 4.6,
      revenue: 17520,
      status: "active",
      category: "development",
      lastUpdated: "2025-06-10"
    },
    {
      id: 5,
      title: "Business Analytics",
      instructor: "James Wilson",
      students: 654,
      rating: 4.5,
      revenue: 13080,
      status: "active",
      category: "business",
      lastUpdated: "2025-05-22"
    },
    {
      id: 6,
      title: "Mobile App Development",
      instructor: "Olivia Martinez",
      students: 1098,
      rating: 4.7,
      revenue: 21960,
      status: "draft",
      category: "development",
      lastUpdated: "2025-06-30"
    },
    {
      id: 7,
      title: "Digital Marketing Strategies",
      instructor: "David Thompson",
      students: 789,
      rating: 4.4,
      revenue: 15780,
      status: "review",
      category: "marketing",
      lastUpdated: "2025-06-25"
    }
  ];

  const users = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      role: "student",
      courses: 5,
      joined: "2024-12-15",
      lastActive: "2025-07-03",
      status: "active"
    },
    {
      id: 2,
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      role: "instructor",
      courses: 2,
      joined: "2025-01-10",
      lastActive: "2025-07-04",
      status: "active"
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "michael.chen@example.com",
      role: "instructor",
      courses: 3,
      joined: "2024-11-05",
      lastActive: "2025-07-02",
      status: "active"
    },
    {
      id: 4,
      name: "Emma Davis",
      email: "emma.davis@example.com",
      role: "student",
      courses: 8,
      joined: "2025-02-20",
      lastActive: "2025-07-01",
      status: "active"
    },
    {
      id: 5,
      name: "James Wilson",
      email: "james.wilson@example.com",
      role: "instructor",
      courses: 1,
      joined: "2025-03-15",
      lastActive: "2025-06-28",
      status: "active"
    },
    {
      id: 6,
      name: "Olivia Martinez",
      email: "olivia.martinez@example.com",
      role: "student",
      courses: 4,
      joined: "2024-10-30",
      lastActive: "2025-06-25",
      status: "inactive"
    },
    {
      id: 7,
      name: "David Thompson",
      email: "david.thompson@example.com",
      role: "instructor",
      courses: 2,
      joined: "2025-04-05",
      lastActive: "2025-07-03",
      status: "active"
    },
    {
      id: 8,
      name: "Sophia Lee",
      email: "sophia.lee@example.com",
      role: "student",
      courses: 6,
      joined: "2025-01-25",
      lastActive: "2025-07-04",
      status: "active"
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = courseFilter === 'all' || course.status === courseFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = userFilter === 'all' || user.role === userFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
      case 'draft':
        return <Badge className="bg-slate-100 text-slate-800 border-slate-200">Draft</Badge>;
      case 'review':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Under Review</Badge>;
      case 'inactive':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Inactive</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex  overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          setActiveTab={setActiveTab}
          activeTab={activeTab}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50">
          {/* Header */}

          {/* Dashboard Content */}
          {activeTab === 'dashboard' && (
           <Dashboard/>
          )}

          {/* Courses Content */}
          {activeTab === 'courses' && (
           <MainCourcesSections
             courses={filteredCourses}
             searchQuery={searchQuery}
             setSearchQuery={setSearchQuery}
             courseFilter={courseFilter}
             setCourseFilter={setCourseFilter}
             filteredCourses={filteredCourses}
             getStatusBadge={getStatusBadge}
           />
          )}

          {/* Users Content */}
          {activeTab === 'users' && (
           <MainUsers
             searchQuery={searchQuery}
             setSearchQuery={setSearchQuery}
             userFilter={userFilter}
             setUserFilter={setUserFilter}
             filteredUsers={filteredUsers}
             users={users}
             getStatusBadge={getStatusBadge}
           />
          )}

          {/* Reports Content */}
          {activeTab === 'reports' && (
            <MainReportSection />
          )}

          {/* Settings Content */}
          {activeTab === 'settings' && (<MainSetting/>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;
