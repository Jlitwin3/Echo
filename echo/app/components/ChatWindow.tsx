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
        className="w-full max-w-md h-[calc(40vh-20px)] p-4 rounded-lg bg-black bg-opacity-50 backdrop-blur-md border border-cyan-500 shadow-lg shadow-cyan-500/50 overflow-y-auto"
      >
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`mb-4 p-3 rounded ${
              message.role === 'user' 
                ? 'bg-blue-900 bg-opacity-50 text-cyan-300 border-l-4 border-cyan-500' 
                : 'bg-green-900 bg-opacity-50 text-green-300 border-r-4 border-green-500'
            }`}
          >
            <span className="font-bold text-xs uppercase tracking-wider mb-1 block">
              {message.role === 'user' ? 'You' : 'ECHO'}
            </span>
            <p className="font-mono text-sm leading-relaxed">{message.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

