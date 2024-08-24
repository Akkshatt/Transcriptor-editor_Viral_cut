import React, { useState, useEffect, useRef } from 'react';
import Modal from './Modal';
import './TranscriptEditor.css';

const TranscriptEditor = ({ initialTranscript }) => {
    const [transcript, setTranscript] = useState(initialTranscript);
    const [currentTime, setCurrentTime] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentWordIndex, setCurrentWordIndex] = useState(null);
    const [currentWord, setCurrentWord] = useState('');
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = setInterval(() => {
                setCurrentTime((prevTime) => {
                    const nextTime = prevTime + 100; 
                    const endTime = transcript[transcript.length - 1].start_time + transcript[transcript.length - 1].duration;

                   
                    if (nextTime >= endTime) {
                        clearInterval(intervalRef.current);
                        setIsPlaying(false);
                        return endTime;
                    }
                    return nextTime;
                });
            }, 100);
        } else if (!isPlaying && intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isPlaying, transcript]);

    const handlePlay = () => {
      
        if (currentTime >= transcript[transcript.length - 1].start_time + transcript[transcript.length - 1].duration) {
            setCurrentTime(0);
        }
        setIsPlaying(true);
    };

    const handlePause = () => {
        setIsPlaying(false);
    };

    const handleWordClick = (index) => {
        setCurrentWordIndex(index);
        setCurrentWord(transcript[index].word);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleModalContinue = () => {
        const updatedTranscript = [...transcript];
        updatedTranscript[currentWordIndex].word = currentWord;
        setTranscript(updatedTranscript);
        setIsModalOpen(false);
    };

    return (
        <div className="transcript-editor">
            <button onClick={handlePlay} className="play-btn">Play</button>
            <button onClick={handlePause} className="pause-btn">Pause</button>
            <div className="transcript-container">
                {transcript.map((item, index) => (
                    <span
                        key={index}
                        onClick={() => handleWordClick(index)}
                        className={`transcript-word ${currentTime >= item.start_time && currentTime < item.start_time + item.duration ? 'highlighted' : ''}`}
                    >
                        {item.word}{' '}
                    </span>
                ))}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onContinue={handleModalContinue}
                word={currentWord}
                setWord={setCurrentWord}
            />
        </div>
    );
};

export default TranscriptEditor;
