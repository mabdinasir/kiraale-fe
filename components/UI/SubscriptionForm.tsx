'use client' // This is a client component 👈🏽

import { useAddSubscriberMutation } from '@store/services/subscriber'
import showToast from '@utils/showToast'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import { BsPencil } from 'react-icons/bs'
import { FiMail } from 'react-icons/fi'

const SubscriptionForm = () => {
    const t = useTranslations()

    const [email, setEmail] = useState('')
    const [addSubscriber, { isLoading, isError }] = useAddSubscriberMutation()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!email.trim()) return

        await addSubscriber({ email }).unwrap()
        setEmail('')
        showToast('success', t('subscribe-success'), 15)

        if (isError) {
            showToast('error', t('subscribe-error'), 15)
        }
    }

    return (
        <div className="relative -top-40 bg-white dark:bg-slate-900 lg:px-8 px-6 py-10 rounded-xl shadow-lg dark:shadow-gray-700 overflow-hidden">
            <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-[30px]">
                <div className="md:text-start text-center z-1">
                    <h3 className="md:text-3xl text-2xl md:leading-normal leading-normal font-medium text-black dark:text-white">
                        {t('subscribe-title')}
                    </h3>
                    <p className="text-slate-400 max-w-xl mx-auto">{t('subscribe-subtitle')}</p>
                </div>

                <div className="subcribe-form z-1">
                    <form className="relative max-w-lg md:ms-auto" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            id="subscribe"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="rounded-full bg-white dark:bg-slate-900 shadow dark:shadow-gray-700"
                            placeholder={`${t('enter-email')} :`}
                            required
                        />
                        <button
                            type="submit"
                            className="btn bg-green-600 hover:bg-green-700 text-white rounded-full"
                            disabled={isLoading}
                        >
                            {isLoading ? t('subscribing') : t('subscribe')}
                        </button>
                    </form>
                </div>
            </div>
            <div className="absolute -top-5 -start-5">
                <FiMail
                    className=" text-black/5 dark:text-white/5 ltr:-rotate-45 rtl:rotate-45"
                    style={{ width: '150px', height: '150px' }}
                />
            </div>

            <div className="absolute -bottom-5 -end-5">
                <BsPencil
                    className=" text-black/5 dark:text-white/5 rtl:-rotate-90"
                    style={{ width: '150px', height: '150px' }}
                />
            </div>
        </div>
    )
}

export default SubscriptionForm
