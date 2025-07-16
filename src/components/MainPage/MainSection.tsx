import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import PlanSelection from "../Billing/PlanSelection";
import { useBillingLogic } from "@/hooks/useBillingLogic";

function MainSection() {
     const [uploadProgress, setUploadProgress] = useState(0);
      React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
          const dropdown = document.getElementById("dropdown-menu");
          const avatarDropdown = document.getElementById("avatar-dropdown");
          if (
            dropdown &&
            avatarDropdown &&
            !avatarDropdown.contains(event.target as Node)
          ) {
            dropdown.classList.add("hidden");
          }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }, []);
      const [isUploading, setIsUploading] = useState(false);
      const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
      const [activeTab, setActiveTab] = useState("documents");
      const [selectedOutputs, setSelectedOutputs] = useState({
        summary: true,
        notes: true,
        mcqs: true,
        qa: true,
        questionPaper: false,
        audiobook: false,
        games: false,
      });
      const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
      };
      const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        // Simulating file upload
        const files = Array.from(e.dataTransfer.files).map((file) => file.name);
        handleFileUpload(files);
      };
      const handleFileUpload = (files: string[]) => {
        setIsUploading(true);
        setUploadProgress(0);
        // Simulate upload progress
        const interval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              setIsUploading(false);
              setUploadedFiles((prev) => [...prev, ...files]);
              return 100;
            }
            return prev + 5;
          });
        }, 200);
      };
      const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          const files = Array.from(e.target.files).map((file) => file.name);
          handleFileUpload(files);
        }
      };
      const handleOutputToggle = (output: keyof typeof selectedOutputs) => {
        setSelectedOutputs((prev) => ({
          ...prev,
          [output]: !prev[output],
        }));
      };
      const {
          billingCycle,
          setBillingCycle,
          selectedPlanId,
          setSelectedPlanId,
          plans,
          getPrice,
         
        } = useBillingLogic();
      
  return (
 <main className="container px-4 py-12 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Upload Section */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">Upload Your Content</CardTitle>
                <CardDescription>
                  Drag and drop files or paste YouTube links to begin creating
                  your course
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="flex flex-col items-center justify-center p-12 mb-6 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 border-gray-300 hover:bg-gray-100"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById("fileInput")?.click()}
                >
                  <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-blue-50">
                    <i className="text-3xl text-blue-500 fas fa-cloud-upload-alt"></i>
                  </div>
                  <p className="mb-2 text-lg font-medium text-gray-700">
                    Drag files here or click to browse
                  </p>
                  <p className="text-sm text-gray-500">
                    Support for PDF, DOCX, MP4, MP3, TXT and more
                  </p>
                  <input
                    id="fileInput"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileInputChange}
                  />
                </div>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-700">
                      YouTube Video URL
                    </p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 !rounded-button cursor-pointer whitespace-nowrap"
                          >
                            <i className="text-gray-400 fas fa-question-circle"></i>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Paste YouTube video links to include in your course
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="https://youtube.com/watch?v=..."
                      className="border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <Button className="!rounded-button cursor-pointer whitespace-nowrap">
                      Add
                    </Button>
                  </div>
                </div>
                {isUploading && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-gray-700">
                        Uploading...
                      </p>
                      <p className="text-sm text-gray-500">{uploadProgress}%</p>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="w-full grid grid-cols-4">
                    <TabsTrigger
                      value="documents"
                      className="cursor-pointer whitespace-nowrap"
                    >
                      <i className="mr-2 fas fa-file-pdf"></i> Documents
                    </TabsTrigger>
                    <TabsTrigger
                      value="videos"
                      className="cursor-pointer whitespace-nowrap"
                    >
                      <i className="mr-2 fas fa-video"></i> Videos
                    </TabsTrigger>
                    <TabsTrigger
                      value="text"
                      className="cursor-pointer whitespace-nowrap"
                    >
                      <i className="mr-2 fas fa-file-alt"></i> Text
                    </TabsTrigger>
                    <TabsTrigger
                      value="all"
                      className="cursor-pointer whitespace-nowrap"
                    >
                      <i className="mr-2 fas fa-layer-group"></i> All Files
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="documents" className="mt-4">
                    <ScrollArea className="h-[200px] rounded-md border p-4">
                      {uploadedFiles.length > 0 ? (
                        <ul className="space-y-2">
                          {uploadedFiles.map((file, index) => (
                            <li
                              key={index}
                              className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100"
                            >
                              <div className="flex items-center">
                                <i className="mr-3 text-blue-500 fas fa-file-pdf"></i>
                                <span className="text-sm">{file}</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="!rounded-button cursor-pointer whitespace-nowrap"
                              >
                                <i className="text-gray-500 fas fa-times"></i>
                              </Button>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                          <i className="mb-2 text-3xl fas fa-file-upload"></i>
                          <p>No documents uploaded yet</p>
                        </div>
                      )}
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="videos" className="mt-4">
                    <ScrollArea className="h-[200px] rounded-md border p-4">
                      <div className="flex flex-col items-center justify-center h-full text-gray-500">
                        <i className="mb-2 text-3xl fas fa-film"></i>
                        <p>No videos uploaded yet</p>
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="text" className="mt-4">
                    <ScrollArea className="h-[200px] rounded-md border p-4">
                      <div className="flex flex-col items-center justify-center h-full text-gray-500">
                        <i className="mb-2 text-3xl fas fa-file-alt"></i>
                        <p>No text content uploaded yet</p>
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="all" className="mt-4">
                    <ScrollArea className="h-[200px] rounded-md border p-4">
                      {uploadedFiles.length > 0 ? (
                        <ul className="space-y-2">
                          {uploadedFiles.map((file, index) => (
                            <li
                              key={index}
                              className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100"
                            >
                              <div className="flex items-center">
                                <i className="mr-3 text-blue-500 fas fa-file"></i>
                                <span className="text-sm">{file}</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="!rounded-button cursor-pointer whitespace-nowrap"
                              >
                                <i className="text-gray-500 fas fa-times"></i>
                              </Button>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500">
                          <i className="mb-2 text-3xl fas fa-cloud-upload-alt"></i>
                          <p>No files uploaded yet</p>
                        </div>
                      )}
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
             <div>
              <div className="max-w-2xl mx-auto mb-12 text-center">
                      <h2 className="mb-2 text-4xl font-extrabold text-gray-900">Choose Your Premium Plan</h2>
                      <p className="mb-8 text-lg text-gray-600">
                        Unlock advanced features and create better learning experiences.
                      </p>
                      <div className="flex items-center justify-center space-x-4">
                        <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-blue-700' : 'text-gray-500'}`}>
                          Monthly
                        </span>
                        <Switch
                          checked={billingCycle === 'yearly'}
                          onCheckedChange={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                          className="cursor-pointer"
                        />
                        <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-blue-700' : 'text-gray-500'}`}>
                          Yearly
                          <Badge className="ml-2 bg-green-100 text-green-800">Save 20%</Badge>
                        </span>
                      </div>
                    </div>
           <PlanSelection
          plans={plans}
          selectedPlanId={selectedPlanId}
          setSelectedPlanId={setSelectedPlanId}
          billingCycle={billingCycle}
          setBillingCycle={setBillingCycle}
          getPrice={getPrice}
        />
             </div>
          </div>
          {/* Right Column - Settings & Options */}
          <div>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl">Processing Options</CardTitle>
                <CardDescription>
                  Upgrade to premium to unlock all content generation features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="summary"
                        checked={selectedOutputs.summary}
                        onCheckedChange={() => handleOutputToggle("summary")}
                        disabled
                        className="cursor-not-allowed"
                      />
                      <Label
                        htmlFor="summary"
                        className="cursor-not-allowed text-gray-500"
                      >
                        Summary
                      </Label>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                      Premium
                    </Badge>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 !rounded-button cursor-pointer whitespace-nowrap"
                          >
                            <i className="text-gray-400 fas fa-info-circle"></i>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Generate a concise summary of your content</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="notes"
                        checked={selectedOutputs.notes}
                        onCheckedChange={() => handleOutputToggle("notes")}
                        disabled
                        className="cursor-not-allowed"
                      />
                      <Label
                        htmlFor="notes"
                        className="cursor-not-allowed text-gray-500"
                      >
                        Study Notes
                      </Label>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                      Premium
                    </Badge>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 !rounded-button cursor-pointer whitespace-nowrap"
                          >
                            <i className="text-gray-400 fas fa-info-circle"></i>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Create organized study notes with key points</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="mcqs"
                        checked={selectedOutputs.mcqs}
                        onCheckedChange={() => handleOutputToggle("mcqs")}
                        disabled
                        className="cursor-not-allowed"
                      />
                      <Label
                        htmlFor="mcqs"
                        className="cursor-not-allowed text-gray-500"
                      >
                        Multiple Choice Questions
                      </Label>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                      Premium
                    </Badge>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 !rounded-button cursor-pointer whitespace-nowrap"
                          >
                            <i className="text-gray-400 fas fa-info-circle"></i>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Generate quiz questions with multiple choice answers
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="qa"
                        checked={selectedOutputs.qa}
                        onCheckedChange={() => handleOutputToggle("qa")}
                        disabled
                        className="cursor-not-allowed"
                      />
                      <Label
                        htmlFor="qa"
                        className="cursor-not-allowed text-gray-500"
                      >
                        Q&A Pairs
                      </Label>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                      Premium
                    </Badge>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 !rounded-button cursor-pointer whitespace-nowrap"
                          >
                            <i className="text-gray-400 fas fa-info-circle"></i>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Create question and answer pairs for study sessions
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="questionPaper"
                        checked={selectedOutputs.questionPaper}
                        onCheckedChange={() =>
                          handleOutputToggle("questionPaper")
                        }
                        className="cursor-pointer"
                      />
                      <Label htmlFor="questionPaper" className="cursor-pointer">
                        Question Paper
                      </Label>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                      Premium
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="audiobook"
                        checked={selectedOutputs.audiobook}
                        onCheckedChange={() => handleOutputToggle("audiobook")}
                        className="cursor-pointer"
                      />
                      <Label htmlFor="audiobook" className="cursor-pointer">
                        Audio Book
                      </Label>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                      Premium
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="games"
                        checked={selectedOutputs.games}
                        onCheckedChange={() => handleOutputToggle("games")}
                        className="cursor-pointer"
                      />
                      <Label htmlFor="games" className="cursor-pointer">
                        Learning Games
                      </Label>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                      Premium
                    </Badge>
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    <Label htmlFor="language" className="text-sm font-medium">
                      Output Language
                    </Label>
                    <Select defaultValue="english">
                      <SelectTrigger
                        id="language"
                        className="w-full cursor-pointer"
                      >
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english" className="cursor-pointer">
                          English
                        </SelectItem>
                        <SelectItem value="spanish" className="cursor-pointer">
                          Spanish
                        </SelectItem>
                        <SelectItem value="french" className="cursor-pointer">
                          French
                        </SelectItem>
                        <SelectItem value="german" className="cursor-pointer">
                          German
                        </SelectItem>
                        <SelectItem value="chinese" className="cursor-pointer">
                          Chinese
                        </SelectItem>
                        <SelectItem value="japanese" className="cursor-pointer">
                          Japanese
                        </SelectItem>
                        <SelectItem value="hindi" className="cursor-pointer">
                          Hindi
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="difficulty"
                        className="text-sm font-medium"
                      >
                        Content Difficulty
                      </Label>
                      <span className="text-sm text-gray-500">
                        Intermediate
                      </span>
                    </div>
                    <div className="px-1">
                      <Tabs defaultValue="intermediate" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger
                            value="beginner"
                            className="cursor-pointer whitespace-nowrap"
                          >
                            Beginner
                          </TabsTrigger>
                          <TabsTrigger
                            value="intermediate"
                            className="cursor-pointer whitespace-nowrap"
                          >
                            Intermediate
                          </TabsTrigger>
                          <TabsTrigger
                            value="advanced"
                            className="cursor-pointer whitespace-nowrap"
                          >
                            Advanced
                          </TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="space-y-0.5">
                      <Label
                        htmlFor="autoTranslate"
                        className="text-sm font-medium"
                      >
                        Auto-Detect Language
                      </Label>
                      <p className="text-xs text-gray-500">
                        Automatically detect input language
                      </p>
                    </div>
                    <Switch id="autoTranslate" className="cursor-pointer" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <div className="space-y-4">
                  <Link
                    to="/Billing"
                    data-readdy="true"
                  >
                    <Button
                      variant="outline"
                      className="w-full !rounded-button cursor-pointer whitespace-nowrap bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
                    >
                      Upgrade to Premium <i className="ml-2 fas fa-crown"></i>
                    </Button>
                  </Link>
                  <p className="text-sm text-center text-gray-500">
                    Unlock all features starting at $9.99/month
                  </p>
                </div>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Course Details</CardTitle>
                <CardDescription>
                  Add information about your course
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="courseTitle"
                      className="text-sm font-medium"
                    >
                      Course Title
                    </Label>
                    <Input id="courseTitle" placeholder="Enter course title" />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="courseDescription"
                      className="text-sm font-medium"
                    >
                      Description
                    </Label>
                    <textarea
                      id="courseDescription"
                      placeholder="Enter course description"
                      className="w-full min-h-[100px] p-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    ></textarea>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm font-medium">
                      Category
                    </Label>
                    <Select defaultValue="education">
                      <SelectTrigger
                        id="category"
                        className="w-full cursor-pointer"
                      >
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          value="education"
                          className="cursor-pointer"
                        >
                          Education
                        </SelectItem>
                        <SelectItem
                          value="technology"
                          className="cursor-pointer"
                        >
                          Technology
                        </SelectItem>
                        <SelectItem value="business" className="cursor-pointer">
                          Business
                        </SelectItem>
                        <SelectItem value="science" className="cursor-pointer">
                          Science
                        </SelectItem>
                        <SelectItem value="arts" className="cursor-pointer">
                          Arts & Humanities
                        </SelectItem>
                        <SelectItem value="health" className="cursor-pointer">
                          Health & Medicine
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="space-y-0.5">
                      <Label
                        htmlFor="publicCourse"
                        className="text-sm font-medium"
                      >
                        Public Course
                      </Label>
                      <p className="text-xs text-gray-500">
                        Make this course visible to everyone
                      </p>
                    </div>
                    <Switch id="publicCourse" className="cursor-pointer" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full !rounded-button cursor-pointer whitespace-nowrap">
                  Save Course <i className="ml-2 fas fa-save"></i>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>  )
}

export default MainSection