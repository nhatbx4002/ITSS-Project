// CircularProgressCard.tsx
'use client'

import React from 'react'
import {
  CircularProgressbar,
  buildStyles,
} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

type Props = {
  percentage: number
}

export default function CircularProgressCard({ percentage }: Props) {
  return (
      <div className="w-32 h-32">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          strokeWidth={10}
          styles={buildStyles({
            textColor: '#1e1e5a',
            pathColor: '#1e1e5a',
            trailColor: '#e6e6e6',
            textSize: '21px',
          })}
        />
    </div>
  )
}
