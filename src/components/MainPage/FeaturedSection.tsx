// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Import Material-UI Icons
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MemoryIcon from '@mui/icons-material/Memory';
import SchoolIcon from '@mui/icons-material/School';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";


function FeaturedSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="text-center mb-14">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            How CourseForge Works
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Transform your raw content into comprehensive learning materials
            in three simple steps
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card className="overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img
                src="/Upload.png"
                alt="Upload content"
                className="object-cover w-full h-full"
                loading="lazy" // Optimized: Lazy load images outside the initial viewport
              />
            </div>
            <CardHeader>
              {/* Replaced numeric span with Material-UI Icon */}
              <Avatar className="flex items-center justify-center w-10 h-10 mb-2 rounded-full bg-blue-100">
                <AvatarFallback>
                  <CloudUploadIcon className="text-blue-600" />
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl text-center">
                Upload Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-600">
                Effortlessly upload documents, videos, or text files to our
                secure platform. We support a wide range of formats.
              </p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img
                src="/Processing.png"
                alt="AI processing"
                className="object-cover w-full h-full"
                loading="lazy" // Optimized: Lazy load images
              />
            </div>
            <CardHeader>
              {/* Replaced numeric span with Material-UI Icon */}
              <Avatar className="flex items-center justify-center w-10 h-10 mb-2 rounded-full bg-blue-100">
                <AvatarFallback>
                  <MemoryIcon className="text-blue-600" />
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl text-center">
                AI Processing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-600">
                Our advanced AI extracts key information, summarizes content,
                and generates notes, quizzes, and more from your uploads.
              </p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img
                src="/Complete_Course.png"
                alt="Complete course"
                className="object-cover w-full h-full"
                loading="lazy" // Optimized: Lazy load images
              />
            </div>
            <CardHeader>
              {/* Replaced numeric span with Material-UI Icon */}
              <Avatar className="flex items-center justify-center w-10 h-10 mb-2 rounded-full bg-blue-100">
                <AvatarFallback>
                  <SchoolIcon className="text-blue-600" />
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl text-center">
                Complete Course
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-600">
                Get your finished course with summaries, notes, quizzes,
                and interactive games, ready for your students to learn.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default FeaturedSection;