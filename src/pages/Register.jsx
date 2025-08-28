import React, { useState } from 'react'
import api from '../api'
import { useAuth } from '../hooks/useAuth'

export default function Register(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const { login } = useAuth()

  async function onSubmit(e){
    e.preventDefault()
    setError(null)
    try{
      const { data } = await api.post('/api/auth/register', { name, email, password })
      login(data.token, data.user)
    }catch(err){
      setError(err.response?.data?.error || 'Registration failed')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 glass rounded-2xl">
      <h1 className="text-2xl font-semibold mb-4">Create your account</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full border rounded-xl p-3" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="w-full border rounded-xl p-3" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="w-full border rounded-xl p-3" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        {error && <div className="text-red-600">{error}</div>}
        <button className="w-full py-3 rounded-xl bg-indigo-600 text-white">Sign up</button>
      </form>
    </div>
  )
}
