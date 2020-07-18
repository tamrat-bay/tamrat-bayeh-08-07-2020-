import React from "react";
import TaskForm from "../TaskForm/TaskForm";
import { ITask } from "../../models/ITask";
import { IAxiosInfo } from "../../models/IAxiosInfo";
import { useStore } from "../../contexts/storeContext";
import { useObserver } from "mobx-react";

interface IEditTask {
  setEditFlag: React.Dispatch<React.SetStateAction<boolean>>;

  task: ITask["task"];
}

const EditTask: React.FC<IEditTask> = ({
  setEditFlag,
  task,
}) => {
  const stateStore = useStore()
  const { token } = JSON.parse(localStorage.userInfo);

  const axiosInfo: IAxiosInfo = {
    method: "put",
    url: `/tasks/${task._id}`,
    token: `Bearer ${token}`,
    methodFunction: (newData: ITask["task"]) => {
      stateStore.editTask(task._id,newData)
      setEditFlag(false);
    },
  };

  return useObserver(() =>
    <TaskForm
      axiosInfo={axiosInfo}
      initialValues={task}
      closeWindow={setEditFlag}
    />
  );
};

export default EditTask;
