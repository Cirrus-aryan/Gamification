// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Import Material-UI Icons
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      {/* Optimized Image Loading */}
      <div className="absolute inset-0 z-0">
        <img
          src="/mainPage.jpg"
          alt="Course creation platform"
          className="object-cover w-full h-full opacity-90"
          loading="lazy" // Load this image immediately as it's the LCP element
          // Add width and height attributes if you know the image dimensions for better LCP and layout shift
          // width={1920}
          // height={1080}
        />
        {/* Overlay for gradient effect, if desired */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent"></div> */}
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 z-10 w-[70vw] m-auto text-center md:text-left py-12 px-4 md:px-8">
        <div className="max-w-4xl my-auto mx-auto md:mx-0"> {/* Adjusted max-w and mx-auto for better content centering */}
          <h2 className="text-4xl sm:text-2xl md:text-4xl underline decoration-blue-700 font-extrabold text-gray-900 leading-tight mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
Unlock Your Potential with Ascendia Learning.          </h2>
          <p className="mb-8 text-lg text-gray-600 max-w-2xl mx-auto md:mx-0">
            Upload your files and let AI do the heavy lifting. Get
            summaries, notes, quizzes, and more in any language - all with a
            few clicks.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <Link to="/CourseCreation">
              <Button className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 !rounded-button cursor-pointer whitespace-nowrap flex items-center gap-2">
                Start Creating <ArrowForwardIcon fontSize="small" />
              </Button>
            </Link>
            <Link to="/Learning">
              <Button
                variant="outline"
                className="px-6 py-3 !rounded-button cursor-pointer whitespace-nowrap flex items-center gap-2"
              >
                Start Learning <PlayArrowIcon fontSize="small" />
              </Button>
            </Link>
          </div>
        </div>
        <img src="Gemini_Generated_Image_vjm68tvjm68tvjm6.png" className="h-full hidden lg:block md:hidden rounded-2xl" alt="" />
      </div>
    </section>
  );
}

export default Hero;