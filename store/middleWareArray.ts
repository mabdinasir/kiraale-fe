import { authApi } from './services/auth'
import { todosApi } from './services/todos'
import { usersApi } from './services/users'

const middlewareArray = [todosApi.middleware, authApi.middleware, usersApi.middleware]

export default middlewareArray
