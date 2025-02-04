'use client' // This is a client component 👈🏽

import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import { FaHome, FaImage, FaCreditCard, FaCheckCircle } from 'react-icons/fa'
import StoreProvider from 'app/[locale]/StoreProvider'
import AddPropertyForm from 'app/[locale]/dashboard/add-property/Forms/AddPropertyForm'
import ImageUpload from 'app/[locale]/dashboard/add-property/components/ImageUpload'
import PropertyPayment from 'app/[locale]/dashboard/add-property/components/PropertyPayment'
import Success from '../components/Success'

const StepForm = () => {
    const t = useTranslations()
    const [step, setStep] = useState(1)

    const nextStep = () => setStep((prev) => (prev < 4 ? prev + 1 : prev))
    const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : prev))

    return (
        <div className="w-full flex flex-col items-center mt-10">
            <ol className="flex items-center w-full max-w-4xl">
                <li
                    className={`flex w-full items-center ${step >= 1 ? 'text-green-600 dark:text-green-500' : 'text-gray-400'} after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700`}
                >
                    <span
                        className={`flex items-center justify-center w-10 h-10 ${step >= 1 ? 'bg-green-100 dark:bg-green-800' : 'bg-gray-100 dark:bg-gray-700'} rounded-full lg:h-12 lg:w-12 shrink-0`}
                    >
                        <FaHome className="text-green-600 dark:text-green-300" />
                    </span>
                </li>
                <li
                    className={`flex w-full items-center ${step >= 2 ? 'text-green-600 dark:text-green-500' : 'text-gray-400'} after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700`}
                >
                    <span
                        className={`flex items-center justify-center w-10 h-10 ${step >= 2 ? 'bg-green-100 dark:bg-green-800' : 'bg-gray-100 dark:bg-gray-700'} rounded-full lg:h-12 lg:w-12 shrink-0`}
                    >
                        <FaImage className="text-gray-500 dark:text-gray-100" />
                    </span>
                </li>
                <li
                    className={`flex w-full items-center ${step >= 3 ? 'text-green-600 dark:text-green-500' : 'text-gray-400'} after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700`}
                >
                    <span
                        className={`flex items-center justify-center w-10 h-10 ${step >= 3 ? 'bg-green-100 dark:bg-green-800' : 'bg-gray-100 dark:bg-gray-700'} rounded-full lg:h-12 lg:w-12 shrink-0`}
                    >
                        <FaCreditCard className="text-gray-500 dark:text-gray-100" />
                    </span>
                </li>
                <li
                    className={`flex items-center ${step === 4 ? 'text-green-600 dark:text-green-500' : 'text-gray-400'}`}
                >
                    <span
                        className={`flex items-center justify-center w-10 h-10 ${step === 4 ? 'bg-green-100 dark:bg-green-800' : 'bg-gray-100 dark:bg-gray-700'} rounded-full lg:h-12 lg:w-12 shrink-0`}
                    >
                        <FaCheckCircle className="text-grey-500 dark:text-green-300" />
                    </span>
                </li>
            </ol>

            <div className="w-full max-w-2xl mt-8">
                {step === 1 && (
                    <StoreProvider key={'add-property'}>
                        <AddPropertyForm />
                    </StoreProvider>
                )}
                {step === 2 && (
                    <StoreProvider key={'upload-image'}>
                        <ImageUpload />
                    </StoreProvider>
                )}
                {step === 3 && (
                    <StoreProvider key={'payment'}>
                        <PropertyPayment />
                    </StoreProvider>
                )}
                {step === 4 && (
                    <StoreProvider key={'success'}>
                        <Success />
                    </StoreProvider>
                )}
            </div>

            <div className="flex justify-between w-full max-w-2xl mt-6">
                {step > 1 && (
                    <button onClick={prevStep} className="px-4 py-2 bg-gray-300 rounded">
                        {t('back')}
                    </button>
                )}
                {step < 4 && (
                    <button onClick={nextStep} className="px-4 py-2 bg-green-600 text-white rounded">
                        Next
                    </button>
                )}
            </div>
        </div>
    )
}

export default StepForm
