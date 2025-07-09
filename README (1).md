
# 📚 ExaMind – Personalized AI Mentor for Competitive Exams

ExaMind is a full-stack AI-powered platform designed to help students prepare for competitive exams like **JEE**, **NEET**, and **UPSC**. It provides smart quiz generation, personalized performance tracking, and an AI chatbot for instant mentorship.

---

## 🌟 Features

- ✅ AI-powered Quiz Generator (JEE PYQs)
- ✅ Topic-wise filter for past year questions
- ✅ Real-time performance tracking
- ✅ Secure user authentication (Login/Signup)
- ✅ Nexa-AI Chatbot (Gemini / Llama integration)
- ✅ Interactive UI for Dashboard, Login, Chatbot
- ✅ Flask REST API + React/HTML Frontend

---

## 🧱 Tech Stack

| Layer         | Technology                      |
|---------------|----------------------------------|
| Frontend      | React.js, HTML/CSS               |
| Backend       | Flask (Python)                   |
| AI Model      | Gemini Pro / LLaMA 3             |
| Database      | CSV (Pandas), LocalStorage       |
| Deployment    | Vercel (Frontend) + Render (Backend) |
| Styling       | Custom CSS, Tailwind-Like Classes|

---

## 📁 Folder Structure

```bash
/jee-tutor
│
├── /frontend             # React + HTML
│   ├── /src
│   ├── /components       # Quiz, TopicFilter, etc.
│   ├── App.js
│   ├── index.js
│   └── public/
│
├── /backend              # Flask API
│   ├── app.py
│   ├── dataset_jee.csv
│   ├── requirements.txt
│   ├── .env              # GEMINI_API_KEY
│   └── /templates        # login.html, dashboard.html, etc.
│
└── /static
    ├── /styles           # login.css, signup.css, chatbot.css
    └── /images
```

---

## 🚀 Installation & Setup (Local)

### 🔹 Frontend (React + HTML)
```bash
cd frontend
npm install
npm start
```

> Runs on: `http://localhost:3000`

### 🔹 Backend (Flask)
```bash
cd backend
pip install -r requirements.txt
python app.py
```

> Runs on: `http://127.0.0.1:5000`

> Ensure `.env` file contains:
```
GEMINI_API_KEY=your_google_gemini_api_key
```

---

## 🌐 Deployment

### ✅ Flask Backend → [Render](https://render.com)
- Push `backend/` to GitHub
- Create new Web Service
- Set:
  - **Build command**: `pip install -r requirements.txt`
  - **Start command**: `gunicorn app:app`
  - **Environment variable**: `GEMINI_API_KEY`
- Live URL: `https://examind-api.onrender.com`

### ✅ React Frontend → [Vercel](https://vercel.com)
- Push `frontend/` to GitHub
- Import into Vercel
- Set env var:
  - `REACT_APP_API_URL=https://examind-api.onrender.com`
- Live URL: `https://examind.vercel.app`

---

## 🧠 AI Integration

### Grok (LLama AI)
- Uses `google.generativeai`
- `.env` file:
  ```
  GROK_AI_KEY=your_gemini_api_key
  ```

> 

---

## 📦 API Endpoints (Flask)

| Endpoint         | Method | Description                             |
|------------------|--------|-----------------------------------------|
| `/topics`        | GET    | Get all unique topics                   |
| `/subjects`      | GET    | Get all unique subjects                 |
| `/questions`     | GET    | Filtered past year questions            |
| `/quiz`          | GET    | Generate quiz by topic                  |
| `/signup`        | POST   | Register a user                         |
| `/login`         | POST   | User login                              |
| `/logout`        | GET    | Logout user                             |
| `/me`            | GET    | Get current user                        |
| `/chat`          | POST   | Chat with Gemini-powered Nexa-AI        |

---

## 👤 Authentication Flow

- Users can register or login via `login.html` / `signup.html`
- Login state is managed using `session` (Flask)
- Dashboard, quiz, chatbot accessed post login
- Optional: store email in `localStorage` for personalization

---

## 💬 Chatbot Integration (Nexa-AI)

- HTML page: `chatbot.html`
- Backend: `/chat` endpoint → Gemini API
- Usage:
  - Ask exam-related queries
  - AI replies instantly using Gemini or fallback

---

## 📊 Performance Tracking

- Quiz scores stored in `localStorage` on frontend
- `performance.html` shows recent attempts
- Reset/clear option available

---

## 🧪 Example Usage (Postman)

**Login**
```json
POST /login
{
  "email": "student@example.com",
  "password": "123456"
}
```

**Get Quiz**
```http
GET /quiz?topic=kinematics&count=5
```

**Ask AI**
```json
POST /chat
{
  "message": "Explain Newton’s second law"
}
```

---

## 🔐 Security Notes

- Never expose `.env` or API keys publicly
- Secure sessions with `Flask-Login` or JWT for production
- Store credentials in a real DB (MongoDB, PostgreSQL)

---

## 🙌 Credits

- Built with ❤️ using Flask, React, Gemini, and Python
- Designed for students appearing in **JEE**, **NEET**, **UPSC**
- Created by [Your Name / Team Name]

---

## 📌 To-Do (Optional Enhancements)

- [ ] Switch to MongoDB/PostgreSQL for user data
- [ ] Add timer to quiz
- [ ] Add difficulty level prediction (ML model)
- [ ] Host using Docker
- [ ] Add leaderboard & progress graphs

---

## 📞 Contact

- 📧 Email: you@example.com
- 🌐 Website: [examind.vercel.app](https://examind.vercel.app)
- GitHub: [github.com/yourrepo](https://github.com/yourrepo)

---

## 🏁 License

This project is open source under [MIT License](LICENSE).
