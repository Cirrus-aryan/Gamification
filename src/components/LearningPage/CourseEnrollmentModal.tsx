import { useState, useEffect } from 'react';
import type { Course } from './learning.d'; // Adjust path if necessary
import { Button } from '../../components/ui/button'; // Adjust path to your Button component
import { useRazorpayPayment } from '../../hooks/useRazorpayPayment'; // Adjust path to your new hook

// Import Material-UI Icon for close button
import CloseIcon from '@mui/icons-material/Close';

type CourseEnrollmentModalProps = {
  course: Course;
  onClose: () => void;
};

export default function CourseEnrollmentModal({ course, onClose }: CourseEnrollmentModalProps) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userContact, setUserContact] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [contactError, setContactError] = useState('');

  // Retrieve userId from localStorage on component mount
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    setUserId(localStorage.getItem('userId'));
  }, []);

  const validateForm = () => {
    let isValid = true;
    setNameError('');
    setEmailError('');
    setContactError('');

    if (!userName.trim()) {
      setNameError('Name is required.');
      isValid = false;
    }
    if (!userEmail.trim()) {
      setEmailError('Email is required.');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(userEmail)) {
      setEmailError('Invalid email format.');
      isValid = false;
    }
    if (!userContact.trim()) {
      setContactError('Contact number is required.');
      isValid = false;
    } else if (!/^\d{10}$/.test(userContact)) { // Simple 10-digit phone number validation
      setContactError('Invalid contact number (10 digits required).');
      isValid = false;
    }
    return isValid;
  };

  const userInfo = {
    name: userName,
    email: userEmail,
    contact: userContact,
    userId: userId || '' // Use retrieved userId, default to empty string if null
  };

  const { initiatePayment, loading, error, isKeyIdSet } = useRazorpayPayment(course, userInfo);

  const handleProceedToEnrollment = () => {
    if (!termsAccepted) {
      alert('Please accept the Terms of Service and Privacy Policy.'); // Using alert for simplicity, consider a custom modal
      return;
    }
    if (validateForm()) {
      initiatePayment(termsAccepted);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Enroll in Course</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600"
            aria-label="Close modal"
          >
            <CloseIcon className="text-xl" />
          </button>
        </div>

        <div className="text-center mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h4>
          <div className="text-3xl font-bold text-blue-600 mb-2">{course.currency} {course.price}</div>
          <p className="text-gray-600">One-time payment, lifetime access</p>
        </div>

        {/* User Information Fields */}
        <div className="mb-4 space-y-4">
          <div>
            <label htmlFor="user-name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input
              type="text"
              id="user-name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your full name"
            />
            {nameError && <p className="mt-1 text-sm text-red-600">{nameError}</p>}
          </div>
          <div>
            <label htmlFor="user-email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
            <input
              type="email"
              id="user-email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your email address"
            />
            {emailError && <p className="mt-1 text-sm text-red-600">{emailError}</p>}
          </div>
          <div>
            <label htmlFor="user-contact" className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
            <input
              type="tel" // Use type="tel" for phone numbers
              id="user-contact"
              value={userContact}
              onChange={(e) => setUserContact(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your 10-digit contact number"
            />
            {contactError && <p className="mt-1 text-sm text-red-600">{contactError}</p>}
          </div>
        </div>

        {/* Terms and Conditions Checkbox */}
        <div className="mb-4 flex items-center justify-center">
          <input
            type="checkbox"
            id="terms-checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="terms-checkbox" className="ml-2 text-sm text-gray-700">
            I agree to the{' '}
            <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
          </label>
        </div>

        {error && <p className="text-red-600 text-center text-sm mb-4">{error}</p>}

        <div className='grid grid-cols-1 gap-4'>
          <Button
            onClick={handleProceedToEnrollment}
            disabled={Boolean(loading || !isKeyIdSet || !termsAccepted || !userName.trim() || !userEmail.trim() || !userContact.trim() || nameError || emailError || contactError)}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-center hover:bg-blue-700 transition-colors"
          >
            {loading ? 'Processing...' : 'Proceed to Enrollment'}
          </Button>

          <Button onClick={onClose} disabled={loading}>Close</Button>
        </div>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">30-day money-back guarantee</p>
        </div>
      </div>
    </div>
  );
}
