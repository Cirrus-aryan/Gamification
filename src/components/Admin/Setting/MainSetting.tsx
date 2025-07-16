
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

function MainSetting() {
return  (<div className="p-6">
            <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6 !rounded-button">
                  <TabsTrigger value="general" className="!rounded-button whitespace-nowrap">General</TabsTrigger>
                  <TabsTrigger value="appearance" className="!rounded-button whitespace-nowrap">Appearance</TabsTrigger>
                  <TabsTrigger value="notifications" className="!rounded-button whitespace-nowrap">Notifications</TabsTrigger>
                  <TabsTrigger value="security" className="!rounded-button whitespace-nowrap">Security</TabsTrigger>
                </TabsList>
                
                <TabsContent value="general">
                  <Card>
                    <CardHeader>
                      <CardTitle>Platform Settings</CardTitle>
                      <CardDescription>Manage your platform's general settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="platform-name">Platform Name</Label>
                        <Input id="platform-name" defaultValue="EduLearn Platform" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="platform-url">Platform URL</Label>
                        <Input id="platform-url" defaultValue="https://edulearn.com" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="contact-email">Contact Email</Label>
                        <Input id="contact-email" type="email" defaultValue="support@edulearn.com" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Default Timezone</Label>
                        <Select defaultValue="utc">
                          <SelectTrigger id="timezone" className="!rounded-button">
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="utc">UTC (Coordinated Universal Time)</SelectItem>
                            <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
                            <SelectItem value="cst">CST (Central Standard Time)</SelectItem>
                            <SelectItem value="mst">MST (Mountain Standard Time)</SelectItem>
                            <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="date-format">Date Format</Label>
                        <Select defaultValue="mdy">
                          <SelectTrigger id="date-format" className="!rounded-button">
                            <SelectValue placeholder="Select date format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                            <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                            <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch id="maintenance-mode" />
                        <Label htmlFor="maintenance-mode">Enable Maintenance Mode</Label>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-6 flex justify-between">
                      <Button variant="outline" className="!rounded-button whitespace-nowrap">Reset to Defaults</Button>
                      <Button className="!rounded-button whitespace-nowrap">Save Changes</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="appearance">
                  <Card>
                    <CardHeader>
                      <CardTitle>Appearance Settings</CardTitle>
                      <CardDescription>Customize your platform's look and feel</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label>Theme</Label>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="border rounded-lg p-4 flex flex-col items-center space-y-2 cursor-pointer bg-white shadow-sm">
                            <div className="w-full h-24 bg-white border rounded"></div>
                            <span className="text-sm font-medium">Light</span>
                          </div>
                          <div className="border rounded-lg p-4 flex flex-col items-center space-y-2 cursor-pointer">
                            <div className="w-full h-24 bg-slate-900 border rounded"></div>
                            <span className="text-sm font-medium">Dark</span>
                          </div>
                          <div className="border rounded-lg p-4 flex flex-col items-center space-y-2 cursor-pointer">
                            <div className="w-full h-24 bg-gradient-to-r from-white to-slate-900 border rounded"></div>
                            <span className="text-sm font-medium">System</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Primary Color</Label>
                        <div className="grid grid-cols-6 gap-4">
                          <div className="h-10 rounded-full bg-blue-600 cursor-pointer ring-2 ring-offset-2 ring-blue-600"></div>
                          <div className="h-10 rounded-full bg-purple-600 cursor-pointer"></div>
                          <div className="h-10 rounded-full bg-green-600 cursor-pointer"></div>
                          <div className="h-10 rounded-full bg-red-600 cursor-pointer"></div>
                          <div className="h-10 rounded-full bg-amber-600 cursor-pointer"></div>
                          <div className="h-10 rounded-full bg-slate-600 cursor-pointer"></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="logo-upload">Logo</Label>
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
                            <i className="fas fa-graduation-cap text-blue-600 text-2xl"></i>
                          </div>
                          <Button variant="outline" className="!rounded-button whitespace-nowrap">
                            <i className="fas fa-upload mr-2"></i> Upload New Logo
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="favicon-upload">Favicon</Label>
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center">
                            <i className="fas fa-graduation-cap text-blue-600 text-sm"></i>
                          </div>
                          <Button variant="outline" className="!rounded-button whitespace-nowrap">
                            <i className="fas fa-upload mr-2"></i> Upload New Favicon
                          </Button>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Font Family</Label>
                        <Select defaultValue="inter">
                          <SelectTrigger className="!rounded-button">
                            <SelectValue placeholder="Select font family" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="inter">Inter</SelectItem>
                            <SelectItem value="roboto">Roboto</SelectItem>
                            <SelectItem value="opensans">Open Sans</SelectItem>
                            <SelectItem value="lato">Lato</SelectItem>
                            <SelectItem value="poppins">Poppins</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-6 flex justify-between">
                      <Button variant="outline" className="!rounded-button whitespace-nowrap">Reset to Defaults</Button>
                      <Button className="!rounded-button whitespace-nowrap">Save Changes</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="notifications">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Settings</CardTitle>
                      <CardDescription>Manage your notification preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Email Notifications</h3>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">New User Registration</p>
                            <p className="text-sm text-slate-500">Receive an email when a new user registers</p>
                          </div>
                          <Switch id="email-new-user" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">New Course Enrollment</p>
                            <p className="text-sm text-slate-500">Receive an email when a user enrolls in a course</p>
                          </div>
                          <Switch id="email-enrollment" />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">New Course Review</p>
                            <p className="text-sm text-slate-500">Receive an email when a user reviews a course</p>
                          </div>
                          <Switch id="email-review" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Support Tickets</p>
                            <p className="text-sm text-slate-500">Receive an email for new support tickets</p>
                          </div>
                          <Switch id="email-support" defaultChecked />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">System Notifications</h3>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Dashboard Alerts</p>
                            <p className="text-sm text-slate-500">Show alerts on the admin dashboard</p>
                          </div>
                          <Switch id="system-alerts" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Browser Notifications</p>
                            <p className="text-sm text-slate-500">Show browser notifications for important events</p>
                          </div>
                          <Switch id="browser-notifications" />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Weekly Reports</p>
                            <p className="text-sm text-slate-500">Receive weekly platform performance reports</p>
                          </div>
                          <Switch id="weekly-reports" defaultChecked />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-6 flex justify-between">
                      <Button variant="outline" className="!rounded-button whitespace-nowrap">Reset to Defaults</Button>
                      <Button className="!rounded-button whitespace-nowrap">Save Changes</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="security">
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                      <CardDescription>Manage your platform's security settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Authentication</h3>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Two-Factor Authentication</p>
                            <p className="text-sm text-slate-500">Require 2FA for admin accounts</p>
                          </div>
                          <Switch id="2fa" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Single Sign-On (SSO)</p>
                            <p className="text-sm text-slate-500">Enable SSO authentication</p>
                          </div>
                          <Switch id="sso" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="password-policy">Password Policy</Label>
                          <Select defaultValue="strong">
                            <SelectTrigger id="password-policy" className="!rounded-button">
                              <SelectValue placeholder="Select password policy" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                              <SelectItem value="medium">Medium (8+ chars, letters & numbers)</SelectItem>
                              <SelectItem value="strong">Strong (8+ chars, mixed case, numbers & symbols)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Session Management</h3>
                        
                        <div className="space-y-2">
                          <Label htmlFor="session-timeout">Session Timeout</Label>
                          <Select defaultValue="60">
                            <SelectTrigger id="session-timeout" className="!rounded-button">
                              <SelectValue placeholder="Select timeout period" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="15">15 minutes</SelectItem>
                              <SelectItem value="30">30 minutes</SelectItem>
                              <SelectItem value="60">1 hour</SelectItem>
                              <SelectItem value="120">2 hours</SelectItem>
                              <SelectItem value="240">4 hours</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Force Logout on Password Change</p>
                            <p className="text-sm text-slate-500">Log users out when they change their password</p>
                          </div>
                          <Switch id="force-logout" defaultChecked />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Data Protection</h3>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Data Encryption</p>
                            <p className="text-sm text-slate-500">Enable end-to-end encryption for sensitive data</p>
                          </div>
                          <Switch id="encryption" defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">GDPR Compliance</p>
                            <p className="text-sm text-slate-500">Enable GDPR compliance features</p>
                          </div>
                          <Switch id="gdpr" defaultChecked />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="data-retention">Data Retention Period</Label>
                          <Select defaultValue="365">
                            <SelectTrigger id="data-retention" className="!rounded-button">
                              <SelectValue placeholder="Select retention period" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="30">30 days</SelectItem>
                              <SelectItem value="90">90 days</SelectItem>
                              <SelectItem value="180">6 months</SelectItem>
                              <SelectItem value="365">1 year</SelectItem>
                              <SelectItem value="730">2 years</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-6 flex justify-between">
                      <Button variant="outline" className="!rounded-button whitespace-nowrap">Reset to Defaults</Button>
                      <Button className="!rounded-button whitespace-nowrap">Save Changes</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          ) 
}

export default MainSetting