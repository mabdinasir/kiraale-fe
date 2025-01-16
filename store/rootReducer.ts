import { combineReducers } from '@reduxjs/toolkit'
import { todosApi } from './services/todos'
import { authApi } from './services/auth'

const rootReducer = combineReducers({
    [todosApi.reducerPath]: todosApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
})

export default rootReducer
