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
                            <ReusableLink href="/dashboard">
                                <i className="mdi mdi-chart-bell-curve-cumulative me-2"></i>
                                {t('dashboard')}
                            </ReusableLink>
                        </li>

                        <li className={`${menu === `/${locale}/dashboard/add-property` ? 'active' : ''} ms-0`}>
                            <ReusableLink href="/dashboard/add-property">
                                <i className="mdi mdi-home-plus me-2"></i>
                                {t('add-property')}
                            </ReusableLink>
                        </li>

                        <li className={`${menu === '/favorite-property' ? 'active' : ''} ms-0`}>
                            <ReusableLink href="/favorite-property">
                                <i className="mdi mdi-home-heart me-2"></i>
                                {t('favorite-properties')}
                            </ReusableLink>
                        </li>

                        <li className={`${menu === '/explore-property' ? 'active' : ''} ms-0`}>
                            <ReusableLink href="/explore-property">
                                <i className="mdi mdi-home-city me-2"></i>
                                {t('explore-properties')}
                            </ReusableLink>
                        </li>

                        <li className={`${menu === '/chat' ? 'active' : ''} ms-0`}>
                            <ReusableLink href="/chat">
                                <i className="mdi mdi-chat-outline me-2"></i>
                                {t('chat')}
                            </ReusableLink>
                        </li>

                        <li
                            className={`sidebar-dropdown ms-0 ${['/profile', '/profile-setting', '/user-item'].includes(menu) ? 'active' : ''}`}
                        >
                            <Link
                                href="#"
                                onClick={() => {
                                    setSubMenu(subMenu === '/user-item' ? '' : '/user-item')
                                }}
                            >
                                <i className="mdi mdi-account-edit me-2"></i>
                                {t('user-profile')}
                            </Link>
                            <div
                                className={`sidebar-submenu ${['/profile', '/profile-setting', '/user-item'].includes(subMenu) ? 'block' : ''}`}
                            >
                                <ul>
                                    <li className={`${menu === '/profile' ? 'active' : ''} ms-0`}>
                                        <ReusableLink href="/dashboard/profile">{t('profile')}</ReusableLink>
                                    </li>
                                    <li className={`${menu === '/profile-setting' ? 'active' : ''} ms-0`}>
                                        <ReusableLink href="/dashboard/profile-setting">
                                            {t('profile-settings')}
                                        </ReusableLink>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li
                            className={`sidebar-dropdown ms-0 ${['/blog', '/blog-detail'].includes(menu) ? 'active' : ''}`}
                        >
                            <Link
                                href="#"
                                onClick={() => {
                                    setSubMenu(subMenu === '/blog-item' ? '' : '/blog-item')
                                }}
                            >
                                <i className="mdi mdi-post-outline me-2"></i>
                                {t('blog')}
                            </Link>
                            <div
                                className={`sidebar-submenu ${['/blog', '/blog-detail', '/blog-item'].includes(subMenu) ? 'block' : ''}`}
                            >
                                <ul>
                                    <li className={`${menu === '/blog' ? 'active' : ''} ms-0`}>
                                        <ReusableLink href="/blog">{t('blogs')}</ReusableLink>
                                    </li>
                                    <li className={`${menu === '/blog-detail' ? 'active' : ''} ms-0`}>
                                        <ReusableLink href="/blog-detail">{t('blog-detail')}</ReusableLink>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li className="relative lg:m-8 m-6 px-8 py-10 rounded-lg bg-gradient-to-b to-transparent from-slate-800 text-center">
                            <span className="relative z-10">
                                <span className="text-xl font-medium h5 text-white">Upgrade to Pro</span>

                                <span className="text-slate-400 mt-3 mb-5 block">
                                    Get one month free and subscribe to pro
                                </span>

                                <Link
                                    href="https://1.envato.market/hously-react"
                                    target="_blank"
                                    className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-gray-500/5 hover:bg-gray-500 border-gray-500/10 hover:border-gray-500 text-white rounded-md"
                                >
                                    Subscribe
                                </Link>
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
