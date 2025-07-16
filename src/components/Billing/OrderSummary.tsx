import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
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

interface OrderSummaryProps {
  selectedPlan: PlanType | undefined;
  billingCycle: 'monthly' | 'yearly';
  getCurrentTotalAmountInPaise: () => number;
  termsAccepted: boolean;
  setTermsAccepted: (accepted: boolean) => void;
  checkout: () => void;
  loading: boolean;
  message: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  selectedPlan,
  billingCycle,
  getCurrentTotalAmountInPaise,
  termsAccepted,
  setTermsAccepted,
  checkout,
  loading,
  message,
}) => {
  const getPrice = (base: number): number => {
    return billingCycle === 'yearly' ? Math.floor(base * 0.8) : base;
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="w-full max-w-lg shadow-xl rounded-2xl bg-white">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Order Summary</CardTitle>
          <CardDescription>Review your subscription details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Selected Plan</span>
              <span className="font-medium">{selectedPlan?.Name_Of_Plan || '-'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Billing Cycle</span>
              <span className="font-medium">{billingCycle.charAt(0).toUpperCase() + billingCycle.slice(1)}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">
                {selectedPlan ? `${selectedPlan.Currency}${getPrice(selectedPlan.Price)}` : '0'}
              </span>
            </div>
            {billingCycle === 'yearly' && (
              <div className="flex items-center justify-between text-green-600">
                <span>Annual Discount</span>
                <span>-20%</span>
              </div>
            )}
            <Separator />
            <div className="flex items-center justify-between text-lg font-bold">
              <span>Total</span>
              <span>
                {selectedPlan
                  ? `${selectedPlan.Currency}${(getCurrentTotalAmountInPaise() / 100).toFixed(2)}`
                  : '0'}
              </span>
            </div>
            <div className="flex items-start space-x-2 pt-2">
              <Checkbox
                id="terms"
                className="mt-1"
                checked={termsAccepted}
                onCheckedChange={(checked) => setTermsAccepted(checked === true)}
              />
              <Label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the <a href="#" className="underline text-blue-600">Terms of Service</a> and{' '}
                <a href="#" className="underline text-blue-600">Privacy Policy</a>
              </Label>
            </div>
            <Button
              className="w-full rounded-lg font-semibold py-2 mt-2 bg-blue-600 hover:bg-blue-700 text-white transition-all"
              onClick={checkout}
              disabled={loading || !termsAccepted || !selectedPlan}
            >
              {loading ? 'Processing Payment...' : 'Complete Purchase'}
              <i className="ml-2 fas fa-lock"></i>
            </Button>
            {message && (
              <p
                className={`mt-4 text-sm font-medium ${
                  message.startsWith('ERROR') || message.includes('failed') ? 'text-red-600' : 'text-green-600'
                }`}
              >
                {message}
              </p>
            )}
            <div className="flex items-center justify-center space-x-4 text-gray-400 pt-4">
              <i className="text-xl fab fa-cc-visa"></i>
              <i className="text-xl fab fa-cc-mastercard"></i>
              <i className="text-xl fab fa-cc-amex"></i>
              <i className="text-xl fab fa-cc-paypal"></i>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSummary;