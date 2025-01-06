import { combineReducers } from '@reduxjs/toolkit'
import { todosApi } from './api/todos'

const rootReducer = combineReducers({
  [todosApi.reducerPath]: todosApi.reducer,
})

export default rootReducer
