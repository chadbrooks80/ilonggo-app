// /client/src/App.js
import React from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import LessonsList from './components/Lessons/LessonsList';
import LessonDetail from './components/Lessons/LessonDetail';
import ProtectedRoute from './components/ProtectedRoute';
import FlashcardPage from './components/Lessons/FlashcardPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/lesson/:id" element={<ProtectedRoute><LessonDetail /></ProtectedRoute>} />
          {/* <Route path="/lesson" element={<ProtectedRoute><LessonsList /></ProtectedRoute>} /> */}
          <Route path="/lesson" element={<ProtectedRoute><FlashcardPage /></ProtectedRoute>} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
