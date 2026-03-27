import { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';

export const useQuizSocket = (roomCode) => {
  const socket = useSocket();
  const [players, setPlayers] = useState([]);
  const [question, setQuestion] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [quizStatus, setQuizStatus] = useState('waiting');
  const [answerResult, setAnswerResult] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [finalResults, setFinalResults] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!socket) return;

    socket.on('error', ({ message }) => setError(message));
    socket.on('room:player_list', ({ players: p }) => setPlayers(p));
    socket.on('quiz:started', () => setQuizStatus('active'));
    socket.on('quiz:question', (data) => {
      setQuestion(data);
      setAnswerResult(null);
      setCorrectAnswer(null);
      setQuizStatus('active');
    });
    socket.on('player:answer_result', (result) => setAnswerResult(result));
    socket.on('quiz:question_ended', ({ correctAnswer: ca, leaderboard: lb }) => {
      setCorrectAnswer(ca);
      setLeaderboard(lb);
    });
    socket.on('leaderboard:update', ({ leaderboard: lb }) => setLeaderboard(lb));
    socket.on('quiz:finished', ({ leaderboard: lb }) => {
      setFinalResults(lb);
      setQuizStatus('finished');
    });

    return () => {
      socket.off('error');
      socket.off('room:player_list');
      socket.off('quiz:started');
      socket.off('quiz:question');
      socket.off('player:answer_result');
      socket.off('quiz:question_ended');
      socket.off('leaderboard:update');
      socket.off('quiz:finished');
    };
  }, [socket]);

  const submitAnswer = (answerIndex, timeLeft) => {
    socket?.emit('player:submit_answer', { roomCode, answerIndex, timeLeft });
  };

  const sendReaction = (emoji) => {
    socket?.emit('player:reaction', { roomCode, emoji });
  };

  const startQuiz = () => {
    socket?.emit('host:start_quiz', { roomCode });
  };

  const nextQuestion = () => {
    socket?.emit('host:next_question', { roomCode });
  };

  return {
    players, question, leaderboard, quizStatus,
    answerResult, correctAnswer, finalResults, error,
    submitAnswer, sendReaction, startQuiz, nextQuestion,
  };
};
