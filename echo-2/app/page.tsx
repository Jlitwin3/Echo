'use client'

import { useState, useEffect } from 'react'
import Header from './components/Header'
import ChatWindow from './components/ChatWindow'
import InputSection from './components/InputSection'
import { Spinner } from './components/Spinner'
import Settings from './components/Settings'

interface Message {
  role: 'user' | 'bot'
  content: string
}

export default function Home() {
  const [darkMode, setDarkMode] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [isRecording, setIsRecording] = useState(false)
  const [spinnerActive, setSpinnerActive] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode(!darkMode)

  const addMessage = (role: 'user' | 'bot', content: string) => {
    setMessages(prevMessages => [...prevMessages, { role, content }])
  }

  const clearHistory = () => {
    setMessages([])
  }

  const toggleSettings = () => setSettingsOpen(!settingsOpen)

  return (
    <div className="flex flex-col h-screen futuristic-bg text-foreground">
      <Header toggleSettings={toggleSettings} />
      <div className="flex-1 relative">
        <Spinner isActive={spinnerActive} />
        <ChatWindow messages={messages} />
        <InputSection 
          addMessage={addMessage}
          isRecording={isRecording}
          setIsRecording={setIsRecording}
          setSpinnerActive={setSpinnerActive}
        />
      </div>
      {settingsOpen && (
        <Settings 
          toggleDarkMode={toggleDarkMode} 
          darkMode={darkMode} 
          onClose={toggleSettings}
          clearHistory={clearHistory}
        />
      )}
    </div>
  )
}

