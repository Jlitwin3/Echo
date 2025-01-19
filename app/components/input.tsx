'use client'

import { useState, useRef, useEffect } from 'react'
import styles from './InputSection.module.css'

//import { Spinner } from './Spinner'

interface InputSectionProps {
  addMessage: (role: 'user' | 'bot', content: string) => void
}
export default function InputSection({ addMessage }: InputSectionProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const handleSpeak = async () => {
    setIsActive(true);
    setIsProcessing(true);

    try {
      
    addMessage('bot',"Ask a question for the bot to answer...", );
      //addMessage('user', data.user_response)
      //const apiUrl = "http://localhost:3000";

      console.log("API URL from .env.local:", apiUrl);
      const response = await fetch(`${apiUrl}/process`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ speech: "start" }),
      });
      const data = await response.json();
      addMessage('user', data.user_response)
      if (!response.ok) { 
        console.error("Error fetching from API:", Error);
      }

      if (data.user_speech) addMessage("user", data.user_response);
      if (data.ai_response) addMessage("bot", data.ai_response);
    } catch (error: unknown) { // ✅ This is where the fix is applied
      //console.error("Error:", error);
  
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
  
      addMessage("bot", `Error: ${errorMessage}`);
    } finally {
      setIsProcessing(false);
      setIsActive(false);
    }
  };
  
  
  // const handleSpeak = async () => {
  //   setIsActive(true);
  //   setIsProcessing(true);
  //   try {
  //     const response = await fetch('http://localhost:5000/process', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ speech: 'start' }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to process speech');
  //     }

  //     const data = await response.json();
      
  //     if (data.userSpeech) {
  //       addMessage('user', data.userSpeech);
  //     }
  //     if (data.botResponse) {
  //       addMessage('bot', data.botResponse);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     addMessage('bot', `Error: ${error.message}`);
  //   } finally {
  //     setIsProcessing(false);
  //     setIsActive(false);
  //   }
  // };
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