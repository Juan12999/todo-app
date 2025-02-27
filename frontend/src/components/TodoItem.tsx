import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import api from '../api';

export interface Todo {
  _id: string
  task: string
  completed: boolean
}

interface Props {
  todo: Todo
  onComplete: Function
  onDelete: Function
}

const TodoItem: React.FC<Props> = ({ todo, onDelete }) => {

  const [edit, setEdit] = useState(false)
  const [task,setTask]=useState(todo.task||"")
  const [taskEdit,setTaskEdit]=useState(todo.task||"")
  const [completed,setCompleted]=useState(todo.completed||false)

  const inputRef=useRef<HTMLInputElement>(null)

  const handleEdit = async(e:any) => {
    e.preventDefault();
    try {
      await api.put("/todos", {
        id: todo._id,
        task:taskEdit
      })
      setTask(taskEdit)
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        alert(e.response.data.message)
      } else if (e instanceof Error) {
        alert(e.message)
      }
    }
    setEdit(false)
  }
  const handleDelete = async () => {
    try {
      await api.delete("/todos?id="+todo._id)
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        alert(e.response.data.message)
      } else if (e instanceof Error) {
        alert(e.message)
      }
    }
    onDelete()
  }

  const handleCompleted=async (e:any)=>{
    try {
      setCompleted(e.target.checked)
      await api.put("/todos/completed",{
        id:todo._id,
        completed:e.target.checked
      })
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        alert(e.response.data.message)
      } else if (e instanceof Error) {
        alert(e.message)
      }
    }
  }

  const handleEditButton=()=>{
    setEdit(true);
  }

  useEffect(()=>{
    if(edit===true){
      inputRef.current?.focus()
    }
  },[edit])

  const handleCancel=()=>{
    setEdit(false)
    setTaskEdit(task)
  }

  return (

    <div className='bg-white mb-4 px-5 py-2 shadow-xl border border-gray-100 rounded-lg flex items-center justify-between max-md:flex-wrap max-md:space-y-3'>
      <div className='max-md:w-full'>
        {edit && <form onSubmit={handleEdit} className='flex items-center space-x-4'>
          <input onChange={(e)=>setTaskEdit(e.target.value)} ref={inputRef} className='border border-gray-300 rounded px-3 py-1' type="text" value={taskEdit} />
          <button type='submit' className='bg-green-400 px-2 rounded cursor-pointer text-white' >Save</button>
          <button type='button' className='bg-red-400 px-2 rounded cursor-pointer text-white' onClick={handleCancel}>Cancel</button>
        </form>}
        {!edit && task}
      </div>
      <div className='flex items-center space-x-4 max-md:w-full'>
        <label>
          <input onChange={handleCompleted} checked={completed} type="checkbox" />
           <span className='ml-1'>Completed</span>
        </label>
        <button className='bg-blue-400 px-2 rounded cursor-pointer text-white' onClick={handleEditButton}>Edit</button>
        <button className='bg-red-400 px-2 rounded cursor-pointer text-white' onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;