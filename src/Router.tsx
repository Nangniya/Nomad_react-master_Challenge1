import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/Nomad_react-master_Challenge1/:coinId">
          <Coin />
        </Route>
        <Route path="/Nomad_react-master_Challenge1">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
