// src/components/Lessons/LessonsList.js

import React from 'react';
import { Link } from 'react-router-dom';

const LessonsList = () => {
  const lessons = [
    { id: 1, title: 'Beginner Words and Phrases' },
    { id: 2, title: 'Common Phrases to Learn' },
    { id: 3, title: 'Nouns and Pronouns' },
  ];

  return (
    <div className="lessons-list">
      <h2>Lessons</h2>
      <ul>
        {lessons.map((lesson) => (
          <li key={lesson.id}>
            <Link to={`/lesson/${lesson.id}`}>{lesson.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LessonsList;