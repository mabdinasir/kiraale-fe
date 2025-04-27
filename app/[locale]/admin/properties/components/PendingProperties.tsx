'use client' // This is a client component 👈🏽

import React from 'react'

import { useGetPendingPropertiesQuery } from '@store/services/properties'
import LoadingIndicator from '@components/UI/LoadingIndicator'
import AdminProperty from './AdminProperty'
import { useTranslations } from 'next-intl'

const PendingProperties = () => {
    const { data, isLoading } = useGetPendingPropertiesQuery()
    const t = useTranslations()

    if (isLoading) return <LoadingIndicator />

    return (
        <AdminProperty
            properties={data?.properties || []}
            emptyStateTile={t('no-pending-properties')}
            emptyStateDescription={t('no-pending-properties-description')}
        />
    )
}

export default PendingProperties
