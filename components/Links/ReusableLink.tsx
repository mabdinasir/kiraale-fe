'use client' // This is a client component 👈🏽

import React, { ReactNode } from 'react'
import Link, { LinkProps } from 'next/link'
import { useParams } from 'next/navigation'

interface ReusableLinkProps extends LinkProps {
    href: string
    title?: string
    children?: ReactNode
    className?: string
}

const ReusableLink: React.FC<ReusableLinkProps> = ({ href, title, children, className }) => {
    const { locale } = useParams()

    return (
        <Link href={`/${locale}${href}`} className={className}>
            {children || title}
        </Link>
    )
}

export default ReusableLink
