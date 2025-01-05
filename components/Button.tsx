//create a button using tailwind
import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
