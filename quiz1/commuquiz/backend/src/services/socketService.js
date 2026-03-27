const { pool } = require('../config/database');

// In-memory store for active sessions (Redis replacement for hackathon)
const activeRooms = {};
// Structure:
// activeRooms[roomCode] = {
//   quizId, hostId, status, currentQuestion,
//   players: { socketId: { name, score, streak, answers } },
//   questions: [], timer: null
// }

const QUESTION_TIME = 20; // seconds per question
const STREAK_BONUS_COUNT = 3; // consecutive correct for bonus

const calculateScore = (timeLeft, isCorrect, streak) => {
  if (!isCorrect) return 0;
  let score = 100 + timeLeft * 5; // base + speed bonus
  if (streak >= STREAK_BONUS_COUNT) score *= 2; // streak double points
  return Math.round(score);
};

const getLeaderboard = (room) => {
  return Object.entries(room.players)
    .map(([socketId, player]) => ({
      socketId,
      name: player.name,
      score: player.score,
      streak: player.streak,
    }))
    .sort((a, b) => b.score - a.score)
    .map((p, i) => ({ ...p, rank: i + 1 }));
};

const setupSocketHandlers = (io) => {
  io.on('connection', (socket) => {
    console.log(`✅ Connected: ${socket.id}`);

    // HOST — Create room after quiz is saved
    socket.on('host:create_room', async ({ roomCode, quizId }) => {
      try {
        const result = await pool.query(
          'SELECT q.*, json_agg(qu.* ORDER BY qu.order_num) as questions FROM quizzes q LEFT JOIN questions qu ON q.id = qu.quiz_id WHERE q.room_code = $1 GROUP BY q.id',
          [roomCode]
        );

        if (result.rows.length === 0) {
          socket.emit('error', { message: 'Quiz not found' });
          return;
        }

        const quiz = result.rows[0];

        activeRooms[roomCode] = {
          quizId: quiz.id,
          hostId: socket.id,
          status: 'waiting',
          currentQuestion: -1,
          players: {},
          questions: quiz.questions,
          timer: null,
        };

        socket.join(roomCode);
        socket.emit('host:room_created', {
          roomCode,
          quizId: quiz.id,
          totalQuestions: quiz.questions.length,
        });

        console.log(`🎮 Room created: ${roomCode}`);
      } catch (err) {
        socket.emit('error', { message: err.message });
      }
    });

    // PLAYER — Join room
    socket.on('player:join', ({ roomCode, playerName }) => {
      const room = activeRooms[roomCode];

      if (!room) {
        socket.emit('error', { message: 'Room not found. Check your room code.' });
        return;
      }

      if (room.status !== 'waiting') {
        socket.emit('error', { message: 'Quiz already started.' });
        return;
      }

      // Add player to room
      room.players[socket.id] = {
        name: playerName,
        score: 0,
        streak: 0,
        answers: [],
      };

      socket.join(roomCode);
      socket.emit('player:joined', {
        roomCode,
        playerName,
        message: 'Joined successfully!',
      });

      // Tell host new player joined
      io.to(room.hostId).emit('host:player_joined', {
        playerCount: Object.keys(room.players).length,
        playerName,
        players: Object.values(room.players).map((p) => p.name),
      });

      // Send updated player list to all in room
      io.to(roomCode).emit('room:player_list', {
        players: Object.values(room.players).map((p) => p.name),
        count: Object.keys(room.players).length,
      });

      console.log(`👤 ${playerName} joined ${roomCode}`);
    });

    // HOST — Start quiz
    socket.on('host:start_quiz', ({ roomCode }) => {
      const room = activeRooms[roomCode];

      if (!room || room.hostId !== socket.id) return;
      if (Object.keys(room.players).length === 0) {
        socket.emit('error', { message: 'No players in room yet!' });
        return;
      }

      room.status = 'active';
      room.currentQuestion = 0;

      io.to(roomCode).emit('quiz:started', {
        message: 'Quiz is starting!',
        totalQuestions: room.questions.length,
      });

      // Send first question after 3 seconds
      setTimeout(() => sendQuestion(io, roomCode), 3000);
    });

    // HOST — Next question manually
    socket.on('host:next_question', ({ roomCode }) => {
      const room = activeRooms[roomCode];
      if (!room || room.hostId !== socket.id) return;

      if (room.timer) clearTimeout(room.timer);
      room.currentQuestion++;

      if (room.currentQuestion >= room.questions.length) {
        endQuiz(io, roomCode);
      } else {
        sendQuestion(io, roomCode);
      }
    });

    // PLAYER — Submit answer
    socket.on('player:submit_answer', ({ roomCode, answerIndex, timeLeft }) => {
      const room = activeRooms[roomCode];
      if (!room || room.status !== 'active') return;

      const player = room.players[socket.id];
      if (!player) return;

      const currentQ = room.questions[room.currentQuestion];
      const isCorrect = answerIndex === currentQ.correct_answer;

      // Update streak
      if (isCorrect) {
        player.streak += 1;
      } else {
        player.streak = 0;
      }

      // Calculate score
      const points = calculateScore(timeLeft, isCorrect, player.streak);
      player.score += points;
      player.answers.push({
        questionIndex: room.currentQuestion,
        answer: answerIndex,
        correct: isCorrect,
        points,
      });

      // Send result to this player only
      socket.emit('player:answer_result', {
        isCorrect,
        points,
        correctAnswer: currentQ.correct_answer,
        totalScore: player.score,
        streak: player.streak,
        hasStreak: player.streak >= STREAK_BONUS_COUNT,
      });

      // Update leaderboard for everyone
      io.to(roomCode).emit('leaderboard:update', {
        leaderboard: getLeaderboard(room),
      });
    });

    // PLAYER — Send emoji reaction
    socket.on('player:reaction', ({ roomCode, emoji }) => {
      const room = activeRooms[roomCode];
      if (!room) return;
      const player = room.players[socket.id];
      if (!player) return;

      io.to(roomCode).emit('room:reaction', {
        playerName: player.name,
        emoji,
      });
    });

    // Disconnect
    socket.on('disconnect', () => {
      // Remove player from all rooms
      for (const [roomCode, room] of Object.entries(activeRooms)) {
        if (room.players[socket.id]) {
          const playerName = room.players[socket.id].name;
          delete room.players[socket.id];

          io.to(roomCode).emit('room:player_list', {
            players: Object.values(room.players).map((p) => p.name),
            count: Object.keys(room.players).length,
          });

          io.to(room.hostId).emit('host:player_left', { playerName });
        }

        if (room.hostId === socket.id) {
          io.to(roomCode).emit('quiz:ended', { reason: 'Host disconnected' });
          if (room.timer) clearTimeout(room.timer);
          delete activeRooms[roomCode];
        }
      }
      console.log(`❌ Disconnected: ${socket.id}`);
    });
  });
};

