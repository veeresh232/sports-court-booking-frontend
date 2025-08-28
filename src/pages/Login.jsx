import React, { useState } from 'react'
import api from '../api'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const { login } = useAuth()
  const navigate = useNavigate();

  async function onSubmit(e){
    e.preventDefault()
    setError(null)
    try{
      const { data } = await api.post('/api/auth/login', { email, password })
      login(data.token, data.user)
    }catch(err){
      setError(err.response?.data?.error || 'Login failed')
    }
  }

  // Login.jsx
const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role); // 'admin' or 'user'
      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
  }
};


  return (
    <div className="max-w-md mx-auto mt-8 p-6 glass rounded-2xl">
      <h1 className="text-2xl font-semibold mb-4">Welcome back</h1>
      <form onSubmit={handleLogin} className="space-y-3">
        <input className="w-full border rounded-xl p-3" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="w-full border rounded-xl p-3" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        {error && <div className="text-red-600">{error}</div>}
        <button className="w-full py-3 rounded-xl bg-indigo-600 text-white">Login</button>
        <p className="text-sm text-gray-600">Admin? Try admin@example.com / admin123 (after seeding).</p>
      </form>
    </div>
  )
}
