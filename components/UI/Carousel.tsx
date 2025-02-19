'use client' // This is a client component 👈🏽

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { useState, useEffect, useCallback } from 'react'

interface CarouselProps {
    images: {
        src: string
        alt: string
    }[]
    slideDuration?: number
    indicators?: boolean
    controls?: boolean
    className?: string
}

const Carousel = ({
    images,
    slideDuration = 700,
    indicators = true,
    controls = true,
    className = '',
}: CarouselProps) => {
    const t = useTranslations()
    const [currentSlide, setCurrentSlide] = useState(0)

    const goToPreviousSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    }

    const goToNextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }, [images.length])

    useEffect(() => {
        const interval = setInterval(goToNextSlide, 7000)
        return () => clearInterval(interval)
    }, [currentSlide, goToNextSlide])

    return (
        <div id="default-carousel" className={`relative w-full ${className} group`} data-carousel="slide">
            {/* Carousel wrapper */}
            <div className="relative h-96 md:h-[600px] overflow-hidden rounded-lg">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`duration-700 ease-in-out ${index === currentSlide ? 'block' : 'hidden'}`}
                        data-carousel-item
                        style={{ transitionDuration: `${slideDuration}ms` }}
                    >
                        <Image
                            src={image.src}
                            fill
                            className="absolute block w-full object-cover"
                            alt={image.alt}
                            priority={index === 0}
                        />
                    </div>
                ))}
            </div>

            {/* Slider indicators */}
            {indicators && (
                <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white/80' : 'bg-white/30'} hover:bg-white/50`}
                            aria-current={index === currentSlide ? 'true' : 'false'}
                            aria-label={`Slide ${index + 1}`}
                            onClick={() => setCurrentSlide(index)}
                        ></button>
                    ))}
                </div>
            )}

            {/* Slider controls */}
            {controls && (
                <>
                    <button
                        type="button"
                        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                        onClick={goToPreviousSlide}
                    >
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-green-600 group-focus:bg-green-600 group-active:bg-green-600 transition-colors duration-200">
                            <svg
                                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 1 1 5l4 4"
                                />
                            </svg>
                            <span className="sr-only">{t('previous')}</span>
                        </span>
                    </button>
                    <button
                        type="button"
                        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                        onClick={goToNextSlide}
                    >
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-green-600 group-focus:bg-green-600 group-active:bg-green-600 transition-colors duration-200">
                            <svg
                                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 6 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 9 4-4-4-4"
                                />
                            </svg>
                            <span className="sr-only">{t('next')}</span>
                        </span>
                    </button>
                </>
            )}
        </div>
    )
}

export default Carousel
