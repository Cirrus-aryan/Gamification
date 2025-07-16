// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileImage, setProfileImage] = useState("https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20person%20with%20a%20friendly%20smile%2C%20neutral%20background%2C%20high%20quality%20portrait%20photograph%2C%20clean%20minimal%20style&width=200&height=200&seq=10&orientation=squarish");
  const [fullName, setFullName] = useState("John Doe");
  const [bio, setBio] = useState("Passionate learner and tech enthusiast with a focus on web development and data science.");
  const [location, setLocation] = useState("San Francisco, CA");
  const [profession, setProfession] = useState("Software Developer");
  const [email] = useState("john.doe@example.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [learningReminders, setLearningReminders] = useState(true);
  const [courseUpdates, setCourseUpdates] = useState(true);
  const [marketingCommunications, setMarketingCommunications] = useState(false);
  const [difficultyLevel, setDifficultyLevel] = useState("intermediate");
  const [theme, setTheme] = useState("light");
  const [fontSize, setFontSize] = useState(16);
  const [density, setDensity] = useState("default");
  const [colorScheme, setColorScheme] = useState("indigo");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    // Save profile implementation would go here
    alert("Profile settings saved successfully!");
  };

  const handleSaveAccount = () => {
    // Save account implementation would go here
    if (newPassword !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    alert("Account settings saved successfully!");
  };

  const handleSaveNotifications = () => {
    // Save notifications implementation would go here
    alert("Notification preferences saved successfully!");
  };

  const handleSaveLearningPreferences = () => {
    // Save learning preferences implementation would go here
    alert("Learning preferences saved successfully!");
  };

  const handleSavePrivacy = () => {
    // Save privacy implementation would go here
    alert("Privacy settings saved successfully!");
  };

  const handleSaveAppearance = () => {
    // Save appearance implementation would go here
    alert("Appearance settings saved successfully!");
  };

  const topicsOfInterest = [
    { id: "web-dev", label: "Web Development" },
    { id: "data-science", label: "Data Science" },
    { id: "mobile-dev", label: "Mobile Development" },
    { id: "ui-ux", label: "UI/UX Design" },
    { id: "ai-ml", label: "AI & Machine Learning" },
    { id: "blockchain", label: "Blockchain" },
    { id: "cloud", label: "Cloud Computing" },
    { id: "cybersecurity", label: "Cybersecurity" },
    { id: "devops", label: "DevOps" },
    { id: "game-dev", label: "Game Development" },
  ];

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
              <AvatarImage src={profileImage} />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{fullName}</p>
              <p className="text-xs text-gray-500">Premium Member</p>
            </div>
          </div>
        </div>
        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            <li>
              <a href="https://readdy.ai/home/384eec86-e7cc-4f56-82b6-4e6caaa1d74d/4c918d81-92db-424c-809c-2575bc35370c" data-readdy="true" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer">
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
              <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer">
                <i className="fa-solid fa-calendar w-5 text-center"></i>
                <span>Calendar</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer">
                <i className="fa-solid fa-message w-5 text-center"></i>
                <span>Messages</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-indigo-50 text-indigo-600 font-medium cursor-pointer">
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
          <div className="flex items-center space-x-4">
            <a href="https://readdy.ai/home/384eec86-e7cc-4f56-82b6-4e6caaa1d74d/4c918d81-92db-424c-809c-2575bc35370c" data-readdy="true" className="text-gray-500 hover:text-gray-700 cursor-pointer">
              <i className="fa-solid fa-arrow-left text-lg"></i>
            </a>
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative cursor-pointer">
              <i className="fa-solid fa-bell text-gray-600 text-xl"></i>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
            </div>
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={profileImage} />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span className="font-medium text-sm">{fullName}</span>
            </div>
          </div>
        </header>

        {/* Settings Content */}
        <div className="flex-1 overflow-auto bg-gray-50">
          <div className="container mx-auto py-6 px-4 max-w-6xl">
            <Card className="shadow-sm">
              <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full justify-start border-b rounded-none p-0 h-auto bg-transparent">
                  <TabsTrigger 
                    value="profile" 
                    className="px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:bg-transparent rounded-none"
                  >
                    <i className="fa-solid fa-user mr-2"></i>
                    Profile
                  </TabsTrigger>
                  <TabsTrigger 
                    value="account" 
                    className="px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:bg-transparent rounded-none"
                  >
                    <i className="fa-solid fa-lock mr-2"></i>
                    Account
                  </TabsTrigger>
                  <TabsTrigger 
                    value="notifications" 
                    className="px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:bg-transparent rounded-none"
                  >
                    <i className="fa-solid fa-bell mr-2"></i>
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger 
                    value="learning" 
                    className="px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:bg-transparent rounded-none"
                  >
                    <i className="fa-solid fa-graduation-cap mr-2"></i>
                    Learning Preferences
                  </TabsTrigger>
                  <TabsTrigger 
                    value="privacy" 
                    className="px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:bg-transparent rounded-none"
                  >
                    <i className="fa-solid fa-shield-halved mr-2"></i>
                    Privacy
                  </TabsTrigger>
                  <TabsTrigger 
                    value="appearance" 
                    className="px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:bg-transparent rounded-none"
                  >
                    <i className="fa-solid fa-palette mr-2"></i>
                    Appearance
                  </TabsTrigger>
                </TabsList>

                <ScrollArea className="h-[calc(100vh-220px)]">
                  <CardContent className="p-6">
                    {/* Profile Tab */}
                    <TabsContent value="profile" className="mt-0">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-xl font-semibold mb-1">Profile Information</h2>
                          <p className="text-gray-500 text-sm">Update your personal information and how it appears on your profile</p>
                        </div>
                        
                        <Separator />
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          <div className="col-span-1">
                            <div className="flex flex-col items-center space-y-4">
                              <div className="relative">
                                <Avatar className="h-32 w-32 border-4 border-white shadow-md">
                                  <AvatarImage src={profileImage} />
                                  <AvatarFallback className="text-3xl">{fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <Button 
                                  size="sm" 
                                  className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0 !rounded-button cursor-pointer"
                                  onClick={() => document.getElementById('profile-image-upload')?.click()}
                                >
                                  <i className="fa-solid fa-camera"></i>
                                </Button>
                                <input 
                                  id="profile-image-upload" 
                                  type="file" 
                                  accept="image/*" 
                                  className="hidden" 
                                  onChange={handleImageUpload}
                                />
                              </div>
                              <div className="text-center">
                                <p className="text-sm text-gray-500">Upload a new photo</p>
                                <p className="text-xs text-gray-400 mt-1">JPG, GIF or PNG. Max size 2MB</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="col-span-2 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input 
                                  id="fullName" 
                                  value={fullName} 
                                  onChange={(e) => setFullName(e.target.value)} 
                                  placeholder="Enter your full name"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input 
                                  id="location" 
                                  value={location} 
                                  onChange={(e) => setLocation(e.target.value)} 
                                  placeholder="City, Country"
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="profession">Professional Title</Label>
                              <Input 
                                id="profession" 
                                value={profession} 
                                onChange={(e) => setProfession(e.target.value)} 
                                placeholder="e.g. Software Developer, Data Scientist"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="bio">Bio</Label>
                              <textarea 
                                id="bio" 
                                value={bio} 
                                onChange={(e) => setBio(e.target.value)} 
                                placeholder="Tell us about yourself"
                                className="w-full min-h-[120px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Social Media Links</Label>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative">
                                  <i className="fa-brands fa-linkedin text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"></i>
                                  <Input className="pl-10" placeholder="LinkedIn URL" />
                                </div>
                                <div className="relative">
                                  <i className="fa-brands fa-github text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"></i>
                                  <Input className="pl-10" placeholder="GitHub URL" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="flex justify-end space-x-3">
                          <Button variant="outline" className="!rounded-button whitespace-nowrap cursor-pointer">Cancel</Button>
                          <Button onClick={handleSaveProfile} className="!rounded-button whitespace-nowrap cursor-pointer">
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Account Tab */}
                    <TabsContent value="account" className="mt-0">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-xl font-semibold mb-1">Account Settings</h2>
                          <p className="text-gray-500 text-sm">Manage your account credentials and subscription</p>
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-medium mb-4">Email Address</h3>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                                <div>
                                  <p className="font-medium">{email}</p>
                                  <p className="text-sm text-gray-500">Primary email address</p>
                                </div>
                                <Button variant="outline" size="sm" className="!rounded-button whitespace-nowrap cursor-pointer">
                                  Change Email
                                </Button>
                              </div>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div>
                            <h3 className="text-lg font-medium mb-4">Password</h3>
                            <div className="space-y-4 max-w-md">
                              <div className="space-y-2">
                                <Label htmlFor="currentPassword">Current Password</Label>
                                <Input 
                                  id="currentPassword" 
                                  type="password" 
                                  value={currentPassword} 
                                  onChange={(e) => setCurrentPassword(e.target.value)} 
                                  placeholder="Enter your current password"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="newPassword">New Password</Label>
                                <Input 
                                  id="newPassword" 
                                  type="password" 
                                  value={newPassword} 
                                  onChange={(e) => setNewPassword(e.target.value)} 
                                  placeholder="Enter new password"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                <Input 
                                  id="confirmPassword" 
                                  type="password" 
                                  value={confirmPassword} 
                                  onChange={(e) => setConfirmPassword(e.target.value)} 
                                  placeholder="Confirm new password"
                                />
                              </div>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div>
                            <h3 className="text-lg font-medium mb-4">Subscription</h3>
                            <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-lg max-w-md">
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium text-indigo-700">Premium Plan</p>
                                  <p className="text-sm text-indigo-600">Renews on August 4, 2025</p>
                                </div>
                                <Button variant="outline" size="sm" className="!rounded-button whitespace-nowrap cursor-pointer">
                                  Manage
                                </Button>
                              </div>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div>
                            <h3 className="text-lg font-medium mb-4">Connected Accounts</h3>
                            <div className="space-y-3 max-w-md">
                              <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                                <div className="flex items-center space-x-3">
                                  <i className="fa-brands fa-google text-xl text-red-500"></i>
                                  <div>
                                    <p className="font-medium">Google</p>
                                    <p className="text-sm text-gray-500">Connected</p>
                                  </div>
                                </div>
                                <Button variant="ghost" size="sm" className="text-red-500 !rounded-button whitespace-nowrap cursor-pointer">
                                  Disconnect
                                </Button>
                              </div>
                              <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                                <div className="flex items-center space-x-3">
                                  <i className="fa-brands fa-github text-xl"></i>
                                  <div>
                                    <p className="font-medium">GitHub</p>
                                    <p className="text-sm text-gray-500">Not connected</p>
                                  </div>
                                </div>
                                <Button variant="outline" size="sm" className="!rounded-button whitespace-nowrap cursor-pointer">
                                  Connect
                                </Button>
                              </div>
                              <div className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                                <div className="flex items-center space-x-3">
                                  <i className="fa-brands fa-linkedin text-xl text-blue-600"></i>
                                  <div>
                                    <p className="font-medium">LinkedIn</p>
                                    <p className="text-sm text-gray-500">Not connected</p>
                                  </div>
                                </div>
                                <Button variant="outline" size="sm" className="!rounded-button whitespace-nowrap cursor-pointer">
                                  Connect
                                </Button>
                              </div>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div>
                            <h3 className="text-lg font-medium mb-2 text-red-600">Danger Zone</h3>
                            <p className="text-gray-500 text-sm mb-4">Permanently delete your account and all of your content.</p>
                            <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 !rounded-button whitespace-nowrap cursor-pointer">
                              Delete Account
                            </Button>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="flex justify-end space-x-3">
                          <Button variant="outline" className="!rounded-button whitespace-nowrap cursor-pointer">Cancel</Button>
                          <Button onClick={handleSaveAccount} className="!rounded-button whitespace-nowrap cursor-pointer">
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Notifications Tab */}
                    <TabsContent value="notifications" className="mt-0">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-xl font-semibold mb-1">Notification Preferences</h2>
                          <p className="text-gray-500 text-sm">Control how and when you receive notifications</p>
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-6 max-w-3xl">
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Email Notifications</h3>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                  <Label htmlFor="email-notifications" className="text-base">Course Updates</Label>
                                  <p className="text-sm text-gray-500">Receive emails about new content in your enrolled courses</p>
                                </div>
                                <Switch 
                                  id="email-notifications" 
                                  checked={emailNotifications} 
                                  onCheckedChange={setEmailNotifications} 
                                />
                              </div>
                              <Separator />
                              <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                  <Label htmlFor="learning-reminders" className="text-base">Learning Reminders</Label>
                                  <p className="text-sm text-gray-500">Receive reminders to continue your learning journey</p>
                                </div>
                                <Switch 
                                  id="learning-reminders" 
                                  checked={learningReminders} 
                                  onCheckedChange={setLearningReminders} 
                                />
                              </div>
                              <Separator />
                              <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                  <Label htmlFor="course-updates" className="text-base">Assignment Deadlines</Label>
                                  <p className="text-sm text-gray-500">Receive notifications about upcoming assignment deadlines</p>
                                </div>
                                <Switch 
                                  id="course-updates" 
                                  checked={courseUpdates} 
                                  onCheckedChange={setCourseUpdates} 
                                />
                              </div>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Push Notifications</h3>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                  <Label htmlFor="push-notifications" className="text-base">Enable Push Notifications</Label>
                                  <p className="text-sm text-gray-500">Receive notifications directly to your browser or mobile device</p>
                                </div>
                                <Switch 
                                  id="push-notifications" 
                                  checked={pushNotifications} 
                                  onCheckedChange={setPushNotifications} 
                                />
                              </div>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Marketing Communications</h3>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                  <Label htmlFor="marketing-communications" className="text-base">Promotional Emails</Label>
                                  <p className="text-sm text-gray-500">Receive emails about new courses, features, and special offers</p>
                                </div>
                                <Switch 
                                  id="marketing-communications" 
                                  checked={marketingCommunications} 
                                  onCheckedChange={setMarketingCommunications} 
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="flex justify-end space-x-3">
                          <Button variant="outline" className="!rounded-button whitespace-nowrap cursor-pointer">Cancel</Button>
                          <Button onClick={handleSaveNotifications} className="!rounded-button whitespace-nowrap cursor-pointer">
                            Save Preferences
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Learning Preferences Tab */}
                    <TabsContent value="learning" className="mt-0">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-xl font-semibold mb-1">Learning Preferences</h2>
                          <p className="text-gray-500 text-sm">Customize your learning experience to match your goals and interests</p>
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-6 max-w-3xl">
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Difficulty Level</h3>
                            <p className="text-sm text-gray-500">Select your preferred difficulty level for recommended courses</p>
                            <RadioGroup 
                              value={difficultyLevel} 
                              onValueChange={setDifficultyLevel}
                              className="flex flex-col space-y-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="beginner" id="beginner" />
                                <Label htmlFor="beginner">Beginner - I'm just starting out</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="intermediate" id="intermediate" />
                                <Label htmlFor="intermediate">Intermediate - I have some experience</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="advanced" id="advanced" />
                                <Label htmlFor="advanced">Advanced - I'm looking for challenging content</Label>
                              </div>
                            </RadioGroup>
                          </div>
                          
                          <Separator />
                          
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Topics of Interest</h3>
                            <p className="text-sm text-gray-500">Select topics you're interested in learning about</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {topicsOfInterest.map((topic) => (
                                <div key={topic.id} className="flex items-center space-x-2">
                                  <Checkbox id={topic.id} />
                                  <Label htmlFor={topic.id}>{topic.label}</Label>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Learning Schedule</h3>
                            <p className="text-sm text-gray-500">Set your preferred learning schedule for reminders</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="preferred-days">Preferred Days</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select days" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="weekdays">Weekdays</SelectItem>
                                    <SelectItem value="weekends">Weekends</SelectItem>
                                    <SelectItem value="all">All Days</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="preferred-time">Preferred Time</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select time" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="morning">Morning (6AM - 12PM)</SelectItem>
                                    <SelectItem value="afternoon">Afternoon (12PM - 6PM)</SelectItem>
                                    <SelectItem value="evening">Evening (6PM - 10PM)</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Language Preferences</h3>
                            <p className="text-sm text-gray-500">Set your preferred language for courses and content</p>
                            <Select>
                              <SelectTrigger className="w-full md:w-1/2">
                                <SelectValue placeholder="Select language" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="english">English</SelectItem>
                                <SelectItem value="spanish">Spanish</SelectItem>
                                <SelectItem value="french">French</SelectItem>
                                <SelectItem value="german">German</SelectItem>
                                <SelectItem value="chinese">Chinese</SelectItem>
                                <SelectItem value="japanese">Japanese</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <Separator />
                          
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Study Goals</h3>
                            <p className="text-sm text-gray-500">Set your weekly learning goals</p>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <Label>Weekly Study Hours: 10 hours</Label>
                                <span className="text-sm text-gray-500">10 hours</span>
                              </div>
                              <Slider
                                defaultValue={[10]}
                                max={40}
                                step={1}
                                className="w-full"
                              />
                              <p className="text-xs text-gray-500">Set a realistic goal that fits your schedule</p>
                            </div>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="flex justify-end space-x-3">
                          <Button variant="outline" className="!rounded-button whitespace-nowrap cursor-pointer">Cancel</Button>
                          <Button onClick={handleSaveLearningPreferences} className="!rounded-button whitespace-nowrap cursor-pointer">
                            Save Preferences
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Privacy Tab */}
                    <TabsContent value="privacy" className="mt-0">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-xl font-semibold mb-1">Privacy Settings</h2>
                          <p className="text-gray-500 text-sm">Manage your privacy preferences and data sharing options</p>
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-6 max-w-3xl">
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Profile Visibility</h3>
                            <p className="text-sm text-gray-500">Control who can see your profile and learning activity</p>
                            <RadioGroup defaultValue="public" className="flex flex-col space-y-2">
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="public" id="public" />
                                <div>
                                  <Label htmlFor="public" className="text-base">Public</Label>
                                  <p className="text-sm text-gray-500">Anyone can see your profile and achievements</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="limited" id="limited" />
                                <div>
                                  <Label htmlFor="limited" className="text-base">Limited</Label>
                                  <p className="text-sm text-gray-500">Only other learners in your courses can see your profile</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="private" id="private" />
                                <div>
                                  <Label htmlFor="private" className="text-base">Private</Label>
                                  <p className="text-sm text-gray-500">Your profile is only visible to you</p>
                                </div>
                              </div>
                            </RadioGroup>
                          </div>
                          
                          <Separator />
                          
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Data Sharing</h3>
                            <p className="text-sm text-gray-500">Control how your learning data is used</p>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                  <Label htmlFor="learning-insights" className="text-base">Learning Insights</Label>
                                  <p className="text-sm text-gray-500">Allow us to analyze your learning patterns to improve recommendations</p>
                                </div>
                                <Switch id="learning-insights" defaultChecked />
                              </div>
                              <Separator />
                              <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                  <Label htmlFor="third-party-sharing" className="text-base">Third-Party Sharing</Label>
                                  <p className="text-sm text-gray-500">Allow sharing your data with trusted partners for improved services</p>
                                </div>
                                <Switch id="third-party-sharing" />
                              </div>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Activity Tracking</h3>
                            <p className="text-sm text-gray-500">Control how your learning activity is tracked</p>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                  <Label htmlFor="learning-history" className="text-base">Learning History</Label>
                                  <p className="text-sm text-gray-500">Track your course progress and learning history</p>
                                </div>
                                <Switch id="learning-history" defaultChecked />
                              </div>
                              <Separator />
                              <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                  <Label htmlFor="activity-feed" className="text-base">Activity Feed</Label>
                                  <p className="text-sm text-gray-500">Show your recent activity in the community feed</p>
                                </div>
                                <Switch id="activity-feed" defaultChecked />
                              </div>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Data Management</h3>
                            <p className="text-sm text-gray-500">Manage your personal data</p>
                            <div className="space-y-3">
                              <Button variant="outline" className="!rounded-button whitespace-nowrap cursor-pointer">
                                <i className="fa-solid fa-download mr-2"></i>
                                Download My Data
                              </Button>
                              <p className="text-xs text-gray-500">
                                You can request a copy of all your personal data. This includes your profile information, 
                                course progress, and learning history.
                              </p>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div className="space-y-2">
                            <p className="text-sm">
                              For more information about how we handle your data, please read our{" "}
                              <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>.
                            </p>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="flex justify-end space-x-3">
                          <Button variant="outline" className="!rounded-button whitespace-nowrap cursor-pointer">Cancel</Button>
                          <Button onClick={handleSavePrivacy} className="!rounded-button whitespace-nowrap cursor-pointer">
                            Save Settings
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    {/* Appearance Tab */}
                    <TabsContent value="appearance" className="mt-0">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-xl font-semibold mb-1">Appearance Settings</h2>
                          <p className="text-gray-500 text-sm">Customize the look and feel of your learning environment</p>
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-6 max-w-3xl">
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Theme</h3>
                            <p className="text-sm text-gray-500">Choose your preferred theme</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div 
                                className={`border rounded-lg p-4 cursor-pointer transition-all ${theme === 'light' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}
                                onClick={() => setTheme('light')}
                              >
                                <div className="bg-white border border-gray-200 rounded h-24 mb-3"></div>
                                <div className="flex items-center justify-between">
                                  <span className="font-medium">Light</span>
                                  {theme === 'light' && <i className="fa-solid fa-check text-indigo-600"></i>}
                                </div>
                              </div>
                              <div 
                                className={`border rounded-lg p-4 cursor-pointer transition-all ${theme === 'dark' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}
                                onClick={() => setTheme('dark')}
                              >
                                <div className="bg-gray-900 border border-gray-700 rounded h-24 mb-3"></div>
                                <div className="flex items-center justify-between">
                                  <span className="font-medium">Dark</span>
                                  {theme === 'dark' && <i className="fa-solid fa-check text-indigo-600"></i>}
                                </div>
                              </div>
                              <div 
                                className={`border rounded-lg p-4 cursor-pointer transition-all ${theme === 'system' ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}
                                onClick={() => setTheme('system')}
                              >
                                <div className="bg-gradient-to-r from-white to-gray-900 border border-gray-200 rounded h-24 mb-3"></div>
                                <div className="flex items-center justify-between">
                                  <span className="font-medium">System</span>
                                  {theme === 'system' && <i className="fa-solid fa-check text-indigo-600"></i>}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Color Scheme</h3>
                            <p className="text-sm text-gray-500">Choose your preferred accent color</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div 
                                className={`border rounded-lg p-3 cursor-pointer transition-all ${colorScheme === 'indigo' ? 'border-indigo-600' : 'border-gray-200 hover:border-gray-300'}`}
                                onClick={() => setColorScheme('indigo')}
                              >
                                <div className="bg-indigo-600 rounded h-8 mb-2"></div>
                                <div className="flex items-center justify-between">
                                  <span className="font-medium">Indigo</span>
                                  {colorScheme === 'indigo' && <i className="fa-solid fa-check text-indigo-600"></i>}
                                </div>
                              </div>
                              <div 
                                className={`border rounded-lg p-3 cursor-pointer transition-all ${colorScheme === 'blue' ? 'border-indigo-600' : 'border-gray-200 hover:border-gray-300'}`}
                                onClick={() => setColorScheme('blue')}
                              >
                                <div className="bg-blue-600 rounded h-8 mb-2"></div>
                                <div className="flex items-center justify-between">
                                  <span className="font-medium">Blue</span>
                                  {colorScheme === 'blue' && <i className="fa-solid fa-check text-indigo-600"></i>}
                                </div>
                              </div>
                              <div 
                                className={`border rounded-lg p-3 cursor-pointer transition-all ${colorScheme === 'green' ? 'border-indigo-600' : 'border-gray-200 hover:border-gray-300'}`}
                                onClick={() => setColorScheme('green')}
                              >
                                <div className="bg-green-600 rounded h-8 mb-2"></div>
                                <div className="flex items-center justify-between">
                                  <span className="font-medium">Green</span>
                                  {colorScheme === 'green' && <i className="fa-solid fa-check text-indigo-600"></i>}
                                </div>
                              </div>
                              <div 
                                className={`border rounded-lg p-3 cursor-pointer transition-all ${colorScheme === 'purple' ? 'border-indigo-600' : 'border-gray-200 hover:border-gray-300'}`}
                                onClick={() => setColorScheme('purple')}
                              >
                                <div className="bg-purple-600 rounded h-8 mb-2"></div>
                                <div className="flex items-center justify-between">
                                  <span className="font-medium">Purple</span>
                                  {colorScheme === 'purple' && <i className="fa-solid fa-check text-indigo-600"></i>}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Layout Density</h3>
                            <p className="text-sm text-gray-500">Adjust the spacing between elements</p>
                            <RadioGroup 
                              value={density} 
                              onValueChange={setDensity}
                              className="flex flex-col space-y-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="compact" id="compact" />
                                <Label htmlFor="compact">Compact - Less space between elements</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="default" id="default" />
                                <Label htmlFor="default">Default - Standard spacing</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="comfortable" id="comfortable" />
                                <Label htmlFor="comfortable">Comfortable - More space between elements</Label>
                              </div>
                            </RadioGroup>
                          </div>
                          
                          <Separator />
                          
                          <div className="space-y-4">
                            <h3 className="text-lg font-medium">Font Size</h3>
                            <p className="text-sm text-gray-500">Adjust the text size for better readability</p>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm">Smaller</span>
                                <span className="text-sm">Larger</span>
                              </div>
                              <Slider
                                defaultValue={[fontSize]}
                                min={12}
                                max={20}
                                step={1}
                                onValueChange={(value) => setFontSize(value[0])}
                                className="w-full"
                              />
                              <div className="flex justify-between items-center mt-2">
                                <span className="text-sm text-gray-500">Current size: {fontSize}px</span>
                                <div className="text-base" style={{ fontSize: `${fontSize}px` }}>
                                  Sample Text
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="flex justify-end space-x-3">
                          <Button variant="outline" className="!rounded-button whitespace-nowrap cursor-pointer">Reset to Default</Button>
                          <Button onClick={handleSaveAppearance} className="!rounded-button whitespace-nowrap cursor-pointer">
                            Save Preferences
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </CardContent>
                </ScrollArea>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
