import { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://172.25.80.1:5000/api';
export default function Analytics({ quizId }) {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!quizId) return;
    axios.get(`${API}/quiz/${quizId}/analytics`)
      .then((res) => { setAnalytics(res.data.analytics); setLoading(false); })
      .catch(() => setLoading(false));
  }, [quizId]);

  if (loading) return <p className="text-gray-400 text-sm text-center py-4">Loading analytics...</p>;
  if (!analytics || !analytics.totalPlayers) return null;

  return (
    <div className="bg-gray-900 rounded-2xl p-5 border border-gray-800 mt-4">
      <h3 className="text-teal-400 font-bold text-lg mb-4">Post-Quiz Analytics</h3>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-gray-800 rounded-xl p-3 text-center">
          <p className="text-2xl font-black text-white">{analytics.totalPlayers}</p>
          <p className="text-xs text-gray-400 mt-1">Players</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-3 text-center">
          <p className="text-2xl font-black text-teal-400">{analytics.avgScore}</p>
          <p className="text-xs text-gray-400 mt-1">Avg Score</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-3 text-center">
          <p className="text-2xl font-black text-yellow-400">{analytics.highestScore}</p>
          <p className="text-xs text-gray-400 mt-1">Top Score</p>
        </div>
      </div>

      {/* Hardest question */}
      {analytics.hardestQuestion && (
        <div className="bg-red-950 border border-red-800 rounded-xl p-4 mb-3">
          <p className="text-xs text-red-400 font-bold mb-1">HARDEST QUESTION ({analytics.hardestQuestion.wrongPercent}% got it wrong)</p>
          <p className="text-sm text-white">Q{analytics.hardestQuestion.questionNumber}. {analytics.hardestQuestion.questionText}</p>
        </div>
      )}

      {/* Easiest question */}
      {analytics.easiestQuestion && (
        <div className="bg-green-950 border border-green-800 rounded-xl p-4 mb-3">
          <p className="text-xs text-green-400 font-bold mb-1">EASIEST QUESTION ({analytics.easiestQuestion.wrongPercent}% got it wrong)</p>
          <p className="text-sm text-white">Q{analytics.easiestQuestion.questionNumber}. {analytics.easiestQuestion.questionText}</p>
        </div>
      )}

      {/* Per question stats */}
      <div>
        <p className="text-xs text-gray-400 mb-2 font-medium">PER QUESTION BREAKDOWN</p>
        <div className="space-y-2">
          {analytics.questionStats?.map((q, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-xs text-gray-500 w-6">Q{q.questionNumber}</span>
              <div className="flex-1 bg-gray-800 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${q.wrongPercent > 60 ? 'bg-red-500' : q.wrongPercent > 30 ? 'bg-yellow-500' : 'bg-green-500'}`}
                  style={{ width: `${100 - q.wrongPercent}%` }}
                />
              </div>
              <span className="text-xs text-gray-400 w-12 text-right">{100 - q.wrongPercent}% correct</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
