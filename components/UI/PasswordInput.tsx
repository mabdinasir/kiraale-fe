/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { FiEye, FiEyeOff, FiKey } from 'react-icons/fi'

type PasswordInputProps = {
    label: string
    name: string
    value: string
    placeholder?: string
    error?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const PasswordInput: React.FC<PasswordInputProps> = ({ label, name, value, placeholder, error, onChange }) => {
    const [isVisible, setIsVisible] = useState(false)

    return (
        <div>
            <label className="form-label font-medium">{label} :</label>
            <div className="form-icon relative mt-2">
                <FiKey className="w-4 h-4 absolute top-3 start-4" />
                <input
                    type={isVisible ? 'text' : 'password'}
                    className="form-input ps-12 w-full py-2 px-3 h-10 dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-green-600 dark:border-gray-700 dark:focus:border-green-600 focus:ring-0"
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
                <button
                    type="button"
                    className="absolute top-3 end-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    onClick={() => setIsVisible(!isVisible)}
                >
                    {isVisible ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    )
}

export default PasswordInput
