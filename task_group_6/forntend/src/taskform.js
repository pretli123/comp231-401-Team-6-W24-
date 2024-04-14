import React, { useState } from 'react';
import {Task} from './task'
import moment from 'moment';

function TaskForm({ onSave,onDelete, existingTask }) {
    const [task, setTask] = useState(existingTask || new Task(Date.now(), '', new Date(Date.now()), new Date(Date.now())));
    const [dateTime, setDateTime] = useState(moment().format('YYYY-MM-DDTHH:mm'));
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // console.log(task);
      onSave(task);
    };
  
    return (
      <form onSubmit={handleSubmit} >
        <input
          type="text"
          value={task.name}
          onChange={(e) => setTask({ ...task, name: e.target.value })}
          placeholder="Task Name"
          required
        />
        <br/> 
        <input
          type="datetime-local"
          // value={existingTask.name ==='' ? dateTime :task.begin }
          onChange={(e) => setTask({ ...task, begin: e.target.value })}
          required
        />
         <br/>
        <input
          type="datetime-local"
          // value={existingTask.name === '' ? dateTime : task.end  }
          onChange={(e) => setTask({ ...task, end: e.target.value })}
          required
        />
         <br/>
        <button type="submit">Save Task</button>
        {existingTask && existingTask.name !== "" && ( <button onClick={onDelete}>Delete Task</button>)}
     
      </form>
    );
  }
  

  export default TaskForm;