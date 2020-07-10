import React from "react";
import { ITask } from "../../model/ITask";
import "./Task.css";

interface ISingleTask extends ITask {
  editFlag: boolean;
  setEditFlag: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteFlag: React.Dispatch<React.SetStateAction<boolean>>;
  setSingleTaskData: React.Dispatch<
    React.SetStateAction<{
      date: string;
      name: string;
      phone: string;
      email: string;
      description: string;
      _id: string;
      _v?: number | undefined;
    }>
  >;
}

const Task: React.FC<ISingleTask> = ({
  task,
  setDeleteFlag,
  setEditFlag,
  setSingleTaskData,
}) => {
  const { date, name, phone, email } = task;

  return (
    <>
      <tr>
        <td className="checkBox_tableCell">
          <input type="checkbox" />
          {name}
        </td>
        <td>{phone}</td>
        <td>{email}</td>
        <td>
          <i className="fas fa-check"></i>
          {date}
        </td>
        <td>
          <button>More</button>
          <button
            onClick={() => {
              setSingleTaskData(task);
              setEditFlag(true);
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              setSingleTaskData(task);
              setDeleteFlag(true);
            }}
          >
            {" "}
            Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default Task;
