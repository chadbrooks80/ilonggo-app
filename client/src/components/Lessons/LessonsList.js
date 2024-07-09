// /frontend/src/components/LessonsList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { setTopics, setActiveTopic } from '../../redux/language';



const apiUrl = process.env.REACT_APP_API_BASE_URL


const LessonsList = () => {
  const [error, setError] = useState(null);
  
  const topics = useSelector(state => state.language.topics) || []

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get(`${apiUrl}/lessons/topics`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        dispatch(setTopics(response.data))


      } catch (err) {
        setError(err.message);
        console.log("yup, you gone fucked up")
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
        {Array.isArray(topics) && topics.length > 0 ? (
            topics.map((topic) => (
              <li key={topic._id} onClick={() => {dispatch(setActiveTopic(topic._id))}}>
                {topic.topic}
              </li>
            ))
          ) : (
            <li>No topics available</li>
          )}
      </ul>
    </div>
  );
};

export default LessonsList;
