import { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { DataContext } from '@/Context/Auth'; // Assuming this path is correct

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;
const BACKEND_URL = import.meta.env.VITE_BACKEND_PORT;

type PlanType = {
  Audio_Voice_Time_Limit: number;
  Currency: string;
  Duration_Days: number;
  Features: string[];
  Mcqs_per_Courses: number;
  Name_Of_Plan: string;
  No_Of_Games: string;
  No_of_Files_updates: number;
  Number_Of_courses: number;
  Price: number;
  _id: string;
};

// Function to load Razorpay script dynamically
const loadRazorpayScript = (src: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const useBillingLogic = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlanId, setSelectedPlanId] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { data } = useContext(DataContext);
  const [plans, setPlans] = useState<PlanType[]>([]);

  // Effect to check Razorpay Key ID on component mount
  useEffect(() => {
    if (RAZORPAY_KEY_ID === 'YOUR_RAZORPAY_KEY_ID') {
      setMessage("ERROR: Please replace 'YOUR_RAZORPAY_KEY_ID' with your actual Razorpay Key ID.");
    }
  }, []);

  // Effect to fetch plans from the backend
  useEffect(() => {
    async function getPlans() {
      try {
        const res = await axios.get(`${BACKEND_URL}/plans`);
        setPlans(res.data);
        if (res.data.length > 0) {
          setSelectedPlanId(res.data[0]._id); // Select the first plan by default
        }
      } catch (e) {
        toast.error('Failed to fetch plans');
      }
    }
    getPlans();
  }, []);

  // Memoized function to get the currently selected plan
  const getSelectedPlan = useCallback(
    () => plans.find((p) => p._id === selectedPlanId),
    [plans, selectedPlanId]
  );

  // Function to calculate price based on billing cycle
  const getPrice = useCallback(
    (base: number): number => {
      return billingCycle === 'yearly' ? Math.floor(base * 0.8) : base;
    },
    [billingCycle]
  );

  // Function to get total amount in paise for Razorpay
  const getCurrentTotalAmountInPaise = useCallback(
    (): number => {
      const plan = getSelectedPlan();
      if (!plan) return 0;
      return getPrice(plan.Price) * 100;
    },
    [getSelectedPlan, getPrice]
  );

  // Checkout logic
  const checkout = useCallback(async () => {
    if (!termsAccepted) {
      toast.error('Please accept the Terms of Service and Privacy Policy.');
      return;
    }

    const plan = getSelectedPlan();
    if (!plan) {
      toast.error('No plan selected.');
      return;
    }

    const totalAmountInPaise = getCurrentTotalAmountInPaise();
    if (totalAmountInPaise <= 0) {
      toast.error('Invalid amount for purchase. Please select a valid plan or contact support.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      if (!(window as any).Razorpay) {
        const scriptLoaded = await loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js');
        if (!scriptLoaded) {
          toast.error('Failed to load Razorpay SDK. Please check your internet connection.');
          setLoading(false);
          return;
        }
      }

      const orderId = crypto.randomUUID().replace(/-/g, '');

      // Create order on backend
      const res = await axios.post(`${BACKEND_URL}/create-orders`,{
        amount: totalAmountInPaise,
        currency: plan.Currency || 'INR',
        receipt: `receipt_${orderId}`,
      });
      console.log(res)
      if (res.status !== 200) {
        throw new Error('Failed to create order on backend. Please try again.');
      }

      const { id: razorpayOrderId } = res.data;

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: totalAmountInPaise,
        currency: plan.Currency || 'INR',
        name: 'AI-Powered Learning Platform',
        description: `${plan.Name_Of_Plan} Plan (${
          billingCycle.charAt(0).toUpperCase() + billingCycle.slice(1)
        })`,
        image: 'https://placehold.co/100x100/000000/FFFFFF?text=AI',
        order_id: razorpayOrderId,
        prefill: {
          name: data?.userName || 'User',
          email: data?.userEmail || 'user@example.com',
          contact: '1234567890', // Consider making this dynamic or optional
        },
        notes: {
          plan: plan.Name_Of_Plan,
          billingCycle: billingCycle,
          internal_order_id: orderId,
        },
        theme: { color: '#3399cc' },
        handler: async (response: any) => {
          toast.success('Payment successful! Verifying payment with server...');
          try {
            const formdata = new FormData();
            formdata.append('Order_ID', orderId);
            formdata.append('Plan', plan.Name_Of_Plan);
            formdata.append('Billing_Cycle', billingCycle);
            formdata.append('Amount', String(totalAmountInPaise / 100 + ' ' + (plan.Currency || 'INR')));
            formdata.append('Razorpay_Payment_ID', response.razorpay_payment_id);
            formdata.append('Razorpay_Order_ID', response.razorpay_order_id);
            formdata.append('Razorpay_Signature', response.razorpay_signature);
            formdata.append('User_Email', data?.userEmail || 'unknown');
            formdata.append('User_Name', data?.userName || 'unknown');
            formdata.append('User_Profile_Picture', data?.userProfilePicture || 'unknown');
            formdata.append('User_Role', 'Instructor'); // Assuming a fixed role for now

            // --- START DEBUGGING LOGS ---
            console.log("--- DEBUGGING FormData for /verify-payment ---");
            console.log("Plan selected:", plan);
            console.log("Billing Cycle:", billingCycle);
            console.log("Total Amount (Paise):", totalAmountInPaise);
            console.log("Razorpay Response object:", response);
            console.log("DataContext user data:", data);

            console.log("FormData contents before sending:");
            for (let pair of formdata.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }
            console.log("--- END DEBUGGING FormData ---");
            // --- END DEBUGGING LOGS ---
            console.log({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              course_id: orderId,
              plan:plan,
              billingCycle:billingCycle
              // Pass course ID for verification logic
              // Pass any other data needed for backend verification and enrollment
              // e.g., user_id: userInfo.userId,
            });
            const verifyRes = await axios.post(`${BACKEND_URL}/verify-payment`, {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              course_id: orderId,
              plan:plan,
              billingCycle:billingCycle
              // Pass course ID for verification logic
              // Pass any other data needed for backend verification and enrollment
              // e.g., user_id: userInfo.userId,
            });

            if (verifyRes.data.status === 'success') {
              
              const res=await axios.post(`${BACKEND_URL}/PaymentPlans`,formdata)
              console.log(res)
              toast.success(verifyRes.data.message || 'Payment verified successfully! Your plan is now active.');
              // Potentially update user context or redirect after successful payment
            } else {
              toast.error('Payment verification failed. Please contact support.');
            }
          } catch (err: any) {
            console.error('Payment verification error in handler:', err); // Added "in handler" for clarity
            toast.error(
              'Failed to verify payment with server. Please contact support.' +
                (err.response?.data?.detail || err.message)
            );
          }
        },
      };
      const paymentGateway = new (window as any).Razorpay(options);
      paymentGateway.open();
      paymentGateway.on('payment.failed', function (response: any) {
        toast.error(`Payment failed! Reason: ${response.error.description || 'Unknown error'}. Please try again.`);
      });
      toast.success(
        'We will call you within 30 mins when we schedule your mention things our accuracy is 99.99% otherwise we will give your money back with 5% interest'
      ); // This toast might be better placed after successful payment handler
    } catch (error: any) {
      console.error('Checkout error (main try-catch):', error); // Added "main try-catch" for clarity
      toast.error(
        'An error occurred during checkout. Please try again.' + (error.response?.data?.detail || error.message)
      );
    } finally {
      setLoading(false);
    }
  }, [
    termsAccepted,
    getSelectedPlan,
    getCurrentTotalAmountInPaise,
    billingCycle,
    data?.userName,
    data?.userEmail,
    data?.userProfilePicture,
  ]);

  return {
    billingCycle,
    setBillingCycle,
    selectedPlanId,
    setSelectedPlanId,
    loading,
    message,
    termsAccepted,
    setTermsAccepted,
    plans,
    getSelectedPlan,
    getPrice,
    getCurrentTotalAmountInPaise,
    checkout,
    // Expose `PlanType` if it needs to be used by consuming components for type hinting
    // PlanType, // Uncomment if you need this type exposed for external use
  };
};