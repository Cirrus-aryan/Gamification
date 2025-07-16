import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { Button } from '@/components/ui/button';

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

interface PlanSelectionProps {
  plans: PlanType[];
  selectedPlanId: string;
  setSelectedPlanId: (id: string) => void;
  billingCycle: 'monthly' | 'yearly';
  setBillingCycle: (cycle: 'monthly' | 'yearly') => void;
  getPrice: (base: number) => number;
}

const PlanSelection: React.FC<PlanSelectionProps> = ({
  plans,
  selectedPlanId,
  setSelectedPlanId,
  billingCycle,
  getPrice,
}) => {
  useEffect(()=>{console.log(plans)},[plans])
  return (
    <div className="grid grid-cols-1 gap-8 mb-16 md:grid-cols-3">
      {plans.slice(0,3)?.map((plan, idx) => (
        <Card
          key={plan?._id}
          className={`relative shadow-lg rounded-2xl transition-all duration-200 border-2 ${
            selectedPlanId === plan?._id
              ? 'border-blue-600 ring-2 ring-blue-200 scale-105'
              : 'border-gray-200 hover:border-blue-400 hover:scale-105'
          } bg-white`}
        >
          {idx === 1 && (
            <div className="absolute top-0 right-0 px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded-bl-lg rounded-tr-lg shadow">
              Most Popular
            </div>
          )}
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{plan?.Name_Of_Plan}</CardTitle>
            <CardDescription className="mb-2">
              {plan?.Name_Of_Plan === 'Free'
                ? 'Basic features for individuals'
                : plan?.Name_Of_Plan === 'Pro'
                ? 'Perfect for content creators'
                : 'For large organizations'}
            </CardDescription>
            <div className="mt-4 flex items-end space-x-2">
              <span className="text-4xl font-extrabold text-blue-700">
                {plan?.Currency}
                {getPrice(plan?.Price)}
              </span>
              <span className="text-gray-500 text-base">
                /{billingCycle === 'monthly' ? 'month' : 'mo, billed yearly'}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-wrap space-y-2 mt-4 mb-6"> {/* Changed to flex-wrap for better rendering of features */}
              {plan?.Features?.map((feature, i) => (
                <li className="flex items-center m-1 p-1 font-semibold text-[0.7vw] border-1 rounded-2xl" key={i}>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="text-xs text-gray-500 space-y-1">
              <div>
                Audio Voice Time Limit: <span className="font-medium">{plan?.Audio_Voice_Time_Limit}</span>
              </div>
              <div>
                Duration (days): <span className="font-medium">{plan?.Duration_Days}</span>
              </div>
              <div>
                MCQs per Course: <span className="font-medium">{plan?.Mcqs_per_Courses}</span>
              </div>
              <div>
                No. of Games: <span className="font-medium">{plan?.No_Of_Games}</span>
              </div>
              <div>
                No. of File Updates: <span className="font-medium">{plan?.No_of_Files_updates}</span>
              </div>
              <div>
                Number of Courses: <span className="font-medium">{plan?.Number_Of_courses}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant={selectedPlanId === plan?._id ? 'default' : 'outline'}
              className={`w-full rounded-lg font-semibold py-2 mt-2 transition-all ${
                selectedPlanId === plan?._id
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'border-blue-600 text-blue-600 hover:bg-blue-50'
              }`}
              onClick={() => setSelectedPlanId(plan?._id)}
            >
              {selectedPlanId === plan?._id ? 'Current Plan' : 'Select Plan'}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PlanSelection;