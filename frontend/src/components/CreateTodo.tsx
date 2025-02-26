import axios from 'axios';
import React, { useState } from 'react';
import ErrorAlert from './ErrorAlert';
import api from '../api';
import Spinner from './Spinner';
interface Props {
    onCreateTodo: Function
}

const CreateTodo: React.FC<Props> = ({ onCreateTodo }) => {

    const [task, setTask] = useState("")
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        try {
            if (task === "") {
                setError("Please fill up all fields");
                return;
            }
            setLoading(true)
            await api.post("/todos", {
                task
            })
            onCreateTodo()
        } catch (e: any) {
            if (axios.isAxiosError(e) && e.response) {
                setError(e.response.data.message)
            } else if (e instanceof Error) {
                setError(e.message)
            }
            setTimeout(() => { setError("") }, 7000)
        }
        setLoading(false)
    }

    return (
        <div className='mb-5 mt-7 w-full max-w-[300px]'>
            {error && <div className='mt-4 mb-4'>
                <ErrorAlert message={error} />
            </div>}
            <p>Create Todo</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs font-medium text-gray-700" htmlFor="">Task</label>
                    <input
                        type="text"
                        placeholder="Task"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        className='bg-white border-1 px-3 py-2 mt-1 w-full rounded-md border-gray-200 shadow-xs sm:text-sm block'
                    />
                </div>
                <button
                    className='cursor-pointer w-full block rounded-sm border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white  focus:ring-3 focus:outline-hidden' type="submit">
                    {loading ? <Spinner /> : "Add"}
                </button>
            </form>
        </div>
    );
};

export default CreateTodo;