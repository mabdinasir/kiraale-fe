'use client' // This is a client component 👈🏽

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import PropertySearchForm from './forms/PropertySearchForm'
import { useSearchParams } from 'next/navigation'

const PropertySearch = () => {
    const t = useTranslations()
    const searchParams = useSearchParams()
    const initialListingType = searchParams.get('listingType') === 'SALE' ? 1 : 0
    const [activeTabIndex, setActiveTabIndex] = useState(initialListingType || 0)

    const handleTabClick = (tabIndex: number) => {
        setActiveTabIndex(tabIndex)
    }

    const translatedTabs = ['rent', 'buy'].map((tab) => t(tab))

    return (
        <div className="grid grid-cols-1">
            <ul
                className="inline-block sm:w-fit w-full flex-wrap justify-center text-center p-4 bg-white dark:bg-slate-900 rounded-t-xl border-b dark:border-gray-800"
                id="myTab"
                data-tabs-toggle="#StarterContent"
                role="tablist"
            >
                {translatedTabs.map((tab, index) => (
                    <li key={tab} role="presentation" className="inline-block">
                        <button
                            onClick={() => handleTabClick(index)}
                            className={`px-6 py-2 text-base font-medium rounded-md w-full transition-all duration-500 ease-in-out ${
                                activeTabIndex === index ? 'text-white bg-green-600' : 'hover:text-green-600'
                            }`}
                            id={`${tab}-home-tab`}
                            type="button"
                            role="tab"
                            aria-selected={activeTabIndex === index}
                        >
                            {tab}
                        </button>
                    </li>
                ))}
            </ul>

            <div
                id="StarterContent"
                className="p-6 bg-white dark:bg-slate-900 rounded-ss-none rounded-se-none md:rounded-se-xl rounded-xl shadow-md dark:shadow-gray-700"
            >
                <PropertySearchForm activeTabIndex={activeTabIndex} />
            </div>
        </div>
    )
}

export default PropertySearch
