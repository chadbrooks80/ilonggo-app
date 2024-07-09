import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flashcard from './Flashcard';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveTopicLessons } from '../../redux/language';
import './LessonDetail.css';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

const LessonDetail = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [error, setError] = useState(null);

  const activeTopic = useSelector(state => state.language.activeTopic);
  const activeTopicLessons = useSelector(state => state.language.activeTopicLessons);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!activeTopic) return;

    const fetchLesson = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.get(`${apiUrl}/lessons/${activeTopic}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('Fetched lesson:', response.data);
        dispatch(setActiveTopicLessons(response.data));
      } catch (err) {
        console.error("Error fetching lesson:", err.response ? err.response.data : err.message);
        setError(err.message);
      }
    };

    fetchLesson();
    setCurrentWordIndex(0)
  }, [activeTopic]);

  useEffect(() => {
    console.log('activeTopicLessons:', activeTopicLessons);
  }, [activeTopicLessons]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!activeTopic) {
    return <div>Click a Topic To Get Started</div>;
  }

  if (!activeTopicLessons) {
    return <div>loading....</div>;
  }

  const handlePrev = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentWordIndex < activeTopicLessons.words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    }
  };

  return (
    <>
      <h2>{activeTopicLessons.topic}</h2>
      <div className="lesson-detail">
        <div className="navigation">
          <button onClick={handlePrev} disabled={currentWordIndex === 0}>&lt;</button>
          <button onClick={handleNext} disabled={currentWordIndex === activeTopicLessons.words.length - 1}>&gt;</button>
          <div className="flashcard-container">
            <Flashcard {...activeTopicLessons.words[currentWordIndex]} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LessonDetail;
