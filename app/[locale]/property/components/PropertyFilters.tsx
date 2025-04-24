'use client' // This is a client component 👈🏽

import React from 'react'
import { FiSearch } from 'react-icons/fi'
import { useTranslations } from 'next-intl'
import { countries, maxPrice, proprtyTypes } from '@lib/constants'
import { useSearchParams } from 'next/navigation'

const PropertyFilters = () => {
    const t = useTranslations()
    const searchParams = useSearchParams()

    const countryValue = searchParams.get('country') || ''
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
        <div className="lg:col-span-4 md:col-span-6">
            <div className="shadow dark:shadow-gray-700 p-6 rounded-xl bg-white dark:bg-slate-900 sticky top-20">
                <form>
                    <div className="grid grid-cols-1 gap-3">
                        {/* Country Selector */}
                        <div>
                            <label className="font-medium">{t('country')} :</label>
                            <select
                                name="country"
                                className="form-select form-input border border-slate-100 dark:border-slate-800 block w-full mt-1"
                                defaultValue={countryValue}
                                required
                            >
                                {countries.map((country) => (
                                    <option key={country.value} value={country.value}>
                                        {country.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* Search Input */}
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
    )
}

export default PropertyFilters
