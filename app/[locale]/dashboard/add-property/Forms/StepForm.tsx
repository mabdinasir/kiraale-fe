'use client' // This is a client component 👈🏽

import { useTranslations } from 'next-intl'
import React from 'react'
import { FaHome, FaImage, FaCreditCard, FaCheckCircle } from 'react-icons/fa'
import AddPropertyForm from 'app/[locale]/dashboard/add-property/Forms/AddPropertyForm'
import ImageUpload from 'app/[locale]/dashboard/add-property/components/ImageUpload'
import PropertyPayment from 'app/[locale]/dashboard/add-property/components/PropertyPayment'
import Success from '../components/Success'
import { useAppDispatch, useAppSelector } from '@hooks/rtkHooks'
import { goToNextStep, goToPrevStep } from '@store/slices/stepValidation'

const StepForm = () => {
    const t = useTranslations()
    const dispatch = useAppDispatch()
    const currentStep = useAppSelector((state) => state.stepValidation.currentStep)
    const isValidStep = useAppSelector((state) => state.stepValidation.isValidStep[currentStep])

    const nextStep = () => dispatch(goToNextStep())
    const prevStep = () => dispatch(goToPrevStep())

    return (
        <div className="w-full flex flex-col items-center mt-10">
            <ol className="flex items-center w-full max-w-4xl">
                <li
                    className={`flex w-full items-center ${currentStep >= 1 ? 'text-green-600 dark:text-green-500' : 'text-gray-400'} after:w-full after:h-1 after:border-b after:border-gray-300 after:border-4 after:inline-block dark:after:border-gray-700`}
                >
                    <span
                        className={`flex items-center justify-center w-10 h-10 ${currentStep >= 1 ? 'bg-green-100 dark:bg-green-800' : 'bg-gray-100 dark:bg-gray-700'} rounded-full lg:h-12 lg:w-12 shrink-0`}
                    >
                        <FaHome className="text-green-600 dark:text-green-300" />
                    </span>
                </li>
                <li
                    className={`flex w-full items-center ${currentStep >= 2 ? 'text-green-600 dark:text-green-500' : 'text-gray-400'} after:w-full after:h-1 after:border-b after:border-gray-300 after:border-4 after:inline-block dark:after:border-gray-700`}
                >
                    <span
                        className={`flex items-center justify-center w-10 h-10 ${currentStep >= 2 ? 'bg-green-100 dark:bg-green-800' : 'bg-gray-100 dark:bg-gray-700'} rounded-full lg:h-12 lg:w-12 shrink-0`}
                    >
                        <FaImage className="text-gray-500 dark:text-gray-100" />
                    </span>
                </li>
                <li
                    className={`flex w-full items-center ${currentStep >= 3 ? 'text-green-600 dark:text-green-500' : 'text-gray-400'} after:w-full after:h-1 after:border-b after:border-gray-300 after:border-4 after:inline-block dark:after:border-gray-700`}
                >
                    <span
                        className={`flex items-center justify-center w-10 h-10 ${currentStep >= 3 ? 'bg-green-100 dark:bg-green-800' : 'bg-gray-100 dark:bg-gray-700'} rounded-full lg:h-12 lg:w-12 shrink-0`}
                    >
                        <FaCreditCard className="text-gray-500 dark:text-gray-100" />
                    </span>
                </li>
                <li
                    className={`flex items-center ${currentStep === 4 ? 'text-green-600 dark:text-green-500' : 'text-gray-400'}`}
                >
                    <span
                        className={`flex items-center justify-center w-10 h-10 ${currentStep === 4 ? 'bg-green-100 dark:bg-green-800' : 'bg-gray-100 dark:bg-gray-700'} rounded-full lg:h-12 lg:w-12 shrink-0`}
                    >
                        <FaCheckCircle className="text-grey-500 dark:text-green-300" />
                    </span>
                </li>
            </ol>

            <div className="w-full max-w-2xl mt-8">
                {currentStep === 1 && <AddPropertyForm />}
                {currentStep === 2 && <ImageUpload />}
                {currentStep === 3 && <PropertyPayment />}
                {currentStep === 4 && <Success />}
            </div>

            <div className="flex justify-between w-full max-w-2xl mt-6">
                {currentStep > 1 && (
                    <button onClick={prevStep} className="px-4 py-2 bg-gray-300 rounded">
                        {t('back')}
                    </button>
                )}
                {currentStep < 4 && (
                    <button
                        onClick={nextStep}
                        className={`px-4 py-2 rounded ${
                            isValidStep ? 'bg-green-600' : 'bg-gray-300 cursor-not-allowed text-black-500'
                        }`}
                        disabled={!isValidStep}
                    >
                        {t('next')}
                    </button>
                )}
            </div>
        </div>
    )
}

export default StepForm
