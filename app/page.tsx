import Todos from '@components/Examples/Todos'
import StoreProvider from './StoreProvider'

const Home = () => (
  <div className="text-center">
    <StoreProvider>
      <Todos />
    </StoreProvider>
  </div>
)

export default Home
