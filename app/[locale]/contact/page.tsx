import React from 'react'

import Link from 'next/link'
import Image from 'next/image'

import Navbar from '@components/Layout/Navbar'

import { conatctDetails } from '@data/data'
import { FiHexagon } from 'react-icons/fi'
import { useTranslations } from 'next-intl'

const Contact = () => {
    const t = useTranslations()

    return (
        <>
            <Navbar />
            <div className="container-fluid relative mt-20">
                <div className="grid grid-cols-1">
                    <div className="w-full leading-[0] border-0">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.827911365735!2d36.848753375350285!3d-1.2766661356164641!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f16b47065c4bb%3A0xfae5e7e1346150e8!2sTenth%20St%2C%20Nairobi%2C%20Kenya!5e0!3m2!1sen!2sin!4v1736576850213!5m2!1sen!2sin"
                            className="w-full h-[500px]"
                            allowFullScreen
                            loading="lazy"
                        ></iframe>
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
                                    <h3 className="mb-6 text-2xl leading-normal font-medium">{t('get-in-touch')} !</h3>

                                    <form>
                                        <div className="grid lg:grid-cols-12 lg:gap-6">
                                            <div className="lg:col-span-6 mb-5">
                                                <label htmlFor="name" className="font-medium">
                                                    {t('firstName')}
                                                </label>
                                                <input
                                                    name="name"
                                                    id="name"
                                                    type="text"
                                                    className="form-input mt-2"
                                                    placeholder={t('firstName')}
                                                />
                                            </div>

                                            <div className="lg:col-span-6 mb-5">
                                                <label htmlFor="email" className="font-medium">
                                                    {t('your-email')}
                                                </label>
                                                <input
                                                    name="email"
                                                    id="email"
                                                    type="email"
                                                    className="form-input mt-2"
                                                    placeholder={t('your-email')}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1">
                                            <div className="mb-5">
                                                <label htmlFor="subject" className="font-medium">
                                                    {t('your-question')}
                                                </label>
                                                <input
                                                    name="subject"
                                                    id="subject"
                                                    className="form-input mt-2"
                                                    placeholder={t('subject')}
                                                />
                                            </div>

                                            <div className="mb-5">
                                                <label htmlFor="comments" className="font-medium">
                                                    {t('your-comment')}
                                                </label>
                                                <textarea
                                                    name="comments"
                                                    id="comments"
                                                    className="form-input mt-2 textarea"
                                                    placeholder={t('message')}
                                                ></textarea>
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            id="submit"
                                            name="send"
                                            className="btn bg-green-600 hover:bg-green-700 text-white rounded-md"
                                        >
                                            {t('send-message')}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container lg:mt-24 mt-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-[30px]">
                        {conatctDetails.map((item, index) => {
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
                                        <h5 className="title h5 text-xl font-medium">{item.title}</h5>
                                        <p className="text-slate-400 mt-3">{item.description}</p>

                                        <div className="mt-5">
                                            <Link
                                                href="tel:+254 746 661 538"
                                                className="btn btn-link text-green-600 hover:text-green-600 after:bg-green-600 transition duration-500"
                                            >
                                                {item.contact}
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
