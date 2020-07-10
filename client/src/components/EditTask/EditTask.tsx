import React from "react";
import TaskForm from "../TaskForm/TaskForm";
import { ITask } from '../../model/ITask'
import { IAxiosInfo } from '../../model/IAxiosInfo'

interface IEditTask {
    setEditFlag: React.Dispatch<React.SetStateAction<boolean>>;
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
  task:ITask["task"];
}

// interface IAxiosInfo {
//         method: string;
//         url: string;
//         methodFunction: (newData: ITask["task"]) => void;
// }
const EditTask: React.FC<IEditTask> = ({setEditFlag,setTasks,tasks,task}) => {
// console.log('edit',task);

  const axiosInfo: IAxiosInfo = {
    method: 'put',
    url: '/tasks',
    methodFunction: (newData:ITask["task"]) =>{
        let temp: ITask["task"][] = [...tasks];
        const index: number = temp.findIndex((t) => t._id === task._id);
        temp[index] = { ...newData };
        setTasks(temp);
        setEditFlag(false);
    }
};

  return (
    <TaskForm
      setTasks={setTasks}
      tasks={tasks}
      axiosInfo={axiosInfo}
      initialValues={task}
      closeWindow={setEditFlag}
    //   setEditFlag={setEditFlag}
    />
  );
};

export default EditTask;
