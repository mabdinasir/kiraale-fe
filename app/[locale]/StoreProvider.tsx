'use client'
import { FC, useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '@store/store'

type Props = {
    children: React.ReactNode
}

const StoreProvider: FC<Props> = ({ children }) => {
    const storeRef = useRef<AppStore>(undefined)
    if (!storeRef.current) {
        storeRef.current = makeStore()
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}

export default StoreProvider
