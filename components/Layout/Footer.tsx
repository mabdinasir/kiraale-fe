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
    FiShoppingCart,
    FiTwitter,
} from 'react-icons/fi'
import { BsPencil } from 'react-icons/bs'
import { RiBehanceFill } from 'react-icons/ri'
import { useTranslations } from 'next-intl'
import ReusableLink from '@components/Links/ReusableLink'

const Footer = () => {
    const t = useTranslations()

    return (
        <>
            <footer className="relative bg-slate-900 dark:bg-slate-800 mt-24">
                <div className="container">
                    <div className="grid grid-cols-1">
                        <div className="relative py-16">
                            {/* <!-- Subscribe --> */}
                            <div className="relative w-full">
                                <div className="relative -top-40 bg-white dark:bg-slate-900 lg:px-8 px-6 py-10 rounded-xl shadow-lg dark:shadow-gray-700 overflow-hidden">
                                    <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-[30px]">
                                        <div className="md:text-start text-center z-1">
                                            <h3 className="md:text-3xl text-2xl md:leading-normal leading-normal font-medium text-black dark:text-white">
                                                {t('subscribe-title')}
                                            </h3>
                                            <p className="text-slate-400 max-w-xl mx-auto">{t('subscribe-subtitle')}</p>
                                        </div>

                                        <div className="subcribe-form z-1">
                                            <form className="relative max-w-lg md:ms-auto">
                                                <input
                                                    type="email"
                                                    id="subcribe"
                                                    name="email"
                                                    className="rounded-full bg-white dark:bg-slate-900 shadow dark:shadow-gray-700"
                                                    placeholder={`${t('enter-email')} :`}
                                                />
                                                <button
                                                    type="submit"
                                                    className="btn bg-green-600 hover:bg-green-700 text-white rounded-full"
                                                >
                                                    {t('subscribe')}
                                                </button>
                                            </form>
                                        </div>
                                    </div>

                                    <div className="absolute -top-5 -start-5">
                                        <FiMail
                                            className=" text-black/5 dark:text-white/5 ltr:-rotate-45 rtl:rotate-45"
                                            style={{ width: '150px', height: '150px' }}
                                        />
                                    </div>

                                    <div className="absolute -bottom-5 -end-5">
                                        <BsPencil
                                            className=" text-black/5 dark:text-white/5 rtl:-rotate-90"
                                            style={{ width: '150px', height: '150px' }}
                                        />
                                    </div>
                                </div>

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
                                                    <FiChevronRight width={18} className="me-1" /> <span>About us</span>{' '}
                                                </ReusableLink>
                                            </li>
                                            <li className="mt-[10px]">
                                                <ReusableLink
                                                    href="/features"
                                                    className="text-slate-300 hover:text-slate-400 duration-500 ease-in-out flex items-center"
                                                >
                                                    <FiChevronRight width={18} className="me-1" /> <span>Services</span>{' '}
                                                </ReusableLink>
                                            </li>
                                            <li className="mt-[10px]">
                                                <ReusableLink
                                                    href="/pricing"
                                                    className="text-slate-300 hover:text-slate-400 duration-500 ease-in-out flex items-center"
                                                >
                                                    <FiChevronRight width={18} className="me-1" /> <span>Pricing</span>{' '}
                                                </ReusableLink>
                                            </li>
                                            <li className="mt-[10px]">
                                                <ReusableLink
                                                    href="/blogs"
                                                    className="text-slate-300 hover:text-slate-400 duration-500 ease-in-out flex items-center"
                                                >
                                                    <FiChevronRight width={18} className="me-1" /> <span>Blog</span>{' '}
                                                </ReusableLink>
                                            </li>
                                            <li className="mt-[10px]">
                                                <ReusableLink
                                                    href="/auth/login"
                                                    className="text-slate-300 hover:text-slate-400 duration-500 ease-in-out flex items-center"
                                                >
                                                    <FiChevronRight width={18} className="me-1" /> <span>Login</span>{' '}
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
                                                    <span>{t('privacy-policy')}</span>{' '}
                                                </ReusableLink>
                                            </li>
                                            <li className="mt-[10px]">
                                                <ReusableLink
                                                    href="/grid"
                                                    className="text-slate-300 hover:text-slate-400 duration-500 ease-in-out flex items-center"
                                                >
                                                    <FiChevronRight width={18} className="me-1" /> <span>Listing</span>{' '}
                                                </ReusableLink>
                                            </li>
                                            <li className="mt-[10px]">
                                                <ReusableLink
                                                    href="/contact"
                                                    className="text-slate-300 hover:text-slate-400 duration-500 ease-in-out flex items-center"
                                                >
                                                    <FiChevronRight width={18} className="me-1" /> <span> Contact</span>{' '}
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
                                                <h6 className="text-gray-300 mb-2">
                                                    Tenth Street, <br /> 1st Avaneue, Eastleigh, <br /> Nairobi, Kenya
                                                </h6>
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
                                                    href="mailto:contact@example.com"
                                                    className="text-slate-300 hover:text-slate-400 duration-500 ease-in-out"
                                                >
                                                    contact@eastleighrealestate.com
                                                </ReusableLink>
                                            </div>
                                        </div>

                                        <div className="flex mt-6">
                                            <FiPhone className="w-5 h-5 text-green-600 me-3"></FiPhone>
                                            <div className="">
                                                <ReusableLink
                                                    href="tel:+152534-468-854"
                                                    className="text-slate-300 hover:text-slate-400 duration-500 ease-in-out"
                                                >
                                                    +254 746 661 538
                                                </ReusableLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- Subscribe --> */}
                        </div>
                    </div>
                </div>
                <div className="py-[30px] px-0 border-t border-gray-800 dark:border-gray-700">
                    <div className="container text-center">
                        <div className="grid md:grid-cols-2 items-center gap-6">
                            <div className="md:text-start text-center">
                                <p className="mb-0 text-gray-300">
                                    ©{new Date().getFullYear()} Eastleigh Real Estate. Designed & Developed with{' '}
                                    <i className="mdi mdi-heart text-red-600"></i> by{' '}
                                    <Link
                                        href="https://btj.so/en"
                                        target="_blank"
                                        className="text-reset text-green-600 hover:text-green-700 duration-500 ease-in-out lightbox"
                                    >
                                        BTJ Software
                                    </Link>
                                    .
                                </p>
                            </div>

                            <ul className="list-none md:text-end text-center">
                                <li className="inline ms-1">
                                    <Link
                                        href="https://1.envato.market/hously-next"
                                        target="_blank"
                                        className="btn btn-icon btn-sm text-gray-400 hover:text-white border border-gray-800 dark:border-gray-700 rounded-md hover:border-green-600 dark:hover:border-green-600 hover:bg-green-600 dark:hover:bg-green-600"
                                    >
                                        <FiShoppingCart className="h-4 w-4"></FiShoppingCart>
                                    </Link>
                                </li>
                                <li className="inline ms-1">
                                    <Link
                                        href="https://dribbble.com/shreethemes"
                                        target="_blank"
                                        className="btn btn-icon btn-sm text-gray-400 hover:text-white border border-gray-800 dark:border-gray-700 rounded-md hover:border-green-600 dark:hover:border-green-600 hover:bg-green-600 dark:hover:bg-green-600"
                                    >
                                        <FiDribbble className="h-4 w-4"></FiDribbble>
                                    </Link>
                                </li>
                                <li className="inline ms-1">
                                    <Link
                                        href="https://www.behance.net/shreethemes"
                                        target="_blank"
                                        className="btn btn-icon btn-sm text-gray-400 hover:text-white border border-gray-800 dark:border-gray-700 rounded-md hover:border-green-600 dark:hover:border-green-600 hover:bg-green-600 dark:hover:bg-green-600"
                                    >
                                        <RiBehanceFill width={18} className="align-baseline" />
                                    </Link>
                                </li>
                                <li className="inline ms-1">
                                    <Link
                                        href="http://linkedin.com/company/shreethemes"
                                        target="_blank"
                                        className="btn btn-icon btn-sm text-gray-400 hover:text-white border border-gray-800 dark:border-gray-700 rounded-md hover:border-green-600 dark:hover:border-green-600 hover:bg-green-600 dark:hover:bg-green-600"
                                    >
                                        <FiLinkedin className="h-4 w-4"></FiLinkedin>
                                    </Link>
                                </li>
                                <li className="inline ms-1">
                                    <Link
                                        href="https://www.facebook.com/shreethemes"
                                        target="_blank"
                                        className="btn btn-icon btn-sm text-gray-400 hover:text-white border border-gray-800 dark:border-gray-700 rounded-md hover:border-green-600 dark:hover:border-green-600 hover:bg-green-600 dark:hover:bg-green-600"
                                    >
                                        <FiFacebook className="h-4 w-4"></FiFacebook>
                                    </Link>
                                </li>
                                <li className="inline ms-1">
                                    <Link
                                        href="https://www.instagram.com/shreethemes/"
                                        target="_blank"
                                        className="btn btn-icon btn-sm text-gray-400 hover:text-white border border-gray-800 dark:border-gray-700 rounded-md hover:border-green-600 dark:hover:border-green-600 hover:bg-green-600 dark:hover:bg-green-600"
                                    >
                                        <FiInstagram className="h-4 w-4"></FiInstagram>
                                    </Link>
                                </li>
                                <li className="inline ms-1">
                                    <Link
                                        href="https://twitter.com/shreethemes"
                                        target="_blank"
                                        className="btn btn-icon btn-sm text-gray-400 hover:text-white border border-gray-800 dark:border-gray-700 rounded-md hover:border-green-600 dark:hover:border-green-600 hover:bg-green-600 dark:hover:bg-green-600"
                                    >
                                        <FiTwitter className="h-4 w-4"></FiTwitter>
                                    </Link>
                                </li>
                                <li className="inline ms-1">
                                    <ReusableLink
                                        href="mailto:support@shreethemes.in"
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
