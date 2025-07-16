// hooks/useRazorpayPayment.ts
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import type { Course } from '@/components/LearningPage/learning.d'; // Adjust path as needed

// Extend Window interface for Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}

// Environment variables (ensure these are correctly set in your .env file)
const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID; // Use VITE_ prefix for Vite
// Corrected: BACKEND_URL should point to your backend's base URL, not just the port
const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_PORT; // e.g., http://localhost:8000 or https://api.yourdomain.com

// Utility function to load Razorpay script
const loadRazorpayScript = (src: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.error("Failed to load Razorpay SDK.");
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

type UserInfo = {
  name: string;
  email: string;
  contact: string;
  // It's highly recommended to include a unique user identifier, e.g., userId: string;
  userId: string;
};

export const useRazorpayPayment = (course: Course, userInfo: UserInfo) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isKeyIdSet, setIsKeyIdSet] = useState(true);

  useEffect(() => {
    if (!RAZORPAY_KEY_ID || RAZORPAY_KEY_ID === "YOUR_RAZORPAY_KEY_ID") {
      setError("ERROR: Razorpay Key ID is not configured. Please set VITE_RAZORPAY_KEY_ID in your .env file.");
      setIsKeyIdSet(false);
    } else {
      setIsKeyIdSet(true);
      setError(null);
    }

    if (!BACKEND_BASE_URL) {
      setError("ERROR: Backend URL is not configured. Please set VITE_BACKEND_URL in your .env file.");
    }
  }, []);

  const initiatePayment = useCallback(async (termsAccepted: boolean) => {
    if (!isKeyIdSet || !BACKEND_BASE_URL) { // Check backend URL as well
      toast.error(error || "Configuration error: Razorpay Key ID or Backend URL is missing.");
      return;
    }

    if (!termsAccepted) {
      toast.error('Please accept the Terms of Service and Privacy Policy.');
      return;
    }

    // Assuming course.price is in your base currency unit (e.g., INR)
    // Razorpay expects amount in the smallest currency unit (paise for INR)
    const totalAmountInPaise = Math.max(Math.round(course.price * 100), 1);

    if (totalAmountInPaise <= 0) {
      toast.error('Invalid amount for purchase. Please contact support.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Load Razorpay script only if not already loaded
      if (!(window as any).Razorpay) {
        const scriptLoaded = await loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js');
        if (!scriptLoaded) {
          toast.error("Failed to load Razorpay SDK. Please check your internet connection.");
          setLoading(false);
          return;
        }
      }

      // Generate a unique receipt ID
      const receiptId = `receipt_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;

      // 1. Create order on your backend (e.g., /create-razorpay-order)
      // This endpoint is responsible for creating a Razorpay order ID
      const orderRes = await axios.post(`${BACKEND_BASE_URL}/create-order`, {
        amount: totalAmountInPaise,
        currency: "INR",
        receipt: receiptId,
        // Pass any other relevant info to create the order record on backend if needed
        courseId: course.CourseID,
        userEmail: userInfo.email
      });

      if (orderRes.status !== 200 || !orderRes.data.id) {
        throw new Error("Failed to create order on backend. Please try again.");
      }

      const { id: razorpayOrderId } = orderRes.data;

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: totalAmountInPaise,
        currency: "INR",
        name: "AI-Powered Learning Platform",
        description: `Enrollment for: ${course.title} by ${course?.Instructor?.userName}`,
        image: "https://placehold.co/100x100/000000/FFFFFF?text=AI", // Replace with your actual logo
        order_id: razorpayOrderId,
        prefill: {
          name: userInfo.name || "AJ",
          email: userInfo.email || "JDSL.gmail.com",
          contact: userInfo.contact || "7579733133",
        },
        notes: {
          course_id: course.CourseID,
          user_id: userInfo.userId, // Pass user ID for backend records
          instructor_email: course.Instructor?.userEmail, // Ensure this path is correct
        },
        theme: {
          color: "#3399cc",
        },
        handler: async (razorpayResponse: any) => { // Renamed 'response' to 'razorpayResponse' for clarity
          toast.success("Payment successful! Verifying payment with server...");
          try {
            // 2. Verify payment on your backend (e.g., /verify-razorpay-payment)
            // This endpoint will perform the signature verification.
            const verifyRes = await axios.post(`${BACKEND_BASE_URL}/verify-payment`, {
              razorpay_payment_id: razorpayResponse.razorpay_payment_id,
              razorpay_order_id: razorpayResponse.razorpay_order_id,
              razorpay_signature: razorpayResponse.razorpay_signature,
              courseId: course.CourseID, // Pass course ID for verification logic
              userEmail: userInfo.email,
              amount: totalAmountInPaise / 100, // Pass amount in INR for the payment record
              currency: "INR",
            });

            if (verifyRes.data.status === "success") {
              toast.success(verifyRes.data.message || "Payment verified successfully! You are now enrolled.");

              // 3. Inform /PaymentCourse endpoint to finalize database updates
              // This request is sent *only after* verification is successful.
              const finalEnrollmentRes = await axios.post(`${BACKEND_BASE_URL}/PaymentCourse`, {
                razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                razorpay_order_id: razorpayResponse.razorpay_order_id,
                razorpay_signature: razorpayResponse.razorpay_signature,
                courseId: course.CourseID,
                userEmail: userInfo.email,
                instructorEmail: course.Instructor?.userEmail, // Ensure instructor email is available
                amount: totalAmountInPaise / 100, // Pass amount in INR for the payment record
                currency: "INR",
              });

              if (finalEnrollmentRes.data.status === "success" || finalEnrollmentRes.data.status === "already_processed") {
                  toast.success(finalEnrollmentRes.data.message || "Enrollment finalized!");
                  // You might want to trigger a state update or redirect here
              } else {
                  setError("Enrollment finalization failed. Please contact support.");
                  toast.error(finalEnrollmentRes.data.message || "Enrollment finalization failed. Please contact support.");
              }

            } else {
              setError("Payment verification failed. Please contact support.");
              toast.error("Payment verification failed. Please contact support.");
            }
          } catch (err: any) {
            setError("Failed to verify/finalize payment with server. Please contact support.");
            toast.error("Failed to verify/finalize payment with server: " + (err.response?.data?.detail || err.message));
          } finally {
            setLoading(false);
          }
        },
      };

      const paymentGateway = new (window as any).Razorpay(options);
      paymentGateway.open();

      // Handle payment failure from Razorpay's end (e.g., user cancels, technical issue)
      paymentGateway.on('payment.failed', function (errorResponse: any) {
        setError(`Payment failed! Reason: ${errorResponse.error.description || 'Unknown error'}`);
        toast.error(`Payment failed! Reason: ${errorResponse.error.description || 'Unknown error'}. Please try again.`);
        setLoading(false);
        // You might want to send this failure to your backend as well, but it's optional
      });

      toast.success("Initiating payment... Please complete the Razorpay process.");

    } catch (err: any) {
      setError("An error occurred during checkout. Please try again.");
      toast.error("An error occurred during checkout. Please try again: " + (err.response?.data?.detail || err.message));
      setLoading(false);
    }
  }, [course, userInfo, isKeyIdSet, error, BACKEND_BASE_URL]); // Add BACKEND_BASE_URL to dependencies

  return { initiatePayment, loading, error, isKeyIdSet };
};