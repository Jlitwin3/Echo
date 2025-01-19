import { useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'bot'
  content: string
}

interface ChatWindowProps {
  messages: Message[]
}

export default function ChatWindow({ messages }: ChatWindowProps) {
  const textBoxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (textBoxRef.current) {
      textBoxRef.current.scrollTop = textBoxRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="absolute bottom-28 left-0 right-0 px-4 flex justify-center">
      <div 
        ref={textBoxRef}
        className="w-full max-w-md h-[calc(40vh-20px)] p-4 rounded-lg bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-50 backdrop-blur-md border border-blue-300 dark:border-cyan-500 shadow-lg shadow-blue-500/30 dark:shadow-cyan-500/50 overflow-y-auto"
      >
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`mb-4 p-3 rounded ${
              message.role === 'user' 
                ? 'bg-blue-100 dark:bg-blue-900 bg-opacity-50 dark:bg-opacity-50 text-blue-800 dark:text-cyan-300 border-l-4 border-blue-500 dark:border-cyan-500' 
                : 'bg-green-100 dark:bg-green-900 bg-opacity-50 dark:bg-opacity-50 text-green-800 dark:text-green-300 border-r-4 border-green-500'
            }`}
          >
            <span className="font-bold text-xs uppercase tracking-wider mb-1 block text-gray-600 dark:text-gray-400">
              {message.role === 'user' ? 'You' : 'ECHO'}
            </span>
            <p className="font-mono text-sm leading-relaxed">{message.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

