/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
'use client' // This is a client component 👈🏽

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { FiHome, FiDollarSign, FiMapPin } from 'react-icons/fi'
import { FaBath, FaBed, FaParking } from 'react-icons/fa'
import { FaKitchenSet } from 'react-icons/fa6'
import { RiSofaFill } from 'react-icons/ri'
import { CgDetailsMore } from 'react-icons/cg'
import { IoCalendarNumber, IoExpandOutline } from 'react-icons/io5'
import { MdHolidayVillage } from 'react-icons/md'
import { PiBuildingApartmentFill } from 'react-icons/pi'
import Button from '@components/UI/Button'
import { useUpdatePropertyMutation, useGetPropertyByIdQuery } from '@store/services/properties'
import { isEqual } from 'lodash'
import { z } from 'zod'
import Error from '@components/UI/Error'
import isApiError from '@utils/isApiError'
import showToast from '@utils/showToast'
import { propertySchema } from 'schemas'
import { countries, proprtyTypes } from '@lib/constants'
import { PropertyFormData } from '@models/properties/property'
import LoadingIndicator from '@components/UI/LoadingIndicator'
import { useAppDispatch } from '@hooks/rtkHooks'
import { updateStep } from '@store/slices/stepValidation'
import { ApiError } from '@models/apiError'

export type FormErrors = Partial<
    Record<keyof PropertyFormData | `features.${keyof PropertyFormData['features']}`, string>
>

