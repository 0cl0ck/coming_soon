import Image from "next/image"
import { NewsletterForm } from "@/components/newsletter-form"
import { SocialLinks } from "@/components/social-links"
import { ThemeToggle } from "@/components/theme-toggle"

export default function ComingSoonPage() {
  // Pas de date de lancement spécifique

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-gray-950 p-4 md:p-8">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="container max-w-4xl mx-auto flex flex-col items-center text-center">
        <div className="mb-8 relative w-40 h-40 md:w-48 md:h-48">
          <Image src="/logo.png" alt="Logo Chanvre-Vert" width={192} height={192} className="rounded-full" priority />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-brand-blue dark:text-brand-blue-100 mb-4">
          Chanvre-Vert.fr
        </h1>

        <h1 className="text-3xl md:text-4xl font-bold text-brand-green dark:text-brand-green-300 mb-4 max-w-2xl">
          Le site revient bientôt 🌿
        </h1>
        <p className="text-xl md:text-2xl text-brand-green dark:text-brand-green-300 mb-8 max-w-2xl">
          Un nouveau site est en train de germer! Revenez dans quelques jours
        </p>



        <div className="w-full max-w-md mb-12">
          <h2 className="text-xl font-semibold text-brand-green dark:text-brand-green-300 mb-4">
            Soyez informé du lancement
          </h2>
          <NewsletterForm />
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-brand-green dark:text-brand-green-300 mb-4">Suivez-nous</h2>
          <SocialLinks />
        </div>

        <footer className="text-sm text-brand-blue-400 dark:text-brand-blue-300 mt-8">
          &copy; {new Date().getFullYear()} Chanvre-Vert.fr - Tous droits réservés
        </footer>
      </div>
    </main>
  )
}

