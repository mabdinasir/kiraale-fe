'use client' // This is a client component 👈🏽

import React from 'react'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import Form from 'next/form'
import { FiHome, FiSearch } from 'react-icons/fi'
import { LuCircleDollarSign } from 'react-icons/lu'
import { useParams } from 'next/navigation'
import { maxPrice, minPrice, proprtyTypes } from '@lib/constants'

const Select = dynamic(() => import('react-select'), { ssr: false })

const PropertySearchForm = () => {
    const t = useTranslations()
    const { locale } = useParams()
    const path = `/${locale}/property/search`

    const translatedPropertyTypes = proprtyTypes.map(({ label, value }) => ({
        label: t(label),
        value,
    }))

    return (
        <Form action={path}>
            <div className="registration-form text-dark text-start">
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-0 gap-6">
                    <div>
                        <label className="form-label text-slate-900 dark:text-white font-medium">
                            {t('search')} : <span className="text-red-600">*</span>
                        </label>
                        <div className="filter-search-form relative filter-border mt-2">
                            <FiSearch className="icons" width={18} />
                            <input
                                name="query"
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
                                options={translatedPropertyTypes}
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
                            id="search-buy-rent-property"
                            name="search"
                            className="btn bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 text-white searchbtn submit-btn w-full !h-12 rounded"
                            value={t('search')}
                        />
                    </div>
                </div>
            </div>
        </Form>
    )
}

export default PropertySearchForm
