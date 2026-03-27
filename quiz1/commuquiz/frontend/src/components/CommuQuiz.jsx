import { useState } from 'react';
import { io } from 'socket.io-client';
import HostDashboard from '../pages/HostDashboard';
import PlayerView from '../pages/PlayerView';

// This is the main plug-and-play component
// Usage: <CommuQuiz mode="host" serverUrl="http://localhost:5000" />
// Usage: <CommuQuiz mode="player" roomCode="QUIZ42" serverUrl="http://localhost:5000" />

export default function CommuQuiz({
  mode = null,            // 'host' or 'player' — if null, shows selection screen
  roomCode = '',          // pre-fill room code for players
  serverUrl = 'http://localhost:5000',
  theme = 'dark',        // future: support light/dark
}) {
  const [selectedMode, setSelectedMode] = useState(mode);

  // Selection screen if no mode given
  if (!selectedMode) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-6">
        <div className="text-center max-w-md w-full">
          <h1 className="text-5xl font-black text-teal-400 mb-2">CommuQuiz</h1>
          <p className="text-gray-400 mb-10 text-lg">AI-powered real-time quiz engine</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setSelectedMode('host')}
              className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition"
            >
              🎮 I am a Host
            </button>
            <button
              onClick={() => setSelectedMode('player')}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition"
            >
              🙋 I am a Player
            </button>
          </div>
          <p className="text-xs text-gray-600 mt-8">Powered by CommuQuiz Engine</p>
        </div>
      </div>
    );
  }

  if (selectedMode === 'host') return <HostDashboard serverUrl={serverUrl} />;
  if (selectedMode === 'player') return <PlayerView serverUrl={serverUrl} defaultRoomCode={roomCode} />;
}
