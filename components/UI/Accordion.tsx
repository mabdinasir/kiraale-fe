'use client' // This is a client component 👈🏽

import React, { FC, useState } from 'react'
import { useTranslations } from 'next-intl'

type AccordionProps = {
    accordionData?: {
        title: string
        content: string
    }[]
    collapsibleComponent?: React.ReactNode
    defaultComponentActive?: boolean
    componentTitle?: string
    icon?: React.ReactNode
}

const Accordion: FC<AccordionProps> = ({
    accordionData,
    collapsibleComponent,
    defaultComponentActive = false,
    componentTitle,
    icon,
}) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0)
    const [isComponentOpen, setIsComponentOpen] = useState(defaultComponentActive)
    const t = useTranslations()

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index)
        // Close the component when opening an accordion item
        if (activeIndex !== index) {
            setIsComponentOpen(false)
        }
    }

    const toggleComponent = () => {
        setIsComponentOpen(!isComponentOpen)
        // Close any open accordion items when opening the component
        if (!isComponentOpen) {
            setActiveIndex(null)
        }
    }

    return (
        <div id="accordion-collapse" data-accordion="collapse">
            {accordionData?.map((section, index) => (
                <div key={index} className="relative shadow dark:shadow-gray-700 rounded-md overflow-hidden mt-4">
                    <h2 className="text-base font-medium" id={`accordion-collapse-heading-${index}`}>
                        <button
                            type="button"
                            onClick={() => toggleAccordion(index)}
                            className={`flex justify-between items-center p-5 w-full font-medium text-left ${
                                activeIndex === index ? 'bg-gray-50 dark:bg-slate-800 text-green-600' : ''
                            }`}
                        >
                            <span>{t(section.title)}</span>
                            <svg
                                className={`w-4 h-4 transform ${activeIndex === index ? 'rotate-180' : ''}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </h2>
                    {activeIndex === index && (
                        <div
                            id={`accordion-collapse-body-${index}`}
                            aria-labelledby={`accordion-collapse-heading-${index}`}
                        >
                            <div className="p-5">
                                <p className="text-slate-400 dark:text-gray-400">{t(section.content)}</p>
                            </div>
                        </div>
                    )}
                </div>
            ))}

            {/* New collapsible component section */}
            {collapsibleComponent && (
                <div className="shadow dark:shadow-gray-700 rounded-md overflow-hidden">
                    <h2 className="text-base font-medium">
                        <button
                            type="button"
                            onClick={toggleComponent}
                            className={`flex justify-between items-center p-5 w-full font-medium text-left ${
                                isComponentOpen ? 'bg-gray-50 dark:bg-slate-800 text-green-600' : ''
                            }`}
                        >
                            <span>{componentTitle}</span>
                            {icon ? (
                                <span className="mr-2">{icon}</span>
                            ) : (
                                <svg
                                    className={`w-4 h-4 transform ${isComponentOpen ? 'rotate-180' : ''}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            )}
                        </button>
                    </h2>
                    {isComponentOpen && <div className="p-1">{collapsibleComponent}</div>}
                </div>
            )}
        </div>
    )
}

export default Accordion
