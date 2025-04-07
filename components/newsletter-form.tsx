"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setStatus("error")
      setMessage("Veuillez entrer votre adresse email.")
      return
    }

    setStatus("loading")

    // Simuler un appel API
    setTimeout(() => {
      setStatus("success")
      setMessage("Merci ! Vous recevrez nos actualités très bientôt.")
      setEmail("")
    }, 1500)
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

