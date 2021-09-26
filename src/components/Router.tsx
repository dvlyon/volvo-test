import { Switch, Route } from 'react-router-dom'

import About from '../pages/About'
import Dashboard from '../pages/Dashboard'
import Equipments from '../pages/Equipments'
import Vehicles from '../pages/Vehicles'

const Router = () => (
  <Switch>
    <Route path="/about">
      <About />
    </Route>
    <Route path="/equipments">
      <Equipments />
    </Route>
    <Route path="/vehicles">
      <Vehicles />
    </Route>
    <Route path="/">
      <Dashboard />
    </Route>
  </Switch>
)

export default Router
