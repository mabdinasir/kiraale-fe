'use client' // This is a client component 👈🏽

import React from 'react'
import { useTranslations } from 'next-intl'
import { useGetFeaturedPropertiesQuery } from '@store/services/properties'
import LoadingIndicator from '../../../../components/UI/LoadingIndicator'
import Property from './Property'

const FeaturedProperties = () => {
    const t = useTranslations()
    const { data, isLoading } = useGetFeaturedPropertiesQuery()

    return (
        <div className="container lg:mt-24 mt-16">
            <div className="grid grid-cols-1 pb-8 text-center">
                <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">
                    {t('featured-properties')}
                </h3>
                <p className="text-slate-400 max-w-xl mx-auto">{t('featured-properties-subtitle')}</p>
            </div>

            {isLoading ? (
                <div className="flex justify-center">
                    <LoadingIndicator />
                </div>
            ) : (
                <Property
                    properties={data?.properties || []}
                    emptyStateTile={t('no-featured-properties-found-title')}
                    emptyStateDescription={t('no-featured-properties-found-description')}
                />
            )}
        </div>
    )
}

export default FeaturedProperties
