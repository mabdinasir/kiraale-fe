'use client' // This is a client component 👈🏽

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { FiHome, FiDollarSign, FiMapPin } from 'react-icons/fi'
import { FaBath, FaBed, FaParking } from 'react-icons/fa'
import { CgDetailsMore } from 'react-icons/cg'
import { IoCalendarNumber, IoExpandOutline } from 'react-icons/io5'
import { MdHolidayVillage } from 'react-icons/md'
import { PiBuildingApartmentFill } from 'react-icons/pi'
import Button from '@components/UI/Button'
import { useUpdatePropertyMutation, useGetPropertyByIdQuery } from '@store/services/properties'
import { z } from 'zod'
import Error from '@components/UI/Error'
import isApiError from '@utils/isApiError'
import showToast from '@utils/showToast'
import { propertySchema } from 'schemas'
import { proprtyTypes } from '@lib/constants'
import { PropertyFormData } from '@models/properties/property'
import LoadingIndicator from '@components/UI/LoadingIndicator'
import { useAppDispatch } from '@hooks/rtkHooks'
import { updateStep } from '@store/slices/stepValidation'

export type FormErrors = Partial<
    Record<keyof PropertyFormData | `features.${keyof PropertyFormData['features']}`, string>
>

const EditPropertyForm = () => {
    const { propertyId } = useParams()
    const t = useTranslations()
    const dispatch = useAppDispatch()

    const { data, isLoading: isPropertyLoading } = useGetPropertyByIdQuery(propertyId as string)

    const [updateProperty, { isLoading, isSuccess, error }] = useUpdatePropertyMutation()
    const translatedPropertyTypes = proprtyTypes.map(({ label, value }) => ({
        label: t(label),
        value,
    }))

    const initialPropertyData = useMemo<PropertyFormData>(
        () => ({
            id: '',
            title: '',
            description: '',
            address: '',
            price: 0,
            propertyType: 'RESIDENTIAL',
            listingType: 'SALE',
            status: 'PENDING',
            features: {
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
            },
        }),
        [],
    )

    const [propertyData, setPropertyData] = useState<PropertyFormData>(initialPropertyData)
    const [errors, setErrors] = useState<FormErrors>({})

    useEffect(() => {
        if (data?.property) {
            setPropertyData((prev) => ({
                ...prev,
                ...data.property,
                features: {
                    ...prev.features,
                    ...data.property.features,
                },
            }))
        }
        if (data?.property && data.property.id) {
            dispatch(updateStep({ step: 1, isValid: true, data: { propertyId: data.property.id } }))
        }
    }, [data, dispatch])

    const validateFields = useCallback(async () => {
        try {
            await propertySchema.parseAsync(propertyData)
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
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const { name, value, type, checked } = e.target as HTMLInputElement

            // Get the field value based on input type
            let fieldValue
            if (type === 'checkbox') {
                fieldValue = checked
            } else if (type === 'number') {
                fieldValue = value === '' ? '' : Number(value)
            } else {
                fieldValue = value
            }

            // Handle nested features fields
            if (name.startsWith('features.')) {
                const featureName = name.split('.')[1] as keyof PropertyFormData['features']
                setPropertyData((prev) => ({
                    ...prev,
                    features: {
                        ...prev.features,
                        [featureName]: fieldValue,
                    },
                }))
            }
            // Handle top-level property fields
            else {
                setPropertyData((prev) => ({
                    ...prev,
                    [name]: fieldValue,
                }))
            }

            // Clear any existing error for this field
            setErrors((prev) => ({ ...prev, [name]: '' }))
        },
        [],
    )

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault()
            if (!(await validateFields())) return

            try {
                const result = await updateProperty({
                    id: propertyId as string,
                    body: {
                        ...propertyData,
                        features: propertyData.features,
                    },
                }).unwrap()
                dispatch(updateStep({ step: 1, isValid: true, data: { propertyId: result?.property.id } }))
                showToast('success', t('property-updated-successfully'))
                setErrors({})
            } catch (err: Error | unknown) {
                showToast('error', `Something went wrong! ${err}`)
            }
        },
        [validateFields, updateProperty, propertyId, propertyData, dispatch, t],
    )

    if (isPropertyLoading || !propertyData.id) {
        return <LoadingIndicator />
    }

    if (!data?.property) {
        return <Error error="Property not found." />
    }

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
                                value={propertyData.description || ''}
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
                        <label htmlFor="" className="form-label text-slate-900 dark:text-white font-medium">
                            {t('property-type')}:
                        </label>
                        <div className="filter-search-form relative filter-border mt-2">
                            <PiBuildingApartmentFill className="icons" width={18} />
                            <select
                                className="w-full filter-input-box border border-gray-200 focus:border-green-600 outline-none rounded-md bg-transparent dark:border-gray-800 dark:bg-gray-800 dark:bg-slate-900"
                                name="propertyType"
                                id="propertyType"
                                value={propertyData.propertyType}
                                onChange={handleChange}
                            >
                                {translatedPropertyTypes.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {errors.propertyType && <Error error={errors.propertyType} />}
                    </div>

                    {/* Listing Type */}
                    <div className="col-span-12">
                        <label htmlFor="listingType" className="font-medium">
                            {t('listing-type')}:
                        </label>
                        <div className="filter-search-form relative filter-border mt-2">
                            <MdHolidayVillage className="icons" width={18} />
                            <select
                                name="listingType"
                                id="listingType"
                                className="form-input ps-11"
                                value={propertyData.listingType}
                                onChange={handleChange}
                            >
                                <option value="SALE">{t('sale')}</option>
                                <option value="RENT">{t('rent')}</option>
                            </select>
                        </div>
                        {errors.listingType && <Error error={errors.listingType} />}
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
                        <label htmlFor="features.yearBuilt" className="font-medium">
                            {t('year-built')}:
                        </label>
                        <div className="form-icon relative mt-2">
                            <IoCalendarNumber className="w-4 h-4 absolute top-3 start-4 text-green-600" />
                            <input
                                name="features.yearBuilt"
                                id="features.yearBuilt"
                                type="number"
                                className="form-input ps-11"
                                max={new Date().getFullYear()}
                                min={1900}
                                placeholder={t('year-built')}
                                value={propertyData.features.yearBuilt}
                                onChange={handleChange}
                            />
                        </div>
                        {errors['features.yearBuilt'] && <Error error={errors['features.yearBuilt']} />}
                    </div>

                    {/* Area */}
                    <div className="col-span-6">
                        <label htmlFor="features.area" className="font-medium">
                            {t('area')} ({t('meters')}):
                        </label>
                        <div className="form-icon relative mt-2">
                            <IoExpandOutline className="w-4 h-4 absolute top-3 start-4 text-green-600" />
                            <input
                                name="features.area"
                                id="features.area"
                                type="number"
                                className="form-input ps-11"
                                placeholder={t('area')}
                                min={1}
                                value={propertyData.features.area}
                                onChange={handleChange}
                            />
                        </div>
                        {errors['features.area'] && <Error error={errors['features.area']} />}
                    </div>

                    {/* Bedrooms */}
                    <div className="col-span-4">
                        <label htmlFor="features.bedrooms" className="font-medium">
                            {t('bedrooms')}:
                        </label>
                        <div className="form-icon relative mt-2">
                            <FaBed className="w-4 h-4 absolute top-3 start-4 text-green-600" />
                            <input
                                name="features.bedrooms"
                                id="features.bedrooms"
                                type="number"
                                className="form-input ps-11"
                                placeholder={t('bedrooms')}
                                min={1}
                                value={propertyData.features.bedrooms}
                                onChange={handleChange}
                            />
                        </div>
                        {errors['features.bedrooms'] && <Error error={errors['features.bedrooms']} />}
                    </div>

                    {/* Bathrooms */}
                    <div className="col-span-4">
                        <label htmlFor="features.bathrooms" className="font-medium">
                            {t('bathrooms')}:
                        </label>
                        <div className="form-icon relative mt-2">
                            <FaBath className="w-4 h-4 absolute top-3 start-4 text-green-600" />
                            <input
                                name="features.bathrooms"
                                id="features.bathrooms"
                                type="number"
                                className="form-input ps-11"
                                placeholder={t('bathrooms')}
                                min={1}
                                value={propertyData.features.bathrooms}
                                onChange={handleChange}
                            />
                        </div>
                        {errors['features.bathrooms'] && <Error error={errors['features.bathrooms']} />}
                    </div>

                    {/* Parking */}
                    <div className="col-span-4" id="parking">
                        <label htmlFor="features.parking" className="font-medium">
                            {t('parking')}:
                        </label>
                        <div className="form-icon relative mt-2">
                            <FaParking className="w-4 h-4 absolute top-3 start-4 text-green-600" />
                            <input
                                name="features.parking"
                                id="features.parking"
                                type="number"
                                className="form-input ps-11"
                                placeholder={t('parking')}
                                min={0}
                                value={propertyData.features.parking}
                                onChange={handleChange}
                            />
                        </div>
                        {errors['features.parking'] && <Error error={errors['features.parking']} />}
                    </div>

                    <div className="grid grid-cols-2 justify-between gap-5 col-span-12">
                        {/* Dishwasher */}
                        <div>
                            <label htmlFor="features.dishwasher" className="font-medium flex items-center gap-2">
                                {t('dishwasher')}
                                <input
                                    type="checkbox"
                                    name="features.dishwasher"
                                    id="features.dishwasher"
                                    className="form-checkbox rounded border-green-600 ring ring-green-200 text-green-600 focus:border-green-300 focus:ring focus:ring-offset-0 focus:ring-green-200 focus:ring-opacity-50 me-2 dark:bg-slate-900"
                                    checked={propertyData.features.dishwasher}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>

                        {/* Wardrobe */}
                        <div>
                            <label htmlFor="features.wardrobe" className="font-medium flex items-center gap-2">
                                {t('wardrobe')}
                                <input
                                    type="checkbox"
                                    name="features.wardrobe"
                                    id="features.wardrobe"
                                    className="form-checkbox rounded border-green-600 ring ring-green-200 text-green-600 focus:border-green-300 focus:ring focus:ring-offset-0 focus:ring-green-200 focus:ring-opacity-50 me-2 dark:bg-slate-900"
                                    checked={propertyData.features.wardrobe}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>

                        {/* Furnished */}
                        <div>
                            <label htmlFor="features.furnished" className="font-medium flex items-center gap-2">
                                {t('furnished')}
                                <input
                                    type="checkbox"
                                    name="features.furnished"
                                    id="features.furnished"
                                    className="form-checkbox rounded border-green-600 ring ring-green-200 text-green-600 focus:border-green-300 focus:ring focus:ring-offset-0 focus:ring-green-200 focus:ring-opacity-50 me-2 dark:bg-slate-900"
                                    checked={propertyData.features.furnished}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>

                        {/* Laundry */}
                        <div>
                            <label htmlFor="features.laundry" className="font-medium flex items-center gap-2">
                                {t('laundry')}
                                <input
                                    type="checkbox"
                                    name="features.laundry"
                                    id="features.laundry"
                                    className="form-checkbox rounded border-green-600 ring ring-green-200 text-green-600 focus:border-green-300 focus:ring focus:ring-offset-0 focus:ring-green-200 focus:ring-opacity-50 me-2 dark:bg-slate-900"
                                    checked={propertyData.features.laundry}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>

                        {/* Oven */}
                        <div>
                            <label htmlFor="features.oven" className="font-medium flex items-center gap-2">
                                {t('oven')}
                                <input
                                    type="checkbox"
                                    name="features.oven"
                                    id="features.oven"
                                    className="form-checkbox rounded border-green-600 ring ring-green-200 text-green-600 focus:border-green-300 focus:ring focus:ring-offset-0 focus:ring-green-200 focus:ring-opacity-50 me-2 dark:bg-slate-900"
                                    checked={propertyData.features.oven}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>

                        {/* Pool */}
                        <div>
                            <label htmlFor="features.pool" className="font-medium flex items-center gap-2">
                                {t('pool')}
                                <input
                                    type="checkbox"
                                    name="features.pool"
                                    id="features.pool"
                                    className="form-checkbox rounded border-green-600 ring ring-green-200 text-green-600 focus:border-green-300 focus:ring focus:ring-offset-0 focus:ring-green-200 focus:ring-opacity-50 me-2 dark:bg-slate-900"
                                    checked={propertyData.features.pool}
                                    onChange={handleChange}
                                />
                            </label>
                        </div>
                    </div>
                    {/* Air Conditioning */}
                    <div className="col-span-12">
                        <label htmlFor="features.airConditioning" className="font-medium flex items-center gap-2">
                            {t('air-conditioning')}
                            <input
                                type="checkbox"
                                name="features.airConditioning"
                                id="features.airConditioning"
                                className="form-checkbox rounded border-green-600 ring ring-green-200 text-green-600 focus:border-green-300 focus:ring focus:ring-offset-0 focus:ring-green-200 focus:ring-opacity-50 me-2 dark:bg-slate-900"
                                checked={propertyData.features.airConditioning}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                </div>

                {/* Error Message */}
                {error && isApiError(error) && (
                    <div>
                        <Error error={error.data.message} />
                        {error.data.errors?.map((err, index) => (
                            <Error key={index} error={`${err.field}: ${err.message}`} />
                        ))}
                    </div>
                )}

                {/* Submit Button */}
                <div className="mt-8 lg:w-1/4 w-1/2">
                    <Button
                        id="update-property"
                        name="update-property"
                        fullWidth
                        title={isLoading ? t('updating-property') : t('update-property')}
                        isLoading={isLoading}
                        disabled={
                            Object.values(errors).some((err) => !!err) ||
                            isSuccess ||
                            JSON.stringify(propertyData) ===
                                JSON.stringify({
                                    ...initialPropertyData,
                                    ...data.property,
                                    features: {
                                        ...initialPropertyData.features,
                                        ...data.property.features,
                                    },
                                })
                        }
                    />
                </div>
            </fieldset>
        </form>
    )
}

export default EditPropertyForm
