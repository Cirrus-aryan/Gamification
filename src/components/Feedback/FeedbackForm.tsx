

import { useState } from 'react';

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedbackType: 'general',
    courseId: '',
    rating: 5,
    subject: '',
    message: '',
    suggestions: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i className="ri-check-line text-2xl text-green-600"></i>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Thank You for Your Feedback!</h3>
        <p className="text-gray-600 mb-8">
          We've received your feedback and will review it carefully. Your input helps us improve our platform and courses.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: '',
              email: '',
              feedbackType: 'general',
              courseId: '',
              rating: 5,
              subject: '',
              message: '',
              suggestions: ''
            });
          }}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium whitespace-nowrap cursor-pointer"
        >
          Submit Another Feedback
        </button>
      </div>
    );
  }

  return (
    <form id="feedback-form" onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
      {/* Personal Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <i className="ri-user-line text-blue-600 mr-3 w-6 h-6 flex items-center justify-center"></i>
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="Enter your email address"
            />
          </div>
        </div>
      </div>

      {/* Feedback Type & Details */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <i className="ri-feedback-line text-blue-600 mr-3 w-6 h-6 flex items-center justify-center"></i>
          Feedback Details
        </h3>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Feedback Type *
              </label>
              <select
                name="feedbackType"
                value={formData.feedbackType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
              >
                <option value="general">General Feedback</option>
                <option value="course">Course Review</option>
                <option value="instructor">Instructor Feedback</option>
                <option value="technical">Technical Issue</option>
                <option value="suggestion">Feature Suggestion</option>
                <option value="complaint">Complaint</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course ID (if applicable)
              </label>
              <input
                type="text"
                name="courseId"
                value={formData.courseId}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="e.g., course-001"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Overall Rating
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                    className="cursor-pointer"
                  >
                    <i className={`ri-star-${star <= formData.rating ? 'fill' : 'line'} text-xl ${star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'}`}></i>
                  </button>
                ))}
              </div>
              <span className="text-sm text-gray-600">({formData.rating}/5 stars)</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject *
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              maxLength={100}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              placeholder="Brief subject of your feedback"
            />
            <p className="text-xs text-gray-500 mt-1">{formData.subject.length}/100 characters</p>
          </div>
        </div>
      </div>

      {/* Detailed Feedback */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <i className="ri-message-3-line text-blue-600 mr-3 w-6 h-6 flex items-center justify-center"></i>
          Detailed Feedback
        </h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Feedback *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              maxLength={500}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-vertical"
              placeholder="Please share your detailed feedback, thoughts, or concerns..."
            />
            <p className="text-xs text-gray-500 mt-1">{formData.message.length}/500 characters</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Suggestions for Improvement
            </label>
            <textarea
              name="suggestions"
              value={formData.suggestions}
              onChange={handleChange}
              maxLength={500}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-vertical"
              placeholder="Any suggestions on how we can improve? (Optional)"
            />
            <p className="text-xs text-gray-500 mt-1">{formData.suggestions.length}/500 characters</p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          disabled={isSubmitting || formData.message.length > 500 || formData.suggestions.length > 500}
          className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium whitespace-nowrap cursor-pointer text-lg min-w-[200px]"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <i className="ri-loader-4-line animate-spin mr-2"></i>
              Submitting...
            </span>
          ) : (
            'Submit Feedback'
          )}
        </button>
        <p className="text-sm text-gray-500 mt-4">
          Your feedback is important to us and will be reviewed by our team.
        </p>
      </div>
    </form>
  );
}