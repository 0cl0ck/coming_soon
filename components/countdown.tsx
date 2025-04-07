"use client"

import { useEffect, useState } from "react"

interface CountdownProps {
  targetDate: Date
}

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="grid grid-cols-4 gap-2 md:gap-4 text-center">
      <div className="flex flex-col items-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 md:p-4 w-full border border-brand-blue-100 dark:border-brand-blue-800">
          <span className="text-2xl md:text-4xl font-bold text-brand-blue dark:text-brand-blue-100">
            {timeLeft.days}
          </span>
        </div>
        <span className="text-sm md:text-base text-brand-green dark:text-brand-green-300 mt-2">Jours</span>
      </div>

      <div className="flex flex-col items-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 md:p-4 w-full border border-brand-blue-100 dark:border-brand-blue-800">
          <span className="text-2xl md:text-4xl font-bold text-brand-blue dark:text-brand-blue-100">
            {timeLeft.hours}
          </span>
        </div>
        <span className="text-sm md:text-base text-brand-green dark:text-brand-green-300 mt-2">Heures</span>
      </div>

      <div className="flex flex-col items-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 md:p-4 w-full border border-brand-blue-100 dark:border-brand-blue-800">
          <span className="text-2xl md:text-4xl font-bold text-brand-blue dark:text-brand-blue-100">
            {timeLeft.minutes}
          </span>
        </div>
        <span className="text-sm md:text-base text-brand-green dark:text-brand-green-300 mt-2">Minutes</span>
      </div>

      <div className="flex flex-col items-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 md:p-4 w-full border border-brand-blue-100 dark:border-brand-blue-800">
          <span className="text-2xl md:text-4xl font-bold text-brand-blue dark:text-brand-blue-100">
            {timeLeft.seconds}
          </span>
        </div>
        <span className="text-sm md:text-base text-brand-green dark:text-brand-green-300 mt-2">Secondes</span>
      </div>
    </div>
  )
}

