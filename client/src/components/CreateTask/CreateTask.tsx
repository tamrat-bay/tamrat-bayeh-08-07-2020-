import React from "react";
import TaskForm from "../TaskForm/TaskForm";
import { ITask } from "../../models/ITask";
import { IAxiosInfo } from "../../models/IAxiosInfo";

interface ICreateTask {
  setTaskFormFlag: React.Dispatch<React.SetStateAction<boolean>>;
  setTasks: React.Dispatch<React.SetStateAction<ITask["task"][] | []>>;
  tasks: ITask["task"][] | [];
}

const CreateTask: React.FC<ICreateTask> = ({
  setTaskFormFlag,
  setTasks,
  tasks,
}) => {
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
    methodFunction: (newData: ITask["task"]) => {
      let newTasks: ITask["task"][] | [] = [...tasks, newData];
      setTasks(newTasks);
      setTaskFormFlag(false);
    },
  };

  return (
    <TaskForm
      axiosInfo={axiosInfo}
      initialValues={task}
      closeWindow={setTaskFormFlag}
    />
  );
};

export default CreateTask;
