# Finova AI - Personal Finance Assistant

🚀 **AI-powered Personal Finance Management System**

Finova AI là ứng dụng quản lý tài chính cá nhân thông minh tích hợp trí tuệ nhân tạo, giúp người dùng theo dõi thu chi, phân tích chi tiêu và nhận lời khuyên tài chính cá nhân hóa.

## ✨ Tính năng nổi bật

### 🤖 AI Chatbot
- Trò chuyện với AI để phân tích chi tiêu
- Nhận lời khuyên tài chính cá nhân hóa
- Hỏi đáp về quản lý tài chính

### 📊 AI Insights
- Phân tích tự động chi tiêu
- Cảnh báo bất thường
- Dự đoán xu hướng tài chính

### 📱 OCR Hóa đơn
- Upload ảnh hóa đơn tự động đọc text
- Tự động phân loại và nhập liệu
- Hỗ trợ tiếng Việt

### 📈 Dashboard chuyên nghiệp
- Giao diện fintech dark mode
- Biểu đồ tương tác
- Theo dõi realtime

### 📱 Mobile App
- Build Android & iOS với Capacitor
- Responsive design
- Bottom navigation

## 🛠️ Tech Stack

### Frontend
- **React 19** + **Vite**
- **TailwindCSS** - Dark mode fintech
- **Framer Motion** - Smooth animations
- **Recharts** - Interactive charts
- **Capacitor** - Mobile development

### Backend
- **Node.js** + **Express**
- **MongoDB** - Database
- **JWT** - Authentication
- **Socket.io** - Realtime chat

### AI & ML
- **Google Generative AI** - Chatbot
- **TensorFlow.js** - Predictions
- **Tesseract.js** - OCR

## 🚀 Cài đặt và chạy

### Prerequisites
- Node.js 18+
- MongoDB
- Git

### 1. Clone repository
```bash
git clone https://github.com/yourusername/finova-ai.git
cd finova-ai
```

### 2. Backend Setup
```bash
cd backend
npm install

# Tạo file .env
cp .env.example .env
# Thêm các biến môi trường:
# MONGO_URI=mongodb://localhost:27017/finova_ai
# JWT_SECRET=your_jwt_secret
# GOOGLE_AI_API_KEY=your_google_ai_key
# PORT=5000

npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend/expense-tracker
npm install
npm run dev
```

### 4. Mobile Build (Optional)
```bash
# Android
npx cap add android
npx cap run android

# iOS
npx cap add ios
npx cap run ios
```

## 🔧 Environment Variables

### Backend (.env)
```env
MONGO_URI=mongodb://localhost:27017/finova_ai
JWT_SECRET=your_super_secret_jwt_key
GOOGLE_AI_API_KEY=your_google_generative_ai_key
PORT=5000
CLIENT_URL=http://localhost:5173
```

## 📱 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Đăng ký
- `POST /api/v1/auth/login` - Đăng nhập

### Transactions
- `GET /api/v1/income` - Lấy danh sách thu nhập
- `POST /api/v1/income` - Thêm thu nhập
- `GET /api/v1/expense` - Lấy danh sách chi tiêu
- `POST /api/v1/expense` - Thêm chi tiêu

### AI Features
- `POST /api/ai/chat` - Chat với AI
- `GET /api/ai/insights/:userId` - Lấy insights
- `POST /api/ocr/process-receipt` - Xử lý hóa đơn OCR

## 🎨 Design System

### Colors
- **Background**: #0F172A
- **Card**: #1E293B
- **Primary**: #8B5CF6
- **Accent**: #06B6D4

### Typography
- **Font**: Poppins
- **Dark Mode**: Default
- **Glassmorphism**: Subtle effects

## 🚀 Deploy

### Frontend (Vercel)
```bash
npm run build
# Upload dist/ folder to Vercel
```

### Backend (Render)
```bash
# Deploy to Render with environment variables
```

### Database (MongoDB Atlas)
- Tạo cluster trên MongoDB Atlas
- Cập nhật MONGO_URI trong production

## 📄 License

MIT License - Xem file LICENSE để biết thêm chi tiết.

## 🤝 Contributing

Chào mừng mọi đóng góp! Vui lòng tạo issue hoặc pull request.

## 📞 Liên hệ

- Email: your.email@example.com
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

---

Made with ❤️ by [Your Name]