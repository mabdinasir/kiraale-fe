import { toast } from 'react-hot-toast'

const showToast = (type: 'success' | 'error', message: string, duration: number = 20) => {
    toast[type](message, {
        duration: duration * 1000,
        style: {
            background: type === 'success' ? '#16a34a' : '#ef4444',
            color: '#fff',
        },
        iconTheme: {
            primary: '#fff',
            secondary: type === 'success' ? '#16a34a' : '#ef4444',
        },
    })
}

export default showToast
