'use client' // This is a client component 👈🏽

import React, { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

const BuyTab = () => {
    const [activeTabIndex, setactiveTabIndex] = useState(0)
    const t = useTranslations()

    const handleTabClick = (tabIndex: number) => {
        setactiveTabIndex(tabIndex)
    }

    return (
        <>
            <div className="container lg:mt-24 mt-16">
                <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
                    <div className="lg:col-span-4 md:col-span-5">
                        <div className="sticky top-20">
                            <ul
                                className="flex-column text-center p-6 bg-white dark:bg-slate-900 shadow dark:shadow-gray-700 rounded-md"
                                id="myTab"
                                data-tabs-toggle="#myTabContent"
                                role="tablist"
                            >
                                <li role="presentation">
                                    <button
                                        className={`px-4 py-2 text-base font-medium rounded-md w-full mt-3 transition-all duration-500 ease-in-out ${activeTabIndex === 0 ? 'text-white bg-green-600' : 'dark:hover:bg-slate-800 dark:hover:text-white hover:bg-gray-50 hover:text-green-600'}`}
                                        onClick={() => handleTabClick(0)}
                                    >
                                        {t('pre-approval-letter')}
                                    </button>
                                </li>
                                <li role="presentation">
                                    <button
                                        className={`px-4 py-2 text-base font-medium rounded-md w-full mt-3 transition-all duration-500 ease-in-out ${activeTabIndex === 1 ? 'text-white bg-green-600' : 'dark:hover:bg-slate-800 dark:hover:text-white hover:bg-gray-50 hover:text-green-600'}`}
                                        onClick={() => handleTabClick(1)}
                                    >
                                        {t('schedule-a-showing')}
                                    </button>
                                </li>
                                <li role="presentation">
                                    <button
                                        className={`px-4 py-2 text-base font-medium rounded-md w-full mt-3 transition-all duration-500 ease-in-out ${activeTabIndex === 2 ? 'text-white bg-green-600' : 'dark:hover:bg-slate-800 dark:hover:text-white hover:bg-gray-50 hover:text-green-600'}`}
                                        onClick={() => handleTabClick(2)}
                                    >
                                        {t('submit-an-offer')}
                                    </button>
                                </li>
                                <li role="presentation">
                                    <button
                                        className={`px-4 py-2 text-base font-medium rounded-md w-full mt-3 transition-all duration-500 ease-in-out ${activeTabIndex === 3 ? 'text-white bg-green-600' : 'dark:hover:bg-slate-800 dark:hover:text-white hover:bg-gray-50 hover:text-green-600'}`}
                                        onClick={() => handleTabClick(3)}
                                    >
                                        {t('property-inspection')}
                                    </button>
                                </li>
                                <li role="presentation">
                                    <button
                                        className={`px-4 py-2 text-base font-medium rounded-md w-full mt-3 transition-all duration-500 ease-in-out ${activeTabIndex === 4 ? 'text-white bg-green-600' : 'dark:hover:bg-slate-800 dark:hover:text-white hover:bg-gray-50 hover:text-green-600'}`}
                                        onClick={() => handleTabClick(4)}
                                    >
                                        {t('appraisal')}
                                    </button>
                                </li>
                                <li role="presentation">
                                    <button
                                        className={`px-4 py-2 text-base font-medium rounded-md w-full mt-3 transition-all duration-500 ease-in-out ${activeTabIndex === 5 ? 'text-white bg-green-600' : 'dark:hover:bg-slate-800 dark:hover:text-white hover:bg-gray-50 hover:text-green-600'}`}
                                        onClick={() => handleTabClick(5)}
                                    >
                                        {t('closing-deal')}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="lg:col-span-8 md:col-span-7">
                        <div id="myTabContent">
                            {activeTabIndex === 0 && (
                                <div className="">
                                    <Image
                                        src="/images/svg/Agent_Monochromatic.svg"
                                        alt=""
                                        priority
                                        width={404}
                                        height={304}
                                    />
                                    <div className="mt-6">
                                        <h5 className="font-medium text-xl">{t('pre-approval-letter')}</h5>
                                        <p className="text-slate-400 mt-3">{t('pre-approval-letter-desc')}</p>
                                    </div>
                                </div>
                            )}
                            {activeTabIndex === 1 && (
                                <div>
                                    <Image
                                        src="/images/svg/presentation_Flatline.svg"
                                        alt=""
                                        priority
                                        width={404}
                                        height={304}
                                    />
                                    <div className="mt-6">
                                        <h5 className="font-medium text-xl">{t('schedule-a-showing')}</h5>
                                        <p className="text-slate-400 mt-3">{t('schedule-a-showing-desc')}</p>
                                    </div>
                                </div>
                            )}
                            {activeTabIndex === 2 && (
                                <div>
                                    <Image
                                        src="/images/svg/session_Flatline.svg"
                                        alt=""
                                        priority
                                        width={404}
                                        height={304}
                                    />
                                    <div className="mt-6">
                                        <h5 className="font-medium text-xl">{t('submit-an-offer')}</h5>
                                        <p className="text-slate-400 mt-3">{t('submit-an-offer-desc')}</p>
                                    </div>
                                </div>
                            )}
                            {activeTabIndex === 3 && (
                                <div id="inspection">
                                    <Image
                                        src="/images/svg/Startup_Flatline.svg"
                                        alt=""
                                        priority
                                        width={404}
                                        height={304}
                                    />
                                    <div className="mt-6">
                                        <h5 className="font-medium text-xl">{t('property-inspection')}</h5>
                                        <p className="text-slate-400 mt-3">{t('property-inspection-desc')}</p>
                                    </div>
                                </div>
                            )}
                            {activeTabIndex === 4 && (
                                <div>
                                    <Image
                                        src="/images/svg/team_Flatline.svg"
                                        alt=""
                                        priority
                                        width={404}
                                        height={304}
                                    />
                                    <div className="mt-6">
                                        <h5 className="font-medium text-xl">{t('appraisal')}</h5>
                                        <p className="text-slate-400 mt-3">{t('appraisal-desc')}</p>
                                    </div>
                                </div>
                            )}
                            {activeTabIndex === 5 && (
                                <div>
                                    <Image
                                        src="/images/svg/Team_meeting_Two.svg"
                                        alt=""
                                        priority
                                        width={404}
                                        height={304}
                                    />
                                    <div className="mt-6">
                                        <h5 className="font-medium text-xl">{t('closing-deal')}</h5>
                                        <p className="text-slate-400 mt-3">{t('closing-deal-desc')}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BuyTab
