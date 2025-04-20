import React from 'react'
import FavoriteProperties from '../components/FavoriteProperties'
import StoreProvider from 'app/[locale]/StoreProvider'
import Starter from '@components/UI/Starter'
import { useTranslations } from 'next-intl'

const Page = () => {
    const t = useTranslations()
    return (
        <div>
            <Starter title={t('favorite-properties')} description={t('favorite-properties-description')} />
            <StoreProvider>
                <FavoriteProperties />
            </StoreProvider>
        </div>
    )
}

export default Page
