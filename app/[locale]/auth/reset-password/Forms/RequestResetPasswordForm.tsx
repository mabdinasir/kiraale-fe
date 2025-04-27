'use client' // This is a client component 👈🏽

import React, { useCallback, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import ReusableLink from '@components/Links/ReusableLink'
import { useRequestPasswordResetMutation } from '@store/services/auth'
import { z } from 'zod'
import Error from '@components/UI/Error'
import isApiError from '@utils/isApiError'
import Button from '@components/UI/Button'
import showToast from '@utils/showToast'
import { ApiError } from '@models/apiError'

const emailSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address' }),
})

type FormErrors = {
    email: string
}

const RequestResetPasswordForm = () => {
    const t = useTranslations()
    const [requestPasswordReset, { isLoading, error }] = useRequestPasswordResetMutation()
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState<FormErrors>({ email: '' })

    const validateEmail = useCallback(async () => {
        try {
            await emailSchema.parseAsync({ email })
            return true
        } catch (err) {
            if (err instanceof z.ZodError) {
                const newErrors = {} as FormErrors
                err.issues.forEach((issue) => {
                    const field = issue.path[0] as keyof FormErrors
                    newErrors[field] = issue.message
                })
                setErrors(newErrors)
            }
            return false
        }
    }, [email])

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
        setErrors((prev) => ({ ...prev, email: '' }))
    }, [])

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault()

            if (!(await validateEmail())) return

            try {
                await requestPasswordReset({ email }).unwrap()
                showToast('success', t('password-reset-email-sent'))
            } catch (err) {
                const errorMessage = (err as ApiError)?.data?.message
                showToast('error', `${t('password-reset-email-failed')}: ${errorMessage}`)
            }
        },
        [email, validateEmail, requestPasswordReset, t],
    )

    return (
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
                                src="/images/logo/logo-icon-80-name.png"
                                className="mx-auto"
                                alt=""
                                width={64}
                                height={64}
                                priority
                            />
                        </Link>
                        <h5 className="my-6 text-xl font-semibold">{t('request-password-reset')}</h5>
                        <div className="grid grid-cols-1">
                            <p className="text-slate-400 mb-6">{t('reset-password-desc')}</p>
                            <form className="text-start" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1">
                                    <div className="mb-4">
                                        <label className="font-medium" htmlFor="ResetEmail">
                                            {t('email-address')}
                                        </label>
                                        <input
                                            id="ResetEmail"
                                            type="email"
                                            autoComplete="email"
                                            className={`form-input mt-3 ${errors.email ? 'border-red-500' : ''}`}
                                            placeholder="name@example.com"
                                            value={email}
                                            onChange={handleChange}
                                            aria-invalid={!!errors.email}
                                            aria-describedby="email-error"
                                        />
                                        {errors.email && (
                                            <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    {error && isApiError(error) && <Error error={error.data.message} />}

                                    <div className="mb-4">
                                        <Button
                                            title={isLoading ? t('sending') : t('send')}
                                            type="submit"
                                            isLoading={isLoading}
                                            fullWidth
                                            disabled={!!errors.email || !email || isLoading}
                                        />
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
    )
}

export default RequestResetPasswordForm
