'use client' // This is a client component 👈🏽

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const Languages = () => {
    const t = useTranslations()

    const languagesMenuRef = useRef<HTMLDivElement>(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (languagesMenuRef.current && !languagesMenuRef.current.contains(event.target as Node)) {
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
                <Image
                    src="/images/flags/usa.png"
                    width={24}
                    height={24}
                    className="h-6 w-6 rounded-md"
                    alt="USA Flag"
                />
            </button>

            <div
                ref={languagesMenuRef}
                className={`${isMenuOpen ? 'show' : 'hidden'} dropdown-menu absolute end-0 m-0 mt-4 z-10 w-36 rounded-md overflow-hidden bg-white dark:bg-slate-900 shadow dark:shadow-gray-700`}
            >
                <ul className="list-none py-2 text-start">
                    <li className="my-1">
                        <Link
                            href=""
                            className="flex items-center text-[15px] font-medium py-1.5 px-4 dark:text-white/70 hover:text-green-600 dark:hover:text-white"
                        >
                            <Image
                                src="/images/flags/usa.png"
                                width={24}
                                height={24}
                                className="h-6 w-6 rounded-md me-2 shadow dark:shadow-gray-700"
                                alt="USA Flag"
                            />{' '}
                            {t('english')}
                        </Link>
                    </li>
                    <li className="my-1">
                        <Link
                            href=""
                            className="flex items-center text-[15px] font-medium py-1.5 px-4 dark:text-white/70 hover:text-green-600 dark:hover:text-white"
                        >
                            <Image
                                src="/images/flags/spain.png"
                                width={24}
                                height={24}
                                className="h-6 w-6 rounded-md me-2 shadow dark:shadow-gray-700"
                                alt="Spain Flag"
                            />{' '}
                            {t('somali')}
                        </Link>
                    </li>
                </ul>
            </div>
        </li>
    )
}

export default Languages
