import React from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import AIInsights from '../../components/AIInsights';
import Chatbot from '../../ai/Chatbot';
import OCRUpload from '../../components/OCRUpload';

const AI = () => {
  const handleOCRSuccess = (data) => {
    console.log('OCR Result:', data);
    // Here you could automatically create an expense transaction
    // or show a form to confirm the data
  };

  return (
    <DashboardLayout activeMenu="AI">
      <div className="my-5 mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-200 mb-2">Finova AI Assistant</h1>
          <p className="text-gray-400">Trợ lý AI thông minh cho quản lý tài chính cá nhân</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <AIInsights />
            <OCRUpload onSuccess={handleOCRSuccess} />
          </div>

          <div>
            <Chatbot />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AI;