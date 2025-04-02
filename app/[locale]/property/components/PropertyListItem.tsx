'use client' // This is a client component 👈🏽

import React from 'react'
import ReusableLink from '@components/Links/ReusableLink'
import EmptyState from '@components/UI/EmptyState'
import LoadingIndicator from '@components/UI/LoadingIndicator'
import { useSearchPropertiesQuery } from '@store/services/properties'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { FaCalendarAlt } from 'react-icons/fa'
import { LuBedDouble, LuBath } from 'react-icons/lu'
import { PiBuildingApartmentFill } from 'react-icons/pi'
import FavoriteButton from './FavoriteButton'

const PropertyListItem = () => {
    const t = useTranslations()
    const searchParams = useSearchParams()
    const query = searchParams.get('query') || ''
    const minPrice = searchParams.get('minPrice') || ''
    const maxPrice = searchParams.get('maxPrice') || ''
    const propertyType = searchParams.get('propertyType') || ''
    const listingType = searchParams.get('listingType') || ''

    const { data, isLoading } = useSearchPropertiesQuery(
        {
            query,
            minPrice: minPrice ? Number(minPrice) : undefined,
            maxPrice: maxPrice ? Number(maxPrice) : undefined,
            propertyType: propertyType as 'RESIDENTIAL' | 'COMMERCIAL' | 'LAND',
            listingType: listingType as 'SALE' | 'RENT',
        },
        { refetchOnMountOrArgChange: true },
    )

    if (isLoading) return <LoadingIndicator />

    if (!data?.properties || data?.properties.length === 0)
        return (
            <EmptyState
                icon={<PiBuildingApartmentFill size={98} />}
                title={t('no-properties-found')}
                description={t('no-properties-description')}
            />
        )

    return (
        <div className="lg:col-span-8 md:col-span-6">
            <div className="grid grid-cols-1 gap-[30px]">
                {data?.properties?.map((property) => (
                    <ReusableLink key={property.id} href={`/property/${property.id}`}>
                        <div
                            key={property.id}
                            className="group rounded-xl bg-white dark:bg-slate-900 shadow hover:shadow-xl dark:hover:shadow-xl dark:shadow-gray-700 dark:hover:shadow-gray-700 overflow-hidden ease-in-out duration-500 w-full mx-auto xl:max-w-4xl"
                        >
                            <div className="md:flex">
                                <div className="relative">
                                    <Image
                                        className="h-full w-full object-cover lg:w-64"
                                        src={property?.media[0]?.url || '/images/property/1.jpg'}
                                        alt=""
                                        width={0}
                                        height={0}
                                        sizes="100vw"
                                        style={{ width: '100%', height: 'auto' }}
                                    />
                                    <FavoriteButton
                                        propertyId={property.id}
                                        isFavorited={property?.isFavorited ?? false}
                                    />
                                </div>
                                <div className="p-6 w-full">
                                    <div className="md:pb-4 pb-6">{property.title}</div>

                                    <ul className="md:py-4 py-6 border-y border-slate-100 dark:border-gray-800 flex items-center list-none justify-between">
                                        <li className="flex items-center me-4">
                                            <FaCalendarAlt width={20} className="me-2 text-green-600 text-2xl" />
                                            <span>{property?.features?.yearBuilt ?? 'N/A'}</span>
                                        </li>

                                        <li className="flex items-center me-4">
                                            <LuBedDouble width={20} className="me-2 text-green-600 text-2xl" />
                                            <span>
                                                {property.features.bedrooms ?? 0}{' '}
                                                {property.features.bedrooms === 1 ? t('bed') : t('beds')}
                                            </span>
                                        </li>

                                        <li className="flex items-center">
                                            <LuBath width={20} className="me-2 text-green-600 text-2xl" />
                                            <span>
                                                {property.features.bathrooms ?? 0}{' '}
                                                {property.features.bathrooms === 1 ? t('bath') : t('baths')}
                                            </span>
                                        </li>
                                    </ul>

                                    <ul className="md:pt-4 pt-6 flex justify-between items-center list-none">
                                        <li>
                                            <span className="text-slate-400">{t('price')}</span>
                                            <p className="text-lg font-medium">
                                                {new Intl.NumberFormat('en-US', {
                                                    style: 'currency',
                                                    currency: 'USD',
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 0,
                                                    currencyDisplay: 'narrowSymbol',
                                                })
                                                    .format(property?.price || 0)
                                                    .replace('$', '$ ')}
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </ReusableLink>
                ))}
            </div>
        </div>
    )
}

export default PropertyListItem
