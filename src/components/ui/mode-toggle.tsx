import { Moon, Sun } from "lucide-react"
import { Button } from "./button"
import { useTheme } from "@/components/theme-provider"
import { useState } from "react"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [isTransitioning, setIsTransitioning] = useState(false)

  const toggleTheme = () => {
    setIsTransitioning(true)
    
    // Délai pour permettre l'animation de sortie
    setTimeout(() => {
      const newTheme = theme === "dark" ? "light" : "dark"
      setTheme(newTheme)
      setIsTransitioning(false)
    }, 150)
  }

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      className={`
        hover:bg-accent hover:text-accent-foreground 
        transition-all duration-300 ease-in-out
        ${isTransitioning ? 'animate-theme-out' : 'animate-theme-in'}
      `}
      aria-label="Basculer le thème"
    >
      {isTransitioning ? (
        <div className="opacity-0" />
      ) : theme === "dark" ? (
        <Sun 
          className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" 
          strokeWidth={1.5}
        />
      ) : (
        <Moon 
          className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" 
          strokeWidth={1.5}
        />
      )}
      <span className="sr-only">Basculer le thème</span>
    </Button>
  )
}
