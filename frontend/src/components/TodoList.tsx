import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoItem, { Todo } from './TodoItem';
import api from '../api';
import ErrorAlert from './ErrorAlert';
import CreateTodo from './CreateTodo';



const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData()
  }, []);

  const loadData = async () => {
    try {
      const res = await api.get("/todos")
      setTodos(res.data)
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        setError(e.response.data.message)
      } else if (e instanceof Error) {
        setError(e.message)
      }
      setTimeout(() => { setError("") }, 7000)
    }
  }

  const handleComplete = (id: string) => {
    // axios.put(`http://localhost:5000/api/todos/${id}/complete`, {}, {
    //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    // })
    // .then(() => {
    //   setTodos(todos.map(todo => todo._id === id ? { ...todo, completed: true } : todo));
    // })
    // .catch(error => {
    //   console.error('Hubo un error al completar la tarea:', error);
    // });
  };

  const handleDelete = (id: string) => {
    // axios.delete(`http://localhost:5000/api/todos/${id}`, {
    //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    // })
    // .then(() => {
    //   setTodos(todos.filter(todo => todo._id !== id));
    // })
    // .catch(error => {
    //   console.error('Hubo un error al eliminar la tarea:', error);
    // });
  };


  return (
    <div>
      <div>
        <CreateTodo onCreateTodo={()=>loadData()} />
      </div>
      <div>
        {error && <div className='mt-4'>
          <ErrorAlert message={error} />
        </div>}
        <h1>My Tasks</h1>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onComplete={()=>loadData()}
            onDelete={()=>loadData()}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;