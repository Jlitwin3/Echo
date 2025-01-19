'use client'

import { useState, useEffect } from 'react'
import Header from './components/Header'
import ChatWindow from './components/ChatWindow'
import InputSection from './components/InputSection'
import { Spinner } from './components/Spinner'

interface Message {
  role: 'user' | 'bot'
  content: string
}

export default function Home() {
  const [darkMode, setDarkMode] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const [showSpinner, setShowSpinner] = useState(false)
  const [spinnerFadeOut, setSpinnerFadeOut] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode(!darkMode)

  const addMessage = (role: 'user' | 'bot', content: string) => {
    setMessages(prevMessages => [...prevMessages, { role, content }])
  }

  return (
    <div className="flex flex-col h-screen futuristic-bg text-foreground">
      <Header toggleDarkMode={toggleDarkMode} />
      <div className="flex-1 relative">
        {showSpinner && <Spinner fadeOut={spinnerFadeOut} />}
        <ChatWindow messages={messages} />
        <InputSection 
          addMessage={addMessage}
          isRecording={isRecording}
          setIsRecording={setIsRecording}
          setShowSpinner={setShowSpinner}
          setSpinnerFadeOut={setSpinnerFadeOut}
        />
      </div>
    </div>
  )
}

