import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';


export default function PlayerView() {
  const { roomCode: paramCode } = useParams();
  const socket = useSocket();

  const [step, setStep] = useState('join'); // join -> lobby -> quiz -> result -> results
  const [roomCode, setRoomCode] = useState(paramCode || '');
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState('');
  const [players, setPlayers] = useState([]);
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerResult, setAnswerResult] = useState(null);
  const [timeLeft, setTimeLeft] = useState(20);
  const [leaderboard, setLeaderboard] = useState([]);
  const [finalResults, setFinalResults] = useState(null);
  const [myScore, setMyScore] = useState(0);
  const [myStreak, setMyStreak] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  useEffect(() => {
    if (!socket) return;

    socket.on('error', ({ message }) => setError(message));

    socket.on('player:joined', () => setStep('lobby'));

    socket.on('room:player_list', ({ players: p }) => setPlayers(p));

    socket.on('quiz:started', () => {
      setStep('starting');
      setTimeout(() => setStep('quiz'), 2000);
    });

    socket.on('quiz:question', (data) => {
      setQuestion(data);
      setSelectedAnswer(null);
      setAnswerResult(null);
      setCorrectAnswer(null);
      setTimeLeft(data.timeLimit);
      setStep('quiz');
    });

    socket.on('player:answer_result', (result) => {
      setAnswerResult(result);
      setMyScore(result.totalScore);
      setMyStreak(result.streak);
    });

    socket.on('quiz:question_ended', ({ correctAnswer: ca, leaderboard: lb }) => {
      setCorrectAnswer(ca);
      setLeaderboard(lb);
    });

    socket.on('leaderboard:update', ({ leaderboard: lb }) => setLeaderboard(lb));

    socket.on('quiz:finished', ({ leaderboard: lb }) => {
      setFinalResults(lb);
      setStep('results');
    });

    return () => {
      socket.off('error');
      socket.off('player:joined');
      socket.off('room:player_list');
      socket.off('quiz:started');
      socket.off('quiz:question');
      socket.off('player:answer_result');
      socket.off('quiz:question_ended');
      socket.off('leaderboard:update');
      socket.off('quiz:finished');
    };
  }, [socket]);

  // Timer countdown
  useEffect(() => {
    if (step !== 'quiz' || selectedAnswer !== null) return;
    if (timeLeft <= 0) return;
    const t = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, step, selectedAnswer]);

  const handleJoin = () => {
    if (!playerName.trim()) return setError('Enter your name!');
    if (!roomCode.trim()) return setError('Enter room code!');
    setError('');
    socket.emit('player:join', { roomCode: roomCode.toUpperCase(), playerName });
  };

  const handleAnswer = (index) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    socket.emit('player:submit_answer', {
      roomCode,
      answerIndex: index,
      timeLeft,
    });
  };

  const getOptionStyle = (index) => {
    if (correctAnswer !== null) {
      if (index === correctAnswer) return 'bg-green-700 border-green-500 text-white';
      if (index === selectedAnswer && index !== correctAnswer) return 'bg-red-800 border-red-500 text-white';
      return 'bg-gray-800 border-gray-700 opacity-50';
    }
    if (selectedAnswer === index) return 'bg-teal-700 border-teal-400 text-white scale-95';
    return 'bg-gray-800 border-gray-700 hover:bg-gray-700 cursor-pointer';
  };

  // ── RENDER ────────────────────────────────────

  if (step === 'join') return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-6">
      <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-sm shadow-xl">
        <h1 className="text-3xl font-bold text-teal-400 mb-1">CommuQuiz</h1>
        <p className="text-gray-400 mb-6">Join a live quiz</p>

        {error && <p className="text-red-400 text-sm mb-4 bg-red-950 px-3 py-2 rounded-lg">{error}</p>}

        <input
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white mb-3 focus:outline-none focus:border-teal-400"
          placeholder="Your Name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <input
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white mb-6 uppercase tracking-widest focus:outline-none focus:border-teal-400"
          placeholder="Room Code"
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
          maxLength={6}
        />
        <button
          onClick={handleJoin}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-lg transition"
        >
          Join Quiz →
        </button>
      </div>
    </div>
  );

  if (step === 'lobby') return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-6">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-bounce">⏳</div>
        <h2 className="text-2xl font-bold text-teal-400 mb-2">You are in!</h2>
        <p className="text-gray-400 mb-4">Welcome, <span className="text-white font-bold">{playerName}</span></p>
        <p className="text-gray-500">Waiting for host to start the quiz...</p>
        <div className="mt-6 bg-gray-900 rounded-xl p-4">
          <p className="text-sm text-gray-400 mb-2">Players in room ({players.length})</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {players.map((p, i) => (
              <span key={i} className={`px-3 py-1 rounded-full text-sm ${p === playerName ? 'bg-teal-700 text-teal-200' : 'bg-gray-800 text-gray-300'}`}>{p}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (step === 'starting') return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <div className="text-center">
        <div className="text-8xl mb-4 animate-pulse">🚀</div>
        <h2 className="text-3xl font-black text-teal-400">Quiz Starting!</h2>
      </div>
    </div>
  );

  if (step === 'quiz') return (
    <div className="min-h-screen bg-gray-950 text-white p-4">
      <div className="max-w-lg mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-sm text-gray-400">Question {question?.questionNumber}/{question?.totalQuestions}</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-teal-400 font-bold text-sm">⭐ {myScore} pts</span>
              {myStreak >= 3 && <span className="text-orange-400 text-xs bg-orange-950 px-2 py-0.5 rounded-full">🔥 {myStreak} streak!</span>}
            </div>
          </div>
          <div className={`text-3xl font-black ${timeLeft <= 5 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
            {timeLeft}
          </div>
        </div>

        {/* Timer bar */}
        <div className="w-full bg-gray-800 rounded-full h-2 mb-6">
          <div
            className={`h-2 rounded-full transition-all ${timeLeft <= 5 ? 'bg-red-500' : 'bg-teal-500'}`}
            style={{ width: `${(timeLeft / 20) * 100}%` }}
          />
        </div>

        {/* Answer result popup */}
        {answerResult && (
          <div className={`mb-4 p-3 rounded-xl text-center font-bold ${answerResult.isCorrect ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
            {answerResult.isCorrect
              ? `✅ Correct! +${answerResult.points} points${answerResult.hasStreak ? ' 🔥 Streak Bonus!' : ''}`
              : '❌ Wrong answer'}
          </div>
        )}

        {/* Question */}
        {question && (
          <>
            <div className="bg-gray-900 rounded-2xl p-6 mb-4">
              <p className="text-lg font-bold leading-relaxed">{question.question}</p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 gap-3 mb-6">
              {question.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={selectedAnswer !== null}
                  className={`w-full text-left px-5 py-4 rounded-xl border-2 font-medium transition-all ${getOptionStyle(i)}`}
                >
                  <span className="text-gray-400 mr-3">{['A', 'B', 'C', 'D'][i]}.</span>
                  {opt}
                </button>
              ))}
            </div>
          </>
        )}

      </div>
    </div>
  );

  if (step === 'results') return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-sm mx-auto">
        <h2 className="text-3xl font-black text-center text-teal-400 mb-2">🏆 Results</h2>
        <p className="text-center text-gray-400 mb-6">Your final score: <span className="text-white font-bold text-xl">{myScore} pts</span></p>
        <div className="space-y-3">
          {finalResults?.map((p, i) => (
            <div key={i} className={`flex justify-between items-center p-4 rounded-xl ${p.name === playerName ? 'bg-teal-900 border border-teal-500' : 'bg-gray-900'}`}>
              <div className="flex items-center gap-3">
                <span>{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}</span>
                <span className={p.name === playerName ? 'text-teal-300 font-bold' : ''}>{p.name} {p.name === playerName ? '(You)' : ''}</span>
              </div>
              <span className="font-bold text-teal-300">{p.score} pts</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}