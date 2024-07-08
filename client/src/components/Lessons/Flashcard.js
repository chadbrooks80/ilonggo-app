// /frontend/src/components/Flashcard.js

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { Fade } from 'react-bootstrap';

const Flashcard = ({ english, ilonggo, word_id }) => {
  const [flipped, setFlipped] = useState(false);
  const [audioSrc, setAudioSrc] = useState(null);

  useEffect(() => {
    setFlipped(false);  // makes sure each flip shows the english word first. 

    const audioPath = `${process.env.PUBLIC_URL}/assets/audio/${word_id}.mp3`;
    fetch(audioPath)
      .then((response) => {
        if (response.ok) {
          setAudioSrc(audioPath);
        } else {
          console.error(`Audio file not found: ${word_id}.mp3`);
          setAudioSrc(null);
        }
      })
      .catch((err) => {
        console.error(`Error fetching audio file: ${word_id}.mp3`, err);
        setAudioSrc(null);
      });
  }, [word_id]);

  const playAudio = async (event) => {
    event.stopPropagation(); // Prevents the card from flipping when the audio button is clicked
    if (audioSrc) {

      const response = await fetch(audioSrc, { method: 'GET', headers: { Range: 'bytes=0-1' } });
      if(response.ok) {
        const contentType = response.headers.get('Content-Type');
        if(contentType && contentType.includes('audio/mpeg')) {
          const audioElement = new Audio(audioSrc);
          audioElement.play();
        }

      }
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
