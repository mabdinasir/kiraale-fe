'use client' // This is a client component 👈🏽

import React from 'react'

import { useGetPropertiesByUserQuery } from '@store/services/properties'
import LoadingIndicator from '@components/UI/LoadingIndicator'
import Property from 'app/[locale]/property/components/Property'

const MyProperties = () => {
    const { data, isLoading } = useGetPropertiesByUserQuery()

    if (isLoading) return <LoadingIndicator />

    return <Property properties={data?.properties || []} />
}

export default MyProperties
