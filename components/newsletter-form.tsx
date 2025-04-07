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
      // Utilisation de Formspree pour collecter les emails
      const response = await fetch("https://formspree.io/f/xvgkvvyl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
      
      if (response.ok) {
        setStatus("success")
        setMessage("Merci ! Vous recevrez nos actualités très bientôt.")
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
      setStatus("idle")
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

        {status === "success" && (
          <div className="flex items-center text-brand-green dark:text-brand-green-300 text-sm">
            <CheckCircle2 className="h-4 w-4 mr-1" />
            <span>{message}</span>
          </div>
        )}
      </form>
    </div>
  )
}

