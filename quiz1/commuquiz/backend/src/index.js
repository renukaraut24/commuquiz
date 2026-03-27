require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { createTables } = require('./config/database');
const quizRoutes = require('./routes/quiz');
const authRoutes = require('./routes/auth');
const { setupSocketHandlers } = require('./services/socketService');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api/quiz', quizRoutes);
app.use('/api/auth', authRoutes);

app.get('/health', (req, res) => {
  res.json({ status: '🚀 CommuQuiz backend running!' });
});

setupSocketHandlers(io);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await createTables();
  server.listen(PORT, () => {
    console.log(`🚀 CommuQuiz backend running on port ${PORT}`);
    console.log(`📡 Socket.io ready`);
  });
};

startServer();
