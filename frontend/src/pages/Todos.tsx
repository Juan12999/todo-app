import { useNavigate, Link } from 'react-router';
import useAuthStore, { AuthStore } from '../store';
import { useEffect } from 'react';
import TodoList from '../components/TodoList';
import CreateTodo from '../components/CreateTodo';

const Todos = () => {
    const store: AuthStore = useAuthStore()
    const navigate = useNavigate();

    useEffect((): void => {
        if (store.token === "") {
            navigate("/login")
        }
    }, [])

    const handleLogout = (e: any) => {
        e.preventDefault()
        store.logout()
        navigate("/login")
    }




    return <>
        <div className='m-auto w-full max-w-[1024px]'>
            <div className='px-5 py-2 shadow-xl border border-gray-100 rounded-lg flex items-center justify-between'>
                <div>
                    <span className='block'>Name: {store.name}</span>
                    <span className='block'>Email: {store.email}</span>
                </div>
                <div>
                    <a className='text-blue-500 hover:text-blue-300' href="#" onClick={handleLogout}>Logout</a>
                </div>
            </div>
        </div>
        <div className='m-auto w-full max-w-[1024px] '>
            <TodoList />
        </div>


    </>
};

export default Todos;