// Send current question to all players
const sendQuestion = (io, roomCode) => {
  const room = activeRooms[roomCode];
  if (!room) return;

  const q = room.questions[room.currentQuestion];

  // Send question WITHOUT correct answer to players
  io.to(roomCode).emit('quiz:question', {
    questionIndex: room.currentQuestion,
    totalQuestions: room.questions.length,
    question: q.question_text,
    options: q.options,
    timeLimit: QUESTION_TIME,
    questionNumber: room.currentQuestion + 1,
  });

  // Auto-advance after time is up
  room.timer = setTimeout(() => {
    // Show correct answer
    io.to(roomCode).emit('quiz:question_ended', {
      correctAnswer: q.correct_answer,
      leaderboard: getLeaderboard(room),
    });

    // Wait 3 seconds then go to next question
    setTimeout(() => {
      room.currentQuestion++;
      if (room.currentQuestion >= room.questions.length) {
        endQuiz(io, roomCode);
      } else {
        sendQuestion(io, roomCode);
      }
    }, 3000);
  }, QUESTION_TIME * 1000);
};

// End quiz and save results
const endQuiz = async (io, roomCode) => {
  const room = activeRooms[roomCode];
  if (!room) return;

  room.status = 'ended';
  if (room.timer) clearTimeout(room.timer);

  const finalLeaderboard = getLeaderboard(room);

  // Save results to database
  try {
    for (const [socketId, player] of Object.entries(room.players)) {
      await pool.query(
        `INSERT INTO sessions (quiz_id, player_name, player_id, score, streak, answers)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT DO NOTHING`,
        [
          room.quizId,
          player.name,
          socketId,
          player.score,
          player.streak,
          JSON.stringify(player.answers),
        ]
      );
    }
  } catch (err) {
    console.error('Save results error:', err.message);
  }

  io.to(roomCode).emit('quiz:finished', {
    leaderboard: finalLeaderboard,
    quizId: room.quizId,
    message: 'Quiz completed!',
  });

  // Cleanup room after 5 minutes
  setTimeout(() => delete activeRooms[roomCode], 5 * 60 * 1000);
  console.log(`🏁 Quiz ended: ${roomCode}`);
};

module.exports = { setupSocketHandlers };
