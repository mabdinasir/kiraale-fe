import React from 'react'
import { useTranslations } from 'next-intl'
import ReusableLink from '@components/Links/ReusableLink'
import { RiSofaFill } from 'react-icons/ri'
import { LuBath, LuBedDouble } from 'react-icons/lu'
import Image from 'next/image'
import { Property as IProperty } from '@models/properties/property'
import { PiBuildingApartmentFill } from 'react-icons/pi'
import EmptyState from '@components/UI/EmptyState'
import AdminDeleteButton from './AdminDeleteButton'
import statuses from '@utils/statuses'
import { FiMapPin } from 'react-icons/fi'

interface AdminPropertyProps {
    properties: IProperty[]
    emptyStateTile?: string
    emptyStateDescription?: string
}

const AdminProperty: React.FC<AdminPropertyProps> = ({ properties, emptyStateTile, emptyStateDescription }) => {
    const t = useTranslations()
    // const currentUser = useCurrentUser()
    // const id = currentUser?.id
    // const { data: userData } = useGetUserByIdQuery(id || '')

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
                <ReusableLink key={property.id} href={`/admin/properties/${property.id}`}>
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
                            <AdminDeleteButton propertyId={property.id} />

                            {/* {userData?.user?.role &&
                            (currentUser?.role === Role.MODERATOR || currentUser?.role === Role.ADMIN) ? (
                                <AdminEditButton propertyId={property.id} />
                            ) : null} */}
                        </div>

                        <div className="p-6">
                            <span className="flex items-center mb-2">
                                <FiMapPin className="size-4 me-2" />
                                {property?.country ?? 'N/A'}
                            </span>
                            <div className="pb-6">{property.title}</div>

                            <ul className="md:py-4 py-6 border-y border-slate-100 dark:border-gray-800 flex items-center list-none justify-between gap-1">
                                <li className="flex items-center">
                                    <LuBedDouble width={20} className="me-1 text-green-600 text-2xl" />
                                    <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                                        {property?.features?.bedroom ?? 0}{' '}
                                        {property?.features?.bedroom === 1 ? t('bed') : t('beds')}
                                    </span>
                                </li>

                                <li className="flex items-center">
                                    <LuBath width={20} className="me-1 text-green-600 text-2xl" />
                                    <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                                        {property?.features?.bathroom ?? 0}{' '}
                                        {property?.features?.bathroom === 1 ? t('bath') : t('baths')}
                                    </span>
                                </li>

                                <li className="flex items-center">
                                    <RiSofaFill width={20} className="me-1 text-green-600 text-2xl" />
                                    <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                                        {property?.features?.livingRoom ?? 0}{' '}
                                        {property?.features?.livingRoom === 1 ? t('living-room') : t('living-rooms')}
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
                                    <span className="text-slate-400">{t('listed-on')}</span>
                                    <p className="text-lg font-medium">
                                        {new Date(property.createdAt).toLocaleDateString('en-GB', {
                                            timeZone: 'UTC',
                                        })}
                                    </p>
                                </li>

                                <li>
                                    <span className="text-slate-400">{t('status')} :</span>
                                    <div className="flex items-center text-sm">
                                        <span className={`${statuses[property.status]?.color} me-2`}>
                                            {t(property?.status)}
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

export default AdminProperty
