'use client' // This is a client component 👈🏽

import React, { useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'
import { validateKenyanNumber, validateSomaliNumber } from '@utils/validatePhoneNumber'

type FormErrors = {
    phoneNumber: string
}

const PropertyPayment = () => {
    const t = useTranslations()

    const initialPaymentData = React.useMemo(
        () => ({
            mpesaPhoneNumber: '',
            evcPhoneNumber: '',
        }),
        [],
    )

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'mpesa' | 'evc'>('mpesa')
    const [paymentData, setPaymentData] = useState<{ mpesaPhoneNumber: string; evcPhoneNumber: string }>(
        initialPaymentData,
    )
    const [errors, setErrors] = useState<FormErrors>({ phoneNumber: '' })

    const property = 'Sample Property'
    const kenyaSubtotal = 2000
    const somaliSubtotal = 15
    const percentageDiscount = 0.5
    const discount =
        selectedPaymentMethod === 'mpesa' ? kenyaSubtotal * percentageDiscount : somaliSubtotal * percentageDiscount
    const total = selectedPaymentMethod === 'mpesa' ? kenyaSubtotal - discount : somaliSubtotal - discount

    const handlePaymentMethodChange = useCallback((method: 'mpesa' | 'evc') => {
        setSelectedPaymentMethod(method)
        setErrors({ phoneNumber: '' })
    }, [])

    const handlePhoneNumberChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target

            setPaymentData({
                ...paymentData,
                [selectedPaymentMethod === 'mpesa' ? 'mpesaPhoneNumber' : 'evcPhoneNumber']: value,
            })

            const isValid =
                selectedPaymentMethod === 'mpesa' ? validateKenyanNumber(value) : validateSomaliNumber(value)

            if (isValid) {
                setErrors({ phoneNumber: '' })
            } else {
                setErrors({
                    phoneNumber:
                        selectedPaymentMethod === 'mpesa'
                            ? t('payment.mpesa.phone-invalid')
                            : t('payment.evc.phone-invalid'),
                })
            }
        },
        [paymentData, selectedPaymentMethod, t],
    )

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault()

        setTimeout(() => {
            // Redirect to success page
        }, 1500)
    }, [])

    return (
        <>
            <div className="relative overflow-hidden rounded-md shadow dark:shadow-gray-700 bg-white dark:bg-slate-900 p-6">
                <div className="text-center">
                    <h2 className="text-xl text-slate-700 dark:text-white">
                        {t('payment.title')}
                        <span className="font-semibold"> {property}</span>
                    </h2>
                </div>

                <div className="mt-4 w-2/3 md:w-1/3 mx-auto">
                    <div className="flex justify-between font-medium mt-2">
                        <span className="text-blue-500">{t('payment.subtotal')}:</span>
                        <span className="font-semibold text-blue-500">
                            {selectedPaymentMethod === 'mpesa' ? `KSH ${kenyaSubtotal}` : `$${somaliSubtotal}`}
                        </span>
                    </div>
                    <div className="flex justify-between font-medium mt-2">
                        <span className="text-green-500">{t('payment.discount')}:</span>
                        <span className="font-semibold text-green-500">{percentageDiscount * 100}%</span>
                    </div>
                    <div className="flex justify-between font-medium mt-2">
                        <span className="text-red-600">{t('payment.total')}:</span>
                        <span className="font-bold text-red-600">
                            {selectedPaymentMethod === 'mpesa' ? `KSH ${total}` : `$${total}`}
                        </span>
                    </div>
                </div>

                <p className="text-m text-center mt-8">{t('payment.payment-method-select')}</p>

                <div className="mt-2 items-center justify-center flex space-x-4">
                    <button
                        className={clsx(
                            'hover:bg-[#2E9E2B] px-4 py-2 rounded-md h-10 font-semibold',
                            selectedPaymentMethod === 'mpesa' ? 'bg-[#34B233] text-white' : 'bg-gray-400 text-gray-700',
                        )}
                        onClick={() => handlePaymentMethodChange('mpesa')}
                    >
                        {t('payment.mpesa.title')}
                    </button>

                    <button
                        className={clsx(
                            'hover:bg-[#0098D4] px-4 py-2 rounded-md h-10 font-semibold',
                            selectedPaymentMethod === 'evc' ? 'bg-[#00AEEF] text-white' : 'bg-gray-400 text-gray-700',
                        )}
                        onClick={() => handlePaymentMethodChange('evc')}
                    >
                        {t('payment.evc.title')}
                    </button>
                </div>

                {selectedPaymentMethod && (
                    <div className="mt-6">
                        <label className="block text-sm font-medium text-slate-700 dark:text-white">
                            {t(`payment.${selectedPaymentMethod}.phone`)}
                        </label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            placeholder={t(`payment.${selectedPaymentMethod}.phone-placeholder`)}
                            value={
                                selectedPaymentMethod === 'mpesa'
                                    ? paymentData.mpesaPhoneNumber
                                    : paymentData.evcPhoneNumber
                            }
                            onChange={handlePhoneNumberChange}
                            className="form-input w-full p-2 border rounded-md mt-2"
                        />
                        {errors.phoneNumber && <p className="text-red-500 text-sm mt-2">{errors.phoneNumber}</p>}

                        <div className="mt-4 items-center justify-center flex space-x-4">
                            <button
                                onClick={handleSubmit}
                                className={clsx(
                                    'hover:bg-[#2E9E2B] px-4 py-2 rounded-md h-10',
                                    selectedPaymentMethod === 'mpesa'
                                        ? 'bg-[#34B233] text-white'
                                        : 'bg-[#00AEEF] text-white',
                                    (!paymentData.mpesaPhoneNumber && !paymentData.evcPhoneNumber) ||
                                        (!!errors.phoneNumber && 'bg-gray-400 cursor-not-allowed'),
                                )}
                                disabled={
                                    (selectedPaymentMethod === 'mpesa' && !paymentData.mpesaPhoneNumber) ||
                                    (selectedPaymentMethod === 'evc' && !paymentData.evcPhoneNumber) ||
                                    !!errors.phoneNumber
                                }
                            >
                                {t(`payment.${selectedPaymentMethod}.pay`)}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default PropertyPayment
