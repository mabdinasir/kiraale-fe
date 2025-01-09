'use client' // This is a client component 👈🏽

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import Switcher from '@components/UI/Switcher'
import ReusableLink from '@components/Links/ReusableLink'

const ResetPassword = () => {
    const t = useTranslations()
    return (
        <>
            <section className="md:h-screen py-36 flex items-center relative overflow-hidden zoom-image">
                <div
                    style={{ backgroundImage: "url('/images/bg/01.jpg')" }}
                    className="absolute inset-0 image-wrap z-1 bg-no-repeat bg-center bg-cover"
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-2"></div>
                <div className="container z-3">
                    <div className="flex justify-center">
                        <div className="max-w-[400px] w-full m-auto p-6 bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-700 rounded-md">
                            <Link href="/">
                                <Image
                                    src="/images/logo-icon-64.png"
                                    className="mx-auto"
                                    alt=""
                                    width={64}
                                    height={64}
                                    priority
                                />
                            </Link>
                            <h5 className="my-6 text-xl font-semibold">{t('reset-password')}</h5>
                            <div className="grid grid-cols-1">
                                <p className="text-slate-400 mb-6">{t('reset-password-desc')}</p>
                                <form className="text-start">
                                    <div className="grid grid-cols-1">
                                        <div className="mb-4">
                                            <label className="font-medium" htmlFor="LoginEmail">
                                                {t('email-address')}
                                            </label>
                                            <input
                                                id="LoginEmail"
                                                type="email"
                                                className="form-input mt-3"
                                                placeholder="name@example.com"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <Link
                                                href="#"
                                                className="btn bg-green-600 hover:bg-green-700 text-white rounded-md w-full"
                                            >
                                                {t('send')}
                                            </Link>
                                        </div>

                                        <div className="text-center">
                                            <span className="text-slate-400 me-2">{t('remember-password')} </span>
                                            <ReusableLink
                                                href="/auth/login"
                                                className="text-black dark:text-white font-bold"
                                            >
                                                {t('sign-in')}
                                            </ReusableLink>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Switcher />
        </>
    )
}

export default ResetPassword
