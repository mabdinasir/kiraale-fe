import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

const NotFound = () => {
    const t = useTranslations()

    return (
        <section className="relative bg-green-600/5">
            <div className="container-fluid relative">
                <div className="grid grid-cols-1">
                    <div className="flex flex-col min-h-screen justify-center md:px-10 py-10 px-4">
                        <div className="text-center">
                            <Link href="/">
                                <Image
                                    src="/images/logo-icon-64.png"
                                    className="mx-auto"
                                    alt=""
                                    width={64}
                                    height={64}
                                />
                            </Link>
                        </div>
                        <div className="title-heading text-center my-auto">
                            <Image src="/images/error.png" width={200} height={200} className="mx-auto" alt="" />
                            <h1 className="mt-3 mb-6 md:text-4xl text-3xl font-bold">{t('not-found.title')}</h1>
                            <p className="text-slate-400">
                                {t('not-found.description1')}
                                <br /> {t('not-found.description2')}
                            </p>

                            <div className="mt-4">
                                <Link
                                    href="/"
                                    className="btn bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700 text-white rounded-md"
                                >
                                    {t('not-found.back-home')}
                                </Link>
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="mb-0 text-slate-400">
                                ©{new Date().getFullYear()} {t('developed-by')}{' '}
                                <Link
                                    href="https://btj.so/"
                                    target="_blank"
                                    className="text-reset text-green-600 hover:text-green-700 duration-500 ease-in-out lightbox"
                                >
                                    BTJ Software.
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NotFound
