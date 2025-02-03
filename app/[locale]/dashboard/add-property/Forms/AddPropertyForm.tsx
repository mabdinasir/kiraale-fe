'use client' // This is a client component 👈🏽

import React, { useCallback, useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'

import { FiHome, FiMapPin, FiDollarSign } from 'react-icons/fi'
import { FaBath, FaBed, FaParking } from 'react-icons/fa'
import { CgDetailsMore } from 'react-icons/cg'
import { IoCalendarNumber, IoExpandOutline } from 'react-icons/io5'
import { MdHolidayVillage } from 'react-icons/md'
import Button from '@components/UI/Button'
import type { AddPropertyForm } from '@models/properties/property'
import { useAddPropertyMutation } from '@store/services/properties'
import addPropertySchema from 'schemas/property.schemas'
import { z } from 'zod'
import Error from '@components/UI/Error'
import isApiError from '@utils/isApiError'

type FormErrors = Partial<Record<keyof AddPropertyForm, string>>
type OptionType = { label: string; value: string }

const AddPropertyForm = () => {
    const t = useTranslations()

    const propertyTypeOptions: OptionType[] = useMemo(
        () => [
            { label: t('residential'), value: 'RESIDENTIAL' },
            { label: t('commercial'), value: 'COMMERCIAL' },
            { label: t('hotel'), value: 'HOTEL' },
            { label: t('industrial'), value: 'INDUSTRIAL' },
            { label: t('land'), value: 'LAND' },
        ],
        [t],
    )

    const initialPropertyData = useMemo<AddPropertyForm>(
        () => ({
            title: '',
            description: '',
            address: '',
            price: 0,
            propertyType: 'RESIDENTIAL',
            bedrooms: 0,
            bathrooms: 0,
            parking: 0,
            area: 0,
            yearBuilt: 1900,
            pool: false,
            furnished: false,
            dishwasher: false,
            airConditioning: false,
            laundry: false,
            wardrobe: false,
            oven: false,
        }),
        [],
    )

    const [addProperty, { isLoading, error }] = useAddPropertyMutation()
    const [propertyData, setPropertyData] = useState<AddPropertyForm>(initialPropertyData)
    const [errors, setErrors] = useState<FormErrors>({})

    const validateFields = useCallback(async () => {
        try {
            await addPropertySchema.parseAsync(propertyData)
            return true
        } catch (err) {
            if (err instanceof z.ZodError) {
                const newErrors = {} as FormErrors
                err.issues.forEach((issue) => {
                    const field = issue.path[0] as keyof FormErrors
                    newErrors[field] = issue.message
                })
                setErrors(newErrors)
            }
            return false
        }
    }, [propertyData])

    const handleChange = useCallback(
        (
            e:
                | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
                | { target: { name: string; value: string } },
        ) => {
            const { name, value, type, checked } = e.target as HTMLInputElement

            let fieldValue
            if (type === 'checkbox') {
                fieldValue = checked
            } else if (type === 'number') {
                fieldValue = Number(value)
            } else {
                fieldValue = value
            }

            setPropertyData((prev) => ({
                ...prev,
                [name]: fieldValue,
            }))

            setErrors((prev) => ({ ...prev, [name]: '' }))
        },
        [],
    )

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault()
            if (!(await validateFields())) return

            await addProperty(propertyData).unwrap()
            // Optionally, display a success message or redirect the user here.
            setPropertyData(initialPropertyData)
        },
        [validateFields, addProperty, propertyData, initialPropertyData],
    )

    return (
        <form className="text-start" noValidate onSubmit={handleSubmit}>
            <fieldset disabled={isLoading}>
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
                                value={propertyData.title}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.title && <Error error={errors.title} />}
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
                                value={propertyData.description}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.description && <Error error={errors.description} />}
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
                                value={propertyData.address}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.address && <Error error={errors.address} />}
                    </div>

                    {/* Property Type */}
                    <div className="col-span-12">
                        <label
                            htmlFor="property-type"
                            className="form-label text-slate-900 dark:text-white font-medium"
                        >
                            {t('property-type')}:
                        </label>
                        <div className="filter-search-form relative filter-border mt-2">
                            <MdHolidayVillage className="icons" width={18} />
                            <select
                                className="w-full filter-input-box bg-gray-50 dark:bg-slate-800 border-0"
                                name="propertyType"
                                id="propertyType"
                                value={propertyData.propertyType}
                                onChange={handleChange}
                            >
                                {propertyTypeOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {errors.propertyType && <Error error={errors.propertyType} />}
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
                                value={propertyData.price}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.price && <Error error={errors.price} />}
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
                                type="number"
                                className="form-input ps-11"
                                max={new Date().getFullYear()}
                                min={1900}
                                placeholder={t('year-built')}
                                value={propertyData.yearBuilt}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.yearBuilt && <Error error={errors.yearBuilt} />}
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
                                value={propertyData.area}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.area && <Error error={errors.area} />}
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
                                value={propertyData.bedrooms}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.bedrooms && <Error error={errors.bedrooms} />}
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
                                value={propertyData.bathrooms}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.bathrooms && <Error error={errors.bathrooms} />}
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
                                value={propertyData.parking}
                                onChange={handleChange}
                            />
                        </div>
                        {errors.parking && <Error error={errors.parking} />}
                    </div>

                    <div className="grid grid-cols-2 justify-between gap-5 col-span-12">
                        {/* Dishwasher */}
                        <div>
                            <label htmlFor="dishwasher" className="font-medium flex items-center gap-2">
                                {t('dishwasher')}
                                <input
                                    type="checkbox"
                                    name="dishwasher"
                                    id="dishwasher"
                                    className="form-checkbox w-6 h-6 rounded border-2 border-green-600 text-green-600 focus:ring-0 focus:border-green-600 checked:border-green-600 checked:bg-green-600 hover:border-green-700 hover:cursor-pointer"
                                    checked={propertyData.dishwasher}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>

                        {/* Wardrobe */}
                        <div>
                            <label htmlFor="wardrobe" className="font-medium flex items-center gap-2">
                                {t('wardrobe')}
                                <input
                                    type="checkbox"
                                    name="wardrobe"
                                    id="wardrobe"
                                    className="form-checkbox w-6 h-6 rounded border-2 border-green-600 text-green-600 focus:ring-0 focus:border-green-600 checked:border-green-600 checked:bg-green-600 hover:border-green-700 hover:cursor-pointer"
                                    checked={propertyData.wardrobe}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>

                        {/* Furnished */}
                        <div>
                            <label htmlFor="furnished" className="font-medium flex items-center gap-2">
                                {t('furnished')}
                                <input
                                    type="checkbox"
                                    name="furnished"
                                    id="furnished"
                                    className="form-checkbox w-6 h-6 rounded border-2 border-green-600 text-green-600 focus:ring-0 focus:border-green-600 checked:border-green-600 checked:bg-green-600 hover:border-green-700 hover:cursor-pointer"
                                    checked={propertyData.furnished}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>

                        {/* Laundry */}
                        <div>
                            <label htmlFor="laundry" className="font-medium flex items-center gap-2">
                                {t('laundry')}
                                <input
                                    type="checkbox"
                                    name="laundry"
                                    id="laundry"
                                    className="form-checkbox w-6 h-6 rounded border-2 border-green-600 text-green-600 focus:ring-0 focus:border-green-600 checked:border-green-600 checked:bg-green-600 hover:border-green-700 hover:cursor-pointer"
                                    checked={propertyData.laundry}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>

                        {/* Oven */}
                        <div>
                            <label htmlFor="oven" className="font-medium flex items-center gap-2">
                                {t('oven')}
                                <input
                                    type="checkbox"
                                    name="oven"
                                    id="oven"
                                    className="form-checkbox w-6 h-6 rounded border-2 border-green-600 text-green-600 focus:ring-0 focus:border-green-600 checked:border-green-600 checked:bg-green-600 hover:border-green-700 hover:cursor-pointer"
                                    checked={propertyData.oven}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>

                        {/* Pool */}
                        <div>
                            <label htmlFor="pool" className="font-medium flex items-center gap-2">
                                {t('pool')}
                                <input
                                    type="checkbox"
                                    name="pool"
                                    id="pool"
                                    className="form-checkbox w-6 h-6 rounded border-2 border-green-600 text-green-600 focus:ring-0 focus:border-green-600 checked:border-green-600 checked:bg-green-600 hover:border-green-700 hover:cursor-pointer"
                                    checked={propertyData.pool}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                    </div>
                    {/* Air Conditioning */}
                    <div className="col-span-12">
                        <label htmlFor="airConditioning" className="font-medium flex items-center gap-2">
                            {t('air-conditioning')}
                            <input
                                type="checkbox"
                                name="airConditioning"
                                id="airConditioning"
                                className="form-checkbox w-6 h-6 rounded border-2 border-green-600 text-green-600 focus:ring-0 focus:border-green-600 checked:border-green-600 checked:bg-green-600 hover:border-green-700 hover:cursor-pointer"
                                checked={propertyData.airConditioning}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                </div>

                {/* Error Message */}
                {error && isApiError(error) && (
                    <div>
                        {/* Display the generic error message */}
                        <Error error={error.data.message} />

                        {/* Display field-specific validation errors (if they exist) */}
                        {error.data.errors?.map((err, index) => (
                            <Error key={index} error={`${err.field}: ${err.message}`} />
                        ))}
                    </div>
                )}

                {/* Submit Button */}
                <div className="mt-8">
                    <Button
                        id="add-property"
                        name="add-property"
                        title={isLoading ? t('adding-property') : t('add-property')}
                        isLoading={isLoading}
                        disabled={Object.values(errors).some((err) => !!err)}
                    />
                </div>
            </fieldset>
        </form>
    )
}

export default AddPropertyForm
