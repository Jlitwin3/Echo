import { Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  toggleSettings: () => void
}

export default function Header({ toggleSettings }: HeaderProps) {
  return (
    <header className="flex justify-between items-center p-4 border-b futuristic-border">
      <h1 className="text-2xl font-bold futuristic-glow absolute left-1/2 transform -translate-x-1/2">ECHO</h1>
      <Button variant="ghost" size="icon" onClick={toggleSettings} className="text-foreground hover:text-primary blue-icon">
        <Settings className="h-6 w-6" />
      </Button>
    </header>
  )
}

