import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import StoreProvider from 'app/[locale]/StoreProvider'
import SignupForm from './forms/SignupForm'

const SignUp = () => {
    const t = useTranslations()

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
                        <h5 className="my-6 text-xl font-semibold">{t('signup')}</h5>
                        <StoreProvider key={'signup'}>
                            <SignupForm />
                        </StoreProvider>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp
