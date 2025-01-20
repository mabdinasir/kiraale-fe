'use client' // This is a client component 👈🏽

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

import { User } from 'react-feather'
import { useParams, usePathname } from 'next/navigation'
import ReusableLink from '@components/Links/ReusableLink'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useAppSelector } from '@hooks/rtkHooks'

type NavbarProps = {
    navClass?: string
    topnavClass?: string
    tagline?: boolean
}

const Navbar: React.FC<NavbarProps> = ({ navClass, topnavClass, tagline }) => {
    const token = useAppSelector((state) => state.token.value)

    const [menu, setMenu] = useState('')
    // const [subMenu, setSubMenu] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [topNavbar, setTopNavBar] = useState(false)

    const currentPath = usePathname()
    const { locale } = useParams()
    const t = useTranslations()

    useEffect(() => {
        setMenu(currentPath)
        // setSubMenu(currentPath)

        const windowScroll = () => {
            setTopNavBar(window.scrollY >= 50)
        }

        window.addEventListener('scroll', windowScroll)
        window.scrollTo(0, 0)
        return () => {
            window.removeEventListener('scroll', windowScroll)
        }
    }, [currentPath])

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const noNavPaths = [`/${locale}/auth/login`, `/${locale}/auth/signup`, `/${locale}/auth/reset-password`]

    if (noNavPaths.includes(currentPath)) {
        return null
    }

    return (
        <React.Fragment>
            <nav
                id="topnav"
                className={`${topNavbar ? 'nav-sticky' : ''} ${tagline ? 'tagline-height' : ''} ${topnavClass ? topnavClass : ''} defaultscroll is-sticky`}
            >
                <div
                    className={`${topnavClass !== '' && topnavClass !== undefined ? 'container-fluid md:px-8 px-3' : 'container'}`}
                >
                    {/* <!-- Logo container--> */}
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
                    {/* <!-- End Logo container--> */}

                    {/* <!-- Start Mobile Toggle --> */}
                    <div className="menu-extras">
                        <div className="menu-item">
                            <Link href="#" className="navbar-toggle" onClick={toggleMenu} onBlur={toggleMenu}>
                                <div className="lines">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </Link>
                        </div>
                    </div>
                    {/* <!-- End Mobile Toggle --> */}

                    {/* <!-- Login button Start --> */}
                    <ul className="buy-button list-none mb-0">
                        {!token && (
                            <li className="inline mb-0">
                                <ReusableLink
                                    href="/auth/login"
                                    className="btn btn-icon bg-green-600 hover:bg-green-700 border-green-600 dark:border-green-600 text-white rounded-full"
                                >
                                    <User className="h-4 w-4 stroke-[3]"></User>
                                </ReusableLink>
                            </li>
                        )}
                        {!token && (
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
                    {/* <!--Login button End--> */}

                    <div id="navigation" className={`${isOpen ? 'block' : 'hidden'}`}>
                        {/* <!-- Navigation Menu--> */}
                        <ul
                            className={`navigation-menu  ${navClass === '' || navClass === undefined ? '' : 'nav-light'}   ${topnavClass !== '' && topnavClass !== undefined ? 'justify-center' : 'justify-end'}`}
                        >
                            <li className={menu === `/${locale}` ? 'active' : ''}>
                                <ReusableLink href="/" className="sub-menu-item">
                                    {t('home')}
                                </ReusableLink>
                            </li>

                            <li className={menu === `/${locale}/buy` ? 'active' : ''}>
                                <ReusableLink href="/buy" className="sub-menu-item">
                                    {t('buy')}
                                </ReusableLink>
                            </li>

                            <li className={menu === `/${locale}/sell` ? 'active' : ''}>
                                <ReusableLink href="/sell" className="sub-menu-item">
                                    {t('sell')}
                                </ReusableLink>
                            </li>

                            {/* <li
                                className={`has-submenu parent-parent-menu-item ${['/grid', '/grid-sidebar', '/grid-map', '/list', '/list-sidebar', '/list-map', '/property-detail/1', '/property-detail-two'].includes(menu) ? 'active' : ''}`}
                            >
                                <ReusableLink
                                    href="#"
                                    onClick={() => {
                                        setSubMenu(subMenu === '/list-item' ? '' : '/list-item')
                                    }}
                                >
                                    Listing
                                </ReusableLink>
                                <span className="menu-arrow"></span>
                                <ul
                                    className={`submenu ${['/grid', '/grid-sidebar', '/grid-map', '/list', '/list-sidebar', '/list-map', '/property-detail/1', '/list-item', '/grid-item', '/list-view-item', '/property-item', '/property-detail-two'].includes(subMenu) ? 'open' : ''}`}
                                >
                                    <li className="has-submenu parent-menu-item">
                                        <ReusableLink href="#"> Grid View </ReusableLink>
                                        <span className="submenu-arrow"></span>
                                        <ul
                                            className={`submenu ${['/grid', '/grid-sidebar', '/grid-map'].includes(menu) ? 'active' : ''}`}
                                        >
                                            <li className={menu === '/grid' ? 'active' : ''}>
                                                <ReusableLink href="/grid" className="sub-menu-item">
                                                    Grid Listing
                                                </ReusableLink>
                                            </li>
                                            <li className={menu === '/grid-sidebar' ? 'active' : ''}>
                                                <ReusableLink href="/grid-sidebar" className="sub-menu-item">
                                                    Grid Sidebar{' '}
                                                </ReusableLink>
                                            </li>
                                            <li className={menu === '/grid-map' ? 'active' : ''}>
                                                <ReusableLink href="/grid-map" className="sub-menu-item">
                                                    Grid With Map
                                                </ReusableLink>
                                            </li>
                                        </ul>
                                    </li>
                                    <li
                                        className={`has-submenu parent-menu-item ${['/list', '/list-sidebar', '/list-map'].includes(menu) ? 'active' : ''}`}
                                    >
                                        <ReusableLink
                                            href="#"
                                            onClick={() => {
                                                setSubMenu(subMenu === '/list-view-item' ? '' : '/list-view-item')
                                            }}
                                        >
                                            {' '}
                                            List View{' '}
                                        </ReusableLink>
                                        <span className="submenu-arrow"></span>
                                        <ul
                                            className={`submenu ${['/list', '/list-sidebar', '/list-map', '/list-view-item'].includes(subMenu) ? 'open' : ''}`}
                                        >
                                            <li className={menu === '/list' ? 'active' : ''}>
                                                <ReusableLink href="/list" className="sub-menu-item">
                                                    List Listing
                                                </ReusableLink>
                                            </li>
                                            <li className={menu === '/list-sidebar' ? 'active' : ''}>
                                                <ReusableLink href="/list-sidebar" className="sub-menu-item">
                                                    List Sidebar{' '}
                                                </ReusableLink>
                                            </li>
                                            <li className={menu === '/list-map' ? 'active' : ''}>
                                                <ReusableLink href="/list-map" className="sub-menu-item">
                                                    List With Map
                                                </ReusableLink>
                                            </li>
                                        </ul>
                                    </li>
                                    <li
                                        className={`has-submenu parent-menu-item ${['/property-detail/1', '/property-detail-two'].includes(menu) ? 'active' : ''}`}
                                    >
                                        <ReusableLink
                                            href="#"
                                            onClick={() => {
                                                setSubMenu(subMenu === '/property-item' ? '' : '/property-item')
                                            }}
                                        >
                                            {' '}
                                            Property Detail{' '}
                                        </ReusableLink>
                                        <span className="submenu-arrow"></span>
                                        <ul
                                            className={`submenu ${['/property-detail/1', '/property-item'].includes(subMenu) ? 'open' : ''}`}
                                        >
                                            <li className={menu === '/property-detail/1' ? 'active' : ''}>
                                                <ReusableLink href="/property-detail/1" className="sub-menu-item">
                                                    Property Detail
                                                </ReusableLink>
                                            </li>
                                            <li className={menu === '/property-detail-two' ? 'active' : ''}>
                                                <ReusableLink href="/property-detail-two" className="sub-menu-item">
                                                    Property Detail Two
                                                </ReusableLink>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>

                            <li
                                className={`has-submenu parent-parent-menu-item ${['/aboutus', '/features', '/pricing', '/faqs', '/auth/login', '/auth/signup', '/auth-reset-password', '/terms', '/privacy', '/blogs', '/blog-sidebar', '/blog-detail', '/comingsoon', '/maintenance', '/404', '/agents', '/agent-profile', '/agencies', '/agency-profile'].includes(menu) ? 'active' : ''}`}
                            >
                                <ReusableLink
                                    href="#"
                                    onClick={() => {
                                        setSubMenu(subMenu === '/page-item' ? '' : '/page-item')
                                    }}
                                >
                                    Pages
                                </ReusableLink>
                                <span className="menu-arrow"></span>
                                <ul
                                    className={`submenu ${['/aboutus', '/features', '/pricing', '/faqs', '/auth/login', '/auth/signup', '/auth-reset-password', '/terms', '/privacy', '/blogs', '/blog-sidebar', '/blog-detail', '/comingsoon', '/maintenance', '/404', '/page-item', '/auth-item', '/term-item', '/blog-item', '/special-item'].includes(subMenu) ? 'open' : ''}`}
                                >
                                    <li className={menu === '/aboutus' ? 'active' : ''}>
                                        <ReusableLink href="/aboutus" className="sub-menu-item">
                                            About Us
                                        </ReusableLink>
                                    </li>
                                    <li className={menu === '/features' ? 'active' : ''}>
                                        <ReusableLink href="/features" className="sub-menu-item">
                                            Featues
                                        </ReusableLink>
                                    </li>
                                    <li className={menu === '/pricing' ? 'active' : ''}>
                                        <ReusableLink href="/pricing" className="sub-menu-item">
                                            Pricing
                                        </ReusableLink>
                                    </li>
                                    <li className={menu === '/faqs' ? 'active' : ''}>
                                        <ReusableLink href="/faqs" className="sub-menu-item">
                                            Faqs
                                        </ReusableLink>
                                    </li>

                                    <li
                                        className={`has-submenu parent-menu-item ${['/agents', '/agent-profile'].includes(menu) ? 'active' : ''}`}
                                    >
                                        <ReusableLink
                                            href="#"
                                            onClick={() => {
                                                setSubMenu(subMenu === '/auth-item' ? '' : '/auth-item')
                                            }}
                                        >
                                            {' '}
                                            Agents{' '}
                                        </ReusableLink>
                                        <span className="submenu-arrow"></span>
                                        <ul className={`submenu ${['/auth-item'].includes(subMenu) ? 'open' : ''}`}>
                                            <li className={menu === '/agents' ? 'active' : ''}>
                                                <ReusableLink href="/agents" className="sub-menu-item">
                                                    Agents
                                                </ReusableLink>
                                            </li>
                                            <li className={menu === '/agent-profile' ? 'active' : ''}>
                                                <ReusableLink href="/agent-profile" className="sub-menu-item">
                                                    Agent Profile
                                                </ReusableLink>
                                            </li>
                                        </ul>
                                    </li>
                                    <li
                                        className={`has-submenu parent-menu-item ${['/agencies', '/agency-profile'].includes(menu) ? 'active' : ''}`}
                                    >
                                        <ReusableLink
                                            href="#"
                                            onClick={() => {
                                                setSubMenu(subMenu === '/auth-item' ? '' : '/auth-item')
                                            }}
                                        >
                                            {' '}
                                            Agencies{' '}
                                        </ReusableLink>
                                        <span className="submenu-arrow"></span>
                                        <ul className={`submenu ${['/auth-item'].includes(subMenu) ? 'open' : ''}`}>
                                            <li className={menu === '/agencies' ? 'active' : ''}>
                                                <ReusableLink href="/agencies" className="sub-menu-item">
                                                    Agencies
                                                </ReusableLink>
                                            </li>
                                            <li className={menu === '/agency-profile' ? 'active' : ''}>
                                                <ReusableLink href="/agency-profile" className="sub-menu-item">
                                                    Agency Profile
                                                </ReusableLink>
                                            </li>
                                        </ul>
                                    </li>

                                    <li
                                        className={`has-submenu parent-menu-item ${['/auth/login', '/auth/signup', '/auth-reset-password'].includes(menu) ? 'active' : ''}`}
                                    >
                                        <ReusableLink
                                            href="#"
                                            onClick={() => {
                                                setSubMenu(subMenu === '/auth-item' ? '' : '/auth-item')
                                            }}
                                        >
                                            {' '}
                                            Auth Pages{' '}
                                        </ReusableLink>
                                        <span className="submenu-arrow"></span>
                                        <ul
                                            className={`submenu ${['/auth/login', '/auth/signup', '/auth-reset-password', '/auth-item'].includes(subMenu) ? 'open' : ''}`}
                                        >
                                            <li className={menu === '/auth/login' ? 'active' : ''}>
                                                <ReusableLink href="/auth/login" className="sub-menu-item">
                                                    Login
                                                </ReusableLink>
                                            </li>
                                            <li className={menu === '/auth/signup' ? 'active' : ''}>
                                                <ReusableLink href="/auth/signup" className="sub-menu-item">
                                                    Signup
                                                </ReusableLink>
                                            </li>
                                            <li className={menu === '/auth-reset-password' ? 'active' : ''}>
                                                <ReusableLink href="/auth-reset-password" className="sub-menu-item">
                                                    Reset Password
                                                </ReusableLink>
                                            </li>
                                        </ul>
                                    </li>

                                    <li
                                        className={`has-submenu parent-menu-item ${['/terms', '/privacy'].includes(menu) ? 'active' : ''}`}
                                    >
                                        <ReusableLink
                                            href="#"
                                            onClick={() => {
                                                setSubMenu(subMenu === '/term-item' ? '' : '/term-item')
                                            }}
                                        >
                                            {' '}
                                            Utility{' '}
                                        </ReusableLink>
                                        <span className="submenu-arrow"></span>
                                        <ul
                                            className={`submenu ${['/terms', '/privacy', '/term-item'].includes(subMenu) ? 'open' : ''}`}
                                        >
                                            <li className={menu === '/terms' ? 'active' : ''}>
                                                <ReusableLink href="/terms" className="sub-menu-item">
                                                    Terms of Services
                                                </ReusableLink>
                                            </li>
                                            <li className={menu === '/privacy' ? 'active' : ''}>
                                                <ReusableLink href="/privacy" className="sub-menu-item">
                                                    Privacy Policy
                                                </ReusableLink>
                                            </li>
                                        </ul>
                                    </li>
                                    <li
                                        className={`has-submenu parent-menu-item ${['/blogs', '/blog-sidebar', '/blog-detail'].includes(menu) ? 'active' : ''}`}
                                    >
                                        <ReusableLink
                                            href="#"
                                            onClick={() => {
                                                setSubMenu(subMenu === '/blog-item' ? '' : '/blog-item')
                                            }}
                                        >
                                            {' '}
                                            Blog{' '}
                                        </ReusableLink>
                                        <span className="submenu-arrow"></span>
                                        <ul
                                            className={`submenu ${['/blogs', '/blog-sidebar', '/blog-detail', '/blog-item'].includes(subMenu) ? 'open' : ''}`}
                                        >
                                            <li className={menu === '/blogs' ? 'active' : ''}>
                                                <ReusableLink href="/blogs" className="sub-menu-item">
                                                    {' '}
                                                    Blogs
                                                </ReusableLink>
                                            </li>
                                            <li className={menu === '/blog-sidebar' ? 'active' : ''}>
                                                <ReusableLink href="/blog-sidebar" className="sub-menu-item">
                                                    {' '}
                                                    Blog Sidebar
                                                </ReusableLink>
                                            </li>
                                            <li className={menu === '/blog-detail' ? 'active' : ''}>
                                                <ReusableLink href="/blog-detail/1" className="sub-menu-item">
                                                    {' '}
                                                    Blog Detail
                                                </ReusableLink>
                                            </li>
                                        </ul>
                                    </li>
                                    <li
                                        className={`has-submenu parent-menu-item ${['/comingsoon', '/maintenance', '/404'].includes(menu) ? 'active' : ''}`}
                                    >
                                        <ReusableLink
                                            href="#"
                                            onClick={() => {
                                                setSubMenu(subMenu === '/special-item' ? '' : '/special-item')
                                            }}
                                        >
                                            {' '}
                                            Special{' '}
                                        </ReusableLink>
                                        <span className="submenu-arrow"></span>
                                        <ul
                                            className={`submenu ${['/comingsoon', '/maintenance', '/404', '/special-item'].includes(subMenu) ? 'open' : ''}`}
                                        >
                                            <li className={menu === '/comingsoon' ? 'active' : ''}>
                                                <ReusableLink href="/comingsoon" className="sub-menu-item">
                                                    Comingsoon
                                                </ReusableLink>
                                            </li>
                                            <li className={menu === '/maintenance' ? 'active' : ''}>
                                                <ReusableLink href="/maintenance" className="sub-menu-item">
                                                    Maintenance
                                                </ReusableLink>
                                            </li>
                                            <li className={menu === '/404' ? 'active' : ''}>
                                                <ReusableLink href="/404" className="sub-menu-item">
                                                    404! Error
                                                </ReusableLink>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li> */}

                            <li className={menu === `/${locale}/contact` ? 'active' : ''}>
                                <ReusableLink href="/contact" className="sub-menu-item">
                                    {t('contact')}
                                </ReusableLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {/* End Navbar  */}
        </React.Fragment>
    )
}

export default Navbar
