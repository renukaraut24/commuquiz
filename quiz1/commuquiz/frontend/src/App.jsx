import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext'; // 🔥 IMPORTANT

import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import HostDashboard from './pages/HostDashboard';
import PlayerView from './pages/PlayerView'; // ✅ use this

//////////////////////////////////////////////////////
// 🔒 Protected Route
//////////////////////////////////////////////////////

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return user ? children : <Navigate to="/" />;
};

//////////////////////////////////////////////////////
// 🔥 ROUTES
//////////////////////////////////////////////////////

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Auth */}
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <AuthPage />} />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Host */}
      <Route
        path="/host"
        element={
          <ProtectedRoute>
            <HostDashboard />
          </ProtectedRoute>
        }
      />

      {/* 🔥 QUIZ ROUTE (FIXED) */}
      <Route path="/quiz/:roomCode" element={<PlayerView />} />
      <Route path="/join" element={<PlayerView />} />
    </Routes>
  );
}

//////////////////////////////////////////////////////
// 🔥 MAIN APP
//////////////////////////////////////////////////////

export default function App() {
  return (
    <AuthProvider>
      <SocketProvider> {/* 🔥 YE SABSE IMPORTANT HAI */}
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </SocketProvider>
    </AuthProvider>
  );
}