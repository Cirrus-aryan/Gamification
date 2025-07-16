import FeedbackForm from './FeedbackForm';
import FeedbackStats from './FeedbackStats';
import RecentFeedback from './RecentFeedback';

export default function FeedbackPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Share Your Feedback</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Your feedback helps us improve our platform and create better learning experiences. 
              We value every comment, suggestion, and review from our community.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold">2,847</div>
                <div className="text-blue-200">Total Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">4.8★</div>
                <div className="text-blue-200">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">96%</div>
                <div className="text-blue-200">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Feedback Statistics */}
        <FeedbackStats />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Feedback Form */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Submit Your Feedback</h2>
              <p className="text-gray-600">
                We'd love to hear from you! Share your thoughts, suggestions, or report any issues you've encountered.
              </p>
            </div>
            <FeedbackForm />
          </div>

          {/* Feedback Guidelines */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <i className="ri-information-line text-blue-600 mr-3 w-6 h-6 flex items-center justify-center"></i>
                Feedback Guidelines
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                    <i className="ri-check-line text-xs text-blue-600"></i>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Be Specific</h4>
                    <p className="text-sm text-gray-600">Provide detailed information to help us understand your experience.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                    <i className="ri-check-line text-xs text-blue-600"></i>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Be Constructive</h4>
                    <p className="text-sm text-gray-600">Focus on how we can improve rather than just pointing out problems.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                    <i className="ri-check-line text-xs text-blue-600"></i>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Include Context</h4>
                    <p className="text-sm text-gray-600">Mention the course, instructor, or feature you're referring to.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                    <i className="ri-check-line text-xs text-blue-600"></i>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Be Respectful</h4>
                    <p className="text-sm text-gray-600">Maintain a professional and respectful tone in your feedback.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <i className="ri-question-line text-blue-600 mr-3 w-6 h-6 flex items-center justify-center"></i>
                How We Use Your Feedback
              </h3>
              <div className="space-y-4 text-sm text-gray-600">
                <p>
                  <strong className="text-gray-900">Course Improvement:</strong> Your reviews help us enhance course content and structure.
                </p>
                <p>
                  <strong className="text-gray-900">Feature Development:</strong> Suggestions guide our product roadmap and new features.
                </p>
                <p>
                  <strong className="text-gray-900">Quality Assurance:</strong> Bug reports help us maintain a smooth learning experience.
                </p>
                <p>
                  <strong className="text-gray-900">Instructor Support:</strong> Feedback helps instructors improve their teaching methods.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl border border-blue-200 p-8">
              <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                <i className="ri-customer-service-2-line text-blue-600 mr-3 w-5 h-5 flex items-center justify-center"></i>
                Need Immediate Help?
              </h3>
              <p className="text-blue-800 text-sm mb-4">
                For urgent issues or immediate assistance, contact our support team directly.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-blue-700">
                  <i className="ri-mail-line w-4 h-4 flex items-center justify-center mr-2"></i>
                  support@learningplatform.com
                </div>
                <div className="flex items-center text-blue-700">
                  <i className="ri-phone-line w-4 h-4 flex items-center justify-center mr-2"></i>
                  1-800-SUPPORT
                </div>
                <div className="flex items-center text-blue-700">
                  <i className="ri-time-line w-4 h-4 flex items-center justify-center mr-2"></i>
                  24/7 Live Chat Available
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Feedback Section */}
        <div className="mt-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recent Community Feedback</h2>
            <p className="text-gray-600">
              See what other learners are saying and how we're addressing their feedback.
            </p>
          </div>
          <RecentFeedback />
        </div>
      </div>
    </div>
  );
}