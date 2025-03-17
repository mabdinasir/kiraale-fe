'use client' // This is a client component 👈🏽

import React from 'react'
import { useTranslations } from 'next-intl'

import StoreProvider from 'app/[locale]/StoreProvider'
import Starter from '@components/UI/Starter'
import MyProperties from './Components/MyProperties'

const Page = () => {
    const t = useTranslations()

    return (
        <Starter title={t('my-properties')} description={t('my-properties-description')}>
            <StoreProvider>
                <MyProperties />
            </StoreProvider>
        </Starter>
    )
}

export default Page
