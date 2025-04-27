import React from 'react'
import { FaBan, FaRegClock, FaHourglassHalf } from 'react-icons/fa'
import { RiRadioButtonLine, RiMoneyDollarBoxFill } from 'react-icons/ri'
import { GiCarKey } from 'react-icons/gi'

const statuses = {
    AVAILABLE: {
        icon: React.createElement(RiRadioButtonLine, { className: 'fea icon-ex-md text-green-600 me-3 w-6 h-6' }),
        color: 'text-green-600',
    },
    SOLD: {
        icon: React.createElement(RiMoneyDollarBoxFill, { className: 'fea icon-ex-md text-blue-600 me-3 w-6 h-6' }),
        color: 'text-blue-600',
    },
    LEASED: {
        icon: React.createElement(GiCarKey, { className: 'fea icon-ex-md text-purple-600 me-3 w-6 h-6' }),
        color: 'text-purple-600',
    },
    PENDING: {
        icon: React.createElement(FaHourglassHalf, { className: 'fea icon-ex-md text-orange-500 me-3 w-6 h-6' }),
        color: 'text-orange-500',
    },
    REJECTED: {
        icon: React.createElement(FaBan, { className: 'fea icon-ex-md text-pink-600 me-3 w-6 h-6' }),
        color: 'text-pink-600',
    },
    EXPIRED: {
        icon: React.createElement(FaRegClock, {
            className: 'fea icon-ex-md text-amber-700 me-3 w-6 h-6',
        }),
        color: 'text-amber-700',
    },
}

export default statuses
