import React from 'react'
import { useTranslations } from 'next-intl'
import ReusableLink from '@components/Links/ReusableLink'
import { FaBan, FaCalendarAlt, FaHourglassHalf } from 'react-icons/fa'
import { LuBath, LuBedDouble } from 'react-icons/lu'
import Image from 'next/image'
import { Property as IProperty } from '@models/properties/property'
import { PiBuildingApartmentFill } from 'react-icons/pi'
import { RiRadioButtonLine, RiMoneyDollarBoxFill } from 'react-icons/ri'
import { GiCarKey } from 'react-icons/gi'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import FavoriteButton from './FavoriteButton'
import EmptyState from '@components/UI/EmptyState'
import EditButton from './EditButton'
import useCurrentUser from '@hooks/useCurrentUser'
import { useGetUserByIdQuery } from '@store/services/users'
import { Role } from '@models/user'

interface PropertyProps {
    properties: IProperty[]
    emptyStateTile?: string
    emptyStateDescription?: string
}

const statuses = {
    AVAILABLE: {
        icon: <RiRadioButtonLine className="fea icon-ex-md text-green-600 me-3 w-6 h-6" />,
        color: 'text-green-600',
    },
    SOLD: {
        icon: <RiMoneyDollarBoxFill className="fea icon-ex-md text-red-600 me-3 w-6 h-6" />,
        color: 'text-red-600',
    },
    LEASED: {
        icon: <GiCarKey className="fea icon-ex-md text-purple-600 me-3 w-6 h-6" />,
        color: 'text-purple-600',
    },
    PENDING: {
        icon: <FaHourglassHalf className="fea icon-ex-md text-yellow-600 me-3 w-6 h-6" />,
        color: 'text-yellow-600',
    },
    REJECTED: {
        icon: <FaBan className="fea icon-ex-md text-red-600 me-3 w-6 h-6" />,
        color: 'text-red-600',
    },
    EXPIRED: {
        icon: <AiOutlineExclamationCircle className="fea icon-ex-md text-gray-600 me-3 w-6 h-6" />,
        color: 'text-gray-600',
    },
}

const Property: React.FC<PropertyProps> = ({ properties, emptyStateTile, emptyStateDescription }) => {
    const t = useTranslations()
    const currentUser = useCurrentUser()
    const id = currentUser?.id
    const { data: userData } = useGetUserByIdQuery(id || '')

    if (!properties || properties.length === 0)
        return (
            <EmptyState
                icon={<PiBuildingApartmentFill size={98} />}
                title={emptyStateTile ?? t('no-properties-found')}
                description={emptyStateDescription ?? t('no-properties-description')}
            />
        )

    return (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-8 gap-[30px]">
            {properties.map((property) => (
                <ReusableLink key={property.id} href={`/property/${property.id}`}>
                    <div className="group rounded-xl bg-white dark:bg-slate-900 shadow hover:shadow-xl dark:hover:shadow-xl dark:shadow-gray-700 dark:hover:shadow-gray-700 overflow-hidden ease-in-out duration-500">
                        <div className="relative">
                            <Image
                                src={property.media[0]?.url || '/images/property/single/1.jpg'}
                                alt=""
                                width={0}
                                height={0}
                                sizes="100vh"
                                style={{ width: '100%', height: '250px' }}
                                priority
                            />
                            {userData?.user?.id === property.user?.id ||
                            (userData?.user?.role && userData?.user?.role in [Role.MODERATOR, Role.ADMIN]) ? (
                                <EditButton propertyId={property.id} />
                            ) : null}
                            <FavoriteButton propertyId={property.id} isFavorited={property.isFavorited ?? false} />
                        </div>

                        <div className="p-6">
                            <div className="pb-6">{property.title}</div>

                            <ul className="md:py-4 py-6 border-y border-slate-100 dark:border-gray-800 flex items-center list-none justify-between">
                                <li className="flex items-center me-4">
                                    <FaCalendarAlt width={20} className="me-2 text-green-600 text-2xl" />
                                    <span>{property?.features?.yearBuilt ?? 'N/A'}</span>
                                </li>

                                <li className="flex items-center me-4">
                                    <LuBedDouble width={20} className="me-2 text-green-600 text-2xl" />
                                    <span>
                                        {property?.features?.bedrooms ?? 0}{' '}
                                        {property?.features?.bedrooms === 1 ? t('bed') : t('beds')}
                                    </span>
                                </li>

                                <li className="flex items-center">
                                    <LuBath width={20} className="me-2 text-green-600 text-2xl" />
                                    <span>
                                        {property?.features?.bathrooms ?? 0}{' '}
                                        {property?.features?.bathrooms === 1 ? t('bath') : t('baths')}
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
                                <li>
                                    <span className="text-slate-400">{t('status')} :</span>
                                    <div className="flex items-center text-sm">
                                        <span className={`${statuses[property.status]?.color} me-2`}>
                                            {property?.status}
                                        </span>
                                        <span className={`${statuses[property.status]?.color}`}>
                                            {statuses[property.status]?.icon}
                                        </span>
                                    </div>
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
