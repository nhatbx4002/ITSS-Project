'use client'

import React from 'react'
import dayjs from 'dayjs'

export default function MonthlyCalendar() {
  const currentDate = dayjs()
  const startOfMonth = currentDate.startOf('month')
  const daysInMonth = currentDate.daysInMonth()
  const startDay = startOfMonth.day()

  const days = Array.from({ length: startDay + daysInMonth }, (_, index) => {
    const day = index - startDay + 1
    return day > 0 ? day : -1
  })

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {currentDate.format('MMMM YYYY')}
      </h2>

      <div className="grid grid-cols-7 gap-4 text-center font-semibold">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-gray-500">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-4 mt-2 text-center">
        {days.map((day, idx) => {
          const isToday =
            day > 0 && currentDate.date(day).isSame(dayjs(), 'day')

          return (
            <div
              key={idx}
              className={`aspect-square flex items-center justify-center rounded-lg 
                ${day === -1 ? '' : 'bg-white-100'} 
                ${isToday ? 'bg-blue-500 text-white font-bold' : ''}`}
            >
              {day === -1 ? '' : day}
            </div>
          )
        })}
      </div>
    </div>
  )
}
