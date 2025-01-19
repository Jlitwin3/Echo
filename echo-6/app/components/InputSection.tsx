'use client'

import { useState } from 'react'
import styles from './InputSection.module.css'

interface InputSectionProps {
  addMessage: (role: 'user' | 'bot', content: string) => void
}

export default function InputSection({ addMessage }: InputSectionProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleSpeak = async () => {
    setIsActive(true);
    setIsProcessing(true);
    try {
      const response = await fetch('http://localhost:5000/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ speech: 'start' }),
      });

      if (!response.ok) {
        throw new Error('Failed to process speech');
      }

      const data = await response.json();
      
      if (data.userSpeech) {
        addMessage('user', data.userSpeech);
      }
      if (data.botResponse) {
        addMessage('bot', data.botResponse);
      }
    } catch (error) {
      console.error('Error:', error);
      addMessage('bot', `Error: ${error.message}`);
    } finally {
      setIsProcessing(false);
      setIsActive(false);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <button 
        onClick={handleSpeak} 
        disabled={isProcessing}
        className={`${styles.spinner} ${isActive ? styles.active : ''}`}
        aria-label={isProcessing ? "Processing speech" : "Start speaking"}
      >
        <div className={styles.spinner1}></div>
      </button>
    </div>
  );
}

