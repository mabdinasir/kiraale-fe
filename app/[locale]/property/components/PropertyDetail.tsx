'use client' // This is a client component 👈🏽

import React from 'react'
import Link from 'next/link'

import { PiBuildingApartmentFill } from 'react-icons/pi'
import { LuBath, LuBedDouble } from 'react-icons/lu'
import { FiMapPin, FiPhone } from 'react-icons/fi'
import Carousel from '@components/UI/Carousel'
import LoadingIndicator from '@components/UI/LoadingIndicator'
import { useGetPropertyByIdQuery } from '@store/services/properties'
import { FaKitchenSet } from 'react-icons/fa6'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import EmptyState from '@components/UI/EmptyState'
import { RiSofaFill } from 'react-icons/ri'
import statuses from '@utils/statuses'

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
        <section className="relative md:py-24 pt-24 pb-12">
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

                        <ul className="pt-6 pb-4 flex items-center list-none">
                            <li className="flex items-center lg:me-6 me-4">
                                <LuBedDouble className="lg:text-3xl text-2xl me-2 text-green-600" />
                                <span className="lg:text-xl ">
                                    {property?.features?.bedroom ?? 0}{' '}
                                    {property?.features?.bedroom === 1 ? t('bed') : t('beds')}
                                </span>
                            </li>

                            <li className="flex items-center lg:me-6 me-4">
                                <LuBath className="lg:text-3xl text-2xl me-2 text-green-600" />
                                <span className="lg:text-xl ">
                                    {property?.features?.bathroom ?? 0}{' '}
                                    {property?.features?.bathroom === 1 ? t('bath') : t('baths')}
                                </span>
                            </li>

                            <li className="flex items-center lg:me-6 me-4">
                                <RiSofaFill className="lg:text-3xl text-2xl me-2 text-green-600" />
                                <span className="lg:text-xl ">
                                    {property?.features?.livingRoom ?? 0}{' '}
                                    {property?.features?.livingRoom === 1 ? t('living-room') : t('living-rooms')}
                                </span>
                            </li>
                        </ul>
                        <li className="flex items-center lg:me-6 me-4 mb-6">
                            <FaKitchenSet className="lg:text-3xl text-2xl me-2 text-green-600" />
                            <span className="lg:text-xl ">
                                {property?.features?.kitchen ?? 0}{' '}
                                {property?.features?.kitchen === 1 ? t('kitchen') : t('kitchens')}
                            </span>
                        </li>

                        <div className="text-2xl font-medium pb-3">
                            <h5 className="text-2xl font-medium border-b">{t('description')}:</h5>
                        </div>
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
                                            <span className=" text-md">{t('area')}:</span>
                                            <span className="font-medium text-md">
                                                {property?.features?.area === 1
                                                    ? ` ${property?.features?.area} ${t('meter')}`
                                                    : ` ${property?.features?.area} ${t('meters')}`}
                                            </span>
                                        </li>

                                        <li className="flex justify-between items-center mt-2 ms-0">
                                            <span className=" text-md">{t('status')}:</span>
                                            <span className={`font-medium text-md ${statuses[property.status]?.color}`}>
                                                {t(property?.status)}
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
                                        {/* kitchen */}
                                        <li className="flex justify-between items-center mt-2 ms-0">
                                            <span className=" text-md">{t('kitchen')}:</span>
                                            <span className="font-medium text-md">
                                                {property?.features?.kitchen ? t('yes') : t('no')}
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
                                        href={`/${locale}/contact-us`}
                                        className="btn bg-transparent hover:bg-green-600 border border-green-600 text-green-600 hover:text-white rounded-md"
                                    >
                                        <FiPhone className="align-middle me-2" /> {t('contact-us')}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full leading-[0] border-0 mt-20">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15958.999999999998!2d45.3181625!3d2.0469345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3d58426c5f5f5f5f%3A0x5f5f5f5f5f5f5f5f!2sMogadishu!5e0!3m2!1sen!2sso!4v1697045861440!5m2!1sen!2sso"
                        style={{ border: '0' }}
                        title="mogadishu-map"
                        className="w-full h-[500px]"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </section>
    )
}

export default PropertyDetail
