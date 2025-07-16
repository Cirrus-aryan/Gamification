// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const AudioBook: React.FC = () => {
  const [mainTab, setMainTab] = useState("files");
  const [fileTab, setFileTab] = useState("textual");
  const [summaryTab, setSummaryTab] = useState("full");
  const [practiceTab, setPracticeTab] = useState("qna");
  const [audioProgress, setAudioProgress] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 flex gap-6">
        {/* Main Content Area */}
        <div className="flex-1">
          <Tabs value={mainTab} onValueChange={setMainTab} className="w-full">
            <TabsList className="w-full bg-white p-0 rounded-xl shadow-sm border border-gray-200 mb-6">
              <TabsTrigger 
                value="files" 
                className="flex-1 py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:shadow-none !rounded-button cursor-pointer"
              >
                <i className="fas fa-folder mr-2"></i> Files
              </TabsTrigger>
              <TabsTrigger 
                value="summary" 
                className="flex-1 py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:shadow-none !rounded-button cursor-pointer"
              >
                <i className="fas fa-clipboard-list mr-2"></i> Summary
              </TabsTrigger>
              <TabsTrigger 
                value="notes" 
                className="flex-1 py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:shadow-none !rounded-button cursor-pointer"
              >
                <i className="fas fa-sticky-note mr-2"></i> Notes
              </TabsTrigger>
              <TabsTrigger 
                value="practice" 
                className="flex-1 py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:shadow-none !rounded-button cursor-pointer"
              >
                <i className="fas fa-pencil-alt mr-2"></i> Practice
              </TabsTrigger>
              <TabsTrigger 
                value="audiobooks" 
                className="flex-1 py-3 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:shadow-none !rounded-button cursor-pointer"
              >
                <i className="fas fa-headphones mr-2"></i> Audio Books
              </TabsTrigger>
            </TabsList>
            
            {/* Files Content */}
            <TabsContent value="files" className="mt-0">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
                <Tabs value={fileTab} onValueChange={setFileTab}>
                  <TabsList className="bg-gray-100 p-1">
                    <TabsTrigger 
                      value="textual" 
                      className="!rounded-button cursor-pointer whitespace-nowrap"
                    >
                      <i className="fas fa-file-alt mr-2"></i> Textual
                    </TabsTrigger>
                    <TabsTrigger 
                      value="video" 
                      className="!rounded-button cursor-pointer whitespace-nowrap"
                    >
                      <i className="fas fa-video mr-2"></i> Videos
                    </TabsTrigger>
                    <TabsTrigger 
                      value="pdf" 
                      className="!rounded-button cursor-pointer whitespace-nowrap"
                    >
                      <i className="fas fa-file-pdf mr-2"></i> PDFs
                    </TabsTrigger>
                    <TabsTrigger 
                      value="image" 
                      className="!rounded-button cursor-pointer whitespace-nowrap"
                    >
                      <i className="fas fa-image mr-2"></i> Images
                    </TabsTrigger>
                    <TabsTrigger 
                      value="youtube" 
                      className="!rounded-button cursor-pointer whitespace-nowrap"
                    >
                      <i className="fab fa-youtube mr-2"></i> YouTube
                    </TabsTrigger>
                  </TabsList>
                  
                  {/* Textual Content */}
                  <TabsContent value="textual" className="mt-4">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold text-gray-800">Textual Documents</h2>
                      <div className="flex gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="!rounded-button cursor-pointer whitespace-nowrap">
                              <i className="fas fa-sort mr-2"></i> Sort by
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem className="cursor-pointer">Date (Newest)</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">Date (Oldest)</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">Name (A-Z)</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">Name (Z-A)</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <Button className="!rounded-button cursor-pointer whitespace-nowrap">
                          <i className="fas fa-plus mr-2"></i> Add New
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          title: "Advanced Machine Learning Concepts",
                          date: "June 25, 2025",
                          pages: 24,
                          progress: 75
                        },
                        {
                          title: "Introduction to Quantum Computing",
                          date: "June 20, 2025",
                          pages: 18,
                          progress: 100
                        },
                        {
                          title: "Data Structures and Algorithms",
                          date: "June 15, 2025",
                          pages: 32,
                          progress: 50
                        },
                        {
                          title: "Web Development Fundamentals",
                          date: "June 10, 2025",
                          pages: 28,
                          progress: 30
                        }
                      ].map((doc, index) => (
                        <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-lg">{doc.title}</CardTitle>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8 !rounded-button cursor-pointer">
                                    <i className="fas fa-ellipsis-v"></i>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem className="cursor-pointer">
                                    <i className="fas fa-edit mr-2"></i> Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="cursor-pointer">
                                    <i className="fas fa-download mr-2"></i> Download
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="cursor-pointer">
                                    <i className="fas fa-share-alt mr-2"></i> Share
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="cursor-pointer text-red-600">
                                    <i className="fas fa-trash-alt mr-2"></i> Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            <CardDescription>Added on {doc.date} • {doc.pages} pages</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center gap-2 mb-1">
                              <Progress value={doc.progress} className="h-2" />
                              <span className="text-sm text-gray-500">{doc.progress}%</span>
                            </div>
                          </CardContent>
                          <CardFooter className="pt-0 flex justify-between">
                            <Badge variant="outline" className="text-blue-600 bg-blue-50 hover:bg-blue-100">
                              <i className="fas fa-file-alt mr-1"></i> Document
                            </Badge>
                            <Button variant="ghost" size="sm" className="!rounded-button cursor-pointer whitespace-nowrap">
                              <i className="fas fa-eye mr-1"></i> View
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  {/* Video Content */}
                  <TabsContent value="video" className="mt-4">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold text-gray-800">Video Library</h2>
                      <div className="flex gap-2">
                        <Button variant="outline" className="!rounded-button cursor-pointer whitespace-nowrap">
                          <i className="fas fa-filter mr-2"></i> Filter
                        </Button>
                        <Button className="!rounded-button cursor-pointer whitespace-nowrap">
                          <i className="fas fa-plus mr-2"></i> Upload Video
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        {
                          title: "Neural Networks Explained",
                          duration: "18:24",
                          thumbnail: "https://readdy.ai/api/search-image?query=neural%20network%20visualization%20with%20digital%20connections%2C%20blue%20and%20purple%20glowing%20nodes%2C%20abstract%20technology%20concept%2C%20high%20quality%20digital%20art%20with%20dark%20background&width=400&height=225&seq=video1&orientation=landscape"
                        },
                        {
                          title: "Introduction to React Hooks",
                          duration: "22:15",
                          thumbnail: "https://readdy.ai/api/search-image?query=modern%20web%20development%20interface%20with%20code%20on%20screen%2C%20professional%20programming%20environment%2C%20clean%20design%2C%20software%20engineering%20concept&width=400&height=225&seq=video2&orientation=landscape"
                        },
                        {
                          title: "Cloud Computing Fundamentals",
                          duration: "15:42",
                          thumbnail: "https://readdy.ai/api/search-image?query=cloud%20computing%20concept%20with%20servers%20and%20network%20connections%2C%20professional%20technology%20visualization%2C%20digital%20infrastructure%20with%20blue%20tones&width=400&height=225&seq=video3&orientation=landscape"
                        },
                        {
                          title: "Data Visualization Techniques",
                          duration: "25:10",
                          thumbnail: "https://readdy.ai/api/search-image?query=data%20visualization%20dashboard%20with%20colorful%20charts%20and%20graphs%2C%20professional%20analytics%20interface%2C%20business%20intelligence%20concept&width=400&height=225&seq=video4&orientation=landscape"
                        },
                        {
                          title: "Cybersecurity Best Practices",
                          duration: "20:38",
                          thumbnail: "https://readdy.ai/api/search-image?query=cybersecurity%20concept%20with%20digital%20lock%20and%20shield%2C%20network%20protection%20visualization%2C%20professional%20security%20interface%20with%20blue%20and%20dark%20tones&width=400&height=225&seq=video5&orientation=landscape"
                        },
                        {
                          title: "Mobile App Development Workshop",
                          duration: "32:45",
                          thumbnail: "https://readdy.ai/api/search-image?query=mobile%20app%20development%20interface%20with%20smartphone%20mockups%2C%20professional%20design%20workspace%2C%20UI%20UX%20design%20process%20visualization&width=400&height=225&seq=video6&orientation=landscape"
                        }
                      ].map((video, index) => (
                        <Card key={index} className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                          <div className="relative">
                            <img 
                              src={video.thumbnail} 
                              alt={video.title} 
                              className="w-full h-48 object-cover object-top"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                              <Button variant="secondary" size="icon" className="h-12 w-12 rounded-full !rounded-button cursor-pointer">
                                <i className="fas fa-play text-lg"></i>
                              </Button>
                            </div>
                            <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                              {video.duration}
                            </div>
                          </div>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">{video.title}</CardTitle>
                          </CardHeader>
                          <CardFooter className="pt-0 flex justify-between">
                            <Badge variant="outline" className="text-purple-600 bg-purple-50 hover:bg-purple-100">
                              <i className="fas fa-video mr-1"></i> Video
                            </Badge>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 !rounded-button cursor-pointer">
                                <i className="fas fa-download"></i>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 !rounded-button cursor-pointer">
                                <i className="fas fa-share-alt"></i>
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  {/* PDF Content */}
                  <TabsContent value="pdf" className="mt-4">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold text-gray-800">PDF Documents</h2>
                      <div className="flex gap-2">
                        <Button variant="outline" className="!rounded-button cursor-pointer whitespace-nowrap">
                          <i className="fas fa-sort mr-2"></i> Sort
                        </Button>
                        <Button className="!rounded-button cursor-pointer whitespace-nowrap">
                          <i className="fas fa-upload mr-2"></i> Upload PDF
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        {
                          title: "Machine Learning Research Paper",
                          date: "June 28, 2025",
                          size: "4.2 MB",
                          color: "red"
                        },
                        {
                          title: "Database Systems Handbook",
                          date: "June 22, 2025",
                          size: "8.7 MB",
                          color: "blue"
                        },
                        {
                          title: "UI/UX Design Principles",
                          date: "June 18, 2025",
                          size: "3.5 MB",
                          color: "green"
                        },
                        {
                          title: "Blockchain Technology Overview",
                          date: "June 15, 2025",
                          size: "5.1 MB",
                          color: "purple"
                        },
                        {
                          title: "Software Architecture Patterns",
                          date: "June 10, 2025",
                          size: "6.3 MB",
                          color: "orange"
                        },
                        {
                          title: "Network Security Guidelines",
                          date: "June 5, 2025",
                          size: "2.8 MB",
                          color: "teal"
                        }
                      ].map((pdf, index) => (
                        <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                          <CardHeader className="pb-2">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-12 bg-${pdf.color}-100 text-${pdf.color}-600 flex items-center justify-center rounded`}>
                                <i className="fas fa-file-pdf text-xl"></i>
                              </div>
                              <div className="flex-1 min-w-0">
                                <CardTitle className="text-base truncate">{pdf.title}</CardTitle>
                                <CardDescription className="text-xs">
                                  {pdf.date} • {pdf.size}
                                </CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardFooter className="pt-0 flex justify-between">
                            <Badge variant="outline" className={`text-${pdf.color}-600 bg-${pdf.color}-50 hover:bg-${pdf.color}-100`}>
                              PDF
                            </Badge>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 !rounded-button cursor-pointer">
                                <i className="fas fa-eye"></i>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 !rounded-button cursor-pointer">
                                <i className="fas fa-download"></i>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 !rounded-button cursor-pointer">
                                <i className="fas fa-ellipsis-v"></i>
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  {/* Image Content */}
                  <TabsContent value="image" className="mt-4">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold text-gray-800">Image Gallery</h2>
                      <div className="flex gap-2">
                        <Button variant="outline" className="!rounded-button cursor-pointer whitespace-nowrap">
                          <i className="fas fa-th-large mr-2"></i> Gallery View
                        </Button>
                        <Button className="!rounded-button cursor-pointer whitespace-nowrap">
                          <i className="fas fa-plus mr-2"></i> Add Images
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {[
                        "https://readdy.ai/api/search-image?query=data%20visualization%20chart%20with%20colorful%20graphs%20and%20professional%20business%20analytics%20dashboard%2C%20clean%20design%20on%20light%20background&width=300&height=300&seq=img1&orientation=squarish",
                        "https://readdy.ai/api/search-image?query=network%20topology%20diagram%20with%20connected%20nodes%2C%20professional%20IT%20infrastructure%20visualization%2C%20technical%20diagram%20on%20light%20background&width=300&height=300&seq=img2&orientation=squarish",
                        "https://readdy.ai/api/search-image?query=software%20architecture%20diagram%20with%20microservices%2C%20professional%20system%20design%20visualization%2C%20technical%20flowchart%20on%20light%20background&width=300&height=300&seq=img3&orientation=squarish",
                        "https://readdy.ai/api/search-image?query=user%20interface%20wireframe%20for%20mobile%20application%2C%20professional%20UX%20design%20mockup%2C%20clean%20layout%20on%20light%20background&width=300&height=300&seq=img4&orientation=squarish",
                        "https://readdy.ai/api/search-image?query=machine%20learning%20model%20visualization%2C%20professional%20AI%20algorithm%20diagram%2C%20technical%20chart%20on%20light%20background&width=300&height=300&seq=img5&orientation=squarish",
                        "https://readdy.ai/api/search-image?query=database%20schema%20diagram%20with%20tables%20and%20relationships%2C%20professional%20data%20structure%20visualization%2C%20technical%20diagram%20on%20light%20background&width=300&height=300&seq=img6&orientation=squarish",
                        "https://readdy.ai/api/search-image?query=cybersecurity%20threat%20model%20visualization%2C%20professional%20security%20diagram%2C%20technical%20illustration%20on%20light%20background&width=300&height=300&seq=img7&orientation=squarish",
                        "https://readdy.ai/api/search-image?query=cloud%20infrastructure%20diagram%20with%20services%20and%20connections%2C%20professional%20AWS%20architecture%20visualization%2C%20technical%20chart%20on%20light%20background&width=300&height=300&seq=img8&orientation=squarish"
                      ].map((img, index) => (
                        <div key={index} className="group relative rounded-lg overflow-hidden cursor-pointer">
                          <img 
                            src={img} 
                            alt={`Gallery image ${index + 1}`} 
                            className="w-full h-48 object-cover object-top"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button variant="secondary" size="icon" className="h-9 w-9 !rounded-button cursor-pointer">
                                <i className="fas fa-search-plus"></i>
                              </Button>
                              <Button variant="secondary" size="icon" className="h-9 w-9 !rounded-button cursor-pointer">
                                <i className="fas fa-download"></i>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  {/* YouTube Content */}
                  <TabsContent value="youtube" className="mt-4">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold text-gray-800">YouTube Links</h2>
                      <div className="flex gap-2">
                        <Button variant="outline" className="!rounded-button cursor-pointer whitespace-nowrap">
                          <i className="fas fa-filter mr-2"></i> Categories
                        </Button>
                        <Button className="!rounded-button cursor-pointer whitespace-nowrap">
                          <i className="fas fa-plus mr-2"></i> Add Link
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          title: "Advanced Deep Learning Tutorial",
                          channel: "Tech Academy",
                          views: "245K views",
                          date: "2 weeks ago",
                          thumbnail: "https://readdy.ai/api/search-image?query=deep%20learning%20neural%20network%20visualization%20with%20professional%20technical%20interface%2C%20AI%20concept%20with%20digital%20nodes%20on%20dark%20background&width=400&height=225&seq=yt1&orientation=landscape"
                        },
                        {
                          title: "Full Stack Web Development Crash Course",
                          channel: "Code Masters",
                          views: "1.2M views",
                          date: "1 month ago",
                          thumbnail: "https://readdy.ai/api/search-image?query=web%20development%20workspace%20with%20multiple%20screens%20showing%20code%20and%20design%2C%20professional%20programming%20environment%20with%20modern%20interface&width=400&height=225&seq=yt2&orientation=landscape"
                        },
                        {
                          title: "Data Science for Beginners",
                          channel: "Data Insights",
                          views: "780K views",
                          date: "3 weeks ago",
                          thumbnail: "https://readdy.ai/api/search-image?query=data%20science%20visualization%20with%20charts%20and%20graphs%2C%20professional%20analytics%20dashboard%20with%20colorful%20statistics%20on%20dark%20background&width=400&height=225&seq=yt3&orientation=landscape"
                        },
                        {
                          title: "Blockchain Technology Explained",
                          channel: "Future Tech",
                          views: "520K views",
                          date: "1 week ago",
                          thumbnail: "https://readdy.ai/api/search-image?query=blockchain%20technology%20visualization%20with%20connected%20blocks%20and%20digital%20security%20concept%2C%20professional%20crypto%20interface%20on%20dark%20background&width=400&height=225&seq=yt4&orientation=landscape"
                        }
                      ].map((video, index) => (
                        <Card key={index} className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                          <div className="relative">
                            <img 
                              src={video.thumbnail} 
                              alt={video.title} 
                              className="w-full h-48 object-cover object-top"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                              <Button variant="secondary" size="icon" className="h-12 w-12 rounded-full !rounded-button cursor-pointer">
                                <i className="fab fa-youtube text-lg"></i>
                              </Button>
                            </div>
                          </div>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">{video.title}</CardTitle>
                            <CardDescription>
                              {video.channel} • {video.views} • {video.date}
                            </CardDescription>
                          </CardHeader>
                          <CardFooter className="pt-0 flex justify-between">
                            <Badge variant="outline" className="text-red-600 bg-red-50 hover:bg-red-100">
                              <i className="fab fa-youtube mr-1"></i> YouTube
                            </Badge>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 !rounded-button cursor-pointer">
                                <i className="fas fa-external-link-alt"></i>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 !rounded-button cursor-pointer">
                                <i className="fas fa-bookmark"></i>
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </TabsContent>
            
            {/* Summary Content */}
            <TabsContent value="summary" className="mt-0">
              <Card className="border border-gray-200 shadow-sm">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl">Content Summaries</CardTitle>
                    <Tabs value={summaryTab} onValueChange={setSummaryTab} className="w-64">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="full" className="!rounded-button cursor-pointer whitespace-nowrap">Full Summary</TabsTrigger>
                        <TabsTrigger value="condensed" className="!rounded-button cursor-pointer whitespace-nowrap">Condensed</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  <CardDescription>
                    Comprehensive summaries of your learning materials
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TabsContent value="full" className="mt-0">
                    <div className="space-y-6">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-medium mb-2">Advanced Machine Learning Concepts</h3>
                        <div className="text-gray-700">
                          <p className="mb-3">
                            Machine learning algorithms can be broadly categorized into supervised learning, unsupervised learning, and reinforcement learning. Supervised learning involves training a model on labeled data, where the correct output is provided for each input example. Common supervised learning algorithms include linear regression, logistic regression, decision trees, random forests, and support vector machines.
                          </p>
                          <p className="mb-3">
                            Unsupervised learning, on the other hand, deals with unlabeled data and aims to find patterns or structures within the data. Clustering algorithms like K-means and hierarchical clustering, as well as dimensionality reduction techniques such as Principal Component Analysis (PCA) and t-SNE, are examples of unsupervised learning methods.
                          </p>
                          <p>
                            Reinforcement learning involves an agent learning to make decisions by interacting with an environment and receiving feedback in the form of rewards or penalties. This approach is particularly useful in scenarios where an optimal sequence of actions needs to be determined, such as in game playing, robotics, and autonomous systems.
                          </p>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <Badge variant="outline" className="text-blue-600">Machine Learning</Badge>
                          <Button variant="ghost" size="sm" className="!rounded-button cursor-pointer whitespace-nowrap">
                            <i className="fas fa-bookmark mr-1"></i> Save
                          </Button>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-medium mb-2">Introduction to Quantum Computing</h3>
                        <div className="text-gray-700">
                          <p className="mb-3">
                            Quantum computing leverages the principles of quantum mechanics to process information in ways that classical computers cannot. Unlike classical bits, which can be either 0 or 1, quantum bits or qubits can exist in a superposition of both states simultaneously. This property allows quantum computers to explore multiple possibilities at once, potentially solving certain problems exponentially faster than classical computers.
                          </p>
                          <p className="mb-3">
                            Quantum entanglement is another key phenomenon in quantum computing, where qubits become correlated in such a way that the state of one qubit cannot be described independently of the others. This enables quantum computers to perform complex calculations with fewer steps than classical computers would require.
                          </p>
                          <p>
                            Current applications of quantum computing include cryptography, optimization problems, drug discovery, and materials science. However, quantum computers are still in their early stages of development, facing challenges such as qubit stability, error correction, and scalability.
                          </p>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <Badge variant="outline" className="text-purple-600">Quantum Computing</Badge>
                          <Button variant="ghost" size="sm" className="!rounded-button cursor-pointer whitespace-nowrap">
                            <i className="fas fa-bookmark mr-1"></i> Save
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="condensed" className="mt-0">
                    <div className="space-y-6">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-medium mb-2">Advanced Machine Learning Concepts</h3>
                        <div className="text-gray-700">
                          <p className="mb-3">
                            <strong>Key Points:</strong>
                          </p>
                          <ul className="list-disc pl-5 space-y-1 mb-3">
                            <li>Machine learning categories: supervised, unsupervised, reinforcement</li>
                            <li>Supervised learning uses labeled data (regression, classification)</li>
                            <li>Unsupervised learning finds patterns in unlabeled data (clustering, dimensionality reduction)</li>
                            <li>Reinforcement learning involves agents learning through environment interaction</li>
                            <li>Deep learning uses neural networks with multiple layers</li>
                          </ul>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <Badge variant="outline" className="text-blue-600">Machine Learning</Badge>
                          <Button variant="ghost" size="sm" className="!rounded-button cursor-pointer whitespace-nowrap">
                            <i className="fas fa-bookmark mr-1"></i> Save
                          </Button>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-medium mb-2">Introduction to Quantum Computing</h3>
                        <div className="text-gray-700">
                          <p className="mb-3">
                            <strong>Key Points:</strong>
                          </p>
                          <ul className="list-disc pl-5 space-y-1 mb-3">
                            <li>Qubits can exist in superposition of 0 and 1 states simultaneously</li>
                            <li>Quantum entanglement allows correlated qubits to share information</li>
                            <li>Quantum computers can solve certain problems exponentially faster</li>
                            <li>Applications: cryptography, optimization, drug discovery</li>
                            <li>Challenges: qubit stability, error correction, scalability</li>
                          </ul>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <Badge variant="outline" className="text-purple-600">Quantum Computing</Badge>
                          <Button variant="ghost" size="sm" className="!rounded-button cursor-pointer whitespace-nowrap">
                            <i className="fas fa-bookmark mr-1"></i> Save
                          </Button>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-medium mb-2">Data Structures and Algorithms</h3>
                        <div className="text-gray-700">
                          <p className="mb-3">
                            <strong>Key Points:</strong>
                          </p>
                          <ul className="list-disc pl-5 space-y-1 mb-3">
                            <li>Arrays: Fixed-size collection with O(1) access time</li>
                            <li>Linked Lists: Dynamic size with O(n) access time</li>
                            <li>Trees: Hierarchical structure with parent-child relationships</li>
                            <li>Sorting algorithms: Quick, Merge, Heap (O(n log n))</li>
                            <li>Graph algorithms: BFS, DFS, Dijkstra's, A*</li>
                          </ul>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <Badge variant="outline" className="text-green-600">Algorithms</Badge>
                          <Button variant="ghost" size="sm" className="!rounded-button cursor-pointer whitespace-nowrap">
                            <i className="fas fa-bookmark mr-1"></i> Save
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Notes Content */}
            <TabsContent value="notes" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <Card className="border border-gray-200 shadow-sm h-full">
                    <CardHeader>
                      <CardTitle className="text-lg">My Notes</CardTitle>
                      <CardDescription>
                        Personal notes and annotations
                      </CardDescription>
                    </CardHeader>
                    <div className="px-4 pb-2">
                      <Input 
                        type="text"
                        placeholder="Search notes..."
                        className="w-full"
                      />
                    </div>
                    <ScrollArea className="h-[500px] px-4">
                      {[
                        {
                          title: "Machine Learning Algorithms",
                          date: "June 29, 2025",
                          content: "Notes on supervised vs unsupervised learning...",
                          color: "blue"
                        },
                        {
                          title: "React Hooks Tutorial",
                          date: "June 25, 2025",
                          content: "useState, useEffect, useContext implementation...",
                          color: "green"
                        },
                        {
                          title: "Database Optimization",
                          date: "June 22, 2025",
                          content: "Indexing strategies and query performance...",
                          color: "purple"
                        },
                        {
                          title: "Cloud Architecture",
                          date: "June 20, 2025",
                          content: "AWS vs Azure service comparison...",
                          color: "orange"
                        },
                        {
                          title: "UI/UX Design Principles",
                          date: "June 18, 2025",
                          content: "User research and prototyping methods...",
                          color: "red"
                        },
                        {
                          title: "Cybersecurity Fundamentals",
                          date: "June 15, 2025",
                          content: "Network security and threat modeling...",
                          color: "teal"
                        }
                      ].map((note, index) => (
                        <div 
                          key={index} 
                          className={`p-3 border-l-4 border-${note.color}-500 bg-${note.color}-50 rounded-r-lg mb-3 cursor-pointer hover:bg-${note.color}-100 transition-colors`}
                        >
                          <h3 className="font-medium text-gray-800">{note.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">{note.date}</p>
                          <p className="text-sm text-gray-600 mt-2 truncate">{note.content}</p>
                        </div>
                      ))}
                    </ScrollArea>
                    <CardFooter className="border-t border-gray-200 mt-4">
                      <Button className="w-full !rounded-button cursor-pointer whitespace-nowrap">
                        <i className="fas fa-plus mr-2"></i> New Note
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                <div className="md:col-span-2">
                  <Card className="border border-gray-200 shadow-sm h-full">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <div>
                        <CardTitle className="text-lg">Machine Learning Algorithms</CardTitle>
                        <CardDescription>Last edited: June 29, 2025</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="!rounded-button cursor-pointer whitespace-nowrap">
                          <i className="fas fa-share-alt mr-1"></i> Share
                        </Button>
                        <Button variant="outline" size="sm" className="!rounded-button cursor-pointer whitespace-nowrap">
                          <i className="fas fa-download mr-1"></i> Export
                        </Button>
                        <Button size="sm" className="!rounded-button cursor-pointer whitespace-nowrap">
                          <i className="fas fa-save mr-1"></i> Save
                        </Button>
                      </div>
                    </CardHeader>
                    <Separator />
                    <CardContent className="pt-4">
                      <div className="prose max-w-none">
                        <h2>Machine Learning Algorithms Overview</h2>
                        
                        <h3>Supervised Learning</h3>
                        <p>
                          Supervised learning algorithms learn from labeled training data, making predictions or decisions based on that learning. The algorithm builds a model that maps inputs to desired outputs.
                        </p>
                        <ul>
                          <li><strong>Linear Regression:</strong> Predicts continuous values</li>
                          <li><strong>Logistic Regression:</strong> Used for binary classification</li>
                          <li><strong>Decision Trees:</strong> Tree-like model of decisions</li>
                          <li><strong>Random Forest:</strong> Ensemble of decision trees</li>
                          <li><strong>Support Vector Machines:</strong> Finds optimal hyperplane for classification</li>
                        </ul>
                        
                        <h3>Unsupervised Learning</h3>
                        <p>
                          Unsupervised learning algorithms work with unlabeled data, trying to find patterns or intrinsic structures in the input data.
                        </p>
                        <ul>
                          <li><strong>K-means Clustering:</strong> Groups similar data points</li>
                          <li><strong>Hierarchical Clustering:</strong> Creates tree of clusters</li>
                          <li><strong>PCA:</strong> Reduces dimensionality while preserving variance</li>
                          <li><strong>Autoencoders:</strong> Neural networks for feature learning</li>
                        </ul>
                        
                        <h3>Reinforcement Learning</h3>
                        <p>
                          Reinforcement learning is about taking actions to maximize cumulative reward. The agent learns by interacting with its environment.
                        </p>
                        <ul>
                          <li><strong>Q-Learning:</strong> Value-based method</li>
                          <li><strong>Policy Gradient:</strong> Directly optimizes policy</li>
                          <li><strong>Deep Q Networks:</strong> Combines Q-learning with deep neural networks</li>
                        </ul>
                        
                        <h3>Evaluation Metrics</h3>
                        <p>
                          Different metrics are used to evaluate model performance:
                        </p>
                        <ul>
                          <li>Accuracy, Precision, Recall, F1-Score</li>
                          <li>ROC Curve and AUC</li>
                          <li>Mean Squared Error, Mean Absolute Error</li>
                          <li>R-squared</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* Practice Content */}
            <TabsContent value="practice" className="mt-0">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
                <Tabs value={practiceTab} onValueChange={setPracticeTab}>
                  <TabsList className="bg-gray-100 p-1">
                    <TabsTrigger 
                      value="qna" 
                      className="!rounded-button cursor-pointer whitespace-nowrap"
                    >
                      <i className="fas fa-question-circle mr-2"></i> Q&A
                    </TabsTrigger>
                    <TabsTrigger 
                      value="mcq" 
                      className="!rounded-button cursor-pointer whitespace-nowrap"
                    >
                      <i className="fas fa-tasks mr-2"></i> MCQ
                    </TabsTrigger>
                    <TabsTrigger 
                      value="questionpaper" 
                      className="!rounded-button cursor-pointer whitespace-nowrap"
                    >
                      <i className="fas fa-file-alt mr-2"></i> Question Papers
                    </TabsTrigger>
                  </TabsList>
                  
                  {/* Q&A Content */}
                  <TabsContent value="qna" className="mt-4">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold text-gray-800">Question & Answer Practice</h2>
                      <div className="flex gap-2">
                        <Button variant="outline" className="!rounded-button cursor-pointer whitespace-nowrap">
                          <i className="fas fa-filter mr-2"></i> Filter
                        </Button>
                        <Button className="!rounded-button cursor-pointer whitespace-nowrap">
                          <i className="fas fa-plus mr-2"></i> Add Question
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">What is the difference between supervised and unsupervised learning?</CardTitle>
                          <CardDescription>Machine Learning • Fundamentals</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Collapsible>
                            <CollapsibleTrigger asChild>
                              <Button variant="outline" className="w-full !rounded-button cursor-pointer whitespace-nowrap">
                                <i className="fas fa-eye mr-2"></i> Show Answer
                              </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="mt-3 p-3 bg-gray-50 rounded-lg">
                              <p className="text-gray-700">
                                <strong>Supervised learning</strong> uses labeled training data to learn the mapping function from input variables to output variables. The algorithm is "supervised" because it learns from known correct answers.
                              </p>
                              <p className="text-gray-700 mt-2">
                                <strong>Unsupervised learning</strong>, on the other hand, works with unlabeled data. The algorithm tries to find patterns or intrinsic structures in the input data without being told what the correct output should be.
                              </p>
                              <p className="text-gray-700 mt-2">
                                Examples of supervised learning include regression and classification, while examples of unsupervised learning include clustering and dimensionality reduction.
                              </p>
                            </CollapsibleContent>
                          </Collapsible>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-0">
                          <div className="flex gap-2">
                            <Badge variant="outline" className="text-blue-600 bg-blue-50">Machine Learning</Badge>
                            <Badge variant="outline" className="text-green-600 bg-green-50">Beginner</Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="!rounded-button cursor-pointer whitespace-nowrap">
                              <i className="fas fa-bookmark mr-1"></i> Save
                            </Button>
                            <Button variant="ghost" size="sm" className="!rounded-button cursor-pointer whitespace-nowrap">
                              <i className="fas fa-share-alt mr-1"></i> Share
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Explain the concept of recursion in programming.</CardTitle>
                          <CardDescription>Computer Science • Algorithms</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Collapsible>
                            <CollapsibleTrigger asChild>
                              <Button variant="outline" className="w-full !rounded-button cursor-pointer whitespace-nowrap">
                                <i className="fas fa-eye mr-2"></i> Show Answer
                              </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="mt-3 p-3 bg-gray-50 rounded-lg">
                              <p className="text-gray-700">
                                <strong>Recursion</strong> is a programming technique where a function calls itself directly or indirectly to solve a problem. A recursive function has two main components:
                              </p>
                              <ol className="list-decimal pl-5 mt-2 space-y-1">
                                <li><strong>Base case(s):</strong> Condition(s) that stop the recursion</li>
                                <li><strong>Recursive case:</strong> Where the function calls itself with a modified input</li>
                              </ol>
                              <p className="text-gray-700 mt-2">
                                Recursion is particularly useful for problems that can be broken down into smaller, similar subproblems, such as tree traversals, graph algorithms, and divide-and-conquer approaches.
                              </p>
                              <p className="text-gray-700 mt-2">
                                Example: A recursive function to calculate factorial:
                              </p>
                              <pre className="bg-gray-800 text-white p-2 rounded mt-2 overflow-x-auto">
                                <code>
{`function factorial(n) {
  // Base case
  if (n === 0 || n === 1) {
    return 1;
  }
  // Recursive case
  return n * factorial(n - 1);
}`}
                                </code>
                              </pre>
                            </CollapsibleContent>
                          </Collapsible>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-0">
                          <div className="flex gap-2">
                            <Badge variant="outline" className="text-purple-600 bg-purple-50">Programming</Badge>
                            <Badge variant="outline" className="text-yellow-600 bg-yellow-50">Intermediate</Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="!rounded-button cursor-pointer whitespace-nowrap">
                              <i className="fas fa-bookmark mr-1"></i> Save
                            </Button>
                            <Button variant="ghost" size="sm" className="!rounded-button cursor-pointer whitespace-nowrap">
                              <i className="fas fa-share-alt mr-1"></i> Share
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">What are the key principles of RESTful API design?</CardTitle>
                          <CardDescription>Web Development • API Design</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Collapsible>
                            <CollapsibleTrigger asChild>
                              <Button variant="outline" className="w-full !rounded-button cursor-pointer whitespace-nowrap">
                                <i className="fas fa-eye mr-2"></i> Show Answer
                              </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="mt-3 p-3 bg-gray-50 rounded-lg">
                              <p className="text-gray-700">
                                <strong>RESTful API design</strong> follows these key principles:
                              </p>
                              <ol className="list-decimal pl-5 mt-2 space-y-1">
                                <li><strong>Stateless:</strong> Each request contains all information needed to complete it</li>
                                <li><strong>Client-Server:</strong> Separation of concerns between client and server</li>
                                <li><strong>Cacheable:</strong> Responses must define themselves as cacheable or non-cacheable</li>
                                <li><strong>Uniform Interface:</strong> Standardized way to transfer data</li>
                                <li><strong>Layered System:</strong> Client cannot tell if it's connected directly to the end server</li>
                                <li><strong>Resource-Based:</strong> Resources are identified in requests using URIs</li>
                              </ol>
                              <p className="text-gray-700 mt-2">
                                RESTful APIs typically use HTTP methods appropriately:
                              </p>
                              <ul className="list-disc pl-5 mt-1 space-y-1">
                                <li><strong>GET:</strong> Retrieve resources</li>
                                <li><strong>POST:</strong> Create new resources</li>
                                <li><strong>PUT:</strong> Update existing resources</li>
                                <li><strong>DELETE:</strong> Remove resources</li>
                                <li><strong>PATCH:</strong> Partially update resources</li>
                              </ul>
                            </CollapsibleContent>
                          </Collapsible>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-0">
                          <div className="flex gap-2">
                            <Badge variant="outline" className="text-green-600 bg-green-50">Web Development</Badge>
                            <Badge variant="outline" className="text-yellow-600 bg-yellow-50">Intermediate</Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="!rounded-button cursor-pointer whitespace-nowrap">
                              <i className="fas fa-bookmark mr-1"></i> Save
                            </Button>
                            <Button variant="ghost" size="sm" className="!rounded-button cursor-pointer whitespace-nowrap">
                              <i className="fas fa-share-alt mr-1"></i> Share
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  {/* MCQ Content */}
                  <TabsContent value="mcq" className="mt-4">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold text-gray-800">Multiple Choice Questions</h2>
                      <div className="flex gap-2">
                        <Button variant="outline" className="!rounded-button cursor-pointer whitespace-nowrap">
                          <i className="fas fa-random mr-2"></i> Shuffle
                        </Button>
                        <Button className="!rounded-button cursor-pointer whitespace-nowrap">
                          <i className="fas fa-play mr-2"></i> Start Quiz
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Which of the following is NOT a principle of object-oriented programming?</CardTitle>
                          <CardDescription>Programming • Object-Oriented Design</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                                <div className="h-3 w-3 rounded-full bg-transparent"></div>
                              </div>
                              <span>Encapsulation</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                                <div className="h-3 w-3 rounded-full bg-transparent"></div>
                              </div>
                              <span>Inheritance</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                                <div className="h-3 w-3 rounded-full bg-blue-600"></div>
                              </div>
                              <span>Normalization</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                                <div className="h-3 w-3 rounded-full bg-transparent"></div>
                              </div>
                              <span>Polymorphism</span>
                            </div>
                          </div>
                          
                          <div className="mt-4 p-3 bg-green-50 rounded-lg">
                            <p className="text-green-700 font-medium">Correct! Normalization is a database design technique, not an OOP principle.</p>
                            <p className="text-green-700 mt-1">The four main principles of OOP are Encapsulation, Inheritance, Polymorphism, and Abstraction.</p>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <div className="flex gap-2">
                            <Badge variant="outline" className="text-purple-600 bg-purple-50">Programming</Badge>
                            <Badge variant="outline" className="text-green-600 bg-green-50">Beginner</Badge>
                          </div>
                          <Button variant="outline" className="!rounded-button cursor-pointer whitespace-nowrap">
                            <i className="fas fa-arrow-right mr-1"></i> Next Question
                          </Button>
                        </CardFooter>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Which sorting algorithm has the best average-case time complexity?</CardTitle>
                          <CardDescription>Algorithms • Sorting</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                                <div className="h-3 w-3 rounded-full bg-transparent"></div>
                              </div>
                              <span>Bubble Sort</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                                <div className="h-3 w-3 rounded-full bg-transparent"></div>
                              </div>
                              <span>Insertion Sort</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                                <div className="h-3 w-3 rounded-full bg-transparent"></div>
                              </div>
                              <span>Selection Sort</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="h-5 w-5 rounded-full border border-gray-300 flex items-center justify-center">
                                <div className="h-3 w-3 rounded-full bg-transparent"></div>
                              </div>
                              <span>Quick Sort</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <div className="flex gap-2">
                            <Badge variant="outline" className="text-blue-600 bg-blue-50">Algorithms</Badge>
                            <Badge variant="outline" className="text-yellow-600 bg-yellow-50">Intermediate</Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" className="!rounded-button cursor-pointer whitespace-nowrap">
                              <i className="fas fa-lightbulb mr-1"></i> Hint
                            </Button>
                            <Button variant="outline" className="!rounded-button cursor-pointer whitespace-nowrap">
                              <i className="fas fa-check mr-1"></i> Check Answer
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  {/* Question Papers Content */}
                  <TabsContent value="questionpaper" className="mt-4">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold text-gray-800">Question Papers</h2>
                      <div className="flex gap-2">
                        <Button variant="outline" className="!rounded-button cursor-pointer whitespace-nowrap">
                          <i className="fas fa-filter mr-2"></i> Filter
                        </Button>
                        <Button className="!rounded-button cursor-pointer whitespace-nowrap">
                          <i className="fas fa-plus mr-2"></i> Create New
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        {
                          title: "Data Structures and Algorithms",
                          questions: 25,
                          duration: "90 minutes",
                          difficulty: "Intermediate",
                          color: "blue"
                        },
                        {
                          title: "Machine Learning Fundamentals",
                          questions: 30,
                          duration: "120 minutes",
                          difficulty: "Advanced",
                          color: "purple"
                        },
                        {
                          title: "Web Development Basics",
                          questions: 20,
                          duration: "60 minutes",
                          difficulty: "Beginner",
                          color: "green"
                        },
                        {
                          title: "Database Systems",
                          questions: 22,
                          duration: "75 minutes",
                          difficulty: "Intermediate",
                          color: "orange"
                        }
                      ].map((paper, index) => (
                        <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-lg">{paper.title}</CardTitle>
                              <Badge variant={paper.difficulty === "Beginner" ? "outline" : paper.difficulty === "Intermediate" ? "secondary" : "destructive"} className="ml-2">
                                {paper.difficulty}
                              </Badge>
                            </div>
                            <CardDescription>
                              {paper.questions} questions • {paper.duration}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <i className="fas fa-clock"></i>
                                <span>{paper.duration}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <i className="fas fa-question-circle"></i>
                                <span>{paper.questions} questions</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <i className="fas fa-users"></i>
                                <span>245 attempts</span>
                              </div>
                            </div>
                          </CardContent>
                          <CardFooter className="pt-0 flex justify-between">
                            <Badge variant="outline" className={`text-${paper.color}-600 bg-${paper.color}-50 hover:bg-${paper.color}-100`}>
                              {paper.title.split(" ")[0]}
                            </Badge>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="!rounded-button cursor-pointer whitespace-nowrap">
                                <i className="fas fa-download mr-1"></i> PDF
                              </Button>
                              <Button size="sm" className="!rounded-button cursor-pointer whitespace-nowrap">
                                <i className="fas fa-play mr-1"></i> Start
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </TabsContent>
            
            {/* Audio Books Content */}
            <TabsContent value="audiobooks" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <Card className="border border-gray-200 shadow-sm h-full">
                    <CardHeader>
                      <CardTitle className="text-lg">Audio Library</CardTitle>
                      <CardDescription>
                        Listen to educational content
                      </CardDescription>
                    </CardHeader>
                    <div className="px-4 pb-2">
                      <Input 
                        type="text"
                        placeholder="Search audio books..."
                        className="w-full"
                      />
                    </div>
                    <ScrollArea className="h-[500px] px-4">
                      {[
                        {
                          title: "Machine Learning Fundamentals",
                          author: "Dr. Sarah Johnson",
                          duration: "5h 24m",
                          progress: 65,
                          image: "https://readdy.ai/api/search-image?query=abstract%20digital%20technology%20concept%20with%20neural%20network%20visualization%2C%20professional%20AI%20machine%20learning%20illustration%20with%20blue%20tones%20on%20dark%20background&width=80&height=80&seq=audio1&orientation=squarish"
                        },
                        {
                          title: "The Art of Programming",
                          author: "Michael Chen",
                          duration: "4h 15m",
                          progress: 100,
                          image: "https://readdy.ai/api/search-image?query=abstract%20code%20visualization%20with%20programming%20symbols%2C%20professional%20software%20development%20concept%20with%20blue%20and%20green%20elements%20on%20dark%20background&width=80&height=80&seq=audio2&orientation=squarish"
                        },
                        {
                          title: "Data Science Essentials",
                          author: "Emily Rodriguez",
                          duration: "6h 42m",
                          progress: 30,
                          image: "https://readdy.ai/api/search-image?query=data%20visualization%20with%20charts%20and%20analytics%20dashboard%2C%20professional%20data%20science%20concept%20with%20colorful%20elements%20on%20dark%20background&width=80&height=80&seq=audio3&orientation=squarish"
                        },
                        {
                          title: "Cloud Computing Masterclass",
                          author: "James Wilson",
                          duration: "7h 10m",
                          progress: 0,
                          image: "https://readdy.ai/api/search-image?query=cloud%20computing%20concept%20with%20server%20infrastructure%20visualization%2C%20professional%20technology%20illustration%20with%20blue%20elements%20on%20dark%20background&width=80&height=80&seq=audio4&orientation=squarish"
                        },
                        {
                          title: "Cybersecurity Fundamentals",
                          author: "Alex Thompson",
                          duration: "5h 35m",
                          progress: 15,
                          image: "https://readdy.ai/api/search-image?query=cybersecurity%20concept%20with%20shield%20and%20lock%20visualization%2C%20professional%20security%20illustration%20with%20blue%20elements%20on%20dark%20background&width=80&height=80&seq=audio5&orientation=squarish"
                        },
                        {
                          title: "Web Development Bootcamp",
                          author: "Jessica Park",
                          duration: "8h 20m",
                          progress: 0,
                          image: "https://readdy.ai/api/search-image?query=web%20development%20concept%20with%20code%20and%20design%20elements%2C%20professional%20programming%20visualization%20with%20colorful%20interface%20on%20dark%20background&width=80&height=80&seq=audio6&orientation=squarish"
                        }
                      ].map((audio, index) => (
                        <div 
                          key={index} 
                          className="flex items-center gap-3 p-3 rounded-lg mb-3 cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                          <img 
                            src={audio.image} 
                            alt={audio.title} 
                            className="w-16 h-16 rounded-md object-cover object-top"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-800 truncate">{audio.title}</h3>
                            <p className="text-sm text-gray-500">{audio.author}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Progress value={audio.progress} className="h-1 flex-1" />
                              <span className="text-xs text-gray-500 whitespace-nowrap">{audio.duration}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </ScrollArea>
                    <CardFooter className="border-t border-gray-200 mt-4">
                      <Button variant="outline" className="w-full !rounded-button cursor-pointer whitespace-nowrap">
                        <i className="fas fa-upload mr-2"></i> Upload Audio
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                <div className="md:col-span-2">
                  <Card className="border border-gray-200 shadow-sm h-full">
                    <div className="relative h-64 overflow-hidden rounded-t-xl">
                      <img 
                        src="https://readdy.ai/api/search-image?query=abstract%20digital%20technology%20concept%20with%20neural%20network%20visualization%2C%20professional%20AI%20machine%20learning%20illustration%20with%20blue%20and%20purple%20glowing%20nodes%20on%20dark%20background%2C%20high%20quality&width=800&height=300&seq=audiobg&orientation=landscape" 
                        alt="Machine Learning Fundamentals" 
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                        <h2 className="text-white text-2xl font-bold">Machine Learning Fundamentals</h2>
                        <p className="text-gray-200">By Dr. Sarah Johnson • 5h 24m</p>
                      </div>
                    </div>
                    <CardContent className="pt-6">
                      <div className="mb-6">
                        <h3 className="text-lg font-medium mb-2">Description</h3>
                        <p className="text-gray-600">
                          This comprehensive audiobook covers the fundamental concepts of machine learning, from basic algorithms to advanced techniques. Perfect for beginners and intermediate learners looking to strengthen their understanding of AI and data science principles.
                        </p>
                      </div>
                      
                      <div className="mb-6">
                        <h3 className="text-lg font-medium mb-2">Chapters</h3>
                        <div className="space-y-2">
                          {[
                            { title: "Introduction to Machine Learning", duration: "42:15", active: true },
                            { title: "Supervised Learning Algorithms", duration: "58:30", active: false },
                            { title: "Unsupervised Learning Techniques", duration: "45:20", active: false },
                            { title: "Neural Networks Basics", duration: "1:12:45", active: false },
                            { title: "Practical Applications", duration: "55:10", active: false },
                            { title: "Future Trends in AI", duration: "50:30", active: false }
                          ].map((chapter, index) => (
                            <div 
                              key={index} 
                              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${chapter.active ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-100"}`}
                            >
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${chapter.active ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`}>
                                  {chapter.active ? <i className="fas fa-play"></i> : index + 1}
                                </div>
                                <span className="font-medium">{chapter.title}</span>
                              </div>
                              <span className="text-sm text-gray-500">{chapter.duration}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t border-gray-200 pt-4">
                      <div className="w-full space-y-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">2:15</span>
                          <Slider
                            value={[audioProgress]}
                            max={100}
                            step={1}
                            className="flex-1"
                            onValueChange={(value) => setAudioProgress(value[0])}
                          />
                          <span className="text-sm text-gray-500">42:15</span>
                        </div>
                        <div className="flex items-center justify-center gap-4">
                          <Button variant="ghost" size="icon" className="h-10 w-10 !rounded-button cursor-pointer">
                            <i className="fas fa-step-backward"></i>
                          </Button>
                          <Button variant="ghost" size="icon" className="h-10 w-10 !rounded-button cursor-pointer" onClick={() => setIsPlaying(!isPlaying)}>
                            <i className={`fas fa-${isPlaying ? 'pause' : 'play'}`}></i>
                          </Button>
                          <Button variant="ghost" size="icon" className="h-10 w-10 !rounded-button cursor-pointer">
                            <i className="fas fa-step-forward"></i>
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Button variant="ghost" size="sm" className="!rounded-button cursor-pointer whitespace-nowrap">
                              <i className="fas fa-volume-up mr-1"></i> 80%
                            </Button>
                            <Button variant="ghost" size="sm" className="!rounded-button cursor-pointer whitespace-nowrap">
                              <i className="fas fa-redo mr-1"></i> Loop
                            </Button>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button variant="ghost" size="sm" className="!rounded-button cursor-pointer whitespace-nowrap">
                              <i className="fas fa-download mr-1"></i> Download
                            </Button>
                            <Button variant="ghost" size="sm" className="!rounded-button cursor-pointer whitespace-nowrap">
                              <i className="fas fa-share-alt mr-1"></i> Share
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AudioBook;
