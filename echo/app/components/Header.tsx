import { Settings, PlayCircle, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface HeaderProps {
  toggleSettings: () => void
}

export default function Header({ toggleSettings }: HeaderProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const toggleAudio = () => {
    setIsPlaying(!isPlaying)
    // Add actual audio playback logic here
  }

  return (
    <header className="flex justify-between items-center p-4 border-b futuristic-border">
      <Button variant="ghost" size="icon" onClick={toggleAudio} className="text-foreground hover:text-primary blue-icon">
        {isPlaying ? <VolumeX className="h-6 w-6" /> : <PlayCircle className="h-6 w-6" />}
      </Button>
      <h1 className="text-2xl font-bold futuristic-glow absolute left-1/2 transform -translate-x-1/2">ECHO</h1>
      <Button variant="ghost" size="icon" onClick={toggleSettings} className="text-foreground hover:text-primary blue-icon">
        <Settings className="h-6 w-6" />
      </Button>
    </header>
  )
}

