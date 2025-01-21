import React, { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useSignOutMutation } from '@store/services/auth'
import user from 'user'
import { useAppDispatch } from '@hooks/rtkHooks'
import { clearToken } from '@store/slices/tokenSlice'

const ProfileMenu = () => {
    const t = useTranslations()
    const dispatch = useAppDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const [signout, {}] = useSignOutMutation()

    const toggleDropdown = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className="relative inline-block">
            <button
                id="dropdownUserAvatarButton"
                onClick={toggleDropdown}
                className="btn btn-icon bg-green-600 hover:bg-green-500 active:bg-green-700 border-green-600 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                type="button"
            >
                <span className="sr-only">{t('open-profile-menu')}</span>
                <Image
                    className="w-8 h-8 rounded-full"
                    src="/images/profile/profile-picture-3.jpg"
                    alt="user photo"
                    width={32}
                    height={32}
                />
            </button>

            {/* Dropdown menu */}
            <div
                id="dropdownAvatar"
                className={`z-10 bg-white divide-y divide-gray-200 rounded-lg shadow-lg w-48 dark:bg-gray-800 dark:divide-gray-700 absolute right-0 mt-2 ${
                    isOpen ? 'block' : 'hidden'
                }`}
            >
                {/* User Info */}
                <div className="px-4 py-3 text-base font-semibold text-gray-900 dark:text-white">
                    <div className="font-bold">Bonnie Green</div>
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400 truncate">
                        name@flowbite.com
                    </div>
                </div>

                {/* Menu Items */}
                <ul
                    className="py-2 text-base font-medium text-gray-800 dark:text-gray-200"
                    aria-labelledby="dropdownUserAvatarButton"
                >
                    <li>
                        <a
                            href="#"
                            className="block px-4 py-2 hover:bg-green-100 hover:text-green-700 dark:hover:bg-gray-700 dark:hover:text-green-400 rounded"
                        >
                            {t('dashboard')}
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="block px-4 py-2 hover:bg-green-100 hover:text-green-700 dark:hover:bg-gray-700 dark:hover:text-green-400 rounded"
                        >
                            {t('settings')}
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="block px-4 py-2 hover:bg-green-100 hover:text-green-700 dark:hover:bg-gray-700 dark:hover:text-green-400 rounded"
                        >
                            {t('properties')}
                        </a>
                    </li>
                </ul>

                {/* Sign-Out */}
                <div className="py-2">
                    <button
                        className="block px-4 py-2 text-base font-medium text-gray-800 hover:bg-red-100 hover:text-red-600 dark:text-gray-200 dark:hover:bg-red-600 dark:hover:text-white rounded w-full text-left"
                        onClick={async () => {
                            await signout(user)
                            dispatch(clearToken())
                        }}
                    >
                        {t('sign-out')}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfileMenu
