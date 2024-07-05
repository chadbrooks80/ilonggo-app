// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Lessons from './components/Lessons';
import LessonDetail from './components/Lessons/LessonDetail';
import LoginPage from './components/LoginPage';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/lesson" element={<Lessons />} />
          <Route path="/lesson/:id" element={<LessonDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
