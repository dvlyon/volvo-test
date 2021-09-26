import { StateMachineProvider, createStore } from 'little-state-machine'
import { BrowserRouter } from 'react-router-dom'

import Layout from './components/Layout'
import Router from './components/Router'
import { mainStore } from './stores/mainStore'

createStore({
  mainStore,
})

const App = () => (
  <StateMachineProvider>
    <BrowserRouter>
      <Layout>
        <Router />
      </Layout>
    </BrowserRouter>
  </StateMachineProvider>
)

export default App
