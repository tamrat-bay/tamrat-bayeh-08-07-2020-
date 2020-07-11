import React from "react";
import TaskForm from "../TaskForm/TaskForm";
import { ITask } from '../../models/ITask'
import { IAxiosInfo } from '../../models/IAxiosInfo'

interface ICreateTask {
    setTaskFormFlag: React.Dispatch<React.SetStateAction<boolean>>;
    setTasks: React.Dispatch<
    React.SetStateAction<
      | {
          date: string;
          name: string;
          phone: string;
          email: string;
          description: string;
          _id: string;
          _v?: number | undefined;
        }[]
      | []
    >
  >;
  tasks: ITask["task"][] | [];
}

// interface IAxiosInfo {
//         method: string;
//         url: string;
//         methodFunction: (newData: ITask["task"]) => void;
// }
const CreateTask: React.FC<ICreateTask> = ({setTaskFormFlag,setTasks,tasks}) => {
  const task : ITask["task"] = {
    name: "",
    phone: "",
    email: "",
    date: "",
    description: "",
    _id:""
  };

  const axiosInfo: IAxiosInfo = {
    method: 'post',
    url: '/tasks',
    methodFunction: (newData:ITask["task"]) =>{
        let newTasks: ITask["task"][] | [] = [...tasks, newData];
        setTasks(newTasks);
        setTaskFormFlag(false);
    }
};

  return (
    <TaskForm
      setTasks={setTasks}
      tasks={tasks}
      axiosInfo={axiosInfo}
      initialValues={task}
      closeWindow={setTaskFormFlag}
    />
  );
};

export default CreateTask;
