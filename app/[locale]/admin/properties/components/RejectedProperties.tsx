'use client' // This is a client component 👈🏽

import React from 'react'

import { useGetRejectedPropertiesQuery } from '@store/services/properties'
import LoadingIndicator from '@components/UI/LoadingIndicator'
import AdminProperty from './AdminProperty'
import { useTranslations } from 'next-intl'

const RejectedProperties = () => {
    const { data, isLoading } = useGetRejectedPropertiesQuery()
    const t = useTranslations()

    if (isLoading) return <LoadingIndicator />

    return (
        <AdminProperty
            properties={data?.properties || []}
            emptyStateTile={t('no-rejected-properties')}
            emptyStateDescription={t('no-rejected-properties-description')}
        />
    )
}

export default RejectedProperties
