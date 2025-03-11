'use client' // This is a client component 👈🏽

import React from 'react'
import { MdOutlineClose } from 'react-icons/md'

interface ModalProps {
    children: React.ReactNode
    onClose: () => void
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full relative">
            <button onClick={onClose} className="absolute top-2 right-2 text-red-600 hover:text-red-800">
                <MdOutlineClose className="h-6 w-6" />
            </button>
            {children}
        </div>
    </div>
)

export default Modal
