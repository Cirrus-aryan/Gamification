import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
function Dashboard() {
  return (
 <div className="p-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-slate-500">Total Users</p>
                        <h3 className="text-3xl font-bold text-slate-900 mt-1">8,742</h3>
                        <p className="text-sm text-green-600 mt-1 flex items-center">
                          <i className="fas fa-arrow-up mr-1"></i> 12% from last month
                        </p>
                      </div>
                      <div className="bg-blue-100 p-3 rounded-full">
                        <i className="fas fa-users text-blue-600 text-xl"></i>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-slate-500">Active Courses</p>
                        <h3 className="text-3xl font-bold text-slate-900 mt-1">124</h3>
                        <p className="text-sm text-green-600 mt-1 flex items-center">
                          <i className="fas fa-arrow-up mr-1"></i> 8% from last month
                        </p>
                      </div>
                      <div className="bg-green-100 p-3 rounded-full">
                        <i className="fas fa-book text-green-600 text-xl"></i>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-slate-500">Total Revenue</p>
                        <h3 className="text-3xl font-bold text-slate-900 mt-1">$143,620</h3>
                        <p className="text-sm text-green-600 mt-1 flex items-center">
                          <i className="fas fa-arrow-up mr-1"></i> 15% from last month
                        </p>
                      </div>
                      <div className="bg-purple-100 p-3 rounded-full">
                        <i className="fas fa-dollar-sign text-purple-600 text-xl"></i>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-slate-500">Course Completions</p>
                        <h3 className="text-3xl font-bold text-slate-900 mt-1">3,587</h3>
                        <p className="text-sm text-amber-600 mt-1 flex items-center">
                          <i className="fas fa-arrow-down mr-1"></i> 3% from last month
                        </p>
                      </div>
                      <div className="bg-amber-100 p-3 rounded-full">
                        <i className="fas fa-graduation-cap text-amber-600 text-xl"></i>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Main Chart */}
              <Card className="mb-6">
                <CardHeader className="pb-2">
                  <CardTitle>Platform Activity</CardTitle>
                  <CardDescription>7-day overview of key platform metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div id="main-chart" style={{ width: '100%', height: '400px' }}></div>
                </CardContent>
              </Card>
              
              {/* Secondary Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Course Enrollment Status</CardTitle>
                    <CardDescription>Distribution of student progress</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div id="enrollment-chart" style={{ width: '100%', height: '300px' }}></div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Popular Categories</CardTitle>
                    <CardDescription>Enrollment distribution by category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div id="category-chart" style={{ width: '100%', height: '300px' }}></div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Recent Activity */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest platform events and notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-full mr-4">
                        <i className="fas fa-user-plus text-blue-600"></i>
                      </div>
                      <div>
                        <p className="font-medium">New User Registration</p>
                        <p className="text-sm text-slate-500">Daniel Brown joined the platform</p>
                        <p className="text-xs text-slate-400 mt-1">10 minutes ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-green-100 p-2 rounded-full mr-4">
                        <i className="fas fa-check-circle text-green-600"></i>
                      </div>
                      <div>
                        <p className="font-medium">Course Completion</p>
                        <p className="text-sm text-slate-500">Emma Davis completed "Data Science Fundamentals"</p>
                        <p className="text-xs text-slate-400 mt-1">45 minutes ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-purple-100 p-2 rounded-full mr-4">
                        <i className="fas fa-star text-purple-600"></i>
                      </div>
                      <div>
                        <p className="font-medium">New Course Review</p>
                        <p className="text-sm text-slate-500">Alex Johnson rated "UX/UI Design Principles" 5 stars</p>
                        <p className="text-xs text-slate-400 mt-1">1 hour ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-amber-100 p-2 rounded-full mr-4">
                        <i className="fas fa-book text-amber-600"></i>
                      </div>
                      <div>
                        <p className="font-medium">New Course Published</p>
                        <p className="text-sm text-slate-500">"Advanced JavaScript Frameworks" is now live</p>
                        <p className="text-xs text-slate-400 mt-1">3 hours ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-red-100 p-2 rounded-full mr-4">
                        <i className="fas fa-exclamation-circle text-red-600"></i>
                      </div>
                      <div>
                        <p className="font-medium">Support Ticket</p>
                        <p className="text-sm text-slate-500">New support request from Sophia Lee</p>
                        <p className="text-xs text-slate-400 mt-1">5 hours ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button variant="outline" className="w-full !rounded-button whitespace-nowrap">
                    View All Activity
                  </Button>
                </CardFooter>
              </Card>
            </div>  )
}

export default Dashboard