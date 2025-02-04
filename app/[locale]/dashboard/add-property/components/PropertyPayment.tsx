import { useTranslations } from 'next-intl'
import React from 'react'

const PropertyPayment = () => {
    const t = useTranslations()
    return (
        <div>
            <h1>{t('property-payment')}</h1>
        </div>
    )
}

export default PropertyPayment
