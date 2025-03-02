'use client' // This is a client component 👈🏽

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { User } from 'react-feather'
import { useParams, usePathname } from 'next/navigation'
import ReusableLink from '@components/Links/ReusableLink'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import ProfileMenu from 'app/[locale]/dashboard/profile/components/ProfileMenu'
import useCurrentUser from '@hooks/useCurrentUser'
import StoreProvider from 'app/[locale]/StoreProvider'
import Languages from './TopHeader/Languages'

type NavbarProps = {
    navClass?: string
    topnavClass?: string
    tagline?: boolean
}

const Navbar: React.FC<NavbarProps> = ({ navClass, topnavClass, tagline }) => {
    const currentUser = useCurrentUser()
    const [menu, setMenu] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [topNavbar, setTopNavBar] = useState(false)
    const currentPath = usePathname()
    const { locale } = useParams()
    const t = useTranslations()

    // Ref for the menu container
    const menuRef = useRef<HTMLDivElement | null>(null)

    // Update the current menu path
    useEffect(() => {
        setMenu(currentPath)
    }, [currentPath])

    // Handle scroll for sticky navbar
    useEffect(() => {
        const handleScroll = () => {
            setTopNavBar(window.scrollY >= 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close the menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Toggle the menu
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    // Paths where the navbar should not be displayed
    const noNavPaths = [
        `/${locale}/auth/login`,
        `/${locale}/auth/signup`,
        `/${locale}/auth/reset-password`,
        `/${locale}/dashboard`,
    ]

    if (noNavPaths.includes(currentPath)) {
        return null
    }

    return (
        <nav
            id="topnav"
            className={`${topNavbar ? 'nav-sticky' : ''} ${tagline ? 'tagline-height' : ''} ${topnavClass ? topnavClass : ''} defaultscroll is-sticky`}
        >
            <div
                className={`${topnavClass !== '' && topnavClass !== undefined ? 'container-fluid md:px-8 px-3' : 'container'}`}
            >
                <div className="flex items-center justify-between">
                    {/* Left Section: Logo and Languages */}
                    <div className="flex items-center space-x-4">
                        {/* Logo */}
                        {navClass === '' || navClass === undefined ? (
                            <ReusableLink className="logo" href="/">
                                <Image
                                    src="/images/logo-dark.png"
                                    className="inline-block dark:hidden"
                                    alt=""
                                    width={98}
                                    height={24}
                                    priority
                                />
                                <Image
                                    src="/images/logo-light.png"
                                    className="hidden dark:inline-block"
                                    alt=""
                                    width={98}
                                    height={24}
                                    priority
                                />
                            </ReusableLink>
                        ) : (
                            <ReusableLink className="logo" href="/">
                                <span className="inline-block dark:hidden">
                                    <Image
                                        src="/images/logo-dark.png"
                                        className="l-dark"
                                        alt=""
                                        width={98}
                                        height={24}
                                        priority
                                    />
                                    <Image
                                        src="/images/logo-light.png"
                                        className="l-light"
                                        alt=""
                                        width={98}
                                        height={24}
                                        priority
                                    />
                                </span>
                                <Image
                                    src="/images/logo-light.png"
                                    className="hidden dark:inline-block"
                                    alt=""
                                    width={98}
                                    height={24}
                                    priority
                                />
                            </ReusableLink>
                        )}

                        {/* Languages Dropdown */}
                        <Languages />
                    </div>

                    {/* Right Section: Navigation Tabs, Mobile Toggle, and Profile Menu */}
                    <div className="flex items-center gap-4">
                        {/* Mobile Toggle */}
                        <div className="menu-extras">
                            <div className="menu-item">
                                <Link href="#" className="navbar-toggle" onClick={toggleMenu}>
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
                                <li className={menu === `/${locale}` ? 'active' : ''}>
                                    <ReusableLink href="/" className="sub-menu-item" onClick={() => setIsOpen(false)}>
                                        {t('home')}
                                    </ReusableLink>
                                </li>

                                <li className={menu === `/${locale}/buy` ? 'active' : ''}>
                                    <ReusableLink
                                        href="/buy"
                                        className="sub-menu-item"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {t('buy')}
                                    </ReusableLink>
                                </li>

                                <li className={menu === `/${locale}/sell` ? 'active' : ''}>
                                    <ReusableLink
                                        href="/sell"
                                        className="sub-menu-item"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {t('sell')}
                                    </ReusableLink>
                                </li>

                                <li className={menu === `/${locale}/contact` ? 'active' : ''}>
                                    <ReusableLink
                                        href="/contact"
                                        className="sub-menu-item"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {t('contact')}
                                    </ReusableLink>
                                </li>
                            </ul>
                        </div>

                        {/* Login Button */}
                        <ul className="buy-button list-none mb-0">
                            {currentUser?.isSignedIn === true ? (
                                <StoreProvider>
                                    <ProfileMenu />
                                </StoreProvider>
                            ) : (
                                <li className="inline mb-0">
                                    <ReusableLink
                                        href="/auth/login"
                                        className="btn btn-icon bg-green-600 hover:bg-green-700 border-green-600 dark:border-green-600 text-white rounded-full"
                                    >
                                        <User className="h-4 w-4 stroke-[3]"></User>
                                    </ReusableLink>
                                </li>
                            )}
                            {!currentUser?.isSignedIn && (
                                <li className="sm:inline ps-1 mb-0 hidden">
                                    <ReusableLink
                                        href="/auth/signup"
                                        className="btn bg-green-600 hover:bg-green-700 border-green-600 dark:border-green-600 text-white rounded-full"
                                    >
                                        {t('signup')}
                                    </ReusableLink>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
