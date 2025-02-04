import { useTranslations } from 'next-intl'
import React from 'react'

const Success = () => {
    const t = useTranslations()
    return (
        <div>
            <h1>{t('payment-successful')}</h1>
        </div>
    )
}

export default Success
