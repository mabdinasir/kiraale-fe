import React from 'react'
import LoadingIndicator from '@components/UI/LoadingIndicator'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading: boolean
    text: string
    disabled?: boolean
}

const Button: React.FC<Props> = ({ onClick, isLoading, text, disabled = false }) => (
    <button
        type="button"
        onClick={onClick}
        className={`btn w-full rounded-md text-white ${
            isLoading || disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
        }`}
        disabled={isLoading || disabled}
    >
        {isLoading ? (
            <div className="flex items-center justify-center">
                <LoadingIndicator />
                <span className="ml-2">{text}</span>
            </div>
        ) : (
            text
        )}
    </button>
)

export default Button
