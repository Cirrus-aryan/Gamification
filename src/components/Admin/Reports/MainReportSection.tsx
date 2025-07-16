
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function MainReportSection() {
  return (
 <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Report</CardTitle>
                    <CardDescription>Financial performance overview</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Total Revenue</span>
                        <span className="font-bold">$143,620</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">This Month</span>
                        <span className="font-bold">$42,580</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Last Month</span>
                        <span className="font-bold">$37,120</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Growth</span>
                        <span className="font-bold text-green-600">+14.7%</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button variant="outline" className="w-full !rounded-button whitespace-nowrap">
                      <i className="fas fa-download mr-2"></i> Download Report
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>User Engagement</CardTitle>
                    <CardDescription>Platform activity metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Active Users</span>
                        <span className="font-bold">6,842</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">New Registrations</span>
                        <span className="font-bold">1,254</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Avg. Session Time</span>
                        <span className="font-bold">24 min</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Retention Rate</span>
                        <span className="font-bold text-green-600">78%</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button variant="outline" className="w-full !rounded-button whitespace-nowrap">
                      <i className="fas fa-download mr-2"></i> Download Report
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Course Performance</CardTitle>
                    <CardDescription>Content engagement metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Total Enrollments</span>
                        <span className="font-bold">12,587</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Completion Rate</span>
                        <span className="font-bold">64%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Avg. Rating</span>
                        <span className="font-bold">4.7/5.0</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Satisfaction Score</span>
                        <span className="font-bold text-green-600">92%</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button variant="outline" className="w-full !rounded-button whitespace-nowrap">
                      <i className="fas fa-download mr-2"></i> Download Report
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Top Performing Courses</CardTitle>
                      <CardDescription>Courses with highest enrollment and completion rates</CardDescription>
                    </div>
                    <Select defaultValue="revenue">
                      <SelectTrigger className="w-[180px] !rounded-button whitespace-nowrap">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="revenue">Revenue</SelectItem>
                        <SelectItem value="enrollments">Enrollments</SelectItem>
                        <SelectItem value="rating">Rating</SelectItem>
                        <SelectItem value="completion">Completion Rate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course</TableHead>
                        <TableHead className="text-center">Enrollments</TableHead>
                        <TableHead className="text-center">Completion</TableHead>
                        <TableHead className="text-center">Rating</TableHead>
                        <TableHead className="text-right">Revenue</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">UX/UI Design Principles</div>
                          <div className="text-sm text-slate-500">Michael Chen</div>
                        </TableCell>
                        <TableCell className="text-center">1,532</TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center">
                            <span className="mr-2">78%</span>
                            <Progress value={78} className="h-2 w-16 bg-slate-200" />
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center">
                            <span className="mr-1">4.9</span>
                            <i className="fas fa-star text-amber-400 text-sm"></i>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">$30,640</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Introduction to Web Development</div>
                          <div className="text-sm text-slate-500">Alex Johnson</div>
                        </TableCell>
                        <TableCell className="text-center">1,245</TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center">
                            <span className="mr-2">65%</span>
                            <Progress value={65} className="h-2 w-16 bg-slate-200" />
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center">
                            <span className="mr-1">4.8</span>
                            <i className="fas fa-star text-amber-400 text-sm"></i>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">$24,900</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Mobile App Development</div>
                          <div className="text-sm text-slate-500">Olivia Martinez</div>
                        </TableCell>
                        <TableCell className="text-center">1,098</TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center">
                            <span className="mr-2">72%</span>
                            <Progress value={72} className="h-2 w-16 bg-slate-200" />
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center">
                            <span className="mr-1">4.7</span>
                            <i className="fas fa-star text-amber-400 text-sm"></i>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">$21,960</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Data Science Fundamentals</div>
                          <div className="text-sm text-slate-500">Sarah Williams</div>
                        </TableCell>
                        <TableCell className="text-center">987</TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center">
                            <span className="mr-2">68%</span>
                            <Progress value={68} className="h-2 w-16 bg-slate-200" />
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center">
                            <span className="mr-1">4.7</span>
                            <i className="fas fa-star text-amber-400 text-sm"></i>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">$19,740</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium">Advanced JavaScript Frameworks</div>
                          <div className="text-sm text-slate-500">Emma Davis</div>
                        </TableCell>
                        <TableCell className="text-center">876</TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center">
                            <span className="mr-2">58%</span>
                            <Progress value={58} className="h-2 w-16 bg-slate-200" />
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center">
                            <span className="mr-1">4.6</span>
                            <i className="fas fa-star text-amber-400 text-sm"></i>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">$17,520</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="border-t p-4">
                  <Button variant="outline" className="w-full !rounded-button whitespace-nowrap">
                    View All Courses
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Top Instructors</CardTitle>
                      <CardDescription>Instructors with highest student engagement and ratings</CardDescription>
                    </div>
                    <Select defaultValue="students">
                      <SelectTrigger className="w-[180px] !rounded-button whitespace-nowrap">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="students">Total Students</SelectItem>
                        <SelectItem value="courses">Courses</SelectItem>
                        <SelectItem value="rating">Rating</SelectItem>
                        <SelectItem value="revenue">Revenue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Instructor</TableHead>
                        <TableHead className="text-center">Courses</TableHead>
                        <TableHead className="text-center">Students</TableHead>
                        <TableHead className="text-center">Avg. Rating</TableHead>
                        <TableHead className="text-right">Total Revenue</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <div className="flex items-center">
                            <Avatar className="h-9 w-9 mr-3">
                              <AvatarImage src="https://readdy.ai/api/search-image?query=professional%20headshot%20portrait%20of%20a%20person%20with%20neutral%20expression%2C%20high%20quality%20photography%2C%20clean%20background%2C%20professional%20lighting&width=100&height=100&seq=user3&orientation=squarish" />
                              <AvatarFallback>MC</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">Michael Chen</p>
                              <p className="text-sm text-slate-500">Design</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">3</TableCell>
                        <TableCell className="text-center">2,845</TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center">
                            <span className="mr-1">4.9</span>
                            <i className="fas fa-star text-amber-400 text-sm"></i>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">$56,900</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="flex items-center">
                            <Avatar className="h-9 w-9 mr-3">
                              <AvatarImage src="https://readdy.ai/api/search-image?query=professional%20headshot%20portrait%20of%20a%20person%20with%20neutral%20expression%2C%20high%20quality%20photography%2C%20clean%20background%2C%20professional%20lighting&width=100&height=100&seq=user1&orientation=squarish" />
                              <AvatarFallback>AJ</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">Alex Johnson</p>
                              <p className="text-sm text-slate-500">Development</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">4</TableCell>
                        <TableCell className="text-center">2,532</TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center">
                            <span className="mr-1">4.8</span>
                            <i className="fas fa-star text-amber-400 text-sm"></i>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">$50,640</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="flex items-center">
                            <Avatar className="h-9 w-9 mr-3">
                              <AvatarImage src="https://readdy.ai/api/search-image?query=professional%20headshot%20portrait%20of%20a%20person%20with%20neutral%20expression%2C%20high%20quality%20photography%2C%20clean%20background%2C%20professional%20lighting&width=100&height=100&seq=user6&orientation=squarish" />
                              <AvatarFallback>OM</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">Olivia Martinez</p>
                              <p className="text-sm text-slate-500">Development</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">2</TableCell>
                        <TableCell className="text-center">1,876</TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center">
                            <span className="mr-1">4.7</span>
                            <i className="fas fa-star text-amber-400 text-sm"></i>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">$37,520</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="flex items-center">
                            <Avatar className="h-9 w-9 mr-3">
                              <AvatarImage src="https://readdy.ai/api/search-image?query=professional%20headshot%20portrait%20of%20a%20person%20with%20neutral%20expression%2C%20high%20quality%20photography%2C%20clean%20background%2C%20professional%20lighting&width=100&height=100&seq=user2&orientation=squarish" />
                              <AvatarFallback>SW</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">Sarah Williams</p>
                              <p className="text-sm text-slate-500">Data Science</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">2</TableCell>
                        <TableCell className="text-center">1,654</TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center">
                            <span className="mr-1">4.7</span>
                            <i className="fas fa-star text-amber-400 text-sm"></i>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">$33,080</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <div className="flex items-center">
                            <Avatar className="h-9 w-9 mr-3">
                              <AvatarImage src="https://readdy.ai/api/search-image?query=professional%20headshot%20portrait%20of%20a%20person%20with%20neutral%20expression%2C%20high%20quality%20photography%2C%20clean%20background%2C%20professional%20lighting&width=100&height=100&seq=user7&orientation=squarish" />
                              <AvatarFallback>DT</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">David Thompson</p>
                              <p className="text-sm text-slate-500">Marketing</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">2</TableCell>
                        <TableCell className="text-center">1,432</TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center">
                            <span className="mr-1">4.4</span>
                            <i className="fas fa-star text-amber-400 text-sm"></i>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">$28,640</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="border-t p-4">
                  <Button variant="outline" className="w-full !rounded-button whitespace-nowrap">
                    View All Instructors
                  </Button>
                </CardFooter>
              </Card>
            </div>  )
}

export default MainReportSection