import React from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import TasksList from "./components/TasksList/TasksList";

const App: React.FC = () => {
  return (
    <div className="App">
      <NavBar />
      <div className="container-fluid">
        <TasksList />
      </div>
    </div>
  );
};

export default App;
