import Todos from '@components/Todos'
import StoreProvider from './StoreProvider'

const Home = () => (
  <div className="text-center">
    <StoreProvider>
      <Todos />
    </StoreProvider>
  </div>
)

export default Home
