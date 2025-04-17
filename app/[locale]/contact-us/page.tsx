import React from 'react'

import Link from 'next/link'
import Image from 'next/image'

import { contactDetails } from '@data/data'
import { FiHexagon } from 'react-icons/fi'
import { useTranslations } from 'next-intl'
import ContactForm from './components/ContactForm'
import StoreProvider from '../StoreProvider'

const Contact = () => {
    const t = useTranslations()

    return (
        <>
            <div className="container-fluid relative mt-20">
                <div className="grid grid-cols-1">
                    <div className="w-full leading-[0] border-0">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.656214386988!2d45.31652737480073!3d2.0389624979551057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3d58f5b24e7d19d1%3A0xe17a0b1f7cc84d4a!2sMakka%20Al%20Mukarrama%20Rd%2C%20Mogadishu%2C%20Somalia!5e0!3m2!1sen!2sso!4v1713342048243!5m2!1sen!2sso"
                            className="w-full h-[500px]"
                            allowFullScreen
                            loading="lazy"
                        />
                    </div>
                </div>
            </div>
            <section className="relative lg:py-24 py-16">
                <div className="container">
                    <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
                        <div className="lg:col-span-7 md:col-span-6">
                            <Image
                                src="/images/svg/contact.svg"
                                alt=""
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </div>

                        <div className="lg:col-span-5 md:col-span-6">
                            <div className="lg:me-5">
                                <div className="bg-white dark:bg-slate-900 rounded-md shadow dark:shadow-gray-700 p-6">
                                    <h3 className="mb-6 text-2xl leading-normal font-medium">{t('get-in-touch')}!</h3>
                                    <StoreProvider key={'contact-form'}>
                                        <ContactForm />
                                    </StoreProvider>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container lg:mt-24 mt-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-[30px]">
                        {contactDetails.map((item, index) => {
                            const { Icon } = item
                            return (
                                <div className="text-center px-6" key={index}>
                                    <div className="relative overflow-hidden text-transparent -m-3">
                                        <FiHexagon className="h-32 w-32 fill-green-600/5 mx-auto" />
                                        <div className="absolute top-2/4 -translate-y-2/4 start-0 end-0 mx-auto text-green-600 rounded-xl transition-all duration-500 ease-in-out text-4xl flex align-middle justify-center items-center">
                                            <Icon width={30} height={30} />
                                        </div>
                                    </div>

                                    <div className="content mt-7">
                                        <h5 className="title h5 text-xl font-medium">{t(item.title)}</h5>
                                        <p className="text-slate-400 mt-3">{t(item.description)}</p>

                                        <div className="mt-5">
                                            <Link
                                                href="tel:+254 746 661 538"
                                                className="btn btn-link text-green-600 hover:text-green-600 after:bg-green-600 transition duration-500 inline-block"
                                            >
                                                {t(item.contact)}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Contact
