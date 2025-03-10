'use client' // This is a client component 👈🏽

import React from 'react'
import Link from 'next/link'
// import * as Unicons from '@iconscout/react-unicons'

import { FiArrowRight } from 'react-icons/fi'
import { useTranslations } from 'next-intl'

const Privacy = () => {
    const t = useTranslations()

    return (
        <div className="mt-20">
            <section
                style={{ backgroundImage: "url('/images/bg/01.jpg')" }}
                className="relative table w-full py-32 lg:py-36 bg-no-repeat bg-center bg-cover"
            >
                <div className="absolute inset-0 bg-black opacity-80"></div>
                <div className="container">
                    <div className="grid grid-cols-1 text-center mt-10">
                        <h3 className="md:text-4xl text-3xl md:leading-normal leading-normal font-medium text-white">
                            {t('privacy-title')}
                        </h3>
                    </div>
                </div>
            </section>
            <div className="relative">
                <div className="shape overflow-hidden z-1 text-white dark:text-slate-900">
                    <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                    </svg>
                </div>
            </div>
            <section className="relative lg:py-24 py-16">
                <div className="container">
                    <div className="md:flex justify-center">
                        <div className="md:w-3/4">
                            <div className="p-6 bg-white dark:bg-slate-900 shadow dark:shadow-gray-700 rounded-md">
                                <h5 className="text-xl font-medium mb-4">{t('overview')}</h5>
                                <p className="text-slate-400">{t('privacy-overview-description')}</p>

                                <h5 className="text-xl font-medium mb-4 mt-8">{t('privacy-use-title')}</h5>
                                <ul className="list-unstyled text-slate-400 mt-4">
                                    <li className="flex mt-2">
                                        <FiArrowRight className="text-green-600 align-middle me-2" />
                                        {t('privacy-use-1')}
                                    </li>
                                    <li className="flex mt-2">
                                        <FiArrowRight className="text-green-600 align-middle me-2" />
                                        {t('privacy-use-2')}
                                    </li>
                                    <li className="flex mt-2">
                                        <FiArrowRight className="text-green-600 align-middle me-2" />
                                        {t('privacy-use-3')}
                                    </li>
                                    <li className="flex mt-2">
                                        <FiArrowRight className="text-green-600 align-middle me-2" />
                                        {t('privacy-use-4')}
                                    </li>
                                    <li className="flex mt-2">
                                        <FiArrowRight className="text-green-600 align-middle me-2" />
                                        {t('privacy-use-5')}
                                    </li>
                                    <li className="flex mt-2">
                                        <FiArrowRight className="text-green-600 align-middle me-2" />
                                        {t('privacy-use-6')}
                                    </li>
                                </ul>

                                <h5 className="text-xl font-medium mb-4 mt-8">{t('privacy-info-title')}</h5>
                                <p className="text-slate-400">{t('privacy-info-description')}</p>

                                <div className="mt-8">
                                    <Link
                                        href="#"
                                        onClick={() => window.print()}
                                        className="btn bg-green-600 hover:bg-green-700 text-white rounded-md"
                                    >
                                        Print
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Privacy
