import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'

export default function NavBar(){
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="sticky top-0 z-20 bg-white/70 backdrop-blur border-b border-white/60">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-3">
        <Link to="/" className="text-xl font-bold tracking-wide">
          <span className="text-indigo-600">Court</span><span className="text-cyan-600">Book</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link className="px-3 py-1 rounded-xl hover:bg-indigo-50" to="/">Home</Link>
          {user && <Link className="px-3 py-1 rounded-xl hover:bg-indigo-50" to="/book">Book</Link>}
          {user && <Link className="px-3 py-1 rounded-xl hover:bg-indigo-50" to="/my-bookings">My bookings</Link>}
          {user?.role==='admin' && <Link className="px-3 py-1 rounded-xl hover:bg-indigo-50" to="/admin">Admin</Link>}
          {!user ? (
            <>
              <Link className="px-3 py-1 rounded-xl bg-indigo-600 text-white" to="/login">Login</Link>
              <Link className="px-3 py-1 rounded-xl border" to="/register">Sign up</Link>
            </>
          ) : (
            <button className="px-3 py-1 rounded-xl border" onClick={()=>{ logout(); navigate('/'); }}>Logout</button>
          )}
        </div>
      </div>
    </div>
  )
}
