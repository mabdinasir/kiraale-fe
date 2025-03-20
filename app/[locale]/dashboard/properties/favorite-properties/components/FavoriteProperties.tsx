'use client' // This is a client component 👈🏽

import React from 'react'
import EmptyState from '@components/UI/EmptyState'
import LoadingIndicator from '@components/UI/LoadingIndicator'
import { PiBuildingApartmentFill } from '@node_modules/react-icons/pi'
import { useGetFavoritePropertiesQuery } from '@store/services/properties'
import { useTranslations } from 'next-intl'
import Property from 'app/[locale]/property/components/Property'

const FavoriteProperties = () => {
    const { data, isLoading } = useGetFavoritePropertiesQuery()
    const t = useTranslations()

    if (isLoading) return <LoadingIndicator />

    if (!data?.properties || data?.properties.length === 0)
        return (
            <EmptyState
                icon={<PiBuildingApartmentFill size={98} />}
                title={t('no-favorite-properties')}
                description={t('no-favorite-properties-description')}
            />
        )

    return (
        <div>
            <Property properties={data.properties} />
        </div>
    )
}

export default FavoriteProperties
