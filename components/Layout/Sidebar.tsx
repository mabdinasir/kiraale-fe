'use client' // This is a client component 👈🏽

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import ReusableLink from '@components/Links/ReusableLink'
import { useTranslations } from 'next-intl'

const Sidebar = () => {
    const { locale } = useParams()
    const current = usePathname()
    const t = useTranslations()

    const [menu, setMenu] = useState('')
    const [subMenu, setSubMenu] = useState('')

    useEffect(() => {
        setSubMenu(current)
        setMenu(current)
    }, [current])

    const closeSidebar = () => {
        const isDesktop = window.matchMedia('(min-width: 992px)').matches
        if (isDesktop) return
        const sidebar = document.querySelector('.page-wrapper')
        sidebar?.classList.toggle('toggled')
    }

    return (
        <nav id="sidebar" className="sidebar-wrapper sidebar-dark">
            <div className="sidebar-content">
                <div className="sidebar-brand">
                    <ReusableLink href="/">
                        <Image src="/images/logo-light.png" width={98} height={24} alt="" />
                    </ReusableLink>
                </div>
                <SimpleBar style={{ height: 'calc(100% - 70px)' }}>
                    <ul className="sidebar-menu border-t border-white/10">
                        <li className={`${menu === `/${locale}/dashboard` ? 'active' : ''} ms-0`}>
                            <ReusableLink href="/dashboard" onClick={closeSidebar}>
                                <i className="mdi mdi-chart-bell-curve-cumulative me-2"></i>
                                {t('dashboard')}
                            </ReusableLink>
                        </li>
                        <li
                            className={`sidebar-dropdown ms-0 ${
                                [
                                    `/${locale}/dashboard/favorite-properties`,
                                    `/${locale}/dashboard/properties/add-property`,
                                    `/${locale}/dashboard/properties/my-properties`,
                                ].includes(menu)
                                    ? 'active'
                                    : ''
                            }`}
                        >
                            <Link
                                href="#"
                                onClick={() => {
                                    setSubMenu(
                                        subMenu === `/${locale}/dashboard/properties/my-properties` ||
                                            subMenu === `/${locale}/dashboard/properties/favorite-properties` ||
                                            subMenu === `/${locale}/dashboard/properties/add-property`
                                            ? ''
                                            : `/${locale}/dashboard/properties/my-properties`,
                                    )
                                }}
                            >
                                <i className="mdi mdi-home-edit me-2"></i>
                                {t('properties')}
                            </Link>
                            <div
                                className={`sidebar-submenu ${
                                    [
                                        `/${locale}/dashboard/properties/my-properties`,
                                        `/${locale}/dashboard/properties/favorite-properties`,
                                        `/${locale}/dashboard/properties/add-property`,
                                    ].includes(subMenu)
                                        ? 'block'
                                        : ''
                                }`}
                            >
                                <ul>
                                    <li
                                        className={`${menu === `/${locale}/dashboard/properties/my-properties` ? 'active' : ''} ms-0`}
                                    >
                                        <ReusableLink href="/dashboard/properties/my-properties" onClick={closeSidebar}>
                                            {t('my-properties')}
                                        </ReusableLink>
                                    </li>
                                    <li
                                        className={`${menu === `/${locale}/dashboard/properties/favorite-properties` ? 'active' : ''} ms-0`}
                                    >
                                        <ReusableLink
                                            href="/dashboard/properties/favorite-properties"
                                            onClick={closeSidebar}
                                        >
                                            {t('favorite-properties')}
                                        </ReusableLink>
                                    </li>
                                    <li
                                        className={`${menu === `/${locale}/dashboard/properties/add-property` ? 'active' : ''} ms-0`}
                                    >
                                        <ReusableLink href="/dashboard/properties/add-property" onClick={closeSidebar}>
                                            {t('add-property')}
                                        </ReusableLink>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className={`${menu === '/chat' ? 'active' : ''} ms-0`}>
                            <ReusableLink href="/dashboard/notifications" onClick={closeSidebar}>
                                <i className="mdi mdi-bell-outline me-2"></i>
                                {t('notifications')}
                            </ReusableLink>
                        </li>

                        <li className={`${menu === '/chat' ? 'active' : ''} ms-0`}>
                            <ReusableLink href="/dashboard/settings" onClick={closeSidebar}>
                                <i className="mdi mdi-chat-outline me-2"></i>
                                {t('settings')}
                            </ReusableLink>
                        </li>

                        <li
                            className={`sidebar-dropdown ms-0 ${
                                [
                                    `/${locale}/dashboard/profile`,
                                    `/${locale}/dashboard/profile/profile-settings`,
                                ].includes(menu)
                                    ? 'active'
                                    : ''
                            }`}
                        >
                            <Link
                                href="#"
                                onClick={() => {
                                    setSubMenu(
                                        subMenu === `/${locale}/dashboard/profile` ||
                                            subMenu === `/${locale}/dashboard/profile/profile-settings`
                                            ? ''
                                            : `/${locale}/dashboard/profile`,
                                    )
                                }}
                            >
                                <i className="mdi mdi-account-edit me-2"></i>
                                {t('user-profile')}
                            </Link>
                            <div
                                className={`sidebar-submenu ${
                                    [
                                        `/${locale}/dashboard/profile`,
                                        `/${locale}/dashboard/profile/profile-settings`,
                                    ].includes(subMenu)
                                        ? 'block'
                                        : ''
                                }`}
                            >
                                <ul>
                                    <li className={`${menu === `/${locale}/dashboard/profile` ? 'active' : ''} ms-0`}>
                                        <ReusableLink href="/dashboard/profile" onClick={closeSidebar}>
                                            {t('profile')}
                                        </ReusableLink>
                                    </li>
                                    <li
                                        className={`${menu === `/${locale}/dashboard/profile/profile-settings` ? 'active' : ''} ms-0`}
                                    >
                                        <ReusableLink href="/dashboard/profile/profile-settings" onClick={closeSidebar}>
                                            {t('profile-settings')}
                                        </ReusableLink>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className="relative lg:m-8 m-6 px-8 py-10 rounded-lg bg-gradient-to-b to-transparent from-slate-800 text-center">
                            <span className="relative z-10">
                                <span className="text-xl font-medium h5 text-white">{t('add-property')}</span>

                                <span className="text-slate-400 mt-3 mb-5 block">{t('add-property-desc')}</span>

                                <ReusableLink
                                    href="/dashboard/properties/add-property"
                                    className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-gray-500/5 hover:bg-gray-500 border-gray-500/10 hover:border-gray-500 text-white rounded-md"
                                >
                                    {t('add-now')}
                                </ReusableLink>
                            </span>

                            <span className="mdi mdi-home-city-outline text-[160px] absolute top-1/2 -translate-y-1/2 start-0 end-0 mx-auto text-center opacity-[0.02] text-white z-0"></span>
                        </li>
                    </ul>
                </SimpleBar>
            </div>
        </nav>
    )
}

export default Sidebar
