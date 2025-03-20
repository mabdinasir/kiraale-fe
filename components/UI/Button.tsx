import React from 'react'
import LoadingIndicator from '@components/UI/LoadingIndicator'
import clsx from 'clsx'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string
    isLoading?: boolean
    disabled?: boolean
    className?: string
    redVariant?: boolean
    icon?: React.ReactNode
    fullWidth?: boolean
}

const Button: React.FC<Props> = ({
    onClick,
    isLoading,
    title,
    disabled = false,
    className = '',
    redVariant,
    icon,
    fullWidth,
}) => (
    <button
        type="submit"
        onClick={onClick}
        className={clsx(
            'btn rounded-md text-white',
            {
                'bg-gray-400 cursor-not-allowed': isLoading || disabled,
                'bg-green-600 hover:bg-green-700': !redVariant && !(isLoading || disabled),
                'bg-red-600 hover:bg-red-700': redVariant,
                'w-full': fullWidth,
            },
            className,
        )}
        disabled={isLoading || disabled}
    >
        <div className="flex items-center w-full">
            {isLoading && <LoadingIndicator redVariant={redVariant} smallVariant />}
            {icon && !isLoading && <span className="mr-1">{icon}</span>}
            {title}
        </div>
    </button>
)

export default Button
