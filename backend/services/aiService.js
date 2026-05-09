const { GoogleGenerativeAI } = require('@google/generative-ai');
const Transaction = require('../models/Transaction');
const User = require('../models/User');

class AIService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  async analyzeSpending(userId, message) {
    try {
      // Get user's transactions
      const transactions = await Transaction.find({ userId }).sort({ date: -1 }).limit(100);

      // Calculate spending insights
      const insights = this.calculateInsights(transactions);

      // Create context for AI
      const context = `
Bạn là trợ lý AI tài chính thông minh cho ứng dụng Finova AI.
Người dùng hỏi: "${message}"

Dữ liệu chi tiêu của người dùng:
- Tổng thu nhập tháng này: ${insights.totalIncome}
- Tổng chi tiêu tháng này: ${insights.totalExpense}
- Số dư: ${insights.balance}
- Danh mục chi nhiều nhất: ${insights.topCategory}
- Chi tiêu trung bình ngày: ${insights.avgDailySpending}

Các giao dịch gần đây:
${insights.recentTransactions.map(t => `- ${t.category}: ${t.amount} VND (${t.date})`).join('\n')}

Hãy trả lời một cách hữu ích, chuyên nghiệp và bằng tiếng Việt.
Nếu người dùng hỏi về phân tích, hãy đưa ra insights cụ thể.
Nếu hỏi lời khuyên, hãy đưa ra lời khuyên thực tế dựa trên dữ liệu.
`;

      const result = await this.model.generateContent(context);
      return result.response.text();
    } catch (error) {
      console.error('AI Analysis Error:', error);
      return 'Xin lỗi, tôi không thể phân tích dữ liệu lúc này. Vui lòng thử lại sau.';
    }
  }

  calculateInsights(transactions) {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthlyTransactions = transactions.filter(t => {
      const date = new Date(t.date);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });

    const totalIncome = monthlyTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = monthlyTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpense;

    // Top spending category
    const categorySpending = {};
    monthlyTransactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        categorySpending[t.category] = (categorySpending[t.category] || 0) + t.amount;
      });

    const topCategory = Object.entries(categorySpending)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'Không có';

    const avgDailySpending = totalExpense / new Date(currentYear, currentMonth + 1, 0).getDate();

    const recentTransactions = monthlyTransactions
      .slice(0, 5)
      .map(t => ({
        category: t.category,
        amount: t.amount,
        date: new Date(t.date).toLocaleDateString('vi-VN')
      }));

    return {
      totalIncome,
      totalExpense,
      balance,
      topCategory,
      avgDailySpending: Math.round(avgDailySpending),
      recentTransactions
    };
  }

  async generateFinancialAdvice(userId) {
    try {
      const transactions = await Transaction.find({ userId }).sort({ date: -1 }).limit(50);
      const insights = this.calculateInsights(transactions);

      const context = `
Dựa trên dữ liệu chi tiêu của người dùng, hãy tạo lời khuyên tài chính:

Dữ liệu:
- Tổng thu nhập: ${insights.totalIncome}
- Tổng chi tiêu: ${insights.totalExpense}
- Số dư: ${insights.balance}
- Danh mục chi nhiều: ${insights.topCategory}

Hãy đưa ra 3-5 lời khuyên cụ thể và thực tế bằng tiếng Việt.
`;

      const result = await this.model.generateContent(context);
      return result.response.text();
    } catch (error) {
      console.error('AI Advice Error:', error);
      return 'Không thể tạo lời khuyên lúc này.';
    }
  }
}

module.exports = new AIService();