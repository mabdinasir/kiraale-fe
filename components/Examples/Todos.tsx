'use client'

import { useGetTodosQuery } from '@store/api/todos'

type Todo = {
  userId: number
  id: number
  title: string
  completed: boolean
}

const Todos = () => {
  const { data, isLoading } = useGetTodosQuery({})

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {data.slice(0, 5).map((todo: Todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default Todos
