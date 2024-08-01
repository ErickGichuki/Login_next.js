"use client";

import { useState } from 'react';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid login credentials');
      }

    
    } catch (err) {
      setError('Invalid login credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-white px-10 py-20 rounded-3xl border-2 border-gray-50'>
      <h1 className="text-5xl font-semibold">Welcome to Kazi-Tracker</h1>
      <p className='font-medium text-lg text-gray-500 mt-4'>Please Enter your details.</p>
      {error && <p className='text-red-500 mt-4'>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className='mt-8'>
          <div>
            <label className='text-lg font-medium' htmlFor='email'>Email</label>
            <input 
              id='email'
              className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent' 
              placeholder='Enter your email' 
              type='email' 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              aria-label='Email'
            />
          </div>
          <div>
            <label className='text-lg font-medium' htmlFor='password'>Password</label>
            <input 
              id='password'
              className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent' 
              placeholder='Enter your password' 
              type='password' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              aria-label='Password'
              required 
            />
          </div>
          <div className='mt-8 flex flex-col gap-y-4'>
            <button 
              className={`active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg font-bold ${loading ? 'opacity-50' : ''}`} 
              type='submit'
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
