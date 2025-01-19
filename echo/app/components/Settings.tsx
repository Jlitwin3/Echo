import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface SettingsProps {
  toggleDarkMode: () => void
  darkMode: boolean
  onClose: () => void
}

export default function Settings({ toggleDarkMode, darkMode, onClose }: SettingsProps) {
  return (
    <div className="fixed inset-0 futuristic-bg z-50 p-4 overflow-y-auto">
      <div className="flex items-center mb-4">
        <Button variant="ghost" size="icon" onClick={onClose} className="mr-2 blue-icon">
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h2 className="text-2xl font-bold futuristic-glow">Settings</h2>
      </div>
      
      <section className="mb-6 futuristic-border p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-2 blue-icon">Voice Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Voice Cloning</span>
            <Switch />
          </div>
          <div>
            <span>Pitch Adjustment</span>
            <Slider defaultValue={[50]} max={100} step={1} className="mt-2" />
          </div>
          <div>
            <span>Speed Adjustment</span>
            <Slider defaultValue={[50]} max={100} step={1} className="mt-2" />
          </div>
        </div>
      </section>
      
      <section className="mb-6 futuristic-border p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-2 blue-icon">Chatbot Behavior</h3>
        <div className="space-y-4">
          <div>
            <span>Typing Delay</span>
            <Select>
              <SelectTrigger className="w-full mt-2 futuristic-input">
                <SelectValue placeholder="Select typing delay" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="instant">Instant</SelectItem>
                <SelectItem value="simulated">Simulated</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" className="w-full blue-icon">Clear Chat History</Button>
        </div>
      </section>
      
      <section className="mb-6 futuristic-border p-4 rounded-lg">
        <h3 className="text-xl font-semibold mb-2 blue-icon">Accessibility Options</h3>
        <div className="flex items-center justify-between">
          <span>Dark Mode</span>
          <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
        </div>
      </section>
    </div>
  )
}

