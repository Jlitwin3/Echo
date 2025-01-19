'use client'

import { useState, useRef, useEffect } from 'react'
import { Mic } from 'lucide-react'

interface InputSectionProps {
  addMessage: (role: 'user' | 'bot', content: string) => void
  isRecording: boolean
  setIsRecording: (isRecording: boolean) => void
  setSpinnerActive: (isActive: boolean) => void
}

export default function InputSection({
  addMessage,
  isRecording,
  setIsRecording,
  setSpinnerActive
}: InputSectionProps) {
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const buttonSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    buttonSoundRef.current = new Audio('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sound-kIqi0sOr5p44CvKlKnXXddq4zzcVyN.mp3');
  }, []);

  const playButtonSound = () => {
    if (buttonSoundRef.current) {
      buttonSoundRef.current.currentTime = 0;
      buttonSoundRef.current.play().catch(error => console.error('Error playing sound:', error));
    }
  };

  const startRecording = async () => {
    try {
      playButtonSound();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const audioChunks: BlobPart[] = [];
      mediaRecorder.addEventListener("dataavailable", event => {
        audioChunks.push(event.data);
      });

      mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
      });

      mediaRecorder.start();
      setIsRecording(true);
      setSpinnerActive(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    playButtonSound();
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setSpinnerActive(false);
    }
  };

  const sendAudioToBackend = async () => {
    if (!audioBlob) return;

    const formData = new FormData();
    formData.append('speech', audioBlob, 'speech.wav');

    try {
      const response = await fetch('/api/process', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Backend request failed');
      }

      const data = await response.json();
      addMessage('user', 'Audio message sent');
      addMessage('bot', data.response);

      // Play audio response
      const audio = new Audio(`data:audio/wav;base64,${data.audio}`);
      audio.play();
    } catch (error) {
      console.error('Error sending audio to backend:', error);
      addMessage('bot', 'Sorry, I encountered an error while processing your request.');
    } finally {
      setAudioBlob(null);
    }
  };

  const toggleRecording = () => {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
      setTimeout(() => {
        sendAudioToBackend();
      }, 500);
    }
  };

  return (
    <div className="p-4 pt-10 flex justify-center items-center absolute bottom-0 left-0 right-0">
      <button 
        onClick={toggleRecording} 
        className="button w-20 h-20 rounded-full bg-blue-500 dark:bg-gray-800 hover:bg-blue-600 dark:hover:bg-gray-700 transition-colors duration-200"
        aria-label={isRecording ? "Stop recording" : "Start recording"}
      >
        <Mic className={`h-10 w-10 svg-icon ${isRecording ? 'text-red-500' : 'text-white dark:text-blue-500'}`} />
        <span className="lable text-sm text-white dark:text-blue-500">{isRecording ? 'Stop' : 'Speak'}</span>
      </button>
    </div>
  )
}

