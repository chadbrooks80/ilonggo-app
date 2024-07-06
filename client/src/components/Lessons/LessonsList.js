// /frontend/src/components/LessonsList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LessonsList = () => {
  const [lessons, setLessons] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('http://localhost:5000/api/lessons/topics', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('Fetched lessons:', response.data);
        setLessons(response.data);
      } catch (err) {
        console.error("Error fetching lessons:", err.response ? err.response.data : err.message);
        setError(err.message);
      }
    };

    fetchLessons();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="lessons-list">
      <h2>Lessons</h2>
      <ul>
        {lessons.map((lesson) => (
          <li key={lesson._id}>
            <Link to={`/lesson/${lesson._id}`}>{lesson.topic}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LessonsList;
