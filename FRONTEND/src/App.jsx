import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';

// Components
import Navigation from './navigation/Navigation';
import News from './pages/news/News';
import Footer from './navigation/Footer';
import Home from './pages/home/Home';
import NoPage from './pages/nopage/Nopage';
import About from './pages/about/About';
import Players from './pages/football/Players';
import PlayerRanking from './pages/football/PlayerRanking';
import MatchHistory from './pages/football/MatchHistory';
import NewDetails from './pages/news/NewDetails';
import AdminNavigation from './admin/navigation/AdminNavigation';
import ContentEditor from './admin/content/ContentEditor';
import ContentUpdate from './admin/content/ContentUpdate';
import ContentCreate from './admin/content/ContentCreate';
import LoginAuth from './auth/LoginAuth';

// Layout for the main user-facing application
function UserLayout() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="news" element={<News />} />
        <Route path="about" element={<About />} />
        <Route path="players" element={<Players />} />
        <Route path="player_rank" element={<PlayerRanking />} />
        <Route path="match_history" element={<MatchHistory />} />
        <Route path="news/news_detail/:contentId" element={<NewDetails />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
      <Footer />
    </>
  );
}

// Protected Route Wrapper
function ProtectedRoute({ element }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an authentication check
    const token = localStorage.getItem('authToken');
    console.log('Token found in localStorage:', token);

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false); // Set loading to false after token check
  }, []);

  if (loading) {
    return <p>Loading...</p>; // You can replace this with a spinner or loader if necessary
  }

  return isAuthenticated ? element : <Navigate to="/auth" replace />;
}

// Layout for admin pages (Protected Route)
function AdminLayout() {
  return (
    <>
      <AdminNavigation />
      <Routes>
        <Route path="editor" element={<ContentEditor />} />
        <Route path="editor/update/:contentId" element={<ContentUpdate />} />
        <Route path="editor/create/" element={<ContentCreate />} />
        <Route path="*" element={<NoPage />} /> {/* Fallback for unknown routes */}
      </Routes>
    </>
  );
}

// Main App component
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User-facing routes */}
        <Route path="/*" element={<UserLayout />} />

        {/* Admin routes (protected) */}
        <Route path="/admin/*" element={<ProtectedRoute element={<AdminLayout />} />} />

        {/* Auth routes */}
        <Route path="/auth" element={<LoginAuth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
