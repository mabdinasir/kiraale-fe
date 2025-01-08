import React, { ReactNode } from 'react'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'

interface ReusableLinkProps extends LinkProps {
    href: string
    title?: string
    children?: ReactNode
    className?: string
}

const ReusableLink: React.FC<ReusableLinkProps> = ({ href, title, children, className }) => {
    const current = usePathname()
    const locale = current.split('/')[1]

    return (
        <Link href={`/${locale}${href}`} className={className}>
            {children || title}
        </Link>
    )
}

export default ReusableLink
