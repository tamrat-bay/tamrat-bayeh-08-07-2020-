import React from "react";
import axios from "axios";
import { ITask } from "../../models/ITask";
import "./DeleteTask.css";
import { useStore } from "../../contexts/storeContext";
import { useObserver } from "mobx-react";

interface IDeleteTask {
  setDeleteFlag: (value: React.SetStateAction<boolean>) => void;
  singleTaskData: ITask["task"];
}

const DeleteTask: React.FC<IDeleteTask> = ({
  singleTaskData,
  setDeleteFlag,
}) => {
  const stateStore = useStore();

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
          stateStore.removeTask(singleTask._id);
          setDeleteFlag(false);
        }
      })
      .catch((err) => console.log(err));
  };

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
