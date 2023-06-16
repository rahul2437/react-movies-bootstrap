import "./App.css";
import Menu from "./Menu";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import routes from "./route-config";
import configureValidations from "./Validations";

configureValidations();

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <div style={{ marginBottom: "50px" }} className="container">
        <Switch>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} exact={route.exact}>
              <route.component />
            </Route>
          ))}
        </Switch>
      </div>
      <footer
        style={{
          zIndex: 4,
        }}
        className="bd-footer py-5 mt-5 bg-dark"
      >
        <div className="container text-center fw-bold text-white">
          React Movies App &copy; {new Date().getFullYear().toString()}
        </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;
