import { Switch, Route } from 'react-router-dom'

import Info from '../pages/Info'
import Dashboard from '../pages/Dashboard'
import Equipments from '../pages/Equipments'
import Vehicles from '../pages/Vehicles'

const Router = () => (
  <Switch>
    <Route path="/info">
      <Info />
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
