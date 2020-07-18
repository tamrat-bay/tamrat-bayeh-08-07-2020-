import React from "react";
import TaskForm from "../TaskForm/TaskForm";
import { ITask } from "../../models/ITask";
import { IAxiosInfo } from "../../models/IAxiosInfo";
import { useStore } from "../../contexts/storeContext";
import { useObserver } from "mobx-react";

interface ICreateTask {
  setTaskFormFlag: React.Dispatch<React.SetStateAction<boolean>>;

}

const CreateTask: React.FC<ICreateTask> = ({
  setTaskFormFlag,
}) => {
  const stateStore = useStore();
  
  const task: ITask["task"] = {
    name: "",
    phone: "",
    email: "",
    date: "",
    description: "",
    _id: "",
  };

  const { id, token } = JSON.parse(localStorage.userInfo);

  const axiosInfo: IAxiosInfo = {
    method: "post",
    url: `/tasks/${id}`,
    token:`Bearer ${token}`,
    methodFunction: (newTask: ITask["task"]) => {
      stateStore.addTask(newTask);
      setTaskFormFlag(false);
    },
  };

  return useObserver(() =>
    <TaskForm
      axiosInfo={axiosInfo}
      initialValues={task}
      closeWindow={setTaskFormFlag}
    />
  );
};

export default CreateTask;
