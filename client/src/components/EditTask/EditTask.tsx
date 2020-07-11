import React from "react";
import TaskForm from "../TaskForm/TaskForm";
import { ITask } from "../../models/ITask";
import { IAxiosInfo } from "../../models/IAxiosInfo";

interface IEditTask {
  setEditFlag: React.Dispatch<React.SetStateAction<boolean>>;
  setTasks: React.Dispatch<React.SetStateAction<ITask["task"][] | []>>;
  tasks: ITask["task"][] | [];
  task: ITask["task"];
}

const EditTask: React.FC<IEditTask> = ({
  setEditFlag,
  setTasks,
  tasks,
  task,
}) => {
  const axiosInfo: IAxiosInfo = {
    method: "put",
    url: "/tasks",
    methodFunction: (newData: ITask["task"]) => {
      let temp: ITask["task"][] = [...tasks];
      const index: number = temp.findIndex((t) => t._id === task._id);
      temp[index] = { ...newData };
      setTasks(temp);
      setEditFlag(false);
    },
  };

  return (
    <TaskForm
      axiosInfo={axiosInfo}
      initialValues={task}
      closeWindow={setEditFlag}
    />
  );
};

export default EditTask;
