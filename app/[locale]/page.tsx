import PropertySearch from '@components/Forms/PropertySearch'
import { useTranslations } from 'next-intl'
import React from 'react'
import About from './about/AboutUs'
import Feature from '@components/UI/Feature'
import GetInTuch from '@components/UI/GetInTouch'
import Property from '@components/UI/Property'
import ClientTwo from '@components/UI/ClientTwo'

const Home = () => {
    const t = useTranslations()
    return (
        <>
            {/* Hero Start  */}
            <section className="relative mt-20">
                <div className="container-fluid md:mx-4 mx-2">
                    <div
                        style={{ backgroundImage: `url('/images/bg/01.jpg')` }}
                        className="relative pt-40 pb-52 table w-full rounded-2xl shadow-md overflow-hidden  bg-no-repeat bg-center bg-cover"
                        id="home"
                    >
                        <div className="absolute inset-0 bg-black/60"></div>

                        <div className="container">
                            <div className="grid grid-cols-1">
                                <div className="md:text-start text-center">
                                    <h1 className="font-bold text-white lg:leading-normal leading-normal text-4xl lg:text-5xl mb-6">
                                        {t('home-title-part1')} <br /> {t('home-title-part2')}{' '}
                                        <span className="text-green-600">{t('home-title-highlight')}</span>{' '}
                                        {t('home-title-part3')}
                                    </h1>
                                    <p className="text-white/70 text-xl max-w-xl">{t('home-subtitle')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Hero End */}
            <section className="relative md:pb-24 pb-16">
                <div className="container">
                    <div className="grid grid-cols-1 justify-center">
                        <div className="relative -mt-32">
                            <PropertySearch />
                        </div>
                    </div>
                </div>
                <About />
                <Feature />
                <Property />
                <ClientTwo />
                <GetInTuch />
            </section>
        </>
    )
}

export default Home
