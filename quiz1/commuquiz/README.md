# CommuQuiz — Complete Setup Guide

## Project Kya Hai?
AI-powered real-time quiz engine for Commudle.
- Host topic type kare → AI questions generate kare
- Players room code se join karein
- Live leaderboard + streak scoring
- Post-quiz analytics

## Prerequisites
- Node.js v18+
- PostgreSQL installed
- OpenRouter API key (free) — https://openrouter.ai

---

## Step 1 — PostgreSQL Database Banao

pgAdmin 4 kholo:
1. Databases pe right click
2. Create → Database
3. Name: commuquiz
4. Save

---

## Step 2 — Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

.env file mein fill karo:
```
PORT=5000
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/commuquiz
OPENROUTER_API_KEY=sk-or-v1-your-key-here
JWT_SECRET=commuquiz123secret
CLIENT_URL=http://localhost:3000
```

Backend chalaao:
```bash
npm run dev
```

Expected output:
```
🚀 CommuQuiz backend running on port 5000
📡 Socket.io ready
✅ Database tables created!
```

---

## Step 3 — Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Expected output:
```
VITE ready
➜ Local: http://localhost:3000/
```

---

## Step 4 — OpenRouter API Key

1. https://openrouter.ai pe jaao
2. Sign up karo — free mein key milti hai
3. Dashboard → Keys → Create Key
4. .env mein paste karo

---

## Kaise Use Karein?

### Host:
1. http://localhost:3000/host
2. Topic type karo (e.g. "React Hooks")
3. Generate Quiz dabaao
4. Review → Launch
5. Room code share karo
6. Start Quiz dabaao

### Player:
1. http://localhost:3000/join
2. Naam aur room code daalo
3. Join karo
4. Questions answer karo!

---

## Features
✅ AI Question Generation (OpenRouter + Llama)
✅ Room Code + QR Code Join
✅ Real-time Questions (Socket.io)
✅ Live Leaderboard
✅ Streak Combo Scoring (3x = 2x points)
✅ Emoji Reactions
✅ Timer per Question
✅ Post-Quiz Analytics
✅ Embeddable Component

---

## Tech Stack
- Frontend: React + Tailwind + Socket.io + Axios + QRCode.js + Vite
- Backend: Node.js + Express + Socket.io
- AI: OpenRouter API (Llama-3-8b)
- Database: PostgreSQL
- Real-time: Socket.io
