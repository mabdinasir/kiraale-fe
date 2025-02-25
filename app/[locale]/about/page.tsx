'use client' // This is a client component 👈🏽

import React from 'react'

import Navbar from '@components/Layout/Navbar'
import AboutUs from './components/AboutUs'
import AboutUsFeature from './components/AboutUsFeature'
import Counter from '@components/UI/Counter'
import GetInTuch from '@components/UI/GetInTouch'

import { useTranslations } from 'next-intl'
import ClientOne from '@components/UI/ClientOne'
import { counterData } from '@data/data'

const About = () => {
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
                            {t('about-us')}
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
            <section className="relative md:pb-24 pb-16">
                <AboutUsFeature />
                <AboutUs />
            </section>
            <section
                style={{ backgroundImage: "url('/images/bg/01.jpg')" }}
                className="relative py-24 bg-no-repeat bg-center bg-fixed bg-cover"
            >
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="container">
                    <div className="grid lg:grid-cols-12 grid-cols-1 md:text-start text-center justify-center">
                        <div className="lg:col-start-2 lg:col-span-10">
                            <div className="grid md:grid-cols-3 grid-cols-1 items-center">
                                {counterData.map((item, index) => (
                                    <div className="counter-box text-center" key={index}>
                                        <h1 className="text-white lg:text-5xl text-4xl font-semibold mb-2">
                                            <Counter start={0} end={item.target}></Counter>+
                                        </h1>
                                        <h5 className="counter-head text-white text-lg font-medium">{t(item.title)}</h5>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="md:pb-24 pb-16">
                <ClientOne />
                <GetInTuch />
            </section>
        </>
    )
}

export default About
