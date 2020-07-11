import React from "react";
import "./App.css";
import NavBar from './components/NavBar/NavBar';
import TasksList from "./components/TasksList/TasksList";
import { Container } from "react-bootstrap";

const App: React.FC = () => {
  return (
    <div className="App">
      <NavBar />
      <Container>
        <TasksList />
      </Container>
    </div>
  );
};

export default App;
