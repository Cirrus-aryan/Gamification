import React, { useContext, useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { DataContext } from "@/Context/Context";
import type{TabItem,CourseInfo,AnalysisData, CourseBackupData} from "@/components/Course/CourseCreation/type";
// --- Define Types for Clarity and Safety ---




// --- Consistent localStorage Key ---
const LOCAL_STORAGE_KEY = import.meta.env.VITE_LOCAL_STORAGE_KEY;

const CourceCreation: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    Tabs,
    setTabs,
    courseInfo,
    setCourseInfo,
    Analysis,
    setAnalysis,
    setFinalFormate,
    musicplaylists, // Destructure musicplaylists from context
    setmusicplaylists, // Destructure setmusicplaylists from context
  } = useContext(DataContext);

  const handleOpenModal = useCallback(() => setIsModalOpen(true), []);
  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setCourseInfo((prevInfo: any) => ({
        ...prevInfo,
        [name]:
          name === "price" || name === "duration"
            ? value === "" ? "" : Number(value)
            : value,
      }));
    },
    [setCourseInfo]
  );

  const handleSelectChange = useCallback(
    (name: keyof CourseInfo, value: string) => {
      setCourseInfo((prevInfo: any) => ({
        ...prevInfo,
        [name]: value,
      }));
    },
    [setCourseInfo]
  );

  const handleRadioChange = useCallback(
    (value: string) => {
      setCourseInfo((prevInfo: any) => ({
        ...prevInfo,
        difficulty: value as CourseInfo["difficulty"],
      }));
    },
    [setCourseInfo]
  );

  const handlePricingTypeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setCourseInfo((prevInfo: { price: any; }) => ({
        ...prevInfo,
        pricingType: value as CourseInfo["pricingType"],
        price: value === "free" ? 0 : prevInfo.price,
      }));
    },
    [setCourseInfo]
  );

  const handleContinue = useCallback(() => {
    if (!courseInfo.title.trim() || !courseInfo.description.trim()) {
      alert("Please enter a course title and description before continuing.");
      return;
    }
    handleCloseModal();
  }, [courseInfo.title, courseInfo.description, handleCloseModal]);


  // --- IMPROVED BACKUP PROCESS ---
  const saveCourseData = useCallback(() => {
    const hasMeaningfulCourseInfo =
      courseInfo.title.trim() !== "" && courseInfo.description.trim() !== "";
    const hasAnalysisData = Array.isArray(Analysis) && Analysis.length > 0;
    const hasTabsData = Array.isArray(Tabs) && Tabs.length > 0;
    const hasMusicPlaylistsData = Array.isArray(musicplaylists) && musicplaylists.length > 0; // Check for music data


    if (hasMeaningfulCourseInfo || hasAnalysisData || hasTabsData || hasMusicPlaylistsData) { // Include music data in the check
      const dataToSave: CourseBackupData = {
        courseInfo,
        Analysis: Analysis as AnalysisData,
        Tabs: Tabs as TabItem[],
        musicplaylists: musicplaylists, // Add musicplaylists to dataToSave
        lastSaved: Date.now(),
      };

      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));
        setFinalFormate([{ ...courseInfo, SummarysPerfiles: Analysis, ProcessedFiles: Tabs, musicplaylists: musicplaylists }]); // Also add to finalFormate if used for submission/export
        console.log("Course data backed up to localStorage successfully.");
      } catch (error) {
        console.error("Error saving course data to localStorage:", error);
      }
    } else {
      console.log("Skipping backup: Course information is not yet substantial.");
    }
  }, [courseInfo, Analysis, Tabs, musicplaylists, setFinalFormate]); // Add musicplaylists to dependencies

  useEffect(() => {
    const handler = setTimeout(() => {
      saveCourseData();
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [saveCourseData]);

  // --- ENHANCED RESTORATION PROCESS (FIXED FOR TABS AND MUSICPLAYLISTS) ---
  useEffect(() => {
    const backup = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (backup) {
      try {
        const parsedBackup: CourseBackupData = JSON.parse(backup);

        if (parsedBackup.courseInfo && typeof parsedBackup.courseInfo === 'object') {
          setCourseInfo(parsedBackup.courseInfo);
          if (parsedBackup.courseInfo.title.trim() !== '' || parsedBackup.courseInfo.description.trim() !== '') {
          }
        } else {
          console.warn("Invalid 'courseInfo' found in backup, using default state.");
        }

        if (Array.isArray(parsedBackup.Analysis)) {
          setAnalysis(parsedBackup.Analysis);
        } else {
          console.warn("Invalid 'Analysis' data found in backup, defaulting to empty array.");
          setAnalysis([]);
        }

        if (Array.isArray(parsedBackup.Tabs)) {
          setTabs(parsedBackup.Tabs);
        } else {
          console.warn("Invalid 'Tabs' data found in backup, defaulting to empty array.");
          setTabs([]);
        }

        // --- FIX: Add explicit check and set for musicplaylists data ---
        if (Array.isArray(parsedBackup.musicplaylists)) {
          setmusicplaylists(parsedBackup.musicplaylists);
        } else {
          console.warn("Invalid 'musicplaylists' data found in backup, defaulting to empty array.");
          setmusicplaylists([]); // Ensure it's an array even if corrupted
        }
        // --- END FIX ---

        console.log(`Course data restored from localStorage (last saved: ${new Date(parsedBackup.lastSaved || 0).toLocaleString()}).`);

      } catch (e) {
        console.error("Failed to parse or restore course creation backup from localStorage:", e);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        console.log("Corrupted backup cleared from localStorage to prevent further issues.");
      }
    } else {
      console.log("No previous course data backup found in localStorage.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array means this effect runs only once after the initial render


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Create Your Online Course
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Share your knowledge with the world. Our platform makes it easy to
            build, manage, and sell professional online courses.
          </p>
        </div>
        <div className="relative w-full h-80 mb-12 rounded-xl overflow-hidden">
          <img
            src="https://readdy.ai/api/search-image?query=A%20modern%20educational%20workspace%20with%20a%20laptop%2C%20tablet%2C%20books%2C%20and%20coffee%20on%20a%20clean%20desk.%20Soft%20natural%20lighting%20coming%20through%20windows%2C%20creating%20an%20inspiring%20atmosphere%20for%20course%20creation.%20Professional%20and%20inviting%20environment%20with%20minimal%20distractions&width=1200&height=400&seq=1&orientation=landscape"
            alt="Course Creation Workspace"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-8 text-white">
              <h2 className="text-3xl font-bold mb-2">
                Become an Instructor Today
              </h2>
              <p className="text-lg mb-4">
                Turn your expertise into an engaging online learning experience.
              </p>
            </div>
          </div>
        </div>
        <Button
          onClick={handleOpenModal}
          className="!rounded-button bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap cursor-pointer"
        >
          <i className="fas fa-plus-circle mr-2"></i> Create New Course
        </Button>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-indigo-600 text-4xl mb-4">
              <i className="fas fa-file-alt"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Content Upload</h3>
            <p className="text-gray-600">
              Upload videos, documents, and quizzes with our intuitive
              drag-and-drop interface.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-indigo-600 text-4xl mb-4">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Track Performance</h3>
            <p className="text-gray-600">
              Get detailed analytics on student engagement and course
              performance.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="text-indigo-600 text-4xl mb-4">
              <i className="fas fa-globe"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
            <p className="text-gray-600">
              Share your knowledge with students from around the world.
            </p>
          </div>
        </div>
      </div>
      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-screen" style={{ maxWidth: '100vw',maxHeight:'90vh',overflow:"auto" }}>
          <DialogHeader>
            <DialogTitle>Course Information</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4 overflow-auto grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                name="title"
                value={courseInfo.title}
                onChange={handleInputChange}
                placeholder="Enter course title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Course Description</Label>
              <Textarea
                id="description"
                name="description"
                value={courseInfo.description}
                onChange={handleInputChange}
                placeholder="Enter course description"
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prerequisites">Prerequisites(Seprated by commas)</Label>
              <Textarea
                id="prerequisites"
                name="prerequisites"
                value={courseInfo.prerequisites}
                onChange={handleInputChange}
                placeholder="Enter course prerequisites (e.g., Basic programming knowledge, Familiarity with design tools)"
                rows={2}
              />
              
            </div>
            <div className="space-y-2">
              <Label htmlFor="learningOutcomes">Learning Outcomes(Seperated by commas)</Label>
              <Textarea
                id="learningOutcomes"
                name="learningOutcomes"
                value={courseInfo.learningOutcomes}
                onChange={handleInputChange}
                placeholder="What will students learn from this course?"
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label>Pricing</Label>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="paid"
                    name="pricingType"
                    value="paid"
                    checked={courseInfo.pricingType === "paid"}
                    onChange={handlePricingTypeChange}
                    className="text-indigo-600"
                  />
                  <Label htmlFor="paid">Paid</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="free"
                    name="pricingType"
                    value="free"
                    checked={courseInfo.pricingType === "free"}
                    onChange={handlePricingTypeChange}
                    className="text-indigo-600"
                  />
                  <Label htmlFor="free">Free</Label>
                </div>
              </div>
              {courseInfo.pricingType === "paid" && (
                <div className="flex space-x-4 mt-2">
                  <div className="flex-1">
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={courseInfo.price === 0 ? "" : courseInfo.price}
                      onChange={handleInputChange}
                      placeholder="Enter price"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <Select
                    value={courseInfo.currency}
                    onValueChange={(value) =>
                      handleSelectChange("currency", value)
                    }
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="USD" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="INR">INR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label>Language</Label>
              <Select
                value={courseInfo.language}
                onValueChange={(value) => handleSelectChange("language", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select course language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="zh">Chinese</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={courseInfo.category}
                onValueChange={(value) => handleSelectChange("category", value)}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="personal-development">
                    Personal Development
                  </SelectItem>
                  <SelectItem value="art-photography">Art & Photography</SelectItem>
                  <SelectItem value="health-fitness">Health & Fitness</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Difficulty Level</Label>
              <RadioGroup
                value={courseInfo.difficulty}
                onValueChange={handleRadioChange}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="beginner" id="r-beginner" />
                  <Label htmlFor="r-beginner">Beginner</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="intermediate" id="r-intermediate" />
                  <Label htmlFor="r-intermediate">Intermediate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="advanced" id="r-advanced" />
                  <Label htmlFor="r-advanced">Advanced</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Estimated Duration (hours)</Label>
              <Input
                id="duration"
                type="number"
                name="duration"
                value={courseInfo.duration === 0 ? "" : courseInfo.duration}
                onChange={handleInputChange}
                placeholder="Enter estimated hours"
                min={0}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleCloseModal}
              className="!rounded-button whitespace-nowrap cursor-pointer"
            >
              Cancel
            </Button>
            <Link to="/Course_Completion">
              <Button
                onClick={handleContinue}
                className="!rounded-button whitespace-nowrap cursor-pointer"
              >
                Continue
              </Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourceCreation;