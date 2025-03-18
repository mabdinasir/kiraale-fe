import React from 'react'
import { useTranslations } from 'next-intl'
import ReusableLink from '@components/Links/ReusableLink'
import { FaCalendarAlt } from 'react-icons/fa'
import { LuBath, LuBedDouble } from 'react-icons/lu'
import Image from 'next/image'
import { Property as IProperty } from '@models/properties/property'
import EmptyState from '../EmptyState'
import { PiBuildingApartmentFill } from '@node_modules/react-icons/pi'
import { useToggleFavoritePropertyMutation } from '@store/services/properties'

interface PropertyProps {
    properties: IProperty[]
}

const Property: React.FC<PropertyProps> = ({ properties: initialProperties }) => {
    const t = useTranslations()
    const [toggleFavoriteProperty] = useToggleFavoritePropertyMutation()
    const [properties, setProperties] = React.useState(initialProperties)

    const handleToggleFavorite = async (propertyId: string) => {
        // Find the property to update
        const updatedProperties = properties.map((property) =>
            property.id === propertyId
                ? { ...property, isFavorited: !property.isFavorited } // Toggle favorite status
                : property,
        )

        // Optimistically update the UI
        setProperties(updatedProperties)

        try {
            await toggleFavoriteProperty(propertyId).unwrap()
        } catch {
            setProperties(properties)
        }
    }

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
            {properties.map((property) => (
                <ReusableLink key={property.id} href={`/property/${property.id}`}>
                    <div className="group rounded-xl bg-white dark:bg-slate-900 shadow hover:shadow-xl dark:hover:shadow-xl dark:shadow-gray-700 dark:hover:shadow-gray-700 overflow-hidden ease-in-out duration-500">
                        <div className="relative">
                            <Image
                                src={property?.media[0]?.url || '/images/property/single/1.jpg'}
                                alt=""
                                width={0}
                                height={0}
                                sizes="100vh"
                                style={{ width: '100%', height: '250px' }}
                                priority
                            />

                            <div className="absolute top-4 end-4">
                                <div
                                    className={`btn btn-icon bg-white dark:bg-slate-900 shadow dark:shadow-gray-700 rounded-full ${
                                        property.isFavorited
                                            ? 'text-red-600 dark:text-red-600'
                                            : 'text-slate-100 dark:text-slate-700'
                                    } focus:text-red-600 dark:focus:text-red-600 hover:text-red-600 dark:hover:text-red-600`}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleToggleFavorite(property.id)
                                    }}
                                >
                                    <i className="mdi mdi-heart mdi-18px"></i>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="pb-6">{property.title}</div>

                            <ul className="md:py-4 py-6 border-y border-slate-100 dark:border-gray-800 flex propertys-center list-none justify-between">
                                <li className="flex propertys-center me-4">
                                    <FaCalendarAlt width={20} className="me-2 text-green-600 text-2xl" />
                                    <span>{property?.features?.yearBuilt}</span>
                                </li>

                                <li className="flex propertys-center me-4">
                                    <LuBedDouble width={20} className="me-2 text-green-600 text-2xl" />
                                    <span>
                                        {property.features.bedrooms}{' '}
                                        {property.features.bedrooms <= 1 ? t('bed') : t('beds')}
                                    </span>
                                </li>

                                <li className="flex propertys-center">
                                    <LuBath width={20} className="me-2 text-green-600 text-2xl" />
                                    <span>
                                        {property.features.bathrooms}{' '}
                                        {property.features.bathrooms <= 1 ? t('bath') : t('baths')}
                                    </span>
                                </li>
                            </ul>

                            <ul className="md:pt-4 pt-6 flex justify-between propertys-center list-none">
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
                </ReusableLink>
            ))}
        </div>
    )
}

export default Property
