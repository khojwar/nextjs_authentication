"use client";
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function signupPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [buttonDisabled, setButtonDisabled] = useState(false);

    const onSignup = async () => {

        try {
            setLoading(true);
    
            const response = await axios.post('/api/users/signup', user)
            // console.log(response);

            console.log("Signup success", response.data);
            router.push('/login');     // redirect to login page
        

        } catch (error: any) {
            console.log("Signup failed", error.message);
            
            toast.error(error.message); 
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


  return (
    <div className='flex flex-col justify-center items-center min-h-screen py-2'>
        <h1>{loading ? 'Processing' : 'signup'}</h1>

        <label htmlFor="username">Username</label>
        <input 
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        type="text" 
        id="username"
        value={user.username}
        onChange={(e) => setUser({...user, username: e.target.value})}
         />

        <label htmlFor="email">Email</label>
        <input
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({...user, email: e.target.value})}
         /> 

        <label htmlFor="password">Password</label>
        <input
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})}
         />
         <button
            onClick={onSignup}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
         >
            {buttonDisabled ? "No Signup" : "Signup"}
        </button>
        <Link href="/login">Visit login page</Link>

    </div>
  )
}

export default signupPage