import { Switch, Route } from 'react-router-dom'

const TitleRouter = () => (
  <Switch>
    <Route path="/about">
      Information
    </Route>
    <Route path="/equipments">
      Equipments
    </Route>
    <Route path="/vehicles">
      Vehicles
    </Route>
    <Route path="/">
      Dashboard
    </Route>
  </Switch>
)

export default TitleRouter
