// src/components/Lesson/Flashcard.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';

const Flashcard = ({ english, ilonggo, audio }) => {
  const [flipped, setFlipped] = useState(false);
  const [audioSrc, setAudioSrc] = useState(null);

  useEffect(() => {
    const audioPath = `${process.env.PUBLIC_URL}/assets/audio/${audio}`;
    fetch(audioPath)
      .then((response) => {
        if (response.ok) {
          setAudioSrc(audioPath);
        } else {
          console.error(`Audio file not found: ${audio}`);
          setAudioSrc(null);
        }
      })
      .catch((err) => {
        console.error(`Error fetching audio file: ${audio}`, err);
        setAudioSrc(null);
      });
  }, [audio]);

  const playAudio = () => {
    if (audioSrc) {
      const audioElement = new Audio(audioSrc);
      audioElement.play();
    }
  };

  return (
    <div onClick={() => setFlipped(!flipped)} className={`flashcard ${flipped ? 'flipped' : ''}`}>
      <div className="front">{english}</div>
      <div className="back">
        {ilonggo}
        <FontAwesomeIcon icon={faVolumeUp} onClick={playAudio} style={{ cursor: 'pointer', fontSize: '24px' }} />
        {audioSrc && <audio src={audioSrc} style={{ display: 'none' }} />}
      </div>
    </div>
  );
};

export default Flashcard;
