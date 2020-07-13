import { ITask } from './ITask';

export interface IAxiosInfo {
    method: string;
    url: string;
    token: string;
    methodFunction: (newData: ITask["task"]) => void;
}