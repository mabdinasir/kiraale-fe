'use client' // This is a client component 👈🏽

import React, { ReactNode } from 'react'
import Link, { LinkProps } from 'next/link'
import { useParams } from 'next/navigation'

interface ReusableLinkProps extends LinkProps {
    href: string
    title?: string
    children?: ReactNode
    className?: string
    onClick?: () => void
}

const ReusableLink: React.FC<ReusableLinkProps> = ({ href, title, children, className, onClick }) => {
    const { locale } = useParams()

    return (
        <Link href={`/${locale}${href}`} className={className} onClick={onClick}>
            {children || title}
        </Link>
    )
}

export default ReusableLink
