'use client' // This is a client component 👈🏽

import React from 'react'

import { useTranslations } from 'next-intl'
import { useGetFeaturedPropertiesQuery } from '@store/services/properties'
import LoadingIndicator from '../../../../components/UI/LoadingIndicator'
import Property from './Property'

const FeaturedProperties = () => {
    const t = useTranslations()
    const { data, isLoading } = useGetFeaturedPropertiesQuery()

    if (isLoading) return <LoadingIndicator />

    return (
        <>
            <div className="container lg:mt-24 mt-16">
                <div className="grid grid-cols-1 pb-8 text-center">
                    <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">
                        {t('featured-properties')}
                    </h3>
                    <p className="text-slate-400 max-w-xl mx-auto">{t('featured-properties-subtitle')}</p>
                </div>

                <Property properties={data?.properties || []} />
            </div>
        </>
    )
}

export default FeaturedProperties
