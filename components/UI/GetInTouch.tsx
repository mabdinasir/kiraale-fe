import React from 'react'
import { FiPhone } from 'react-icons/fi'
import { useTranslations } from 'next-intl'
import ReusableLink from '@components/Links/ReusableLink'

const GetInTuch = () => {
    const t = useTranslations()

    return (
        <div className="container lg:mt-24 mt-16">
            <div className="grid grid-cols-1 text-center">
                <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-medium text-black dark:text-white">
                    {t('have-a-question')}
                </h3>

                <p className="text-slate-400 max-w-xl mx-auto">{t('have-a-question-subtitle')}</p>

                <div className="mt-6">
                    <ReusableLink href="/contact" className="btn bg-green-600 hover:bg-green-700 text-white rounded-md">
                        <FiPhone className="align-middle me-2" /> {t('contact-us')}
                    </ReusableLink>
                </div>
            </div>
        </div>
    )
}

export default GetInTuch
