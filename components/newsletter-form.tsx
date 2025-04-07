"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("") 
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Validation basique de l'email
    if (!email || !email.includes("@") || !email.includes(".")) {
      setStatus("error")
      setMessage("Veuillez entrer une adresse email valide.")
      return
    }
    
    setStatus("loading")
    setMessage("")
    
    try {
      // Vérifier si on est en mode développement local
      const isDevelopment = process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost';
      
      // Si on est en local, simuler une réponse réussie sans envoyer à Formspree
      if (isDevelopment) {
        console.log('Mode développement : email non envoyé à Formspree', email);
        // Simule une réponse réussie après 500ms
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Configuration pour le teste des messages en local
        setStatus("success");
        setShowSuccess(true);
        setMessage("[TEST LOCAL] Votre email serait enregistré en production. Les emails ne sont pas envoyés en développement.");
        setEmail("");
        return;
      }
      
      // En production, utiliser Formspree
      const response = await fetch("https://formspree.io/f/xvgkvvyl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
      
      if (response.ok) {
        setStatus("success")
        setShowSuccess(true) // Activer explicitement l'affichage du message
        setMessage("Merci ! Votre email a bien été enregistré. Vous recevrez nos actualités très bientôt.")
        setEmail("")
      } else {
        const data = await response.json()
        throw new Error(data.error || "Une erreur est survenue")
      }
    } catch (error) {
      console.error("Erreur:", error)
      setStatus("error")
      setMessage("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      // Ne pas réinitialiser le statut en cas de succès pour que le message reste visible
      if (status !== "success") {
        setStatus("idle")
      }
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="email"
            placeholder="Votre adresse email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white dark:bg-gray-800 border-brand-blue-200 dark:border-brand-blue-800 focus:border-brand-blue"
            disabled={status === "loading" || status === "success"}
          />
          <Button
            type="submit"
            className="bg-brand-green hover:bg-brand-green-600 text-white dark:bg-brand-green-600 dark:hover:bg-brand-green-500"
            disabled={status === "loading" || status === "success"}
          >
            {status === "loading" ? "Envoi..." : "S'inscrire"}
          </Button>
        </div>

        {status === "error" && (
          <div className="flex items-center text-red-600 dark:text-red-400 text-sm">
            <AlertCircle className="h-4 w-4 mr-1" />
            <span>{message}</span>
          </div>
        )}

        {(status === "success" || showSuccess) && (
          <div className="flex items-center text-brand-green-600 dark:text-brand-green-300 text-sm mt-2 p-2 bg-brand-green-50 dark:bg-brand-green-900/20 rounded-md border border-brand-green-200 dark:border-brand-green-800">
            <CheckCircle2 className="h-5 w-5 mr-2" />
            <span>{message}</span>
          </div>
        )}
      </form>
    </div>
  )
}

