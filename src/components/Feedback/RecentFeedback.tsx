

import { useState } from 'react';

interface FeedbackItem {
  id: string;
  name: string;
  email: string;
  type: string;
  rating: number;
  subject: string;
  message: string;
  courseId?: string;
  date: string;
  status: 'pending' | 'reviewed' | 'resolved';
}

export default function RecentFeedback() {
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null);

  const recentFeedback: FeedbackItem[] = [
    {
      id: 'fb001',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      type: 'course',
      rating: 5,
      subject: 'Excellent React Course',
      message: 'The React Development Bootcamp exceeded my expectations. The instructor explained complex concepts clearly and the hands-on projects were incredibly valuable. I feel confident building React applications now.',
      courseId: 'course-001',
      date: '2024-01-15',
      status: 'reviewed'
    },
    {
      id: 'fb002',
      name: 'Michael Chen',
      email: 'mike.chen@email.com',
      type: 'technical',
      rating: 3,
      subject: 'Video Playback Issues',
      message: 'I\'m experiencing buffering issues with video lectures, especially during peak hours. The content is great but the technical difficulties are affecting my learning experience.',
      courseId: 'course-002',
      date: '2024-01-14',
      status: 'pending'
    },
    {
      id: 'fb003',
      name: 'Emily Rodriguez',
      email: 'emily.r@email.com',
      type: 'suggestion',
      rating: 4,
      subject: 'Mobile App Needed',
      message: 'Love the platform! Would be amazing to have a mobile app for learning on the go. Also, offline video downloads would be a great feature for commuting.',
      date: '2024-01-13',
      status: 'reviewed'
    },
    {
      id: 'fb004',
      name: 'David Kim',
      email: 'david.kim@email.com',
      type: 'instructor',
      rating: 5,
      subject: 'Outstanding Instructor',
      message: 'Dr. Sarah Smith is an incredible instructor. Her teaching style is engaging and she responds to questions quickly. The Python course structure is perfect for beginners.',
      courseId: 'course-002',
      date: '2024-01-12',
      status: 'resolved'
    },
    {
      id: 'fb005',
      name: 'Lisa Wang',
      email: 'lisa.w@email.com',
      type: 'general',
      rating: 4,
      subject: 'Great Learning Experience',
      message: 'The platform is user-friendly and the course quality is excellent. Certificate delivery was quick after completion. Minor suggestion: improve search functionality.',
      date: '2024-01-11',
      status: 'reviewed'
    },
    {
      id: 'fb006',
      name: 'James Wilson',
      email: 'james.w@email.com',
      type: 'complaint',
      rating: 2,
      subject: 'Refund Request Issue',
      message: 'Requested a refund 5 days ago but haven\'t received any response. The course didn\'t meet my expectations and I\'m within the refund period.',
      courseId: 'course-003',
      date: '2024-01-10',
      status: 'pending'
    },
    {
      id: 'fb007',
      name: 'Anna Thompson',
      email: 'anna.t@email.com',
      type: 'course',
      rating: 5,
      subject: 'UX Course is Amazing',
      message: 'The UX/UI Design Fundamentals course is comprehensive and practical. Lisa Chen is an excellent instructor with real industry experience. Highly recommend!',
      courseId: 'course-004',
      date: '2024-01-09',
      status: 'resolved'
    },
    {
      id: 'fb008',
      name: 'Robert Garcia',
      email: 'robert.g@email.com',
      type: 'technical',
      rating: 3,
      subject: 'Assignment Submission Error',
      message: 'Having trouble submitting assignments. Getting a 500 error when trying to upload files larger than 10MB. This is affecting my course progress.',
      courseId: 'course-005',
      date: '2024-01-08',
      status: 'pending'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'course': return 'ri-book-line';
      case 'instructor': return 'ri-user-line';
      case 'technical': return 'ri-tools-line';
      case 'suggestion': return 'ri-lightbulb-line';
      case 'complaint': return 'ri-error-warning-line';
      default: return 'ri-feedback-line';
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <i className="ri-history-line text-blue-600 mr-3 w-6 h-6 flex items-center justify-center"></i>
            Recent Feedback
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User & Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject & Rating
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentFeedback.map((feedback) => (
                <tr key={feedback.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3`}>
                        <i className={`${getTypeIcon(feedback.type)} text-sm text-blue-600`}></i>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{feedback.name}</div>
                        <div className="text-sm text-gray-500">{feedback.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900 mb-1">{feedback.subject}</div>
                      <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <i
                            key={star}
                            className={`ri-star-${star <= feedback.rating ? 'fill' : 'line'} text-sm ${star <= feedback.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          ></i>
                        ))}
                        <span className="text-xs text-gray-500 ml-2">({feedback.rating}/5)</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {feedback.courseId || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(feedback.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(feedback.status)}`}>
                      {feedback.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => setSelectedFeedback(feedback)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium whitespace-nowrap cursor-pointer"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Feedback Detail Modal */}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Feedback Details</h3>
                <button
                  onClick={() => setSelectedFeedback(null)}
                  className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center cursor-pointer"
                >
                  <i className="ri-close-line text-xl text-gray-500"></i>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Name</h4>
                  <p className="text-gray-900">{selectedFeedback.name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Email</h4>
                  <p className="text-gray-900">{selectedFeedback.email}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Type</h4>
                  <div className="flex items-center">
                    <i className={`${getTypeIcon(selectedFeedback.type)} text-blue-600 mr-2`}></i>
                    <span className="capitalize">{selectedFeedback.type}</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Rating</h4>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i
                        key={star}
                        className={`ri-star-${star <= selectedFeedback.rating ? 'fill' : 'line'} text-lg ${star <= selectedFeedback.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      ></i>
                    ))}
                    <span className="text-sm text-gray-500 ml-2">({selectedFeedback.rating}/5)</span>
                  </div>
                </div>
              </div>
              
              {selectedFeedback.courseId && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Course ID</h4>
                  <p className="text-gray-900">{selectedFeedback.courseId}</p>
                </div>
              )}
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">Subject</h4>
                <p className="text-gray-900">{selectedFeedback.subject}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">Message</h4>
                <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">{selectedFeedback.message}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Date</h4>
                  <p className="text-gray-900">{new Date(selectedFeedback.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Status</h4>
                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(selectedFeedback.status)}`}>
                    {selectedFeedback.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
              <button
                onClick={() => setSelectedFeedback(null)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium whitespace-nowrap cursor-pointer"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium whitespace-nowrap cursor-pointer">
                Mark as Resolved
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}