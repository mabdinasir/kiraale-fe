'use client' // This is a client component 👈🏽

import React, { useState } from 'react'
import { LiaCompressArrowsAltSolid } from 'react-icons/lia'
import { LuBath, LuBedDouble } from 'react-icons/lu'
import { FiMapPin } from 'react-icons/fi'
import Carousel from '@components/UI/Carousel'
import LoadingIndicator from '@components/UI/LoadingIndicator'
import { useGetPropertyByIdQuery, useUpdatePropertyStatusMutation } from '@store/services/properties'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import EmptyState from '@components/UI/EmptyState'
import { PiBuildingApartmentFill } from '@node_modules/react-icons/pi'
import statuses from '@utils/statuses'
import Button from '@components/UI/Button'
import showToast from '@utils/showToast'
import { ApiError } from '@models/apiError'

const AdminPropertyDetail = () => {
    const { id } = useParams()
    const t = useTranslations()

    const { data, isLoading } = useGetPropertyByIdQuery(id as string)
    const [updatePropertyStatus] = useUpdatePropertyStatusMutation()
    const property = data?.property

    const [isApproving, setIsApproving] = useState(false)
    const [isRejecting, setIsRejecting] = useState(false)

    const handleUpdateStatus = async (status: 'AVAILABLE' | 'REJECTED') => {
        if (!property) return

        try {
            if (status === 'AVAILABLE') {
                setIsApproving(true)
            } else {
                setIsRejecting(true)
            }

            await updatePropertyStatus({
                propertyId: property.id,
                status,
            }).unwrap()
            showToast('success', status === 'AVAILABLE' ? t('property-approved') : t('property-rejected'))
        } catch (error) {
            const errorMessage = (error as ApiError)?.data?.message
            showToast('error', t('unexpected-error', { error: errorMessage }))
        } finally {
            setIsApproving(false)
            setIsRejecting(false)
        }
    }

    if (isLoading) return <LoadingIndicator />

    if (!property)
        return (
            <div className="py-24">
                <EmptyState
                    icon={<PiBuildingApartmentFill size={98} />}
                    title={t('property-not-found')}
                    description={t('property-not-found-description')}
                />
            </div>
        )

    return (
        <section className="relative pb-12">
            <div className="container relative">
                <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
                    <div className="lg:col-span-8 md:col-span-7">
                        <div className="grid grid-cols-1 relative">
                            <div className="tiny-one-item">
                                <Carousel
                                    images={
                                        property?.media.map((item) => ({
                                            src: item.url,
                                            alt: property.title,
                                        })) || []
                                    }
                                    slideDuration={1000}
                                    indicators={true}
                                    controls={true}
                                />
                            </div>
                        </div>

                        <h4 className="text-2xl font-medium mt-6 mb-3 ">{property?.title ?? 'N/A'}</h4>
                        <span className=" flex items-center">
                            <FiMapPin className="size-5 me-2" />
                            {property?.address ?? 'N/A'}, {property?.country ?? 'N/A'}
                        </span>

                        <ul className="py-6 flex items-center list-none">
                            <li className="flex items-center lg:me-6 me-4">
                                <LiaCompressArrowsAltSolid className="lg:text-3xl text-2xl me-2 text-green-600" />
                                <span className="lg:text-xl ">
                                    {property?.features?.area === 1
                                        ? ` ${property?.features?.area} ${t('meter')}`
                                        : ` ${property?.features?.area} ${t('meters')}`}
                                </span>
                            </li>

                            <li className="flex items-center lg:me-6 me-4">
                                <LuBedDouble className="lg:text-3xl text-2xl me-2 text-green-600" />
                                <span className="lg:text-xl ">
                                    {property?.features?.bedrooms ?? 0}{' '}
                                    {property?.features?.bedrooms === 1 ? t('bed') : t('beds')}
                                </span>
                            </li>

                            <li className="flex items-center">
                                <LuBath className="lg:text-3xl text-2xl me-2 text-green-600" />
                                <span className="lg:text-xl ">
                                    {property?.features?.bathrooms ?? 0}{' '}
                                    {property?.features?.bathrooms === 1 ? t('bath') : t('baths')}
                                </span>
                            </li>
                        </ul>

                        <p>{property?.description ?? 'N/A'}</p>
                    </div>

                    <div className="lg:col-span-4 md:col-span-5">
                        <div className="sticky top-20">
                            <div className="rounded-md bg-white dark:bg-slate-800 shadow dark:shadow-gray-700">
                                <li className="p-6 list-none">
                                    <div className="text-2xl font-medium pb-3">
                                        <h5 className="text-2xl font-medium border-b">{t('details')}:</h5>
                                    </div>

                                    <ul className="list-none">
                                        <li className="flex justify-between items-center">
                                            <span className=" text-2xl">{t('price')}:</span>
                                            <span className="bg-green-600/10 text-green-600 text-2xl px-2.5 rounded h-7">
                                                {new Intl.NumberFormat('en-US', {
                                                    style: 'currency',
                                                    currency: 'USD',
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 0,
                                                    currencyDisplay: 'narrowSymbol',
                                                })
                                                    .format(property?.price || 0)
                                                    .replace('$', '$ ')}
                                            </span>
                                        </li>

                                        <li className="flex justify-between items-center mt-2 ms-0">
                                            <span className=" text-md">{t('listing-type')}:</span>
                                            <span className="bg-green-600/10 text-green-600 text-md px-2.5 py-0.75 rounded h-7">
                                                {t('for')} {t(property?.listingType.toLowerCase())}
                                            </span>
                                        </li>

                                        <li className="flex justify-between items-center mt-2 ms-0">
                                            <span className=" text-md">{t('property-type')}:</span>
                                            <span className="font-medium text-sm">{property?.propertyType}</span>
                                        </li>

                                        <li className="flex justify-between items-center mt-2 ms-0">
                                            <span className=" text-md">{t('year-built')}:</span>
                                            <span className="font-medium text-md">
                                                {property?.features?.yearBuilt ?? 'N/A'}
                                            </span>
                                        </li>

                                        <li className="flex justify-between items-center mt-2 ms-0">
                                            <span className=" text-md">{t('status')}:</span>
                                            <span className={`font-medium text-md ${statuses[property.status]?.color}`}>
                                                {property?.status}
                                            </span>
                                        </li>
                                    </ul>
                                </li>

                                {/* features */}
                                <div className="px-6 pb-6">
                                    <div className="text-2xl font-medium pb-3">
                                        <h5 className="text-2xl font-medium border-b">{t('features')}:</h5>
                                    </div>

                                    <ul className="list-none">
                                        <li className="flex justify-between items-center">
                                            <span className=" text-md">{t('listed-on')}:</span>
                                            <span className="font-medium text-md">
                                                {new Date(property.createdAt).toLocaleDateString('en-GB', {
                                                    timeZone: 'UTC',
                                                })}
                                            </span>
                                        </li>

                                        {/* Air Conditioning */}
                                        <li className="flex justify-between items-center mt-2 ms-0">
                                            <span className=" text-md">{t('air-conditioning')}:</span>
                                            <span className="font-medium text-md">
                                                {property?.features?.airConditioning ? t('yes') : t('no')}
                                            </span>
                                        </li>
                                        {/* wardrobe */}
                                        <li className="flex justify-between items-center mt-2 ms-0">
                                            <span className=" text-md">{t('wardrobe')}:</span>
                                            <span className="font-medium text-md">
                                                {property?.features?.wardrobe ? t('yes') : t('no')}
                                            </span>
                                        </li>
                                        {/* furnihsed */}
                                        <li className="flex justify-between items-center mt-2 ms-0">
                                            <span className=" text-md">{t('furnished')}:</span>
                                            <span className="font-medium text-md">
                                                {property?.features?.furnished ? t('yes') : t('no')}
                                            </span>
                                        </li>
                                        {/* dishwasher */}
                                        <li className="flex justify-between items-center mt-2 ms-0">
                                            <span className=" text-md">{t('dishwasher')}:</span>
                                            <span className="font-medium text-md">
                                                {property?.features?.dishwasher ? t('yes') : t('no')}
                                            </span>
                                        </li>
                                        {/* oven */}
                                        <li className="flex justify-between items-center mt-2 ms-0">
                                            <span className=" text-md">{t('oven')}:</span>
                                            <span className="font-medium text-md">
                                                {property?.features?.oven ? t('yes') : t('no')}
                                            </span>
                                        </li>
                                        {/* laundry */}
                                        <li className="flex justify-between items-center mt-2 ms-0">
                                            <span className=" text-md">{t('laundry')}:</span>
                                            <span className="font-medium text-md">
                                                {property?.features?.laundry ? t('yes') : t('no')}
                                            </span>
                                        </li>
                                        {/* pool */}
                                        <li className="flex justify-between items-center mt-2 ms-0">
                                            <span className=" text-md">{t('pool')}:</span>
                                            <span className="font-medium text-md">
                                                {property?.features?.pool ? t('yes') : t('no')}
                                            </span>
                                        </li>
                                        {/* parking */}
                                        <li className="flex justify-between items-center mt-2 ms-0">
                                            <span className=" text-md">{t('parking')}:</span>
                                            <span className="font-medium text-md">
                                                {property?.features?.parking === 1
                                                    ? ` ${property?.features?.parking} ${t('space')}`
                                                    : ` ${property?.features?.parking} ${t('spaces')}`}
                                            </span>
                                        </li>
                                        {/* pool */}
                                        <li className="flex justify-between items-center mt-2 ms-0">
                                            <span className=" text-md">{t('pool')}:</span>
                                            <span className="font-medium text-md">
                                                {property?.features?.pool ? t('yes') : t('no')}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="flex">
                                    <div className="p-1 w-1/2">
                                        <div className="btn bg-green-600 hover:bg-green-700 text-white rounded-md w-full truncate">
                                            {property?.user?.firstName.toUpperCase()}
                                        </div>
                                    </div>
                                    <div className="p-1 w-1/2">
                                        <div className="btn bg-green-600 hover:bg-green-700 text-white rounded-md w-full">
                                            {property?.user?.mobile}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex mt-4">
                            <div className="p-1 w-1/2">
                                <Button
                                    title={isApproving ? t('approving') : t('approve')}
                                    variant="blue"
                                    fullWidth
                                    onClick={() => handleUpdateStatus('AVAILABLE')}
                                    disabled={isApproving || property.status === 'AVAILABLE'}
                                    isLoading={isApproving}
                                />
                            </div>
                            <div className="p-1 w-1/2">
                                <Button
                                    title={isRejecting ? t('rejecting') : t('reject')}
                                    variant="red"
                                    fullWidth
                                    onClick={() => handleUpdateStatus('REJECTED')}
                                    disabled={isRejecting || property.status === 'REJECTED'}
                                    isLoading={isRejecting}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AdminPropertyDetail
