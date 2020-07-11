import React from "react";
import { ITask } from "../../models/ITask";
import "./DeleteTask.css";

interface IDeleteTask {
  deleteTask: (singleTask: ITask["task"]) => void;
  setDeleteFlag: (value: React.SetStateAction<boolean>) => void;
  singleTaskData: ITask["task"];
}

const DeleteTask: React.FC<IDeleteTask> = ({
  deleteTask,
  singleTaskData,
  setDeleteFlag,
}) => {
  return (
    <div className="DeleteTask">
      <h2>לחיצה על אישור תמחק את המשימה</h2>
      <div className="DeleteTask_buttons">
      <button onClick={() => deleteTask(singleTaskData)}>אישור</button>
      <button onClick={() => setDeleteFlag(false)}>ביטול</button>
      </div>
    </div>
  );
};

export default DeleteTask;
