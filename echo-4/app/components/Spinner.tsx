import { Mic, Square } from 'lucide-react'

interface SpinnerProps {
  isActive: boolean;
  onClick: () => void;
}

export function Spinner({ isActive, onClick }: SpinnerProps) {
  return (
    <button
      onClick={onClick}
      className={`fixed top-[90px] left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 w-[180px] h-[180px] rounded-full flex items-center justify-center ${
        isActive ? 'bg-red-500' : 'bg-blue-500'
      } hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 overflow-hidden`}
      aria-label={isActive ? "Stop recording" : "Start recording"}
    >
      <div className={`spinner ${isActive ? 'active' : ''}`}>
        <div className="spinner1"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        {isActive ? (
          <Square className="h-16 w-16 text-white opacity-70 glow-icon" />
        ) : (
          <Mic className="h-16 w-16 text-white opacity-70 glow-icon" />
        )}
      </div>
    </button>
  );
}

