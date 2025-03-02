'use client' // This is a client component 👈🏽

import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { useTranslations } from 'next-intl'

const LanguageSelector = () => {
    const t = useTranslations()
    const router = useRouter()

    const languagesMenuRef = useRef<HTMLDivElement>(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const localeToFlagFile: { [key: string]: string } = {
        so: '/images/languages/so.svg',
        en: '/images/languages/en.svg',
    }

    const availableLanguages = [
        { key: 'so', name: 'somali' },
        { key: 'en', name: 'english' },
    ]

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (languagesMenuRef.current && !languagesMenuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const currentLocale = window.location.pathname.split('/')[1]
    const selectedLanguage = availableLanguages.find((lang) => lang.key === currentLocale) || availableLanguages[0]

    const handleLanguageChange = (language: { key: string; name: string }) => {
        const newPath = `/${language.key}${window.location.pathname.substring(currentLocale.length + 1)}`
        router.push(newPath)
        setIsMenuOpen(false)
    }

    return (
        <li className="dropdown inline-block relative">
            <button
                className="dropdown-toggle h-8 w-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-[20px] text-center bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-100 dark:border-gray-800 text-slate-900 dark:text-white rounded-md"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <Image
                    src={localeToFlagFile[selectedLanguage.key]}
                    width={24}
                    height={24}
                    className="h-6 w-6 rounded-md"
                    alt={`${selectedLanguage.key} flag`}
                />
            </button>

            <div
                ref={languagesMenuRef}
                className={`${isMenuOpen ? 'show' : 'hidden'} dropdown-menu absolute end-0 m-0 mt-4 z-10 w-36 rounded-md overflow-hidden bg-white dark:bg-slate-900 shadow dark:shadow-gray-700`}
            >
                <ul className="list-none py-2 text-start">
                    {availableLanguages.map((language) => (
                        <li key={language.key} className="my-1">
                            <button
                                onClick={() => handleLanguageChange(language)}
                                className="flex items-center text-[15px] font-medium py-1.5 px-4 dark:text-white/70 hover:text-green-600 dark:hover:text-white w-full text-left"
                            >
                                <Image
                                    src={localeToFlagFile[language.key]}
                                    width={24}
                                    height={24}
                                    className="h-6 w-6 rounded-md me-2 shadow dark:shadow-gray-700"
                                    alt={`${language.key} flag`}
                                />
                                {t(language.name.toLowerCase())}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </li>
    )
}

export default LanguageSelector
