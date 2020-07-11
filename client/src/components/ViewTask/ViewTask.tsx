import React from "react";
import { ITask } from "../../models/ITask";
import "./ViewTask.css";

interface IViewTask {
  setViewTaskFlag: React.Dispatch<React.SetStateAction<boolean>>;
  singleTaskData: ITask["task"];
}

const ViewTask: React.FC<IViewTask> = ({ singleTaskData, setViewTaskFlag }) => {
  const { name, description } = singleTaskData;
  return (
    <div className="ViewTask">
      <h3>שלום {name}</h3>
      <h5>המשימה שלך</h5>
      <p>{description}</p>
      <button onClick={() => setViewTaskFlag(false)}>יציאה</button>
    </div>
  );
};

export default ViewTask;
