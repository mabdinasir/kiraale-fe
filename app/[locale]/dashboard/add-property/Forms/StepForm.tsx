'use client' // This is a client component 👈🏽

import { useTranslations } from 'next-intl'
import React from 'react'
import { FaHome, FaImage, FaCreditCard, FaCheckCircle } from 'react-icons/fa'
import AddPropertyForm from 'app/[locale]/dashboard/add-property/Forms/AddPropertyForm'
import PropertyImageUpload from 'app/[locale]/dashboard/add-property/components/PropertyImageUpload'
import PropertyPayment from 'app/[locale]/dashboard/add-property/components/PropertyPayment'
import Success from '../components/Success'
import { useAppDispatch, useAppSelector } from '@hooks/rtkHooks'
import { goToNextStep } from '@store/slices/stepValidation'
import StoreProvider from 'app/[locale]/StoreProvider'

const StepForm = () => {
    const t = useTranslations()
    const dispatch = useAppDispatch()
    const currentStep = useAppSelector((state) => state.stepValidation.currentStep)
    const isValidStep = useAppSelector((state) => state.stepValidation.isValidStep)

    const nextStep = () => dispatch(goToNextStep())

    return (
        <div className="w-full flex flex-col items-center mt-10">
            <ol className="flex items-center w-full max-w-4xl">
                {[1, 2, 3].map((step) => (
                    <li
                        key={step}
                        className={`flex w-full items-center ${isValidStep[step] ? 'text-green-600 dark:text-green-500' : 'text-gray-400'} after:w-full after:h-1 after:border-b after:border-4 ${
                            isValidStep[step] || isValidStep[step + 1]
                                ? 'after:border-green-600 dark:after:border-green-500'
                                : 'after:border-gray-300 dark:after:border-gray-700'
                        } after:inline-block`}
                    >
                        <span
                            className={`flex items-center justify-center w-10 h-10 ${
                                isValidStep[step] ? 'bg-green-100 dark:bg-green-800' : 'bg-gray-100 dark:bg-gray-700'
                            } rounded-full lg:h-12 lg:w-12 shrink-0`}
                        >
                            {step === 1 && (
                                <FaHome
                                    className={`${isValidStep[step] ? 'text-green-600 dark:text-green-300' : 'text-gray-500 dark:text-gray-100'}`}
                                />
                            )}
                            {step === 2 && (
                                <FaImage
                                    className={`${isValidStep[step] ? 'text-green-600 dark:text-green-300' : 'text-gray-500 dark:text-gray-100'}`}
                                />
                            )}
                            {step === 3 && (
                                <FaCreditCard
                                    className={`${isValidStep[step] ? 'text-green-600 dark:text-green-300' : 'text-gray-500 dark:text-gray-100'}`}
                                />
                            )}
                        </span>
                    </li>
                ))}
                <li
                    className={`flex items-center ${isValidStep[4] ? 'text-green-600 dark:text-green-500' : 'text-gray-400'}`}
                >
                    <span
                        className={`flex items-center justify-center w-10 h-10 ${
                            isValidStep[4] ? 'bg-green-100 dark:bg-green-800' : 'bg-gray-100 dark:bg-gray-700'
                        } rounded-full lg:h-12 lg:w-12 shrink-0`}
                    >
                        <FaCheckCircle
                            className={`${isValidStep[4] ? 'text-green-600 dark:text-green-300' : 'text-gray-500 dark:text-gray-100'}`}
                        />
                    </span>
                </li>
            </ol>

            <div className="w-full max-w-2xl mt-8">
                {currentStep === 1 && <AddPropertyForm />}
                {currentStep === 2 && (
                    <StoreProvider key={'property-image-upload'}>
                        <PropertyImageUpload />
                    </StoreProvider>
                )}
                {currentStep === 3 && <PropertyPayment />}
                {currentStep === 4 && <Success />}
            </div>

            <div className="flex justify-between w-full max-w-2xl mt-6">
                {currentStep < 4 && (
                    <button
                        onClick={nextStep}
                        className={`px-4 py-2 rounded text-white ${
                            isValidStep[currentStep] ? 'bg-green-600' : 'bg-gray-400 cursor-not-allowed'
                        }`}
                        disabled={!isValidStep[currentStep]}
                    >
                        {t('next')}
                    </button>
                )}
            </div>
        </div>
    )
}

export default StepForm
