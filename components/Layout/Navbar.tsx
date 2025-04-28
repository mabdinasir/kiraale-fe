'use client' // This is a client component 👈🏽

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { User } from 'react-feather'
import { useParams, usePathname } from 'next/navigation'
import ReusableLink from '@components/Links/ReusableLink'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import useCurrentUser from '@hooks/useCurrentUser'
import StoreProvider from 'app/[locale]/StoreProvider'
import Link from 'next/link'

// Dynamically load client-only components
const ProfileMenu = dynamic(() => import('app/[locale]/dashboard/profile/components/ProfileMenu'), { ssr: false })

const LanguageSelector = dynamic(() => import('./TopHeader/LanguageSelector'), { ssr: false })

type NavbarProps = {
    navClass?: string
    topnavClass?: string
    tagline?: boolean
}

const Navbar: React.FC<NavbarProps> = ({ navClass, topnavClass, tagline }) => {
    const [mounted, setMounted] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [topNavbar, setTopNavBar] = useState(false)
    const [showNav, setShowNav] = useState(true)

    const currentPath = usePathname()
    const { locale } = useParams()
    const t = useTranslations()
    const menuRef = useRef<HTMLDivElement | null>(null)
    const currentUser = useCurrentUser()

    // Mount effect
    useEffect(() => {
        setMounted(true)
        const handleScroll = () => setTopNavBar(window.scrollY >= 50)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Navigation visibility effect
    useEffect(() => {
        const hideNavPaths = [`/${locale}/auth/login`, `/${locale}/auth/signup`, `/${locale}/auth/reset-password`]

        const isDashboardRoute = currentPath.startsWith(`/${locale}/dashboard`)
        setShowNav(!(hideNavPaths.includes(currentPath) || isDashboardRoute))
    }, [currentPath, locale])

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    if (!mounted || !showNav) return null

    return (
        <nav
            id="topnav"
            className={`${topNavbar ? 'nav-sticky' : ''} ${tagline ? 'tagline-height' : ''} ${topnavClass || ''} defaultscroll is-sticky`}
        >
            <div className={`${topnavClass ? 'container-fluid md:px-8 px-3' : 'container'}`}>
                {/* Logo Section - Simplified */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <ReusableLink href="/" className="logo">
                            <Image
                                src="/images/logo/12.png"
                                className="inline-block dark:hidden"
                                alt="Logo"
                                width={98}
                                height={24}
                                priority
                            />
                            <Image
                                src="/images/logo/12.png"
                                className="hidden dark:inline-block"
                                alt="Logo"
                                width={98}
                                height={24}
                                priority
                            />
                        </ReusableLink>
                        <LanguageSelector />
                    </div>

                    {/* Navigation Menu - Simplified Active State */}
                    <div className="flex items-center gap-4">
                        {/* Mobile Toggle */}
                        <div className="menu-extras">
                            <div className="menu-item">
                                <Link href="#" className="navbar-toggle" onClick={() => setIsOpen(!isOpen)}>
                                    <div className="lines">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Navigation Menu */}
                        <div id="navigation" ref={menuRef} className={`${isOpen ? 'block' : 'hidden'} md:block`}>
                            <ul
                                className={`navigation-menu ${navClass === '' || navClass === undefined ? '' : 'nav-light'}`}
                            >
                                {['home', 'buy', 'sell', 'contact-us'].map((path) => (
                                    <li
                                        key={path}
                                        className={
                                            currentPath === `/${locale}/${path === 'home' ? '' : path}` ? 'active' : ''
                                        }
                                    >
                                        <ReusableLink
                                            href={`/${path === 'home' ? '' : path}`}
                                            className="sub-menu-item"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {t(path)}
                                        </ReusableLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Auth Section - Loading State */}
                        <div className="buy-button">
                            {currentUser?.isSignedIn ? (
                                <StoreProvider>
                                    <ProfileMenu />
                                </StoreProvider>
                            ) : (
                                <div className="flex gap-2">
                                    <ReusableLink
                                        href="/auth/login"
                                        className="btn btn-icon bg-green-600 hover:bg-green-700 text-white rounded-full"
                                    >
                                        <User className="h-4 w-4 stroke-[3]" />
                                    </ReusableLink>
                                    <ReusableLink
                                        href="/auth/signup"
                                        className="btn bg-green-600 hover:bg-green-700 text-white rounded-full"
                                    >
                                        {t('signup')}
                                    </ReusableLink>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
