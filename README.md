# 🔍 Code Reviewer

An AI-powered code review tool that provides instant feedback on code quality, performance, and security using Google's Gemini AI And HuggingFace Model.

![Code Reviewer Interface](image.png)

## ✨ Features

- 🤖 **AI-Powered Reviews** - Get intelligent code analysis using Gemini 1.5 Flash or Qwen/Qwen2.5-Coder-32B-Instruct model
- 📝 **Monaco Editor** - Professional code editor with syntax highlighting
- 🎨 **Split-Screen View** - Write code on the left, see reviews on the right
- ⚡ **Real-time Feedback** - Instant code quality, performance, and security insights
- 🔄 **Auto-Retry Logic** - Handles API rate limits and errors gracefully
- 🌙 **Dark Theme** - Beautiful, eye-friendly dark interface

## 🚀 Tech Stack

### Frontend
- React 19
- Monaco Editor
- Tailwind CSS 4
- Vite
- Axios

### Backend
- Node.js
- Express.js
- Google Gemini AI API and huggingface Model
- dotenv

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API Key

### 1. Clone the repository
```bash
git clone https://github.com/SohailShaikh7860/Ai-Code-Review.git
cd CodeReviewer
```

### 2. Backend Setup
```bash
cd Backend
npm install
```

Create a `.env` file in the Backend directory:
```env
GEMINI_KEY=your_gemini_api_key_here
HUGGINGFACE_API=HF_your_api_key
PORT=3000
```

### 3. Frontend Setup
```bash
cd Frontend
npm install
```

Create a `.env` file in the Frontend directory:
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## 🎯 Usage

### Start the Backend Server
```bash
cd Backend
npm run dev
```
Server runs on `http://localhost:3000`

### Start the Frontend
```bash
cd Frontend
npm run dev
```
Frontend runs on `http://localhost:5173`

### Using the App
1. Open your browser to `http://localhost:5173`
2. Write or paste your code in the left editor
3. Click **"Review Code"** button
4. Get instant AI-powered feedback on the right panel

## 🏗️ Project Structure

```
CodeReviewer/
├── Backend/
│   ├── controllers/
│   │   └── ai.controllers.js
│   ├── routes/
│   │   └── ai.routes.js
│   ├── services/
│   │   └── ai.services.js
│   ├── app.js
│   ├── server.js
│   └── package.json
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── CodeEditor.jsx
│   │   ├── config/
│   │   │   └── axios.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

### POST `/ai/generate`
Generate code review

**Request Body:**
```json
{
  "code": "your code here"
}
```

**Response:**
```json
{
  "success": true,
  "review": "## Syntax Issues\n- ...",
  "timestamp": "2025-12-12T..."
}
```

## 🛡️ Error Handling

The app handles:
- ✅ 503 errors (Model overloaded) - Auto retry with exponential backoff
- ✅ 429 errors (Rate limit exceeded) - Retry after specified delay
- ✅ Network errors - User-friendly error messages
- ✅ Empty code submissions - Validation feedback

## 🎨 Features in Detail

### AI Review Analysis
The AI analyzes your code for:
1. **Syntax Errors** - Identifies syntax issues and provides fixes
2. **Code Quality** - Readability, naming conventions, structure
3. **Performance** - Inefficiencies and optimization opportunities
4. **Security** - Vulnerabilities and unsafe patterns


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 👤 Author

Sohail Shaikh

## 🙏 Acknowledgments

- Google Gemini AI for the powerful AI model
- Monaco Editor for the excellent code editor
- React and Vite for the smooth development experience