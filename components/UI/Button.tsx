import React from 'react'
import LoadingIndicator from '@components/UI/LoadingIndicator'
import clsx from 'clsx'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string
    isLoading?: boolean
    disabled?: boolean
    className?: string
    variant?: 'red' | 'blue' | 'green'
    icon?: React.ReactNode
    fullWidth?: boolean
}

const Button: React.FC<Props> = ({
    onClick,
    isLoading,
    title,
    disabled = false,
    className = '',
    variant = 'green',
    icon,
    fullWidth,
}) => (
    <button
        type="submit"
        onClick={onClick}
        className={clsx(
            'btn rounded-md text-white flex items-center justify-center',
            {
                'bg-gray-400 cursor-not-allowed': isLoading || disabled,
                'bg-green-600 hover:bg-green-700': variant === 'green' && !(isLoading || disabled),
                'bg-red-600 hover:bg-red-700': variant === 'red' && !(isLoading || disabled),
                'bg-blue-600 hover:bg-blue-700': variant === 'blue' && !(isLoading || disabled),
                'w-full': fullWidth,
                'min-w-[120px]': isLoading,
            },
            className,
        )}
        disabled={isLoading || disabled}
    >
        {isLoading ? (
            <>
                <LoadingIndicator redVariant={variant === 'red'} smallVariant />
                {title}
            </>
        ) : (
            <>
                {icon && <span className="mr-1">{icon}</span>}
                {title}
            </>
        )}
    </button>
)

export default Button
