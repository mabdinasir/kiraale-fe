import React from 'react'
import Accordion from '@components/UI/Accordion'
import { FiArrowRight } from 'react-icons/fi'
import { termsFaqData } from '@data/data'
import { useTranslations } from 'next-intl'

const Terms = () => {
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
                            {t('terms-conditions')}
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
                                <h5 className="text-xl font-medium mb-4">{t('terms-introduction-title')}</h5>
                                <p className="text-slate-400">{t('terms-introduction-text')}</p>

                                <h5 className="text-xl font-medium mb-4 mt-8">{t('terms-user-agreements-title')}</h5>
                                <p className="text-slate-400">{t('terms-user-agreements-text-1')}</p>
                                <p className="text-slate-400 mt-3">{t('terms-user-agreements-text-2')}</p>
                                <p className="text-slate-400 mt-3">{t('terms-user-agreements-text-3')}</p>
                                <p className="text-slate-400 mt-3">{t('terms-user-agreements-text-4')}</p>
                                <p className="text-slate-400 mt-3">{t('terms-user-agreements-text-5')}</p>

                                <h5 className="text-xl font-medium mb-4 mt-8">{t('terms-restrictions-title')}</h5>
                                <p className="text-slate-400">{t('terms-restrictions-text')}</p>
                                <ul className="list-none text-slate-400 mt-3">
                                    <li className="flex mt-2">
                                        <FiArrowRight className=" text-green-600 align-middle me-2" />
                                        <span>{t('terms-restriction-1')}</span>
                                    </li>
                                    <li className="flex mt-2">
                                        <FiArrowRight className=" text-green-600 align-middle me-2" />
                                        <span>{t('terms-restriction-2')}</span>
                                    </li>
                                    <li className="flex mt-2">
                                        <FiArrowRight className=" text-green-600 align-middle me-2" />
                                        <span>{t('terms-restriction-3')}</span>
                                    </li>
                                    <li className="flex mt-2">
                                        <FiArrowRight className=" text-green-600 align-middle me-2" />
                                        <span>{t('terms-restriction-4')}</span>
                                    </li>
                                    <li className="flex mt-2">
                                        <FiArrowRight className=" text-green-600 align-middle me-2" />
                                        <span>{t('terms-restriction-5')}</span>
                                    </li>
                                </ul>

                                <h5 className="text-xl font-medium mt-8">{t('terms-faq-section-title')}</h5>
                                <Accordion accordionData={termsFaqData} />

                                {/* <div className="mt-6">
                                    <Link
                                        href="#"
                                        className="btn bg-green-600 hover:bg-green-700 text-white rounded-md"
                                    >
                                        {t('accept')}
                                    </Link>
                                    <Link
                                        href="#"
                                        className="btn bg-transparent hover:bg-green-600 border border-green-600 text-green-600 hover:text-white rounded-md ms-2"
                                    >
                                        {t('decline')}
                                    </Link>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Terms
