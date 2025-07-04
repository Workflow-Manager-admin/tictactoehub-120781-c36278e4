import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Lobby from './pages/Lobby';
import Game from './pages/Game';
import Leaderboard from './pages/Leaderboard';

// Minimal color variables for the application based on provided theme in README.
const colorTheme = {
  '--primary': '#1976d2',
  '--secondary': '#9c27b0',
  '--accent': '#ffc107',
};

function applyColorTheme(theme = {}) {
  for (const key in theme) {
    if (Object.prototype.hasOwnProperty.call(theme, key)) {
      document.documentElement.style.setProperty(key, theme[key]);
    }
  }
}

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    applyColorTheme(colorTheme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <div className="App">
        <header className="navbar" style={{background: "var(--primary)", color: "var(--text-color)", padding: '0.7rem 2rem'}}>
          <nav style={{display: "flex", alignItems:"center", justifyContent:"space-between"}}>
            <div>
              <Link to="/" style={{textDecoration:'none', color: "#fff", fontWeight: 700, fontSize: '1.4rem', marginRight: 20}}>TicTacToeHub</Link>
              <Link to="/lobby" style={{marginRight: 16, color:"#fff"}}>Lobby</Link>
              <Link to="/leaderboard" style={{marginRight: 16, color: "#fff"}}>Leaderboard</Link>
            </div>
            <div>
              <Link to="/login" style={{marginRight: 10, color:"#fff"}}>Login</Link>
              <Link to="/register" style={{marginRight: 10, color:"#fff"}}>Register</Link>
              <button className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
                {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
              </button>
            </div>
          </nav>
        </header>
        <main className="container" style={{padding: "2rem 1rem", maxWidth:900, margin:"auto"}}>
          <Routes>
            <Route path="/" element={<Navigate to="/lobby" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/lobby" element={<Lobby />} />
            <Route path="/games/:gameId" element={<Game />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="*" element={<h2>Page Not Found</h2>} />
          </Routes>
        </main>
        <footer style={{textAlign:"center", color:"var(--secondary)", padding:"2rem 0 1rem 0", background:"var(--bg-secondary)"}}>
          <span>© {new Date().getFullYear()} TicTacToeHub. All rights reserved.</span>
        </footer>
      </div>
    </Router>
  );
}

export default App;
