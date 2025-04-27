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
                        <Image src="/images/logo/logo-hr.png" width={98} height={24} alt="" />
                    </ReusableLink>
                </div>
                <SimpleBar style={{ height: 'calc(100% - 70px)' }}>
                    <ul className="sidebar-menu border-t border-white/10">
                        <li className={`${menu === `/${locale}/admin` ? 'active' : ''} ms-0`}>
                            <ReusableLink href="/admin" onClick={closeSidebar}>
                                <i className="mdi mdi-account-cog-outline me-2"></i>
                                {t('admin')}
                            </ReusableLink>
                        </li>
                        <li
                            className={`sidebar-dropdown ms-0 ${
                                [
                                    `/${locale}/admin/properties/rejected-properties`,
                                    `/${locale}/admin/properties/pending-properties`,
                                ].includes(menu)
                                    ? 'active'
                                    : ''
                            }`}
                        >
                            <Link
                                href="#"
                                onClick={() => {
                                    setSubMenu(
                                        subMenu === `/${locale}/admin/properties/pending-properties` ||
                                            subMenu === `/${locale}/admin/properties/rejected-properties`
                                            ? ''
                                            : `/${locale}/admin/properties/pending-properties`,
                                    )
                                }}
                            >
                                <i className="mdi mdi-home-edit me-2"></i>
                                {t('properties')}
                            </Link>
                            <div
                                className={`sidebar-submenu ${
                                    [
                                        `/${locale}/admin/properties/pending-properties`,
                                        `/${locale}/admin/properties/rejected-properties`,
                                    ].includes(subMenu)
                                        ? 'block'
                                        : ''
                                }`}
                            >
                                <ul>
                                    <li
                                        className={`${menu === `/${locale}/admin/properties/pending-properties` ? 'active' : ''} ms-0`}
                                    >
                                        <ReusableLink
                                            href="/admin/properties/pending-properties"
                                            onClick={closeSidebar}
                                        >
                                            {t('pending-properties')}
                                        </ReusableLink>
                                    </li>
                                    <li
                                        className={`${menu === `/${locale}/admin/properties/rejected-properties` ? 'active' : ''} ms-0`}
                                    >
                                        <ReusableLink
                                            href="/admin/properties/rejected-properties"
                                            onClick={closeSidebar}
                                        >
                                            {t('rejected-properties')}
                                        </ReusableLink>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        {/* <li className={`${menu === '/chat' ? 'active' : ''} ms-0`}>
                            <ReusableLink href="/admin/notifications" onClick={closeSidebar}>
                                <i className="mdi mdi-bell-outline me-2"></i>
                                {t('notifications')}
                            </ReusableLink>
                        </li> */}

                        {/* <li className={`${menu === '/chat' ? 'active' : ''} ms-0`}>
                            <ReusableLink href="/admin/settings" onClick={closeSidebar}>
                                <i className="mdi mdi-chat-outline me-2"></i>
                                {t('settings')}
                            </ReusableLink>
                        </li> */}
                    </ul>
                </SimpleBar>
            </div>
        </nav>
    )
}

export default Sidebar
