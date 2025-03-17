'use client' // This is a client component 👈🏽

import React from 'react'
import Link from 'next/link'

import { LiaCompressArrowsAltSolid } from 'react-icons/lia'
import { LuBath, LuBedDouble } from 'react-icons/lu'
import { FiMapPin, FiPhone } from 'react-icons/fi'
import Carousel from '@components/UI/Carousel'
import LoadingIndicator from '@components/UI/LoadingIndicator'
import { useGetPropertyByIdQuery } from '@store/services/properties'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import EmptyState from '@components/UI/EmptyState'
import { PiBuildingApartmentFill } from '@node_modules/react-icons/pi'

type PropertyStatus = 'pending' | 'rejected' | 'expired' | 'available' | 'sold' | 'leased'

const propertyStatusColor: Record<PropertyStatus, string> = {
    pending: 'text-yellow-600',
    available: 'text-green-600',
    sold: 'text-blue-600',
    leased: 'text-purple-600',
    rejected: 'text-red-600',
    expired: 'text-gray-600',
}

const PropertyDetail = () => {
    const { id, locale } = useParams()
    const t = useTranslations()

    const { data, isLoading } = useGetPropertyByIdQuery(id as string)
    const property = data?.property

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
        <section className="relative md:py-24 pt-24 pb-16">
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

                        <h4 className="text-2xl font-medium mt-6 mb-3">{property?.title}</h4>
                        <span className="text-slate-400 flex items-center">
                            <FiMapPin className="size-5 me-2" /> {property?.address}
                        </span>

                        <ul className="py-6 flex items-center list-none">
                            <li className="flex items-center lg:me-6 me-4">
                                <LiaCompressArrowsAltSolid className="lg:text-3xl text-2xl me-2 text-green-600" />
                                <span className="lg:text-xl">
                                    {property?.features.area} {t('sqf')}
                                </span>
                            </li>

                            <li className="flex items-center lg:me-6 me-4">
                                <LuBedDouble className="lg:text-3xl text-2xl me-2 text-green-600" />
                                <span className="lg:text-xl">
                                    {property?.features.bedrooms}{' '}
                                    {property?.features.bedrooms <= 1 ? t('bed') : t('beds')}
                                </span>
                            </li>

                            <li className="flex items-center">
                                <LuBath className="lg:text-3xl text-2xl me-2 text-green-600" />
                                <span className="lg:text-xl">
                                    {property?.features.bathrooms}{' '}
                                    {property?.features.bathrooms <= 1 ? t('bath') : t('baths')}
                                </span>
                            </li>
                        </ul>

                        <p className="text-slate-400">{property?.description}</p>

                        <div className="w-full leading-[0] border-0 mt-6">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39206.002432144705!2d-95.4973981212445!3d29.709510002925988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c16de81f3ca5%3A0xf43e0b60ae539ac9!2sGerald+D.+Hines+Waterwall+Park!5e0!3m2!1sen!2sin!4v1566305861440!5m2!1sen!2sin"
                                style={{ border: '0' }}
                                title="myfram"
                                className="w-full h-[500px]"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                    <div className="lg:col-span-4 md:col-span-5">
                        <div className="sticky top-20">
                            <div className="rounded-md bg-slate-50 dark:bg-slate-800 shadow dark:shadow-gray-700">
                                <div className="p-6">
                                    <div className="text-2xl font-medium">
                                        <h5 className="text-2xl font-medium">{t('price')}:</h5>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-medium">
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

                                        <span className="bg-green-600/10 text-green-600 text-sm px-2.5 py-0.75 rounded h-6">
                                            {t('for')} {t(property?.listingType.toLowerCase())}
                                        </span>
                                    </div>

                                    <ul className="list-none mt-4">
                                        <li className="flex justify-between items-center">
                                            <span className="text-slate-400 text-sm">{t('year-built')}:</span>
                                            <span className="font-medium text-sm">{property?.features.yearBuilt}</span>
                                        </li>

                                        <li className="flex justify-between items-center mt-2 ms-0">
                                            <span className="text-slate-400 text-sm">{t('air-conditioning')}:</span>
                                            <span className="font-medium text-sm">
                                                {property?.features.airConditioning ? t('yes') : t('no')}
                                            </span>
                                        </li>

                                        <li className="flex justify-between items-center mt-2 ms-0">
                                            <span className="text-slate-400 text-sm">{t('status')}:</span>
                                            <span
                                                className={`font-medium text-sm ${property?.status ? propertyStatusColor[property.status.toLowerCase() as PropertyStatus] : ''}`}
                                            >
                                                {property?.status ? t(property.status.toLowerCase()).toUpperCase() : ''}
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

                            <div className="mt-12 text-center">
                                <h3 className="mb-6 text-xl leading-normal font-medium text-black dark:text-white">
                                    {t('have-a-question')}
                                </h3>

                                <div className="mt-6">
                                    <Link
                                        href={`/${locale}/contact`}
                                        className="btn bg-transparent hover:bg-green-600 border border-green-600 text-green-600 hover:text-white rounded-md"
                                    >
                                        <FiPhone className="align-middle me-2" /> {t('contact-us')}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PropertyDetail
