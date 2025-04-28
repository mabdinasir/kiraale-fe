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
import { useGetUserByIdQuery } from '@store/services/users'
import { Role } from '@models/user'

const TopHeaderProfileMenu = () => {
    const t = useTranslations()
    const dispatch = useAppDispatch()
    const currentUser = useCurrentUser()
    const id = currentUser?.id
    const { data: userData } = useGetUserByIdQuery(id || '')
    const [signout, { isLoading }] = useSignOutMutation()
    const profileMenuRef = useRef<HTMLDivElement>(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const isAdmin = userData?.user?.role === Role.ADMIN || userData?.user?.role === Role.MODERATOR

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
                <span className="h-8 w-8 inline-flex items-center justify-center rounded-full overflow-hidden tracking-wide align-middle duration-500 text-[20px] text-center bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-100 dark:border-gray-800 text-slate-900 dark:text-white rounded-md">
                    <Image
                        src={userData?.user?.profilePicture || '/images/profile/profile-picture-3.jpg'}
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                        alt="Profile"
                    />
                </span>
            </button>

            <div
                ref={profileMenuRef}
                className={`${isMenuOpen ? 'show' : 'hidden'} dropdown-menu absolute end-0 m-0 mt-4 z-10 w-52 rounded-md overflow-hidden bg-white dark:bg-slate-900 shadow dark:shadow-gray-700`}
            >
                <ul className="py-2 text-start">
                    <li>
                        <ReusableLink
                            href="/dashboard/profile"
                            className="block py-1 px-5 hover:text-green-600 dark:hover:text-white"
                        >
                            <i className="mdi mdi-account-outline me-2"></i>
                            {t('profile')}
                        </ReusableLink>
                    </li>

                    <li>
                        <ReusableLink
                            href="/dashboard/properties/my-properties"
                            className="block py-1 px-4 hover:text-green-600 dark:hover:text-white"
                        >
                            <i className="mdi mdi-view-dashboard me-2"></i>
                            {t('my-properties')}
                        </ReusableLink>
                    </li>

                    {isAdmin && (
                        <li>
                            <ReusableLink
                                href="/admin"
                                className="block py-1 px-4 hover:text-green-600 dark:hover:text-white"
                            >
                                <i className="mdi mdi-account-cog-outline me-2"></i>
                                {t('admin')}
                            </ReusableLink>
                        </li>
                    )}
                    {/* <li>
                        <ReusableLink
                            href="/dashboard/messages"
                            className="block py-1 px-3 hover:text-green-600 dark:hover:text-white"
                        >
                            <i className="mdi mdi-message-outline me-2"></i>
                            {t('messages')}
                        </ReusableLink>
                    {/* <li>
                        <ReusableLink
                            href="/dashboard/notifications"
                            className="block py-1 px-3 hover:text-green-600 dark:hover:text-white"
                        >
                            <i className="mdi mdi-bell-outline me-2"></i>
                            {t('notifications')}
                        </ReusableLink>
                    </li> */}
                    {/* <li>
                        <ReusableLink
                            href="/dashboard/settings"
                            className="block py-1 px-3 hover:text-green-600 dark:hover:text-white"
                        >
                            <i className="mdi mdi-cog-outline me-2"></i>
                            {t('settings')}
                        </ReusableLink>
                    </li> */}
                    <li className="border-t border-gray-100 dark:border-gray-800 my-2"></li>
                    <div className={`${!isLoading ? 'px-3' : ''}`}>
                        <Button
                            isLoading={isLoading}
                            title={isLoading ? t('signing-out') : t('sign-out')}
                            variant="red"
                            fullWidth
                            onClick={async () => {
                                if (userData?.user?.id && userData?.user?.isSignedIn) {
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

export default TopHeaderProfileMenu
