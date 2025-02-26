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
        <div className='bg-gray-200 p-5 rounded-lg'>
        {todos.map(todo => (
          <TodoItem
          key={todo._id}
          todo={todo}
          onComplete={()=>loadData()}
          onDelete={()=>loadData()}
          />
        ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;