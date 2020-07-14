import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import Task from "../Task/Task";
import { ITask } from "../../models/ITask";
import CreateTask from "../CreateTask/CreateTask";
import EditTask from "../EditTask/EditTask";
import "./TasksList.css";
import DeleteTask from "../DeleteTask/DeleteTask";
import ViewTask from "../ViewTask/ViewTask";
import { Redirect } from "react-router-dom";
import { IsUserLoggedContext } from "../../contexts/IsUserLoggedContext";

const TasksList: React.FC = () => {
  const { isUserLogged } = useContext(IsUserLoggedContext);
  const [tasks, setTasks] = useState<ITask["task"][] | []>([]);
  const [taskFormFlag, setTaskFormFlag] = useState<boolean>(false);
  const [editFlag, setEditFlag] = useState<boolean>(false);
  const [viewTaskFlag, setViewTaskFlag] = useState<boolean>(false);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [singleTaskData, setSingleTaskData] = useState<ITask["task"]>({
    date: "",
    name: "",
    phone: "",
    email: "",
    description: "",
    _id: "",
  });

  const getTasks = () => {
    const { id, token } = JSON.parse(localStorage.userInfo);

    axios({
      method: "get",
      url: `/tasks/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setTasks(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (isUserLogged) {
      getTasks();
    }

  }, [isUserLogged]);

  if (!isUserLogged) return <Redirect to="/" />;

  const reversedTasks: ITask["task"][] | [] = [...tasks].reverse();

  const deleteTask = (singleTask: ITask["task"]) => {
    const { token } = JSON.parse(localStorage.userInfo);

    axios({
      method: "delete",
      url: `/tasks/${singleTask._id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          let newTasks = tasks.filter((t) => t._id !== singleTask._id);
          setTasks(newTasks);
          setDeleteFlag(false);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="TasksList">
      <div className="TasksList_searchBar">
        <h3>ניהול משימות</h3>
        <input type="text" />
      </div>

      <h4 className="TasksList_cxNumbers">
        ({tasks.length}) רשימת הלקוחות שלך
      </h4>

      <button
        className="TasksList_newTaskBtn"
        onClick={() => setTaskFormFlag(!taskFormFlag)}
      >
        משימה חדשה
      </button>

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

      {deleteFlag ? (
        <DeleteTask
          deleteTask={deleteTask}
          setDeleteFlag={setDeleteFlag}
          singleTaskData={singleTaskData}
        />
      ) : null}
      {viewTaskFlag ? (
        <ViewTask
          setViewTaskFlag={setViewTaskFlag}
          singleTaskData={singleTaskData}
        />
      ) : null}

      <Table className="TasksList_table">
        <thead>
          <tr>
            <th>
              <span className="checkBox_tableCell">
                <input type="checkbox" />
                <span>שם משתמש </span>
                <i className="fas fa-sort"></i>
              </span>
            </th>
            <th>טלפון</th>
            <th>מייל</th>
            <th>
              תאריך יצירת המשימה<i className="fas fa-sort"></i>
            </th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {(reversedTasks as Array<ITask["task"]>).map(
            (task: ITask["task"]) => {
              return (
                <Task
                  setViewTaskFlag={setViewTaskFlag}
                  setDeleteFlag={setDeleteFlag}
                  setSingleTaskData={setSingleTaskData}
                  setEditFlag={setEditFlag}
                  task={task}
                  key={task._id}
                />
              );
            }
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default TasksList;
