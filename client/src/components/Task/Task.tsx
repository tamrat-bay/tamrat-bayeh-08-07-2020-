import React from "react";
import { ITask } from "../../models/ITask";
import "./Task.css";

interface ISingleTask extends ITask {
  setEditFlag: React.Dispatch<React.SetStateAction<boolean>>;
  setViewTaskFlag: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteFlag: React.Dispatch<React.SetStateAction<boolean>>;
  setSingleTaskData: React.Dispatch<React.SetStateAction<ITask["task"]>>;
}

const Task: React.FC<ISingleTask> = ({
  task,
  setDeleteFlag,
  setEditFlag,
  setViewTaskFlag,
  setSingleTaskData,
}) => {
  let { date, name, email, phone } = task;

  const formatDateStr: (dateStr: string) => string = (dateStr) => {
    return dateStr.split("-").reverse().join("-");
  };

  date = formatDateStr(date);

  return (
    <>
      <tr>
        <td>
          <span className="checkBox_tableCell">
            <input type="checkbox" />
            {name}
          </span>
        </td>
        <td>{phone}</td>
        <td>{email}</td>
        <td>
          <i className="fas fa-check"></i>
          <span>{date}</span>
        </td>
        <td className="Task_actions">
          <button
            onClick={() => {
              setSingleTaskData(task);
              setViewTaskFlag(true);
            }}
          >
            <i className="fas fa-eye"></i>
            <p>צפייה</p>
          </button>
          <button
            onClick={() => {
              setSingleTaskData(task);
              setEditFlag(true);
            }}
          >
            <i className="fas fa-pencil-alt"></i>
            <p>עריכה</p>
          </button>
          <button
            onClick={() => {
              setSingleTaskData(task);
              setDeleteFlag(true);
            }}
          >
            <i className="far fa-trash-alt"></i>
            <p>מחיקה</p>
          </button>
        </td>
      </tr>
    </>
  );
};

export default Task;
