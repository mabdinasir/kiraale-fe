import { ReactNode } from 'react'

interface EmptyStateProps {
    icon: ReactNode
    title: string
    description: string
}

const EmptyState = ({ icon, title, description }: EmptyStateProps) => (
    <div className="lg:col-span-8 md:col-span-6 flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-semibold text-red-600">{title}</h2>
        <div className="flex items-center justify-center w-48 h-48 bg-red-200 rounded-full m-6 text-4xl text-red-600">
            {icon}
        </div>
        <p className="mt-2 text-red-400 text-center w-4/5">{description}</p>
    </div>
)

export default EmptyState
