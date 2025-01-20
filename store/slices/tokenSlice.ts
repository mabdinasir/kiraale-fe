import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

type TokenState = {
    value: string | null
}

const getInitialToken = (): string | null => {
    if (typeof window !== 'undefined') {
        // Access cookies only on the client side
        return Cookies.get('authToken') || null
    }
    return null
}

const initialState: TokenState = {
    value: getInitialToken(),
}

const tokenSlice = createSlice({
    name: 'authToken',
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<string>) {
            state.value = action.payload
            Cookies.set('authToken', action.payload, {
                secure: true,
                sameSite: 'strict',
                expires: 30,
            })
            window.location.href = '/'
        },
        clearToken(state) {
            state.value = null
            Cookies.remove('authToken')
        },
    },
})

export const { setToken, clearToken } = tokenSlice.actions

export default tokenSlice.reducer