const EditPropertyForm = () => {
    const { propertyId } = useParams()
    const t = useTranslations()
    const dispatch = useAppDispatch()

    // Get property data
    const { data, isLoading: isPropertyLoading } = useGetPropertyByIdQuery(propertyId as string)

    const [updateProperty, { isLoading, error }] = useUpdatePropertyMutation()
    const translatedPropertyTypes = useMemo(
        () =>
            proprtyTypes.map(({ label, value }) => ({
                label: t(label),
                value,
            })),
        [t],
    )

    const initialPropertyData = useMemo<PropertyFormData>(
        () => ({
            country: 'SOMALIA',
            title: '',
            description: '',
            address: '',
            price: 0,
            propertyType: 'RESIDENTIAL',
            listingType: 'SALE',
            status: 'PENDING',
            features: {
                bedroom: 0,
                livingRoom: 0,
                bathroom: 0,
                kitchen: 0,
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
    const [formTouched, setFormTouched] = useState(false)

    // Initialize form with data when it's loaded
    useEffect(() => {
        if (data?.property) {
            const { id, features, ...propertyBase } = data.property
            const { id: _featureId, propertyId: _propertyId, ...featureBase } = features

            setPropertyData({
                ...propertyBase,
                features: featureBase,
            })

            if (id) {
                dispatch(updateStep({ step: 1, isValid: true, data: { propertyId: id } }))
            }
        }
    }, [data, dispatch])

    const validateFields = useCallback(() => {
        try {
            propertySchema.parse(propertyData)
            setErrors({})
            return true
        } catch (err) {
            if (err instanceof z.ZodError) {
                const newErrors = {} as FormErrors
                err.issues.forEach((issue) => {
                    // Handle both top-level and nested feature fields
                    const path = issue.path.join('.')
                    newErrors[path as keyof FormErrors] = issue.message
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

            // Mark form as touched to indicate changes
            setFormTouched(true)

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

            // Clear the specific error for this field
            setErrors((prev) => {
                const newErrors = { ...prev }
                delete newErrors[name as keyof FormErrors]
                return newErrors
            })
        },
        [],
    )

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault()

            if (!validateFields()) return

            try {
                const result = await updateProperty({
                    id: propertyId as string,
                    body: propertyData,
                }).unwrap()

                dispatch(updateStep({ step: 1, isValid: true, data: { propertyId: result?.property.id } }))
                showToast('success', t('property-updated-successfully'))
                setErrors({})
                setFormTouched(false)
            } catch (err) {
                const errorMessage = (err as ApiError)?.data?.message
                showToast('error', t('unexpected-error', { error: errorMessage }))
            }
        },
        [validateFields, updateProperty, propertyId, propertyData, dispatch, t],
    )

    // Check if form is different from original data
    const hasFormChanged = useMemo(() => {
        if (!data?.property) return false
        return !isEqual(data.property, propertyData)
    }, [data?.property, propertyData])

    const isUpdateDisabled = isLoading || Object.keys(errors).length > 0 || !hasFormChanged || !formTouched

    if (isPropertyLoading) {
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

                    {/* Country dropdown*/}
                    <div className="col-span-12">
                        <label htmlFor="country" className="form-label text-slate-900 dark:text-white font-medium">
                            {t('country')}:
                        </label>
                        <div className="filter-search-form relative filter-border mt-2">
                            <PiBuildingApartmentFill className="icons" width={18} />
                            <select
                                className="w-full filter-input-box border border-gray-200 focus:border-green-600 outline-none rounded-md bg-transparent dark:border-gray-800 dark:bg-gray-800 dark:bg-slate-900"
                                name="country"
                                id="country"
                                value={propertyData.country}
                                onChange={handleChange}
                            >
                                {countries.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {errors.country && <Error error={errors.country} />}
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
                        <label htmlFor="propertyType" className="form-label text-slate-900 dark:text-white font-medium">
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
                        <label htmlFor="features.bedroom" className="font-medium">
                            {t('bedroom')}:
                        </label>
                        <div className="form-icon relative mt-2">
                            <FaBed className="w-4 h-4 absolute top-3 start-4 text-green-600" />
                            <input
                                name="features.bedroom"
                                id="features.bedroom"
                                type="number"
                                className="form-input ps-11"
                                min={0}
                                placeholder={t('bedroom')}
                                value={propertyData.features.bedroom}
                                onChange={handleChange}
                            />
                        </div>
                        {errors['features.bedroom'] && <Error error={errors['features.bedroom']} />}
                    </div>

                    {/* Living Rooms */}
                    <div className="col-span-4">
                        <label htmlFor="features.livingRoom" className="font-medium">
                            {t('living-room')}:
                        </label>
                        <div className="form-icon relative mt-2">
                            <RiSofaFill className="w-4 h-4 absolute top-3 start-4 text-green-600" />
                            <input
                                name="features.livingRoom"
                                id="features.livingRoom"
                                type="number"
                                className="form-input ps-11"
                                placeholder={t('living-room')}
                                min={0}
                                value={propertyData.features.livingRoom}
                                onChange={handleChange}
                            />
                        </div>
                        {errors['features.livingRoom'] && <Error error={errors['features.livingRoom']} />}
                    </div>

                    {/* Bathroom */}
                    <div className="col-span-4">
                        <label htmlFor="features.bathroom" className="font-medium">
                            {t('bathroom')}:
                        </label>
                        <div className="form-icon relative mt-2">
                            <FaBath className="w-4 h-4 absolute top-3 start-4 text-green-600" />
                            <input
                                name="features.bathroom"
                                id="features.bathroom"
                                type="number"
                                className="form-input ps-11"
                                placeholder={t('bathroom')}
                                min={0}
                                value={propertyData.features.bathroom}
                                onChange={handleChange}
                            />
                        </div>
                        {errors['features.bathroom'] && <Error error={errors['features.bathroom']} />}
                    </div>

                    {/* Kitchen */}
                    <div className="col-span-4">
                        <label htmlFor="features.kitchen" className="font-medium">
                            {t('kitchen')}:
                        </label>
                        <div className="form-icon relative mt-2">
                            <FaKitchenSet className="w-4 h-4 absolute top-3 start-4 text-green-600" />
                            <input
                                name="features.kitchen"
                                id="features.kitchen"
                                type="number"
                                className="form-input ps-11"
                                placeholder={t('kitchen')}
                                min={0}
                                value={propertyData.features.kitchen}
                                onChange={handleChange}
                            />
                        </div>
                        {errors['features.kitchen'] && <Error error={errors['features.kitchen']} />}
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
                    <div className="mt-4">
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
                        disabled={isUpdateDisabled}
                    />
                </div>
            </fieldset>
        </form>
    )
}

export default EditPropertyForm
