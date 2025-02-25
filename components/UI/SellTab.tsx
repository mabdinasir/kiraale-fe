'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

const SellTab = () => {
    const [activeTabIndex, setActiveTabIndex] = useState(0)
    const t = useTranslations()

    const tabs = [
        { key: 'price-your-property', image: '/images/svg/pricing.svg' },
        { key: 'prepare-your-home', image: '/images/svg/Home_Prepare.svg' },
        { key: 'list-your-property', image: '/images/svg/List_Property.svg' },
        { key: 'schedule-showings', image: '/images/svg/Showings.svg' },
        { key: 'review-offers', image: '/images/svg/Offers.svg' },
        { key: 'finalize-sale', image: '/images/svg/Finalize_Sale.svg' },
    ]

    return (
        <div className="container lg:mt-24 mt-16">
            <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
                <div className="lg:col-span-4 md:col-span-5">
                    <div className="sticky top-20">
                        <ul className="flex-column text-center p-6 bg-white dark:bg-slate-900 shadow dark:shadow-gray-700 rounded-md">
                            {tabs.map((tab, index) => (
                                <li key={index} role="presentation">
                                    <button
                                        className={`px-4 py-2 text-base font-medium rounded-md w-full mt-3 transition-all duration-500 ease-in-out ${
                                            activeTabIndex === index
                                                ? 'text-white bg-green-600'
                                                : 'dark:hover:bg-slate-800 dark:hover:text-white hover:bg-gray-50 hover:text-green-600'
                                        }`}
                                        onClick={() => setActiveTabIndex(index)}
                                    >
                                        {t(tab.key)}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="lg:col-span-8 md:col-span-7">
                    <div id="sellTabContent">
                        {tabs.map(
                            (tab, index) =>
                                activeTabIndex === index && (
                                    <div key={index}>
                                        <Image src={tab.image} alt={t(tab.key)} priority width={404} height={304} />
                                        <div className="mt-6">
                                            <h5 className="font-medium text-xl">{t(tab.key)}</h5>
                                            <p className="text-slate-400 mt-3">{t(`${tab.key}-desc`)}</p>
                                        </div>
                                    </div>
                                ),
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellTab
