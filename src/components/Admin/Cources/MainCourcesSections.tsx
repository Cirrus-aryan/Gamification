import React, {  } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";


interface MainCoursesSectionsProps {
  courses: any[];
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  courseFilter: string;
  setCourseFilter: (value: string) => void;
  filteredCourses: any[];
  getStatusBadge: (status: string) => React.ReactNode;
}

function MainCourcesSections({
  courses,

  searchQuery,
  setSearchQuery,
  courseFilter,
  setCourseFilter,
  filteredCourses,
  getStatusBadge,
}: MainCoursesSectionsProps) {
  return (
 <div className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div className="relative flex-grow max-w-md">
                  <Input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-slate-300"
                  />
                  <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                </div>
                <div className="flex gap-4">
                  <Select value={courseFilter} onValueChange={setCourseFilter}>
                    <SelectTrigger className="w-[180px] !rounded-button whitespace-nowrap">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="review">Under Review</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="!rounded-button whitespace-nowrap">
                        <i className="fas fa-plus mr-2"></i> Add Course
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Add New Course</DialogTitle>
                        <DialogDescription>
                          Create a new course to add to your platform. Fill in all the required fields.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="course-title" className="text-right">
                            Title
                          </Label>
                          <Input id="course-title" className="col-span-3" placeholder="Enter course title" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="course-instructor" className="text-right">
                            Instructor
                          </Label>
                          <Select>
                            <SelectTrigger className="col-span-3 !rounded-button">
                              <SelectValue placeholder="Select instructor" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">Alex Johnson</SelectItem>
                              <SelectItem value="2">Sarah Williams</SelectItem>
                              <SelectItem value="3">Michael Chen</SelectItem>
                              <SelectItem value="4">Emma Davis</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="course-category" className="text-right">
                            Category
                          </Label>
                          <Select>
                            <SelectTrigger className="col-span-3 !rounded-button">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="development">Development</SelectItem>
                              <SelectItem value="design">Design</SelectItem>
                              <SelectItem value="data">Data Science</SelectItem>
                              <SelectItem value="business">Business</SelectItem>
                              <SelectItem value="marketing">Marketing</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                          <Label htmlFor="course-description" className="text-right pt-2">
                            Description
                          </Label>
                          <Textarea id="course-description" className="col-span-3" placeholder="Enter course description" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="course-price" className="text-right">
                            Price ($)
                          </Label>
                          <Input id="course-price" type="number" className="col-span-3" placeholder="Enter price" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">
                            Status
                          </Label>
                          <div className="col-span-3 flex items-center space-x-2">
                            <Switch id="course-status" />
                            <Label htmlFor="course-status">Publish immediately</Label>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" className="!rounded-button whitespace-nowrap">Cancel</Button>
                        <Button className="!rounded-button whitespace-nowrap">Create Course</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">
                          <Checkbox />
                        </TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Instructor</TableHead>
                        <TableHead className="text-center">Students</TableHead>
                        <TableHead className="text-center">Rating</TableHead>
                        <TableHead className="text-right">Revenue</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCourses.map((course:any) => (
                        <TableRow key={course.id}>
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{course.title}</p>
                              <p className="text-sm text-slate-500">Last updated: {new Date(course.lastUpdated).toLocaleDateString()}</p>
                            </div>
                          </TableCell>
                          <TableCell>{course.instructor}</TableCell>
                          <TableCell className="text-center">{course.students.toLocaleString()}</TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center">
                              <span className="mr-1">{course.rating}</span>
                              <i className="fas fa-star text-amber-400 text-sm"></i>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">${course.revenue.toLocaleString()}</TableCell>
                          <TableCell className="text-center">
                            {getStatusBadge(course.status)}
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-end space-x-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 !rounded-button">
                                <i className="fas fa-edit text-slate-600"></i>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 !rounded-button">
                                <i className="fas fa-chart-line text-slate-600"></i>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 !rounded-button">
                                <i className="fas fa-trash text-slate-600"></i>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t p-4">
                  <div className="text-sm text-slate-500">
                    Showing <span className="font-medium">{filteredCourses.length}</span> of <span className="font-medium">{courses.length}</span> courses
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="!rounded-button whitespace-nowrap">
                      <i className="fas fa-chevron-left mr-2"></i> Previous
                    </Button>
                    <Button variant="outline" size="sm" className="!rounded-button whitespace-nowrap">
                      Next <i className="fas fa-chevron-right ml-2"></i>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>  )
}

export default MainCourcesSections