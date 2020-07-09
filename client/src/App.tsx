import React from 'react';
import './App.css';
// import Header from './components/Header/Header';
import TasksList from './components/TasksList/TasksList';

const App: React.FC = () => {
  return (
    <div className="App">
      {/* <Header buttonText='Button' /> */}
      <TasksList />
    </div>
  );
}

export default App;
