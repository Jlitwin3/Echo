'use client'

import { useState } from 'react'
import { Mic } from 'lucide-react'

interface InputSectionProps {
  addMessage: (role: 'user' | 'bot', content: string) => void
  isRecording: boolean
  setIsRecording: (isRecording: boolean) => void
  setShowSpinner: (showSpinner: boolean) => void
  setSpinnerFadeOut: (spinnerFadeOut: boolean) => void
}

export default function InputSection({
  addMessage,
  isRecording,
  setIsRecording,
  setShowSpinner,
  setSpinnerFadeOut
}: InputSectionProps) {
  const handleSend = async (message: string) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response from the server')
      }

      const data = await response.json()
      addMessage('bot', data.response)
    } catch (error) {
      console.error('Error:', error)
      addMessage('bot', 'Sorry, I encountered an error while processing your request.')
    }
  }

  const toggleRecording = () => {
    if (!isRecording) {
      // Start recording
      setIsRecording(true)
      setShowSpinner(true)
      setSpinnerFadeOut(false)
    } else {
      // Stop recording and process
      stopRecording()
    }
  }

  const stopRecording = () => {
    setIsRecording(false)
    setSpinnerFadeOut(true)
    
    // Simulate voice message after fade-out
    setTimeout(() => {
      setShowSpinner(false)
      const simulatedMessage = 'This is a simulated voice message.'
      addMessage('user', simulatedMessage)
      // Use the API to get a response
      handleSend(simulatedMessage)
    }, 500) // Match this with the CSS transition duration
  }

  return (
    <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center">
      <button 
        onClick={toggleRecording} 
        className="button w-20 h-20 rounded-full"
      >
        <Mic className={`h-10 w-10 svg-icon ${isRecording ? 'text-red-500' : 'text-blue-500'}`} />
        <span className="lable text-sm">{isRecording ? 'Stop' : 'Speak'}</span>
      </button>
    </div>
  )
}

