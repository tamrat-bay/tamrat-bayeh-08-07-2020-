import { ITask } from '../models/ITask'
let tasks:ITask["task"][] | [] = [];

export function createStore(){
    return {
      tasks: tasks,
      isUserLogged:localStorage.getItem('userInfo') ? true : false,
      setIsUserLogged(){
          this.isUserLogged = !this.isUserLogged;
      },
      getTasks(tasks:ITask["task"][] | []){
        this.tasks = tasks
      },
      addTask(newTask:ITask["task"]){
        this.tasks = [...this.tasks , newTask]
      },
      editTask(id:string,newTask:ITask["task"]){
        const index: number = this.tasks.findIndex((task) => task._id === id);
        this.tasks[index] = { ...newTask };
      },
      removeTask(id:string){
        this.tasks = this.tasks.filter(task => task._id !== id )
      }
    }
    
  }