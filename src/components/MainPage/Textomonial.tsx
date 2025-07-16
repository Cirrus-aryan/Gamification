import {
  Card,
  CardContent,

} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Material-UI Icon Imports
import StarIcon from '@mui/icons-material/Star';

function Textomonial() {
  // Removed all unused state and effect hooks that were copied from MainSection.tsx
  // Testimonial component only needs to display content, not manage uploads, processing, or billing.

  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="text-center mb-14">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            What Our Users Say
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Hear from educators and learners who are transforming their
            experience with CourseForge.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Testimonial Card 1 */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="flex text-yellow-400 mb-4">
                {/* Replaced Font Awesome with Material-UI star icons */}
                <StarIcon className="text-yellow-400" />
                <StarIcon className="text-yellow-400" />
                <StarIcon className="text-yellow-400" />
                <StarIcon className="text-yellow-400" />
                <StarIcon className="text-yellow-400" />
              </div>
              <p className="mb-6 text-gray-700">
                "CourseForge has revolutionized how I create study materials.
                The AI summaries are incredibly accurate, saving me hours
                every week!"
              </p>
              <div className="flex items-center">
                <Avatar className="mr-4">
                  <AvatarImage src="" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">John Doe</p>
                  <p className="text-sm text-gray-500">University Student</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testimonial Card 2 */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="flex text-yellow-400 mb-4">
                <StarIcon className="text-yellow-400" />
                <StarIcon className="text-yellow-400" />
                <StarIcon className="text-yellow-400" />
                <StarIcon className="text-yellow-400" />
                <StarIcon className="text-yellow-400" />
              </div>
              <p className="mb-6 text-gray-700">
                "As an online educator, generating quizzes and practice questions
                used to be tedious. CourseForge does it instantly, and the quality
                is exceptional!"
              </p>
              <div className="flex items-center">
                <Avatar className="mr-4">
                  <AvatarImage src="" />
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">Sarah Miller</p>
                  <p className="text-sm text-gray-500">High School Teacher</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testimonial Card 3 */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-8">
              <div className="flex text-yellow-400 mb-4">
                <StarIcon className="text-yellow-400" />
                <StarIcon className="text-yellow-400" />
                <StarIcon className="text-yellow-400" />
                <StarIcon className="text-yellow-400" />
                <StarIcon className="text-yellow-400" />
              </div>
              <p className="mb-6 text-gray-700">
                "My students love the interactive quizzes and games generated
                from my lecture materials. Engagement has increased
                dramatically since I started using CourseForge."
              </p>
              <div className="flex items-center">
                <Avatar className="mr-4">
                  <AvatarImage src="" />
                  <AvatarFallback>AP</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">Aisha Patel</p>
                  <p className="text-sm text-gray-500">
                    Online Course Creator
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Textomonial;