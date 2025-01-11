import React from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import Navbar from '@components/Layout/Navbar'
import Client from '@components/UI/ClientOne'
import GetInTuch from '@components/UI/GetInTouch'

import { feature } from '@data/data'
import { FiHexagon } from 'react-icons/fi'

const Features = () => {
    const t = useTranslations()

    return (
        <>
            <Navbar navClass="navbar-white" />
            <section
                style={{ backgroundImage: "url('/images/bg/01.jpg')" }}
                className="relative table w-full py-32 lg:py-36 bg-no-repeat bg-center bg-cover"
            >
                <div className="absolute inset-0 bg-black opacity-80"></div>
                <div className="container">
                    <div className="grid grid-cols-1 text-center mt-10">
                        <h3 className="md:text-4xl text-3xl md:leading-normal leading-normal font-medium text-white">
                            {t('services-features')}
                        </h3>
                    </div>
                </div>
            </section>
            <div className="relative">
                <div className="shape overflow-hidden z-1 text-white dark:text-slate-900">
                    <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                    </svg>
                </div>
            </div>
            <section className="relative lg:py-24 py-16">
                <div className="container">
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-[30px] gap-y-[50px]">
                        {feature.map((item, index) => (
                            <div
                                className="group relative lg:px-10 transition-all duration-500 ease-in-out rounded-xl bg-white dark:bg-slate-900 overflow-hidden"
                                key={index}
                            >
                                <div className="relative overflow-hidden text-transparent -m-3">
                                    <FiHexagon className="h-32 w-32 fill-green-600/5"></FiHexagon>
                                    <div className="absolute top-[50%] -translate-y-[50%] start-[45px] text-green-600 rounded-xl transition-all duration-500 ease-in-out text-4xl flex align-middle justify-center items-center">
                                        <i className={item.icon}></i>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <Link href="#" className="text-xl hover:text-green-600 font-medium">
                                        {item.title}
                                    </Link>
                                    <p className="text-slate-400 mt-3">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <Client />
                <GetInTuch />
            </section>
        </>
    )
}

export default Features
