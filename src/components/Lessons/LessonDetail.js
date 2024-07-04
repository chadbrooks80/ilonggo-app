// src/components/Lessons/LessonDetail.js

import React, { useState } from 'react';
import Flashcard from './Flashcard';
import { useParams } from 'react-router-dom';

const LessonDetail = () => {
  const { id } = useParams();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const lessons = {
    1: { 
      title: 'Beginner Words and Phrases', 
      words: [
        { english: 'Hello', ilonggo: 'Kumusta', audio: 'hello.mp3' },
        { english: 'Goodbye', ilonggo: 'Paalam', audio: 'goodbye.mp3' },
        { english: 'Thank you', ilonggo: 'Salamat', audio: 'thank_you.mp3' }
      ] 
    },
    2: { 
      title: 'Common Phrases to Learn', 
      words: [
        { english: 'How are you?', ilonggo: 'Kumusta ka?', audio: 'how_are_you.mp3' },
        { english: 'Good morning', ilonggo: 'Maayong aga', audio: 'good_morning.mp3' },
        { english: 'Good evening', ilonggo: 'Maayong gabi-i', audio: 'good_evening.mp3' }
      ] 
    },
    3: { 
      title: 'Nouns and Pronouns', 
      words: [
        { english: 'I', ilonggo: 'Ako', audio: 'i.mp3' },
        { english: 'You', ilonggo: 'Ikaw', audio: 'you.mp3' },
        { english: 'We', ilonggo: 'Kita', audio: 'we.mp3' }
      ] 
    },
  };
  const lesson = lessons[id];

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
      <h2>{lesson.title}</h2>
      <div className="navigation">
        <button onClick={handlePrev} disabled={currentWordIndex === 0}>&lt;</button>
        <Flashcard {...lesson.words[currentWordIndex]} />
        <button onClick={handleNext} disabled={currentWordIndex === lesson.words.length - 1}>&gt;</button>
      </div>
    </div>
  );
};

export default LessonDetail;
