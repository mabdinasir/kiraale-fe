'use client' // This is a client component 👈🏽

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
    FiChevronRight,
    FiDribbble,
    FiFacebook,
    FiInstagram,
    FiLinkedin,
    FiMail,
    FiMapPin,
    FiPhone,
    FiTwitter,
} from 'react-icons/fi'
import { RiBehanceFill } from 'react-icons/ri'
import { useTranslations } from 'next-intl'
import ReusableLink from '@components/Links/ReusableLink'
import { useParams, usePathname } from 'next/navigation'
import SubscriptionForm from '@components/UI/SubscriptionForm'
import StoreProvider from 'app/[locale]/StoreProvider'

const Footer = () => {
    const t = useTranslations()
    const { locale } = useParams()
    const currentPath = usePathname()

    const noFooterPrefix = `/${locale}/dashboard`

    if (currentPath.startsWith(noFooterPrefix)) {
        return null
    }

    return (
        <>
            <footer className="relative bg-slate-900 dark:bg-slate-800 mt-24">
                <div className="container">
                    <div className="grid grid-cols-1">
                        <div className="relative py-16">
                            <div className="relative w-full">
                                <StoreProvider key={'subscribe'}>
                                    <SubscriptionForm />
                                </StoreProvider>
                                <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px] -mt-24">
                                    <div className="lg:col-span-4 md:col-span-12">
                                        <ReusableLink href="#" className="text-[22px] focus:outline-none">
                                            <Image src="/images/logo-light.png" alt="" width={98} height={28} />
                                        </ReusableLink>
                                        <p className="mt-6 text-gray-300">{t('feature-subtitle')}</p>
                                    </div>

                                    <div className="lg:col-span-2 md:col-span-4">
                                        <h5 className="tracking-[1px] text-gray-100 font-semibold">{t('company')}</h5>
                                        <ul className="list-none footer-list mt-6">
                                            <li>
                                                <ReusableLink
                                                    href="/about"
                                                    className="text-slate-300 hover:text-slate-400 duration-500 ease-in-out flex items-center"
                                                >
                                                    <FiChevronRight width={18} className="me-1" />{' '}
                                                    <span>{t('about-us')}</span>{' '}
                                                </ReusableLink>
                                            </li>
                                            <li className="mt-[10px]">
                                                <ReusableLink
                                                    href="/services"
                                                    className="text-slate-300 hover:text-slate-400 duration-500 ease-in-out flex items-center"
                                                >
                                                    <FiChevronRight width={18} className="me-1" />{' '}
                                                    <span>{t('services')}</span>{' '}
                                                </ReusableLink>
                                            </li>
                                            <li className="mt-[10px]">
                                                <ReusableLink
                                                    href="/pricing"
                                                    className="text-slate-300 hover:text-slate-400 duration-500 ease-in-out flex items-center"
                                                >
                                                    <FiChevronRight width={18} className="me-1" />{' '}
                                                    <span>{t('pricing')}</span>{' '}
                                                </ReusableLink>
                                            </li>
                                            <li className="mt-[10px]">
                                                <ReusableLink
                                                    href="/auth/signup"
                                                    className="text-slate-300 hover:text-slate-400 duration-500 ease-in-out flex items-center"
                                                >
                                                    <FiChevronRight width={18} className="me-1" />{' '}
                                                    <span>{t('signup')}</span>{' '}
                                                </ReusableLink>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="lg:col-span-3 md:col-span-4">
                                        <h5 className="tracking-[1px] text-gray-100 font-semibold">
                                            {t('useful-links')}
                                        </h5>
                                        <ul className="list-none footer-list mt-6">
                                            <li>
                                                <ReusableLink
                                                    href="/terms"
                                                    className="text-slate-300 hover:text-slate-400 duration-500 ease-in-out flex items-center"
                                                >
                                                    <FiChevronRight width={18} className="me-1" />{' '}
                                                    <span>{t('terms-conditions')}</span>{' '}
                                                </ReusableLink>
                                            </li>
                                            <li className="mt-[10px]">
                                                <ReusableLink
                                                    href="/privacy"
                                                    className="text-slate-300 hover:text-slate-400 duration-500 ease-in-out flex items-center"
                                                >
                                                    <FiChevronRight width={18} className="me-1" />{' '}
                                                    <span>{t('privacy-title')}</span>{' '}
                                                </ReusableLink>
                                            </li>
                                            <li className="mt-[10px]">
                                                <ReusableLink
                                                    href="/featured-properties"
                                                    className="text-slate-300 hover:text-slate-400 duration-500 ease-in-out flex items-center"
                                                >
                                                    <FiChevronRight width={18} className="me-1" />{' '}
                                                    <span>{t('featured-properties')}</span>{' '}
                                                </ReusableLink>
                                            </li>
                                            <li className="mt-[10px]">
                                                <ReusableLink
                                                    href="/contact-us"
                                                    className="text-slate-300 hover:text-slate-400 duration-500 ease-in-out flex items-center"
                                                >
                                                    <FiChevronRight width={18} className="me-1" />{' '}
                                                    <span>{t('contact-us')}</span>{' '}
                                                </ReusableLink>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="lg:col-span-3 md:col-span-4">
                                        <h5 className="tracking-[1px] text-gray-100 font-semibold">
                                            {t('contact-details')}
                                        </h5>
                                        <div className="flex mt-6">
                                            <FiMapPin className="w-5 h-5 text-green-600 me-3"></FiMapPin>
                                            <div className="">
                                                <h6 className="text-gray-300 mb-2">{t('address-info')}</h6>
                                                <Link
                                                    href="https://maps.app.goo.gl/A629QdF68idAcHGL6"
                                                    target="_blank"
                                                    className="text-green-600 hover:text-green-700 duration-500 ease-in-out lightbox"
                                                >
                                                    {t('view-map')}
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="flex mt-6">
                                            <FiMail className="w-5 h-5 text-green-600 me-3"></FiMail>
                                            <div className="">
                                                <ReusableLink
                                                    href={`mailto:${t('contact-email-address')}`}
                                                    className="text-slate-300 hover:text-slate-400 duration-500 ease-in-out"
                                                >
                                                    {t('contact-email-address')}
                                                </ReusableLink>
                                            </div>
                                        </div>

                                        <div className="flex mt-6">
                                            <FiPhone className="w-5 h-5 text-green-600 me-3"></FiPhone>
                                            <div className="">
                                                <ReusableLink
                                                    href="tel:+254746661538"
                                                    className="text-slate-300 hover:text-slate-400 duration-500 ease-in-out"
                                                >
                                                    +254 746 661 538
                                                </ReusableLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-[30px] px-0 border-t border-gray-800 dark:border-gray-700">
                    <div className="container text-center">
                        <div className="grid md:grid-cols-2 items-center gap-6">
                            <div className="md:text-start text-center">
                                <p className="mb-0 text-gray-300">
                                    ©{new Date().getFullYear()} {t('developed-by')}{' '}
                                    <Link
                                        href="https://btj.so/en"
                                        target="_blank"
                                        className="text-reset text-green-600 hover:text-green-700 duration-500 ease-in-out lightbox"
                                    >
                                        BTJ Software
                                    </Link>
                                </p>
                            </div>

                            <ul className="list-none md:text-end text-center">
                                <li className="inline ms-1">
                                    <Link
                                        href="https://dribbble.com"
                                        target="_blank"
                                        className="btn btn-icon btn-sm text-gray-400 hover:text-white border border-gray-800 dark:border-gray-700 rounded-md hover:border-green-600 dark:hover:border-green-600 hover:bg-green-600 dark:hover:bg-green-600"
                                    >
                                        <FiDribbble className="h-4 w-4"></FiDribbble>
                                    </Link>
                                </li>
                                <li className="inline ms-1">
                                    <Link
                                        href="https://www.behance.net"
                                        target="_blank"
                                        className="btn btn-icon btn-sm text-gray-400 hover:text-white border border-gray-800 dark:border-gray-700 rounded-md hover:border-green-600 dark:hover:border-green-600 hover:bg-green-600 dark:hover:bg-green-600"
                                    >
                                        <RiBehanceFill width={18} className="align-baseline" />
                                    </Link>
                                </li>
                                <li className="inline ms-1">
                                    <Link
                                        href="http://linkedin.com/company"
                                        target="_blank"
                                        className="btn btn-icon btn-sm text-gray-400 hover:text-white border border-gray-800 dark:border-gray-700 rounded-md hover:border-green-600 dark:hover:border-green-600 hover:bg-green-600 dark:hover:bg-green-600"
                                    >
                                        <FiLinkedin className="h-4 w-4"></FiLinkedin>
                                    </Link>
                                </li>
                                <li className="inline ms-1">
                                    <Link
                                        href="https://www.facebook.com"
                                        target="_blank"
                                        className="btn btn-icon btn-sm text-gray-400 hover:text-white border border-gray-800 dark:border-gray-700 rounded-md hover:border-green-600 dark:hover:border-green-600 hover:bg-green-600 dark:hover:bg-green-600"
                                    >
                                        <FiFacebook className="h-4 w-4"></FiFacebook>
                                    </Link>
                                </li>
                                <li className="inline ms-1">
                                    <Link
                                        href="https://www.instagram.com/"
                                        target="_blank"
                                        className="btn btn-icon btn-sm text-gray-400 hover:text-white border border-gray-800 dark:border-gray-700 rounded-md hover:border-green-600 dark:hover:border-green-600 hover:bg-green-600 dark:hover:bg-green-600"
                                    >
                                        <FiInstagram className="h-4 w-4"></FiInstagram>
                                    </Link>
                                </li>
                                <li className="inline ms-1">
                                    <Link
                                        href="https://twitter.com"
                                        target="_blank"
                                        className="btn btn-icon btn-sm text-gray-400 hover:text-white border border-gray-800 dark:border-gray-700 rounded-md hover:border-green-600 dark:hover:border-green-600 hover:bg-green-600 dark:hover:bg-green-600"
                                    >
                                        <FiTwitter className="h-4 w-4"></FiTwitter>
                                    </Link>
                                </li>
                                <li className="inline ms-1">
                                    <ReusableLink
                                        href="mailto:mabdinasira@gmail.com"
                                        className="btn btn-icon btn-sm text-gray-400 hover:text-white border border-gray-800 dark:border-gray-700 rounded-md hover:border-green-600 dark:hover:border-green-600 hover:bg-green-600 dark:hover:bg-green-600"
                                    >
                                        <FiMail className="h-4 w-4"></FiMail>
                                    </ReusableLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
