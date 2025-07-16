import React from 'react';
import { useBillingLogic } from '@/hooks/useBillingLogic'; // Adjust path as needed
import PlanSelection from './PlanSelection'; // Adjust path as needed
import OrderSummary from './OrderSummary'; // Adjust path as needed
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';


const Billing: React.FC = () => {
  const {
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
  } = useBillingLogic();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <main className="container px-4 py-12 mx-auto max-w-7xl min-h-[calc(100vh-4rem)]">
        <div className="max-w-2xl mx-auto mb-12 text-center">
          <h2 className="mb-2 text-4xl font-extrabold text-gray-900">Choose Your Premium Plan</h2>
          <p className="mb-8 text-lg text-gray-600">
            Unlock advanced features and create better learning experiences.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-blue-700' : 'text-gray-500'}`}>
              Monthly
            </span>
            <Switch
              checked={billingCycle === 'yearly'}
              onCheckedChange={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="cursor-pointer"
            />
            <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-blue-700' : 'text-gray-500'}`}>
              Yearly
              <Badge className="ml-2 bg-green-100 text-green-800">Save 20%</Badge>
            </span>
          </div>
        </div>

        <PlanSelection
          plans={plans}
          selectedPlanId={selectedPlanId}
          setSelectedPlanId={setSelectedPlanId}
          billingCycle={billingCycle}
          setBillingCycle={setBillingCycle}
          getPrice={getPrice}
        />

        <OrderSummary
          selectedPlan={getSelectedPlan()}
          billingCycle={billingCycle}
          getCurrentTotalAmountInPaise={getCurrentTotalAmountInPaise}
          termsAccepted={termsAccepted}
          setTermsAccepted={setTermsAccepted}
          checkout={checkout}
          loading={loading}
          message={message}
        />
      </main>
    </div>
  );
};

export default Billing;