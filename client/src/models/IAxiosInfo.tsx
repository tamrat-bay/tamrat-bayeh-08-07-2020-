import { ITask } from './ITask';

export interface IAxiosInfo {
    method: string;
    url: string;
    methodFunction: (newData: ITask["task"]) => void;
}