import React from 'react';
import {ITask}  from '../../model/ITask'


const Task: React.FC<ITask> = ({task}) => {
    console.log('Task prop',task );
    const { date ,name,  phone ,email, description } = task
    return (
        <tr>
            <td>{name}</td>
            <td>{phone}</td>
            <td>{email}</td>
            <td>{date}</td>
            <td>
                <button>More</button>
                <button>Edit</button>
                <button>Delete</button>
            </td>
        </tr>
    )
}

export default Task
