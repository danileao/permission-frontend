import { Route, Switch } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import List from "../pages/List";
import Login from "../pages/Login";
import Product from "../pages/Product";
import PrivateRoutes from "./PrivateRoutes";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <PrivateRoutes path="/dashboard" component={Dashboard} />
      <PrivateRoutes path="/product" component={Product} role="ROLE_ADMIN" />
      <PrivateRoutes
        path="/list"
        component={List}
        role="ROLE_ADMIN,ROLE_USER"
      />
    </Switch>
  );
};

export default Routes;
