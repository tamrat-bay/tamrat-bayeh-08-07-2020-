import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TasksList.css";
import { Table } from "react-bootstrap";
import Task from "../Task/Task";
import { ITask } from "../../model/ITask";
import CreateTask from "../CreateTask/CreateTask";
import EditTask from "../EditTask/EditTask";

const TasksList: React.FC = () => {
  const [tasks, setTasks] = useState<ITask["task"][] | []>([]);
  const [taskFormFlag, setTaskFormFlag] = useState<boolean>(false);
  const [editFlag, setEditFlag] = useState<boolean>(false);
  const [singleTaskData, setSingleTaskData] = useState<ITask["task"]>({
    date: "",
    name: "",
    phone: "",
    email: "",
    description: "",
    _id: "",
  });

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

      <button onClick={() => setTaskFormFlag(!taskFormFlag)}>משימה חדשה</button>

      {taskFormFlag ? (
        <CreateTask
          setTasks={setTasks}
          tasks={tasks}
          setTaskFormFlag={setTaskFormFlag}
        />
      ) : null}

      {editFlag ? (
        <EditTask
          setEditFlag={setEditFlag}
          setTasks={setTasks}
          tasks={tasks}
          task={singleTaskData}
        />
      ) : null}

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
          {(tasks as Array<ITask["task"]>).map((task: ITask["task"]) => {
            return (
              <Task
                setSingleTaskData={setSingleTaskData}
                editFlag={editFlag}
                setEditFlag={setEditFlag}
                task={task}
                key={task._id}
                setTasks={setTasks}
                tasks={tasks}
              />
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default TasksList;
