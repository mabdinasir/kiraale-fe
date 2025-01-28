import React from 'react'
import LoadingIndicator from '@components/UI/LoadingIndicator'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string
    isLoading?: boolean
    disabled?: boolean
    className?: string
    redVariant?: boolean
}

const Button: React.FC<Props> = ({ onClick, isLoading, title, disabled = false, className = '', redVariant }) => (
    <button
        type="submit"
        onClick={onClick}
        className={
            className ||
            `btn w-full rounded-md text-white ${
                isLoading || disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
            }`
        }
        disabled={isLoading || disabled}
    >
        {isLoading ? (
            <div className="flex items-center justify-center">
                <LoadingIndicator redVariant={redVariant} />
                <span className="ml-2">{title}</span>
            </div>
        ) : (
            title
        )}
    </button>
)

export default Button
