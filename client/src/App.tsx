import React from "react";
import "./App.css";
// import Header from './components/Header/Header';
import TasksList from "./components/TasksList/TasksList";
import { Container } from "react-bootstrap";

const App: React.FC = () => {
  return (
    <div className="App">
      {/* <Header buttonText='Button' /> */}
      <Container>
        <TasksList />
      </Container>
    </div>
  );
};

export default App;
