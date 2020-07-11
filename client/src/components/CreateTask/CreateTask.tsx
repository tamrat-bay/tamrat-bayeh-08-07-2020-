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

  const axiosInfo: IAxiosInfo = {
    method: "post",
    url: "/tasks",
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
