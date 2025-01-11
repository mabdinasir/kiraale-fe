'use client'
import React, { FC } from 'react'

import CountUp from 'react-countup'

type CounterProps = {
    start: number
    end: number
}

const Counter: FC<CounterProps> = ({ start, end }) => <CountUp className="counter-value" start={start} end={end} />

export default Counter
