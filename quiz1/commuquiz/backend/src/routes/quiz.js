const express = require('express');
const router = express.Router();
const { pool } = require('../config/database');
const { generateQuestions } = require('../services/aiService');
const { v4: uuidv4 } = require('uuid');

// Generate room code
const generateRoomCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// POST /api/quiz/generate - Generate questions using AI
router.post('/generate', async (req, res) => {
  const { topic, questionCount = 10, difficulty = 'medium' } = req.body;

  if (!topic) {
    return res.status(400).json({ success: false, message: 'Topic is required' });
  }

  const validDifficulties = ['easy', 'medium', 'hard'];
  const diffLevel = validDifficulties.includes(difficulty) ? difficulty : 'medium';

  const result = await generateQuestions(topic, questionCount, diffLevel);

  if (!result.success) {
    return res.status(500).json({ success: false, message: 'AI generation failed' });
  }

  res.json({ success: true, questions: result.questions });
});

// POST /api/quiz/create - Save quiz to database
router.post('/create', async (req, res) => {
  const { title, topic, hostName, questions } = req.body;

  if (!title || !questions || questions.length === 0) {
    return res.status(400).json({ success: false, message: 'Title and questions required' });
  }

  try {
    let roomCode = generateRoomCode();

    // Save quiz
    const quizResult = await pool.query(
      `INSERT INTO quizzes (title, topic, host_id, room_code, status)
       VALUES ($1, $2, $3, $4, 'waiting') RETURNING *`,
      [title, topic, hostName || 'Host', roomCode]
    );

    const quiz = quizResult.rows[0];

    // Save questions
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      await pool.query(
        `INSERT INTO questions (quiz_id, question_text, options, correct_answer, difficulty, order_num)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [quiz.id, q.question, JSON.stringify(q.options), q.correct, q.difficulty || 'medium', i + 1]
      );
    }

    res.json({ success: true, quiz, roomCode: quiz.room_code });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to create quiz' });
  }
});

// GET /api/quiz/:roomCode - Get quiz by room code
router.get('/:roomCode', async (req, res) => {
  const { roomCode } = req.params;

  try {
    const quizResult = await pool.query(
      'SELECT * FROM quizzes WHERE room_code = $1',
      [roomCode.toUpperCase()]
    );

    if (quizResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }

    const quiz = quizResult.rows[0];

    const questionsResult = await pool.query(
      'SELECT * FROM questions WHERE quiz_id = $1 ORDER BY order_num',
      [quiz.id]
    );

    res.json({
      success: true,
      quiz,
      questions: questionsResult.rows,
      totalQuestions: questionsResult.rows.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/quiz/:quizId/results - Get final results
router.get('/:quizId/results', async (req, res) => {
  const { quizId } = req.params;

  try {
    const sessions = await pool.query(
      'SELECT * FROM sessions WHERE quiz_id = $1 ORDER BY score DESC',
      [quizId]
    );

    const questions = await pool.query(
      'SELECT * FROM questions WHERE quiz_id = $1 ORDER BY order_num',
      [quizId]
    );

    res.json({
      success: true,
      leaderboard: sessions.rows,
      questions: questions.rows,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;

// GET /api/quiz/:quizId/analytics - Post-quiz analytics
router.get('/:quizId/analytics', async (req, res) => {
  const { quizId } = req.params;
  try {
    const sessions = await pool.query('SELECT * FROM sessions WHERE quiz_id = $1', [quizId]);
    const questions = await pool.query('SELECT * FROM questions WHERE quiz_id = $1 ORDER BY order_num', [quizId]);
    if (sessions.rows.length === 0) return res.json({ success: true, analytics: {} });
    const totalPlayers = sessions.rows.length;
    const avgScore = Math.round(sessions.rows.reduce((sum, s) => sum + s.score, 0) / totalPlayers);
    const highestScore = Math.max(...sessions.rows.map((s) => s.score));
    const questionStats = questions.rows.map((q, index) => {
      let wrongCount = 0, totalAnswered = 0;
      sessions.rows.forEach((session) => {
        const answer = (session.answers || []).find((a) => a.questionIndex === index);
        if (answer) { totalAnswered++; if (!answer.correct) wrongCount++; }
      });
      const wrongPercent = totalAnswered > 0 ? Math.round((wrongCount / totalAnswered) * 100) : 0;
      return { questionNumber: index + 1, questionText: q.question_text, wrongCount, totalAnswered, wrongPercent };
    });
    const hardestQuestion = questionStats.reduce((max, q) => (q.wrongPercent > max.wrongPercent ? q : max), questionStats[0]);
    const easiestQuestion = questionStats.reduce((min, q) => (q.wrongPercent < min.wrongPercent ? q : min), questionStats[0]);
    res.json({ success: true, analytics: { totalPlayers, avgScore, highestScore, hardestQuestion, easiestQuestion, questionStats } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});