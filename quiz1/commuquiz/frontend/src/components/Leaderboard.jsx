export default function Leaderboard({ players, currentPlayer, title = 'Live Leaderboard' }) {
  if (!players || players.length === 0) return null;

  return (
    <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800">
      <h4 className="text-sm text-gray-400 mb-3 font-medium uppercase tracking-wider">{title}</h4>
      <div className="space-y-2">
        {players.slice(0, 8).map((p, i) => (
          <div
            key={i}
            className={`flex justify-between items-center py-2 px-3 rounded-lg ${p.name === currentPlayer ? 'bg-teal-900 border border-teal-700' : 'bg-gray-800'}`}
          >
            <span className="flex items-center gap-2">
              <span className="text-sm font-bold w-6 text-center">
                {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
              </span>
              <span className={`text-sm ${p.name === currentPlayer ? 'text-teal-300 font-bold' : 'text-gray-200'}`}>
                {p.name}
                {p.name === currentPlayer && ' (You)'}
              </span>
              {p.streak >= 3 && (
                <span className="text-orange-400 text-xs bg-orange-950 px-1.5 py-0.5 rounded-full">
                  🔥 {p.streak}
                </span>
              )}
            </span>
            <span className="font-bold text-teal-300 text-sm">{p.score} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}
