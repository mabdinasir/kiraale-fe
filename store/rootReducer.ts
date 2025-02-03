import { combineReducers } from '@reduxjs/toolkit'
import { todosApi } from './services/todos'
import { authApi } from './services/auth'
import tokenSlice from './slices/tokenSlice'
import { usersApi } from './services/users'
import { propertiesAPi } from './services/properties'

const rootReducer = combineReducers({
    [todosApi.reducerPath]: todosApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [propertiesAPi.reducerPath]: propertiesAPi.reducer,
    token: tokenSlice,
})

export default rootReducer
