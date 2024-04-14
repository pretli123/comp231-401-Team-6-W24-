// A simple Task model example
export class Task {
    constructor(id, name, begin, end) {
      this.id = id;
      this.name = name;
      this.begin = begin;
      this.end = end;
    }
  }
  

export function TaskComponent({ task, onUpdate, onDelete }) {
    return (
      <div>
        <h2>{task.name}</h2>
        <p>Begin: {task.begin}</p>
        <p>End: {task.end}</p>
        <button onClick={() => onUpdate(task)}>Update</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    );
  }

