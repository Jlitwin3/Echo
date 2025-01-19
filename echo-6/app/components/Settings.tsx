import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

interface SettingsProps {
  toggleDarkMode: () => void
  darkMode: boolean
  onClose: () => void
  clearHistory: () => void
}

export default function Settings({ toggleDarkMode, darkMode, onClose, clearHistory }: SettingsProps) {
  return (
    <div className="fixed inset-0 futuristic-bg z-50 p-4 overflow-y-auto">
      <div className="flex items-center mb-4">
        <Button variant="ghost" size="icon" onClick={onClose} className="mr-2 blue-icon">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h2 className="text-2xl font-bold futuristic-glow">Settings</h2>
      </div>
      
      <section className="mb-6 futuristic-border p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-2 blue-icon">Accessibility Options</h3>
        <div className="flex items-center justify-between">
          <span>Dark Mode</span>
          <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
        </div>
      </section>
      
      <section className="mb-6 futuristic-border p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-2 blue-icon">Chat Options</h3>
        <Button variant="outline" className="w-full blue-icon" onClick={clearHistory}>Clear Chat History</Button>
      </section>
    </div>
  )
}

