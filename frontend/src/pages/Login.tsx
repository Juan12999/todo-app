import React, { useState } from 'react';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router';
import useAuthStore, { AuthStore } from '../store';
import ErrorAlert from '../components/ErrorAlert';
import Spinner from '../components/Spinner';

const Login = () => {
  const store: AuthStore = useAuthStore()
  if (store.token !== "") {
    return <Navigate to="/todos" />;
  }


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {

      if (email === "" || password === "") {
        setError("Please fill up all fields");
        return;
      }
      setLoading(true)
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password })
      store.login(res.data.token, res.data.name, res.data.email)
      window.location.assign("/todos")
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        setError(e.response.data.message)
      } else if (e instanceof Error) {
        setError(e.message)
      }
    }
    finally {
      setTimeout(() => { setError("") }, 7000)
      setLoading(false)
    }

  };

  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <div className='bg-white shadow-xl p-5 w-full max-w-[400px]'>
        {error && <div className='mt-4 mb-4'>
          <ErrorAlert message={error} />
        </div>}
        <h2 className='text-center font-bold text-2xl'>Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700" htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='bg-white border-1 px-3 py-2 mt-1 w-full rounded-md border-gray-200 shadow-xs sm:text-sm block'
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700" htmlFor="">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='bg-white border-1 px-3 py-2 mt-1 w-full rounded-md border-gray-200 shadow-xs sm:text-sm block'
            />
          </div>
          <button
            disabled={loading}
            className='cursor-pointer w-full block rounded-sm border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white focus:ring-3 focus:outline-hidden' type="submit">
            {loading ? <Spinner /> : "Sign In"}
          </button>
          <p className='text-center'>Don't have an account? <Link className='text-blue-600' to={"/register"}>Sign Up</Link></p>
        </form>
      </div>
    </div>

  );
};

export default Login;
