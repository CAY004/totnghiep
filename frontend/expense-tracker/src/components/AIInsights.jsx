import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, AlertTriangle, Target, Brain } from 'lucide-react';
import axios from 'axios';

const AIInsights = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      // This would call the AI insights API
      const response = await axios.get('/api/ai/insights/user123');
      setInsights(response.data.insights || []);
    } catch (error) {
      // Mock data for demo
      setInsights([
        {
          type: 'warning',
          title: 'Chi tiêu ăn uống tăng 28%',
          description: 'So với tháng trước, bạn đã chi nhiều hơn cho ăn uống.',
          icon: TrendingUp,
          color: 'text-red-400'
        },
        {
          type: 'success',
          title: 'Tiết kiệm tốt trong tuần qua',
          description: 'Bạn đã giảm 15% chi tiêu so với trung bình.',
          icon: Target,
          color: 'text-green-400'
        },
        {
          type: 'info',
          title: 'Dự đoán chi tiêu tháng sau',
          description: 'Dựa trên xu hướng, tháng sau có thể chi 8.5 triệu.',
          icon: Brain,
          color: 'text-blue-400'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getInsightIcon = (type) => {
    switch (type) {
      case 'warning':
        return AlertTriangle;
      case 'success':
        return TrendingDown;
      case 'info':
        return Brain;
      default:
        return Target;
    }
  };

  if (loading) {
    return (
      <div className="card">
        <div className="animate-pulse">
          <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-slate-700 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-6 h-6 text-accent" />
        <h3 className="text-lg font-semibold text-gray-200">AI Insights</h3>
      </div>

      {insights.map((insight, index) => {
        const IconComponent = insight.icon || getInsightIcon(insight.type);

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card hover:scale-105 transition-transform cursor-pointer"
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg bg-slate-800 ${insight.color}`}>
                <IconComponent className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-200 mb-1">{insight.title}</h4>
                <p className="text-sm text-gray-400">{insight.description}</p>
              </div>
            </div>
          </motion.div>
        );
      })}

      {insights.length === 0 && (
        <div className="card text-center py-8">
          <Brain className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">Chưa có insights nào. Tiếp tục sử dụng app để AI học hỏi về thói quen chi tiêu của bạn.</p>
        </div>
      )}
    </div>
  );
};

export default AIInsights;