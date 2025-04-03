'use client' // This is a client component 👈🏽

import React, { useState, useCallback, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'
import { validateKenyanNumber, validateSomaliNumber } from '@utils/validatePhoneNumber'
import {
    useCheckMpesaPaymentStatusQuery,
    useEvcPlusPurchaseMutation,
    useStkPushMutation,
} from '@store/services/payments'
import { useAppDispatch, useAppSelector } from '@hooks/rtkHooks'
import useCurrentUser from '@hooks/useCurrentUser'
import { useGetUserByIdQuery } from '@store/services/users'
import { updateStep } from '@store/slices/stepValidation'
import showToast from '@utils/showToast'

type FormErrors = {
    phoneNumber: string
}

const PropertyPayment = () => {
    const t = useTranslations()
    const dispatch = useAppDispatch()
    const propertyId = useAppSelector((state) => state.stepValidation.steps[1].propertyId)
    const currentUser = useCurrentUser()
    const id = currentUser?.id
    const { data: userData } = useGetUserByIdQuery(id || '')
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
    const [mpesaCheckoutRequestId, setMpesaCheckoutRequestId] = useState<string | null>(null)

    const [stkPush, { isLoading: isMpesaLoading }] = useStkPushMutation()
    const [evcPlusPurchase, { isLoading: isEvcLoading }] = useEvcPlusPurchaseMutation()
    const { data: paymentStatusResponse, refetch } = useCheckMpesaPaymentStatusQuery(mpesaCheckoutRequestId || '', {
        skip: !mpesaCheckoutRequestId,
    })

    const property = 'Sample Property'
    const kenyaSubtotal = 2000
    const somaliSubtotal = 15
    const percentageDiscount = 1

    const discount =
        selectedPaymentMethod === 'mpesa' ? kenyaSubtotal * percentageDiscount : somaliSubtotal * percentageDiscount
    const total = selectedPaymentMethod === 'mpesa' ? kenyaSubtotal - discount : somaliSubtotal - discount
    const isFreePayment = discount === (selectedPaymentMethod === 'mpesa' ? kenyaSubtotal : somaliSubtotal)

    const formatCurrency = (amount: number) =>
        selectedPaymentMethod === 'mpesa' ? `KSH ${amount.toFixed(2)}` : `$${amount.toFixed(2)}`

    const isLoading = selectedPaymentMethod === 'mpesa' ? isMpesaLoading : isEvcLoading

    useEffect(() => {
        if (paymentStatusResponse?.data?.paymentStatus === 'COMPLETED') {
            dispatch(updateStep({ step: 3, isValid: true, data: { isPaymentSuccess: true } }))
            dispatch(updateStep({ step: 4, isValid: true }))
            showToast('success', t('payment.success'))
            setMpesaCheckoutRequestId(null)
        } else if (paymentStatusResponse?.data?.paymentStatus === 'FAILED') {
            showToast('error', t('payment.mpesa.failed'))
            setMpesaCheckoutRequestId(null)
        }
    }, [paymentStatusResponse, dispatch, t, isFreePayment])

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

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault()

            try {
                if (selectedPaymentMethod === 'mpesa') {
                    const { mpesaPhoneNumber } = paymentData
                    const response = await stkPush({
                        phoneNumber: mpesaPhoneNumber,
                        userId: userData?.user.id || '',
                        propertyId,
                    }).unwrap()

                    if (response?.data?.CheckoutRequestID) {
                        setMpesaCheckoutRequestId(response.data.CheckoutRequestID)
                        showToast('success', t('payment.mpesa.initiated'))
                        refetch()
                    } else {
                        showToast('error', t('payment.mpesa.initiation-failed'))
                    }
                } else {
                    await evcPlusPurchase({
                        phoneNumber: paymentData.evcPhoneNumber,
                        userId: userData?.user.id || '',
                        propertyId,
                    }).unwrap()

                    dispatch(updateStep({ step: 3, isValid: true, data: { isPaymentSuccess: true } }))
                    dispatch(updateStep({ step: 4, isValid: true }))
                    showToast('success', t('payment.evc.success'))
                }
            } catch {
                showToast('error', t('payment.generic-error'))
            }
        },
        [
            selectedPaymentMethod,
            paymentData,
            stkPush,
            userData?.user.id,
            propertyId,
            t,
            evcPlusPurchase,
            dispatch,
            refetch,
        ],
    )

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
                            {formatCurrency(selectedPaymentMethod === 'mpesa' ? kenyaSubtotal : somaliSubtotal)}
                        </span>
                    </div>
                    <div className="flex justify-between font-medium mt-2">
                        <span className="text-green-500">{t('payment.discount')}:</span>
                        <span className="font-semibold text-green-500">{percentageDiscount * 100}%</span>
                    </div>
                    <div className="flex justify-between font-medium mt-2">
                        <span className="text-red-600">{t('payment.total')}:</span>
                        <span className="font-bold text-red-600">{formatCurrency(total)}</span>
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
                                    selectedPaymentMethod === 'mpesa'
                                        ? 'hover:bg-[#2E9E2B] px-4 py-2 rounded-md h-10'
                                        : 'hover:bg-[#0098D4] px-4 py-2 rounded-md h-10',
                                    selectedPaymentMethod === 'mpesa'
                                        ? 'bg-[#34B233] text-white'
                                        : 'bg-[#00AEEF] text-white',
                                    (!paymentData.mpesaPhoneNumber && !paymentData.evcPhoneNumber) ||
                                        !!errors.phoneNumber ||
                                        (isFreePayment && 'bg-gray-400 cursor-not-allowed'),
                                )}
                                disabled={
                                    (selectedPaymentMethod === 'mpesa' && !paymentData.mpesaPhoneNumber) ||
                                    (selectedPaymentMethod === 'evc' && !paymentData.evcPhoneNumber) ||
                                    !!errors.phoneNumber ||
                                    isLoading ||
                                    isFreePayment
                                }
                            >
                                {isLoading ? t('payment.processing') : t(`payment.${selectedPaymentMethod}.pay`)}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default PropertyPayment
