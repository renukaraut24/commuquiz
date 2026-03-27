import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Navbar */}
      <nav className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-sm">⚡</div>
            <span className="font-black text-lg text-white">CommuQuiz</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm text-gray-300">{user?.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-gray-500 hover:text-white transition px-3 py-1.5 rounded-lg hover:bg-gray-800"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Welcome */}
        <div className="mb-12">
          <h2 className="text-3xl font-black text-white mb-1">
            Welcome back, {user?.name?.split(' ')[0]}! 👋
          </h2>
          <p className="text-gray-400">What would you like to do today?</p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">

          {/* Host Card */}
          <div
            onClick={() => navigate('/host')}
            className="bg-gradient-to-br from-teal-900 to-teal-950 border border-teal-800 rounded-3xl p-8 cursor-pointer hover:border-teal-600 hover:scale-[1.02] transition-all duration-200 group"
          >
            <div className="w-14 h-14 bg-teal-500 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
              🎮
            </div>
            <h3 className="text-xl font-black text-white mb-2">Host a Quiz</h3>
            <p className="text-teal-300 text-sm leading-relaxed">
              Create an AI-powered quiz in seconds. Share room code with participants and go live.
            </p>
            <div className="mt-6 flex items-center gap-2 text-teal-400 text-sm font-semibold">
              <span>Create Quiz</span>
              <span>→</span>
            </div>
          </div>

          {/* Join Card */}
          <div
            onClick={() => navigate('/join')}
            className="bg-gradient-to-br from-purple-900 to-purple-950 border border-purple-800 rounded-3xl p-8 cursor-pointer hover:border-purple-600 hover:scale-[1.02] transition-all duration-200 group"
          >
            <div className="w-14 h-14 bg-purple-500 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
              🙋
            </div>
            <h3 className="text-xl font-black text-white mb-2">Join a Quiz</h3>
            <p className="text-purple-300 text-sm leading-relaxed">
              Enter a room code or scan QR to join a live quiz. Compete on the leaderboard!
            </p>
            <div className="mt-6 flex items-center gap-2 text-purple-400 text-sm font-semibold">
              <span>Join Now</span>
              <span>→</span>
            </div>
          </div>
        </div>

        {/* Features strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '🤖', label: 'AI Generated', desc: 'Questions in 60s' },
            { icon: '⚡', label: 'Real-Time', desc: 'Socket.io powered' },
            { icon: '🏆', label: 'Leaderboard', desc: 'Live rankings' },
            { icon: '🔥', label: 'Streak Bonus', desc: '3x = double pts' },
          ].map((f, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-4 text-center">
              <div className="text-2xl mb-2">{f.icon}</div>
              <p className="text-white font-bold text-sm">{f.label}</p>
              <p className="text-gray-500 text-xs mt-0.5">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
