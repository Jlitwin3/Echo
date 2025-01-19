'use client'

import { useState, useRef, useEffect } from 'react'
import { Spinner } from './Spinner'

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
        sendAudioToBackend(audioBlob);
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

  const sendAudioToBackend = async (audioBlob: Blob) => {
    const formData = new FormData();
    formData.append('speech', audioBlob, 'speech.wav');

    try {
      const response = await fetch('/api/process-speech', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Backend request failed');
      }

      const data = await response.json();
      addMessage('user', data.userSpeech);
      addMessage('bot', data.botResponse);

      // Play audio response
      const audio = new Audio(`data:audio/wav;base64,${data.audioResponse}`);
      audio.play();
    } catch (error) {
      console.error('Error sending audio to backend:', error);
      addMessage('bot', 'Sorry, I encountered an error while processing your request.');
    }
  };

  const toggleRecording = () => {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  return (
    <div className="flex-1 relative">
      <Spinner isActive={isRecording} onClick={toggleRecording} />
    </div>
  )
}

