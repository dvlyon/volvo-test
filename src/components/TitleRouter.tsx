import { Switch, Route } from 'react-router-dom'

const TitleRouter = () => (
  <Switch>
    <Route path="/about">
      David Lyon's Test
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
