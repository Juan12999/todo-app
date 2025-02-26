import React from 'react';

export interface Todo{
  id:string
  task:string
  completed:boolean
}

interface Props {
  todo:Todo
  onComplete:Function
  onDelete:Function
}

const TodoItem:React.FC<Props> = ({ todo, onComplete, onDelete }) => {
  return (
    <div>
      <span>{todo.task}</span>
      <button onClick={() => onComplete(todo.id)}>{todo.completed ? 'Completed' : 'Mark as completed'}</button>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
};

export default TodoItem;