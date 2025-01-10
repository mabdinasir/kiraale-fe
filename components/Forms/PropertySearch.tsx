'use client' // This is a client component 👈🏽

import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import React, { FC, useState } from 'react'
import { FiHome, FiSearch } from 'react-icons/fi'
import { LuCircleDollarSign } from 'react-icons/lu'

const Select = dynamic(() => import('react-select'), { ssr: false })

type PropertySearchFormProps = {
    categories: { value: string; label: string }[]
    minPrice: { value: string; label: string }[]
    maxPrice: { value: string; label: string }[]
}

const PropertySearchForm: FC<PropertySearchFormProps> = ({ categories, minPrice, maxPrice }) => {
    const t = useTranslations()
    return (
        <form action="#">
            <div className="registration-form text-dark text-start">
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-0 gap-6">
                    <div>
                        <label className="form-label text-slate-900 dark:text-white font-medium">
                            {t('search')} : <span className="text-red-600">*</span>
                        </label>
                        <div className="filter-search-form relative filter-border mt-2">
                            <FiSearch className="icons" width={18} />
                            <input
                                name="name"
                                type="text"
                                id="property-keyword"
                                className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                                placeholder={t('search-placeholder')}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="form-label text-slate-900 dark:text-white font-medium">
                            {t('select-category')}:
                        </label>
                        <div className="filter-search-form relative filter-border mt-2">
                            <FiHome className="icons" width={18} />
                            <Select
                                className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                                options={categories}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="form-label text-slate-900 dark:text-white font-medium">
                            {t('min-price')} :
                        </label>
                        <div className="filter-search-form relative filter-border mt-2">
                            <LuCircleDollarSign className="icons" width={18} />
                            <Select
                                className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                                options={minPrice}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="form-label text-slate-900 dark:text-white font-medium">
                            {t('max-price')} :
                        </label>
                        <div className="filter-search-form relative mt-2">
                            <LuCircleDollarSign className="icons" width={18} />
                            <Select
                                className="form-input filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                                options={maxPrice}
                            />
                        </div>
                    </div>

                    <div className="lg:mt-6">
                        <input
                            type="submit"
                            id="search-buy"
                            name="search"
                            className="btn bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 text-white searchbtn submit-btn w-full !h-12 rounded"
                            value={t('search')}
                        />
                    </div>
                </div>
            </div>
        </form>
    )
}

const PropertySearch = () => {
    const t = useTranslations()
    const [activeTabIndex, setactiveTabIndex] = useState(0)

    const handleTabClick = (tabIndex: number) => {
        setactiveTabIndex(tabIndex)
    }

    const Houses = [
        { value: 'AF', label: 'Apartment' },
        { value: 'AZ', label: 'Offices' },
        { value: 'BS', label: 'Townhome' },
    ]
    const minPrice = [
        { value: '1', label: '500' },
        { value: '2', label: '1000' },
        { value: '3', label: '2000' },
        { value: '4', label: '3000' },
        { value: '5', label: '4000' },
        { value: '6', label: '5000' },
        { value: '7', label: '6000' },
    ]
    const maxPrice = [...minPrice]

    return (
        <div className="grid grid-cols-1">
            <ul
                className="inline-block sm:w-fit w-full flex-wrap justify-center text-center p-4 bg-white dark:bg-slate-900 rounded-t-xl border-b dark:border-gray-800"
                id="myTab"
                data-tabs-toggle="#StarterContent"
                role="tablist"
            >
                {['buy', 'sell', 'rent'].map((tab, index) => (
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
                            {t(tab)}
                        </button>
                    </li>
                ))}
            </ul>

            <div
                id="StarterContent"
                className="p-6 bg-white dark:bg-slate-900 rounded-ss-none rounded-se-none md:rounded-se-xl rounded-xl shadow-md dark:shadow-gray-700"
            >
                <PropertySearchForm categories={Houses} minPrice={minPrice} maxPrice={maxPrice} />
            </div>
        </div>
    )
}

export default PropertySearch
