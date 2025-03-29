import ReusableLink from '@components/Links/ReusableLink'
import React from 'react'
import { useTranslations } from 'next-intl'
import StoreProvider from 'app/[locale]/StoreProvider'
import StepForm from './Forms/StepForm'

const AddProperty = () => {
    const t = useTranslations()

    return (
        <StoreProvider key={'step-form'}>
            <>
                <div className="md:flex justify-between items-center">
                    <h5 className="text-lg font-semibold">{t('add-property')}</h5>

                    <ul className="tracking-[0.5px] inline-block sm:mt-0 mt-3">
                        <li className="inline-block capitalize text-[16px] font-medium duration-500 dark:text-white/70 hover:text-green-600 dark:hover:text-white">
                            <ReusableLink href="/">Kiraale</ReusableLink>
                        </li>
                        <li className="inline-block text-base text-slate-950 dark:text-white/70 mx-0.5 ltr:rotate-0 rtl:rotate-180">
                            <i className="mdi mdi-chevron-right"></i>
                        </li>
                        <li
                            className="inline-block capitalize text-[16px] font-medium text-green-600 dark:text-white"
                            aria-current="page"
                        >
                            {t('add-property')}
                        </li>
                    </ul>
                </div>
                <StepForm />
            </>
        </StoreProvider>
    )
}

export default AddProperty
