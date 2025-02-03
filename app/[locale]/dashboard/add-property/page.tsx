import ReusableLink from '@components/Links/ReusableLink'
import React from 'react'
import ImageUpload from './components/ImageUpload'
import { useTranslations } from 'next-intl'
import AddPropertyForm from './Forms/AddPropertyForm'
import StoreProvider from 'app/[locale]/StoreProvider'

const AddProperty = () => {
    const t = useTranslations()

    return (
        <div className="container-fluid relative pb-16">
            <div className="layout-specing">
                <div className="md:flex justify-between items-center">
                    <h5 className="text-lg font-semibold">{t('add-property')}</h5>

                    <ul className="tracking-[0.5px] inline-block sm:mt-0 mt-3">
                        <li className="inline-block capitalize text-[16px] font-medium duration-500 dark:text-white/70 hover:text-green-600 dark:hover:text-white">
                            <ReusableLink href="/">Eastleigh Real Estate</ReusableLink>
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

                <div className="container relative">
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mt-6">
                        <div className="rounded-md shadow dark:shadow-gray-700 p-6 bg-white dark:bg-slate-900 h-fit">
                            <StoreProvider key={'add-property'}>
                                <AddPropertyForm />
                            </StoreProvider>
                        </div>
                        <div className="rounded-md shadow dark:shadow-gray-700 p-6 bg-white dark:bg-slate-900 h-fit">
                            <ImageUpload />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProperty
