'use client' // This is a client component 👈🏽

import React from 'react'
import { useTranslations } from 'next-intl'

import { FiHome, FiMapPin, FiDollarSign } from 'react-icons/fi'
import { FaBath, FaBed, FaParking } from 'react-icons/fa'
import { CgDetailsMore } from 'react-icons/cg'
import { IoCalendarNumber, IoExpandOutline } from 'react-icons/io5'
import dynamic from 'next/dynamic'
import { MdHolidayVillage } from 'react-icons/md'

const Select = dynamic(() => import('react-select'), { ssr: false })

const propertyTypes = [
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'hotel', label: 'Hotel' },
    { value: 'land', label: 'Land' },
    { value: 'industrial', label: 'Industrial' },
]
const AddPropertyForm = () => {
    const t = useTranslations()

    return (
        <form>
            <div className="grid grid-cols-12 gap-5">
                {/* Title */}
                <div className="col-span-12">
                    <label htmlFor="title" className="font-medium">
                        {t('property-title')}:
                    </label>
                    <div className="form-icon relative mt-2">
                        <FiHome className="w-4 h-4 absolute top-3 start-4 text-green-600" />
                        <input
                            name="title"
                            id="title"
                            type="text"
                            className="form-input ps-11"
                            placeholder={t('property-title')}
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="col-span-12">
                    <label htmlFor="description" className="font-medium">
                        {t('description')}:
                    </label>
                    <div className="form-icon relative mt-2">
                        <CgDetailsMore className="w-4 h-4 absolute top-3 start-4 text-green-600" />
                        <textarea
                            name="description"
                            id="description"
                            className="form-input ps-11 h-28"
                            placeholder={t('description')}
                        />
                    </div>
                </div>

                {/* Address */}
                <div className="col-span-12">
                    <label htmlFor="address" className="font-medium">
                        {t('address')}:
                    </label>
                    <div className="form-icon relative mt-2">
                        <FiMapPin className="w-4 h-4 absolute top-3 start-4 text-green-600" />
                        <input
                            name="address"
                            id="address"
                            type="text"
                            className="form-input ps-11"
                            placeholder={t('address')}
                        />
                    </div>
                </div>

                {/* Property Type */}
                <div className="col-span-12">
                    <label htmlFor="property-type" className="form-label text-slate-900 dark:text-white font-medium">
                        {t('property-type')}:
                    </label>
                    <div className="filter-search-form relative filter-border mt-2">
                        <MdHolidayVillage className="icons" width={18} />
                        <Select
                            className="filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                            options={propertyTypes}
                        />
                    </div>
                </div>

                {/* Price */}
                <div className="col-span-12">
                    <label htmlFor="price" className="font-medium">
                        {t('price')}:
                    </label>
                    <div className="form-icon relative mt-2">
                        <FiDollarSign className="w-4 h-4 absolute top-3 start-4 text-green-600" />
                        <input
                            name="price"
                            id="price"
                            type="number"
                            className="form-input ps-11"
                            placeholder={t('price')}
                            min={0}
                        />
                    </div>
                </div>

                {/* yearBuilt */}
                <div className="col-span-6">
                    <label htmlFor="yearBuilt" className="font-medium">
                        {t('year-built')}:
                    </label>
                    <div className="form-icon relative mt-2">
                        <IoCalendarNumber className="w-4 h-4 absolute top-3 start-4 text-green-600" />
                        <input
                            name="yearBuilt"
                            id="yearBuilt"
                            type="date"
                            className="form-input ps-11"
                            placeholder={t('year-built')}
                        />
                    </div>
                </div>

                {/* Area */}
                <div className="col-span-6">
                    <label htmlFor="area" className="font-medium">
                        {t('area')} (sq. ft.):
                    </label>
                    <div className="form-icon relative mt-2">
                        <IoExpandOutline className="w-4 h-4 absolute top-3 start-4 text-green-600" />
                        <input
                            name="area"
                            id="area"
                            type="number"
                            className="form-input ps-11"
                            placeholder={t('area')}
                            min={1}
                        />
                    </div>
                </div>

                {/* Bedrooms */}
                <div className="col-span-4">
                    <label htmlFor="bedrooms" className="font-medium">
                        {t('bedrooms')}:
                    </label>
                    <div className="form-icon relative mt-2">
                        <FaBed className="w-4 h-4 absolute top-3 start-4 text-green-600" />
                        <input
                            name="bedrooms"
                            id="bedrooms"
                            type="number"
                            className="form-input ps-11"
                            placeholder={t('bedrooms')}
                            min={1}
                        />
                    </div>
                </div>

                {/* Bathrooms */}
                <div className="col-span-4">
                    <label htmlFor="bathrooms" className="font-medium">
                        {t('bathrooms')}:
                    </label>
                    <div className="form-icon relative mt-2">
                        <FaBath className="w-4 h-4 absolute top-3 start-4 text-green-600" />
                        <input
                            name="bathrooms"
                            id="bathrooms"
                            type="number"
                            className="form-input ps-11"
                            placeholder={t('bathrooms')}
                            min={1}
                        />
                    </div>
                </div>

                {/* Parking */}
                <div className="col-span-4" id="parking">
                    <label htmlFor="parking" className="font-medium">
                        {t('parking')}:
                    </label>
                    <div className="form-icon relative mt-2">
                        <FaParking className="w-4 h-4 absolute top-3 start-4 text-green-600" />
                        <input
                            name="parking"
                            id="parking"
                            type="number"
                            className="form-input ps-11"
                            placeholder={t('parking')}
                            min={0}
                        />
                    </div>
                </div>

                {/* Air Conditioning */}
                <div className="col-span-12 md:col-span-4">
                    <label htmlFor="airConditioning" className="font-medium flex items-center gap-2">
                        {t('air-conditioning')}
                        <input
                            type="checkbox"
                            name="airConditioning"
                            id="airConditioning"
                            className="form-checkbox w-6 h-6 rounded border-2 border-green-600 text-green-600 focus:ring-0 focus:border-green-600 checked:border-green-600 checked:bg-green-600 hover:border-green-700 hover:cursor-pointer"
                        />
                    </label>
                </div>

                {/* Dishwasher */}
                <div className="col-span-12 md:col-span-4">
                    <label htmlFor="dishwasher" className="font-medium flex items-center gap-2">
                        {t('dishwasher')}
                        <input
                            type="checkbox"
                            name="dishwasher"
                            id="dishwasher"
                            className="form-checkbox w-6 h-6 rounded border-2 border-green-600 text-green-600 focus:ring-0 focus:border-green-600 checked:border-green-600 checked:bg-green-600 hover:border-green-700 hover:cursor-pointer"
                        />
                    </label>
                </div>

                {/* Wardrobe */}
                <div className="col-span-12 md:col-span-4">
                    <label htmlFor="wardrobe" className="font-medium flex items-center gap-2">
                        {t('wardrobe')}
                        <input
                            type="checkbox"
                            name="wardrobe"
                            id="wardrobe"
                            className="form-checkbox w-6 h-6 rounded border-2 border-green-600 text-green-600 focus:ring-0 focus:border-green-600 checked:border-green-600 checked:bg-green-600 hover:border-green-700 hover:cursor-pointer"
                        />
                    </label>
                </div>

                {/* Furnished */}
                <div className="col-span-12 md:col-span-4">
                    <label htmlFor="furnished" className="font-medium flex items-center gap-2">
                        {t('furnished')}
                        <input
                            type="checkbox"
                            name="furnished"
                            id="furnished"
                            className="form-checkbox w-6 h-6 rounded border-2 border-green-600 text-green-600 focus:ring-0 focus:border-green-600 checked:border-green-600 checked:bg-green-600 hover:border-green-700 hover:cursor-pointer"
                        />
                    </label>
                </div>

                {/* Laundry */}
                <div className="col-span-12 md:col-span-4">
                    <label htmlFor="laundry" className="font-medium flex items-center gap-2">
                        {t('laundry')}
                        <input
                            type="checkbox"
                            name="laundry"
                            id="laundry"
                            className="form-checkbox w-6 h-6 rounded border-2 border-green-600 text-green-600 focus:ring-0 focus:border-green-600 checked:border-green-600 checked:bg-green-600 hover:border-green-700 hover:cursor-pointer"
                        />
                    </label>
                </div>

                {/* Oven */}
                <div className="col-span-12 md:col-span-4">
                    <label htmlFor="oven" className="font-medium flex items-center gap-2">
                        {t('oven')}
                        <input
                            type="checkbox"
                            name="oven"
                            id="oven"
                            className="form-checkbox w-6 h-6 rounded border-2 border-green-600 text-green-600 focus:ring-0 focus:border-green-600 checked:border-green-600 checked:bg-green-600 hover:border-green-700 hover:cursor-pointer"
                        />
                    </label>
                </div>

                {/* Pool */}
                <div className="col-span-12 md:col-span-4">
                    <label htmlFor="pool" className="font-medium flex items-center gap-2">
                        {t('pool')}
                        <input
                            type="checkbox"
                            name="pool"
                            id="pool"
                            className="form-checkbox w-6 h-6 rounded border-2 border-green-600 text-green-600 focus:ring-0 focus:border-green-600 checked:border-green-600 checked:bg-green-600 hover:border-green-700 hover:cursor-pointer"
                        />
                    </label>
                </div>
            </div>

            <button
                type="submit"
                id="submit"
                name="send"
                className="btn bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 text-white rounded-md mt-5"
            >
                {t('add-property')}
            </button>
        </form>
    )
}

export default AddPropertyForm
