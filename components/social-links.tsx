import { Facebook, Instagram } from "lucide-react"

export function SocialLinks() {
  return (
    <div className="flex justify-center space-x-6">
      <a
        href="https://www.facebook.com/CBDBerguois"
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand-blue dark:text-brand-blue-300 hover:text-brand-green dark:hover:text-brand-green-300 transition-colors"
        aria-label="Facebook - CBDBerguois"
      >
        <Facebook className="h-8 w-8" />
      </a>
      <a
        href="https://www.instagram.com/chanvre_vert_officiel_/"
        target="_blank"
        rel="noopener noreferrer" 
        className="text-brand-blue dark:text-brand-blue-300 hover:text-brand-green dark:hover:text-brand-green-300 transition-colors"
        aria-label="Instagram - chanvre_vert_officiel_"
      >
        <Instagram className="h-8 w-8" />
      </a>
    
    </div>
  )
}

