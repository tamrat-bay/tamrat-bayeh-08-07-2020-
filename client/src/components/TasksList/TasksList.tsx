import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TasksList.css";
import { Table } from "react-bootstrap";
import Task from "../Task/Task";
import { ITask } from "../../model/ITask";
import NewTask from "../NewTask/NewTask";

const TasksList: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[] | []>([]);
  const [newTaskFlag, setNewTaskFlag] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get("/tasks")
      .then((res) => {
        setTasks(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));

    return () => {};
  }, []);

  return (
    <div className="TasksList">
      <h1>TasksList</h1>

      <button onClick={() => setNewTaskFlag(!newTaskFlag)}>משימה חדשה</button>

       {
           newTaskFlag ? <NewTask setNewTaskFlag={setNewTaskFlag} /> : null
       }
      <Table bordered striped hover className="TasksList_table">
        <thead>
          <tr>
            <th>שם</th>
            <th>טלפון</th>
            <th>מייל</th>
            <th>תאריך יצירת המשימה</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {
          tasks.map((task: ITask["task"]) => {
            return <Task task={task} key={task._id} />;
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default TasksList;
