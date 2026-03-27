import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const API = 'http:// 172.25.80.1:5000/api';


export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const payload = isLogin
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password };

      const res = await axios.post(`${API}${endpoint}`, payload);

      if (res.data.success) {
        login(res.data.user, res.data.token);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-500 opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 opacity-5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-500 rounded-2xl mb-4 shadow-lg">
            <span className="text-2xl">⚡</span>
          </div>
          <h1 className="text-4xl font-black text-white">CommuQuiz</h1>
          <p className="text-gray-400 mt-1 text-sm">AI-powered live quiz engine</p>
        </div>

        {/* Card */}
        <div className="bg-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-800">

          {/* Tabs */}
          <div className="flex bg-gray-800 rounded-xl p-1 mb-8">
            <button
              onClick={() => { setIsLogin(true); setError(''); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                isLogin ? 'bg-teal-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setIsLogin(false); setError(''); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                !isLogin ? 'bg-teal-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name field — only register */}
            {!isLogin && (
              <div>
                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">
                  Full Name
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition"
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-950 border border-red-800 rounded-xl px-4 py-3 flex items-center gap-2">
                <span className="text-red-400 text-sm">⚠</span>
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-500 hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all duration-200 text-sm mt-2 shadow-lg shadow-teal-500/20"
            >
              {loading
                ? '⏳ Please wait...'
                : isLogin
                ? '→ Sign In'
                : '→ Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-800" />
            <span className="text-xs text-gray-600">OR</span>
            <div className="flex-1 h-px bg-gray-800" />
          </div>

          {/* Guest join */}
          <button
            onClick={() => navigate('/join')}
            className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-3.5 rounded-xl transition text-sm border border-gray-700"
          >
            🎮 Join as Guest Player
          </button>

        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 text-xs mt-6">
          Powered by CommuQuiz Engine • Team DreamForge
        </p>
      </div>
    </div>
  );
}