// /frontend/src/components/Lessons/LessonDetail.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flashcard from './Flashcard';
import { useParams } from 'react-router-dom';

const LessonDetail = () => {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get(`http://localhost:5000/api/lessons/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('Fetched lesson:', response.data);
        setLesson(response.data);
      } catch (err) {
        console.error("Error fetching lesson:", err.response ? err.response.data : err.message);
        setError(err.message);
      }
    };

    fetchLesson();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!lesson) {
    return <div>Loading...</div>;
  }

  const handlePrev = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentWordIndex < lesson.words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    }
  };

  return (
    <div className="lesson-detail">
      <h2>{lesson.topic}</h2>
      <div className="navigation">
        <button onClick={handlePrev} disabled={currentWordIndex === 0}>&lt;</button>
        <Flashcard {...lesson.words[currentWordIndex]} />
        <button onClick={handleNext} disabled={currentWordIndex === lesson.words.length - 1}>&gt;</button>
      </div>
    </div>
  );
};

export default LessonDetail;
