import React from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import TasksList from "./components/TasksList/TasksList";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="container-fluid">
          <Switch>
            <Route exact path="/" component={TasksList} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
