import { authApi } from './services/auth'
import { todosApi } from './services/todos'

const middlewareArray = [todosApi.middleware, authApi.middleware]

export default middlewareArray
