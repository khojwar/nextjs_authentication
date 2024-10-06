'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

function signinPage() {
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const router = useRouter();

  async function onLogin() {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', user);
      console.log(response.data);
      toast.success('Login successful');
      router.push('/profile'); 
    } catch (error: any) {
      console.log(error.response.data);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0) {
        setButtonDisabled(false);
    } else{
        setButtonDisabled(true);
    }
}, [user]);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading? "Processing" : "Login"}</h1>

      <label htmlFor="email">Email</label>
      <input 
      type="email" 
      id="email" 
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      value={user.email}
      onChange={(e) => setUser({...user, email: e.target.value})}
      placeholder='Email'
      />

      <label htmlFor="password">Password</label>
      <input 
      type="password" 
      id="password" 
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
      value={user.password}
      onChange={(e) => setUser({...user, password: e.target.value})}
      placeholder='Password'
      />

      <button
        onClick={onLogin}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        Login here
      </button>

      <Link href="/signup">Visit Signup page</Link>
      
    </div>
  )
}

export default signinPage