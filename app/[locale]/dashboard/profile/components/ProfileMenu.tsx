'use client' // This is a client component 👈🏽

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useSignOutMutation } from '@store/services/auth'
import { useAppDispatch } from '@hooks/rtkHooks'
import { clearToken } from '@store/slices/tokenSlice'
import useCurrentUser from '@hooks/useCurrentUser'
import Button from '@components/UI/Button'
import ReusableLink from '@components/Links/ReusableLink'
import { useGetUserByIdQuery } from '@store/services/users'
import { Role } from '@models/user'

const ProfileMenu = () => {
    const t = useTranslations()
    const dispatch = useAppDispatch()
    const currentUser = useCurrentUser()
    const id = currentUser?.id
    const { data: userData } = useGetUserByIdQuery(id || '')
    const isAdmin = userData?.user?.role === Role.ADMIN || userData?.user?.role === Role.MODERATOR

    const [isOpen, setIsOpen] = useState(false)
    const [signout, { isLoading }] = useSignOutMutation()

    const dropdownRef = useRef<HTMLDivElement>(null)

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false)
        }
    }

    const closeSidebar = () => {
        const isDesktop = window.matchMedia('(min-width: 992px)').matches
        if (isDesktop) return
        const sidebar = document.querySelector('.page-wrapper')
        sidebar?.classList.remove('toggled')
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            closeSidebar()
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <button
                id="dropdownUserAvatarButton"
                onClick={toggleDropdown}
                className="btn btn-icon bg-green-600 hover:bg-green-500 active:bg-green-700 border-green-600 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                type="button"
            >
                <span className="sr-only">{t('open-profile-menu')}</span>
                <Image
                    className="w-8 h-8 rounded-full"
                    src={userData?.user?.profilePicture || '/images/profile/profile-picture-3.jpg'}
                    alt="user photo"
                    width={32}
                    height={32}
                />
            </button>

            {/* Dropdown menu */}
            <div
                id="dropdownAvatar"
                className={`z-50 bg-white dark:bg-slate-900 divide-y divide-gray-200 rounded-lg shadow-lg w-52 absolute right-0 mt-2 ${
                    isOpen ? 'block' : 'hidden'
                }`}
            >
                {/* User Info */}
                <div className="px-4 py-3 text-base font-semibold">
                    <div className="font-bold">
                        <i className="mdi mdi-account me-1"></i>
                        {userData?.user?.firstName} {userData?.user?.lastName.charAt(0) ?? 'Loading...'}
                    </div>
                    <div className="flex items-center truncate">
                        <i className="font-bold mdi mdi-email me-1"></i>
                        <span className="text-sm text-center">{userData?.user?.email ?? 'Loading...'}</span>
                    </div>
                </div>

                {/* Menu Items */}
                <div onClick={() => setIsOpen(false)}>
                    <ul className="py-2 text-base font-medium" aria-labelledby="dropdownUserAvatarButton">
                        <li>
                            <ReusableLink
                                href={'/dashboard/profile'}
                                className="block px-3 py-2 hover:bg-green-100 hover:text-green-700 dark:hover:bg-gray-700 dark:hover:text-green-600 rounded"
                                onClick={closeSidebar}
                            >
                                <i className="mdi mdi-account me-2"></i>
                                {t('profile')}
                            </ReusableLink>
                        </li>

                        <li>
                            <ReusableLink
                                href={'/dashboard/properties/my-properties'}
                                className="block px-3 py-2 hover:bg-green-100 hover:text-green-700 dark:hover:bg-gray-700 dark:hover:text-green-600 rounded"
                                onClick={closeSidebar}
                            >
                                <i className="mdi mdi-home me-2"></i>
                                {t('my-properties')}
                            </ReusableLink>
                        </li>

                        <li>
                            <ReusableLink
                                href={'/dashboard'}
                                className="block px-4 py-2 hover:bg-green-100 hover:text-green-700 dark:hover:bg-gray-700 dark:hover:text-green-600 rounded"
                                onClick={closeSidebar}
                            >
                                <i className="mdi mdi-view-dashboard me-2"></i>
                                {t('dashboard')}
                            </ReusableLink>
                        </li>

                        {isAdmin && (
                            <li>
                                <ReusableLink
                                    href={'/admin'}
                                    className="block px-4 py-2 hover:bg-green-100 hover:text-green-700 dark:hover:bg-gray-700 dark:hover:text-green-600 rounded"
                                    onClick={closeSidebar}
                                >
                                    <i className="mdi mdi-account-cog-outline me-2"></i>
                                    {t('admin')}
                                </ReusableLink>
                            </li>
                        )}
                        {/* <li>
                            <ReusableLink
                                href={'/dashboard/notifications'}
                                className="block px-3 py-2 hover:bg-green-100 hover:text-green-700 dark:hover:bg-gray-700 dark:hover:text-green-400 rounded"
                                onClick={closeSidebar}
                            >
                                <i className="mdi mdi-bell me-2"></i>
                                {t('notifications')}
                            </ReusableLink>
                        </li> */}
                        {/* <li>
                            <ReusableLink
                                href={'/dashboard/settings'}
                                className="block px-3 py-2 hover:bg-green-100 hover:text-green-700 dark:hover:bg-gray-700 dark:hover:text-green-600 rounded"
                                onClick={closeSidebar}
                            >
                                <i className="mdi mdi-cog me-2"></i>
                                {t('settings')}
                            </ReusableLink>
                        </li> */}
                    </ul>
                </div>

                {/* Sign-Out */}
                <div className="p-2">
                    <Button
                        isLoading={isLoading}
                        title={isLoading ? t('signing-out') : t('sign-out')}
                        variant="red"
                        fullWidth
                        onClick={async () => {
                            if (currentUser) {
                                await signout()
                                dispatch(clearToken())
                            }
                        }}
                        icon={<i className="mdi mdi-logout me-1"></i>}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProfileMenu
