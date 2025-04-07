import { Facebook, Instagram, Twitter } from "lucide-react"

export function SocialLinks() {
  return (
    <div className="flex justify-center space-x-6">
      <a
        href="#"
        className="text-brand-blue dark:text-brand-blue-300 hover:text-brand-green dark:hover:text-brand-green-300 transition-colors"
        aria-label="Facebook"
      >
        <Facebook className="h-8 w-8" />
      </a>
      <a
        href="#"
        className="text-brand-blue dark:text-brand-blue-300 hover:text-brand-green dark:hover:text-brand-green-300 transition-colors"
        aria-label="Instagram"
      >
        <Instagram className="h-8 w-8" />
      </a>
      <a
        href="#"
        className="text-brand-blue dark:text-brand-blue-300 hover:text-brand-green dark:hover:text-brand-green-300 transition-colors"
        aria-label="Twitter"
      >
        <Twitter className="h-8 w-8" />
      </a>
    </div>
  )
}

