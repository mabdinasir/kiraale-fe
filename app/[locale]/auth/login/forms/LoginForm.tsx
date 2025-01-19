'use client' // This is a client component 👈🏽

import ReusableLink from '@components/Links/ReusableLink'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React from 'react'

const LoginForm = () => {
    const t = useTranslations()

    return (
        <form className="text-start">
            <div className="grid grid-cols-1">
                <div className="mb-4">
                    <label className="font-medium" htmlFor="LoginEmail">
                        {t('email-address')}
                    </label>
                    <input id="LoginEmail" type="email" className="form-input mt-3" placeholder="name@example.com" />
                </div>

                <div className="mb-4">
                    <label className="font-medium" htmlFor="LoginPassword">
                        {t('password')}
                    </label>
                    <input id="LoginPassword" type="password" className="form-input mt-3" placeholder={t('password')} />
                </div>

                <div className="flex justify-between mb-4">
                    <div className="inline-flex items-center">
                        <input
                            className="form-checkbox text-green-600 rounded w-4 h-4 me-2 border border-inherit"
                            type="checkbox"
                            value=""
                            id="RememberMe"
                        />
                        <label className="form-check-label text-slate-400" htmlFor="RememberMe">
                            {t('remember-me')}
                        </label>
                    </div>

                    <p className="text-slate-400 mb-0">
                        <ReusableLink href="/auth/reset-password" className="text-slate-400">
                            {t('forgot-password')}
                        </ReusableLink>
                    </p>
                </div>

                <div className="mb-4">
                    <Link href="#" className="btn bg-green-600 hover:bg-green-700 text-white rounded-md w-full">
                        {t('login-sign-in')}
                    </Link>
                </div>

                <div className="text-center">
                    <span className="text-slate-400 me-2">{t('dont-have-account')}</span>{' '}
                    <ReusableLink href="/auth/signup" className="text-black dark:text-white font-bold">
                        {t('signup')}
                    </ReusableLink>
                </div>
            </div>
        </form>
    )
}

export default LoginForm
