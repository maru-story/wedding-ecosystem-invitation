'use client'

import { useEffect, useState } from 'react'
import { parseJakartaDate } from '@/lib/date'

// Countdown component
const Countdown: React.FC<{ targetDate: string }> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const weddingDate = parseJakartaDate(targetDate).valueOf()
      const now = Date.now()
      const difference = weddingDate - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((difference / 1000 / 60) % 60)
        const seconds = Math.floor((difference / 1000) % 60)

        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        // If wedding date has passed
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    // Initial calculation
    calculateTimeLeft()

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000)

    // Clean up interval on unmount
    return () => clearInterval(timer)
  }, [targetDate, setTimeLeft])

  return (
    <>
      <CountdownUnit value={timeLeft.days} label="DAYS" />
      <CountdownUnit value={timeLeft.hours} label="HOURS" />
      <CountdownUnit value={timeLeft.minutes} label="MINUTES" />
      <CountdownUnit value={timeLeft.seconds} label="SECONDS" />
    </>
  )
}

// Individual countdown unit (number and label)
const CountdownUnit: React.FC<{ value: number; label: string }> = ({
  value,
  label,
}) => {
  return (
    <div className="col-span-6 flex flex-col items-center">
      <div className="min-w-[50px] text-center">
        <span className="font-milk-honey text-4xl sm:text-5xl font-semibold text-[#A87C86]">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="font-milk-honey text-sm text-[#896B58]">{label}</span>
    </div>
  )
}

export default Countdown
