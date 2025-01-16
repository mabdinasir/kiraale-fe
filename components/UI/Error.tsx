import React, { FC } from 'react'

type ErrorProps = {
    error: string
}

const Error: FC<ErrorProps> = ({ error }) => (
    <div className="text-red-500">{String(error).charAt(0).toUpperCase() + String(error).slice(1)}</div>
)

export default Error
