import React, { useEffect, useState } from 'react'
import api from '../api'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Dashboard(){
  const [courts, setCourts] = useState([])
  const [rates, setRates] = useState([])
  const { user } = useAuth()

  useEffect(()=>{
    api.get('/api/public/courts').then(r=>setCourts(r.data))
    api.get('/api/public/rates').then(r=>setRates(r.data))
  },[])

  function rateFor(n){
    return rates.find(r=>r.courtNumber===n)?.ratePerHour ?? '-'
  }

  

  return (
    <div className="mt-6 space-y-6">
      <div className="glass rounded-2xl p-6">
        <h1 className="text-3xl font-bold">Book your court</h1>
        <p className="text-gray-600">Tennis/Badminton courts. Hourly bookings, simple pricing.</p>
        <div className="mt-4 flex gap-3">
          <Link to="/book" className="px-4 py-2 rounded-xl bg-indigo-600 text-white">Book now</Link>
          {user ? <Link to="/my-bookings" className="px-4 py-2 rounded-xl border">My bookings</Link> : <Link to="/register" className="px-4 py-2 rounded-xl border">Create account</Link>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {courts.map(c => (
          <div key={c._id} className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Court {c.number}</h2>
                <p className="text-gray-600 capitalize">{c.type}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">₹{rateFor(c.number)}</div>
                <div className="text-gray-500 text-sm">per hour</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
