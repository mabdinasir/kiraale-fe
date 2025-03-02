'use client' // This is a client component 👈🏽

import React, { useEffect, useRef, useState } from 'react'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import { FiBell, FiDollarSign, FiShoppingCart, FiTruck } from 'react-icons/fi'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import ReusableLink from '@components/Links/ReusableLink'

const Notifications = () => {
    const t = useTranslations()
    const notificationsMenuRef = useRef<HTMLDivElement>(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationsMenuRef.current && !notificationsMenuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <li className="dropdown inline-block relative">
            <button
                className="dropdown-toggle h-8 w-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-[20px] text-center bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-100 dark:border-gray-800 text-slate-900 dark:text-white rounded-md"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <FiBell className="h-4 w-4"></FiBell>
                <span className="absolute top-0 end-0 flex items-center justify-center bg-red-600 text-white text-[10px] font-bold rounded-md w-2 h-2 after:content-[''] after:absolute after:h-2 after:w-2 after:bg-red-600 after:top-0 after:end-0 after:rounded-md after:animate-ping"></span>
            </button>

            <div
                ref={notificationsMenuRef}
                className={`${isMenuOpen ? 'show' : 'hidden'} dropdown-menu absolute end-0 m-0 mt-4 z-10 w-64 rounded-md overflow-hidden bg-white dark:bg-slate-900 shadow dark:shadow-gray-700`}
            >
                <span className="px-4 py-4 flex justify-between">
                    <span className="font-semibold">{t('notifications')} </span>
                    <span className="flex items-center justify-center bg-red-600/20 text-red-600 text-[10px] font-bold rounded-md w-5 max-h-5 ms-1">
                        3
                    </span>
                </span>
                <SimpleBar className="h-64">
                    <ul className="py-2 text-start h-64 border-t border-gray-100 dark:border-gray-800">
                        <li>
                            <ReusableLink href="#!" className="block font-medium py-1.5 px-4">
                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-md shadow shadow-green-600/10 dark:shadow-gray-700 bg-green-600/10 dark:bg-slate-800 text-green-600 dark:text-white flex items-center justify-center">
                                        <FiShoppingCart className="h-4 w-4" />
                                    </div>
                                    <div className="ms-2">
                                        <span className="text-[15px] font-medium block">Order Complete</span>
                                        <small className="text-slate-400">15 min ago</small>
                                    </div>
                                </div>
                            </ReusableLink>
                        </li>
                        <li>
                            <ReusableLink href="#!" className="block font-medium py-1.5 px-4">
                                <div className="flex items-center">
                                    <Image
                                        src="/images/client/03.jpg"
                                        width={40}
                                        height={40}
                                        className="h-10 w-10 rounded-md shadow dark:shadow-gray-700"
                                        alt=""
                                    />
                                    <div className="ms-2">
                                        <span className="text-[15px] font-medium block">
                                            <span className="font-semibold">Message</span> from Luis
                                        </span>
                                        <small className="text-slate-400">1 hour ago</small>
                                    </div>
                                </div>
                            </ReusableLink>
                        </li>
                        <li>
                            <ReusableLink href="#!" className="block font-medium py-1.5 px-4">
                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-md shadow shadow-green-600/10 dark:shadow-gray-700 bg-green-600/10 dark:bg-slate-800 text-green-600 dark:text-white flex items-center justify-center">
                                        <FiDollarSign data-feather="dollar-sign" className="h-4 w-4" />
                                    </div>
                                    <div className="ms-2">
                                        <span className="text-[15px] font-medium block">
                                            <span className="font-semibold">One Refund Request</span>
                                        </span>
                                        <small className="text-slate-400">2 hour ago</small>
                                    </div>
                                </div>
                            </ReusableLink>
                        </li>
                        <li>
                            <ReusableLink href="#!" className="block font-medium py-1.5 px-4">
                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-md shadow shadow-green-600/10 dark:shadow-gray-700 bg-green-600/10 dark:bg-slate-800 text-green-600 dark:text-white flex items-center justify-center">
                                        <FiTruck data-feather="truck" className="h-4 w-4" />
                                    </div>
                                    <div className="ms-2">
                                        <span className="text-[15px] font-medium block">Deliverd your Order</span>
                                        <small className="text-slate-400">Yesterday</small>
                                    </div>
                                </div>
                            </ReusableLink>
                        </li>
                        <li>
                            <ReusableLink href="#!" className="block font-medium py-1.5 px-4">
                                <div className="flex items-center">
                                    <Image
                                        src="/images/client/02.jpg"
                                        width={40}
                                        height={40}
                                        className="h-10 w-10 rounded-md shadow dark:shadow-gray-700"
                                        alt=""
                                    />
                                    <div className="ms-2">
                                        <span className="text-[15px] font-medium block">
                                            <span className="font-semibold">Cally</span> started following you
                                        </span>
                                        <small className="text-slate-400">2 days ago</small>
                                    </div>
                                </div>
                            </ReusableLink>
                        </li>
                    </ul>
                </SimpleBar>
            </div>
        </li>
    )
}

export default Notifications
