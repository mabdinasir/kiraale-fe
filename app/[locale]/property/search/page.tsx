'use client' // This is a client component 👈🏽

import React from 'react'
import { FiSearch } from 'react-icons/fi'
import { useTranslations } from 'next-intl'
import StoreProvider from 'app/[locale]/StoreProvider'
import PropertyListItem from '../components/PropertyListItem'
import { maxPrice, proprtyTypes } from '@lib/constants'
import { useSearchParams } from 'next/navigation'

const PropertyList = () => {
    const t = useTranslations()
    const searchParams = useSearchParams()

    const query = searchParams.get('query') || ''
    const minPriceValue = searchParams.get('minPrice') || ''
    const maxPriceValue = searchParams.get('maxPrice') || ''
    const propertyType = searchParams.get('propertyType') || ''
    const listingType = searchParams.get('listingType') || ''

    const translatedPropertyTypes = proprtyTypes.map(({ label, value }) => ({
        label: t(label),
        value,
    }))

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
                            {t('property-listings')}
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
                    <div className="grid lg:grid-cols-12 md:grid-cols-8 grid-cols-1 gap-[30px]">
                        <div className="lg:col-span-4 md:col-span-6">
                            <div className="shadow dark:shadow-gray-700 p-6 rounded-xl bg-white dark:bg-slate-900 sticky top-20">
                                <form>
                                    <div className="grid grid-cols-1 gap-3">
                                        <div>
                                            <label htmlFor="searchname" className="font-medium">
                                                {t('search-properties')}
                                            </label>
                                            <div className="relative mt-2">
                                                <FiSearch className="absolute top-[8px] start-3" width={18} />
                                                <input
                                                    name="query"
                                                    id="search_query"
                                                    type="text"
                                                    className="form-input border border-slate-100 dark:border-slate-800 ps-10"
                                                    placeholder={t('search')}
                                                    defaultValue={query}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="font-medium">{t('categories')} :</label>
                                            <select
                                                name="propertyType"
                                                className="form-select form-input border border-slate-100 dark:border-slate-800 block w-full mt-1"
                                                defaultValue={propertyType}
                                            >
                                                {translatedPropertyTypes.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="font-medium">{t('listing-type')} :</label>
                                            <select
                                                name="listingType"
                                                className="form-select form-input border border-slate-100 dark:border-slate-800 block w-full mt-1"
                                                defaultValue={listingType}
                                            >
                                                {['rent', 'sale'].map((option) => (
                                                    <option key={option} value={option.toUpperCase()}>
                                                        {t(option)}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="font-medium">{t('min-price')} :</label>
                                            <select
                                                name="minPrice"
                                                className="form-select form-input border border-slate-100 dark:border-slate-800 block w-full mt-1"
                                                defaultValue={minPriceValue || maxPrice[0].value}
                                            >
                                                {maxPrice.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="font-medium">{t('max-price')} :</label>
                                            <select
                                                name="maxPrice"
                                                className="form-select form-input border border-slate-100 dark:border-slate-800 block w-full mt-1"
                                                defaultValue={maxPriceValue || maxPrice[maxPrice.length - 1].value}
                                            >
                                                {maxPrice.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <input
                                                type="submit"
                                                className="btn bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 text-white rounded-md w-full"
                                                value={t('apply-filters')}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <StoreProvider key={'search-properties'}>
                            <PropertyListItem />
                        </StoreProvider>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PropertyList
