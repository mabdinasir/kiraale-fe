'use client' // This is a client component 👈🏽

import React from 'react'

import { useGetMyPropertiesQuery } from '@store/services/properties'
import LoadingIndicator from '@components/UI/LoadingIndicator'
import Property from '@components/UI/Property/Property'

const MyProperties = () => {
    const { data, isLoading } = useGetMyPropertiesQuery()

    if (isLoading) return <LoadingIndicator />

    return <Property properties={data?.properties || []} />
}

export default MyProperties
