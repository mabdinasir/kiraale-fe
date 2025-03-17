import React from 'react'
import { useTranslations } from 'next-intl'
import ReusableLink from '@components/Links/ReusableLink'
import { FaCalendarAlt } from 'react-icons/fa'
import { LuBath, LuBedDouble } from 'react-icons/lu'
import Image from 'next/image'
import { Property as IProperty } from '@models/properties/property'
import EmptyState from '../EmptyState'
import { PiBuildingApartmentFill } from '@node_modules/react-icons/pi'

interface PropertyProps {
    properties: IProperty[]
}

const Property: React.FC<PropertyProps> = ({ properties }) => {
    const t = useTranslations()

    if (!properties || properties.length === 0)
        return (
            <EmptyState
                icon={<PiBuildingApartmentFill size={98} />}
                title={t('no-properties-found')}
                description={t('no-properties-description')}
            />
        )

    return (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-8 gap-[30px]">
            {properties.map((item) => (
                <ReusableLink key={item.id} href={`/property/${item.id}`}>
                    <div className="group rounded-xl bg-white dark:bg-slate-900 shadow hover:shadow-xl dark:hover:shadow-xl dark:shadow-gray-700 dark:hover:shadow-gray-700 overflow-hidden ease-in-out duration-500">
                        <div className="relative">
                            <Image
                                src={item?.media[0]?.url || '/images/property/single/1.jpg'}
                                alt=""
                                width={0}
                                height={0}
                                sizes="100vh"
                                style={{ width: '100%', height: '250px' }}
                                priority
                            />

                            <div className="absolute top-4 end-4">
                                <div
                                    className="btn btn-icon bg-white dark:bg-slate-900 shadow dark:shadow-gray-700 rounded-full text-slate-100 dark:text-slate-700 focus:text-red-600 dark:focus:text-red-600 hover:text-red-600 dark:hover:text-red-600"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        //favoriteProperty(item.id)
                                    }}
                                >
                                    <i className="mdi mdi-heart mdi-18px"></i>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="pb-6">{item.title}</div>

                            <ul className="md:py-4 py-6 border-y border-slate-100 dark:border-gray-800 flex items-center list-none justify-between">
                                <li className="flex items-center me-4">
                                    <FaCalendarAlt width={20} className="me-2 text-green-600 text-2xl" />
                                    <span>{item?.features?.yearBuilt}</span>
                                </li>

                                <li className="flex items-center me-4">
                                    <LuBedDouble width={20} className="me-2 text-green-600 text-2xl" />
                                    <span>
                                        {item.features.bedrooms} {item.features.bedrooms <= 1 ? t('bed') : t('beds')}
                                    </span>
                                </li>

                                <li className="flex items-center">
                                    <LuBath width={20} className="me-2 text-green-600 text-2xl" />
                                    <span>
                                        {item.features.bathrooms}{' '}
                                        {item.features.bathrooms <= 1 ? t('bath') : t('baths')}
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
                                            .format(item?.price || 0)
                                            .replace('$', '$ ')}
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </ReusableLink>
            ))}
        </div>
    )
}

export default Property
