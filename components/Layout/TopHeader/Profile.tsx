'use client' // This is a client component 👈🏽

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import Button from '@components/UI/Button'
import useCurrentUser from '@hooks/useCurrentUser'
import { useAppDispatch } from '@hooks/rtkHooks'
import { useSignOutMutation } from '@store/services/auth'
import { clearToken } from '@store/slices/tokenSlice'
import ReusableLink from '@components/Links/ReusableLink'

const Profile = () => {
    const t = useTranslations()
    const dispatch = useAppDispatch()
    const currentUser = useCurrentUser()
    const [signout, { isLoading }] = useSignOutMutation()
    const profileMenuRef = useRef<HTMLDivElement>(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <li className="dropdown inline-block relative">
            <button className="dropdown-toggle items-center" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <span className="h-8 w-8 inline-flex items-center justify-center tracking-wide align-middle duration-500 text-[20px] text-center bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-100 dark:border-gray-800 text-slate-900 dark:text-white rounded-md">
                    <Image src="/images/client/03.jpg" width={30} height={30} className="rounded-md" alt="Profile" />
                </span>
            </button>

            <div
                ref={profileMenuRef}
                className={`${isMenuOpen ? 'show' : 'hidden'} dropdown-menu absolute end-0 m-0 mt-4 z-10 w-44 rounded-md overflow-hidden bg-white dark:bg-slate-900 shadow dark:shadow-gray-700`}
            >
                <ul className="py-2 text-start">
                    <li>
                        <ReusableLink
                            href="/dashboard/profile"
                            className="block py-1 px-4 dark:text-white/70 hover:text-green-600 dark:hover:text-white"
                        >
                            <i className="mdi mdi-account-outline me-2"></i>
                            {t('profile')}
                        </ReusableLink>
                    </li>
                    <li>
                        <ReusableLink
                            href="/dashboard/settings"
                            className="block py-1 px-3 dark:text-white/70 hover:text-green-600 dark:hover:text-white"
                        >
                            <i className="mdi mdi-cog-outline me-2"></i>
                            {t('settings')}
                        </ReusableLink>
                    </li>
                    <li className="border-t border-gray-100 dark:border-gray-800 my-2"></li>
                    <div className="py-2">
                        <Button
                            className="flex items-center px-4 py-2 text-base font-medium text-gray-800 hover:bg-red-100 hover:text-red-600 dark:text-gray-200 dark:hover:bg-red-600 dark:hover:text-white rounded w-full text-left"
                            isLoading={isLoading}
                            title={isLoading ? t('signing-out') : t('sign-out')}
                            redVariant
                            onClick={async () => {
                                if (currentUser) {
                                    await signout()
                                    dispatch(clearToken())
                                }
                            }}
                            icon={<i className="mdi mdi-logout me-1"></i>}
                        />
                    </div>
                </ul>
            </div>
        </li>
    )
}

export default Profile
