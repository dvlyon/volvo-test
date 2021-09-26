import { StateMachineProvider, createStore } from 'little-state-machine'
import { BrowserRouter } from 'react-router-dom'

import Layout from './components/Layout'
import Router from './components/Router'
import { mainStore } from './stores/mainStore'
import { uiStore } from './stores/uiStore'

createStore({
  mainStore,
  uiStore,
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
