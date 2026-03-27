import { useState } from 'react';
import axios from 'axios';
import { useSocket } from '../context/SocketContext';
import { QRCodeSVG } from 'qrcode.react';
const API = 'http://localhost:5000/api';


export default function HostDashboard() {
  const socket = useSocket();

  // Steps: 'create' -> 'review' -> 'lobby' -> 'quiz' -> 'results'
  const [step, setStep] = useState('create');
  const [topic, setTopic] = useState('');
  const [questionCount, setQuestionCount] = useState(10);
  const [difficulty, setDifficulty] = useState('medium');
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [roomCode, setRoomCode] = useState('');
  const [quizId, setQuizId] = useState('');
  const [players, setPlayers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [finalResults, setFinalResults] = useState(null);
  const [timeLeft, setTimeLeft] = useState(20);

  // STEP 1 — Generate questions with AI
  const handleGenerate = async () => {
    if (!topic.trim()) return alert('Enter a topic!');
    setLoading(true);
    try {
      const res = await axios.post(`${API}/quiz/generate`, { topic, questionCount, difficulty });
      setQuestions(res.data.questions);
      setQuizTitle(`Quiz on ${topic}`);
      setStep('review');
    } catch (err) {
      alert('AI generation failed. Check your API key.');
    }
    setLoading(false);
  };

  // STEP 2 — Save quiz and create room
  const handleLaunch = async () => {
    if (!quizTitle.trim()) return alert('Enter a title!');
    setLoading(true);
    try {
      const res = await axios.post(`${API}/quiz/create`, {
        title: quizTitle,
        topic,
        questions,
      });

      const code = res.data.roomCode;
      const id = res.data.quiz.id;
      setRoomCode(code);
      setQuizId(id);

      // Join socket room as host
      socket.emit('host:create_room', { roomCode: code, quizId: id });
      socket.on('host:room_created', () => setStep('lobby'));

      // Listen for players joining
      socket.on('room:player_list', ({ players: p }) => setPlayers(p));

      // Listen for quiz events
      socket.on('quiz:question', (data) => {
        setCurrentQuestion(data);
        setTimeLeft(data.timeLimit);
        setStep('quiz');
      });

      socket.on('leaderboard:update', ({ leaderboard: lb }) => setLeaderboard(lb));

      socket.on('quiz:question_ended', ({ correctAnswer, leaderboard: lb }) => {
        setLeaderboard(lb);
      });

      socket.on('quiz:finished', ({ leaderboard: lb }) => {
        setFinalResults(lb);
        setStep('results');
      });

    } catch (err) {
      alert('Failed to create quiz');
    }
    setLoading(false);
  };

  // STEP 3 — Start quiz from lobby
  const handleStart = () => {
    if (players.length === 0) return alert('Wait for players to join!');
    socket.emit('host:start_quiz', { roomCode });
  };

  // Next question manually
  const handleNext = () => {
    socket.emit('host:next_question', { roomCode });
  };

  // ── RENDER STEPS ─────────────────────────────

  if (step === 'create') return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-6">
      <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-lg shadow-xl">
        <h1 className="text-3xl font-bold text-teal-400 mb-2">CommuQuiz</h1>
        <p className="text-gray-400 mb-6">Host — Create a new quiz</p>

        <label className="text-sm text-gray-400 mb-1 block">Topic</label>
        <input
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white mb-4 focus:outline-none focus:border-teal-400"
          placeholder="e.g. React Hooks, JavaScript, System Design"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        <label className="text-sm text-gray-400 mb-1 block">Number of Questions</label>
        <select
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white mb-4 focus:outline-none focus:border-teal-400"
          value={questionCount}
          onChange={(e) => setQuestionCount(Number(e.target.value))}
        >
          {[5, 10, 15, 20].map(n => (
            <option key={n} value={n}>{n} Questions</option>
          ))}
        </select>

        <label className="text-sm text-gray-400 mb-1 block">Difficulty Level</label>
        <select
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white mb-6 focus:outline-none focus:border-teal-400"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy"> Beginner (Level 1)</option>
          <option value="medium">Intermediate (Level 2)</option>
          <option value="hard"> Advanced (Level 3)</option>
        </select>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
        >
          {loading ? '⏳ AI is generating questions...' : '✨ Generate Quiz with AI'}
        </button>
      </div>
    </div>
  );

  if (step === 'review') return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-teal-400 mb-2">Review Questions</h2>
        <p className="text-gray-400 mb-4">{questions.length} questions generated by AI</p>

        <input
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white mb-6 focus:outline-none focus:border-teal-400"
          placeholder="Quiz Title"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
        />

        <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
          {questions.map((q, i) => (
            <div key={i} className="bg-gray-900 rounded-xl p-4 border border-gray-800">
              <p className="font-medium mb-3">Q{i + 1}. {q.question}</p>
              <div className="grid grid-cols-2 gap-2">
                {q.options.map((opt, j) => (
                  <div
                    key={j}
                    className={`text-sm px-3 py-2 rounded-lg ${j === q.correct ? 'bg-teal-900 text-teal-300 border border-teal-600' : 'bg-gray-800 text-gray-400'}`}
                  >
                    {j === q.correct && '✓ '}{opt}
                  </div>
                ))}
              </div>
              <span className="text-xs text-gray-500 mt-2 block capitalize">{q.difficulty}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button onClick={() => setStep('create')} className="flex-1 bg-gray-800 hover:bg-gray-700 py-3 rounded-lg font-medium">
            ← Regenerate
          </button>
          <button onClick={handleLaunch} disabled={loading} className="flex-1 bg-teal-500 hover:bg-teal-600 py-3 rounded-lg font-bold disabled:opacity-50">
            {loading ? 'Creating...' : '🚀 Launch Quiz'}
          </button>
        </div>
      </div>
    </div>
  );

  if (step === 'lobby') return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-6">
      <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-md text-center shadow-xl">
        <h2 className="text-2xl font-bold text-teal-400 mb-1">Waiting for players</h2>
        <p className="text-gray-400 mb-6">Share the room code or QR</p>

        <div className="bg-gray-800 rounded-xl p-6 mb-4">
          <p className="text-sm text-gray-400 mb-1">Room Code</p>
          <p className="text-5xl font-black text-white tracking-widest">{roomCode}</p>
        </div>

        <div className="bg-white rounded-xl p-4 inline-block mb-6">
         <QRCodeSVG value={` https://emmalyn-centroclinal-unnefariously.ngrok-free.dev/join/${roomCode}`} size={150} />
        </div>

        <div className="bg-gray-800 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-400 mb-2">Players Joined ({players.length})</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {players.length === 0
              ? <p className="text-gray-500 text-sm">Waiting for players...</p>
              : players.map((p, i) => (
                <span key={i} className="bg-teal-900 text-teal-300 px-3 py-1 rounded-full text-sm">{p}</span>
              ))
            }
          </div>
        </div>

        <button
          onClick={handleStart}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 rounded-xl text-lg transition"
        >
          ▶ Start Quiz ({players.length} players)
        </button>
      </div>
    </div>
  );

  if (step === 'quiz') return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <span className="text-teal-400 font-bold">Question {currentQuestion?.questionNumber}/{currentQuestion?.totalQuestions}</span>
          <span className="bg-gray-800 px-4 py-2 rounded-full font-mono text-lg">⏱ {timeLeft}s</span>
        </div>

        {currentQuestion && (
          <div className="bg-gray-900 rounded-2xl p-6 mb-6">
            <h3 className="text-xl font-bold mb-4">{currentQuestion.question}</h3>
            <div className="grid grid-cols-2 gap-3">
              {currentQuestion.options.map((opt, i) => (
                <div key={i} className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm">{opt}</div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-gray-900 rounded-2xl p-4 mb-4">
          <h4 className="text-sm text-gray-400 mb-3 font-medium">LIVE LEADERBOARD</h4>
          {leaderboard.slice(0, 5).map((p, i) => (
            <div key={i} className="flex justify-between items-center py-2 border-b border-gray-800 last:border-0">
              <span className="flex items-center gap-2">
                <span className="text-teal-400 font-bold w-6">#{p.rank}</span>
                <span>{p.name}</span>
                {p.streak >= 3 && <span className="text-orange-400 text-xs">🔥 {p.streak}</span>}
              </span>
              <span className="font-bold text-teal-300">{p.score} pts</span>
            </div>
          ))}
        </div>

        <button onClick={handleNext} className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-xl font-bold transition">
          Next Question →
        </button>
      </div>
    </div>
  );

  if (step === 'results') return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-lg mx-auto">
        <h2 className="text-3xl font-black text-center text-teal-400 mb-2">🏆 Final Results</h2>
        <p className="text-center text-gray-400 mb-8">Quiz completed!</p>
        <div className="space-y-3">
          {finalResults?.map((p, i) => (
            <div key={i} className={`flex justify-between items-center p-4 rounded-xl ${i === 0 ? 'bg-yellow-900 border border-yellow-600' : i === 1 ? 'bg-gray-700' : i === 2 ? 'bg-orange-900' : 'bg-gray-900'}`}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}</span>
                <span className="font-bold">{p.name}</span>
              </div>
              <span className="font-black text-xl text-teal-300">{p.score} pts</span>
            </div>
          ))}
        </div>
        <button onClick={() => { setStep('create'); setTopic(''); setQuestions([]); }} className="w-full mt-8 bg-teal-500 hover:bg-teal-600 py-3 rounded-xl font-bold">
          🔄 Create New Quiz
        </button>
      </div>
    </div>
  );
}