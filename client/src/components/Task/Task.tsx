import React, { useState } from "react";
import axios from "axios";
import { ITask } from "../../model/ITask";
import "./Task.css";

interface ISingleTask extends ITask {
  editFlag: boolean;
  setEditFlag: React.Dispatch<React.SetStateAction<boolean>>;
  tasks: ITask["task"][] | [];
  setTasks: React.Dispatch<
    React.SetStateAction<
      | {
          date: string;
          name: string;
          phone: string;
          email: string;
          description: string;
          _id: string;
          _v?: number | undefined;
        }[]
      | []
    >
  >;
  setSingleTaskData: React.Dispatch<React.SetStateAction<{
    date: string;
    name: string;
    phone: string;
    email: string;
    description: string;
    _id: string;
    _v?: number | undefined;
} >>
}

const Task: React.FC<ISingleTask> = ({
  task,
  tasks,
  setTasks,
  editFlag,
  setEditFlag,
  setSingleTaskData
}) => {
  const [deleteFlag, setDeleteFlag] = useState(false);
  // console.log("Task prop", task);
  const { date, name, phone, email, _id, description } = task;

  const deleteTask = () => {
    axios
      .delete(`/tasks/${_id}`)
      .then((res) => {
        if (res.status === 200) {
          console.log("Task was deleted");
          let newTasks = tasks.filter((t) => t._id !== _id);
          setTasks(newTasks);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {deleteFlag ? (
        <span className="Task_delete">
          <h2>לחיצה על אישור תמחק את המשימה</h2>
          <button onClick={() => deleteTask()}>אישור</button>
          <button onClick={() => setDeleteFlag(false)}>ביטול</button>
        </span>
      ) : null}


      <tr>
        <td>{name}</td>
        <td>{phone}</td>
        <td>{email}</td>
        <td>{date}</td>
        <td>
          <button>More</button>
          <button onClick={() => {setSingleTaskData(task); setEditFlag(true)}}>Edit</button>
          <button onClick={() => setDeleteFlag(true)}> Delete</button>
        </td>
      </tr>
    </>
  );
};

export default Task;
