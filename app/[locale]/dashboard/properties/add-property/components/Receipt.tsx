import React from 'react'
import { useTranslations } from 'next-intl'
import { format } from 'date-fns'

const Receipt = () => {
    const t = useTranslations()
    const date = format(new Date(), 'PPpp')

    const property = 'Sample Property'
    const amount = 100
    const method = 'mpesa'
    const phone = '0712345678'

    return (
        <div className="max-w-sm mx-auto bg-white shadow-lg p-6 rounded-md relative receipt-border">
            <h2 className="text-xl font-semibold text-center">{t('receipt.title')}</h2>
            <p className="text-center text-gray-500">{date}</p>

            <div className="mt-4 border-t border-dashed border-gray-300 pt-4">
                <p className="text-lg font-medium">
                    {t('payment.property')}: <strong>{property}</strong>
                </p>
                <p className="text-2xl font-semibold mt-1">
                    {t('payment.amount')}: ${amount}
                </p>
                <p className="text-gray-600 mt-2">
                    {t('receipt.method')}: {t(`payment.${method}.title`)}
                </p>
                <p className="text-gray-600">
                    {t('receipt.phone')}: {phone}
                </p>
            </div>

            <div
                className={`mt-6 p-4 text-center rounded-md 
                ${method === 'mpesa' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'}`}
            >
                {t('receipt.success')}
            </div>

            {/* Dashed line */}
            <div className="border-t border-dashed border-gray-400 mt-6"></div>

            {/* Cut bottom effect */}
            <div className="absolute bottom-0 left-0 right-0 h-6 flex justify-between bg-white">
                <div className="w-6 h-6 bg-white rounded-full shadow-inner"></div>
                <div className="w-6 h-6 bg-white rounded-full shadow-inner"></div>
                <div className="w-6 h-6 bg-white rounded-full shadow-inner"></div>
            </div>
        </div>
    )
}

export default Receipt
