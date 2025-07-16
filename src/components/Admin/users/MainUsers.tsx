
import React, {  } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";


interface MainUsersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  userFilter: string;
  setUserFilter: (value: string) => void;
  filteredUsers: any[]; // Replace 'any' with your user type if available
  users: any[];         // Replace 'any' with your user type if available
  getStatusBadge: (status: string) => React.ReactNode;
}

function MainUsers({
  searchQuery,
  setSearchQuery,
  userFilter,
  setUserFilter,
  filteredUsers,
  users,
  getStatusBadge,
}: MainUsersProps) {
  return (
 <div className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div className="relative flex-grow max-w-md">
                  <Input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-slate-300"
                  />
                  <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                </div>
                <div className="flex gap-4">
                  <Select value={userFilter} onValueChange={setUserFilter}>
                    <SelectTrigger className="w-[180px] !rounded-button whitespace-nowrap">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="student">Students</SelectItem>
                      <SelectItem value="instructor">Instructors</SelectItem>
                      <SelectItem value="admin">Administrators</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="!rounded-button whitespace-nowrap">
                        <i className="fas fa-plus mr-2"></i> Add User
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                        <DialogDescription>
                          Create a new user account. Fill in all the required fields.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="user-name" className="text-right">
                            Full Name
                          </Label>
                          <Input id="user-name" className="col-span-3" placeholder="Enter full name" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="user-email" className="text-right">
                            Email
                          </Label>
                          <Input id="user-email" type="email" className="col-span-3" placeholder="Enter email address" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="user-role" className="text-right">
                            Role
                          </Label>
                          <Select>
                            <SelectTrigger className="col-span-3 !rounded-button">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="student">Student</SelectItem>
                              <SelectItem value="instructor">Instructor</SelectItem>
                              <SelectItem value="admin">Administrator</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="user-password" className="text-right">
                            Password
                          </Label>
                          <Input id="user-password" type="password" className="col-span-3" placeholder="Create password" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">
                            Status
                          </Label>
                          <div className="col-span-3 flex items-center space-x-2">
                            <Switch id="user-status" defaultChecked />
                            <Label htmlFor="user-status">Active account</Label>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right">
                            Send Email
                          </Label>
                          <div className="col-span-3 flex items-center space-x-2">
                            <Switch id="send-email" />
                            <Label htmlFor="send-email">Send welcome email with login details</Label>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" className="!rounded-button whitespace-nowrap">Cancel</Button>
                        <Button className="!rounded-button whitespace-nowrap">Create User</Button>
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
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="text-center">Courses</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user:any) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <Checkbox />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Avatar className="h-9 w-9 mr-3">
                                <AvatarImage src={`https://readdy.ai/api/search-image?query=professional%20headshot%20portrait%20of%20a%20person%20with%20neutral%20expression%2C%20high%20quality%20photography%2C%20clean%20background%2C%20professional%20lighting&width=100&height=100&seq=user${user.id}&orientation=squarish`} />
                                <AvatarFallback>{user.name.split(' ').map((n:any) => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-slate-500">{user.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={
                              user.role === 'instructor' ? 'bg-purple-100 text-purple-800 border-purple-200' :
                              user.role === 'admin' ? 'bg-red-100 text-red-800 border-red-200' :
                              'bg-blue-100 text-blue-800 border-blue-200'
                            }>
                              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">{user.courses}</TableCell>
                          <TableCell>{new Date(user.joined).toLocaleDateString()}</TableCell>
                          <TableCell>{new Date(user.lastActive).toLocaleDateString()}</TableCell>
                          <TableCell className="text-center">
                            {getStatusBadge(user.status)}
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-end space-x-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 !rounded-button">
                                <i className="fas fa-edit text-slate-600"></i>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 !rounded-button">
                                <i className="fas fa-envelope text-slate-600"></i>
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
                    Showing <span className="font-medium">{filteredUsers.length}</span> of <span className="font-medium">{users.length}</span> users
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

export default MainUsers