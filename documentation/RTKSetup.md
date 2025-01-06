# Documentation for Redux Store Setup with RTK Query

This documentation provides a step-by-step overview of the Redux setup, including the store configuration, middleware integration, and the implementation of a React component utilizing the store and RTK Query for fetching data.

## File Structure

```
├── store
│   ├── store.ts
│   ├── rootReducer.ts
│   ├── middleWareArray.ts
│   └── api
│       └── todos.ts
├── components
│   ├── Todos.tsx
├── app
│   ├── StoreProvider.tsx
│   └── page.tsx(Home)
```

---

## 1. Store Configuration

### `store/store.ts`

This file defines the Redux store using `@reduxjs/toolkit`.

```typescript
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import middlewareArray from './middleWareArray'

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewareArray),
  })

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
```

- **`configureStore`**: Sets up the store with the root reducer and middleware.
- **`makeStore`**: Factory function to create the store.
- **Type Definitions**:
  - `AppStore`: Type for the store instance.
  - `RootState`: Type for the root state.
  - `AppDispatch`: Type for the store dispatch.

### `store/rootReducer.ts`

This file combines all reducers for the application.

```typescript
import { combineReducers } from '@reduxjs/toolkit'
import { todosApi } from './api/todos'

const rootReducer = combineReducers({
  [todosApi.reducerPath]: todosApi.reducer,
})

export default rootReducer
```

- **`combineReducers`**: Merges all individual reducers into a single root reducer.
- **`todosApi.reducerPath`**: Adds the RTK Query reducer for managing API state.

### `store/middleWareArray.ts`

This file defines additional middleware for the Redux store.

```typescript
import { todosApi } from './api/todos'

const middlewareArray = [todosApi.middleware]

export default middlewareArray
```

- **Custom Middleware**: Includes `todosApi.middleware` for handling RTK Query API calls.

---

## 2. Store Provider

### `StoreProvider.tsx`

This component wraps the application with a Redux `Provider` to pass the store to the React component tree.

```typescript
'use client';
import { FC, useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@store/store';

type Props = {
  children: React.ReactNode;
};

const StoreProvider: FC<Props> = ({ children }) => {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
```

- **`useRef`**: Ensures the store instance is only created once.
- **`Provider`**: Connects the React component tree to the Redux store.

---

## 3. Todos Component

### `components/Todos.tsx`

This component fetches and displays a list of todos using RTK Query.

```typescript
'use client';
import { useGetTodosQuery } from '@store/api/todos';

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const Todos = () => {
  const { data, isLoading } = useGetTodosQuery({});

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {data.slice(0, 5).map((todo: Todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
```

- **`useGetTodosQuery`**: RTK Query hook to fetch todos.
- **`data.slice(0, 5)`**: Limits the displayed todos to the first 5 items.
- **Loading State**: Displays a loading message while data is being fetched.

---

## 4. Home Component

### `page.tsx`

This is the entry point of the application that integrates the `StoreProvider` and `Todos` components.

```typescript
import Todos from '@components/Todos';
import StoreProvider from './StoreProvider';

const Home = () => (
  <div className="text-center">
    <StoreProvider>
      <Todos />
    </StoreProvider>
  </div>
);

export default Home;
```

- **`StoreProvider`**: Wraps the application to provide access to the Redux store.
- **`Todos`**: Fetches and displays the todos.

---

## 5. Summary

This setup demonstrates a scalable approach to managing state in a React application using Redux Toolkit and RTK Query. It:

1. Configures the Redux store with a modular structure.
2. Integrates RTK Query for data fetching.
3. Uses the `Provider` component to make the store available to React components.
4. Implements reusable components for displaying data.

This structure can be extended with additional reducers, middleware, and components as the application grows.
