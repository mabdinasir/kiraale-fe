'use client' // This is a client component 👈🏽

import React, { FC, useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { FaChevronDown } from 'react-icons/fa'

type AccordionProps = {
    accordionData?: {
        title: string
        content: string
    }[]
    collapsibleComponent?: React.ReactNode
    componentTitle?: string
    icon?: React.ReactNode
    isResponsive?: boolean
    isDesktop?: boolean
}

const Accordion: FC<AccordionProps> = ({
    accordionData,
    collapsibleComponent,
    componentTitle,
    icon,
    isResponsive = false,
    isDesktop = false,
}) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0)
    const [isComponentOpen, setIsComponentOpen] = useState(isResponsive ? isDesktop : false)
    const t = useTranslations()

    useEffect(() => {
        if (isResponsive) {
            setIsComponentOpen(isDesktop)
        }
    }, [isDesktop, isResponsive])

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
                            {activeIndex === index ? (
                                <FaChevronDown size={16} className="rotate-180" />
                            ) : (
                                <FaChevronDown size={16} />
                            )}
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
                            className={`flex justify-between items-center-safe p-5 w-full font-medium text-left ${isComponentOpen ? 'bg-gray-50 dark:bg-slate-800 text-green-600' : ''}`}
                        >
                            <h1 className="font-bold">{componentTitle}</h1>
                            <span className="mr-2">{icon}</span>
                        </button>
                    </h2>
                    {isComponentOpen && <div className="p-1">{collapsibleComponent}</div>}
                </div>
            )}
        </div>
    )
}

export default Accordion
