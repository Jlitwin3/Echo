interface ChatBubbleProps {
  message: string;
  isUser: boolean;
}

export function ChatBubble({ message, isUser }: ChatBubbleProps) {
  return (
    <div className={`p-3 rounded-lg ${isUser ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 text-black self-start'}`}>
      {message}
    </div>
  )
}

