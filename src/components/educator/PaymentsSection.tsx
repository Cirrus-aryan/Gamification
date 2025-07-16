'use client';

import { useState } from 'react';
import type{ TeacherInfo } from './instructorTypes';

interface PaymentsSectionProps {
  instructorData: TeacherInfo;
}

export default function PaymentsSection({ instructorData }: PaymentsSectionProps) {
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const allPayments = instructorData.coursesTaught?.flatMap(course => 
    course.payments.map(payment => ({
      ...payment,
      courseName: course.title,
      courseId: course._id
    }))
  ) || [];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const totalRevenue = allPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const totalTransactions = allPayments.length;
  const completedPayments = allPayments.filter(payment => payment.payment_status === 'completed').length;
  const averagePayment = totalRevenue / totalTransactions || 0;

  return (
    <div className="space-y-6">
      {/* Payment Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 flex items-center justify-center">
                <i className="ri-money-dollar-circle-line text-white text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Transactions</p>
              <p className="text-3xl font-bold text-gray-900">{totalTransactions}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 flex items-center justify-center">
                <i className="ri-receipt-line text-white text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Success Rate</p>
              <p className="text-3xl font-bold text-gray-900">{Math.round((completedPayments/totalTransactions) * 100)}%</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 flex items-center justify-center">
                <i className="ri-check-line text-white text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Average Payment</p>
              <p className="text-3xl font-bold text-gray-900">${Math.round(averagePayment)}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 flex items-center justify-center">
                <i className="ri-calculator-line text-white text-xl"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-6">Recent Payments</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Payment ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Student</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Course</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Payment Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {allPayments.map((payment) => (
                  <tr key={payment._id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900 text-sm">{payment.razorpay_payment_id}</div>
                      <div className="text-xs text-gray-500">{payment._id}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{payment.user_email}</div>
                      <div className="text-sm text-gray-500">ID: {payment.user_id}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{payment.courseName}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">${payment.amount}</div>
                      <div className="text-sm text-gray-500">{payment.currency}</div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        payment.payment_status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : payment.payment_status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {payment.payment_status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {formatDate(payment.paid_at)}
                    </td>
                    <td className="py-4 px-4">
                      <button 
                        onClick={() => setSelectedPayment(selectedPayment === payment._id ? null : payment._id)}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        <div className="w-4 h-4 flex items-center justify-center">
                          <i className="ri-eye-line"></i>
                        </div>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Payment Details Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Payment Details</h3>
              <button 
                onClick={() => setSelectedPayment(null)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className="ri-close-line text-xl"></i>
                </div>
              </button>
            </div>
            <div className="p-6">
              {(() => {
                const payment = allPayments.find(p => p._id === selectedPayment);
                if (!payment) return null;
                
                return (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Payment ID</label>
                        <p className="text-sm text-gray-900">{payment._id}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Razorpay Payment ID</label>
                        <p className="text-sm text-gray-900">{payment.razorpay_payment_id}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Order ID</label>
                        <p className="text-sm text-gray-900">{payment.razorpay_order_id}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Student Email</label>
                        <p className="text-sm text-gray-900">{payment.user_email}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                        <p className="text-sm text-gray-900">{payment.courseName}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                        <p className="text-sm text-gray-900">${payment.amount} {payment.currency}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          payment.payment_status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : payment.payment_status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {payment.payment_status}
                        </span>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Payment Date</label>
                        <p className="text-sm text-gray-900">{formatDate(payment.paid_at)}</p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}